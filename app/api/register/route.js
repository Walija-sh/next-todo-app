import connectDb from "../../../lib/connectDb";
import User from "../../../models/user.model";
import bcrypt from "bcrypt";

export async function POST(request) {
    await connectDb();
    const user= await request.json();
    const {email,password,name}=user;
    if(!email || !password || !name){
        return Response.json({error:"All fields are required"},{status:400})
    }
    try {
        const hashedPassword=await bcrypt.hash(password,10);
        await User.create({...user,password:hashedPassword});

    return Response.json({name,email},{status:201})
    } catch (error) {
        console.log(error);
        if(error.code === 11000){
            return Response.json({error:"Email already exists"},{status:409})
        }else{
            return Response.json({error:"Something went wrong"},{status:500})
        }
        
    }
    
}