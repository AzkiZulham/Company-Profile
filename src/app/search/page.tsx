'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Backendless from '@/lib/backendless';
import Link from 'next/link';

interface Post {
  objectId: string;
  title: string;
  content: string;
  created?: number;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.trim() || '';
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);

      try {
        const whereClause = `title LIKE '%${query}%' OR content LIKE '%${query}%'`;
        const rawPosts = await Backendless.Data.of('Posts').find({ where: whereClause });
        const posts = rawPosts as Post[];
        setResults(posts);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Terjadi kesalahan saat mencari.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Hasil pencarian untuk: <span className="text-[#00C4E2]">{query}</span>
      </h1>

      {loading && <p className="text-gray-500">Memuat hasil pencarian...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && results.length === 0 && (
        <p className="text-gray-500">Tidak ada hasil ditemukan untuk pencarianmu.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {results.map((post) => (
          <Link
            key={post.objectId}
            href={`/blogs/${post.objectId}`}
            className="block p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-white"
          >
            <h2 className="text-lg font-semibold text-[#00C4E2] mb-2">{post.title}</h2>
            <p className="text-sm text-gray-700 line-clamp-3">{post.content}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-center py-8 text-gray-500">Memuat halaman pencarian...</p>}>
      <SearchContent />
    </Suspense>
  );
}
