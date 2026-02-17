// app/api/image-proxy/route.ts (enhanced version)
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const imageUrl = request.nextUrl.searchParams.get('url');
    
    if (!imageUrl) {
        return NextResponse.json(
            { error: 'URL parameter required' },
            { status: 400 }
        );
    }

    const decodedUrl = decodeURIComponent(imageUrl);
    
    // Try to fetch with retries (Pollinations might need time to generate)
    const maxRetries = 3;
    let lastError = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(decodedUrl, {
                headers: {
                    'Authorization': `Bearer ${process.env.POLLINATIONS_API_KEY}`,
                },
                // Wait longer on each retry
                signal: AbortSignal.timeout(attempt * 5000) // 5s, 10s, 15s
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const imageBuffer = await response.arrayBuffer();
            const contentType = response.headers.get('content-type') || 'image/jpeg';
            
            return new NextResponse(imageBuffer, {
                headers: {
                    'Content-Type': contentType,
                    'Cache-Control': 'public, max-age=3600',
                },
            });
            
        } catch (error) {
            lastError = error;
            console.log(`Attempt ${attempt} failed:`, error);
            
            // Wait before retrying (exponential backoff)
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
    }
    
    // All retries failed
    console.error('All proxy attempts failed:', lastError);
    
    // Return a placeholder or error image
    return new NextResponse(
        '<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="512" height="512" fill="#f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#666" font-family="system-ui">Image generation failed</text></svg>',
        {
            status: 200,
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'no-cache',
            },
        }
    );
}