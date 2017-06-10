/**
 * Created by vishwas on 4/6/17.
 */

var google = require('google')

google.resultsPerPage = 25
var nextCounter = 0

module.exports = function getResults(query) {


    return new Promise(function (resolve,reject) {
        google(query, function (err, res){
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve(res.links);
        })
    })
}