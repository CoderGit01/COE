
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { mockProjects, mockPapers } from '../../data/mockData';
import Card from '../../components/common/Card';

const FacultyDashboard = () => {
    const { user } = useAuth();
    // Simplified logic: assume faculty is an author or on the team
    const myProjects = mockProjects.filter(p => p.team.includes(user?.name || ''));
    const myPapers = mockPapers.filter(p => p.authors.includes(user?.name || ''));

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
            <p className="mt-2 text-gray-600">Your faculty dashboard for managing research and mentorship.</p>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* My Projects */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800">My Projects</h2>
                        <ul className="mt-4 space-y-3">
                            {myProjects.map(project => (
                                <li key={project.id} className="p-3 bg-gray-50 rounded-md">
                                    <p className="font-medium text-gray-900">{project.title}</p>
                                    <p className="text-sm text-gray-500">Status: {project.status}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>

                {/* My Publications */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800">My Publications</h2>
                         <ul className="mt-4 space-y-3">
                            {myPapers.map(paper => (
                                <li key={paper.id} className="p-3 bg-gray-50 rounded-md">
                                    <p className="font-medium text-gray-900">{paper.title}</p>
                                    <p className="text-sm text-gray-500">Year: {paper.publicationYear}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default FacultyDashboard;
