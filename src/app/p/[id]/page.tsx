'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Download,
  ExternalLink,
  Rocket,
  Send,
  ChevronsUpDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

interface ExportData {
  url: string;
  comment_count: number;
  thumb: string;
  csvUrl: string;
}

export default function ExportPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [exportData, setExportData] = useState<ExportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const url = searchParams.get('url');
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = `/api/proxy?url=${encodeURIComponent(url || '')}`;
        console.log('apiUrl== ', apiUrl);
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('data== ', data);

        if (data.error) {
          throw new Error(data.error);
        }

        if (data && data.url) {
          setExportData(data);
        } else {
          throw new Error('Invalid data received from server');
        }
        toast.success('Export successful');
      } catch (error) {
        console.error('Export failed:', error);
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred',
        );
        toast.error('Export failed, please try again later');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url]);

  const handleSaveAsExcel = () => {
    if (exportData?.url) {
      const link = document.createElement('a');
      link.href = exportData.url;
      link.download = 'youtube_comments.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSaveAsCSV = () => {
    if (exportData?.csvUrl) {
      const link = document.createElement('a');
      link.href = exportData.csvUrl;
      link.download = 'youtube_comments.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePreviewOnline = () => {
    if (exportData?.url) {
      const previewUrlWithOfficeViewer = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(exportData.url)}`;
      window.open(previewUrlWithOfficeViewer, '_blank');
    }
  };

  const handleVisitUrl = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleExportAnother = () => {
    router.push('/');
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center relative'>
      {/* 添加logo */}
      <div className="absolute top-4 left-52 flex items-center">
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

      {isLoading ? (
        <p>Exporting...</p>
      ) : error ? (
        <div className='text-center'>
          <p className='text-red-500 mb-4'>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Try Again
          </button>
        </div>
      ) : exportData ? (
        <>
          <div className='min-h-screen bg-gradient-to-br from-white-600 to-white-400 flex items-center justify-center p-4'>
            <div className='relative w-full max-w-3xl'>
              <div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <Image
                  src='/youtube.svg'
                  alt='Card Image'
                  width={100}
                  height={100}
                  className='rounded-full'
                />
              </div>
              <Card className='w-full'>
                <CardHeader className='flex flex-row justify-between space-y-0 pb-2'>
                  <div className='flex space-x-4'>
                    <div className='text-center'>
                      <div className='text-lg font-bold'>
                        {exportData.comment_count}
                      </div>
                      <div className='text-sm text-muted-foreground'>Total</div>
                    </div>
                    <div className='text-center hidden'>
                      <div className='text-2xl font-bold'>0</div>
                      <div className='text-sm text-muted-foreground'>
                        Replies
                      </div>
                    </div>
                    <div className='text-center hidden'>
                      <div className='text-2xl font-bold'>85</div>
                      <div className='text-sm text-muted-foreground'>
                        Exported
                      </div>
                    </div>
                  </div>
                  <div className='flex space-x-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={handleVisitUrl}
                    >
                      <ExternalLink className='mr-2 h-4 w-4' />
                      VISIT URL
                    </Button>
                    <Button variant='outline' size='sm' className='hidden'>
                      <Send className='mr-2 h-4 w-4' />
                      SEND FEEDBACK
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <h2 className='text-2xl font-semibold text-center hidden'>
                    Export completed. Your file is ready for download.
                  </h2>
                  <div className='bg-gradient-to-r from-red-400 to-red-500 text-white p-4 rounded-md flex items-center justify-center space-x-2'>
                    <Rocket className='h-5 w-5' />
                    <span>
                      Export completed. Your file is ready for download.
                    </span>
                  </div>
                  <div className='flex justify-center'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className='bg-blue-500  hover:bg-blue-600 text-white text-lg min-w-[200px]  min-h-[40px]'>
                          <Download className='mr-2 h-4 w-4' />
                          Download Excel File
                          <ChevronsUpDown className='ml-2 h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='min-w-[200px]'>
                        <DropdownMenuItem
                          onClick={handleSaveAsExcel}
                          className='w-full'
                        >
                          Download Excel File
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={handlePreviewOnline}
                          className='w-full'
                        >
                          Preview Online
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={handleSaveAsCSV}
                          className='w-full'
                        >
                          Download CSV File
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className='hidden text-sm text-center text-blue-600 hover:underline cursor-pointer'>
                    Why some comments are not exported?
                  </p>
                </CardContent>
                <CardFooter className='flex flex-col space-y-4 text-sm text-muted-foreground'>
                  <p>
                    If the export time is too long, please return to this page
                    later to view the conversion result. Sometimes, if the
                    conversion server is busy, export queuing will take a while.
                  </p>
                  <p>
                    The conversion status of your export is automatically
                    updated and usually does not need to be refreshed. Of
                    course, if you are not sure, you can also manually refresh
                    the page.
                  </p>
                  <p>
                    The export will be saved for 5 days, during which time you
                    can download it. After 5 days, these files will be
                    automatically deleted and will no longer be valid.
                  </p>
                  <p>
                    We can export most international languages, including Arabic
                    and Cyrillic languages. Depending on your spreadsheet
                    software, some versions of Excel may not present the
                    characters in their correct format. Uploading the exported
                    file to Google Docs usually works!
                  </p>
                  <p className='text-center'>
                    If you can't open provided excel file, open it online using{' '}
                    <a
                      href='#'
                      onClick={(e) => {
                        e.preventDefault();
                        handlePreviewOnline();
                      }}
                      className='text-blue-600 hover:underline'
                    >
                      {' '}
                      Office Web Apps
                    </a>
                    .
                  </p>
                  <div className='flex justify-center w-full'>
                    <Button 
                      className='bg-blue-500 hover:bg-blue-600 text-white'
                      onClick={handleExportAnother}
                    >
                      EXPORT ANOTHER
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
          {/* <div className='hidden flex items-center mb-4 mb-40'>
            <p className='text-xl'>Comments: {exportData.comment_count}</p>
            <Image
              src='/youtube.svg'
              alt='YouTube thumbnail'
              width={50}
              height={50}
              className='rounded mx-4'
            />
            <button
              onClick={handleVisitUrl}
              className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600'
            >
              Visit URL
            </button>
            {/* {exportData.thumb && (
              <Image src={exportData.thumb} alt="YouTube Thumbnail" width={50} height={50} className='rounded' />
            )} */}
          {/* </div>

          <div className='hidden mb-4 p-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-md min-w-[500px]'>
            <p className='text-center'>
              Export completed. Your file is ready for download.
            </p>
          </div>
          <h1 className='text-2xl mb-4'>Export Result</h1>
          <div className='flex flex-col items-center'>
            <button
              onClick={handleSaveAs}
              className='mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Save As Excel File
            </button>
            <button
              onClick={handlePreviewOnline}
              className='mb-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
            >
              Preview Online
            </button>
          </div> */}
        </>
      ) : (
        <p>No preview available</p>
      )}
    </div>
  );
}
