import mysql from 'mysql';

const mysqlCredentials = require('../mysql-credentials.json');

if (!mysqlCredentials || !mysqlCredentials.host || !mysqlCredentials.database) {
    throw 'invalid mysql-credentials.json';
}

const spreadsheetId = process.argv[2];
if (!spreadsheetId || spreadsheetId.trim() === '') {
    throw 'please pass spreadsheet id as an argument';
}

const spreadsheetData = require(`../downloads/${spreadsheetId}.json`);

if (!spreadsheetData) {
    throw 'invalid spreadsheet data';
}

const columns = spreadsheetData[0];
const tableName = '`spreadsheet_' + spreadsheetId + '`';
const createTableSql = `
    DROP TABLE IF EXISTS ${tableName};
    CREATE TABLE ${tableName}(
        ${columns.map(col => '`' + col + '` TEXT NULL').join(',\n')}
    );
`;

console.log('create sql:', { createTableSql });
const connection = mysql.createConnection(
    {
        ...mysqlCredentials,
        multipleStatements: true,
    }
);
connection.connect();

connection.query(createTableSql, function (error, results, fields) {
    if (error) {
        console.error(error);
        throw error;
    } else {
        console.log('Done creating the table');
    }
    connection.end();
});

