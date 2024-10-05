const express = require('express');
const bd = require('body-parser');
const app = express();
const core = require('cors')
const mainRoute = require('./routes/main')
const port = process.env.PORT || "https://gymzen360.com/";

app.use(core());
app.use(bd.urlencoded({
    extended: false
}))
app.use(bd.json());
app.use(mainRoute)

app.get('/', (req, res) => {
    res.send('GYM  ON ke Runing', req.body);
})
app.post('/pk', (req, res) => {
    res.send(req.body);
})

app.listen(port, () => {
    console.log(`server is runing.... ${port}`);
})