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
exports.Publisher = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const streets_service_1 = require("./streets.service");
class Publisher {
    static publishToRabbitMQ(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield amqplib_1.default.connect('amqp://guest:guest@localhost:5672');
            const channel = yield connection.createChannel();
            channel.assertQueue(this.queueName, { durable: false });
            channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(message)));
            return JSON.stringify(message);
        });
    }
    static main(cityName) {
        return __awaiter(this, void 0, void 0, function* () {
            const streetsNames = yield streets_service_1.StreetsService.getStreetsInCity(cityName);
            streetsNames.streets.forEach((street) => {
                this.publishToRabbitMQ(street);
            });
            console.log(`Published ${streetsNames.streets.length} streets to the queue.`);
        });
    }
}
exports.Publisher = Publisher;
Publisher.queueName = 'streetsQueue';
