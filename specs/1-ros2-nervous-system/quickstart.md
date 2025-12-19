# Quickstart: ROS 2 Nervous System Module

## Setup Docusaurus Environment

1. **Install Node.js and npm**
   - Install Node.js version 18 or higher
   - npm comes with Node.js installation

2. **Install Docusaurus CLI**
   ```bash
   npm install -g @docusaurus/core@latest
   ```

3. **Create Docusaurus Project**
   ```bash
   npx create-docusaurus@latest website classic
   cd website
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

## Add Module Content

1. **Create Module Directory**
   ```bash
   mkdir docs/modules/ros2-nervous-system
   ```

2. **Add Chapter Files**
   ```bash
   touch docs/modules/ros2-nervous-system/intro-to-ros2.md
   touch docs/modules/ros2-nervous-system/ros2-communication.md
   touch docs/modules/ros2-nervous-system/robot-structure-basics.md
   ```

3. **Configure Sidebar**
   Edit `sidebars.js` to include the new module:
   ```javascript
   module.exports = {
     tutorialSidebar: [
       'intro',
       {
         type: 'category',
         label: 'ROS 2 Nervous System',
         items: [
           'modules/ros2-nervous-system/intro-to-ros2',
           'modules/ros2-nervous-system/ros2-communication',
           'modules/ros2-nervous-system/robot-structure-basics',
         ],
       },
     ],
   };
   ```

## Run Development Server

```bash
npm start
```

This will start the development server and open your browser to http://localhost:3000.

## Content Creation Guidelines

1. **Chapter Structure**:
   - Begin with learning objectives
   - Include practical examples where applicable
   - End with a summary of key points

2. **Frontmatter for Each Chapter**:
   ```markdown
   ---
   id: intro-to-ros2
   title: Introduction to ROS 2
   sidebar_label: Intro to ROS 2
   sidebar_position: 1
   description: Understanding ROS 2 as the robotic nervous system
   ---
   ```

3. **ROS 2 Content Accuracy**:
   - Reference official ROS 2 documentation
   - Use current ROS 2 distribution examples
   - Test all code examples before inclusion

## Deploy to GitHub Pages

1. **Configure Deployment Settings**
   - Update `docusaurus.config.js` with your GitHub repository details
   - Set the correct organization and project name

2. **Deploy Command**
   ```bash
   GIT_USER=<your-github-username> CURRENT_BRANCH=main npm run deploy
   ```

## Validation Checklist

- [ ] All chapter files created with proper frontmatter
- [ ] Sidebar configuration includes new module
- [ ] Navigation works correctly
- [ ] Content renders properly
- [ ] Links between chapters function correctly
- [ ] All code examples tested and accurate