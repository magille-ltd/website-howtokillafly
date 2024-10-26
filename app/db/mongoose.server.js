import mongoose from 'mongoose';

let db;

async function connect() {
  console.log('Attempting to connect to MongoDB...');

  if (db) {
    console.log('Existing connection found, returning...');
    return db;
  }

  const mongodbUri = process.env.MONGODB_URI
    .replace('<db_username>', process.env.MONGODB_USER)
    .replace('<db_password>', process.env.MONGODB_PASSWORD);

  console.log('MongoDB URI:', mongodbUri);

  let connectionString = mongodbUri;
  
  if (process.env.MONGODB_DATABASE) {
    const [uriWithoutParams, params] = mongodbUri.split('?');
    connectionString = `${uriWithoutParams}${process.env.MONGODB_DATABASE}?${params}`;
    console.log('Connection string with database:', connectionString.replace(/(?<=:\/\/[^:]+:)[^@]+/, 'xxxx'));
  }

  if (process.env.NODE_ENV === 'production') {
    console.log('Connecting in production mode...');
    db = await mongoose.connect(connectionString);
  } else {
    console.log('Connecting in development mode...');
    // If not already connected, create a new connection
    if (!global.__db) {
      global.__db = await mongoose.connect(connectionString);
    }
    db = global.__db;
  }

  console.log('Successfully connected to MongoDB');
  return db;
}

export { connect };
