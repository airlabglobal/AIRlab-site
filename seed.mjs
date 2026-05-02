/*
import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

// used this script to move existing data to mongodb
const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable (passed via --env-file)');
}

const client = new MongoClient(uri);

async function seed() {
    try {
        await client.connect();
        const db = client.db();
        console.log('Connected to MongoDB database:', db.databaseName);

        const dataDir = path.join(process.cwd(), 'src', 'data');

        const collections = [
            { name: 'projects', file: 'projects.json' },
            { name: 'news', file: 'news.json' },
            { name: 'research', file: 'research.json' },
            { name: 'history', file: 'history.json' }
        ];

        // Seed regular collections
        for (const { name, file } of collections) {
            const filePath = path.join(dataDir, file);
            if (fs.existsSync(filePath)) {
                const raw = fs.readFileSync(filePath, 'utf8');
                const data = JSON.parse(raw);
                if (data.length > 0) {
                    await db.collection(name).deleteMany({}); // clear existing
                    await db.collection(name).insertMany(data);
                    console.log(`✅ Seeded ${data.length} records into ${name} collection`);
                } else {
                    console.log(`ℹ️ No data to seed for ${name}`);
                }
            }
        }

        // Seed team collections (combine into one with a category)
        const teamCategories = ['leading', 'pioneer', 'volunteers'];
        const teamCollection = db.collection('team');
        await teamCollection.deleteMany({}); // clear existing
        let teamCount = 0;

        for (const category of teamCategories) {
            const filePath = path.join(dataDir, `team-${category}.json`);
            if (fs.existsSync(filePath)) {
                const raw = fs.readFileSync(filePath, 'utf8');
                const data = JSON.parse(raw);
                if (data.length > 0) {
                    const categorizedData = data.map((item) => ({ ...item, category }));
                    await teamCollection.insertMany(categorizedData);
                    teamCount += data.length;
                }
            }
        }

        if (teamCount > 0) {
            console.log(`✅ Seeded ${teamCount} records into team collection`);
        } else {
            console.log(`ℹ️ No data to seed for team`);
        }

        console.log('🎉 Seeding successfully completed!');
    } catch (error) {
        console.error('❌ Error during seeding:', error);
    } finally {
        await client.close();
    }
}

seed();
*/
