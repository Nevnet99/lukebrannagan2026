---
title: 'Thinking in Patterns, Not Features'
description: 'Patterns stand the test of time because they describe how something should work, not exactly how it is built. Learn how to decouple logic from implementation.'
pubDate: '2025-10-25'
heroImage: '../../assets/blog-placeholder-5.jpg'
tags: ['react', 'typescript', 'frontend', 'architecture']
---

Patterns stand the test of time because they describe how something should work, not exactly how it’s built. The challenge comes when we design at too granular of a level.

Building something that’s overly specific to a single feature quickly becomes hard to maintain, and documenting it is even harder.

### The Boiling Water Analogy

Think about the simple act of boiling water.

**The pattern looks like this:**
1. Heat up the water
2. Wait until it boils
3. Congratulations, you’ve boiled water

**The implementation might look like this:**
1. Pour water into a kettle
2. Plug the kettle in
3. Press the switch
4. Wait for it to boil
5. Congratulations, you’ve boiled water

The pattern doesn’t change, only the method does. You could use a kettle, a campfire, or any other heat source; however, the underlying logic stays the same.

We can apply this same thinking to frontend development. Instead of building a hook that only handles one very specific use case, we can build a more general hook that defines the pattern, then inject the details as dependencies. It’s like choosing whether you use the kettle or the campfire. The steps stay consistent; only the context changes.

This approach helps keep code consistent, easier to maintain, and simpler to explain. By focusing on patterns that represent the essence of what we’re trying to do, we can swap out the details without rewriting the logic every time.

## An Example

### ❌ Imperative Solution
The imperative solution handles each step manually. It is tightly coupled to the feature, making it hard to reuse, document, and test.

```tsx
function useSignupSteps() {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => Math.max(0, s - 1));

  // Steps are hard-coded here
  const steps = [
    { id: "account", label: "Create Account" },
    { id: "profile", label: "Set Up Profile" },
    { id: "confirm", label: "Confirm Details" },
  ];

  const current = steps[step];

  return { steps, step, current, next, prev };
}

// Usage
const { steps, current, next } = useSignupSteps();
```

### 🧩 Pattern Version
This version defines a general **“steps pattern”** and lets you inject the specifics. It doesn't care *what* the steps are, only *how* to navigate them.

```tsx
import { useState, useCallback } from "react";

type Step<T = any> = {
  id: string;
  label?: string;
  data?: T;
};

type UseStepsOptions<T> = {
  steps: Step<T>[];
  onStepChange?: (step: Step<T>, index: number) => void;
};

export function useSteps<T = any>({ steps, onStepChange }: UseStepsOptions<T>) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => {
      const nextIndex = Math.min(i + 1, steps.length - 1);
      onStepChange?.(steps[nextIndex], nextIndex);
      return nextIndex;
    });
  }, [steps, onStepChange]);

  const prev = useCallback(() => {
    setIndex((i) => {
      const prevIndex = Math.max(i - 1, 0);
      onStepChange?.(steps[prevIndex], prevIndex);
      return prevIndex;
    });
  }, [steps, onStepChange]);

  const goTo = useCallback(
    (id: string) => {
      const idx = steps.findIndex((s) => s.id === id);
      if (idx !== -1) {
        setIndex(idx);
        onStepChange?.(steps[idx], idx);
      }
    },
    [steps, onStepChange]
  );

  return {
    current: steps[index],
    index,
    next,
    prev,
    goTo,
    isFirst: index === 0,
    isLast: index === steps.length - 1,
  };
}
```

## Key Takeaways

The goal is to design software with **patterns in mind** rather than just solving the immediate imperative problem.

For example, if you need to use `localStorage`, don't just write a `useSaveThemeToStorage` hook. Instead, write a hook that handles the pattern of **persisting state to any storage**, which can then be used for your specific "Kettle" (saving the theme) or your "Campfire" (saving user preferences).
