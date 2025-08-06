'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Backendless from '@/lib/backendless'
import Link from 'next/link'
import Image from 'next/image'

interface Post {
  objectId: string
  title: string
  content: string
  image?: string
  created?: string
  ownerId: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dateMap, setDateMap] = useState<{ [id: string]: string }>({})

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    const uid = localStorage.getItem('user-id')

    if (!token || !uid) {
      router.replace('/login')
      return
    }

    const fetchPosts = async () => {
      try {
        const queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(`ownerId = '${uid}'`)
        const result = await Backendless.Data.of('Posts').find<Post>(queryBuilder)
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
  }, [router])

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus postingan ini?')) return

    try {
      await Backendless.Data.of('Posts').remove(id)
      setPosts(prev => prev.filter(p => p.objectId !== id))
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus postingan')
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {loading ? (
        <p>Memuat data postingan...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">Belum ada postingan. Buat satu sekarang!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <div key={post.objectId} className="bg-white rounded shadow p-4 flex flex-col">
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="rounded h-40 object-cover w-full mb-3"
                />
              )}
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-3 mb-2">{post.content}</p>
              <div className="text-xs text-gray-400 mb-3">
                {dateMap[post.objectId] || ''}
              </div>
              <div className="flex gap-2 mt-auto">
                <Link
                  href={`/edit/${post.objectId}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.objectId)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
