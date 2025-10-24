import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const language = searchParams.get('language') || '';
  const since = searchParams.get('since') || 'daily';
  
  try {
    const now = new Date();
    let dateFrom: Date;
    
    switch (since) {
      case 'weekly':
        dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'monthly':
        dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'daily':
      default:
        dateFrom = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
    }
    
    const dateString = dateFrom.toISOString().split('T')[0];
    
    let query = `created:>${dateString}`;
    if (language) {
      query += ` language:${language}`;
    }
    query += ' sort:stars';
    
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=25`;
    
    
    const response = await fetch(url, {
      next: { revalidate: 300 },
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'DevFeed-App',
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    const items = (data.items || []).map((repo: any) => ({
      id: repo.id.toString(),
      name: repo.name,
      author: repo.owner?.login || '',
      url: repo.html_url,
      description: repo.description || 'No description provided',
      language: repo.language || '',
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0
    }));
    
    
    return NextResponse.json({ items });
    
  } catch (error) {
    console.error('GitHub API error:', error);
    
    return NextResponse.json({
      items: [
        {
          id: '1',
          name: 'react',
          author: 'facebook',
          url: 'https://github.com/facebook/react',
          description: 'The library for web and native user interfaces',
          language: 'JavaScript',
          stars: 228000,
          forks: 46700
        },
        {
          id: '2',
          name: 'next.js',
          author: 'vercel',
          url: 'https://github.com/vercel/next.js',
          description: 'The React Framework',
          language: 'JavaScript',
          stars: 125000,
          forks: 26800
        },
        {
          id: '3',
          name: 'typescript',
          author: 'microsoft',
          url: 'https://github.com/microsoft/TypeScript',
          description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output',
          language: 'TypeScript',
          stars: 100000,
          forks: 12300
        },
        {
          id: '4',
          name: 'vscode',
          author: 'microsoft',
          url: 'https://github.com/microsoft/vscode',
          description: 'Visual Studio Code',
          language: 'TypeScript',
          stars: 163000,
          forks: 28800
        },
        {
          id: '5',
          name: 'deno',
          author: 'denoland',
          url: 'https://github.com/denoland/deno',
          description: 'A modern runtime for JavaScript and TypeScript',
          language: 'Rust',
          stars: 94500,
          forks: 5200
        }
      ]
    });
  }
}
