"use server";

import getAuthUser from "@/lib/getAuthUser";
import NavbarClient from "@/components/navbarClient";

export default async function NavbarServer() {
  const isLoggedIn = await getAuthUser();
  return <NavbarClient isLoggedIn={isLoggedIn} />;
}
