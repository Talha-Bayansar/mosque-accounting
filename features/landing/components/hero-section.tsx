import { Button } from "@/components/ui/button";
import { Calculator, Shield, Users } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="space-y-6 px-4 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2 rounded-full border bg-muted px-4 py-2 text-sm">
          <Shield className="h-4 w-4" />
          <span>Transparent & Accountable</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Mosque Financial
          <span className="block text-primary">Management</span>
        </h1>
        <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          A comprehensive PWA designed for mosques to manage financial
          activities with transparency, accountability, and ease of use. Track
          expenses, approve requests, and maintain complete audit trails.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/sign-in">
              <Calculator className="mr-2 h-5 w-5" />
              Enter App
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            <Users className="mr-2 h-5 w-5" />
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
