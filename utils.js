/* @flow */

const fs = require("fs");
const path = require("path");

const addZeros = (number, length) => {
    const len = length - String(number).length;
    return "0".repeat(len < 0 ? 0 : len) + number;
};

const formatDate = (date) => {
    return `${addZeros(date.getMonth() + 1, 2)}-
            ${addZeros(date.getDate(), 2)}-
            ${date.getFullYear()}-
            ${addZeros(date.getHours(), 2)}:
            ${addZeros(date.getMinutes(), 2)}:
            ${addZeros(date.getSeconds(), 2)}`.replace(/\n| /g, "");
};

const getLogFolderName = () => {
    const logFolderName = formatDate(new Date());
    const defaultLogFolder = path.join(__dirname, "/logs/");

    if(!fs.existsSync(defaultLogFolder)){
        fs.mkdirSync(defaultLogFolder);
    }
    fs.mkdirSync(path.join(defaultLogFolder, logFolderName));

    return logFolderName;
}

module.exports = {
    addZeros,
    formatDate,
    getLogFolderName
};
