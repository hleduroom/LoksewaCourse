import Link from "next/link";

import { Menu, Search } from "lucide-react";

import Container from "@/components/global/container";
import ModeSwitcher from "@/components/global/mode-switcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { getSessions } from "@/actions/sessions";

import LoginButton from "../global/login-button";
import SignupButton from "../global/signup-button";
import MobileExploreMenu from "./MobileExploreMenu";
import Leftnav from "./left-nav";
import MobileProfileMenu from "./profileauthmobile";
import Rightnav from "./rightnav";
import { getServices } from "@/modules/admin/services/action";

const SiteHeader = async () => {
  const services = await getServices()
  const session = await getSessions();
  const username = session?.user.name;
  const email = session?.user.email;
  const role = session?.user.role;
  const userInitials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="border-grid bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b p-2 shadow backdrop-blur dark:bg-gray-900">
      <Container className="flex h-14 items-center justify-between px-4 md:px-6">
        {/* mobile screen*/}
        <div className="flex items-center bg-gray-900 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="h-6 w-6 text-black dark:text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="flex flex-col gap-4">
                {!session?.user ? (
                  <div className="flex flex-col gap-4 px-4">
                    <LoginButton />
                    <SignupButton />
                  </div>
                ) : (
                  <MobileProfileMenu
                    userInitials={userInitials}
                    userName={username}
                    email={email}
                  />
                )}

                <div className="block md:hidden">
                  <MobileExploreMenu services={services} />
                </div>

                {/* {session?.user && <Rightnav userInitials={userInitials} />} */}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 justify-center md:hidden">
          <Link
            href="/"
            className="text-xl font-bold text-black dark:text-white"
          >
            Loksewa
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 md:hidden">
          <button>
            <Search className="h-5 w-5 text-black dark:text-white" />
          </button>
          <Link href="/cart" className="text-xl">
            🛒
          </Link>
        </div>

        {/* DESKTOP Nav */}
        <div className="ml-6 hidden w-full items-center gap-8 md:flex">
          <Leftnav services={services} />
          <div className="ml-auto flex items-center gap-6">
            {!session?.user ? (
              <>
                <LoginButton />
                <SignupButton />
              </>
            ) : (
              <Rightnav userInitials={userInitials} role={role} />
            )}

            <Link href="/cart" className="text-xl">
              🛒
            </Link>
            <ModeSwitcher />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default SiteHeader;
