
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Project } from '../../../types';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import Modal from '../../../components/common/Modal';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <Card variant="elevated">
        <img className="h-48 w-full object-cover" src={project.imageUrl} alt={project.title} />
        <div className="p-6">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full self-start ${
                project.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>{project.status}</span>
            <h3 className="mt-4 text-xl font-bold text-gray-900">{project.title}</h3>
            <p className="mt-2 text-gray-600 flex-grow">{project.description}</p>
            <div className="mt-4">
                <p className="text-sm font-medium text-gray-800">Team: {project.team.join(', ')}</p>
            </div>
        </div>
    </Card>
);

const MyProjects = () => {
    const { user } = useAuth();
    const { projects, addProject } = useData();
    const { addToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [team, setTeam] = useState(user?.name || '');

    const myProjects = projects.filter(p => p.team.includes(user?.name || ''));

    const resetAndCloseModal = () => {
        setTitle('');
        setDescription('');
        setTeam(user?.name || '');
        setIsModalOpen(false);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !team) {
            addToast('Please fill all fields.', 'error');
            return;
        }
        addProject({
            title,
            description,
            team: team.split(',').map(t => t.trim()).filter(Boolean),
        });
        addToast('New project created!', 'success');
        resetAndCloseModal();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>Start New Project</Button>
            </div>
            
            {myProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {myProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <Card>
                    <div className="p-6 text-center text-gray-500">
                        You are not currently leading or part of any projects.
                    </div>
                </Card>
            )}

            <Modal isOpen={isModalOpen} onClose={resetAndCloseModal} title="Start a New Project">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Project Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="team" className="block text-sm font-medium text-gray-300">Team Members (comma-separated)</label>
                        <input type="text" id="team" value={team} onChange={e => setTeam(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div className="pt-4 flex justify-end space-x-3">
                        <Button type="button" variant="secondary" onClick={resetAndCloseModal}>Cancel</Button>
                        <Button type="submit" variant="primary">Create Project</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default MyProjects;
