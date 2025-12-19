# Claude Context for AI-Driven Technical Book

## Project Overview
The AI-Driven Technical Book is an educational resource focused on robotics, particularly humanoid robots using ROS 2, simulation, and AI. The project uses Docusaurus for documentation with a modular approach to content organization.

## NVIDIA Isaac Module (Module 3)
- **Module Name**: The AI-Robot Brain (NVIDIA Isaac)
- **Purpose**: Introduce advanced perception, navigation, and training for humanoid robots using NVIDIA Isaac
- **Target Audience**: Students familiar with ROS 2 and simulation basics
- **Level**: Beginner-to-intermediate
- **Format**: Docusaurus documentation in Markdown format

### Key Concepts
1. **NVIDIA Isaac Sim**:
   - NVIDIA's simulation platform for robotics AI development
   - Provides photorealistic environments and synthetic data generation
   - Enables training of perception models with domain randomization
   - Integrates with Omniverse for collaborative simulation

2. **Isaac ROS**:
   - Set of packages integrating Isaac capabilities with ROS 2
   - Provides hardware-accelerated perception using NVIDIA GPUs
   - Includes optimized computer vision and SLAM algorithms
   - Designed for real-time robotic applications

3. **VSLAM (Visual SLAM)**:
   - Visual Simultaneous Localization and Mapping
   - Accelerated algorithms optimized for NVIDIA hardware
   - Includes loop closure and relocalization capabilities
   - Part of Isaac's perception stack

4. **Sensor-to-AI Pipelines**:
   - Complete data flow from sensors to AI processing
   - Includes preprocessing and normalization steps
   - Optimized data pathways in Isaac ecosystem
   - Supports various sensor fusion approaches

5. **Nav2 Integration**:
   - Standard ROS 2 navigation framework with Isaac accelerations
   - Hardware-accelerated navigation algorithms
   - Integration points with Isaac's perception and simulation
   - Optimized for different robot platforms including humanoid robots

6. **Humanoid Robot Navigation**:
   - Path planning with balance and stability considerations
   - Bipedal locomotion constraints in navigation
   - Dynamic obstacle and terrain challenges
   - Coordination between high-level planning and low-level gait control

### Educational Approach
- Concept-focused rather than implementation-focused
- Beginner-to-intermediate level content
- Connection between simulation and real-world deployment
- Building on previous modules (ROS 2, Digital Twin Simulation)

## Constraints
- Content must be concept-focused, not implementation-focused
- Maintain beginner-to-intermediate level accessibility
- Ensure technical accuracy while avoiding overly complex details
- Connect simulation concepts to real-world deployment scenarios
- Integrate cleanly with existing Docusaurus structure and sidebar