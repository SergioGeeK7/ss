/* @flow */
const request = require("request-promise");
const fs = require("fs");
const path = require("path");
const config = require("./config");
const {addZeros, formatDate, getLogFolderName} = require("./utils");

const {timePerRequest} = config;
const {maximumInactiveTime} = config;
const {url} = config;

const logFolderName = getLogFolderName();
let count = 0;
let countEmptyData = 0;


setInterval(() => {
    request(url).then(reponse => {
        const {data} = JSON.parse(reponse);
        const isEmptyData = Object.keys(data.liveMatch).length === 0;
        if (isEmptyData) {
            countEmptyData++;
            console.log("Empty data");
            if (timePerRequest * countEmptyData >= maximumInactiveTime) {
                console.log("no more data, finishing script...");
                process.exit();
            }
        } else {
            countEmptyData = 0;
            count++;
            const fileName = `${addZeros(count, 4)}--${formatDate(new Date())}.json`;
            const saveToPath = path.join(__dirname, `/logs/${logFolderName}/`, fileName);
            fs.writeFile(saveToPath, reponse, () => {});
        }
    });
}, timePerRequest);
