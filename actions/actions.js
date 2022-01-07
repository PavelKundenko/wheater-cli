import dedent from 'dedent-js';
import { LogService } from '../services/log.service.js';
import { StorageService } from '../services/storage.service.js';
import { ApiService } from '../services/api.service.js';
import { STORAGE_DICTIONARY } from '../helpers/constants.js';
import { convertKelvinToCelcius, capitalize } from '../helpers/functions.js';

const setCity = async (city) => {
  try {
    await StorageService.saveKeyValue(STORAGE_DICTIONARY.city, city);

    LogService.printSuccess('City has been saved');
  } catch (error) {
    LogService.printError(error.message);
  }
};

const setToken = async (token) => {
  try {
    await StorageService.saveKeyValue(STORAGE_DICTIONARY.token, token);

    LogService.printSuccess('Token has been saved');
  } catch (error) {
    LogService.printError(error.message);
  }
};

const getWeather = async () => {
  try {
    const data = await ApiService.fetchData();

    const {
      name: city,
      weather: [{ description }],
      main: { temp, feels_like, humidity },
    } = data;
 
    const result = dedent`\n
      Weather in ${city}:
      ${convertKelvinToCelcius(temp)}℃ , feels like ${convertKelvinToCelcius(feels_like)}℃
      ${capitalize(description)}
      Humidity: ${humidity}%\n
    `;

    console.log(result);
  } catch (error) {
    if (error.response?.status === 404) {
      LogService.printError('City is invalid');
    } else if (error.response?.status === 401) {
      LogService.printError('Invalid token');
    } else {
      LogService.printError(error.message);
    }
  }
};

const showHelp = () => LogService.printInfo(`
  Without params - weather output
  -s - set city
  -h - help
  -t - save API Token
`);

export const actions = {
  s: setCity,
  t: setToken,
  h: showHelp,
  getWeather,
};