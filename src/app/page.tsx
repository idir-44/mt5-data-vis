"use client";

import { Input } from "@/components/ui/input";
import { ModeToggle } from "./components/ModeToggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";

const Map = dynamic(() => import("./components/Map"), { ssr: false });
const Graph = dynamic(() => import("./components/Graph"), { ssr: false });

export default function Home() {
  const [view, setView] = useState("map");
  const router = useRouter();

  const handlePopulationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const populationMax = e.target.value;

    const queryParams = new URLSearchParams();
    if (populationMax) {
      queryParams.set("lte", populationMax);
    } else {
      queryParams.delete("lte");
    }
    router.push(`/?${queryParams.toString()}`);  // Update the URL with the query parameter
  };

  return (
    <div className="flex grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen w-full p-0 gap-16 font-[family-name:var(--font-geist-sans)] bg-gray-50 dark:bg-gray-900">
      <header className="w-full flex justify-between items-center py-4 px-8 bg-white dark:bg-gray-800 shadow-md">
        <Link href="/" className="text-2xl font-bold text-gray-700 dark:text-white">
          Catastrophes Naturelles
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="text-gray-700 dark:text-white font-medium px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            Menu
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Navigation</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setView("graph")}>Graphe</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setView("map")}>Carte</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ModeToggle />
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-end sm:items-end w-full p-4">
        <div className="flex flex-col sm:flex-row justify-end items-end gap-4 w-full">
          <Input
            className="flex-grow sm:flex-none w-full sm:w-40 h-10 p-2 text-sm border rounded-md"
            type="number"
            placeholder="Population max"
            onChange={handlePopulationChange}
          />
          <Select>
            <SelectTrigger className="flex-grow sm:flex-none w-full sm:w-[180px] h-10">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wildfire">Wildfire</SelectItem>
              <SelectItem value="sea-and-lake-ice">Sea and Lake Ice</SelectItem>
              <SelectItem value="severeStorms">Severe Storms</SelectItem>
              <SelectItem value="volcanoes">Volcanoes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-center w-full">
          <h1 className="text-4xl font-bold text-gray-400 dark:text-white">
            Bienvenue sur notre plateforme
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Explorez les données sur les catastrophes naturelles dans le monde, visualisez les
            tendances et informez-vous sur les événements récents.
          </p>
        </div>

        {view === "map" && <Map />}
        {view === "graph" && <Graph />}
      </main>


      <footer className="w-full bg-white dark:bg-gray-800 py-6 px-8 mt-16 shadow-md">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400">© 2024 Groupe 16, Hetic. Tous droits réservés.</p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-white hover:underline">
              LinkedIn
            </a>
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-white hover:underline">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
