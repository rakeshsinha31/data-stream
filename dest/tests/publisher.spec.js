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
const chai_1 = __importDefault(require("chai"));
const mocha_1 = require("mocha");
const amqp = require('amqplib');
// const { publishToRabbitMQ } = require('../src/rabbitmqPublisher');
const publisher_service_1 = require("../src/publisher.service");
const expect = chai_1.default.expect;
(0, mocha_1.describe)('RabbitMQ Publisher', () => {
    (0, mocha_1.it)('should publish a message to RabbitMQ', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock RabbitMQ connection and channel
        const connection = {
            createChannel: () => __awaiter(void 0, void 0, void 0, function* () { return ({ assertQueue: () => { }, sendToQueue: () => { }, close: () => { } }); }),
            close: () => { },
        };
        amqp.connect = () => __awaiter(void 0, void 0, void 0, function* () { return connection; });
        const message = { streetId: 123 };
        const result = yield publisher_service_1.Publisher.publishToRabbitMQ(message);
        expect(result).to.equal(JSON.stringify(message));
    }));
});
