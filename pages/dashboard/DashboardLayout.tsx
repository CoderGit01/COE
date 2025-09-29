import React, { ReactNode, Suspense } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import { ChartBarIcon, CogIcon, DocumentTextIcon, HomeIcon, UsersIcon, CalendarIcon, LightbulbIcon, TrophyIcon } from '../../components/icons';

// FIX: Removed DashboardLayoutProps and simplified the component signature using React.FC.
const getNavLinks = (role: UserRole) => {
  const baseLinks = [
    { name: 'Dashboard', href: '', icon: ChartBarIcon, end: true },
  ];

  switch (role) {
    case UserRole.ADMIN:
      return [
        ...baseLinks,
        { name: 'Manage Users', href: '/users', icon: UsersIcon },
        { name: 'Verify Papers', href: '/papers', icon: DocumentTextIcon },
        { name: 'Manage Events', href: '/events', icon: CalendarIcon },
      ];
    case UserRole.FACULTY:
      return [
        ...baseLinks,
        { name: 'My Projects', href: '/projects', icon: LightbulbIcon },
        { name: 'My Publications', href: '/publications', icon: DocumentTextIcon },
        { name: 'My Events', href: '/events', icon: CalendarIcon },
        { name: 'Mentorship', href: '/mentorship', icon: UsersIcon },
      ];
    case UserRole.STUDENT:
      return [
        ...baseLinks,
        { name: 'My Submissions', href: '/papers', icon: DocumentTextIcon },
        { name: 'My Events', href: '/events', icon: CalendarIcon },
        { name: 'Achievements', href: '/achievements', icon: TrophyIcon },
      ];
    default:
      return [];
  }
};

const getBasePath = (role: UserRole) => {
    switch (role) {
        case UserRole.ADMIN: return '/admin';
        case UserRole.FACULTY: return '/faculty';
        case UserRole.STUDENT: return '/student';
        default: return '/';
    }
}

// FIX: Correctly typed the children prop. `React.FC` in modern React versions does not implicitly include children.
const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, role } = useAuth();
  const location = useLocation();
  const navLinks = getNavLinks(role);
  const basePath = getBasePath(role);

  const sidebar = (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
        <NavLink to={basePath}>Dashboard</NavLink>
      </div>
      <nav className="flex-grow px-2 py-4">
        {navLinks.map((item) => (
          <NavLink
            key={item.name}
            to={`${basePath}${item.href}`}
            end={'end' in item && item.end}
            className={({isActive}) => `flex items-center px-3 py-2 my-1 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-gray-900' : 'hover:bg-gray-700'}`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
         <NavLink to="/" className="flex items-center text-sm text-gray-300 hover:text-white">
            <HomeIcon className="h-5 w-5 mr-3" />
            Back to Main Site
         </NavLink>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">{sidebar}</div>
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <Suspense fallback={<div className="flex h-full w-full items-center justify-center text-gray-600">Loading Page...</div>}>
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;