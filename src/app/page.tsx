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
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle } from 'lucide-react';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import { useState } from 'react';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [includeNested, setIncludeNested] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

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

    const sessionId =
      Date.now().toString(36) + Math.random().toString(36).substr(2);
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
          {/* 修改 logo 部分，添加文本 */}
          <div className="absolute top-4 left-4 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="logo"
                width={40}
                height={40}
              />
              <span className="ml-2 text-xl font-semibold text-gray-800">YouTube Comments Exporter</span>
            </Link>
          </div>

          <Card className='w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg'>
            <CardContent className='p-8 space-y-6'>
              <div className='text-center'>
                <h2 className='text-2xl font-semibold text-gray-800'>
                  Export YouTube Comments
                </h2>
                <p className='text-sm text-gray-600 mt-2'>
                  Easily exports all comments from Any Youtube Video to
                  Excel file.
                </p>
              </div>

              <div className='relative'>
                <Input
                  type='text'
                  placeholder='https://www.youtube.com/watch?v=H_Qzdzd5l_U'
                  className='w-full pl-4 pr-12 py-3 text-sm border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition duration-200'
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <button className='hidden absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-600'>
                  <PlusCircle size={24} />
                </button>
              </div>

              <div className='hidden text-xs text-blue-600 hover:underline cursor-pointer'>
                Where do I find url? (view example)
              </div>

              <div className='flex justify-between items-center hidden'>
                <div className='flex space-x-2'>
                  {[
                    'facebook',
                    'twitter',
                    'instagram',
                    'youtube',
                    'tiktok',
                    'vk',
                    'twitch',
                    'steam',
                  ].map((platform) => (
                    <img
                      key={platform}
                      src={`/${platform}-icon.svg`}
                      alt={platform}
                      className='w-6 h-6'
                    />
                  ))}
                </div>
                <span className='text-xs text-gray-600'>supported</span>
              </div>

              <div className='hidden flex items-center space-x-2'>
                <Checkbox
                  id='nestedComments'
                  checked={includeNested}
                  onCheckedChange={(checked) =>
                    setIncludeNested(checked as boolean)
                  }
                />
                <label
                  htmlFor='nestedComments'
                  className='text-sm text-gray-700'
                >
                  Include nested comments
                </label>
              </div>

              <button
                className={`w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
                  inputValue
                    ? 'bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600'
                    : 'bg-gray-300 cursor-not-allowed'
                } transition duration-200 uppercase text-sm tracking-wide`}
                disabled={!inputValue}
                onClick={handleExport}
              >
                Start Export Process
              </button>
            </CardContent>
          </Card>

          {/* <input
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
          </button> */}

          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href=''>
              Bynan Bell
            </UnderlineLink>
          </footer>
        </div>
      </section>
    </main>
  );
}
