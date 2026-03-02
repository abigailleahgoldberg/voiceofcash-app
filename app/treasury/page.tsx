import type { Metadata } from "next";
import TreasuryClient from "./TreasuryClient";

export const metadata: Metadata = {
  title: "Treasury, The Voice of Cash",
  description: "Internal financial dashboard.",
  robots: { index: false, follow: false },
};

export default function TreasuryPage() {
  return <TreasuryClient />;
}
