const download = require('download-git-repo')
console.log(download);

download('direct:https://github.com/shenshuai89/logtheme.git', 'test/logtheme', { clone: true }, function (err) {
  console.log(err ? 'Error' : 'Success')
})