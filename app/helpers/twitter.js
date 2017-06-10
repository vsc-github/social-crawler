/**
 * Created by vishwas on 4/6/17.
 */

const Twitter = require('twitter');
const axios = require('axios');

// todo put the keys in enviornment variable for security reasons
const keys = {
    consumer_key: 'q26S5VGXdRhdsaODdZ58ayZyM',
    consumer_secret: 'cSh2PwovOjXSTvIylUvkrPnj05fDffKEhyOUb1AYQdJ7mb2Wk2',
    bearer_token: ''
}
let encodedKeys = new Buffer(keys.consumer_key+':'+keys.consumer_secret).toString('base64');

module.exports = function getTweets(query,options) {

    return axios({
        url: 'https://api.twitter.com/oauth2/token',
        method: 'POST',
        headers: {
            'Authorization': 'Basic '+encodedKeys,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data: 'grant_type=client_credentials'
    })
        .then( res => {
            if(res.data.token_type === 'bearer') keys.bearer_token = res.data.access_token;
            return keys;
        })
        .then(keys=>{
            const client = new Twitter(keys);
            return client.get('search/tweets', {q: query, result_type: options.type !== undefined ? options.type : 'popular'})
        })
        .then(res => {
            console.log("Tweets received");
            return res;
        })
        .catch(function (error) {
            console.log(error);
            return {
                error: error
            }
        });

}

