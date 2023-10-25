import client, { Connection } from 'amqplib'
import { saveToMongoDB } from './database/db_client'
import { StreetsService, ApiStreet, Street } from './streets.service'
import { Publisher } from './publisher.service'


export class Consumer {
    static async subscribeToRabbitMQ() {
        const connection: Connection = await client.connect(
            `amqp://${Publisher.db_user}:${Publisher.db_pwd}@${Publisher.db_host}:${Publisher.db_port}`
        )
        const channel = await connection.createChannel();
        const queue = 'streetsQueue';

        channel.assertQueue(queue, { durable: false });
        console.log('Queue is ready to accept messages...');

        channel.consume(queue, async (msg: any) => {
            const message = JSON.parse(msg.content.toString());
            try {
                // Process the message and save it to MongoDB
                const streetData: any = await StreetsService.getStreetInfoById(message.streetId);
                console.log(typeof (streetData))
                await saveToMongoDB(streetData)
            } catch (error) {
                console.error('Error processing message:', error);
            }
        }, { noAck: true });
    }
}

