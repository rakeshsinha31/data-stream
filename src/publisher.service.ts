import client, { Connection } from 'amqplib'
import { StreetsService } from './streets.service'
import { city } from './cities';

export class Publisher {
    private static queueName = 'streetsQueue';
    static async publishToRabbitMQ(message: any) {
        const connection: Connection = await client.connect(
            'amqp://guest:guest@localhost:5672'
        )
        const channel = await connection.createChannel();
        channel.assertQueue(this.queueName, { durable: false });
        channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(message)))
        return JSON.stringify(message)
    }

    static async main(cityName: any) {
        const streetsNames = await StreetsService.getStreetsInCity(cityName)
        streetsNames.streets.forEach((street) => {
            this.publishToRabbitMQ(street)
        })
        console.log(`Published ${streetsNames.streets.length} streets to the queue.`);
    }
}
