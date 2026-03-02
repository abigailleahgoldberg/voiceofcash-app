import type { Metadata } from 'next';
import PortalClient from './PortalClient';

export const metadata: Metadata = {
  title: 'Team Portal — Voice of Cash',
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return <PortalClient />;
}
