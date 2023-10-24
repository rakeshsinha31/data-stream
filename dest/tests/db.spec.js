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
const { MongoClient } = require('mongodb');
const db_client_1 = require("../src/database/db_client");
const expect = chai_1.default.expect;
describe('MongoDB Data Storage', () => {
    it('should save data to MongoDB', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock MongoDB client and collection
        const database = {
            collection: () => ({ insertOne: () => { } }),
        };
        const client = {
            connect: () => __awaiter(void 0, void 0, void 0, function* () { return database; }),
            close: () => { },
        };
        MongoClient.connect = () => __awaiter(void 0, void 0, void 0, function* () { return client; });
        const data = { streetId: 123, street_name: 'Example Street' };
        const result = yield (0, db_client_1.saveToMongoDB)(data);
        expect(result).to.equal('Data saved to MongoDB');
    }));
});
