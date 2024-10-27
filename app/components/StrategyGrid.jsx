import ItemCard from './ItemCard';

export default function StrategyGrid({ strategies }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {strategies.map((strategy) => (
        <ItemCard key={strategy.id} item={strategy} />
      ))}
    </div>
  );
}
