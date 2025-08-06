'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Backendless from '@/lib/backendless'
import Image from 'next/image'

interface BlogPost {
  objectId: string
  title: string
  content: string
  image?: string
  created?: number | string
  author?: string
  [key: string]: unknown 
}

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('ID postingan tidak valid')
        setLoading(false)
        return
      }

      try {
        const result = await Backendless.Data.of('Posts').findById<BlogPost>(id)
        
        if (!result) {
          throw new Error('Postingan tidak ditemukan')
        }

        setPost(result)
        
        
        if (result.created) {
          const createdDate = typeof result.created === 'number' 
            ? new Date(result.created) 
            : new Date(result.created)
          
          if (!isNaN(createdDate.getTime())) {
            setFormattedDate(createdDate.toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }))
          }
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Gagal memuat postingan.')
        router.push('/blogs') 
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id, router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{error}</p>
          <button 
            onClick={() => router.push('/blogs')}
            className="mt-2 text-blue-600 hover:underline"
          >
            Kembali ke daftar blog
          </button>
        </div>
      </div>
    )
  }

  if (!post) {
    return null 
  }

  return (
    <article className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-8 mb-12">
      {post.image && (
        <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>
      )}
      
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <div className="flex items-center text-gray-500 text-sm">
          {post.author && (
            <span className="mr-2">Ditulis oleh <span className="font-medium">{post.author}</span></span>
          )}
          {formattedDate && (
            <span>pada {formattedDate}</span>
          )}
        </div>
      </header>

      <div className="prose max-w-none text-gray-700 whitespace-pre-line">
        {post.content}
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200">
        <button
          onClick={() => router.push('/blogs')}
          className="text-[#00C4E2] hover:underline"
        >
          &larr; Kembali ke daftar blog
        </button>
      </div>
    </article>
  )
}