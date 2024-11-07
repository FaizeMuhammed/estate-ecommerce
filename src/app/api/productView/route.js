import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Connect from '@/config/dbConfig'
import productModel from '@/models/products'

export async function GET(request) {
    try {
        await Connect();
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');
        const product = await productModel.findOne({ _id: new mongoose.Types.ObjectId(productId) })

        return NextResponse.json({ userId: product.seller }, { status: 200 })

    } catch (error) {
        console.log(error, 'product is not found ')
        return NextResponse.json({ message: 'user is not found' }, { status: 404 })
    }
}