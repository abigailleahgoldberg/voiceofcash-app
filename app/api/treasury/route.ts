import { NextResponse } from 'next/server';

const BANKR_API_KEY = process.env.BANKR_API_KEY || 'bk_TMHTNVCCD8SWQK5U7CEYRMDABDZ6X85U';
const BANKR_API = 'https://api.bankr.bot';

interface CacheEntry {
  data: any;
  timestamp: number;
}

let cache: CacheEntry | null = null;
const CACHE_TTL = 120_000; // 2 minutes

async function pollJob(jobId: string): Promise<any> {
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const res = await fetch(`${BANKR_API}/agent/job/${jobId}`, {
      headers: { 'X-API-Key': BANKR_API_KEY },
    });
    const data = await res.json();
    if (data.status === 'completed') return data;
    if (data.status === 'failed' || data.status === 'cancelled') throw new Error(data.response || 'Job failed');
  }
  throw new Error('Timeout waiting for Bankr response');
}

async function fetchBankrPortfolio() {
  // Submit prompt
  const submitRes = await fetch(`${BANKR_API}/agent/prompt`, {
    method: 'POST',
    headers: {
      'X-API-Key': BANKR_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: 'Show my complete portfolio with all balances across all chains' }),
  });
  const submitData = await submitRes.json();
  if (!submitData.jobId) throw new Error('Failed to submit Bankr prompt');

  // Poll until complete
  const result = await pollJob(submitData.jobId);
  
  // Parse the response text into structured data
  const lines = (result.response || '').split('\n').filter((l: string) => l.trim());
  const holdings: any[] = [];
  let totalValue = 0;

  for (const line of lines) {
    // Match: "Token Name - amount ($value)" or "Total Portfolio Value: $X"
    const totalMatch = line.match(/Total Portfolio Value:\s*\$?([\d,.]+)/i);
    if (totalMatch) {
      totalValue = parseFloat(totalMatch[1].replace(/,/g, ''));
      continue;
    }
    
    const tokenMatch = line.match(/^(.+?)\s*-\s*([\d,.]+)\s*\(\$([\d,.]+)\)/);
    if (tokenMatch) {
      holdings.push({
        name: tokenMatch[1].trim(),
        amount: parseFloat(tokenMatch[2].replace(/,/g, '')),
        usdValue: parseFloat(tokenMatch[3].replace(/,/g, '')),
      });
    }
  }

  return {
    holdings,
    totalValue,
    raw: result.response,
    fetchedAt: new Date().toISOString(),
  };
}

export async function GET() {
  try {
    // Return cache if fresh
    if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
      return NextResponse.json({ ...cache.data, cached: true });
    }

    const data = await fetchBankrPortfolio();
    cache = { data, timestamp: Date.now() };
    return NextResponse.json({ ...data, cached: false });
  } catch (error: any) {
    // Return stale cache on error
    if (cache) {
      return NextResponse.json({ ...cache.data, cached: true, stale: true });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
