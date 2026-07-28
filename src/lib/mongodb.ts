import { MongoClient, Document } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
    // No DB configured (e.g. local design-only work) — defer the failure
    // to whoever actually awaits this, instead of crashing on import.
    clientPromise = Promise.reject(
        new Error('Invalid/Missing environment variable: "MONGODB_URI"')
    );
} else if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

// Prevent an unhandled-rejection crash when no MONGODB_URI is set; callers
// that await the default export below still see the rejection normally.
clientPromise.catch(() => {});

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export const mapDoc = (doc: Document): Document & { id: string } => {
    const { _id, ...rest } = doc;
    return {
        ...rest,
        id: _id ? _id.toString() : rest.id,
    };
};

export default clientPromise;
