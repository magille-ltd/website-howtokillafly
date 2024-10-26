import StrategyCard from './StrategyCard';

export default function StrategyGrid({ strategies }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {strategies.map((strategy, index) => (
        <StrategyCard key={index} strategy={strategy} />
      ))}
    </div>
  );
}
