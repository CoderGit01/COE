import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { PaperStatus, ResearchPaper } from '../../../types';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import { EyeIcon } from '../../../components/icons';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';

const MySubmissions = () => {
    const { user } = useAuth();
    const { papers, submitPaper } = useData();
    const { addToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [coAuthors, setCoAuthors] = useState('');
    const [publicationYear, setPublicationYear] = useState(new Date().getFullYear());
    const [doi, setDoi] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const myPapers = papers.filter(p => p.submittedBy === user?.id);

    const resetAndCloseModal = () => {
        setTitle('');
        setAbstract('');
        setCoAuthors('');
        setPublicationYear(new Date().getFullYear());
        setDoi('');
        setFile(null);
        setIsModalOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !abstract) {
            addToast('Title and Abstract are required.', 'error');
            return;
        }
        
        const newPaperData = {
            title,
            abstract,
            authors: [user?.name || 'Unknown', ...coAuthors.split(',').map(a => a.trim()).filter(Boolean)],
            department: user?.department || 'N/A',
            publicationYear,
            doi: doi || 'N/A'
        };
        
        submitPaper(newPaperData);
        addToast('Paper submitted successfully for review!', 'success');
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
                <h1 className="text-3xl font-bold text-gray-900">My Submissions</h1>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>Submit New Research</Button>
            </div>
            
            <Card className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paper Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {myPapers.length > 0 ? myPapers.map(paper => (
                            <tr key={paper.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{paper.title}</div>
                                    <div className="text-sm text-gray-500">{paper.authors.join(', ')}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(paper.status)}`}>
                                        {paper.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {paper.submissionDate ? new Date(paper.submissionDate).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Button variant="secondary" className="px-2 py-1 text-xs">
                                        <EyeIcon className="h-4 w-4 mr-1" />
                                        View Details
                                    </Button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    You have not submitted any research papers yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>

            <Modal isOpen={isModalOpen} onClose={resetAndCloseModal} title="Submit Your Research Paper">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Paper Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                     <div>
                        <label htmlFor="coauthors" className="block text-sm font-medium text-gray-300">Co-authors (comma-separated)</label>
                        <input type="text" id="coauthors" value={coAuthors} onChange={e => setCoAuthors(e.target.value)} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="pubYear" className="block text-sm font-medium text-gray-300">Publication Year</label>
                        <input type="number" id="pubYear" value={publicationYear} onChange={e => setPublicationYear(Number(e.target.value))} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="abstract" className="block text-sm font-medium text-gray-300">Abstract</label>
                        <textarea id="abstract" value={abstract} onChange={e => setAbstract(e.target.value)} required rows={4} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="doi" className="block text-sm font-medium text-gray-300">DOI (Optional)</label>
                        <input type="text" id="doi" value={doi} onChange={e => setDoi(e.target.value)} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300">Upload File (PDF only)</label>
                        <input type="file" id="file-upload" accept=".pdf" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-accent/20 file:text-orange-300 hover:file:bg-orange-accent/30"/>
                    </div>
                    <div className="pt-4 flex justify-end">
                        <Button type="submit" variant="primary">Submit for Review</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default MySubmissions;