import { NextRequest, NextResponse } from "next/server";

export async function POST(NextRequest) {
    try {
        const data = await NextRequest.json();
        console.log(data)
        return NextResponse.json({ data })
    } catch (error) {
        console.log(error)
    }
}