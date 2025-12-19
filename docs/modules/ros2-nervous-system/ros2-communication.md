---
id: ros2-communication
title: ROS 2 Communication Patterns
sidebar_label: ROS 2 Communication
sidebar_position: 2
description: Understanding Nodes, Topics, Services, and Python control using rclpy
---

# ROS 2 Communication Patterns

## Learning Objectives

By the end of this chapter, you will be able to:
- Explain the core communication mechanisms in ROS 2: Nodes, Topics, and Services
- Understand data flow in robotic systems
- Control ROS 2 systems using Python with rclpy
- Implement basic communication patterns between AI logic and robot components
- Create publisher-subscriber and service client-server patterns

## Understanding Nodes, Topics, and Services

ROS 2 communication is built around three fundamental concepts: Nodes, Topics, and Services. These concepts form the backbone of how different parts of a robot system communicate with each other.

### Nodes

A node is an executable that uses ROS 2 to communicate with other nodes. Nodes are the basic unit of computation in ROS 2. Each node can perform specific functions such as controlling sensors, processing data, or commanding actuators.

In a typical robot system, you might have:
- Sensor nodes that read data from hardware sensors
- Processing nodes that analyze sensor data
- Controller nodes that send commands to actuators
- Interface nodes that connect to external systems

Nodes are organized into a distributed system where they can communicate with each other regardless of which computer they're running on, as long as they're on the same ROS 2 network.

### Topics and Publish-Subscribe Pattern

Topics are named buses over which nodes exchange messages. The publish-subscribe pattern is one of the most common communication patterns in ROS 2, where nodes publish messages to topics and other nodes subscribe to those topics to receive the messages.

This pattern has several key characteristics:
- **Asynchronous**: Publishers and subscribers don't need to be synchronized
- **Decoupled**: Publishers don't need to know about subscribers and vice versa
- **Broadcast**: One publisher can send to multiple subscribers
- **Real-time capable**: Low-latency communication suitable for robotics

Here's a simple example of how topics work in a robot system:
- A camera node publishes image data to the `/camera/image_raw` topic
- Multiple nodes (object detection, navigation, logging) can subscribe to this topic
- Each subscriber receives the same image data independently

### Services and Client-Server Pattern

Services provide a request-response communication pattern in ROS 2. When a node needs a specific piece of information or wants to trigger a specific action, it can call a service.

Key characteristics of services:
- **Synchronous**: The client waits for the server to respond
- **Request-response**: The client sends a request, the server sends a response
- **One-to-one**: Each service call is between one client and one server
- **Action-oriented**: Services are typically used for specific actions or computations

For example, a navigation node might provide a service that plans a path from a start point to a goal point. Other nodes can call this service when they need path planning.

## Data Flow in Robotic Systems

Understanding data flow is crucial for designing effective robotic systems. In ROS 2, data flows through the system via topics and services, creating a network of interconnected nodes.

### Sensor Data Flow

Sensor data typically flows from hardware to processing nodes:
1. Hardware drivers publish raw sensor data to topics
2. Filtering nodes may process this data and publish cleaner versions
3. Higher-level processing nodes consume the processed data for decision making

For example, in a mobile robot:
- IMU driver publishes raw inertial data to `/imu/data`
- A filtering node processes this and publishes filtered data to `/imu/data_filtered`
- The localization node subscribes to the filtered data for position estimation

### Command Flow

Command data typically flows from decision-making nodes to actuators:
1. Planning nodes publish high-level commands
2. Controller nodes translate these to low-level commands
3. Hardware interface nodes send commands to actuators

For example:
- A navigation node publishes velocity commands to `/cmd_vel`
- A motor controller subscribes to `/cmd_vel` and controls wheel motors

### Feedback Loops

Many robotic systems implement feedback loops where sensor data influences commands:
- Sensors provide information about the current state
- Controllers compare desired state with current state
- Commands are generated to reduce the difference

## Python Control using rclpy

rclpy is the Python client library for ROS 2. It provides the tools needed to create ROS 2 nodes in Python and interact with the ROS 2 ecosystem.

### Creating a Simple Publisher Node

Here's a basic example of a publisher node in Python:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Creating a Simple Subscriber Node

Here's a basic example of a subscriber node in Python:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):

    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info('I heard: "%s"' % msg.data)

def main(args=None):
    rclpy.init(args=args)
    minimal_subscriber = MinimalSubscriber()
    rclpy.spin(minimal_subscriber)
    minimal_subscriber.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Creating a Service Server

Here's an example of a service server in Python:

```python
from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node

class MinimalService(Node):

    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info('Incoming request\na: %d b: %d' % (request.a, request.b))
        return response

def main(args=None):
    rclpy.init(args=args)
    minimal_service = MinimalService()
    rclpy.spin(minimal_service)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Practical Python Examples using rclpy

Let's look at some practical examples of how to use rclpy for robot control:

### Example 1: Publishing Sensor Data

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan
import random

class SensorPublisher(Node):

    def __init__(self):
        super().__init__('sensor_publisher')
        self.publisher_ = self.create_publisher(LaserScan, '/scan', 10)
        timer_period = 0.1  # 10 Hz
        self.timer = self.create_timer(timer_period, self.publish_scan)

    def publish_scan(self):
        msg = LaserScan()
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.header.frame_id = 'laser_frame'

        # Simulate laser scan data
        msg.angle_min = -1.57  # -90 degrees
        msg.angle_max = 1.57   # 90 degrees
        msg.angle_increment = 0.0174  # 1 degree
        msg.time_increment = 0.0
        msg.scan_time = 0.1
        msg.range_min = 0.1
        msg.range_max = 10.0

        # Generate random ranges
        num_readings = int((msg.angle_max - msg.angle_min) / msg.angle_increment)
        msg.ranges = [random.uniform(0.5, 5.0) for _ in range(num_readings)]

        self.publisher_.publish(msg)

def main(args=None):
    rclpy.init(args=args)
    sensor_publisher = SensorPublisher()
    rclpy.spin(sensor_publisher)
    rclpy.shutdown()
```

### Example 2: Controlling a Mobile Robot

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class RobotController(Node):

    def __init__(self):
        super().__init__('robot_controller')
        self.publisher_ = self.create_publisher(Twist, '/cmd_vel', 10)

        # Timer to send commands periodically
        self.timer = self.create_timer(0.1, self.send_command)

    def send_command(self):
        msg = Twist()
        # Send a command to move forward and turn slightly
        msg.linear.x = 0.5  # Forward velocity (m/s)
        msg.angular.z = 0.2  # Angular velocity (rad/s)

        self.publisher_.publish(msg)

def main(args=None):
    rclpy.init(args=args)
    controller = RobotController()
    rclpy.spin(controller)
    rclpy.shutdown()
```

## Summary

ROS 2 communication patterns provide the essential infrastructure for connecting different parts of a robot system. The publish-subscribe pattern enables asynchronous, decoupled communication ideal for sensor data and status updates, while the service pattern provides synchronous request-response communication for specific actions.

Understanding these patterns is crucial for implementing communication between AI logic and robot components. The rclpy library provides Python developers with powerful tools to create nodes that can participate in these communication patterns, enabling AI systems to interact effectively with robotic hardware.

The next chapter will explore how to bridge AI agents to ROS controllers and cover URDF fundamentals for modeling robot structures.