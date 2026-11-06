
import connectDb from "../../../lib/connectDb";
import User from "../../../models/user.model";
import {cookies} from 'next/headers'
import { signCookie } from "../../../lib/auth";
import Session from "../../../models/session.model";
import bcrypt from "bcrypt";

export async function POST(request) {
    await connectDb();
    const {email,password}= await request.json();
    const cookieStore=await cookies();
    try {
        const user= await User.findOne({email});
         if(!user){
            return Response.json({error:"Invalid credentials"},{status:401})
        }
        const isValidPassword=await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return Response.json({error:"Invalid credentials"},{status:401})
        }
        const session= await Session.create({userId:user.id});

        cookieStore.set("sid",signCookie(session.id),{
            httpOnly:true,
            maxAge:3600
        })

    return Response.json({name:user.name,email:user.email},{status:200})
    } catch (error) {
        console.log(error);
       return Response.json({error:"Something went wrong"},{status:500})
        
    }
    
}