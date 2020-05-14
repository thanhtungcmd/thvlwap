const express = require('express');
const cors = require('cors')
const request = require('request-promise');

const app = express()
const port = 3000

app.use(cors());

app.get('/backend/cm/page/trang-chu', async (req, res) => {
    let data = await request('https://api.thvli.vn/backend/cm/page/trang-chu');
    return res.send(data);
});

app.get('/backend/cm/menu/e3f56e40-94b0-4e1f-9830-7c7f0d1bd354', async (req, res) => {
    let data = await request('https://api.thvli.vn/backend/cm/menu/e3f56e40-94b0-4e1f-9830-7c7f0d1bd354');
    return res.send(data);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
