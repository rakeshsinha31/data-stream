import { Publisher } from './publisher.service'
import { Consumer } from './consumer.service'

async function start() {
    const argCity = process.argv[2]
    if (!argCity) {
        console.error('Please provide a city name as a command-line argument.');
        process.exit(1);
    }
    Publisher.main(argCity)
    Consumer.subscribeToRabbitMQ();
}
start();
