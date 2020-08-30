const app = require('express')();

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen('1234', (err) => {
    err ? console.error(error) : console.log('server listening');
})