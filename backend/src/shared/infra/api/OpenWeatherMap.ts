import * as dotenv from 'dotenv';
import { injectable } from 'tsyringe'

/**
 * Classe de api do OpenWeatherMap
 */
@injectable()
class OpenWeatherMap {
    url: string;

    constructor(params: any) {
        this.montaURL(params);
    }

    /**
     * Monta a URL.
     * @param params 
     */
    public montaURL(params: any) {
        let paramUrl = '';
        for (const key in params) {
            paramUrl += (`${key}=${params[key]}&`)
        }
        this.url = `https://api.openweathermap.org/data/2.5/weather?${paramUrl}appid=${process.env.OPEN_WEATHER_MAP_APPID}`
    }
}

export default OpenWeatherMap
