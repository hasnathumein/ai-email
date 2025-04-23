// app/page.tsx
"use client";
import dynamic from 'next/dynamic';

const EmailForm = dynamic(() => import('@/components/EmailForm'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <EmailForm />
    </main>
  );
}
