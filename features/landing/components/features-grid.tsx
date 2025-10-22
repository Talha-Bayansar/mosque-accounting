import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  FileText,
  CheckCircle,
  HandCoins,
  History,
  Receipt,
} from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Balance Tracking",
    description:
      "Real-time financial overview with current balance, income, and expense tracking.",
    badge: "Core",
  },
  {
    icon: FileText,
    title: "Expense Requests",
    description:
      "Members can submit expense requests with descriptions and receipt attachments.",
    badge: "Member",
  },
  {
    icon: CheckCircle,
    title: "Admin Approval",
    description:
      "Transparent approval/denial workflow with complete audit trail for accountability.",
    badge: "Admin",
  },
  {
    icon: HandCoins,
    title: "Cash Disbursements",
    description:
      "Log manual cash handovers with digital receipts and transaction records.",
    badge: "Core",
  },
  {
    icon: History,
    title: "Audit Trail",
    description:
      "Complete transaction history with timestamps and approval records.",
    badge: "Security",
  },
  {
    icon: Receipt,
    title: "Receipt Management",
    description:
      "Attach, view, and manage receipts for all financial transactions.",
    badge: "Document",
  },
];

export function FeaturesGrid() {
  return (
    <section className="container mx-auto px-4 py-8 space-y-6 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Key Features
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Everything you need to manage mosque finances with transparency and
          accountability.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Icon className="h-8 w-8 text-primary" />
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
