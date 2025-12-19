// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
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
    {
      type: 'category',
      label: 'AI-Robot Brain (NVIDIA Isaac)',
      items: [
        'modules/ai-robot-brain-isaac/nvidia-isaac-sim',
        'modules/ai-robot-brain-isaac/isaac-ros-perception',
        'modules/ai-robot-brain-isaac/nav2-navigation',
      ],
    },
    {
      type: 'category',
      label: 'Vision-Language-Action (VLA) Systems',
      items: [
        'modules/vision-language-action/voice-to-action',
        'modules/vision-language-action/cognitive-planning',
        'modules/vision-language-action/autonomous-humanoid',
      ],
    },
  ],
};

module.exports = sidebars;