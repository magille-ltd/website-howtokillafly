import { json } from '@remix-run/node';
import { connect } from '~/db/mongoose.server';
import { VisitorCount } from '~/models/visitorCount.server';

export async function action({ request }) {
  // Only proceed if it's a POST request (real user visit)
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }  

  // Check for bot user agents
  const userAgent = request.headers.get('User-Agent') || '';
  if (userAgent.toLowerCase().includes('bot')) {
    return json({ count: 0, message: 'Bot visit not counted' });
  }

  await connect();

  const visitorCount = await VisitorCount.findOneAndUpdate(
    { counterId: 'default' },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );

  console.log('Visitor count incremented:', visitorCount.count);

  return json({ count: visitorCount.count });
}

export async function loader() {
  await connect();

  const visitorCount = await VisitorCount.findOne({ counterId: 'default' });

  return json({
    count: visitorCount ? visitorCount.count : 0
  });
}
