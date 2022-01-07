import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

export class StorageService {
  static #filePath = join(homedir(), 'weather-data.json');

  static isFileExists = async () => {
    try {
      await promises.stat(StorageService.#filePath);

      return true;
    } catch(_error) {
      return false;
    }
  };

  static getKeyValue = async (key) => {
    if (await StorageService.isFileExists()) {
      const file = await promises.readFile(StorageService.#filePath);

      const data = JSON.parse(file);

      return data[key] ?? null;
    }

    return null;
  };

  static saveKeyValue = async (key, value) => {
    const data = { [key]: value };

    if (await StorageService.isFileExists()) {
      const file = await promises.readFile(StorageService.#filePath);
      
      const updatedData = {
        ...JSON.parse(file),
        ...data,
      };

      await promises.writeFile(StorageService.#filePath, JSON.stringify(updatedData));
    } else {
      await promises.writeFile(StorageService.#filePath, JSON.stringify(data));
    }
  };
}
