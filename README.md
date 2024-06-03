## Getting Start

run command `npm install`

change `.env` file in root with following contents:

```shell
    PORT = < your_port >
    JWT_SECRET = < your_secret >
    JWT_EXPIRES_IN = < your_expire_duration >
```

change `config.json` file in config folder with following contents:

```shell
    username = < database_user >
    password = < database_password >
    database = < database_name >
    host = < database_host >
    dialect = < your_dialect >
```

run command `node .\utils\sync.js` to sync tables into database

run command `npm start` to start the project

all you needed apis in the `aero.postman_collection.json` file
