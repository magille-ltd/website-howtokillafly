import { json } from '@remix-run/node';
import { connect } from '~/db/mongoose.server';
import { Reaction, ReactionType } from '../models/reaction.server';

export async function action({ request }) {
  console.log('Starting action function');
  await connect();
  console.log('Connected to database');

  const formData = await request.formData();
  const itemType = formData.get('itemType');
  const itemId = formData.get('itemId');
  const reactionType = formData.get('reactionType');

  console.log('Received form data:', { itemType, itemId, reactionType });

  if (!itemType || !itemId || !reactionType || !Object.values(ReactionType).includes(reactionType)) {
    console.log('Invalid or missing fields');
    return json({ error: 'Invalid or missing fields' }, { status: 400 });
  }

  try {
    let reaction = await Reaction.findOne({ itemType, itemId });
    console.log('Existing reaction:', reaction);

    if (!reaction) {
      console.log('Creating new reaction document');
      reaction = new Reaction({
        itemType,
        itemId,
        reactions: [{ type: reactionType, count: 1 }]
      });
    } else {
      console.log('Updating existing reaction document');
      const existingReaction = reaction.reactions.find(r => r.type === reactionType);
      if (existingReaction) {
        console.log('Incrementing existing reaction count');
        existingReaction.count += 1;
      } else {
        console.log('Adding new reaction type');
        reaction.reactions.push({ type: reactionType, count: 1 });
      }
    }

    await reaction.save();
    console.log('Saved reaction:', reaction);

    return json({ success: true, reaction });
  } catch (error) {
    console.error('Error updating reaction:', error);
    return json({ error: 'Failed to update reaction' }, { status: 500 });
  }
}

export async function loader({ request }) {
  console.log('Starting loader function');
  await connect();
  console.log('Connected to database');

  const url = new URL(request.url);
  const itemType = url.searchParams.get('itemType');
  const itemId = url.searchParams.get('itemId');

  console.log('Received query params:', { itemType, itemId });

  if (!itemType || !itemId) {
    console.log('Missing itemType or itemId');
    return json({ error: 'Missing itemType or itemId' }, { status: 400 });
  }

  try {
    const reaction = await Reaction.findOne({ itemType, itemId });
    console.log('Found reaction:', reaction);
    
    const reactionCounts = Object.values(ReactionType).reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {});

    if (reaction) {
      reaction.reactions.forEach(r => {
        reactionCounts[r.type] = r.count;
      });
    }

    console.log('Reaction counts:', reactionCounts);

    const sortedReactions = Object.entries(reactionCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);

    console.log('Sorted reactions:', sortedReactions);

    return json({ reactions: sortedReactions });
  } catch (error) {
    console.error('Error fetching reactions:', error);
    return json({ error: 'Failed to fetch reactions' }, { status: 500 });
  }
}
