import { NextRequest, NextResponse } from "next/server";
import connect from '../../../config/dbConfig'
import message from '../../../models/message'
import users from '../../../models/user'
import jwt from 'jsonwebtoken'


export async function GET(NextRequest) {



    try {
        await connect()

        const { searchParams } = new URL(NextRequest.url);
        const receiver = searchParams.get('seller') || '';
        const method = searchParams.get('method')
        console.log(receiver, 'ta da da da')

        const token = NextRequest.cookies.get('token')?.value;
        console.log(token, 'this is the token')
        if (!token) {
            return NextResponse.json({ message: 'token not found' }, { status: 401 })
        }
        const secretKey = process.env.SECRET_KEY
        const verifiedatoken = jwt.verify(token, secretKey)
        const sender = verifiedatoken.id;
        console.log(sender, 'this is the sender')


        if (method === 'personalChat') {
            const findMessages = await message.find({
                $or: [
                    { sender: sender, receiver: receiver },
                    { sender: receiver, receiver: sender }
                ]
            });
            return NextResponse.json({ messages: findMessages }, { status: 200 })
        } else if (method === 'involvedChats') {
            const findMessages = await message.find({
                $or: [
                    { sender: sender },
                    { receiver: sender }
                ]
            });
            const participants = findMessages.map(msg =>
                msg.sender.toString() === sender.toString() ? msg.receiver.toString() : msg.sender.toString()
            );

            // Remove duplicates using Set
            const uniqueParticipants = [...new Set(participants)];
            const pairedUsers = await users.find({ _id: { $in: uniqueParticipants } });


            return NextResponse.json({ name: pairedUsers }, { status: 200 })
        }
    } catch (error) {
        console.log('token verification failed', error)
        return NextResponse.json({ message: 'invailid token' }, { status: 401 })
    }


}