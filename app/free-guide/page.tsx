import type { Metadata } from 'next';
import GuideClient from './GuideClient';

export const metadata: Metadata = {
  title: "Free AI Guide for Business Owners | Voice of Cash",
  description: "Download the free Voice of Cash AI guide. 8 chapters on deploying AI agents in your business plus 32 ROI use cases most businesses have never tried.",
  robots: "index, follow",
};

export default function FreeGuidePage() {
  return <GuideClient />;
}
