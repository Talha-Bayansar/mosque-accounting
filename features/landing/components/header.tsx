import { Calculator } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Calculator className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Mosque Accounting
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
