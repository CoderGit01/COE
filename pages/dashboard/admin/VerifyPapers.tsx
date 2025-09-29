import React, { useState } from 'react';
import { mockUsersById } from '../../../data/mockData';
import { ResearchPaper, PaperStatus } from '../../../types';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { EyeIcon } from '../../../components/icons';
import { useData } from '../../../context/DataContext';
import Modal from '../../../components/common/Modal';

const VerifyPapers = () => {
    const { papers, updatePaperStatus } = useData();
    const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

    const pendingPapers = papers.filter(p => p.status === PaperStatus.PENDING);

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
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Verify Research Papers</h1>
            
            <Card className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paper Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pendingPapers.length > 0 ? pendingPapers.map(paper => (
                            <tr key={paper.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{paper.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mockUsersById[paper.submittedBy]?.name || 'Unknown User'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paper.submissionDate ? new Date(paper.submissionDate).toLocaleDateString() : 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(paper.status)}`}>
                                        {paper.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="success"
                                            className="px-2 py-1 text-xs"
                                            onClick={() => updatePaperStatus(paper.id, PaperStatus.APPROVED)}
                                        >Approve</Button>
                                        <Button
                                            variant="danger"
                                            className="px-2 py-1 text-xs"
                                            onClick={() => updatePaperStatus(paper.id, PaperStatus.REJECTED)}
                                        >Reject</Button>
                                        <Button variant="secondary" className="p-1 text-xs" onClick={() => setSelectedPaper(paper)}>
                                            <EyeIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                           <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No pending submissions to review.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>

            {selectedPaper && (
                <Modal isOpen={!!selectedPaper} onClose={() => setSelectedPaper(null)} title="Paper Details">
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-lg">{selectedPaper.title}</h3>
                            <p className="text-sm text-gray-300">By {selectedPaper.authors.join(', ')}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-200">Abstract</p>
                            <p className="text-gray-300 bg-black/20 p-3 rounded-md mt-1">{selectedPaper.abstract}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span><strong>Department:</strong> {selectedPaper.department}</span>
                            <span><strong>Year:</strong> {selectedPaper.publicationYear}</span>
                        </div>
                         <div className="flex justify-end pt-4">
                            <Button onClick={() => setSelectedPaper(null)}>Close</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default VerifyPapers;