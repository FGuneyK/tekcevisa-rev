import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TEKCE Data — Immigration & Citizenship Intelligence",
  description:
    "Comprehensive statistics, data visualizations, and analytics for global immigration, residency, and citizenship programs.",
};

export default function DataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
