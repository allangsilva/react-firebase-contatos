const express = require('express');
const bodyParser = require('body-parser');
const services = require('./services');

const app = express();

app.use(bodyParser.urlencoded({
    extended : true 
}));
app.use(bodyParser.json());

app.post('/contacts', (req, res) => {
    services.saveContact(req, res);
});

app.get('/contacts', (req, res) => {
    services.getContacts(req, res);
});

/*app.delete('/messages/:id', (req, res) => {
    console.log(req.params)
    services.deleteMessage(req, res);
});*/

app.listen(3000, () => console.log(`app listen in port 3000`));
