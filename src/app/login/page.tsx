'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Backendless from '@/lib/backendless'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

interface LoginValues {
  email: string
  password: string
}

interface BackendlessUser {
  objectId: string
  email: string
  'user-token'?: string
  [key: string]: unknown
}

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const initialValues: LoginValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email tidak valid')
      .required('Email wajib diisi'),
    password: Yup.string()
      .required('Password wajib diisi')
      .min(6, 'Password minimal 6 karakter'),
  })

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setError('')
    try {
      const user = await Backendless.UserService.login<BackendlessUser>(
        values.email,
        values.password,
        true
      )

      const token = user['user-token']
      if (!token) throw new Error('Autentikasi gagal: Token tidak ditemukan')

      
      localStorage.setItem('user-token', token)
      localStorage.setItem('user-email', user.email)
      localStorage.setItem('user-id', user.objectId)

  
      Backendless.UserService.setCurrentUser(user)

 
      window.dispatchEvent(new Event('userLoggedIn'))

    
      router.push('/dashboard')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Login gagal. Silakan coba lagi.'
      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
          {error}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-semibold mb-1">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="username"
              />
              <ErrorMessage 
                name="email" 
                component="div" 
                className="text-red-500 text-sm mt-1" 
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="w-full border px-3 py-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <ErrorMessage 
                name="password" 
                component="div" 
                className="text-red-500 text-sm mt-1" 
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`w-full py-2 rounded text-white transition-colors ${
                  isSubmitting || !isValid
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Memproses...' : 'Login'}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="mt-4 text-center text-sm text-gray-600">
        Tidak punya akun?{' '}
        <Link 
          href="/register" 
          className="text-blue-600 hover:underline font-medium"
        >
          Daftar sekarang
        </Link>
      </div>

      <div className="mt-2 text-center text-sm">
        <Link 
          href="/forgot-password" 
          className="text-blue-600 hover:underline"
        >
          Lupa password?
        </Link>
      </div>
    </div>
  )
}