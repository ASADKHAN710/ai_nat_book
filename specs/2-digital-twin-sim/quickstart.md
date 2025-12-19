# Quickstart: Digital Twin Simulation Module

## Setup Docusaurus Environment

1. **Install Node.js and npm**
   - Install Node.js version 18 or higher
   - npm comes with Node.js installation

2. **Navigate to website directory**
   ```bash
   cd website
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

## Add Module Content

1. **Create Module Directory**
   ```bash
   mkdir docs/modules/digital-twin-sim
   ```

2. **Add Chapter Files**
   ```bash
   touch docs/modules/digital-twin-sim/physics-simulation-gazebo.md
   touch docs/modules/digital-twin-sim/sensors-in-simulation.md
   touch docs/modules/digital-twin-sim/high-fidelity-digital-twins.md
   ```

3. **Configure Sidebar**
   Edit `sidebars.ts` (in the website directory) to include the new module:
   ```typescript
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
     {
       type: 'category',
       label: 'Digital Twin Simulation',
       items: [
         'modules/digital-twin-sim/physics-simulation-gazebo',
         'modules/digital-twin-sim/sensors-in-simulation',
         'modules/digital-twin-sim/high-fidelity-digital-twins',
       ],
     },
   ],
   ```

## Run Development Server

```bash
npm start
```

This will start the development server and open your browser to http://localhost:3000/ai-nat-book/.

## Content Creation Guidelines

1. **Chapter Structure**:
   - Begin with learning objectives
   - Include practical examples where applicable
   - End with a summary of key points

2. **Frontmatter for Each Chapter**:
   ```markdown
   ---
   id: physics-simulation-gazebo
   title: Physics Simulation with Gazebo
   sidebar_label: Physics Simulation
   sidebar_position: 4
   description: Understanding physics-based simulation using Gazebo for humanoid robots
   ---
   ```

3. **Gazebo/Unity Content Accuracy**:
   - Reference official Gazebo and Unity documentation
   - Use current version examples
   - Test all configuration examples before inclusion

## Deploy to GitHub Pages

1. **Configure Deployment Settings**
   - Update `docusaurus.config.ts` with your GitHub repository details
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
- [ ] All configuration examples tested and accurate