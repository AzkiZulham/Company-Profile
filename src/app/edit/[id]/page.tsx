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
  updated?: number | string
  [key: string]: unknown
}

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [post, setPost] = useState<BlogPost | null>(null)
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('ID postingan tidak valid')
        setLoading(false)
        router.push('/dashboard')
        return
      }

      try {
        const post = await Backendless.Data.of('Posts').findById<BlogPost>(id)
        if (!post) {
          throw new Error('Postingan tidak ditemukan')
        }
        setPost(post)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Gagal mengambil data postingan.')
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id, router])


  useEffect(() => {
    if (newImageFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(newImageFile)
    } else {
      setPreviewImage(null)
    }
  }, [newImageFile])


  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!post || !id) return

    setError('')
    setLoading(true)

    try {
      let imageUrl = post.image

     
      if (newImageFile) {
        const result = await Backendless.Files.upload(newImageFile, 'blog-images', true)
        imageUrl = result.fileURL

        if (post.image && post.image !== imageUrl) {
          try {
            await Backendless.Files.remove(post.image)
          } catch (err) {
            console.error('Gagal menghapus gambar lama:', err)
          }
        }
      }

      
      await Backendless.Data.of('Posts').save<BlogPost>({
        objectId: id,
        title: post.title,
        content: post.content,
        image: imageUrl,
        updated: new Date().getTime()
      })

      router.push('/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Gagal memperbarui postingan.')
    } finally {
      setLoading(false)
    }
  }

  
  const handleDelete = async () => {
    if (!post || !id) return
    if (!confirm('Yakin ingin menghapus postingan ini?')) return

    try {
      if (post.image) {
        try {
          await Backendless.Files.remove(post.image)
        } catch (err) {
          console.error('Gagal menghapus gambar:', err)
        }
      }

      await Backendless.Data.of('Posts').remove(id)
      router.push('/dashboard')
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus postingan.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!post) return
    setPost({
      ...post,
      [e.target.name]: e.target.value
    })
  }

  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }


  if (!post) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{error || 'Postingan tidak ditemukan'}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-2 text-blue-600 hover:underline"
          >
            Kembali ke dashboard
          </button>
        </div>
      </div>
    )
  }

  
  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Postingan</h1>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-gray-500 hover:text-gray-700"
        >
          &larr; Kembali
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label htmlFor="title" className="block font-medium mb-2">
            Judul
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={post.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block font-medium mb-2">
            Konten
          </label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Gambar</label>
          {(post.image || previewImage) && (
            <div className="mb-4">
              <div className="relative w-full h-64 rounded-md overflow-hidden border">
                <Image
                  src={previewImage || post.image || ''}
                  alt="Preview"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {previewImage ? 'Gambar baru' : 'Gambar saat ini'}
              </p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            Hapus
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white rounded-md transition-colors ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  )
}
