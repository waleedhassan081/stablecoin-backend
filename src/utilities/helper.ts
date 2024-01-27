import { HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export const readJsonFile = (fileLocation) => {
    const filePath = path.resolve(__dirname, fileLocation);
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        throw new HttpException('Failed to load file ', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
}

export const writeJsonFile = (fileLocation, data) => {
    fs.writeFileSync(path.join(__dirname, '..', '..', fileLocation), JSON.stringify(data, null, 2), 'utf8');
}
