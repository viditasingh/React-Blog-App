import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { Container, PostCard, Button } from '../components/index.js'
import service from '../appwrite/appwriteconfig.js'

export default function MyPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [filter, setFilter] = useState('all') // all, active, inactive
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const authStatus = useSelector(state => state.auth.status)

    // Check authentication first
    useEffect(() => {
        if (!authStatus) {
            navigate('/login')
            return
        }
        
        if (userData && userData.$id) {
            fetchMyPosts()
        }
    }, [authStatus, userData, navigate])

    const fetchMyPosts = async () => {
        try {
            setLoading(true)
            setError('')
            
            console.log('Fetching posts for user:', userData.$id)
            
            const result = await service.getMyPosts(userData.$id)
            
            if (result && result.documents) {
                console.log('Found posts:', result.documents.length)
                setPosts(result.documents)
            } else {
                console.log('No posts found in result')
                setPosts([])
            }
        } catch (error) {
            console.error('Error fetching user posts:', error)
            setError('Failed to load your posts. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (postId, imageId) => {
        if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            try {
                console.log('Deleting post:', postId)
                
                const success = await service.deletePost(postId)
                if (success) {
                    // Also delete the featured image
                    if (imageId) {
                        try {
                            await service.deleteFile(imageId)
                        } catch (imgError) {
                            console.warn('Could not delete image:', imgError)
                        }
                    }
                    // Refresh the posts list
                    fetchMyPosts()
                    
                    // Show success message
                    alert('Post deleted successfully!')
                } else {
                    throw new Error('Failed to delete post')
                }
            } catch (error) {
                console.error('Error deleting post:', error)
                alert('Failed to delete post. Please try again.')
            }
        }
    }

    const filteredPosts = posts.filter(post => {
        if (filter === 'all') return true
        return post.status === filter
    })

    const getPostStats = () => {
        const active = posts.filter(post => post.status === 'active').length
        const inactive = posts.filter(post => post.status === 'inactive').length
        return { total: posts.length, active, inactive }
    }

    const stats = getPostStats()

    // Loading state
    if (loading) {
        return (
            <Container>
                <div className="flex flex-col justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-600">Loading your posts...</p>
                </div>
            </Container>
        )
    }

    // Error state
    if (error) {
        return (
            <Container>
                <div className="py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Posts</h3>
                        <p className="text-red-600 mb-4">{error}</p>
                        <Button 
                            variant="secondary" 
                            onClick={fetchMyPosts}
                            className="mr-4"
                        >
                            Try Again
                        </Button>
                        <Link to="/add-post">
                            <Button variant="primary">
                                Create New Post
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <div className="py-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
                        <p className="mt-2 text-gray-600">Manage and organize your blog posts</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Link to="/add-post">
                            <Button variant="primary" size="medium">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create New Post
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Published</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Drafts</p>
                                <p className="text-2xl font-semibent text-gray-900">{stats.inactive}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="bg-white rounded-lg border border-gray-200 mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6">
                            {[
                                { key: 'all', label: 'All Posts', count: stats.total },
                                { key: 'active', label: 'Published', count: stats.active },
                                { key: 'inactive', label: 'Drafts', count: stats.inactive }
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setFilter(tab.key)}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                        filter === tab.key
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.label}
                                    <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100 text-gray-900">
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Posts Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <div key={post.$id} className="relative group">
                                <PostCard
                                    $id={post.$id}
                                    title={post.title}
                                    featuredImage={post.featuredImage}
                                    $createdAt={post.$createdAt}
                                    status={post.status}
                                    slug={post.slug}
                                    author={post.author}
                                />
                                
                                {/* Action Buttons Overlay */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <div className="flex space-x-2">
                                        <Link 
                                            to={`/edit-post/${post.$id}`}
                                            className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20"
                                            title="Edit Post"
                                        >
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                        
                                        <button
                                            onClick={() => handleDelete(post.$id, post.featuredImage)}
                                            className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20 cursor-pointer"
                                            title="Delete Post"
                                        >
                                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No posts found</h3>
                        <p className="mt-1 text-gray-500">
                            {filter === 'all' 
                                ? "You haven't created any posts yet. Start sharing your thoughts with the world!" 
                                : `You don't have any ${filter} posts.`
                            }
                        </p>
                        <div className="mt-6">
                            <Link to="/add-post">
                                <Button variant="primary" size="medium">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create your first post
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    )
}