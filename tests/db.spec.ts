import chai from 'chai';
const { MongoClient } = require('mongodb');
import { saveToMongoDB } from '../src/database/db_client'

const expect = chai.expect;

describe('MongoDB Data Storage', () => {
    it('should save data to MongoDB', async () => {
        // Mock MongoDB client and collection
        const database = {
            collection: () => ({ insertOne: () => { } }),
        };
        const client = {
            connect: async () => database,
            close: () => { },
        };
        MongoClient.connect = async () => client;

        const data: any = { streetId: 123, street_name: 'Example Street' };
        const result = await saveToMongoDB(data);

        expect(result).to.equal('Data saved to MongoDB');
    });
});
