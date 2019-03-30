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
const insertSql = `
    insert into ${tableName}(
        ${columns.map(col => '`' + col + '`').join(' ,')}
    ) VALUES  ?
`;

const values = [...spreadsheetData];
values.shift();

const connection = mysql.createConnection(mysqlCredentials);
connection.connect();

var query = connection.query(
    insertSql,
    [values],
    function (error, results, fields) {
        if (error) {
            console.error(error);
            throw error;
        } else {
            console.log('Done inserting');
        }
        connection.end();
    });

console.log(query.sql);
