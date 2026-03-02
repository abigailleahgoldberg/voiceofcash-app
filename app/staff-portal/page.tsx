import type { Metadata } from 'next';
import ContractClient from './ContractClient';

export const metadata: Metadata = {
  title: 'The Voice of Cash, Partner Agreement',
  robots: { index: false, follow: false },
};

export default function ContractPage() {
  return <ContractClient />;
}
