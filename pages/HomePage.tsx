import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { mockProjects, mockAnnouncements, mockEvents } from '../data/mockData';
import { TrophyIcon, SearchIcon, HandshakeIcon, GlobeIcon, CalendarIcon, UsersIcon, CogIcon, DocumentTextIcon, ChevronDownIcon } from '../components/icons';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// IMPROVED: StatItem component with darker glass, border, and enhanced icons
const StatItem = ({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) => (
    <div className="p-6 text-center flex flex-col items-center justify-center group 
                   bg-black/20 backdrop-blur-md border border-white/30 
                   rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl
                   transition-all duration-300 hover:bg-black/40 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20">
        
        {/* Improvised Icon Container */}
        <div className="mb-4 bg-orange-500/10 rounded-full p-4 border border-orange-500/30 transition-all duration-300 group-hover:bg-orange-500/20 group-hover:border-orange-500/50">
            <div className="text-orange-400 transition-transform duration-300 group-hover:scale-110">{icon}</div>
        </div>
        
        <p className="text-4xl font-bold text-white">{value}</p>
        <p className="text-gray-300 mt-1">{label}</p>
    </div>
);

// NEW: CommitteeMemberCard component
// FIX: Changed CommitteeMemberCard to a React.FC to fix an issue where the 'key' prop was being incorrectly assigned, causing a type error.
const CommitteeMemberCard: React.FC<{ name: string; title: string }> = ({ name, title }) => (
    <div className="bg-black/20 backdrop-blur-md border border-white/30 rounded-lg p-6 text-center transition-all duration-300 hover:bg-black/40 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-orange-400 mt-1">{title}</p>
    </div>
);

// NEW: AccordionItem component
// FIX: Changed component definition to use React.FC to correctly handle children prop type.
const AccordionItem: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/20 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 px-4 text-left text-lg font-semibold text-white hover:bg-white/10 transition-colors"
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <ChevronDownIcon className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-40' : 'max-h-0'
                }`}
            >
                <div className="p-4 bg-black/20 text-gray-300">
                    {children}
                </div>
            </div>
        </div>
    );
};

// NEW: Data for new sections
const executiveCommittee = [
    { name: 'Dr. Kamlesh Tiwari', title: 'HoD / CSE' },
    { name: 'Dr. Deepak Sinha', title: 'Professor / CSE' },
    { name: 'Dr. A. Suresh Kumar', title: 'Professor / CSE' },
    { name: 'Dr. T. R. Mahesh', title: 'Associate Professor' }
];

const coeLeaders = [
    { title: 'AI & ML CoE', content: 'Dr. Swati Gupta – AI & ML CoE Leader' },
    { title: 'Cyber & Systems Security CoE', content: 'Dr. Sunanda Das – Cyber & Systems Security CoE Leader' },
    { title: 'IoT, Robotics & Emerging Tech CoE', content: 'Dr. Vikram Neerugatti – IoT, Robotics & Emerging Tech CoE Leader' },
    { title: 'Networking & HPC CoE', content: 'Dr. Nishant Tripathi – Networking & HPC CoE Leader' },
    { title: 'Theoretical CS CoE', content: 'Dr. Subhankar Ghosal – Theoretical CS CoE Leader' }
];

const HomePage = () => {
    const featuredProject = mockProjects[0];
    const latestAnnouncement = mockAnnouncements[0];
    const upcomingEvent = mockEvents[0];

    return (
        <div>
            {/* --- START: Top Section with Background --- */}
            <div className="relative overflow-hidden">
                {/* Background Image: Positioned to cover this entire section */}
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                        backgroundImage: `url('https://i.postimg.cc/9zH91CXP/download.jpg')`,
                        filter: 'blur(3px)' // Increased blur for more depth
                    }}
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark-blue/40 to-dark-blue/20 backdrop-blur-sm" />
                
                {/* Content Wrapper: Sits on top of the background */}
                <div className="relative z-10">
                    {/* Hero Section */}
                    <section className="text-center">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-36 flex items-center justify-center">
                           {/* Final Card Style: Light glass color and reduced size */}
                           <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10 w-full">
                                <p className="text-center text-white font-bold text-2xl mb-4"
                                style={{ 
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                    fontSize: '2.5rem'
                                }}
                                >Department. Computer Science and Engineering</p>
                                {/* Final Logo: High-resolution and sharp */}
                                <img 
                                    src="https://i.postimg.cc/wB0z9ZVM/Centerofexe.png" 
                                    alt="Center of Excellence Logo" 
                                    className="w-full h-auto max-w mx-auto filter-none"
                                />
    
                                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                                    <Button variant="primary" className="w-full sm:w-auto">
                                        <NavLink to="/current-projects">Explore Current Projects</NavLink>
                                    </Button>
                                    <Button variant="primary" className="w-full sm:w-auto">
                                        <NavLink to="/events">View Events</NavLink>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- IMPROVED: Stats Section --- */}
                    <section className="py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Impact at a Glance</h2>
                                <p className="mt-4 text-lg text-gray-300">Driving innovation and excellence across disciplines.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                <StatItem icon={<SearchIcon className="h-12 w-12" />} value="200+" label="Faculty Enrolled" />
                                <StatItem icon={<HandshakeIcon className="h-12 w-12" />} value="12+" label="Industry Collaborations" />
                                <StatItem icon={<TrophyIcon className="h-12 w-12" />} value="25+" label="Papers Published" />
                                <StatItem icon={<GlobeIcon className="h-12 w-12" />} value="40+" label="International Patents" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            {/* --- END: Top Section with Background --- */}
            
             {/* --- START: Executive Committee & CoE Section --- */}
            <section className="py-20 bg-brand-dark-blue">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    {/* Executive Committee */}
                    <div>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">Executive Committee</h2>
                            <p className="mt-4 text-lg text-gray-300">Guiding the vision and strategy of the Center of Excellence.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {executiveCommittee.map(member => <CommitteeMemberCard key={member.name} name={member.name} title={member.title} />)}
                        </div>
                    </div>
                    {/* Center of Excellence */}
                    <div>
                         <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">Center of Excellence in FETJU</h2>
                            <p className="mt-4 text-lg text-gray-300">Fostering specialized research and innovation across key domains.</p>
                        </div>
                         <div className="max-w-3xl mx-auto bg-black/20 backdrop-blur-md border border-white/30 rounded-lg overflow-hidden">
                            {coeLeaders.map(leader => <AccordionItem key={leader.title} title={leader.title}>{leader.content}</AccordionItem>)}
                         </div>
                    </div>
                </div>
            </section>
            {/* --- END: Executive Committee & CoE Section --- */}

            {/* Featured Content Section */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-dark-blue mb-12">Highlights</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Featured Project */}
                        <Card variant="elevated">
                            <img className="h-48 w-full object-cover" src={featuredProject.imageUrl} alt={featuredProject.title} />
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-orange-accent">Featured Project</h3>
                                <p className="mt-2 text-xl font-bold text-dark-blue">{featuredProject.title}</p>
                                <p className="mt-2 text-gray-600 line-clamp-3">{featuredProject.description}</p>
                                <NavLink to={`/current-projects`} className="mt-4 inline-block text-orange-accent font-semibold hover:text-orange-400 transition-colors">Learn more &rarr;</NavLink>
                            </div>
                        </Card>

                        {/* Latest Announcement */}
                        <Card variant="elevated">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-orange-accent">Latest News</h3>
                                <p className="mt-2 text-xl font-bold text-dark-blue">{latestAnnouncement.title}</p>
                                <p className="mt-1 text-sm text-gray-500">{latestAnnouncement.date} - {latestAnnouncement.category}</p>
                                <p className="mt-2 text-gray-600 line-clamp-4">{latestAnnouncement.content}</p>
                                <NavLink to="/community" className="mt-4 inline-block text-orange-accent font-semibold hover:text-orange-400 transition-colors">Read more &rarr;</NavLink>
                            </div>
                        </Card>

                        {/* Upcoming Event */}
                        <Card variant="elevated">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-orange-accent">Upcoming Event</h3>
                                <p className="mt-2 text-xl font-bold text-dark-blue">{upcomingEvent.title}</p>
                                <div className="mt-2 text-gray-600 space-y-1">
                                    <p className="flex items-center"><CalendarIcon className="h-5 w-5 mr-2 text-gray-500" /> {upcomingEvent.date}</p>
                                    <p className="flex items-center"><UsersIcon className="h-5 w-5 mr-2 text-gray-500" /> {upcomingEvent.location}</p>
                                </div>
                                <p className="mt-2 text-gray-600 line-clamp-3">{upcomingEvent.description}</p>
                                <NavLink to="/events" className="mt-4 inline-block text-orange-accent font-semibold hover:text-orange-400 transition-colors">View details &rarr;</NavLink>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;