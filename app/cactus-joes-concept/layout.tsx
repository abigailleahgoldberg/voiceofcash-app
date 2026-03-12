import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cactus Joe's — Homepage Concept",
  description: "Homepage concept for Cactus Joe's Blue Diamond Nursery.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
