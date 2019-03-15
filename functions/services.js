const functions = require('firebase-functions');
const admin = require("firebase-admin");
const cors = require('cors')({ origin: true });

process.env.TZ = 'UTC';

const settings = {
    timeoutSeconds: 500,
    memory: '2GB',
};

const serviceAccount = require("./config.json");

if( process.env.FIREBASE_CONFIG )
    admin.initializeApp();
else
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://react-firebase-contatos.firebaseio.com"
    });

const db = admin.firestore();
db.settings(settings);

exports.save = functions.https.onRequest((req, res) => {
    
    cors(req, res, () => {
        res.setHeader('Content-Type', 'application/json');
        const contact = req.body;
    
        if( contact && contact.name ){
            return db.collection('contacts').doc(`${contact.name}-${Math.floor(Math.random() * 100)}`).set(contact)
                .then(value => {
                    res.status(200).send(value)
                    return 
                }).catch(err => {
                    console.log(err)
                    res.status(500).send({ error: true, message: 'Contato não criado.' })
                    return 
                })
        }
    })
});

exports.get = functions.https.onRequest((req, res) => {

    cors(req, res, () => {
        res.setHeader('Content-Type', 'application/json');
        return db.collection('contacts')
            .get()
            .then(values => {
                let contatos = []
                values.forEach( c => contatos.push( Object.assign(c.data(), { id: c.id }) ) )
                res.status(200).send(contatos)
                return 
            }).catch(err => {
                console.log(err)
                res.status(500).send({ error: true, message: 'Erro ao listar contatos.' })
                return 
            })
    })
});