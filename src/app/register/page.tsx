'use client'

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Backendless from '@/lib/backendless'
import Link from 'next/link'

interface FormValues {
  email: string
  password: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string>('')

  const initialValues: FormValues = {
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
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setError('')
    try {
      await Backendless.UserService.register(values)
      router.push('/login')
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan saat mendaftar'
      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Daftar</h1>

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
              <Field
                type="password"
                name="password"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="new-password"
              />
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
                {isSubmitting ? 'Memproses...' : 'Daftar'}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="mt-4 text-center text-sm text-gray-600">
        Sudah punya akun?{' '}
        <Link
          href="/login"
          className="text-blue-600 hover:underline font-medium"
        >
          Masuk sekarang
        </Link>
      </div>
    </div>
  )
}
