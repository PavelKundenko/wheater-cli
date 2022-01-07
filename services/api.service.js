import axios from 'axios';
import { StorageService } from './storage.service.js';
import { STORAGE_DICTIONARY } from '../helpers/constants.js';

export class ApiService {
  static fetchData = async () => {
    const city = await StorageService.getKeyValue(STORAGE_DICTIONARY.city);
    const token = process.env.API_KEY ?? await StorageService.getKeyValue(STORAGE_DICTIONARY.token);

    if (!city) {
      throw new Error('City is not defined');
    }

    if (!token) {
      throw new Error('Token is not defined');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: token,
        units: 'metrics',
      },
    });

    return data;
  };
}
