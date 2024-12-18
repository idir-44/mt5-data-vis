import Image from "next/image";
import { ModeToggle } from "./components/ModeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import dynamic from "next/dynamic";
const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  return (
    <div className="flex grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen w-full p-0 gap-16 font-[family-name:var(--font-geist-sans)] bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="w-full flex justify-between items-center py-4 px-8 bg-white dark:bg-gray-800 shadow-md">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-700 dark:text-white">
          Catastrophes Naturelles
        </Link>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="text-gray-700 dark:text-white font-medium px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            Menu
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Navigation</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/about">À propos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/data">Données</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/map">Carte</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mode Toggle */}
        <ModeToggle />
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-700 dark:text-white">
                Documentation
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <Link href="/docs">Voir la documentation</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Example Content */}
        <div className="text-center w-full">
          <h1 className="text-4xl font-bold text-gray-700 dark:text-white">
            Bienvenue sur notre plateforme
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Explorez les données sur les catastrophes naturelles dans le monde, visualisez les
            tendances et informez-vous sur les événements récents.
          </p>
        </div>
      </main>
      <Map />

      {/* Footer */}
      <footer className="w-full bg-white dark:bg-gray-800 py-6 px-8 mt-16 shadow-md">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400">
            © 2024 Groupe 16, Hetic. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-white hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://www.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-white hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
