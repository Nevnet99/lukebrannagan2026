---
title: 'Optimistic UI: The Art of Lying to Your Users'
description: 'Stop making your users wait for a spinner. Learn the manual pattern for instant UI updates and reliable state rollbacks in React.'
pubDate: '2026-02-03'
heroImage: '../../assets/optimistic-ui.png'
tags: ['react', 'ux', 'javascript', 'frontend']
---

In this blog post, we will explore the concept of optimistic UI updates in React applications. Optimistic updates are a powerful technique that can significantly enhance user experience by making interfaces feel faster and more responsive. Instead of waiting for a server response to confirm an action, the UI is updated immediately, giving users instant feedback.

But first, let's understand the problem with traditional UI updates.

---

## The Problem with Traditional UI Updates

In a typical React application, when a user performs an action that requires a server request (like submitting a form or liking a post), the UI often waits for the server to respond before updating. This can lead to noticeable delays, during which users might see loading spinners or disabled buttons. Such delays can frustrate users and make the application feel sluggish which can lead to higher bounce rates and lower user satisfaction.

Take for example a "like" button on a social media post. When a user clicks the button, they expect to see the like count increase immediately. However, if the application waits for the server to confirm the like before updating the UI, users may experience a delay, which feels weird and unresponsive. 

To show this heres an example where a like button for a post waits for the server response before updating:

<iframe 
  src="https://stackblitz.com/edit/vitejs-vite-g9j6row5?embed=1&file=src%2Fapp.module.css"
  style="width:100%; height:700px; border:0; border-radius: 8px; overflow:hidden;"
  title="not Optimistic UI Demo"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

Weird, right? The user clicks like, and nothing happens for a moment. It feels wrong because the UI is not responding to the user's action immediately.

I'll show you how to fix this with optimistic updates.

---

## Implementing Optimistic UI Updates in React

To address the elephant in the room, we can implement and abstract away a lot of this complexity with the new useOptimistic hook in React. However, to truly understand how optimistic updates work, and also to not assume that everyone can commit to the bleeding edge of React releases, let's build it first to work in any situation not just React.

Here's a simple example of a like button that uses optimistic UI updates:

<iframe src="https://codesandbox.io/embed/optimistic-ui-manual-implementation-abc456?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:400px; border:0; border-radius: 4px; overflow:hidden;"
  title="Optimistic UI Manual Implementation"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts" 
  > </iframe>

In this example, when the user clicks the "Like" button, we immediately update the UI to reflect the new like count and set the liked state to true. This gives the user instant feedback that their action was registered the user does not need to know that the app is waiting for the server response.

Now a couple of questions you might have:
1. **What if the server request fails?**  
   In the example above, we handle this by rolling back the UI state to its previous value if the server request fails. This ensures that the UI remains consistent with the actual state on the server.
2. **What if the user clicks the button multiple times quickly?**  
   In a real-world application, you would want to disable the button or implement debouncing to
  prevent multiple rapid clicks that could lead to inconsistent states. (please read the next section on race conditions for more info on this)
3. **How do we handle more complex state updates?**  
   For more complex scenarios, you might want to use state management libraries like Redux or Zustand (my suggestion, redux in my opinion has a massive boilerplate footprint), which can help manage optimistic updates across different parts of your application.
  
By implementing optimistic UI updates, you can create a more responsive and engaging user experience in your React applications. Users will appreciate the instant feedback, and your application will feel faster and more fluid.

---

## Race conditions 

Optimistic UI works great when everything goes right. But what happens if a user is a "speed-clicker"?

If a user clicks "Like" and then immediately "Unlike," you have two network requests in flight. If the first request (Like) is slowed down by a spotty connection and finishes after the second request (Unlike), your UI will end up out of sync with your database. **This is a Race Condition.**


### Solution A: The Manual Way (AbortController)

```javascript 

let controller;

async function handleLike(postId) {
  // 1. Cancel any previous in-flight request
  if (controller) controller.abort();
  
  controller = new AbortController();
  const { signal } = controller;

  // 2. Perform optimistic update
  updateUI(postId, true);

  try {
    await fetch(`/api/like/${postId}`, { method: 'POST', signal });
  } catch (err) {
    if (err.name === 'AbortError') return; // Ignore expected cancellations
    rollbackUI(postId); // Only rollback if it's a real server error
  }
}
```

### Solution B: The "Industry Standard" (TanStack Query)

If you are building a professional-grade React app, don't reinvent the wheel. TanStack Query (formerly React Query) handles the "cancel-update-refetch" dance for you.

When you use their onMutate and onError callbacks, the library automatically:

- Cancels outgoing refetches so they don't overwrite your optimistic state.
- Snapshots your current state.
- Rolls back precisely if the server says "no."

---


## With great power comes great responsibility

Optimistic UI updates can significantly enhance user experience however, in the land of UX design do not always assume faster is better, Sometimes it is better to show a loading state to indicate that something important is happening in the background.

Take for example deleting an important item. If a user clicks "Delete" and the item disappears immediately, they might think it was deleted successfully. But if the server request fails, they could be confused when the item reappears. In such cases, it's often better to show a loading spinner or a confirmation dialog to ensure the user understands that the action is being processed.

---

## Steal my code

Ok I hear you, what's the point in coming and reading my blog post if I don't give you something to take away. So here it is, a simple implementation of an optimistic update hook for React.

```javascript
import { useState } from 'react';

export function useOptimistic(initialValue) {
  const [state, setState] = useState(initialValue);
  const [pending, setPending] = useState(false);

  const optimisticUpdate = async (newValue, asyncOperation) => {
    const previousValue = state;
    setState(newValue);
    setPending(true);

    try {
      await asyncOperation();
    } catch (error) {
      setState(previousValue); 
    } finally {
      setPending(false);
    }
  };

  return [state, optimisticUpdate, pending];
}
```

And then because I like you so much, here is a not hook version for vanilla JS

```javascript
export function optimisticUpdate(currentValue, newValue, asyncOperation, onUpdate) {
  const previousValue = currentValue;
  onUpdate(newValue);

  return asyncOperation()
    .catch((error) => {
      onUpdate(previousValue); 
    });
}
```

don't fall for the trap of thinking you need to use React to do optimistic updates, you can implement this pattern in any JavaScript application.

---

## Accessibility  

As with any post on my site, I have to mention accessibility. When implementing optimistic UI updates, it's crucial to ensure that your application remains accessible to all users, including those using assistive technologies.

Here are a few tips to keep in mind:
- **Announce Changes**: Use ARIA live regions to announce changes in the UI to screen readers. For example, when a like is added, you can update a live region with a message like "Post liked."
- **Announce Rollbacks**: If an optimistic update is rolled back due to a server error, make sure to inform the user. You can use a live region to announce that the action could not be completed.
- 
---

## Additional Resources

- [React Docs on Optimistic UI](https://react.dev/reference/react/useOptimistic)
- [TanStack Query - Optimistic Updates](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)
- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

___

## Conclusion

Optimistic UI updates are a powerful technique to enhance user experience by providing instant feedback. By updating the UI immediately and handling potential errors gracefully, you can create applications that feel faster and more responsive.

Whether you're using React or vanilla JavaScript, implementing optimistic updates can significantly improve the way users interact with your application.


