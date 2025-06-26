import React from 'react'
import { Container } from '../components/index'

function Contact() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Container>
                {/* Hero Section */}
                <div className="py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Get to Know Me
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Connect with me, explore my journey, and let's build something amazing together
                    </p>
                </div>

                <div className="py-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column - Profile & Bio */}
                        <div className="space-y-8">
                            {/* Profile Card */}
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                                <div className="text-center mb-8">
                                    {/* Profile Image with Polygon Shape */}
                                    <div className="relative w-40 h-40 mx-auto mb-6 group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 transform rotate-6 group-hover:rotate-12 transition-transform duration-500 ease-out"
                                             style={{
                                                 clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                                             }}>
                                        </div>
                                        <div className="absolute inset-2 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 ease-out delay-75"
                                             style={{
                                                 clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)'
                                             }}>
                                        </div>
                                        <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-out"
                                             style={{
                                                 clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
                                             }}>
                                            <img
                                                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                                                alt="Vidita Singh"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        Vidita Singh
                                    </h2>
                                    <p className="text-blue-600 font-medium mb-4">
                                        Full Stack Developer & Computer Science Student
                                    </p>
                                    <div className="flex items-center justify-center text-gray-600 text-sm">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>India</span>
                                    </div>
                                </div>

                                {/* Bio Section */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Hello! I'm Vidita, a passionate B.Tech Computer Science Engineering student graduating in 2026. 
                                        I'm deeply fascinated by the world of full-stack development and love creating digital solutions 
                                        that make a difference.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        My journey in tech began with curiosity and has evolved into a passion for building 
                                        user-centric applications. I specialize in the MERN stack and enjoy exploring new 
                                        technologies that push the boundaries of what's possible on the web.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        When I'm not coding, you'll find me contributing to open-source projects, writing 
                                        technical blogs, or mentoring fellow students. I believe in continuous learning 
                                        and the power of community in driving innovation.
                                    </p>
                                </div>
                            </div>

                            {/* Skills & Interests */}
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Skills & Technologies</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                            <span className="text-gray-600 text-sm">React.js</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                                            <span className="text-gray-600 text-sm">Node.js</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                                            <span className="text-gray-600 text-sm">MongoDB</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></div>
                                            <span className="text-gray-600 text-sm">JavaScript</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                                            <span className="text-gray-600 text-sm">Express.js</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                                            <span className="text-gray-600 text-sm">Tailwind CSS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Contact Options */}
                        <div className="space-y-8">
                            {/* Contact Methods */}
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Connect</h3>
                                <p className="text-gray-600 mb-8">
                                    I'm always excited to connect with fellow developers, potential collaborators, 
                                    or anyone interested in technology. Feel free to reach out!
                                </p>

                                <div className="space-y-6">
                                    {/* Email */}
                                    <a
                                        href="mailto:viditasingh.sde@gmail.com"
                                        className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md group"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-1">Send me an Email</h4>
                                            <p className="text-gray-600">viditasingh.sde@gmail.com</p>
                                        </div>
                                        <div className="ml-auto">
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                    </a>

                                    {/* Resume */}
                                    <a
                                        href="/resume-vidita-singh.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-md group"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-1">Download Resume</h4>
                                            <p className="text-gray-600">View my experience and skills</p>
                                        </div>
                                        <div className="ml-auto">
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    </a>

                                    {/* LinkedIn */}
                                    <a
                                        href="https://linkedin.com/in/viditasingh"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md group"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-1">Connect on LinkedIn</h4>
                                            <p className="text-gray-600">Professional networking</p>
                                        </div>
                                        <div className="ml-auto">
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                    </a>

                                    {/* GitHub */}
                                    <a
                                        href="https://github.com/viditasingh"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md group"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-black rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-1">View GitHub Profile</h4>
                                            <p className="text-gray-600">Check out my projects</p>
                                        </div>
                                        <div className="ml-auto">
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Response Time</span>
                                        <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Usually within 24 hours</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Open for</span>
                                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Collaborations & Opportunities</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Time Zone</span>
                                        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">IST (UTC+5:30)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Contact