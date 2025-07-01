import React, { useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index.js'
import service from '../../appwrite/appwriteConfig.js'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

export default function PostForm({ post }) {
    const navigate = useNavigate()
    const [previewImage, setPreviewImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const userData = useSelector(state => state.auth.userData)
    const authStatus = useSelector(state => state.auth.status)

    // Check if user is authenticated
    useEffect(() => {
        if (!authStatus) {
            navigate('/login')
        }
    }, [authStatus, navigate])

    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })


    const submit = async (data) => {
    setError('')
    setIsLoading(true)
    
    try {
        if (post) {
            // Update existing post
            const file = data.featuredImage && data.featuredImage[0] ? 
                await service.uploadFile(data.featuredImage[0]) : null

            if (file && post.featuredImage) {
                // Delete old image if new one is uploaded
                await service.deleteFile(post.featuredImage)
            }

            const dbPost = await service.updatePost(post.$id, {
                title: data.title,
                slug: data.slug,
                content: data.content,
                featuredImage: file ? file.$id : post.featuredImage,
                status: data.status,
                author: userData.name || userData.email || 'Anonymous'
            })
            
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            // Create new post
            if (!data.featuredImage || !data.featuredImage[0]) {
                setError('Featured image is required for new posts')
                setIsLoading(false)
                return
            }

            const file = await service.uploadFile(data.featuredImage[0])

            if (file && file.$id) {
                const dbPost = await service.createPost({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    featuredImage: file.$id,
                    status: data.status,
                    userId: userData.$id,
                    author: userData.name || userData.email || 'Anonymous' 
                })
                
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                } else {
                    throw new Error('Failed to create post')
                }
            } else {
                throw new Error('Failed to upload image')
            }
        }
    } catch (error) {
        console.error('Submit error:', error)
        setError(error.message || 'An error occurred while saving the post')
    } finally {
        setIsLoading(false)
    }
}

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')
        }
        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                const currentSlug = getValues('slug')
                if (!post || !currentSlug) {
                    setValue('slug', slugTransform(value.title), { shouldValidate: true })
                }
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    // Handle image preview
    const handleImagePreview = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {post ? 'Edit Post' : 'Create New Post'}
                    </h1>
                    <p className="mt-2 text-gray-600">
                        {post ? 'Update your existing post' : 'Share your thoughts with the world'}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(submit)} className="space-y-6">
                    {/* Updated Grid Layout - More space for content, compact sidebar */}
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                        
                        {/* Main Content Area - Takes 3/4 of the width */}
                        <div className="xl:col-span-3 space-y-6">
                            
                            {/* Title and Slug in a single row for better space usage */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <Input
                                        label="Post Title"
                                        placeholder="Enter an engaging title for your post"
                                        error={errors.title?.message}
                                        required ={true}
                                        {...register('title', {
                                            required: 'Title is required',
                                            minLength: {
                                                value: 5,
                                                message: 'Title must be at least 5 characters'
                                            }
                                        })}
                                    />
                                </div>

                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <Input
                                        label="URL Slug"
                                        placeholder="url-friendly-slug"
                                        helperText={"Auto-generated from title, but you can edit it"}
                                        error={errors.slug?.message}
                                        required={true}
                                        {...register('slug', {
                                            required: 'Slug is required',
                                            pattern: {
                                                value: /^[a-z0-9-]+$/,
                                                message: 'Slug can only contain lowercase letters, numbers, and hyphens'
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Content Editor - Full width with more height */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <RTE 
                                    label="Content"
                                    name="content"
                                    control={control}
                                    defaultValue={getValues('content')}
                                />
                            </div>
                        </div>

                        {/* Compact Sidebar - Takes 1/4 of the width */}
                        <div className="xl:col-span-1 space-y-6">
                            
                            {/* Post Settings - More compact */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-4">Settings</h3>
                                
                                {/* Status Select - Also add hover effect to this container */}
                                <div className="mb-6">
                                    <Select
                                        label="Post Status"
                                        options={['active', 'inactive']}
                                        required={true} 
                                        {...register('status', {
                                            required: 'Status is required'
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Featured Image - More compact */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <h3 className={`text-base font-semibold text-gray-900 mb-4 `}>Featured Image<span className="text-red-500 ml-1 font-semibold">*</span></h3>
                                
                                <div className="space-y-3">
                                    {/* Current Image Preview - Smaller */}
                                    {(previewImage || post?.featuredImage) && (
                                        <div className="relative">
                                            <img
                                                src={previewImage || service.getFilePreview(post.featuredImage)}
                                                alt="Featured image preview"
                                                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                            />
                                            <div className="absolute top-1 right-1">
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                    Preview
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* File Input - More compact */}
                                    <div className="flex justify-center px-4 py-4 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                                        <div className="text-center">
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="featuredImage" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                    <span>Upload image</span>
                                                    <input
                                                        id="featuredImage"
                                                        type="file"
                                                        accept="image/*"
                                                        className="sr-only"
                                                        {...register('featuredImage', {
                                                            required: post ? false : 'Featured image is required'
                                                        })}
                                                        onChange={handleImagePreview}
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                                        </div>
                                    </div>
                                    {errors.featuredImage && (
                                        <p className="text-sm text-red-600">{errors.featuredImage.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Post Preview - More compact */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3">Preview</h3>
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-xs font-medium text-gray-500">Title:</span>
                                        <p className="text-sm text-gray-900 truncate">
                                            {watch('title') || 'Enter a title...'}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-medium text-gray-500">Slug:</span>
                                        <p className="text-sm text-gray-900 truncate flex items-center">
                                            /{watch('slug') || post?.slug ||'enter-a-title'}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-medium text-gray-500">Status:</span>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                            watch('status') === 'active' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {watch('status') || 'active'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons - Sticky for better UX */}
                            <div className="sticky top-4 space-y-3">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="medium"
                                    fullWidth
                                    loading={isLoading}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : (post ? 'Update Post' : 'Publish Post')}
                                </Button>
                                
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="medium"
                                    fullWidth
                                    onClick={() => navigate('/all-posts')}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}