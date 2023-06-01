import ShoppingList from "@/components/ShoppingList";
import ShoppingSidebarControls from "@/components/ShoppingSidebarControls";
import SearchOutlinedIcon from "@/components/SearchOutlinedIcon";
import { prisma } from "../lib/prisma";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function getData() {
  try {
    const session: any = await getServerSession(nextAuthOptions);
    if (!session) {
      return null;
    }

    const categories = await prisma.category.findMany({
      where: {
        userId: session.userId,
      },
      select: {
        id: true,
        name: true,
        ShoppingItems: true,
      },
    });

    return categories;
  } catch (error) {
    console.log("Failed to fetch data", error);
  }
}

export default async function ItemsPage() {
  const data: any = await getData();
  if (!data) {
    return redirect("/login");
  }

  const renderShoppingList = () => {
    return data?.map((category) => {
      return (
        <ShoppingList
          key={category.id}
          title={category.name}
          items={category.ShoppingItems || []}
        />
      );
    });
  };
  return (
    <section className="h-screen flex w-full">
      <section className="px-[80px] overflow-y-auto pt-[38px] basis-[75%]">
        <header className="w-full flex items-start">
          <h4 className="text-2xl font-medium">
            <span className="text-primary-theme-color">Shoppingify</span> allows
            you take your shopping list wherever you go
          </h4>
          <div className="basis-[40%] rounded-xl bg-white">
            <SearchOutlinedIcon styleClasses={"ml-5 text-lg"} />
            <input
              className="outline-none text-sm p-4 placeholder-[#BDBDBD] placeholder:text-sm"
              type="text"
              name=""
              id=""
              placeholder="search item"
            />
          </div>
        </header>
        {renderShoppingList()}
      </section>
      <ShoppingSidebarControls />
    </section>
  );
}
