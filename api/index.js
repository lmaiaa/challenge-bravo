require('module-alias/register') //importando alias
const Server = require('@src/startServer') //importando classe Server

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` }) //configurando dotenv

const configs = {
    dependencies: {
        express: require('express'),
        logger: require('morgan'),
        cors: require('cors'),
        bodyParser: require('body-parser'),
        swaggerUi: require('swagger-ui-express'),
        scheduler: require('@utils/scheduler'),
        mongoose: require('mongoose'),
    },
    routes: require('@src/routes'),
}

const server = new Server(configs)
const updateValueCoins = require('./src/jobs/update-value-coins')
if (process.env.JOB) {
    server.scheduleJob(1000 * 60, updateValueCoins, true)
}

server.start()