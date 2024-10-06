const express = require('express');
const bd = require('body-parser');
const app = express();
const mainRoute = require('./routes/main')
const port = process.env.PORT || 3000;

app.use(bd.urlencoded({
    extended: false
}))
app.use(bd.json());
app.use(mainRoute)

app.get('/', (req, res) => {
    res.send('GYM  ON ke Runing');
});


app.post('/pk', (req, res) => {
    res.send(req.body);
})

app.listen(port, () => {
    console.log(`server is runing.... ${port}`);
})