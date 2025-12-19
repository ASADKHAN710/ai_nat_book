<!--
Sync Impact Report:
- Version change: 0.1.0 → 1.0.0
- Modified principles: All placeholders replaced with specific content for AI-Driven Technical Book project
- Added sections: Core Principles (6), Additional Constraints, Development Workflow, Governance
- Removed sections: None
- Templates requiring updates: ✅ Updated all template placeholders
- Follow-up TODOs: None
-->

# AI-Driven Technical Book with Embedded RAG Chatbot Constitution

## Core Principles

### I. Spec-Driven Development
All development must follow Spec-Kit Plus methodology with formal specifications preceding implementation; Every feature requires a spec document with clear acceptance criteria and testable requirements; No implementation without corresponding spec.

### II. Technical Accuracy and Reproducibility
All content and code examples must be technically accurate, tested, and reproducible; Code snippets must be executable and validated against actual implementations; All claims must be verifiable through evidence or working examples.

### III. No Hallucinated Content
All information must be grounded in reality, verified sources, or working implementations; No fictional examples, made-up data, or speculative content without clear disclaimers; Responses from RAG chatbot must be strictly based on retrieved content.

### IV. Clear Instructional Writing
Content must be written with clear pedagogical intent, explaining concepts systematically; Each chapter follows consistent structure: objectives, explanation, code, and summary; Documentation prioritizes clarity over cleverness.

### V. Modular Architecture
System components must be modular and independently deployable; Frontend (Docusaurus), backend (FastAPI), database (Neon), and vector store (Qdrant) must have clear interfaces; Separation of concerns maintained between book content and chatbot functionality.

### VI. Grounded AI Responses
RAG chatbot responses must be strictly grounded in retrieved book content; Both full-book and selected-text query modes must maintain factual accuracy; Response generation must include proper citation to source material.

## Additional Constraints
- Platform: Docusaurus with Markdown-based content
- AI authoring: Claude Code for content generation and refinement
- Deployment: GitHub Pages for static site, with backend services separately hosted
- Tech Stack: OpenAI Agents/ChatKit SDKs, FastAPI, Neon Serverless Postgres, Qdrant Cloud
- Content Integration: Tight coupling between book chapters and RAG retrieval system

## Development Workflow
- Specification-first approach using Spec-Kit Plus templates
- Chapter development follows concept → architecture → implementation → deployment structure
- All code examples must be tested and validated before inclusion
- RAG system must be trained/tested with each content update
- Peer review required for both technical accuracy and pedagogical effectiveness

## Governance
This constitution governs all aspects of the AI-Driven Technical Book project; All contributions must comply with these principles; Amendments require formal documentation and team consensus; Regular compliance reviews ensure adherence to standards.

**Version**: 1.0.0 | **Ratified**: 2025-12-17 | **Last Amended**: 2025-12-17
