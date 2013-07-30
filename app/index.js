'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BoomerangGenerator = module.exports = function BoomerangGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BoomerangGenerator, yeoman.generators.Base);

BoomerangGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
      name: 'chapterName',
      message: 'What is your GDG Chapter Name?'
  },{
      name: 'chapterID',
      message: 'What is your GDG Chapter Google+ ID?'
  },{
      name: 'googleAPIKey',
      message: 'What is your Google API Key?\n(https://code.google.com/apis/console)'
  },{
      name: 'picasaWebID',
      message: 'What is your Picasa Web Album ID?\n(Must belong to Chapter Google+ ID)'
  }];

  this.prompt(prompts, function (props) {
      this.chapterName = props.chapterName;
      this.chapterID = props.chapterID;
      this.googleAPIKey = props.googleAPIKey;
      this.picasaWebID = props.picasaWebID;

      cb();
  }.bind(this));
};

BoomerangGenerator.prototype.app = function app() {

    this.copy('boomerang/_index.html','index.html');

    this.mkdir('css');
    this.copy('boomerang/_gdg.css', 'css/gdg.css');

    this.mkdir('images');
    this.copy('boomerang/_gdg_loading.gif', 'images/gdg_loading.gif');

    this.mkdir('js');
    this.template('boomerang/_boomerang.js', 'js/boomerang.js');

    this.mkdir('lib');
    this.copy('_angular.ui.min.js', 'lib/angular.ui.min.js');

    this.mkdir('view');
    this.copy('boomerang/_about.html','views/about.html');
    this.copy('boomerang/_events.html','views/events.html');
    this.copy('boomerang/_news.html','views/news.html');
    this.copy('boomerang/_photos.html','views/photos.html');

    this.copy('_bower.json', 'bower.json');
    this.copy('_config.json', 'config.json');
    this.copy('_package.json', 'package.json');
    this.template('Gruntfile.js', 'Gruntfile.js');
};

BoomerangGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
