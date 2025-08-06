"use server";

import { cookies } from "next/headers.js";
import { decrypt } from "./sessions.js";

            
export default async function getAuthUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (session) {
    const user = await decrypt(session);
    console.log("User from session:", user);
    return user;
  }
}

