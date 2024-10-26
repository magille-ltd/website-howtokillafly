import { json } from '@remix-run/node';
import { connect } from '~/db/mongoose.server';
import { Vote } from '~/models/vote.server';

export async function action({ request }) {
  const formData = await request.formData();
  const itemId = formData.get('id');
  const itemType = formData.get('type');
  const increment = formData.get('increment') === 'true';

  await connect();

  const updateField = increment ? 'upVotes' : 'downVotes';
  const vote = await Vote.findOneAndUpdate(
    { itemId, itemType },
    { $inc: { [updateField]: 1 } },
    { new: true, upsert: true }
  );

  return json({ upVotes: vote.upVotes, downVotes: vote.downVotes });
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const itemId = url.searchParams.get('id');
  const itemType = url.searchParams.get('type');

  await connect();

  const vote = await Vote.findOne({ itemId, itemType });

  return json({
    upVotes: vote ? vote.upVotes : 0,
    downVotes: vote ? vote.downVotes : 0
  });
}
