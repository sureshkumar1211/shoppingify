import ShoppingSidebarControls from "@/components/ShoppingSidebarControls";
// import { prisma } from "../lib/prisma";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ShoppingHistory from "@/components/ShoppingHistory";

async function getData() {
  try {
    const session: any = await getServerSession(nextAuthOptions);
    if (!session) {
      return null;
    }

    return [];
  } catch (error) {
    console.log("Failed to fetch data", error);
  }
}

export default async function ShoppingHistoryPage() {
  const data: any = await getData();
  if (!data) {
    return redirect("/login");
  }

  return (
    <section className="h-screen flex w-full">
      <ShoppingHistory />
      <ShoppingSidebarControls />
    </section>
  );
}
