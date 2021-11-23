import fs from 'fs';
import path from 'path';
import os from 'os';
import LineByLineReader from 'line-by-line';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import csv from 'csvtojson';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFilePath = path.join(__dirname, 'csv/nodejs-hw1-ex1.csv');
const writeFilePath = path.join(__dirname, 'results/convertCSVtoJSON.txt');

const readStream = fs.createReadStream(readFilePath);
const writeStream = fs.createWriteStream(writeFilePath);
const errorHandle = err => console.error(err);
const writeObjectToFile = stream => {
    return (obj) => {
        stream.write(JSON.stringify(obj) + os.EOL);
    };
};

readStream.on('error', errorHandle);
writeStream.on('error', errorHandle);

(async function transformCsvToJson() {
    try {
        const lr = new LineByLineReader(readStream);

        lr.once('line', firstLine => {
            lr.pause();
            csv({ noheader: true, output: 'csv' })
                .fromString(firstLine)
                .subscribe(headers => {
                    lr.on('line', line => {
                        csv({ noheader: true, headers })
                            .fromString(line)
                            .subscribe(writeObjectToFile(writeStream));
                    });
                    lr.resume();
                });
        });
    } catch (err) {
        console.error(err);
    }
}());
