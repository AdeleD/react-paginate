'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');

function generateData() {
  var comments = [];

  for (var i = 0; i < 200; i++) {
    comments.push({
      username: util.format('user-%s', i),
      comment: util.format('This is the comment #%d', i),
    });
  }

  var dataDir = path.join(__dirname, 'data');
  try {
    fs.mkdirSync(dataDir);
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }
  fs.writeFileSync(
    path.join(dataDir, 'data.json'),
    JSON.stringify(comments, null, 2)
  );
}

generateData();
