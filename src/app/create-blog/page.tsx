'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Backendless from '@/lib/backendless'

export default function CreateBlogPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  
  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if (!token) {
      router.replace('/login')
    }
  }, [router])

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let imageUrl = ''
      if (imageFile) {
        const result = await Backendless.Files.upload(imageFile, '/blog-images', true)
        imageUrl = result.fileURL
      }

      const user = await Backendless.UserService.getCurrentUser()
      const postData = {
        title,
        content,
        image: imageUrl,
        author: user?.email,
        userId: user?.objectId,
      }

      await Backendless.Data.of('Posts').save(postData)
      router.push('/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Gagal memuat postingan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Buat Postingan Baru</h1>

      {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Judul</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Konten</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            rows={8}
            className="w-full border px-3 py-2 rounded resize-none"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Upload Gambar (opsional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImageFile(e.target.files?.[0] || null)}
            className="text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#00C4E2] text-white px-4 py-2 rounded hover:bg-[#00aac8] transition disabled:opacity-60"
        >
          {loading ? 'Menyimpan...' : 'Posting'}
        </button>
      </form>
    </div>
  )
}
