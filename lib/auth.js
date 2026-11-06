import { cookies } from "next/headers";
import User from "../models/user.model";
import { createHmac } from "crypto";
import Session from "../models/session.model";

export async function getLoggedInUser() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("sid")?.value;
  const errorRes = Response.json({ error: "Please Login" }, { status: 401 });
  if (!cookie) return errorRes;
  const sessionId = verifyCookie(cookie);
  if(!sessionId) return errorRes;
  const session=await Session.findById(sessionId);
  if(!session) return errorRes;
  const userId = session.userId;
  if (!userId) return errorRes;
  const user = await User.findById(userId).select("-password");
  if (!user) return errorRes;
  return user;
}

export function signCookie(data){
            const signature=createHmac("sha256",process.env.HASH_SECRET).update(data).digest("hex");
            const signedData=`${data}.${signature}`;
            return signedData;
}

export function verifyCookie(signedData){
    const [data,signature]=signedData.split(".");
    const expectedSignature=signCookie(data).split(".")[1];
    if(signature===expectedSignature) return data;
    return false;
}
export async function getUserSession(){
   const cookieStore = await cookies();
  const cookie = cookieStore.get("sid")?.value;
  return verifyCookie(cookie);
}