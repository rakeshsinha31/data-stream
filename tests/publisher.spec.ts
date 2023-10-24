import chai from 'chai';
import { describe, it } from 'mocha'
const amqp = require('amqplib')
// const { publishToRabbitMQ } = require('../src/rabbitmqPublisher');
import { Publisher } from '../src/publisher.service'

const expect = chai.expect;

describe('RabbitMQ Publisher', () => {
    it('should publish a message to RabbitMQ', async () => {
        // Mock RabbitMQ connection and channel
        const connection = {
            createChannel: async () => ({ assertQueue: () => { }, sendToQueue: () => { }, close: () => { } }),
            close: () => { },
        };
        amqp.connect = async () => connection;

        const message = { streetId: 123 };
        const result = await Publisher.publishToRabbitMQ(message);

        expect(result).to.equal(JSON.stringify(message));
    });
});
