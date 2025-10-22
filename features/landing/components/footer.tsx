import { Separator } from "@/components/ui/separator";
import { Calculator } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Calculator className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for mosques to manage finances with transparency and
            accountability.
          </p>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>© 2024 Mosque Accounting</span>
          <Separator orientation="vertical" className="h-4" />
          <span>PWA Ready</span>
        </div>
      </div>
    </footer>
  );
}
