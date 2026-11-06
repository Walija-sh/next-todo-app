import { cookies } from "next/headers";
import { getUserSession } from "../../../lib/auth";
import connectDb from "../../../lib/connectDb";
import Session from "../../../models/session.model";

export async function POST() {
  await connectDb();
  const cookieStore = await cookies();
  const sessionId = await getUserSession();
  cookieStore.delete("sid");
  await Session.findByIdAndDelete(sessionId);
  return new Response(null, { status: 204 });
}
