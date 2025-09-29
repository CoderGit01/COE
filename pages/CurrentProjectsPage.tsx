
import React, { useState } from 'react';
import { mockProjects } from '../data/mockData';
import { Project } from '../types';
import Card from '../components/common/Card';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Card className="flex flex-col">
    <img className="h-56 w-full object-cover" src={project.imageUrl} alt={project.title} />
    <div className="p-6 flex-grow flex flex-col">
      <span className={`px-3 py-1 text-xs font-semibold rounded-full self-start ${
        project.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
      }`}>{project.status}</span>
      <h3 className="mt-4 text-xl font-bold text-gray-900">{project.title}</h3>
      <p className="mt-2 text-gray-600 flex-grow">{project.description}</p>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-800">Team: {project.team.join(', ')}</p>
        {project.funding && <p className="text-sm text-gray-500">Funding: {project.funding}</p>}
        {project.patents && <p className="text-sm text-gray-500">Patents: {project.patents.join(', ')}</p>}
      </div>
    </div>
  </Card>
);

// FIX: Changed CurrentProjectsPage to a React.FC to fix a type error when used as a route element.
const CurrentProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Ongoing' | 'Completed'>('All');
  
  const filteredProjects = mockProjects.filter(p => filter === 'All' || p.status === filter);

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Current Projects</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Explore the groundbreaking research and development projects from our students and faculty.
          </p>
        </div>

        <div className="mt-10 flex justify-center space-x-4">
          <button onClick={() => setFilter('All')} className={`px-4 py-2 text-sm font-medium rounded-full ${filter === 'All' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>All Projects</button>
          <button onClick={() => setFilter('Ongoing')} className={`px-4 py-2 text-sm font-medium rounded-full ${filter === 'Ongoing' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>Ongoing</button>
          <button onClick={() => setFilter('Completed')} className={`px-4 py-2 text-sm font-medium rounded-full ${filter === 'Completed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>Completed</button>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentProjectsPage;