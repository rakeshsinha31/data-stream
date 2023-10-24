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
Object.defineProperty(exports, "__esModule", { value: true });
const publisher_service_1 = require("./publisher.service");
const consumer_service_1 = require("./consumer.service");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const argCity = process.argv[2];
        if (!argCity) {
            console.error('Please provide a city name as a command-line argument.');
            process.exit(1);
        }
        publisher_service_1.Publisher.main(argCity);
        consumer_service_1.Consumer.subscribeToRabbitMQ();
    });
}
start();
