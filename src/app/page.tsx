import Image from "next/image";
import { ModeToggle } from "./components/ModeToggle";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ModeToggle />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Image
          aria-hidden
          src="https://nextjs.org/icons/file.svg"
          alt="File icon"
          width={16}
          height={16}
        />
        Done by Groupe 16, Hetic.
      </footer>
    </div>
  );
}
