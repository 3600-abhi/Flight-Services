const express = require('express');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

// If the request from Reverse-Proxy Server
// currenty not needed because we have redirected using pathRewrite inside options
// app.use('/flightservice/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server at PORT : ${ServerConfig.PORT}`);
});
