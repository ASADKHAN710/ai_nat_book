# Data Model: Digital Twin Simulation Module

## Content Entities

### Chapter
- **name**: String - The name of the chapter (e.g., "Physics Simulation with Gazebo", "Sensors in Simulation", "High-Fidelity Digital Twins")
- **slug**: String - URL-friendly identifier for the chapter
- **title**: String - The full title displayed in navigation and page
- **description**: String - Brief summary of the chapter content
- **learning_objectives**: Array<String> - List of what students should learn from this chapter
- **content**: String - The main Markdown content of the chapter
- **prerequisites**: Array<String> - Knowledge required before reading this chapter
- **next_chapter**: String - Reference to the next chapter in sequence

### Module
- **name**: String - The name of the module ("Digital Twin Simulation")
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

## Simulation-Specific Entities

### GazeboConfiguration
- **name**: String - Name of the configuration
- **parameters**: Object - Key-value pairs of Gazebo parameters (gravity, physics engine, etc.)
- **description**: String - Explanation of what the configuration does
- **use_case**: String - When to use this configuration

### SensorModel
- **type**: String - Type of sensor (LiDAR, camera, IMU, etc.)
- **parameters**: Object - Configuration parameters for the sensor
- **ros_interface**: String - How the sensor connects to ROS 2
- **simulation_behavior**: String - How the sensor behaves in simulation

### UnityScene
- **name**: String - Name of the Unity scene
- **components**: Array<String> - List of components in the scene
- **interactions**: Array<String> - List of possible human-robot interactions
- **visualization_features**: Array<String> - High-fidelity visualization capabilities