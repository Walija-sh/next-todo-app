// import todosData from "../../todos.json"
// import {  readFile, writeFile } from "fs/promises";
import path from "path";
import connectDb from '../../../lib/connectDb';
import Todo from "../../../models/todo.model";
import User from '../../../models/user.model'
import {cookies} from 'next/headers'
import { getLoggedInUser } from "../../../lib/auth";


const filePath = path.join(process.cwd(), "todos.json");

export async function GET(){
    
await connectDb();
const user=await getLoggedInUser();
// agar intance of res ha to mtlb errorres from protected function
if(user instanceof Response) return user;
    const todos=await Todo.find({userId:user.id}).select("-__v");
    
    // return new Response(JSON.stringify(todos),{
    //     headers:{
    //         "Content-type": "application/json",
    //         "Set-Cookie":"userId=123456; path=/; httpOnly"  
    //     },
    //     status:200,
    //     statusText:"OK kaam ho gya"
    // })
    return Response.json(todos)
}

export async function POST(request){
    await connectDb()
const user=await getLoggedInUser();
if(user instanceof Response) return user;
    const {text}=await request.json();

    const newTodo=await Todo.create({text,userId:user.id})
    return Response.json({message:"created",data:newTodo},{status:201})

    
}