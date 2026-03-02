import type { Metadata } from 'next';
import VocFooter from '../components/VocFooter';
import AgentQuestionsClient from './AgentQuestionsClient';

export const metadata: Metadata = {
  title: 'Build Your Agent Soul | Voice of Cash',
  description: 'Before we build your AI agent, we need to know who you want it to be. 30 questions about personality, voice, values, and identity. The soul of your machine starts here.',
  alternates: { canonical: 'https://www.thevoiceofcash.com/agent-questions' },
};

export default function AgentQuestionsPage() {
  return (
    <>
      <AgentQuestionsClient />
      <VocFooter />
    </>
  );
}
