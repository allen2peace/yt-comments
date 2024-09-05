import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  const apiUrl = `https://yt-comments-434608.ue.r.appspot.com/api/commentsFile?url=${encodeURIComponent(url)}`;

  try {
    console.log("apiUrl== ", apiUrl);
    const response = await fetch(apiUrl);
    console.log("response== ", response);
    const data = await response.json();
    console.log("data== ", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}