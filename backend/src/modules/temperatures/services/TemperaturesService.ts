import { injectable } from 'tsyringe'
import { Request } from 'express'

import axios from 'axios'
import AppError from '@shared/errors/AppError'
import OpenWeatherMap from '@shared/infra/api/OpenWeatherMap';

interface openWeatherMapTemp {
    data: {
        main: {
            temp: number
        }
    }
}

interface ICoordinates {
    latitude: string
    longitude: string
}   

@injectable()
class TemperaturesService {

    public async getTemperature(req: Request): Promise<number|AppError> {
        const { 
            city,
            latitude,
            longitude,
        } = req.query;

        let temperature;

        /**
         * Se a cidade for informada pegará os dados com base na cidade.
         */
        if (typeof city === 'string') {
            temperature = await this.getTemperatureByCity(city);  
        } else {
            if (typeof latitude !== 'string') {
                return new AppError('A Latitude não foi informada', 400);
            }

            if (typeof longitude !== 'string') {
                return new AppError('A Longitude não foi informada', 400);
            }

            let nLatitude = Number(latitude);    
            let nLongitude = Number(longitude); 

            if (nLatitude < -90 || nLatitude > 90) {
                return new AppError('A latitude deve constar entre -90° e 90°', 400);
            }    

            if (nLongitude < -180 || nLongitude > 180) {
                return new AppError('A longitude deve constar entre -180° e 180°', 400);
            }    

            temperature = await this.getTemperatureByCoordinate({
                latitude,
                longitude
            });    
        }

        return temperature;
    }

    /**
     * Converte Kelvin em Celsius.
     * 
     * @param kelvin 
     * @returns 
     */
    public kelvinToCelsius (kelvin: number) {
        return kelvin - 273.15;
    }

    /**
     * Pega a temperatura com base na cidade.
     * @param city 
     * @returns 
     */
    public async getTemperatureByCity (city: string) {
        const retornoAxios: openWeatherMapTemp = await axios.get(
            new OpenWeatherMap({q:city}).url
        )
        return this.kelvinToCelsius(retornoAxios?.data?.main?.temp)
    }

    /**
     * Pega a temperatura com base nas coordenadas informadas.
     * @param param0 
     * @returns 
     */
    public async getTemperatureByCoordinate ({
        latitude,
        longitude
    }: ICoordinates) {
        const retornoAxios: openWeatherMapTemp = await axios.get(
            new OpenWeatherMap({lat: latitude, lon: longitude}).url
        )
        return this.kelvinToCelsius(retornoAxios?.data?.main?.temp)
    }
}

export default TemperaturesService
