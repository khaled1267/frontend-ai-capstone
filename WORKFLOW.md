# FE-03: AI-Assisted Development Workflow Comparison

## Overview

This assignment compares two approaches to building the same Settings Form feature in the FlyRank Frontend AI Capstone project. The goal is to understand how prompt quality affects implementation, testing, accessibility, and code review.

## Round 1: Vague Prompt

For the first round, I used a deliberately vague prompt asking the AI agent to implement a Settings page and form. The agent created a responsive page with Display Name, Email, Time Zone, and Product Update Preferences fields. It also added Zod-based validation, inline error messages, a success confirmation, and tests.

The implementation was reviewed and committed on the `fe03-round1-vague` branch. The agent reported that tests, linting, TypeScript checks, the production build, and `git diff --check` passed.

## Round 2: Precise Prompt

For the second round, I used a more specific prompt that described the expected fields, validation behavior, accessibility requirements, testing expectations, and the fact that submission was a demo rather than persistent storage. The agent implemented the form using React Hook Form and Zod, added or updated tests, and maintained the session-only confirmation behavior.

The work was committed separately on the `fe03-round2-precise` branch. The agent reported that tests, linting, TypeScript checks, the production build, and `git diff --check` passed.

## Comparison and Review

A branch diff showed changes in four files: `src/app/page.tsx`, `src/app/page.test.tsx`, `src/app/settings-form.tsx`, and `src/app/settings-form.test.tsx`. The comparison therefore covers both implementation and test behavior, rather than only visual changes.

Both rounds produced a working implementation according to their reported checks. The precise prompt provided clearer expectations for validation, accessibility, and verification, making the intended behavior easier to evaluate. However, passing automated checks alone does not prove that every edge case or accessibility concern has been handled correctly. Reviewing the actual code and testing invalid and valid submissions remain important.

## Project-Specific Rules

The project rules require every form field to have an accessible label and associated validation errors. Invalid submissions must not succeed, and demo-only forms must not claim that data has been permanently saved. These rules help keep future AI-generated changes consistent with the project requirements.

## Conclusion

This exercise demonstrates that detailed prompts can make AI-assisted development more predictable and easier to review. AI output still requires independent verification. Before final submission, I will document the actual review times and one specific AI-generated mistake identified during code review, based on evidence from the implementation or tests.
