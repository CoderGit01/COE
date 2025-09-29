
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockPapers, mockProjects } from '../../data/mockData';
import { DocumentTextIcon, LightbulbIcon, UsersIcon } from '../../components/icons';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const chartData = [
  { name: 'Jan', papers: 4, projects: 2 },
  { name: 'Feb', papers: 3, projects: 1 },
  { name: 'Mar', papers: 5, projects: 3 },
  { name: 'Apr', papers: 2, projects: 4 },
  { name: 'May', papers: 6, projects: 2 },
  { name: 'Jun', papers: 8, projects: 5 },
];

const StatCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) => (
    <Card className="p-5 flex items-center">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </Card>
);

const AdminDashboard = () => {
    const pendingPapers = mockPapers.filter(p => p.status === 'PENDING').length;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Pending Papers" value={pendingPapers} icon={<DocumentTextIcon className="h-6 w-6"/>} />
                <StatCard title="Total Projects" value={mockProjects.length} icon={<LightbulbIcon className="h-6 w-6"/>} />
                <StatCard title="Total Users" value={350} icon={<UsersIcon className="h-6 w-6"/>} />
            </div>

            <div className="mt-8">
                <Card className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Submissions</h2>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="papers" fill="#3b82f6" name="Papers Published" />
                                <Bar dataKey="projects" fill="#8b5cf6" name="New Projects" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

             <div className="mt-8">
                <Card className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="secondary">Create Announcement</Button>
                        <NavLink to="/admin/events/new">
                            <Button variant="success">Add New Event</Button>
                        </NavLink>
                         <NavLink to="/admin/users">
                            <Button variant="primary">Add New User</Button>
                        </NavLink>
                    </div>
                </Card>
            </div>

        </div>
    );
};

export default AdminDashboard;