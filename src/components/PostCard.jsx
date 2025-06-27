import service from '../appwrite/appwriteconfig' 
import { Link } from 'react-router'

export default function PostCard({
    $id, title, featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out border border-gray-200 overflow-hidden">
            {/* Image Container */}
            <div className="w-full h-48 overflow-hidden bg-gray-100">
                <img 
                    src={service.getFilePreview(featuredImage)}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
            </div>
            
            {/* Content */}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                    {title}
                </h2>
            </div>
        </div>
    </Link>
  )
}