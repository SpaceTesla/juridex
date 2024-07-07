import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Home.css'; // Custom CSS for additional styling
import bg1 from '../assets/images/bg1.jpg';
import bg2 from '../assets/images/bg2.jpg';
import bg3 from '../assets/images/bg3.jpg';
import bg4 from '../assets/images/bg4.jpg';

const Home = () => {
    const [activeSection, setActiveSection] = useState(null);

    const handleSectionClick = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-300">
            <header className="relative text-center mb-12 bg-cover bg-center flex flex-col justify-center items-center text-white overflow-hidden" style={{ backgroundImage: `url(${bg4})` }}>
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
    <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg animate-slide-in">Welcome to JURIDEX</h1>
        <p className="text-2xl font-medium mb-4 text-white drop-shadow-lg animate-fade-in">Your one-stop solution for crime record management.</p>
    </div>
</header>
            <main>
                <div className="mb-12">
                <Carousel showThumbs={false} autoPlay interval={3000} infiniteLoop>
                        <div className="relative">
                            <img src={bg1} alt="Police" className="rounded-lg shadow-lg" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white rounded-b-lg">
                                <h2 className="text-lg font-bold">Comprehensive Crime Data Management</h2>
                                <p className="text-sm">Efficiently manage crime reports, suspect information, and witness statements. Ensure that all relevant data is easily accessible and securely stored.</p>
                            </div>
                        </div>
                        <div className="relative">
                            <img src={bg2} alt="Court" className="rounded-lg shadow-lg" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white rounded-b-lg">
                                <h2 className="text-lg font-bold">Integration with Law Enforcement Agencies</h2>
                                <p className="text-sm">Seamlessly integrate with existing law enforcement databases for real-time updates and data sharing across multiple jurisdictions.</p>
                            </div>
                        </div>
                        <div className="relative">
                            <img src={bg3} alt="Security" className="rounded-lg shadow-lg" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white rounded-b-lg">
                                <h2 className="text-lg font-bold">Advanced Security Features</h2>
                                <p className="text-sm">Implement cutting-edge security measures to protect sensitive data and ensure compliance with legal standards and best practices.</p>
                            </div>
                        </div>
                    </Carousel>
                </div>

                <div className="border rounded-lg p-4 mb-4 cursor-pointer bg-gradient-to-r from-green-200 to-blue-200 hover:bg-gradient-to-l transition duration-300 ease-in-out transform hover:scale-105 shadow-lg" onClick={() => handleSectionClick('overview')}>
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center"><span className="mr-2">📘</span> Project Overview</h2>
                    {activeSection === 'overview' && (
                        <div className="mt-4 bg-white p-4 rounded-lg shadow animate-fade-in">
                            <p className="text-gray-800">JURIDEX is a comprehensive crime record management system designed to streamline the process of recording, tracking, and analyzing crime data. With JURIDEX, law enforcement agencies can efficiently manage crime reports, suspect information, and witness statements, ensuring that all relevant data is easily accessible and securely stored.</p>
                        </div>
                    )}
                </div>
                <div className="border rounded-lg p-4 mb-4 cursor-pointer bg-gradient-to-r from-green-200 to-blue-200 hover:bg-gradient-to-l transition duration-300 ease-in-out transform hover:scale-105 shadow-lg" onClick={() => handleSectionClick('features')}>
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center"><span className="mr-2">⚙️</span> Features</h2>
                    {activeSection === 'features' && (
                        <div className="mt-4 bg-white p-4 rounded-lg shadow animate-fade-in">
                            <ul className="list-disc pl-5 text-gray-800">
                                <li>Secure login and authentication</li>
                                <li>Real-time crime data updates</li>
                                <li>Comprehensive reporting tools</li>
                                <li>Easy-to-use interface</li>
                                <li>Integration with law enforcement databases</li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="border rounded-lg p-4 mb-4 cursor-pointer bg-gradient-to-r from-green-200 to-blue-200 hover:bg-gradient-to-l transition duration-300 ease-in-out transform hover:scale-105 shadow-lg" onClick={() => handleSectionClick('contact')}>
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center"><span className="mr-2">📞</span> Contact Us</h2>
                    {activeSection === 'contact' && (
                        <div className="mt-4 bg-white p-4 rounded-lg shadow animate-fade-in">
                            <p className="text-gray-800">If you have any questions or need support, please contact us at <a href="mailto:support@juridex.com" className="text-blue-600 hover:underline">support@juridex.com</a>.</p>
                        </div>
                    )}
                </div>
            </main>

            <footer className="text-center mt-12 text-gray-700">
                <p>&copy; 2024 JURIDEX. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
