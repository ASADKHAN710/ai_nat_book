# Data Model: ROS 2 Nervous System Module

## Content Entities

### Chapter
- **name**: String - The name of the chapter (e.g., "Intro to ROS 2", "ROS 2 Communication", "Robot Structure Basics")
- **slug**: String - URL-friendly identifier for the chapter
- **title**: String - The full title displayed in navigation and page
- **description**: String - Brief summary of the chapter content
- **learning_objectives**: Array<String> - List of what students should learn from this chapter
- **content**: String - The main Markdown content of the chapter
- **prerequisites**: Array<String> - Knowledge required before reading this chapter
- **next_chapter**: String - Reference to the next chapter in sequence

### Module
- **name**: String - The name of the module ("ROS 2 Nervous System")
- **slug**: String - URL-friendly identifier for the module
- **description**: String - Brief summary of the module
- **chapters**: Array<Chapter> - List of chapters in the module
- **target_audience**: String - Description of the intended audience
- **prerequisites**: Array<String> - Overall prerequisites for the module

### NavigationItem
- **label**: String - The text displayed in navigation
- **to**: String - The path to the page
- **items**: Array<NavigationItem> - Child navigation items (for hierarchical structure)
- **type**: String - Type of navigation item (doc, link, category)

## Relationships

- A Module contains 3 Chapters (one-to-many relationship)
- Each Chapter belongs to exactly one Module
- NavigationItems can have hierarchical relationships (parent-child) to create the sidebar structure

## Validation Rules

- Chapter names must be unique within a Module
- Chapter slugs must be URL-friendly (lowercase, hyphens only)
- Module must have at least one Chapter
- All content fields must be non-empty
- Learning objectives must be specific and measurable
- Prerequisites must be clearly defined

## State Transitions

- Draft → Review → Published (for content status)
- Each chapter can be in different states during development
- Module state depends on the state of its chapters

## Content Structure

### Chapter Markdown Frontmatter
```yaml
id: unique-chapter-id
title: Full Chapter Title
sidebar_label: Sidebar Display Name
sidebar_position: integer position in sidebar
description: Brief description of chapter content
tags: [list, of, relevant, tags]
```

### Module Configuration
- Module structure will be defined in the sidebar configuration
- Each module will have a dedicated section in the sidebar
- Chapters within a module will be nested under the module heading