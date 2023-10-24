import { saveToMongoDB } from './database/db_client'
import client, { Connection } from 'amqplib'
import { StreetsService } from './streets.service'


export class Consumer {
    static async subscribeToRabbitMQ() {
        const connection: Connection = await client.connect(
            'amqp://guest:guest@localhost:5672'
        )
        const channel = await connection.createChannel();
        const queue = 'streetsQueue';

        channel.assertQueue(queue, { durable: false });
        console.log('Waiting for messages...');

        channel.consume(queue, async (msg: any) => {
            const message = JSON.parse(msg.content.toString());
            try {
                // Process the message and save it to MongoDB
                const streetData = await StreetsService.getStreetInfoById(message.streetId);
                console.log(streetData)
                await saveToMongoDB(streetData);
            } catch (error) {
                console.error('Error processing message:', error);
            }
        }, { noAck: true });
    }
}

