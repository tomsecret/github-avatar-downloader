require('dotenv').config()

var request = require('request');
var fs = require('fs');
var GITHUB_USER = process.env.DB_USER;
var GITHUB_TOKEN = process.env.DB_TOKEN;
var owner = process.argv.slice(2)[0]
var repo = process.argv.slice(2)[1]

// console.log(GITHUB_USER);
// console.log(GITHUB_TOKEN);

/////check if path exists/////


function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  if (!repoOwner || ! repoName) {
    console.log('error')
  } else {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var option = {
    url: requestURL,
    headers: {'user-agent': 'something'}
  }
  request(option, cb)
}}


function downloadImageByURL(url, filePath) {
  // ...
  request.get(url)
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
}



getRepoContributors(owner, repo, function(err, result, body) {
  for (i in JSON.parse(body)) {
    // console.log(JSON.parse(body))
    var path = "./avatars/" + JSON.parse(body)[i].login + ".jpg"
    downloadImageByURL(JSON.parse(body)[i].avatar_url, path)
  }
});



