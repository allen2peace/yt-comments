'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from '~/svg/Logo.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const [inputValue, setInputValue] = React.useState('');
  const router = useRouter();

  function isValidYoutubeUrl(url: string): boolean {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  }

  function handleExport(event: React.MouseEvent<HTMLButtonElement>): void {
    if (!isValidYoutubeUrl(inputValue)) {
      toast.error('Please input a correct YouTube URL');
      return;
    }

    const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const searchParams = new URLSearchParams({ url: inputValue });
    router.push(`/p/${sessionId}?${searchParams.toString()}`);
  }

  return (
    <main>
      <Head>
        <title>YouTube Comments Export</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='https://www.youtube.com/watch?v=H_Qzdzd5l_U'
            className='w-full max-w-md mb-4 p-2 border border-gray-300 rounded'
          />

          <button
            className='w-full max-w-md p-2 bg-red-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={!inputValue}
            onClick={handleExport}
          >
            Start Export
          </button>

          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
              Theodorus Clarence
            </UnderlineLink>
          </footer>
        </div>
      </section>
    </main>
  );
}
