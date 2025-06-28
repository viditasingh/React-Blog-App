import { useSelector } from 'react-redux'
import { Container } from '../components/index'
import { Link } from 'react-router'
useSelector

function About() {
    const authStatus = useSelector((state) => state.auth.status)
    return (
        <div className="min-h-screen bg-gray-50">
            <Container>
                {/* Hero Section */}
                <div className="py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        About Our Blog
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        A platform where ideas come to life, stories are shared, and knowledge is exchanged. 
                        Welcome to a community of passionate writers and curious readers.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="py-16">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Our Mission
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    We believe that everyone has a story worth telling. Our platform provides 
                                    a space for writers, thinkers, and creators to share their perspectives, 
                                    insights, and experiences with a global audience.
                                </p>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Whether you're sharing technical tutorials, personal experiences, creative 
                                    writing, or thought-provoking articles, we're here to amplify your voice 
                                    and connect you with readers who value quality content.
                                </p>
                            </div>
                            <div className="relative">
                                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-32 h-32 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        What Makes Us Special
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Publishing</h3>
                            <p className="text-gray-600">
                                Intuitive editor with rich formatting options makes publishing your thoughts effortless and enjoyable.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Driven</h3>
                            <p className="text-gray-600">
                                Connect with like-minded individuals, share ideas, and build meaningful relationships through content.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality First</h3>
                            <p className="text-gray-600">
                                We prioritize quality content and provide tools to help you create professional, engaging posts.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Developer Section */}
                <div className="py-16">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 md:p-12">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Meet the Developer
                            </h2>
                            <p className="text-gray-600 text-lg">
                                The creative mind behind this platform
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12">
                                <div className="grid md:grid-cols-3 gap-8 items-center">
                                    {/* Profile Image with Polygon Shape */}
                                    <div className="text-center">
                                        <div className="relative w-48 h-48 mx-auto mb-6 group">
                                            {/* Polygon Background with Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 transform rotate-6 group-hover:rotate-12 transition-transform duration-500 ease-out"
                                                 style={{
                                                     clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                                                 }}>
                                            </div>
                                            
                                            {/* Secondary Polygon for Depth */}
                                            <div className="absolute inset-2 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 ease-out delay-75"
                                                 style={{
                                                     clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)'
                                                 }}>
                                            </div>
                                            
                                            {/* Profile Image Container */}
                                            <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-out"
                                                 style={{
                                                     clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
                                                 }}>
                                                <img
                                                    src="https://i.postimg.cc/RCLR0NN2/Screenshot-2024-07-15-124921.png"
                                                    alt="Vidita Singh"
                                                    className="w-full h-full object-cover"
                                                />
                                                
                                                {/* Overlay with initials as fallback */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <span className="text-2xl font-bold text-white drop-shadow-lg">VS</span>
                                                </div>
                                            </div>

                                            {/* Floating Animation Elements */}
                                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
                                            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-700"></div>
                                            <div className="absolute top-1/4 -left-3 w-2 h-2 bg-cyan-400 rounded-full animate-ping delay-1000"></div>
                                        </div>
                                        
                                        {/* Social Links */}
                                        <div className="flex justify-center space-x-4">
                                            <a href="https://linkedin.com/in/vidita-singh" 
                                               target="_blank" 
                                               rel="noopener noreferrer"
                                               className="p-3 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110 hover:bg-blue-50 rounded-full">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                </svg>
                                            </a>
                                            <a href="https://github.com/viditasingh" 
                                               target="_blank" 
                                               rel="noopener noreferrer"
                                               className="p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 hover:scale-110 hover:bg-gray-50 rounded-full">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                </svg>
                                            </a>
                                            <a href="https://twitter.com/videe1812" 
                                               target="_blank" 
                                               rel="noopener noreferrer"
                                               className="p-3 text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:bg-blue-50 rounded-full">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Developer Info */}
                                    <div className="md:col-span-2">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            Vidita Singh
                                        </h3>
                                        <p className="text-blue-600 font-medium mb-4">
                                            Full Stack Developer & B.Tech CSE Student
                                        </p>
                                        
                                        <div className="space-y-4 mb-6">
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                </svg>
                                                <span>Computer Science Engineering Graduate - Class of 2026</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                </svg>
                                                <span>Passionate about MERN Stack Development</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 leading-relaxed mb-6">
                                            Hi! I'm Vidita, a passionate computer science student and aspiring full-stack developer. 
                                            I built this blog platform as part of my journey to master the MERN stack and create 
                                            meaningful digital experiences. I believe in the power of technology to connect people 
                                            and share knowledge.
                                        </p>

                                        <p className="text-gray-600 leading-relaxed mb-8">
                                            When I'm not coding, you can find me exploring new technologies, working on my DSA skills, 
                                            or being emersed in competitive programming. I'm always excited to connect with 
                                            fellow developers and learn from the community.
                                        </p>

                                        {/* Contact Button */}
                                        <Link
                                            to="/contact"
                                            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Get in Touch
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                {!authStatus && (<div className="py-16 text-center">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Ready to Share Your Story?
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                            Join our community of writers and readers. Start creating, sharing, and connecting today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/signup"
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                            >
                                Join the Community
                            </Link>
                            <Link
                                to="/"
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                            >
                                Explore Posts
                            </Link>
                        </div>
                    </div>
                </div>)}
            </Container>
        </div>
    )
}

export default About