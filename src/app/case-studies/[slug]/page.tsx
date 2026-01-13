import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CaseStudyContent from './CaseStudyContent'

const caseStudies: Record<string, {
  title: string
  subtitle: string
  overview: string
  problem: string[]
  solution: string[]
  results: { metric: string; value: string; description: string }[]
  technologies: string[]
  timeline: string
  role: string
  testimonial?: { quote: string; author: string; role: string }
}> = {
  'smart-agriculture': {
    title: 'Smart Agriculture IoT Platform',
    subtitle: 'Revolutionizing farming with connected sensors and AI-driven insights',
    overview: 'Developed a comprehensive IoT platform that connects farms to the cloud, enabling real-time monitoring of soil conditions, weather patterns, and crop health. The system uses machine learning to provide actionable insights and automated irrigation control.',
    problem: [
      'Farmers were losing up to 40% of crops due to unpredictable weather and poor soil monitoring',
      'Manual irrigation led to significant water waste and inconsistent crop yields',
      'Lack of real-time data made it impossible to respond quickly to changing conditions',
      'Existing solutions were too expensive for small to medium-sized farms',
    ],
    solution: [
      'Designed low-cost IoT sensor nodes using ESP32 microcontrollers with solar power',
      'Built cloud infrastructure on AWS for data collection, storage, and analysis',
      'Implemented ML models for crop disease detection and yield prediction',
      'Created mobile app for farmers to monitor conditions and receive alerts',
      'Developed automated irrigation system that responds to real-time soil moisture data',
    ],
    results: [
      { metric: '30%', value: 'Crop Yield Increase', description: 'Average improvement in crop yields across all connected farms' },
      { metric: '45%', value: 'Water Savings', description: 'Reduction in water usage through smart irrigation' },
      { metric: '50+', value: 'Farms Connected', description: 'Platform deployed across multiple agricultural regions' },
      { metric: '< 2 min', value: 'Alert Response', description: 'Time from anomaly detection to farmer notification' },
    ],
    technologies: ['ESP32', 'Python', 'TensorFlow', 'AWS IoT', 'React Native', 'PostgreSQL', 'MQTT', 'LoRaWAN'],
    timeline: '8 months',
    role: 'Lead IoT Engineer & System Architect',
    testimonial: {
      quote: "This system transformed our farm operations. We've seen incredible improvements in both yield and efficiency. The real-time alerts have saved multiple crops.",
      author: 'John Kabwe',
      role: 'Farm Manager, Green Valley Farms',
    },
  },
  'industrial-automation': {
    title: 'Industrial Automation Robot',
    subtitle: 'Custom robotic solution for manufacturing process automation',
    overview: 'Engineered a custom 6-axis robotic arm with computer vision capabilities for quality control and assembly line automation in a manufacturing facility. The robot performs inspection, pick-and-place, and packaging tasks with minimal human intervention.',
    problem: [
      'Manufacturing plant had 15% defect rate due to human error in quality inspection',
      'Manual assembly processes were slow and created bottlenecks in production',
      'High labor costs and difficulty finding skilled workers for repetitive tasks',
      'Inconsistent product quality affecting customer satisfaction',
    ],
    solution: [
      'Designed custom 6-axis robotic arm optimized for specific workspace requirements',
      'Integrated high-resolution cameras with OpenCV for defect detection',
      'Developed ROS-based control system for precise movement coordination',
      'Created intuitive programming interface for easy task modification',
      'Implemented safety systems including proximity sensors and emergency stops',
    ],
    results: [
      { metric: '95%', value: 'Error Reduction', description: 'Defect detection rate improved dramatically' },
      { metric: '40%', value: 'Efficiency Gain', description: 'Increase in production throughput' },
      { metric: '25%', value: 'Cost Reduction', description: 'Savings in operational costs' },
      { metric: '24/7', value: 'Operation', description: 'Continuous production without fatigue' },
    ],
    technologies: ['ROS', 'C++', 'Python', 'OpenCV', 'STM32', 'CAD/CAM', 'PLC', 'Industrial Ethernet'],
    timeline: '12 months',
    role: 'Robotics Engineer & Project Lead',
    testimonial: {
      quote: "The robot has exceeded all our expectations. Production quality is at an all-time high and we've significantly reduced our operating costs.",
      author: 'Sarah Mwanza',
      role: 'Operations Director, TechManufacture Ltd',
    },
  },
  'autonomous-drone': {
    title: 'Autonomous Drone Navigation',
    subtitle: 'AI-powered drone system for surveying and environmental monitoring',
    overview: 'Created an autonomous drone platform capable of GPS-denied navigation, obstacle avoidance, and automated survey missions. The system uses computer vision and sensor fusion for reliable operation in challenging environments.',
    problem: [
      'Traditional land surveying methods were time-consuming and expensive',
      'GPS-only navigation failed in urban canyons and dense forests',
      'Manual drone piloting required skilled operators and was error-prone',
      'Data processing from aerial surveys took weeks instead of hours',
    ],
    solution: [
      'Developed visual-inertial odometry system for GPS-denied navigation',
      'Implemented deep learning models for real-time obstacle detection and avoidance',
      'Created automated mission planning software with intelligent path optimization',
      'Built cloud-based processing pipeline for rapid data analysis',
      'Designed custom flight controller with redundant safety systems',
    ],
    results: [
      { metric: '99.2%', value: 'Flight Accuracy', description: 'Position accuracy within mission parameters' },
      { metric: '500+ km²', value: 'Survey Area', description: 'Total area surveyed using the platform' },
      { metric: '60%', value: 'Time Reduction', description: 'Faster completion compared to traditional methods' },
      { metric: '0', value: 'Incidents', description: 'Perfect safety record across all missions' },
    ],
    technologies: ['Python', 'TensorFlow', 'ROS', 'OpenCV', 'Pixhawk', 'SLAM', 'Point Cloud', 'GIS'],
    timeline: '10 months',
    role: 'Lead Developer & Systems Integrator',
  },
  'smart-home': {
    title: 'Smart Home Automation System',
    subtitle: 'Complete IoT ecosystem with voice control and energy management',
    overview: 'Developed an integrated smart home platform that connects lighting, HVAC, security, and entertainment systems. Features voice control, automated routines, and machine learning for predictive energy management.',
    problem: [
      'Homeowners lacked centralized control over multiple smart devices from different brands',
      'High energy bills due to inefficient usage patterns',
      'Complex setup processes deterred adoption of home automation',
      'Security vulnerabilities in consumer IoT devices',
    ],
    solution: [
      'Created unified hub using Raspberry Pi with custom firmware',
      'Developed protocol translation layer for Zigbee, Z-Wave, WiFi, and BLE devices',
      'Implemented voice control using wake word detection and NLP',
      'Built ML models for learning user preferences and optimizing energy usage',
      'Designed end-to-end encryption for all device communications',
    ],
    results: [
      { metric: '35%', value: 'Energy Savings', description: 'Average reduction in home energy consumption' },
      { metric: '100+', value: 'Devices Supported', description: 'Compatible with major smart device brands' },
      { metric: '<50ms', value: 'Response Time', description: 'Local processing for instant reactions' },
      { metric: '4.8/5', value: 'User Rating', description: 'Average satisfaction score from users' },
    ],
    technologies: ['Raspberry Pi', 'ESP32', 'Python', 'React', 'MQTT', 'Zigbee', 'TensorFlow Lite', 'Node.js'],
    timeline: '6 months',
    role: 'Full-Stack IoT Developer',
    testimonial: {
      quote: "Finally, a system that just works! All my devices work together seamlessly and my energy bills have dropped significantly.",
      author: 'Michael Tembo',
      role: 'Homeowner',
    },
  },
}

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies[slug]
  
  if (!study) {
    return { title: 'Case Study Not Found' }
  }
  
  return {
    title: `${study.title} | Case Study | Emmanuel Inambao`,
    description: study.overview,
  }
}

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }))
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params
  const study = caseStudies[slug]
  
  if (!study) {
    notFound()
  }
  
  return <CaseStudyContent study={study} />
}
