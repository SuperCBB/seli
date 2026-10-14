import type { ReactNode } from 'react';
import './Card.css';

export default function Card({ children }: { children: ReactNode }) {
  return <div className="card">{children}</div>;
}
