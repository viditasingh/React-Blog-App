import React, { useEffect, useState } from 'react'
import service from '../appwrite/appwriteConfig.js'
import { Container, PostCard, LoadingPage } from '../components/index.js'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'

export default function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
    service.getAll([])
    .then((posts) => {
        if (posts && posts.documents) {
                const latestPosts = posts.documents
                    .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
                    .slice(0, 3)
                
                setPosts(latestPosts)
        }
        setLoading(false)
    })
    .catch((error) => {
        console.log("Home page error:", error)
        // For 401 errors, still show the page but without posts
        setPosts([])
        setLoading(false)
    })
    }, [])

    // Loading state - Use LoadingPage component
    if (loading) {
        return <LoadingPage />
    }

    // Empty state when no posts available
    if (posts.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <Container>
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center max-w-md">
                            {/* Illustration */}
                            <div className="mb-8">
                                <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>

                            {/* Content */}
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                {authStatus ? 'No Posts Yet' : 'Welcome to Our Blog'}
                            </h2>
                            
                            <p className="text-gray-600 mb-8">
                                {authStatus 
                                    ? 'Be the first to share your thoughts and create amazing content for the community.'
                                    : 'Discover amazing stories, insights, and ideas from our community of writers. Sign in to start reading and sharing.'
                                }
                            </p>

                            {/* Call to Action */}
                            <div className="space-y-4">
                                {authStatus ? (
                                    <Link
                                        to="/add-post"
                                        className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Create Your First Post
                                    </Link>
                                ) : (
                                    <div className="space-y-3">
                                        <Link
                                            to="/login"
                                            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
                                        >
                                            Sign In to Read Posts
                                        </Link>
                                        <p className="text-sm text-gray-500">
                                            Don't have an account?{' '}
                                            <Link
                                                to="/signup"
                                                className="font-medium text-blue-600 hover:text-blue-500"
                                            >
                                                Sign up for free
                                            </Link>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // Posts available - display them
    return (
        <div className="min-h-screen bg-gray-50">
            <Container>
                {/* Hero Section */}
                <div className="py-12 text-center border-b border-gray-200 bg-white mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Latest Stories
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover insights, stories, and ideas from our community of writers
                    </p>
                    {authStatus && (
                        <div className="mt-6">
                            <Link
                                to="/all-posts"
                                className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium"
                            >
                                View all posts
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Posts Grid */}
                <div className="py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <PostCard
                                key={post.$id}
                                $id={post.$id}
                                title={post.title}
                                featuredImage={post.featuredImage}
                                author = {post.author}
                            />
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <p className="text-gray-600 mb-4">
                            Showing the latest {posts.length} post{posts.length !== 1 ? 's' : ''}
                        </p>
                        <Link
                            to="/all-posts"
                            className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                        >
                            Explore All Posts
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Call to Action for not logged in users*/}
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
                        </div>
                    </div>
                </div>)}

                {/* Call to Action for Logged In Users */}
                {authStatus && (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-md mx-auto">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Have a story to tell?
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Share your thoughts and connect with readers around the world.
                            </p>
                            <Link
                                to="/add-post"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Write a Post
                            </Link>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    )
}