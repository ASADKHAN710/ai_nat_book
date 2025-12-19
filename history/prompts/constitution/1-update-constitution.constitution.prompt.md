---
id: 1
title: Update Constitution
stage: constitution
date: 2025-12-17
surface: agent
model: Claude Sonnet 4.5
feature: none
branch: main
user:
command: /sp.constitution
labels: [constitution, spec-kit-plus, ai-book]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

```text
/sp.constitution

Project: AI-Driven Technical Book with Embedded RAG Chatbot

Objective:
Author and publish a technical book using Claude Code and Spec-Kit Plus, deployed via
Docusaurus on GitHub Pages, with an integrated RAG chatbot for contextual Q&A.

Core Principles:
- Spec-driven development
- Technical accuracy and reproducibility
- Clear, instructional writing
- No hallucinated content

Book Requirements:
- Platform: Docusaurus (Markdown-based)
- AI authoring: Claude Code
- Specs: Defined and enforced via Spec-Kit Plus
- Structure: Concept → Architecture → Implementation → Deployment
- Each chapter includes objectives, explanation, code, and summary

RAG Chatbot Requirements:
- Embedded in the Docusaurus site
- Answers questions using:
  - Full book content
  - User-selected text only
- Stack:
  - OpenAI Agents / ChatKit SDKs
  - FastAPI backend
  - Neon Serverless Postgres
  - Qdrant Cloud (Free Tier)
- Responses must be grounded strictly in retrieved content

Technical Constraints:
- Backend:
```

## Response snapshot

Updated the project constitution to reflect the AI-Driven Technical Book with Embedded RAG Chatbot project. The constitution now includes six core principles:

1. Spec-Driven Development: All development follows Spec-Kit Plus methodology
2. Technical Accuracy and Reproducibility: Content and code must be accurate and testable
3. No Hallucinated Content: Information must be grounded in reality
4. Clear Instructional Writing: Content must be pedagogically sound
5. Modular Architecture: Components must be modular and independently deployable
6. Grounded AI Responses: RAG chatbot responses must be based on retrieved content

Additional sections cover constraints, development workflow, and governance. The constitution is now version 1.0.0 with proper ratification and amendment dates.

## Outcome

- ✅ Impact: Created complete project constitution with 6 core principles and governance structure
- 🧪 Tests: none
- 📁 Files: Updated .specify/memory/constitution.md
- 🔁 Next prompts: Continue with spec creation using /sp.specify
- 🧠 Reflection: Constitution properly captures the project's core requirements and principles

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin feature specification with /sp.specify