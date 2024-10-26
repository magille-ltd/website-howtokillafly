import React, { useEffect, useState } from 'react';
import { useFetcher } from '@remix-run/react';
import flyEliminationStrategies from '../flyStrategies';
import StrategyGrid from './StrategyGrid';
import StrategyContainer from './StrategyContainer';
import { ReactionEmoji } from '../constants/reactionTypes';

export default function StrategySection() {
  const [topReactions, setTopReactions] = useState({});
  const fetcher = useFetcher();

  useEffect(() => {
    // Fetch top reactions when component mounts
    fetcher.load('/api/top-reactions?itemType=strategy');
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      setTopReactions(fetcher.data);
    }
  }, [fetcher.data]);

  //console.log({ fetcherData: fetcher.data });
  //console.log({ topReactions });

  const strategiesWithReactions = flyEliminationStrategies.map(strategy => ({
    ...strategy,
    topReactionEmoji: topReactions[strategy.id] ? ReactionEmoji[topReactions[strategy.id]] : null,
  }));

  //console.log(strategiesWithReactions);

  return (
    <StrategyContainer>
      <StrategyGrid strategies={strategiesWithReactions} />
    </StrategyContainer>
  );
}
