import { Link } from "@remix-run/react";
import flyEliminationStrategies from '../flyStrategies';
import Testimonials from '../components/Testimonials';
import StrategyGrid from '../components/StrategyGrid';
import StrategyContainer from '../components/StrategyContainer';

export const meta = () => {
  return [
    { title: "How to Kill a Fly" },
    { name: "description", content: "Directory of various methods to eliminate that pesky mother fly with utmost efficiency and precision." },
  ];
};

export default function Index() {
  return (
    <StrategyContainer>
      <StrategyGrid strategies={flyEliminationStrategies} />
      <Testimonials />
    </StrategyContainer>
  );
}
