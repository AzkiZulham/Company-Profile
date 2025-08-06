'use client'

import { useEffect } from 'react'

export default function ReservasiPage() {
  useEffect(() => {
    const whatsappNumber = '6287783333870'
    const message = 'Hallo kami dengan Aleena Trans, ada yang bisa saya bantu untuk kebutuhan kendaraannya?'
    const encodedMessage = encodeURIComponent(message)

    window.location.href = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`
  }, [])

  return (
    <div className="flex justify-center items-center h-screen text-center">
      <p className="text-gray-600 text-lg">Mengalihkan ke WhatsApp...</p>
    </div>
  )
}
