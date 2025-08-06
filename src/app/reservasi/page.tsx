'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function ReservasiPage() {
  useEffect(() => {
    window.location.href = 'https://api.whatsapp.com/send?phone=6287783333870&text=Hallo%20kami%20dengan%20Aleena%20trans%20ada%20yang%20bisa%20saya%20bantu%20untuk%20kebutuhan%20kendaraannya';
  }, []);

  return (
    <div className="flex justify-center items-center h-screen text-center">
      <p className="text-gray-600 text-lg">Mengalihkan ke WhatsApp...</p>
    </div>
  );
}
