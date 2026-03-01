"""
Post-process the generated PPTX to add:
  1. Fade transitions on ALL slides (0.8s)
  2. Click-to-appear animations on slides 6, 8, 10, 12

Uses PowerPoint COM automation via win32com (pywin32).

Shape index mapping is derived from the creation order in generate_review.js.
Each slide's shapes are numbered 1-based in the order they were addShape/addText/addImage'd.

Helper shape counts:
  addPageTitle(s, title, subtitle):  3 shapes (bar, title, subtitle)
  addPageTitle(s, title):            2 shapes (bar, title) — no subtitle
  addFooter(s):                      3 shapes (line, logo, "CONFIDENTIAL")
"""

import os
import sys
import time
import win32com.client

# ── PowerPoint VBA constants ──
ppEffectFadeSmoothly   = 3849   # SlideShowTransition.EntryEffect
msoAnimEffectAppear    = 1      # effectId for AddEffect
msoAnimTriggerOnPageClick  = 1  # trigger: user clicks
msoAnimTriggerWithPrevious = 3  # trigger: simultaneous with previous
msoTrue  = -1
msoFalse =  0


def add_group_animations(slide, groups, slide_label=""):
    """
    Apply click-to-appear entrance animations.

    `groups` is a list of lists.  Each inner list is a set of 1-based shape
    indices that should appear together on ONE mouse click.
    Groups are ordered — group 0 appears on click 1, group 1 on click 2, etc.
    """
    shapes = slide.Shapes
    total  = shapes.Count
    seq    = slide.TimeLine.MainSequence

    for g_idx, shape_indices in enumerate(groups):
        for s_idx, shape_num in enumerate(shape_indices):
            if shape_num < 1 or shape_num > total:
                print(f"  WARNING [{slide_label}]: shape {shape_num} out of range (1..{total}), skipping")
                continue

            shape = shapes.Item(shape_num)

            # First shape in each group → OnPageClick (new click)
            # Rest of same group       → WithPrevious (appear together)
            trigger = msoAnimTriggerOnPageClick if s_idx == 0 else msoAnimTriggerWithPrevious

            seq.AddEffect(shape, msoAnimEffectAppear, 0, trigger)

    print(f"  OK  Slide {slide_label}: {len(groups)} click-groups added")


def verify_shape_count(slide, expected, slide_label):
    """Print a warning if actual shape count ≠ expected (helps catch regressions)."""
    actual = slide.Shapes.Count
    if actual != expected:
        print(f"  WARNING [{slide_label}]: expected {expected} shapes, got {actual}")
        for j in range(1, actual + 1):
            s = slide.Shapes.Item(j)
            txt = ""
            try:
                txt = s.TextFrame.TextRange.Text[:40].replace("\n", " ")
            except Exception:
                pass
            print(f"    #{j:2d}  Left={s.Left:7.1f}  Top={s.Top:7.1f}  "
                  f"W={s.Width:7.1f}  H={s.Height:7.1f}  Text=\"{txt}\"")
        return False
    return True


def main():
    if len(sys.argv) < 2:
        print("Usage: python add_animations.py <path-to-pptx>")
        sys.exit(1)

    pptx_path = os.path.abspath(sys.argv[1])
    print(f"Opening: {pptx_path}")

    pp = win32com.client.Dispatch("PowerPoint.Application")
    pp.Visible = True

    pres = pp.Presentations.Open(pptx_path)
    time.sleep(2)

    total_slides = pres.Slides.Count
    print(f"Total slides: {total_slides}")

    # ═══════════════════════════════════════════════════
    # 1.  FADE TRANSITIONS — every slide
    # ═══════════════════════════════════════════════════
    for i in range(1, total_slides + 1):
        slide = pres.Slides.Item(i)
        t = slide.SlideShowTransition
        t.EntryEffect    = ppEffectFadeSmoothly
        t.Duration        = 0.8
        t.AdvanceOnClick  = msoTrue

    print(f"[1/2] Fade transitions → {total_slides} slides")

    # ═══════════════════════════════════════════════════
    # 2.  CLICK-TO-APPEAR ANIMATIONS
    # ═══════════════════════════════════════════════════
    #
    # Shape index reference (1-based, follows JS addShape/addText order):
    #
    # ── Slide 6: Timeline ──────────────────────────────
    #   1  addPageTitle → blue bar
    #   2  addPageTitle → title "工作历程"
    #   3  addPageTitle → subtitle
    #   4  timeline connector LINE
    #   5-8   Step 0 (11月): oval, month-text, title, details
    #   9-12  Step 1 (12月): oval, month-text, title, details
    #  13-16  Step 2 (1月):  oval, month-text, title, details
    #  17-20  Step 3 (2月):  oval, month-text, title, details
    #  21-23  addFooter → line, logo, CONFIDENTIAL
    #  Total: 23 shapes
    #
    s6 = pres.Slides.Item(6)
    verify_shape_count(s6, 23, "S6-Timeline")
    add_group_animations(s6, [
        [ 5,  6,  7,  8],   # Click 1 → 11月
        [ 9, 10, 11, 12],   # Click 2 → 12月
        [13, 14, 15, 16],   # Click 3 → 1月
        [17, 18, 19, 20],   # Click 4 → 2月
    ], "S6-Timeline")

    # ── Slide 8: RAG 6-card grid ──────────────────────
    #   1-3   addPageTitle (bar, title, subtitle)
    #   4-8   Card 0: rect, accent-line, num-text, title-text, desc-text
    #   9-13  Card 1
    #  14-18  Card 2
    #  19-23  Card 3
    #  24-28  Card 4
    #  29-33  Card 5
    #  34-36  addFooter
    #  Total: 36 shapes
    #
    s8 = pres.Slides.Item(8)
    verify_shape_count(s8, 36, "S8-RAG")
    add_group_animations(s8, [
        [ 4,  5,  6,  7,  8],   # Click 1 → 文档级去重
        [ 9, 10, 11, 12, 13],   # Click 2 → Chunk相似度去重
        [14, 15, 16, 17, 18],   # Click 3 → 重排后低分过滤
        [19, 20, 21, 22, 23],   # Click 4 → 翻译稳定性优化
        [24, 25, 26, 27, 28],   # Click 5 → 动态top_k
        [29, 30, 31, 32, 33],   # Click 6 → Embedding模型优化
    ], "S8-RAG")

    # ── Slide 10: Key Stats ───────────────────────────
    #   1-3   addPageTitle (bar, title, subtitle)
    #   4     decorative oval
    #   5-8   Stat 0 (50+):   value, label, line, desc
    #   9-12  Stat 1 (6 项):  value, label, line, desc
    #  13-16  Stat 2 (3 大):  value, label, line, desc
    #  17-19  addFooter
    #  Total: 19 shapes
    #
    s10 = pres.Slides.Item(10)
    verify_shape_count(s10, 19, "S10-Stats")
    add_group_animations(s10, [
        [ 5,  6,  7,  8],   # Click 1 → 50+
        [ 9, 10, 11, 12],   # Click 2 → 6 项
        [13, 14, 15, 16],   # Click 3 → 3 大
    ], "S10-Stats")

    # ── Slide 12: Growth + Improvement ────────────────
    #   1-2   addPageTitle (bar, title) — NO subtitle
    #   3     left card bg
    #   4     left accent line
    #   5     "成长收获" title
    #   6     growth item 1
    #   7     growth item 2
    #   8     growth item 3
    #   9     right card bg
    #  10     right accent line
    #  11     "不足改进" title
    #  12     improvement item 1
    #  13     improvement item 2
    #  14-16  addFooter
    #  Total: 16 shapes
    #
    s12 = pres.Slides.Item(12)
    verify_shape_count(s12, 16, "S12-Growth")
    add_group_animations(s12, [
        [ 6],    # Click 1 → 成长1
        [ 7],    # Click 2 → 成长2
        [ 8],    # Click 3 → 成长3
        [12],    # Click 4 → 不足1
        [13],    # Click 5 → 不足2
    ], "S12-Growth")

    print("[2/2] Click-to-appear animations → 4 slides")

    # ═══════════════════════════════════════════════════
    # 3.  SAVE & CLOSE
    # ═══════════════════════════════════════════════════
    pres.Save()
    print("Saved!")
    pres.Close()
    pp.Quit()
    print("Done — open the PPTX in PowerPoint to verify.")


if __name__ == "__main__":
    main()
