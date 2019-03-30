# Command line tool to download a google spreadsheet and import it into mysql
The assumption is that the first row is column names

## To get things working please:
1. Create credentials.json and save it to root folder by going to the following link and completing step 1
```
https://developers.google.com/sheets/api/quickstart/nodejs
```

2. run
```
npm install
npm run build
```

## To download a google spreadsheet please run the following command and follow instructions
```
npm run download -- <sheetID> <optional:range( default is Sheet1)>
```
* the range is in [a1 notaion](https://developers.google.com/sheets/api/guides/concepts#a1_notation)

## To create a table from the downloaded file
1. create a file called mysql-credentials.json with a structure [as described here](https://www.npmjs.com/package/mysql#connection-options)
example:
```
{
  "host"     : "localhost",
  "user"     : "me",
  "password" : "secret",
  "database" : "my_db",
  "connectTimeout": 60000
}
```

2. run:
```
npm run create-table -- <sheetID>
```

## To insert all the information from the downloaded file
After creating mysql-credentials.json just run the following command
```
npm run insert-to-table -- <sheetID>
```

