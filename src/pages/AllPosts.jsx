import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { Container, PostCard, LoadingPage, Button } from '../components/index'
import service from '../appwrite/appwriteconfig'

export default function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    
    // Get authentication status
    const authStatus = useSelector(state => state.auth.status)
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        // Only fetch posts if user is authenticated
        if (authStatus && userData) {
            fetchPosts()
        } else {
            setLoading(false)
        }
    }, [authStatus, userData])

    const fetchPosts = async () => {
        try {
            setLoading(true)
            setError('')
            
            const posts = await service.getPosts() // Only get active posts
            if (posts && posts.documents) {
                // Filter only active posts for public viewing
                const activePosts = posts.documents.filter(post => post.status === 'active')
                setPosts(activePosts)
            } else {
                setPosts([])
            }
        } catch (error) {
            console.error('Error fetching posts:', error)
            setError('Failed to load posts. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // Loading state
    if (loading) {
        return <LoadingPage />
    }

    // Not authenticated - Show login prompt
    if (!authStatus) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
                <Container>
                    <div className="max-w-md mx-auto text-center">
                        <div className="mb-8">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Login Required
                            </h2>
                            <p className="text-gray-600 mb-8">
                                You need to be logged in to view all posts. Join our community to discover amazing content from our writers.
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <Link to="/login" className="block">
                                <Button variant="primary" size="large" fullWidth>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                                    </svg>
                                    Login to Continue
                                </Button>
                            </Link>
                            
                            <div className="text-sm text-gray-500">
                                Don't have an account?{' '}
                                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                                    Sign up here
                                </Link>
                            </div>
                        </div>
                        
                        {/* Optional: Show some benefits */}
                        <div className="mt-12 grid grid-cols-1 gap-4 text-left">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-gray-900">Read unlimited posts</h3>
                                    <p className="text-sm text-gray-500">Access all published content from our writers</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-gray-900">Create your own posts</h3>
                                    <p className="text-sm text-gray-500">Share your thoughts and ideas with the community</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-gray-900">Manage your content</h3>
                                    <p className="text-sm text-gray-500">Edit, delete, and organize your blog posts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className='min-h-screen bg-gray-50 py-8'>
                <Container>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Posts</h3>
                        <p className="text-red-600 mb-4">{error}</p>
                        <Button variant="secondary" onClick={fetchPosts}>
                            Try Again
                        </Button>
                    </div>
                </Container>
            </div>
        )
    }

    // Authenticated user - Show posts
    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <Container>
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Posts</h1>
                            <p className="text-gray-600">
                                Discover amazing content from our community • {posts.length} posts
                            </p>
                        </div>
                        
                        {/* Add "Create Post" button for logged-in users */}
                        <div className="mt-4 sm:mt-0">
                            <Link to="/add-post">
                                <Button variant="primary" size="medium">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create Post
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Welcome message for logged-in users */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                            <span className="text-white text-sm font-semibold">
                                {userData?.name?.charAt(0).toUpperCase() || userData?.email?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">
                                Welcome back, {userData?.name || userData?.email || 'Writer'}! 👋
                            </h3>
                            <p className="text-gray-600">
                                Ready to explore what's new in our community?
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Posts Grid */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <PostCard 
                                key={post.$id}
                                $id={post.$id}
                                title={post.title}
                                featuredImage={post.featuredImage}
                                $createdAt={post.$createdAt}
                                status={post.status}
                                slug={post.slug}
                                author={post.author}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts published yet</h3>
                        <p className="text-gray-500 mb-6">
                            Be the first to share something amazing with the community!
                        </p>
                        <Link to="/add-post">
                            <Button variant="primary" size="medium">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create First Post
                            </Button>
                        </Link>
                    </div>
                )}
            </Container>
        </div>
    )
}