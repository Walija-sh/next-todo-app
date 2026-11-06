
import { getLoggedInUser } from "../../../lib/auth";
import connectDb from "../../../lib/connectDb";


export async function GET() {
    await connectDb();
   const user=await getLoggedInUser();
  if(user instanceof Response){
    return user;
  }
  return Response.json(user,{status:200})
    
}