'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface ExportData {
  url: string;
  comment_count: number;
  thumb: string;
}

export default function ExportPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [exportData, setExportData] = useState<ExportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const url = searchParams.get('url');

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

  const handleSaveAs = () => {
    if (exportData?.url) {
      const link = document.createElement('a');
      link.href = exportData.url;
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

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
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
          <div className='flex items-center mb-4 mb-40'>
            <p className='text-xl'>Comments: {exportData.comment_count}</p>
            <Image
              src='/youtube.svg'
              alt='YouTube 缩略图'
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
          </div>
        </>
      ) : (
        <p>No preview available</p>
      )}
    </div>
  );
}
