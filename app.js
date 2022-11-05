const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const app = express();
const port = 8000;

app.use(session({ secret: 'codingdojorocks' }));

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { result: null });
    res.end();
});

app.post('/', (req, resp) => {

    const { numero } = req.body;

    if (!req.session.number) {
        req.session.number = Math.floor(Math.random() * 100) + 1
    }

    console.log('Great Number', req.session.number);

    if (numero < req.session.number) {
        resp.render('index', { result: 'Too low!' });
    } else if (numero > req.session.number) {
        resp.render('index', { result: 'Too high!' });
    } else {
        resp.render('index', { result: `${req.session.number} was the number!` });
    }

    resp.end();

});

app.get('/again', (req, resp) => {
    req.session.number = null;
    resp.redirect('/');
})

app.get('*', (req, resp) => {
    resp.send('404 | Page not found');
    resp.end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});