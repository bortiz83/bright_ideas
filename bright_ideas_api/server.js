const express = require('express');
const cors = require('cors');
const app = express();

require('./server/config/mongoose.config');

app.use(cors(), express.json(), express.urlencoded({ extended: true}));

const AllProjectRoutes = require('./server/routes/project.routes');
AllProjectRoutes(app);

app.listen(8000, () => console.log('The server is up and running on port 8000'));