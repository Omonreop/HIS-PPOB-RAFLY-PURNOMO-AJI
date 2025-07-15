import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import Image from "next/image";
import { NAV_ITEMS } from "../LandingPageLayout.constants";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";

const LandingPageLayoutNavbar = () => {
  const router = useRouter();

  return (
    <Navbar maxWidth="lg" isBordered isBlurred={false} shouldHideOnScroll>
      {/* Kiri: Logo */}
      <NavbarBrand
        as={Link}
        href="/"
        className="flex gap-2 items-center justify-start"
      >
        <Image
          src="/images/general/Logo.png"
          alt="logo"
          width={32}
          height={32}
          className="cursor-pointer"
        />
        <p className="text-black font-semibold">SIMS PPOB</p>
      </NavbarBrand>

      {/* Kanan: Navigasi */}
      <NavbarContent justify="end" className="gap-6">
        {NAV_ITEMS.map((item) => (
          <NavbarItem
            key={`nav-${item.label}`}
            as={Link}
            href={item.href}
            className={cn(
              "font-medium text-default-700 hover:text-danger-500",
              {
                "font-bold text-danger-500": router.pathname === item.href,
              }
            )}
          >
            {item.label}
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
