---
title: 'The Coming Crash of Vibe-Coded Software'
description: 'An exploration of the potential pitfalls and challenges facing vibe-coded software in the near future.'
pubDate: '2026-02-16'
heroImage: '../../assets/blog-placeholder-2.jpg'
tags: ['technology', 'software', 'programming', 'future']
---

I want to start by admitting that I will almost definitely have a bias when it comes to programming. Personally, I got into this field because I love the craft.

Here is why I love programming and what I find fun about it:

- I like the idea of always learning.
- I like the puzzle of being able to solve something in multiple ways.
- I like translating real-life systems into UIs or methods.

That’s not an exhaustive list, but it should give you some idea about why I use AI the way I do.

## How I use AI

Personally, I do not let AI touch my codebase apart from doing quick tasks. For example, I might use it for renaming a bunch of methods or creating a default object for a test.

Instead, I use models like Claude and Gemini externally, mostly in the browser. I use them to ask questions about specific parts of the code or to fill a knowledge gap. Even then, I don't ask for a solution; I ask it to help me find the concept that I am misunderstanding.

Once I fully understand that concept, I can move on. I can make the change and be confident I know exactly what I am implementing, while gaining some more knowledge in the process.

I also use AI to tidy up my writing (like this blog post!) Otherwise, this blog would look rather different. A lot of my posts just start as ideas that I brainstorm into points and then write out bit by bit.

## A time and a place

I definitely think context is a big factor here. I am of the opinion that for quick, scrappy POCs or spikes, sure, go ahead. Vibe code your life away.

At the end of the day, the idea of that spike is to figure out if something is possible, not to write the most optimal implementation or the cleanest code. So, I feel this is where AI shines.

However, when it comes to production code going into a real piece of software, I don't think I will ever feel comfortable having AI fully take over. It is always going to produce average or below-average code because it lacks architectural knowledge. I prefer using it as a helper to explain concepts to me, rather than trying to predict what I want.

## A prediction

I think in the next 5 years we will see a massive rise in AI (duh). We will see agentic workflows and all the buzzwords. However, we will also see a massive drop in quality.

The engineers who weather the storm will be the ones who use AI to learn concepts and become better engineers, rather than letting it write code for them.

Most of the micro start-ups that were "vibe coded" in a week with ~$2000 worth of credits will fall short. They will be impossible to maintain. Eventually, the companies that double down on quality (where AI does not take full control) will gain back their customer base. This will swing the shift back to the non-vibe coders.
## Worrying times

I believe we are in worrying times, at least for software (or what should be perceived as software). The same stupid metrics are being used again to evaluate productiveness and proficiency.

Here are some examples, and their opposites in brackets:

- **Lines of code** (Surely 0 lines of code is the best amount of code to be writing). Don't forget that each line you write requires a lot of maintenance and documentation. If you don't have an idea what your AI has written, that is going to be some hard documentation to write.
- **Time to ship** (This metric is not all that bad and is typically quite good). However, the issue with development taking a long time is mostly due to bureaucracy. It is also often due to updates or edits whilst a feature or fix is being worked on.
- **But it's covered by coverage** (This is my personal pet peeve). If you didn't write the test, how the hell can you be sure that what AI has generated has actually done what you told it to do? It seems rather dangerous to get the AI to write the code _and_ the tests. Surely the metric the AI is using is just to make the tests pass, rather than looking for edge cases or logic gaps.
- **Cheating in interviews** (I'm surprised at this one). Obviously, it is going to happen. But surely it should be pretty easy to tell when someone has scratch knowledge versus actual knowledge on a subject.

## A Note for Juniors

I worry most for the junior engineers starting today. If I had ChatGPT when I started, I would have used it to bypass every struggle. But those struggles were exactly how I learned to think like a programmer.

If you let AI solve the logic for you, you are robbing yourself of the "Aha!" moment. You are building a house without digging the foundations. Use AI to explain the error, not to fix it.

## The pendulum will swing back

I will end with this.

If you are an engineer who loves the craft, and who worries that you are being left behind by the "10x AI engineers", do not worry.

The pendulum always swings back.

When the "vibe-coded" apps start breaking and the technical debt becomes too expensive to pay off, the market will look for the people who actually know how the system works.

So, keep learning. Keep solving the puzzles. The world is going to need real engineers more than ever.

