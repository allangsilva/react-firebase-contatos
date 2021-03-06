const express = require('express');
const bodyParser = require('body-parser');
const services = require('./services');

const app = express();

app.use(bodyParser.urlencoded({
    extended : true 
}));
app.use(bodyParser.json());

app.post('/contacts', (req, res) => {
    services.save(req, res);
});

app.get('/contacts', (req, res) => {
    services.get(req, res);
});

/*app.delete('/messages/:id', (req, res) => {
    console.log(req.params)
    services.deleteMessage(req, res);
});*/
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`app listen in port ${port}`));
