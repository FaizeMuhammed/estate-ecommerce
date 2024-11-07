import { NextRequest, NextResponse } from "next/server";
import membership from "../../../models/membership";
import Connect from '../../../config/dbConfig'


export async function GET() {
    await Connect();
    const data = await membership.find()
    return NextResponse.json({ cards: data }, { status: 200 })
}