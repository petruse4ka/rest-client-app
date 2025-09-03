'use client';

import '@ant-design/v5-patch-for-react-19';
import { RocketOutlined } from '@ant-design/icons';

export default function Home() {
  return (
    <div className="font-inter flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 p-8 dark:from-zinc-900 dark:to-zinc-800">
      <main className="mx-auto max-w-2xl text-center">
        <div className="mb-8">
          <RocketOutlined style={{ fontSize: '4rem', color: '#d97706' }} className="mb-4" />
        </div>
        <h1 className="mb-6 text-4xl leading-relaxed font-bold text-zinc-800 md:text-6xl dark:text-zinc-100">
          Something Great is Coming
        </h1>
        <p className="mb-8 text-xl text-zinc-600 dark:text-zinc-300">
          We are building an amazing REST client application that will revolutionize how you test
          and interact with APIs.
        </p>
      </main>
    </div>
  );
}
