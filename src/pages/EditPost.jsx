import React, { useEffect, useState } from 'react'
import { Container, PostForm, LoadingPage } from '../components/index.js'
import service from '../appwrite/appwriteconfig.js'
import { useNavigate, useParams } from 'react-router'

export default function EditPost() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                } else {
                    navigate('/')
                }
                setLoading(false)
            }).catch(() => {
                navigate('/')
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    if (loading) {
        return <LoadingPage />
    }

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}