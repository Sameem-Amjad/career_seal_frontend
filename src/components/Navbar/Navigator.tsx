'use client';
import { usePathname } from "next/navigation";
import Link from "next/link";

const isActive = (pathname: string, targetPath: string): boolean => {
  const jobRoutes = [
    "/upload-resume",
    "/saved",
    "/history",
    "/profile"
  ];

  if (targetPath === "/upload-resume") {
    return jobRoutes.some(route => pathname.startsWith(route));
  }

  return pathname === targetPath;
};

interface NavButtonProps {
  href: string;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ href, label }) => {
  const pathname = usePathname();
  const active = isActive(pathname, href);

  return (
    <li className="">
      <Link href={href}>
        <p
          className={`${
            active ? "bg-white rounded-full" : "font-medium hover:underline"
          }  px-2 py-1 text-black `}
        >
          {label}
        </p>
      </Link>
    </li>
  );
};

const Navigator: React.FC = () => {
  return (
    <ul className="hidden lg:flex flex-1 space-x-4 justify-center">
      <NavButton href="/" label="Home" />
      <NavButton href="/pricing" label="Pricing" />
      <NavButton href="/app/upload-resume" label="Jobs" />
      <NavButton href="/terms" label="Terms" />
      <NavButton href="/housing-support" label="HomeEase" />
      <NavButton href="/contact" label="Contact" />
    </ul>
  );
};

export default Navigator;