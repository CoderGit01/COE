import { Project, ResearchPaper, Announcement, Event, PaperStatus, Achievement, User, CommunityPost, UserRole, EventStatus } from '../types';

// Helper to get users by ID for community posts
export const mockUsersById: { [key: string]: User } = {
  'user-1': {
    id: 'user-1',
    name: 'Priya Sharma',
    email: 'student@jain.com',
    role: UserRole.STUDENT,
    avatarUrl: 'https://picsum.photos/seed/student/100/100',
    department: 'Computer Science',
  },
  'user-2': {
    id: 'user-2',
    name: 'Dr. Ramesh Kumar',
    email: 'faculty@jain.com',
    role: UserRole.FACULTY,
    avatarUrl: 'https://picsum.photos/seed/faculty/100/100',
    department: 'Electronics Engineering',
  },
  'user-3': {
    id: 'user-3',
    name: 'Admin',
    email: 'admin@jain.com',
    role: UserRole.ADMIN,
    avatarUrl: 'https://picsum.photos/seed/admin/100/100',
  },
  'user-4': {
    id: 'user-4',
    name: 'Anjali Singh',
    email: 'anjali.s@jain.com',
    role: UserRole.STUDENT,
    avatarUrl: 'https://picsum.photos/seed/student2/100/100',
    department: 'Mechanical Engineering',
  },
  'user-5': {
    id: 'user-5',
    name: 'Vikram Reddy',
    email: 'vikram.r@jain.com',
    role: UserRole.STUDENT,
    avatarUrl: 'https://picsum.photos/seed/student3/100/100',
    department: 'Computer Science',
  },
};


export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'AI-Powered Traffic Management System',
    description: 'A smart system using machine learning to optimize traffic flow in urban areas, reducing congestion and emissions.',
    team: ['Dr. Ramesh Kumar', 'Anjali Singh', 'Vikram Reddy'],
    status: 'Ongoing',
    imageUrl: 'https://picsum.photos/seed/project1/600/400',
    labs: ['AI & Robotics Lab'],
    funding: '₹50 Lakhs from DST',
  },
  {
    id: 'proj-2',
    title: 'Blockchain for Secure Digital Voting',
    description: 'Developing a decentralized and transparent voting platform using blockchain technology to ensure election integrity.',
    team: ['Priya Sharma', 'Rohan Gupta'],
    status: 'Completed',
    imageUrl: 'https://picsum.photos/seed/project2/600/400',
    patents: ['Patent #IN202312345'],
  },
  {
    id: 'proj-3',
    title: 'Low-Cost Water Purification Device',
    description: 'A portable and affordable water filter designed for rural communities, using locally sourced materials.',
    team: ['Prof. Meena Desai', 'Aditya Verma'],
    status: 'Ongoing',
    imageUrl: 'https://picsum.photos/seed/project3/600/400',
    labs: ['Sustainable Tech Lab'],
  },
];

export const mockPapers: ResearchPaper[] = [
  {
    id: 'paper-1',
    title: 'Advancements in Neural Network Pruning',
    authors: ['Dr. Ramesh Kumar', 'Priya Sharma'],
    publicationYear: 2023,
    department: 'Computer Science',
    abstract: 'This paper explores novel techniques for pruning deep neural networks to reduce computational cost without significant loss in accuracy.',
    fileUrl: '#',
    doi: '10.1109/CVPR.2023.01234',
    status: PaperStatus.APPROVED,
    submittedBy: 'user-2',
  },
  {
    id: 'paper-2',
    title: 'A Study on Photovoltaic Cell Efficiency',
    authors: ['Sunita Patil', 'Dr. Anand Joshi'],
    publicationYear: 2022,
    department: 'Electronics Engineering',
    abstract: 'An empirical study on improving the efficiency of silicon-based photovoltaic cells through surface texturing.',
    fileUrl: '#',
    doi: '10.1016/j.solener.2022.05.018',
    status: PaperStatus.APPROVED,
    submittedBy: 'user-2',
  },
  {
    id: 'paper-3',
    title: 'The Impact of Social Media on Political Discourse',
    authors: ['Rohan Gupta'],
    publicationYear: 2023,
    department: 'Humanities',
    abstract: 'An analysis of how major social media platforms have shaped political conversations and voter behavior in recent elections.',
    fileUrl: '#',
    doi: '10.1080/1369118X.2023.1234567',
    status: PaperStatus.PENDING,
    submittedBy: 'user-1',
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Dr. Ramesh Kumar awarded "Innovator of the Year"',
    content: 'We are proud to announce that Dr. Ramesh Kumar from the Computer Science department has been awarded the "Innovator of the Year" by the National Tech Council for his work on AI.',
    date: '2024-07-20',
    category: 'Faculty Achievements',
    author: 'CoE Admin',
  },
  {
    id: 'ann-2',
    title: 'Student Team Wins National Hackathon "CodeStorm 2024"',
    content: 'Congratulations to Priya Sharma and her team for securing first place at CodeStorm 2024, a national-level hackathon focused on sustainable development goals.',
    date: '2024-07-18',
    category: 'Student Achievements',
    author: 'CoE Admin',
  },
  {
    id: 'ann-3',
    title: 'Guest Lecture on "The Future of Quantum Computing"',
    content: 'Join us for an insightful guest lecture by Dr. Aruna Desai from MIT on the exciting advancements in quantum computing. The event will be held on August 5th in the main auditorium.',
    date: '2024-07-15',
    category: 'General',
    author: 'CoE Admin',
  },
];

export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    title: 'Workshop on Deep Learning with PyTorch',
    date: '2024-08-10',
    time: '09:00 AM - 04:00 PM',
    location: 'AI & Robotics Lab',
    description: 'A hands-on workshop covering the fundamentals of deep learning and practical implementation using the PyTorch framework.',
    type: 'Workshop',
    status: EventStatus.APPROVED,
    submittedBy: 'user-2',
  },
  {
    id: 'evt-2',
    title: 'Jain Innovate Hackathon 2024',
    date: '2024-09-05',
    time: 'Starts 10:00 AM',
    location: 'Virtual',
    description: 'A 24-hour hackathon focused on creating innovative solutions for real-world problems. Exciting prizes to be won!',
    type: 'Hackathon',
    status: EventStatus.APPROVED,
    submittedBy: 'user-3',
  },
  {
    id: 'evt-3',
    title: 'Seminar on Intellectual Property Rights',
    date: '2024-08-22',
    time: '02:00 PM - 03:30 PM',
    location: 'Seminar Hall B',
    description: 'An essential seminar for all researchers and innovators on the importance of patents, copyrights, and trademarks.',
    type: 'Seminar',
    status: EventStatus.APPROVED,
    submittedBy: 'user-2',
  },
  {
    id: 'evt-4',
    title: 'Guest Lecture on 5G Technology',
    date: '2024-10-15',
    time: '11:00 AM - 12:30 PM',
    location: 'Main Auditorium',
    description: 'A guest lecture by an industry expert on the rollout and impact of 5G technology.',
    type: 'Guest Lecture',
    status: EventStatus.PENDING,
    submittedBy: 'user-2',
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Best Research Paper Award at IEEE Conference',
    recipient: 'Dr. Ramesh Kumar',
    category: 'Faculty',
    date: '2024-06-15',
    description: 'Dr. Kumar was recognized for his outstanding contribution to the field of artificial intelligence with his paper on efficient neural network architectures.',
    imageUrl: 'https://picsum.photos/seed/award1/600/400',
  },
  {
    id: 'ach-2',
    title: 'First Place at Smart India Hackathon 2024',
    recipient: 'Priya Sharma & Team',
    category: 'Student',
    date: '2024-05-20',
    description: 'A team of students won the top prize for their innovative solution in the healthcare domain, developing an AI-powered diagnostic tool.',
    imageUrl: 'https://picsum.photos/seed/award2/600/400',
  },
  {
    id: 'ach-3',
    title: 'Ranked Top 5 in National Innovation Rankings',
    recipient: 'Jain University',
    category: 'University',
    date: '2024-04-30',
    description: 'The Center of Excellence played a key role in Jain University being recognized as one of the top 5 institutions for innovation and research output nationwide.',
    imageUrl: 'https://picsum.photos/seed/award3/600/400',
  },
   {
    id: 'ach-4',
    title: 'Young Scientist Fellowship',
    recipient: 'Anjali Singh',
    category: 'Student',
    date: '2024-03-10',
    description: 'Anjali Singh was awarded the prestigious Young Scientist Fellowship by the Department of Science and Technology for her promising research in renewable energy.',
    imageUrl: 'https://picsum.photos/seed/award4/600/400',
  },
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'user-2', // Dr. Ramesh Kumar
    content: 'Just published a new paper on advancements in neural network pruning. Exciting to see where this research leads! #AI #MachineLearning',
    timestamp: '2024-07-28T10:00:00Z',
    likes: ['user-1', 'user-3'],
    comments: [
      {
        id: 'comment-1-1',
        authorId: 'user-1', // Priya Sharma
        content: 'Congratulations, Dr. Kumar! That sounds fascinating.',
        timestamp: '2024-07-28T10:05:00Z',
      },
    ],
  },
  {
    id: 'post-2',
    authorId: 'user-1', // Priya Sharma
    content: 'Our team is gearing up for the Jain Innovate Hackathon 2024! Any tips for last-minute preparations? 🚀 #Hackathon #Innovation',
    timestamp: '2024-07-27T15:30:00Z',
    likes: ['user-2'],
    comments: [],
  },
];