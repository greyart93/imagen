import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session) {
        return NextResponse.json({error: "You are Unauthorized", }, 
            { status: 401}
        )
    }
    const { prompt } = await request.json();

    const user = await prisma.user.findUnique(
        {where: {
            id: session.user.id,
        }
        
        }
    )
    if(!user) {
        return NextResponse.json({error: "No user found"}, {status: 401})
    }

    function generateRandomNumber(): number {
        return Math.floor(Math.random() * 1000000) + 1
    }

    const randomSeed = generateRandomNumber()
    const imageURL = `https://gen.pollinations.ai/image/${encodeURIComponent(
        prompt 
    )}?model=flux&seed=${randomSeed}&width=512&height=512&nologo=True`;

    await fetch(imageURL, {
        headers: {
            Authorization: `Bearer ${process.env.POLLINATIONS_API_KEY}`
        }
    })
    
    await prisma.post.create({
        data:{
            prompt: prompt,
            url: imageURL,
            userId: user.id,
            seed: randomSeed
        }
    })
    const proxiedUrl = `/api/image-proxy?url=${encodeURIComponent(imageURL)}`;
    return NextResponse.json({ url: proxiedUrl})
}

export async function GET() {
    const session = await getServerSession(authOptions)
    if(!session) {
        return NextResponse.json({error: "You are Unauthorized", }, 
            { status: 401}
        )
    }

    const user = await prisma.user.findUnique(
        {where: {
            id: session.user.id,
        }
        
        }
    )
    if(!user) {
        return NextResponse.json({error: "No user found"}, {status: 401})
    }

    const posts = await prisma.post.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return NextResponse.json(posts)
}
