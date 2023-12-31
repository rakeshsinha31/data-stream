"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumer = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const db_client_1 = require("./database/db_client");
const streets_service_1 = require("./streets.service");
const publisher_service_1 = require("./publisher.service");
class Consumer {
    static subscribeToRabbitMQ() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield amqplib_1.default.connect(`amqp://${publisher_service_1.Publisher.db_user}:${publisher_service_1.Publisher.db_pwd}@${publisher_service_1.Publisher.db_host}:${publisher_service_1.Publisher.db_port}`);
            const channel = yield connection.createChannel();
            const queue = 'streetsQueue';
            channel.assertQueue(queue, { durable: false });
            console.log('Queue is ready to accept messages...');
            channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                const message = JSON.parse(msg.content.toString());
                try {
                    // Process the message and save it to MongoDB
                    const streetData = yield streets_service_1.StreetsService.getStreetInfoById(message.streetId);
                    console.log(typeof (streetData));
                    yield (0, db_client_1.saveToMongoDB)(streetData);
                }
                catch (error) {
                    console.error('Error processing message:', error);
                }
            }), { noAck: true });
        });
    }
}
exports.Consumer = Consumer;
