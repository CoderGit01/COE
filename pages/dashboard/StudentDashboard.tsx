
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { mockPapers, mockEvents } from '../../data/mockData';
import Card from '../../components/common/Card';
import { NavLink } from 'react-router-dom';

const StudentDashboard = () => {
    const { user } = useAuth();
    const myPapers = mockPapers.filter(p => p.submittedBy === user?.id);
    const registeredEvents = mockEvents.slice(0, 2);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
            <p className="mt-2 text-gray-600">Here's a summary of your activities at the Center of Excellence.</p>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* My Paper Submissions */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800">My Paper Submissions</h2>
                        <ul className="mt-4 space-y-3">
                            {myPapers.map(paper => (
                                <li key={paper.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                    <div>
                                        <p className="font-medium text-gray-900">{paper.title}</p>
                                        <p className="text-sm text-gray-500">Status: {paper.status}</p>
                                    </div>
                                    <NavLink to="/student/papers" className="text-blue-600 hover:underline text-sm">View</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>

                {/* My Events */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800">My Registered Events</h2>
                         <ul className="mt-4 space-y-3">
                            {registeredEvents.map(event => (
                                <li key={event.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                    <div>
                                        <p className="font-medium text-gray-900">{event.title}</p>
                                        <p className="text-sm text-gray-500">{event.date}</p>
                                    </div>
                                    <NavLink to="/student/events" className="text-blue-600 hover:underline text-sm">Details</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default StudentDashboard;
