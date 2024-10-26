import { json } from '@remix-run/node';
import { connect } from '~/db/mongoose.server';
import { Reaction } from '../models/reaction.server';

export async function loader({ request }) {
  console.log('Starting top reactions loader function');
  await connect();
  console.log('Connected to database');

  const url = new URL(request.url);
  const itemType = url.searchParams.get('itemType');

  console.log('Received query params:', { itemType });

  if (!itemType) {
    console.log('Missing itemType');
    return json({ error: 'Missing itemType' }, { status: 400 });
  }

  try {
    const reactions = await Reaction.find({ itemType });
    console.log('Found reactions:', reactions);

    const topReactions = {};

    reactions.forEach(reaction => {
      const topReaction = reaction.reactions.reduce((max, current) => 
        (current.count > max.count) ? current : max
      , { count: 0 });

      if (topReaction.count > 0) {
        topReactions[reaction.itemId] = topReaction.type;
      }
    });

    console.log('Top reactions:', topReactions);

    return json(topReactions);
  } catch (error) {
    console.error('Error fetching top reactions:', error);
    return json({ error: 'Failed to fetch top reactions' }, { status: 500 });
  }
}
