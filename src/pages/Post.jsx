import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import service from '../appwrite/appwriteconfig'
import { Button, Container, LoadingPage } from '../components/index'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { slug } = useParams()
    const navigate = useNavigate()
    
    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                } else {
                    setError('Post not found')
                }
                setLoading(false)
            }).catch((error) => {
                setError('Failed to load post')
                setLoading(false)
            })
        } else {
            setError('Invalid post URL')
            setLoading(false)
        }
    }, [slug])

    const deletePost = () => {
        if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            service.deletePost(post.$id).then((status) => {
                if (status) {
                    service.deleteFile(post.featuredImage)
                    navigate('/')
                }
            })
        }
    }

    // Loading state
    if (loading) {
        return <LoadingPage />
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Container>
                    <div className="text-center max-w-md mx-auto">
                        <div className="mb-8">
                            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {error}
                        </h2>
                        <p className="text-gray-600 mb-8">
                            The post you're looking for doesn't exist or has been removed.
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <article className="min-h-screen bg-gray-50">
            <Container>
                {/* Hero Section */}
                <div className="relative">
                    {/* Featured Image */}
                    <div className="w-full h-96 bg-gray-200 rounded-xl overflow-hidden">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Author Actions - Only visible to post author */}
                    {isAuthor && (
                        <div className="absolute top-4 right-4 flex space-x-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    variant="secondary"
                                    size="small"
                                    className="bg-white/90 hover:bg-white"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                variant="danger"
                                size="small"
                                onClick={deletePost}
                                className="bg-red-400 hover:bg-red-50"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Article Content */}
                <div className="max-w-4xl mx-auto py-12">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Article Header */}
                        <div className="px-8 py-8 border-b border-gray-200">
                            <div className="mb-6">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    post.status === 'active' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {post.status === 'active' ? 'Published' : 'Draft'}
                                </span>
                            </div>
                            
                            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                {post.title}
                            </h1>
                            
                            {/* Article Meta */}
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="font-medium">
                                        {post.author || 'Anonymous'}
                                    </span>
                                </div>
                                
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>
                                        {new Date(post.$createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                                
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span>
                                        {Math.ceil(post.content.split(' ').length / 200)} min read
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Article Body */}
                        <div className="px-8 py-8">
                            <div className="prose prose-lg max-w-none">
                                <div className="text-gray-800 leading-relaxed">
                                    {parse(post.content)}
                                </div>
                            </div>
                        </div>

                        {/* Article Footer */}
                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-600">Share this post:</span>
                                    <div className="flex space-x-2">
                                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                            </svg>
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                
                                <Link
                                    to="/all-posts"
                                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Posts
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </article>
    )
}

export default Post