// import { writeFile } from "fs/promises";
// import todosData from "../../../../todos.json";
import Todo from "../../../../models/todo.model";
import connectDb from "../../../../lib/connectDb";
import { getLoggedInUser } from "../../../../lib/auth";

export async function GET(_, {params}) {
    await connectDb()
    const user=await getLoggedInUser();
    if(user instanceof Response) return user;
  const {id}=await params;
  
  const todo=await Todo.findOne({_id:id,userId:user.id}).select("-__v");
  if(!todo){
    return Response.json({error:"Todo not found"},{status:404})
  }
  return Response.json(todo);
}

// export async function PUT(request,{params}){
//   const {id}=await params;
//   const todoUpdatedInfo= await request.json(); 
//   const todoIndex=todosData.findIndex(data=>data.id.toString()===id);
//    if(todoIndex == -1){
//     return Response.json({error:"Todo not found"},{status:404})
//   }
//   const todo=todosData[todoIndex];
//   const updatedTodo={...todo};
//   if(todoUpdatedInfo.text){
//     updatedTodo.text=todoUpdatedInfo.text;
//   }
//   if(todoUpdatedInfo.completed){
//     updatedTodo.completed=todoUpdatedInfo.completed;
//   }
//   todosData[todoIndex]=updatedTodo;

//   await writeFile('todos.json',JSON.stringify(todosData,null,2),"utf-8")
//    return Response.json({message:"TODO updated successfully",data:updatedTodo},{status:200})

  
// }
export async function PUT(request,{params}){
  await connectDb()
      const user=await getLoggedInUser();
    if(user instanceof Response) return user;
  const {id}=await params;
  const todoUpdatedInfo= await request.json(); 
  const updatedTodo={};
  if(todoUpdatedInfo.text){
    updatedTodo.text=todoUpdatedInfo.text;
  }
  if(todoUpdatedInfo.completed){
    updatedTodo.completed=todoUpdatedInfo.completed;
  }
  const newTodo= await Todo.updateOne({_id:id,userId:user.id},updatedTodo,{new:true,runValidators:true})
   return Response.json({message:"TODO updated successfully",data:newTodo},{status:200})

  
}
// export async function DELETE(_, {params}) {
//   const {id}=await params;
//   const todoIndex=todosData.findIndex(todo=>id===todo.id.toString())
//   if(todoIndex == -1){
//     return Response.json({error:"Todo not found"},{status:404})
//   }
//   todosData.splice(todoIndex,1)
//   await writeFile('todos.json',JSON.stringify(todosData,null,2),"utf-8")
//   return new Response(null,{status:204})
// }
export async function DELETE(_, {params}) {
  await connectDb()
       const user=await getLoggedInUser();
    if(user instanceof Response) return user;
  const {id}=await params;
  await Todo.deleteOne({_id:id,userId:user.id})
  return new Response(null,{status:204})
}