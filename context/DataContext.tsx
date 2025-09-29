import React, { createContext, useState, ReactNode, useContext } from 'react';
import { ResearchPaper, Event, UserRole, PaperStatus, Project, User, EventStatus } from '../types';
import { mockPapers, mockEvents, mockProjects, mockUsersById } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';

interface DataContextType {
  papers: ResearchPaper[];
  events: Event[];
  projects: Project[];
  users: User[];
  submitPaper: (paper: Omit<ResearchPaper, 'id' | 'status' | 'fileUrl' | 'submittedBy' | 'submissionDate'>) => void;
  updatePaperStatus: (paperId: string, status: PaperStatus) => void;
  createApprovedEvent: (event: Omit<Event, 'id' | 'status' | 'submittedBy'>) => void;
  proposeEvent: (event: Omit<Event, 'id' | 'status' | 'submittedBy'>) => void;
  updateEventStatus: (eventId: string, status: EventStatus) => void;
  registerForEvent: (eventId: string) => void;
  addProject: (project: Omit<Project, 'id' | 'imageUrl' | 'status'>) => void;
  addUser: (user: Omit<User, 'id' | 'avatarUrl'>) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [papers, setPapers] = useState<ResearchPaper[]>(mockPapers);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [users, setUsers] = useState<User[]>(Object.values(mockUsersById));

  const submitPaper = (paperData: Omit<ResearchPaper, 'id' | 'status' | 'fileUrl' | 'submittedBy' | 'submissionDate'>) => {
    if (!user) return;
    const newPaper: ResearchPaper = {
      ...paperData,
      id: `paper-${Date.now()}`,
      status: PaperStatus.PENDING,
      submittedBy: user.id,
      fileUrl: '#', // Mock URL
      submissionDate: new Date().toISOString(),
    };
    setPapers(prevPapers => [newPaper, ...prevPapers]);
  };

  const updatePaperStatus = (paperId: string, newStatus: PaperStatus) => {
    setPapers(prevPapers =>
        prevPapers.map(p => (p.id === paperId ? { ...p, status: newStatus } : p))
    );
  };
  
  const createApprovedEvent = (eventData: Omit<Event, 'id' | 'status' | 'submittedBy'>) => {
      const newEvent: Event = {
          ...eventData,
          id: `evt-${Date.now()}`,
          status: EventStatus.APPROVED,
          submittedBy: user?.id || 'user-3', // Default to admin
      };
      setEvents(prevEvents => [newEvent, ...prevEvents]);
  };
  
  const proposeEvent = (eventData: Omit<Event, 'id' | 'status' | 'submittedBy'>) => {
    if (!user) return;
    const newEvent: Event = {
        ...eventData,
        id: `evt-${Date.now()}`,
        status: EventStatus.PENDING,
        submittedBy: user.id,
    };
    setEvents(prevEvents => [newEvent, ...prevEvents]);
  };
  
  const updateEventStatus = (eventId: string, newStatus: EventStatus) => {
    setEvents(prevEvents =>
        prevEvents.map(e => (e.id === eventId ? { ...e, status: newStatus } : e))
    );
  };

  const registerForEvent = (eventId: string) => {
    if (!user) return;
    setEvents(prevEvents =>
      prevEvents.map(event => {
        if (event.id === eventId) {
          const registeredUsers = event.registeredUsers || [];
          if (!registeredUsers.includes(user.id)) {
            return { ...event, registeredUsers: [...registeredUsers, user.id] };
          }
        }
        return event;
      })
    );
  };

  const addProject = (projectData: Omit<Project, 'id' | 'imageUrl' | 'status'>) => {
    const newProject: Project = {
        ...projectData,
        id: `proj-${Date.now()}`,
        status: 'Ongoing',
        imageUrl: `https://picsum.photos/seed/project${Date.now()}/600/400`,
    };
    setProjects(prevProjects => [newProject, ...prevProjects]);
  };

  const addUser = (userData: Omit<User, 'id' | 'avatarUrl'>) => {
    const newUser: User = {
        ...userData,
        id: `user-${Date.now()}`,
        avatarUrl: `https://picsum.photos/seed/user${Date.now()}/100/100`,
    };
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  return (
    <DataContext.Provider value={{ papers, events, projects, users, submitPaper, updatePaperStatus, createApprovedEvent, proposeEvent, updateEventStatus, registerForEvent, addProject, addUser }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};