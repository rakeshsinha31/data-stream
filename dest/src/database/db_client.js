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
exports.saveToMongoDB = void 0;
const mongodb_1 = require("mongodb");
function saveToMongoDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient('mongodb://localhost:27017');
        try {
            yield client.connect();
            const database = client.db('dataloop');
            const collection = database.collection('streets');
            yield collection.insertOne(data);
            console.log('Data saved to table');
            return 'Data saved to MongoDB';
        }
        finally {
            yield client.close();
        }
    });
}
exports.saveToMongoDB = saveToMongoDB;
