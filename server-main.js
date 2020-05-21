const express = require('express');
const cors = require('cors')
const request = require('request-promise');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = express()
const port = 80
const options = {
    key: fs.readFileSync('private.pem'),
    cert: fs.readFileSync('sub.ditech.vn.crt')
};

app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

/*-----Frontend Area-----*/
app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
    return res.sendFile('./dist/index.html', {root: __dirname });
});

app.get('/danh-muc/:id', (req, res) => {
    return res.sendFile('./dist/index.html', {root: __dirname });
});

app.get('/chi-tiet/:id', (req, res) => {
    return res.sendFile('./dist/index.html', {root: __dirname });
});

app.get('/trang/:id', (req, res) => {
    return res.sendFile('./dist/index.html', {root: __dirname });
});

app.get('/live/:id', (req, res) => {
    return res.sendFile('./dist/index.html', {root: __dirname });
});

app.get('/dang-nhap', (req, res) => {
    return res.sendFile('./dist/index.html', {root: __dirname });
});

app.get('/dang-ky', (req, res) => {
    return res.sendFile('./dist/index.html', {root: __dirname });
});

app.get('/goi-cuoc', (req, res) => {
    return res.sendFile('./dist/index.html', {root: __dirname });
});
/*-----Frontend Area-----*/

/*-----Backend Area-----*/
app.get('/backend/cm/page/:id', async (req, res) => {
    let data = await request('https://api.thvli.vn/backend/cm/page/' + req.params.id);
    return res.send(data);
});

app.get('/backend/cm/menu/e3f56e40-94b0-4e1f-9830-7c7f0d1bd354', async (req, res) => {
    let data = await request('https://api.thvli.vn/backend/cm/menu/e3f56e40-94b0-4e1f-9830-7c7f0d1bd354');
    return res.send(data);
});

app.get('/backend/cm/ribbon/:id', async (req, res) => {
    let data = await request({
        url: 'https://api.thvli.vn/backend/cm/ribbon/'+ req.params.id,
        qs: {
            page: req.query.page
        }
    });
    return res.send(data);
});

app.get('/backend/cm/detail/:id', async (req, res) => {
    let data = await request({
        url: 'https://api.thvli.vn/backend/cm/detail/'+ req.params.id
    });
    return res.send(data);
});

app.get('/backend/cm/season_by_id/:id', async (req, res) => {
    let data = await request({
        url: 'https://api.thvli.vn/backend/cm/season_by_id/'+ req.params.id
    });
    return res.send(data);
});

app.get('/backend/cm/related/:id', async (req, res) => {
    let data = await request({
        url: 'https://api.thvli.vn/backend/cm/related/'+ req.params.id
    });
    return res.send(data);
});

app.get('/backend/test.m3u8', async (req, res) => {
    let data = await request({
        url: 'https://live2.thvli.vn/d8d5f95e7e16fe911168281e91004de31589647550/live/thvl1hd.m3u8'
    });
    return res.send(data);
});

app.get('/backend/cm/epg', async (req, res) => {
    let data = await request({
        url: 'https://api.thvli.vn/backend/cm/epg/',
        qs: {
            channel_id: req.query.channel_id,
            schedule_date: req.query.schedule_date
        }
    });
    return res.send(data);
});

app.post('/backend/cas/register/email', async (req, res) => {
    try {
        let data = await request.post({
            url: 'https://api.thvli.vn/backend/cas/register/email',
            form: {
                "email": req.body.email,
                "first_name": req.body.name,
                "last_name": req.body.name,
                "password": req.body.password,
                "dob": "",
                "gender": 0,
                "phone_number": "",
                "g_recaptcha_response": ""
            }
        });
        return res.send(data);
    } catch (e) {
        res.status(400);
        return res.send(e.error);
    }
});

app.post('/backend/cas/login/email', async (req, res) => {
    try {
        let data = await request.post({
            url: 'https://api.thvli.vn/backend/cas/login/email',
            form: {
                "email": req.body.email,
                "password": req.body.password,
            }
        });
        return res.send(data);
    } catch (e) {
        res.status(400);
        return res.send(e.error);
    }
});

app.get('/backend/cas/profile', async (req, res) => {
    let data = await request.get({
        url: 'https://api.thvli.vn/backend/cas/profile',
        headers: {
            "authorization": req.get('authorization'),
        }
    });
    return res.send(data);
});

app.post('/service/token', async  (req, res) => {
    let data = await request.post({
        url: "http://45.125.208.58:5901/oauth/token",
        headers: {
            "Authorization": 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA=',
        },
        form: {
            'grant_type': "password",
            'password': "jwtpass",
            'username': "john.doe"
        }
    })

    return res.send(data);
});

app.post('/service/token', async  (req, res) => {
    let data = await request.post({
        url: "http://45.125.208.58:5901/oauth/token",
        headers: {
            "Authorization": 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA=',
        },
        form: {
            'grant_type': "password",
            'password': "jwtpass",
            'username': "john.doe"
        }
    })

    return res.send(data);
});

app.post('/service/package', async  (req, res) => {
    let data = await request.get({
        url: "http://45.125.208.58:5901/springjwt/checkpackage/" + req.body.msisdn,
        headers: {
            "Authorization": 'Bearer ' + req.body.token,
        }
    })

    return res.send(data);
});

// app.post('')
/*-----Backend Area-----*/

http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

https.createServer(options, app).listen(443);

// http.createServer(app).listen(80);
