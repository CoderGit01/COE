import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { PaperStatus } from '../../../types';
import { EyeIcon } from '../../../components/icons';

const MyPublications = () => {
    const { user } = useAuth();
    const { papers, submitPaper } = useData();
    const { addToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState(user?.name || '');
    const [publicationYear, setPublicationYear] = useState(new Date().getFullYear());
    const [department, setDepartment] = useState(user?.department || '');
    const [abstract, setAbstract] = useState('');
    const [doi, setDoi] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const myPapers = papers.filter(p => p.authors.includes(user?.name || ''));

    const resetAndCloseModal = () => {
        setTitle('');
        setAuthors(user?.name || '');
        setPublicationYear(new Date().getFullYear());
        setDepartment(user?.department || '');
        setAbstract('');
        setDoi('');
        setFile(null);
        setIsModalOpen(false);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !authors || !publicationYear || !department || !abstract) {
            addToast('Please fill all required fields.', 'error');
            return;
        }

        submitPaper({
            title,
            authors: authors.split(',').map(a => a.trim()).filter(Boolean),
            publicationYear,
            department,
            abstract,
            doi: doi || 'N/A',
        });
        addToast('Publication submitted for review successfully!', 'success');
        resetAndCloseModal();
    };

    const getStatusColor = (status: PaperStatus) => {
        switch (status) {
            case PaperStatus.APPROVED: return 'bg-green-100 text-green-800';
            case PaperStatus.REJECTED: return 'bg-red-100 text-red-800';
            case PaperStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Publications</h1>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>Upload New Publication</Button>
            </div>
            
            <Card className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publication Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {myPapers.length > 0 ? myPapers.map(paper => (
                            <tr key={paper.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{paper.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paper.publicationYear}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(paper.status)}`}>
                                        {paper.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Button variant="secondary" className="p-1"><EyeIcon className="h-4 w-4"/></Button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    You have no publications listed.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>

            <Modal isOpen={isModalOpen} onClose={resetAndCloseModal} title="Upload New Publication">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Publication Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                     <div>
                        <label htmlFor="authors" className="block text-sm font-medium text-gray-300">Authors (comma-separated)</label>
                        <input type="text" id="authors" value={authors} onChange={e => setAuthors(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="pubYear" className="block text-sm font-medium text-gray-300">Publication Year</label>
                            <input type="number" id="pubYear" value={publicationYear} onChange={e => setPublicationYear(Number(e.target.value))} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-gray-300">Department</label>
                            <input type="text" id="department" value={department} onChange={e => setDepartment(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="abstract" className="block text-sm font-medium text-gray-300">Abstract</label>
                        <textarea id="abstract" value={abstract} onChange={e => setAbstract(e.target.value)} required rows={4} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="doi" className="block text-sm font-medium text-gray-300">DOI</label>
                        <input type="text" id="doi" value={doi} onChange={e => setDoi(e.target.value)} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300">Upload File (PDF only)</label>
                        <input type="file" id="file-upload" accept=".pdf" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-accent/20 file:text-orange-300 hover:file:bg-orange-accent/30"/>
                    </div>
                    <div className="pt-4 flex justify-end space-x-3">
                        <Button type="button" variant="secondary" onClick={resetAndCloseModal}>Cancel</Button>
                        <Button type="submit" variant="primary">Submit for Review</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default MyPublications;