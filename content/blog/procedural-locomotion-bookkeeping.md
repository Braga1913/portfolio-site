---
title: Procedural locomotion is mostly bookkeeping
date: 2026-09-18
excerpt: The maths is the easy part. Keeping phase, weight and blend state coherent is where the real work lives.
tags:
  - Animation
  - Unreal Engine
---

Procedural locomotion gets framed as a maths problem: solve the IK, drive the joints, blend the cycles. That part is real, but it is maybe a third of the work.

The rest is bookkeeping. A system has to know what phase a leg is in, how much weight the planted foot should carry, what happens when the character accelerates mid-step, and which of those values are allowed to change this frame.

## The state nobody sees

Most of my debugging time goes into state that never shows up on screen: flags, timers and blend weights that only matter when they disagree with each other. When the animation looks wrong, the maths is usually fine. The inputs were stale.

> If the result looks broken, check the inputs before you check the equation.

## What helped

- Keeping phase and speed explicit instead of inferring them from the animation.
- Building a debug view before building the behaviour.
- Treating every parameter as something an animator can tweak without a recompile.

None of that is glamorous. It is also the difference between a demo that works once and a system someone can actually use.
