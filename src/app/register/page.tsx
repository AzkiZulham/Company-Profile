'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Backendless from '@/lib/backendless'
import { Eye, EyeOff } from 'lucide-react' 

interface FormValues {
  email: string
  password: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)

  const initialValues: FormValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
    password: Yup.string().min(6, 'Minimal 6 karakter').required('Password wajib diisi'),
  })

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    setError('')
    try {
      await Backendless.UserService.register(values)
      router.push('/login')
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mendaftar')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Daftar Akun</h1>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full border px-3 py-2 rounded pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {isSubmitting ? 'Mendaftarkan...' : 'Daftar'}
            </button>
          </Form>
        )}
      </Formik>

      <p className="text-sm text-center mt-4">
        Sudah punya akun?{' '}
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => router.push('/login')}
        >
          Login
        </span>
      </p>
    </div>
  )
}
