"use server";

import getAuthUser from "@/app/lib/getAuthUser";
import NavbarClient from "@/app/components/navbarClient";

export default async function NavbarServer() {
  const isLoggedIn = await getAuthUser();
  return <NavbarClient isLoggedIn={isLoggedIn} />;
}
