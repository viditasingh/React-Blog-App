import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import service from '../../appwrite/appwriteconfig'
import { useNavigate } from 'react-router-dom' // Fix: react-router-dom
import { useSelector } from 'react-redux'

export default function PostForm({ post }) {
    const navigate = useNavigate()
    const [previewImage, setPreviewImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const userData = useSelector(state => state.auth.userData) // Fix: auth.userData

    const submit = async (data) => {
        setError('')
        setIsLoading(true)
        
        try {
            if (post) {
                // Update existing post
                const file = data.featuredImage[0] ? await service.uploadFile(data.featuredImage[0]) : null

                if (file) {
                    service.deleteFile(post.featuredImage)
                }

                const dbPost = await service.updatePost(post.$id, {
                    ...data, 
                    featuredImage: file ? file.$id : undefined
                })
                
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            } else {
                // Create new post
                const file = await service.uploadFile(data.featuredImage[0])

                if (file) {
                    const fileId = file.$id
                    data.featuredImage = fileId
                    const dbPost = await service.createPost({
                        ...data, 
                        userId: userData.$id
                    })
                    
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`)
                    }
                }
            }
        } catch (error) {
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

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
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
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

                <form onSubmit={handleSubmit(submit)} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title Field */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <Input
                                    label="Post Title"
                                    placeholder="Enter an engaging title for your post"
                                    error={errors.title?.message}
                                    {...register('title', {
                                        required: 'Title is required',
                                        minLength: {
                                            value: 5,
                                            message: 'Title must be at least 5 characters'
                                        }
                                    })}
                                />
                            </div>

                            {/* Slug Field */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <Input
                                    label="URL Slug"
                                    placeholder="url-friendly-slug"
                                    helperText="This will be used in the post URL. Auto-generated from title."
                                    error={errors.slug?.message}
                                    {...register('slug', {
                                        required: 'Slug is required',
                                        pattern: {
                                            value: /^[a-z0-9-]+$/,
                                            message: 'Slug can only contain lowercase letters, numbers, and hyphens'
                                        }
                                    })}
                                />
                            </div>

                            {/* Content Editor */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <RTE 
                                    label="Content"
                                    name="content"
                                    control={control}
                                    defaultValue={getValues('content')}
                                />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Post Settings */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Settings</h3>
                                
                                {/* Status Select */}
                                <div className="mb-6">
                                    <Select
                                        label="Post Status"
                                        options={['active', 'inactive']}
                                        {...register('status', {
                                            required: 'Status is required'
                                        })}
                                    />
                                </div>

                                {/* Featured Image */}
                                <div>
                                    <label className="inline-block text-sm font-medium text-gray-700 mb-2">
                                        Featured Image
                                    </label>
                                    <div className="space-y-4">
                                        {/* Current Image Preview */}
                                        {(previewImage || post?.featuredImage) && (
                                            <div className="relative">
                                                <img
                                                    src={previewImage || service.getFilePreview(post.featuredImage)}
                                                    alt="Featured image preview"
                                                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                                />
                                                <div className="absolute top-2 right-2">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Preview
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* File Input */}
                                        <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                                            <div className="space-y-1 text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="featuredImage" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                        <span>Upload a file</span>
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
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                        {errors.featuredImage && (
                                            <p className="text-sm text-red-600">{errors.featuredImage.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Post Preview */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Preview</h3>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Title:</span>
                                        <p className="text-sm text-gray-900 truncate">
                                            {watch('title') || 'Enter a title...'}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Slug:</span>
                                        <p className="text-sm text-gray-900 truncate">
                                            /{watch('slug') || 'enter-a-title'}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Status:</span>
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

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="large"
                                    fullWidth
                                    loading={isLoading}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : (post ? 'Update Post' : 'Publish Post')}
                                </Button>
                                
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="large"
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