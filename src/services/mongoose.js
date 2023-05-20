const mongoose = require('mongoose');
const { mongoUri } = require('../config.json');
require('colors');

async function connectDb() {
    await mongoose.connect(mongoUri);
    console.log('[DATABASE] Database is now connected!'.yellow);
}

module.exports = {
    connectDb
}