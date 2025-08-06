'use client'

import { useEffect, useState } from 'react'
import Backendless from '@/lib/backendless'
import Link from 'next/link'
import Image from 'next/image'

interface Post {
  objectId: string
  title: string
  content: string
  image?: string
  created?: string
}

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dateMap, setDateMap] = useState<{ [id: string]: string }>({})

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await Backendless.Data.of('Posts').find<Post>()
        setPosts(result)

        
        const map: { [id: string]: string } = {}
        result.forEach(post => {
          map[post.objectId] = post.created
            ? new Date(post.created).toLocaleDateString('id-ID')
            : ''
        })
        setDateMap(map)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Gagal memuat postingan.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Daftar Postingan</h1>

      {loading ? (
        <p>Memuat postingan...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">Belum ada postingan.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link
              key={post.objectId}
              href={`/blogs/${post.objectId}`}
              className="bg-white rounded shadow p-4 hover:shadow-md transition"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="rounded h-40 object-cover w-full mb-3"
                />
              )}
             <h2 className="text-xl font-semibold hover:text-[#00C4E2] transition-colors duration-200">
              {post.title}
            </h2>
              <p className="text-sm text-gray-500 mt-1 mb-2 line-clamp-3">
                {post.content}
              </p>
              <div className="text-xs text-gray-400">
                {dateMap[post.objectId] || ''}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
