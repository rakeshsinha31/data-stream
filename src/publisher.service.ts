import client, { Connection } from 'amqplib'
import { StreetsService } from './streets.service'


export class Publisher {
    static db_host = process.env.DB_HOST
    static db_port = process.env.DB_PORT
    static db_user = process.env.DB_USER
    static db_pwd = process.env.DB_PASSWORD


    private static queueName = 'streetsQueue';
    static async publishToRabbitMQ(message: any) {
        const connection: Connection = await client.connect(
            `amqp://${this.db_user}:${this.db_pwd}@${this.db_host}:${this.db_port}`
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
