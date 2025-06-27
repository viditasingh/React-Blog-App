import React, { useEffect, useState } from 'react'
import { Container, PostCard, LoadingPage } from '../components/index'
import service from '../appwrite/appwriteconfig'

export default function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        service.getAll([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <LoadingPage />
    }

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <Container>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">All Posts</h1>
                    <p className="text-gray-600">Discover all the amazing content from our community</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <PostCard 
                            key={post.$id}
                            $id={post.$id}
                            title={post.title}
                            featuredImage={post.featuredImage}
                        />
                    ))}
                </div>
                
                {posts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No posts found.</p>
                    </div>
                )}
            </Container>
        </div>
    )
}