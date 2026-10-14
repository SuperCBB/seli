import { useState } from 'react';
import ProposalCard from './components/ProposalCard';
import SuccessCard from './components/SuccessCard';
import { launchConfetti } from './utils/confetti';

export default function App() {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    launchConfetti();
    setAccepted(true);
  };

  return accepted ? <SuccessCard /> : <ProposalCard onAccept={handleAccept} />;
}
