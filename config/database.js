const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

// shortcut to mongoose.connection object
// DON'T INVOKE IT! It's just a property name!
const db = mongoose.connection;
db.on('connected', function () {
  console.log(`Connected to MONGODB ${db.name} at ${db.host} : ${db.port}`)
})


// require('dotenv').config()
// require('./config/database')

