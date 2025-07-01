import React, { useState } from 'react'
import service from '../appwrite/appwriteConfig.js'
import { Link } from 'react-router';

export default function PostCard({ $id, title, featuredImage, $createdAt, status, author }) {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const getImageSrc = () => {
        if (!featuredImage) {
            console.warn('No featuredImage ID for post:', title);
            return null;
        }

        try {
            // Try preview first
            const previewUrl = service.getFilePreview(featuredImage);
            console.log('Generated preview URL for', title, ':', previewUrl);
            return previewUrl;
        } catch (error) {
            console.error('Error generating image URL:', error);
            // Fallback to direct view
            try {
                return service.getFileView(featuredImage);
            } catch (fallbackError) {
                console.error('Fallback URL also failed:', fallbackError);
                return null;
            }
        }
    };

    const handleImageError = (e) => {
        console.error('Image failed to load:', e.target.src);
        setImageError(true);
        
        // Try fallback URL
        if (!imageError) {
            const fallbackUrl = service.getFilePreview(featuredImage);
            if (fallbackUrl && fallbackUrl !== e.target.src) {
                e.target.src = fallbackUrl;
                return;
            }
        }
        
        // Use placeholder
        e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Image+Not+Available';
    };

    const handleImageLoad = () => {
        console.log('Image loaded successfully for:', title);
        setImageLoaded(true);
    };

    const imageSrc = getImageSrc();

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <Link to={`/post/${$id}`}>
                <div className="aspect-video w-full bg-gray-200 relative">
                    {imageSrc ? (
                        <>
                            {!imageLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                </div>
                            )}
                            <img
                                src={imageSrc}
                                alt={title || 'Blog post'}
                                className={`w-full h-full object-cover transition-opacity duration-200 ${
                                    imageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                                onError={handleImageError}
                                onLoad={handleImageLoad}
                            />
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-gray-400">No Image</span>
                        </div>
                    )}
                </div>
                
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {title}
                    </h3>
                    
                    {/*  Add author info */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-2">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="font-medium">
                                {author || 'Anonymous'}
                            </span>
                        </div>
                        
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                            {status === 'active' ? 'Published' : 'Draft'}
                        </span>
                    </div>
                    
                    {/* Add creation date */}
                    <div className="mt-2 text-xs text-gray-400">
                        {new Date($createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </div>
                </div>
            </Link>
        </div>
    )
}