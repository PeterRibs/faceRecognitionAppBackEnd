const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./control/register');
const signin = require('./control/signin');
const profile = require('./control/profile');
const image = require('./control/image');

const db =  knex({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send("it is working!") })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (res, req) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (res, req) => { image.handleImage(req, res, db) })
app.post('/imageurl', (res, req) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is working on port ${process.env.PORT}`)
})