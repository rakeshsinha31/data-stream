import { MongoClient } from 'mongodb';

export async function saveToMongoDB(data: any) {
    const client = new MongoClient('mongodb://localhost:27017')
    try {
        await client.connect();
        const database = client.db('dataloop');
        const collection = database.collection('streets');

        await collection.insertOne(data);
        console.log('Data saved to table');
        return 'Data saved to MongoDB'
    } finally {
        await client.close();
    }
}