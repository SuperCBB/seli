import { useState } from 'react';
import ProposalCard from './components/ProposalCard';
import SuccessCard from './components/SuccessCard';
import { launchConfetti } from './utils/confetti';

export default function App() {
  const [acceptedAt, setAcceptedAt] = useState<Date | null>(null);

  const handleAccept = () => {
    launchConfetti();
    setAcceptedAt(new Date()); // el momento exacto del "Sí"
  };

  return acceptedAt ? (
    <SuccessCard acceptedAt={acceptedAt} />
  ) : (
    <ProposalCard onAccept={handleAccept} />
  );
}
