const app = require('./app')
const config = require('./app/config');
const MongoDB = require('./app/utils/mongodb.util')

async function start() {
  try {
    await MongoDB.connect(config.database.uri);
    console.log("Connected to the database");

    const PORT = config.app.port;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log("Cannot connect to the database!", error);
    process.exit();
  }
}

start();