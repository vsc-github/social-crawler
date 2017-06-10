const getTweets = require('../helpers/twitter');
const getGoogleResults = require('../helpers/google');


module.exports = function(app, db) {
    app.get('/hello', (req, res) => {
        // You'll create your note here.
        res.send('Hello')
    });

    app.get('/scrape/twitter/:query', (req, res) => {
       getTweets(req.params.query,req.query)
           .then(function(data){
                res.send(data);
        });
    });

    app.get('/scrape/google/:query', (req, res) => {

        getGoogleResults(req.params.query)
           .then(function(data){
                res.send(data);
        });
    });


    app.get('/scrape/all/:query', (req, res) => {

        let results = {};
        let query = req.params.query;

        getTweets(req.params.query,req.query).then(data=>{

            results.tweeets = data;

            getGoogleResults(req.params.query)
                .then(function(data){
                    results.google = data;
                    res.send(results);
                })
            })

    });

};