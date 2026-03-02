import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import VoccordGate from './VoccordGate';
import VoccordClient from './VoccordClient';

export const metadata: Metadata = {
  title: 'Voccord, Internal Briefing',
  description: 'Confidential executive report and interactive presentation.',
  robots: 'noindex, nofollow',
};

export default async function VoccordPage() {
  const jar = await cookies();
  const authed = jar.get('voccord_auth')?.value === 'granted';
  if (!authed) return <VoccordGate />;
  return <VoccordClient />;
}
