
export enum UserRole {
  GUEST = 'GUEST',
  STUDENT = 'STUDENT',
  FACULTY = 'FACULTY',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
}

export enum PaperStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  publicationYear: number;
  department: string;
  abstract: string;
  fileUrl: string;
  doi: string;
  status: PaperStatus;
  submittedBy: string; // User ID
  coAuthors?: string;
  submissionDate?: string;
}

export interface Project {
  id:string;
  title: string;
  description: string;
  team: string[];
  status: 'Ongoing' | 'Completed';
  imageUrl: string;
  labs?: string[];
  patents?: string[];
  funding?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Faculty Achievements' | 'Student Achievements' | 'General';
  author: string;
}

export enum EventStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'Workshop' | 'Hackathon' | 'Guest Lecture' | 'Seminar';
  registeredUsers?: string[];
  status: EventStatus;
  submittedBy: string; // User ID
}

export interface CertificateData {
    recipientName: string;
    eventName: string;
    eventDate: string;
    certificateId: string;
}

export interface Achievement {
  id: string;
  title: string;
  recipient: string;
  category: 'Faculty' | 'Student' | 'University';
  date: string;
  description: string;
  imageUrl?: string;
}

export interface Comment {
  id: string;
  authorId: string; // User ID
  content: string;
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  authorId: string; // User ID
  content: string;
  timestamp: string;
  likes: string[]; // Array of User IDs who liked the post
  comments: Comment[];
}