import axios, { Axios } from 'axios';
import { omit } from 'lodash';
import { cities, city, enlishNameByCity } from './cities'

import * as dotenv from "dotenv"


dotenv.config()

export interface Street extends Omit<ApiStreet, '_id'> {
    streetId: number
}

interface ApiStreet {
    _id: number
    region_code: number
    region_name: string
    city_code: number
    city_name: string
    street_code: number
    street_name: string
    street_name_status: string
    official_code: number
}


export class StreetsService {
    static url = process.env.HOST as string
    static resource_id = process.env.RESOURCE_ID as string
    private static _axios: Axios
    private static get axios() {
        if (!this._axios) {
            this._axios = axios.create({})
        }
        return this._axios
    }
    static async getStreetsInCity(city: city): Promise<{ city: city, streets: Pick<Street, 'streetId' | 'street_name'>[] }> {
        const res = (await this.axios.post(this.url, { resource_id: this.resource_id, filters: { city_name: cities[city] }, limit: 100000 })).data
        const results = res.result.records
        if (!results || !results.length) {
            throw new Error('No streets found for city: ' + city)
        }
        const streets: Pick<Street, 'streetId' | 'street_name'>[] = results.map((street: ApiStreet) => {
            return { streetId: street._id, name: street.street_name.trim() }
        })
        return { city, streets }
    }

    static async getStreetInfoById(id: number) {
        const res = (await this.axios.post(this.url, { resource_id: this.resource_id, filters: { _id: id }, limit: 1 })).data
        const results = res.result.records
        if (!results || !results.length) {
            throw new Error('No street found for id: ' + id)
        }
        const dbStreet: ApiStreet = results[0]
        const cityName = enlishNameByCity[dbStreet.city_name]
        const street = { ...omit<ApiStreet>(dbStreet, '_id'), streetId: dbStreet._id, city_name: cityName, region_name: dbStreet.region_name.trim(), street_name: dbStreet.street_name.trim() }
        return street
    }
}