/*
 * imgur-upload
 * https://github.com/adamcoulombe/node-imgur-api
 *
 * Copyright (c) 2013 adamcoulombe
 * Licensed under the MIT license.
 */

 'use strict';

var https = require('https'),
  fs = require('fs'),
  request = require('request');
var request = request.defaults({
  json: true
});

var imgur = {
  _clientID : null,
  setClientID : function(clientID){
    this._clientID = clientID;
  },
  upload : function(_file,_cb) {
    if(this._clientID && _file){
      var options = {
        url: 'https://api.imgur.com/3/upload',
        headers: {
          'Authorization': 'Client-ID ' + this._clientID
        }
      };
      var post = request.post(options, function(err, req, body){
        console.log(body);
        _cb(err, JSON.parse(body));
      });

      var upload = post.form();
      if (_file.match(/^https?:\/\//i)) {
        upload.append('type','url');
        upload.append('image',_file);
      } else {
        upload.append('type', 'file');
        upload.append('image', fs.createReadStream(_file));
      }
    }
  }
};

exports.upload = imgur.upload;
exports.setClientID = imgur.setClientID;
