"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.StreetsService = void 0;
const axios_1 = __importDefault(require("axios"));
const lodash_1 = require("lodash");
const cities_1 = require("./cities");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class StreetsService {
    static get axios() {
        if (!this._axios) {
            this._axios = axios_1.default.create({});
        }
        return this._axios;
    }
    static getStreetsInCity(city) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = (yield this.axios.post(this.url, { resource_id: this.resource_id, filters: { city_name: cities_1.cities[city] }, limit: 100000 })).data;
            const results = res.result.records;
            if (!results || !results.length) {
                throw new Error('No streets found for city: ' + city);
            }
            const streets = results.map((street) => {
                return { streetId: street._id, name: street.street_name.trim() };
            });
            return { city, streets };
        });
    }
    static getStreetInfoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = (yield this.axios.post(this.url, { resource_id: this.resource_id, filters: { _id: id }, limit: 1 })).data;
            const results = res.result.records;
            if (!results || !results.length) {
                throw new Error('No street found for id: ' + id);
            }
            const dbStreet = results[0];
            const cityName = cities_1.enlishNameByCity[dbStreet.city_name];
            const street = Object.assign(Object.assign({}, (0, lodash_1.omit)(dbStreet, '_id')), { streetId: dbStreet._id, city_name: cityName, region_name: dbStreet.region_name.trim(), street_name: dbStreet.street_name.trim() });
            return street;
        });
    }
}
exports.StreetsService = StreetsService;
StreetsService.url = process.env.HOST;
StreetsService.resource_id = process.env.RESOURCE_ID;
