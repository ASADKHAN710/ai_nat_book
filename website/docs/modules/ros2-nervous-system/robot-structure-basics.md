---
id: robot-structure-basics
title: Robot Structure and Modeling
sidebar_label: Robot Structure Basics
sidebar_position: 3
description: Bridging AI agents to ROS controllers and understanding URDF fundamentals
---

# Robot Structure and Modeling

## Learning Objectives

By the end of this chapter, you will be able to:
- Explain how to bridge AI agents to ROS controllers
- Understand URDF fundamentals for modeling robot structures
- Model humanoid joints, links, and sensors
- Create and modify URDF files to represent simple robot structures
- Understand how AI agents interface with ROS controllers for robot control

## Bridging AI Agents to ROS Controllers

The connection between AI agents and ROS controllers forms the critical link between high-level decision-making and low-level robot control. This bridge enables AI systems to influence physical robot behavior and respond to environmental feedback.

### The AI-ROS Interface Layer

The interface between AI agents and ROS controllers typically involves several layers:

1. **High-Level AI Layer**: Complex reasoning, planning, and decision-making
2. **Task Planning Layer**: Converting high-level goals into sequences of actions
3. **Motion Planning Layer**: Generating specific movements to achieve tasks
4. **Control Layer**: Converting planned movements into low-level commands
5. **Hardware Interface Layer**: Communicating with physical robot components

### Communication Patterns

AI agents typically interact with ROS controllers through several communication patterns:

#### Action Servers
Actions are used for long-running tasks that provide feedback and can be canceled. This is ideal for AI agents that need to monitor the progress of complex robot behaviors:

```python
import rclpy
from rclpy.action import ActionClient
from rclpy.node import Node
from move_base_msgs.action import MoveBase

class AINavigationAgent(Node):
    def __init__(self):
        super().__init__('ai_navigation_agent')
        self._action_client = ActionClient(self, MoveBase, 'move_base')

    def send_goal(self, x, y, theta):
        goal_msg = MoveBase.Goal()
        goal_msg.target_pose.header.frame_id = 'map'
        goal_msg.target_pose.pose.position.x = x
        goal_msg.target_pose.pose.position.y = y
        goal_msg.target_pose.pose.orientation.z = theta

        self._action_client.wait_for_server()
        self._send_goal_async(goal_msg)
```

#### Topic-Based Communication
For continuous monitoring and control, AI agents often use topics to publish commands and subscribe to sensor data:

```python
class AIBehaviorAgent(Node):
    def __init__(self):
        super().__init__('ai_behavior_agent')
        self.cmd_vel_publisher = self.create_publisher(Twist, '/cmd_vel', 10)
        self.laser_subscriber = self.create_subscription(LaserScan, '/scan', self.scan_callback, 10)

    def scan_callback(self, msg):
        # Process laser scan data
        # Make AI decisions based on sensor input
        if self.should_avoid_obstacle(msg):
            self.avoid_obstacle()

    def should_avoid_obstacle(self, scan_msg):
        # AI logic to determine if obstacle avoidance is needed
        return min(scan_msg.ranges) < 0.5  # If obstacle closer than 0.5m

    def avoid_obstacle(self):
        # Publish command to avoid obstacle
        cmd_msg = Twist()
        cmd_msg.linear.x = 0.0
        cmd_msg.angular.z = 0.5  # Turn to avoid
        self.cmd_vel_publisher.publish(cmd_msg)
```

### AI Agent Integration Patterns

#### Reactive Agents
Reactive agents respond directly to sensor input without maintaining internal state:

```python
class ReactiveAIAgent(Node):
    def __init__(self):
        super().__init__('reactive_ai_agent')
        self.cmd_publisher = self.create_publisher(Twist, '/cmd_vel', 10)
        self.sensor_subscriber = self.create_subscription(LaserScan, '/scan', self.react_to_sensor, 10)

    def react_to_sensor(self, sensor_data):
        # Direct mapping from sensor input to motor output
        cmd = self.compute_reaction(sensor_data)
        self.cmd_publisher.publish(cmd)

    def compute_reaction(self, sensor_data):
        # Simple reactive logic
        cmd = Twist()
        if min(sensor_data.ranges) < 0.5:
            cmd.angular.z = 1.0  # Turn away from obstacle
        else:
            cmd.linear.x = 0.5   # Move forward
        return cmd
```

#### Planning-Based Agents
Planning-based agents maintain internal models and plan sequences of actions:

```python
class PlanningAIAgent(Node):
    def __init__(self):
        super().__init__('planning_ai_agent')
        self.plan_publisher = self.create_publisher(PoseArray, '/plan', 10)
        self.map_subscriber = self.create_subscription(OccupancyGrid, '/map', self.update_map, 10)

    def update_map(self, map_data):
        # Update internal world model
        self.internal_map = map_data
        # Replan if goal or environment changed
        if self.should_replan():
            self.plan_to_goal()
```

## URDF Fundamentals

URDF (Unified Robot Description Format) is an XML-based format for representing robot models in ROS. URDF describes the physical structure of a robot, including links, joints, and their relationships.

### Basic URDF Structure

A URDF file describes a robot as a collection of rigid bodies (links) connected by joints in a tree structure (no loops). The basic structure includes:

- **Links**: Rigid bodies that represent physical parts of the robot
- **Joints**: Connections between links that define how they can move relative to each other
- **Visual**: How the robot appears in visualization tools
- **Collision**: How the robot interacts with the physical world in simulation

### Links

Links represent rigid bodies in the robot. Each link can have:
- Mass and inertial properties
- Visual representation
- Collision representation
- Optional material properties

Example of a simple link:
```xml
<link name="base_link">
  <inertial>
    <mass value="1.0" />
    <origin xyz="0 0 0" />
    <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.01" />
  </inertial>
  <visual>
    <origin xyz="0 0 0" rpy="0 0 0" />
    <geometry>
      <cylinder length="0.1" radius="0.1" />
    </geometry>
    <material name="blue">
      <color rgba="0 0 1 1" />
    </material>
  </visual>
  <collision>
    <origin xyz="0 0 0" rpy="0 0 0" />
    <geometry>
      <cylinder length="0.1" radius="0.1" />
    </geometry>
  </collision>
</link>
```

### Joints

Joints define the connection between two links. Common joint types include:
- **Revolute**: Rotational joint with limits
- **Continuous**: Rotational joint without limits
- **Prismatic**: Linear sliding joint with limits
- **Fixed**: No movement between links
- **Floating**: 6-DOF movement (for simulation)
- **Planar**: Motion in a plane

Example of a joint:
```xml
<joint name="wheel_joint" type="continuous">
  <parent link="base_link" />
  <child link="wheel_link" />
  <origin xyz="0.0 0.1 0.0" rpy="0 0 0" />
  <axis xyz="0 1 0" />
</joint>
```

### Complete URDF Example

Here's a simple wheeled robot URDF:

```xml
<?xml version="1.0"?>
<robot name="simple_robot">
  <!-- Base link -->
  <link name="base_link">
    <visual>
      <geometry>
        <cylinder length="0.2" radius="0.1" />
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1" />
      </material>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.2" radius="0.1" />
      </geometry>
    </collision>
    <inertial>
      <mass value="1.0" />
      <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.02" />
    </inertial>
  </link>

  <!-- Left wheel -->
  <link name="left_wheel">
    <visual>
      <geometry>
        <cylinder length="0.05" radius="0.05" />
      </geometry>
      <material name="black">
        <color rgba="0 0 0 1" />
      </material>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.05" radius="0.05" />
      </geometry>
    </collision>
    <inertial>
      <mass value="0.1" />
      <inertia ixx="0.001" ixy="0.0" ixz="0.0" iyy="0.001" iyz="0.0" izz="0.002" />
    </inertial>
  </link>

  <!-- Right wheel -->
  <link name="right_wheel">
    <visual>
      <geometry>
        <cylinder length="0.05" radius="0.05" />
      </geometry>
      <material name="black">
        <color rgba="0 0 0 1" />
      </material>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.05" radius="0.05" />
      </geometry>
    </collision>
    <inertial>
      <mass value="0.1" />
      <inertia ixx="0.001" ixy="0.0" ixz="0.0" iyy="0.001" iyz="0.0" izz="0.002" />
    </inertial>
  </link>

  <!-- Joints -->
  <joint name="left_wheel_joint" type="continuous">
    <parent link="base_link" />
    <child link="left_wheel" />
    <origin xyz="0.0 0.1 0.0" rpy="0 0 0" />
    <axis xyz="0 1 0" />
  </joint>

  <joint name="right_wheel_joint" type="continuous">
    <parent link="base_link" />
    <child link="right_wheel" />
    <origin xyz="0.0 -0.1 0.0" rpy="0 0 0" />
    <axis xyz="0 1 0" />
  </joint>
</robot>
```

## Modeling Humanoid Joints, Links, and Sensors

Humanoid robots present unique challenges in URDF modeling due to their complex structure with many degrees of freedom and various sensor types.

### Humanoid Link Structure

A typical humanoid robot has a hierarchical structure:
- **Torso**: Main body with head, arms, and legs attached
- **Head**: Usually with cameras and other sensors
- **Arms**: Shoulders, elbows, wrists, and hands
- **Legs**: Hips, knees, ankles, and feet

Example of a simplified humanoid torso:
```xml
<robot name="simple_humanoid">
  <!-- Torso -->
  <link name="torso">
    <visual>
      <geometry>
        <box size="0.3 0.2 0.5" />
      </geometry>
      <material name="white">
        <color rgba="1 1 1 1" />
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.3 0.2 0.5" />
      </geometry>
    </collision>
    <inertial>
      <mass value="5.0" />
      <inertia ixx="0.1" ixy="0.0" ixz="0.0" iyy="0.1" iyz="0.0" izz="0.1" />
    </inertial>
  </link>

  <!-- Head -->
  <link name="head">
    <visual>
      <geometry>
        <sphere radius="0.1" />
      </geometry>
      <material name="white">
        <color rgba="1 1 1 1" />
      </material>
    </visual>
    <collision>
      <geometry>
        <sphere radius="0.1" />
      </geometry>
    </collision>
    <inertial>
      <mass value="1.0" />
      <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.01" />
    </inertial>
  </link>

  <!-- Neck joint -->
  <joint name="neck_joint" type="revolute">
    <parent link="torso" />
    <child link="head" />
    <origin xyz="0.0 0.0 0.25" />
    <axis xyz="0 1 0" />
    <limit lower="-0.5" upper="0.5" effort="10.0" velocity="1.0" />
  </joint>
</robot>
```

### Sensor Integration in URDF

Sensors are typically modeled as additional links with appropriate joint connections to the main robot structure:

```xml
<!-- Camera sensor -->
<link name="camera_link">
  <visual>
    <geometry>
      <box size="0.05 0.05 0.03" />
    </geometry>
    <material name="black">
      <color rgba="0 0 0 1" />
    </material>
  </visual>
  <inertial>
    <mass value="0.05" />
    <inertia ixx="0.001" ixy="0.0" ixz="0.0" iyy="0.001" iyz="0.0" izz="0.001" />
  </inertial>
</link>

<joint name="camera_joint" type="fixed">
  <parent link="head" />
  <child link="camera_link" />
  <origin xyz="0.05 0.0 0.0" rpy="0 0 0" />
</joint>

<!-- Gazebo plugin for the camera -->
<gazebo reference="camera_link">
  <sensor type="camera" name="camera1">
    <pose>0 0 0 0 0 0</pose>
    <visualize>true</visualize>
    <update_rate>30.0</update_rate>
    <camera name="head_camera">
      <horizontal_fov>1.3962634</horizontal_fov>
      <image>
        <width>800</width>
        <height>600</height>
        <format>R8G8B8</format>
      </image>
      <clip>
        <near>0.02</near>
        <far>300</far>
      </clip>
    </camera>
    <plugin name="camera_controller" filename="libgazebo_ros_camera.so">
      <frame_name>camera_link</frame_name>
    </plugin>
  </sensor>
</gazebo>
```

## Examples of URDF Files Demonstrating Humanoid Configurations

Here's a more complete example of a simple humanoid leg:

```xml
<!-- Hip joint -->
<link name="left_hip">
  <visual>
    <geometry>
      <box size="0.1 0.1 0.1" />
    </geometry>
    <material name="gray">
      <color rgba="0.5 0.5 0.5 1" />
    </material>
  </visual>
  <collision>
    <geometry>
      <box size="0.1 0.1 0.1" />
    </geometry>
  </collision>
  <inertial>
    <mass value="1.0" />
    <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.01" />
  </inertial>
</link>

<joint name="left_hip_joint" type="revolute">
  <parent link="torso" />
  <child link="left_hip" />
  <origin xyz="0.0 -0.1 -0.2" />
  <axis xyz="0 0 1" />
  <limit lower="-1.57" upper="1.57" effort="50.0" velocity="2.0" />
</joint>

<!-- Thigh -->
<link name="left_thigh">
  <visual>
    <geometry>
      <cylinder length="0.4" radius="0.05" />
    </geometry>
    <material name="red">
      <color rgba="1 0 0 1" />
    </material>
  </visual>
  <collision>
    <geometry>
      <cylinder length="0.4" radius="0.05" />
    </geometry>
  </collision>
  <inertial>
    <mass value="2.0" />
    <inertia ixx="0.05" ixy="0.0" ixz="0.0" iyy="0.05" iyz="0.0" izz="0.01" />
  </inertial>
</link>

<joint name="left_knee_joint" type="revolute">
  <parent link="left_hip" />
  <child link="left_thigh" />
  <origin xyz="0.0 0.0 -0.2" />
  <axis xyz="0 1 0" />
  <limit lower="0" upper="2.35" effort="50.0" velocity="2.0" />
</joint>

<!-- Shin -->
<link name="left_shin">
  <visual>
    <geometry>
      <cylinder length="0.4" radius="0.05" />
    </geometry>
    <material name="red">
      <color rgba="1 0 0 1" />
    </material>
  </visual>
  <collision>
    <geometry>
      <cylinder length="0.4" radius="0.05" />
    </geometry>
  </collision>
  <inertial>
    <mass value="1.5" />
    <inertia ixx="0.04" ixy="0.0" ixz="0.0" iyy="0.04" iyz="0.0" izz="0.01" />
  </inertial>
</link>

<joint name="left_ankle_joint" type="revolute">
  <parent link="left_thigh" />
  <child link="left_shin" />
  <origin xyz="0.0 0.0 -0.4" />
  <axis xyz="0 1 0" />
  <limit lower="-1.0" upper="1.0" effort="30.0" velocity="2.0" />
</joint>
```

## Summary

This chapter has covered the essential concepts for bridging AI agents to ROS controllers and understanding URDF fundamentals. The interface between AI and robotics requires careful consideration of communication patterns, whether using topics for continuous data flow, services for request-response interactions, or actions for complex, cancellable tasks.

URDF provides the foundation for representing robot structure in ROS, defining the links and joints that make up a robot's physical form. Understanding how to model humanoid robots with their complex joint structures and integrated sensors is crucial for creating accurate robot representations that can be used in both simulation and real-world applications.

The integration of AI agents with ROS controllers and proper robot modeling enables sophisticated robotic behaviors that can perceive, reason, and act in complex environments. This completes our exploration of the ROS 2 Nervous System module, covering the fundamental concepts from basic ROS 2 understanding through communication patterns to robot structure and AI integration.