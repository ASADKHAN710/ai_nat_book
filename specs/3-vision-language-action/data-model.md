# Data Model: Vision-Language-Action (VLA) Systems Module

## Module Entity

**VLA_Module**
- id: string (e.g., "vision-language-action")
- title: string (e.g., "Vision-Language-Action Systems for Humanoid Robots")
- description: string (purpose and scope of the module)
- chapters: Chapter[] (ordered list of chapters in the module)
- prerequisites: string[] (required knowledge areas for students)
- learning_objectives: string[] (overall objectives for the module)

## Chapter Entities

**Chapter**
- id: string (unique identifier for the chapter)
- title: string (display title for the chapter)
- sidebar_label: string (label used in navigation sidebar)
- sidebar_position: number (position in sidebar hierarchy)
- content_sections: ContentSection[] (ordered sections within the chapter)
- learning_objectives: string[] (specific objectives for this chapter)
- prerequisites: string[] (knowledge needed for this chapter)
- next_chapter: string (reference to subsequent chapter, if any)

**VoiceToActionChapter** (extends Chapter)
- focus_areas: ["voice-commands", "speech-to-text", "action-mapping"]
- technologies: ["OpenAI-Whisper"]
- key_concepts: string[] (voice processing, command mapping, audio interfaces)

**CognitivePlanningChapter** (extends Chapter)
- focus_areas: ["natural-language-processing", "task-decomposition", "llm-integration"]
- technologies: ["LLMs", "ROS2-action-pipelines"]
- key_concepts: string[] (planning, decomposition, cognitive systems)

**AutonomousHumanoidChapter** (extends Chapter)
- focus_areas: ["system-integration", "end-to-end-flow", "simulation"]
- technologies: ["ROS2", "simulation-frameworks"]
- key_concepts: string[] (integration, autonomy, complete systems)

## Content Section Entity

**ContentSection**
- id: string (unique identifier within chapter)
- title: string (section title)
- type: enum ("learning-objectives", "explanation", "example", "summary", "exercise")
- content: string (markdown content for the section)
- related_concepts: string[] (concepts this section relates to)
- duration_estimate: number (estimated reading time in minutes)

## Educational Entity

**LearningObjective**
- id: string (unique identifier)
- text: string (description of what student should learn)
- module_id: string (reference to parent module)
- chapter_id: string (reference to parent chapter, if applicable)
- measurable: boolean (can this be objectively assessed?)

## Navigation Entity

**SidebarItem**
- type: string (e.g., "doc", "category")
- id: string (reference to document or category)
- label: string (display text in sidebar)
- position: number (ordering in sidebar)
- collapsed: boolean (initial collapsed state for categories)
- items: SidebarItem[] (child items if this is a category)

## Content Relationships

**Module to Chapter**: One-to-Many (one module contains multiple chapters)
**Chapter to Section**: One-to-Many (one chapter contains multiple sections)
**Chapter to LearningObjective**: One-to-Many (one chapter has multiple learning objectives)
**Chapter to Prerequisite**: Many-to-Many (chapters can have multiple prerequisites, prerequisites can apply to multiple chapters)

## Validation Rules

1. Each module must have 1-3 learning objectives at minimum
2. Each chapter must have at least 3 content sections
3. Sidebar positions must be unique within each parent category
4. Chapter IDs must be unique within a module
5. Content sections must have non-empty content
6. Learning objectives must be measurable and specific
7. Prerequisites must reference existing modules or external knowledge areas

## State Transitions (if applicable)

**ChapterState**
- draft → review (when content is completed for review)
- review → approved (when content passes quality review)
- approved → published (when content is made available to students)