import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Choose your AI provider by setting environment variable
// Options: 'openai', 'groq', 'anthropic', 'gemini', 'together'
const AI_PROVIDER = process.env.AI_PROVIDER || 'groq';

// Initialize OpenAI if available
let openaiClient: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  try {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  } catch (error) {
    console.error('Failed to initialize OpenAI:', error);
  }
}

// Helper function to call AI API based on provider
async function callAIProvider(contentToSummarize: string) {
  const provider = AI_PROVIDER.toLowerCase();

  switch (provider) {
    case 'groq':
      // Groq API - Very fast and free tier available
      return await callGroq(contentToSummarize);
    
    case 'openai':
      // OpenAI - Original implementation
      return await callOpenAI(contentToSummarize);
    
    case 'anthropic':
      // Anthropic Claude
      return await callAnthropic(contentToSummarize);
    
    case 'gemini':
      // Google Gemini
      return await callGemini(contentToSummarize);
    
    case 'together':
      // Together AI
      return await callTogetherAI(contentToSummarize);
    
    default:
      return await callGroq(contentToSummarize);
  }
}

// Groq API - Fast and free tier available
async function callGroq(contentToSummarize: string) {
  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GROQ_API_KEY or OPENAI_API_KEY environment variable is required');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: 'You are a tech news curator. For each of the 3 summary lines, return a JSON object with "summary", "source", "url", and "sourceTitle" fields. Each summary should be concise and informative. Source should be either "GitHub" or "Dev.to". Include the URL and sourceTitle (name of repo/article) from the source you are referencing.'
        },
        {
          role: 'user',
          content: contentToSummarize
        }
      ],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Groq API error:', errorText);
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'Unable to generate summary at this time.';
}

// OpenAI API
async function callOpenAI(contentToSummarize: string) {
  if (!openaiClient) {
    throw new Error('OpenAI client not initialized. Please set OPENAI_API_KEY environment variable.');
  }

  const completion = await openaiClient.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a tech news curator. For each of the 3 summary lines, return a JSON object with "summary" and "source" fields. Each summary should be concise and informative. Source should be either "GitHub" or "Dev.to".'
      },
      {
        role: 'user',
        content: contentToSummarize
      }
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  return completion.choices[0]?.message?.content || 'Unable to generate summary at this time.';
}

// Anthropic Claude API
async function callAnthropic(contentToSummarize: string) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2024-06-20',
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 300,
      system: 'You are a tech news curator. For each of the 3 summary lines, return a JSON object with "summary", "source", "url", and "sourceTitle" fields. Each summary should be concise and informative. Source should be either "GitHub" or "Dev.to". Include the URL and sourceTitle (name of repo/article) from the source you are referencing.',
      messages: [
        {
          role: 'user',
          content: contentToSummarize
        }
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Anthropic API error:', errorText);
    throw new Error(`Anthropic API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content[0]?.text || 'Unable to generate summary at this time.';
}

// Google Gemini API
async function callGemini(contentToSummarize: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is required');
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are a tech news curator. For each of the 3 summary lines, return a JSON object with "summary", "source", "url", and "sourceTitle" fields. Each summary should be concise and informative. Source should be either "GitHub" or "Dev.to". Include the URL and sourceTitle (name of repo/article) from the source you are referencing.\n\n${contentToSummarize}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', errorText);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate summary at this time.';
}

// Together AI
async function callTogetherAI(contentToSummarize: string) {
  if (!process.env.TOGETHER_API_KEY) {
    throw new Error('TOGETHER_API_KEY environment variable is required');
  }

  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'meta-llama/Llama-3-8b-chat-hf',
      messages: [
        {
          role: 'system',
          content: 'You are a tech news curator. For each of the 3 summary lines, return a JSON object with "summary", "source", "url", and "sourceTitle" fields. Each summary should be concise and informative. Source should be either "GitHub" or "Dev.to". Include the URL and sourceTitle (name of repo/article) from the source you are referencing.'
        },
        {
          role: 'user',
          content: contentToSummarize
        }
      ],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Together AI error:', errorText);
    throw new Error(`Together AI error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'Unable to generate summary at this time.';
}

// Helper function to add delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Force dynamic rendering since we use request headers
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // Wait 2 seconds before fetching to prevent immediate changes
    await delay(2000);
    
    // Get the base URL from the request
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const host = req.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    
    // Fetch data from GitHub and Dev.to APIs
    const [githubRes, devtoRes] = await Promise.all([
      fetch(`${baseUrl}/api/github`).then(r => r.json()),
      fetch(`${baseUrl}/api/devto`).then(r => r.json())
    ]);

    const githubItems = githubRes.items?.slice(0, 8) || [];
    const devtoItems = devtoRes.items?.slice(0, 8) || [];

    // Format content for AI with URLs
    const githubContent = githubItems.map((item: any) => 
      `- ${item.name} by ${item.author}: ${item.description} (${item.stars} stars) - ${item.url}`
    ).join('\n');

    const devtoContent = devtoItems.map((item: any) => 
      `- ${item.title}: ${item.description} - ${item.url}`
    ).join('\n');

    const contentToSummarize = `# Today's Top Tech News

## Top GitHub Repositories:
${githubContent}

## Top Dev.to Articles:
${devtoContent}

Please provide exactly 3 lines summarizing the most important tech developments from the above content. Focus on what developers should know today.

For EACH line, return a JSON object in this format:
{"summary": "Brief title or description of the tech development", "source": "GitHub" or "Dev.to", "url": "https://...", "sourceTitle": "Name of repo/article"}

Important: 
- Return exactly 3 separate JSON objects, one per line
- Each line should cover a different important tech development
- Include the URL from the source you're referencing (GitHub repo URL or Dev.to article URL)
- Include the sourceTitle with the actual name of the repository or article`;

    let summaryText = await callAIProvider(contentToSummarize);
    
    // Try to parse JSON response and convert to line format
    try {
      // Remove markdown code blocks if present
      let cleanedResponse = summaryText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      // Try to extract JSON objects from the response
      const jsonMatches = cleanedResponse.match(/\{[^}]+\}/g);
      
      if (jsonMatches && jsonMatches.length > 0) {
        // Parse each JSON object and convert to line format with URL
        const lines = jsonMatches.map((jsonStr: string, index: number) => {
          try {
            const parsed = JSON.parse(jsonStr);
            const source = parsed.source || 'Dev.to';
            const summary = parsed.summary || 'Tech development';
            const url = parsed.url || '';
            const sourceTitle = source === 'GitHub' ? 'github' : 'dev-to';
            return `${index + 1}. ${summary} (${source}) [URL:${url}] [TITLE:${sourceTitle}]`;
          } catch (e) {
            return `${index + 1}. ${jsonStr}`;
          }
        });
        
        summaryText = lines.join('\n');
      } else {
        // Try to parse as a single JSON or array
        const parsed = JSON.parse(cleanedResponse);
        
        if (Array.isArray(parsed)) {
          // Array of JSON objects
          const lines = parsed.map((item: any, index: number) => {
            const source = item.source || 'Dev.to';
            const summary = item.summary || 'Tech development';
            const url = item.url || '';
            const sourceTitle = source === 'GitHub' ? 'github' : 'dev-to';
            return `${index + 1}. ${summary} (${source}) [URL:${url}] [TITLE:${sourceTitle}]`;
          });
          summaryText = lines.join('\n');
        } else if (parsed.summary) {
          // Single JSON object
          summaryText = parsed.summary;
        }
      }
    } catch (e) {
      // If parsing fails, use the original text
      console.log('AI returned plain text format, using as is');
    }

    return NextResponse.json({
      summary: summaryText,
      githubItems,
      devtoItems,
      timestamp: new Date().toISOString(),
      provider: AI_PROVIDER
    });
  } catch (error: any) {
    console.error('AI API error:', error);
    
    // Fallback to mock data if API fails
    return NextResponse.json({
      summary: `1. New AI-powered development tools (GitHub) [URL:https://github.com] [TITLE:github]\n2. Latest developer productivity trends (Dev.to) [URL:https://dev.to] [TITLE:dev-to]\n3. Trending open source innovations (GitHub) [URL:https://github.com] [TITLE:github]`,
      githubItems: [],
      devtoItems: [],
      timestamp: new Date().toISOString(),
      error: 'Using fallback summary due to API error',
      provider: AI_PROVIDER
    });
  }
}

