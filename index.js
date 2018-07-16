// connect to database
var mongo = require('./config/mongo.js');

// include Express js
var express = require('express');
var app = module.exports = express();

// include body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// include cors
var cors = require('cors');
app.use(cors());

// include mongoose schema and model
var UrlModel = require('./schemas/urlSchema.js');
var regex = require('./config/regex.js');

app.use(express.static('public'));

// Get the long url
app.get('/new/:urlToShorten(*)', (req, res) => {
    const urlToShorten = req.params.urlToShorten;
    if (regex.test(urlToShorten) === true) {
        const short = Math.floor(Math.random() * 100000).toString();
        var data = new UrlModel({
            longUrl: urlToShorten,
            shortUrl: short
        });
        data.save(err => {
            if (err) throw err;
            console.log('Info saved')
        })
        return res.json(data);
    } else {
        var data = new UrlModel({
            longUrl: urlToShorten,
            shortUrl: "invalid url"
        });
        data.save(err => {
            if (err) throw err;
            console.log('invalid url')
        })
        return res.json(data);
    }
});

app.get('/:urlToForward', (req, res, next) => {
    var { urlToForward } = req.params;
    UrlModel.findOne({ shortUrl: urlToForward }, (err, data) => {
        console.log("ovo su podaci",data);
        if (err) {
            throw err
        } else {
            var regExsp = new RegExp("^(http|https)://");
            var testStr = data.longUrl;
            console.log(regExsp.test(testStr), "Testiranje long urla");
            if (regExsp.test(testStr) === true) {
                console.log('kratki link vodi na :' + testStr);
                res.redirect(testStr);
            } else {
                
                res.redirect('http://' + testStr);
            }
        }
    }
    );
});

    app.listen(process.env.PORT || 3000, () => {
        console.log('Open localhost://3000 or localhost://' + process.env.PORT);
    });