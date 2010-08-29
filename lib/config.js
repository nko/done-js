var fs = require('fs');

/**
 * Load site-wide configurations from JSON files.  Will load
 * all.json, followed by the xx.json, where xx is the environment
 * configured in express.  The xx.json file will override any 
 * settings found in all.json.
 */
var settings = {};
exports.settings = settings;

var parseConfig = function(env) {
  // Configuration files are loaded synchronously once 
  // config.load() is called (we just do it once, so don't
  // bother with async complexity)
  var file = fs.readFileSync('config/' + env + '.json', encoding='utf8')
  
  // copy the config file into settings (allows easy overwriting)
  data = JSON.parse(file)
  for (key in data) {
    settings[key] = data[key];
  }
};

var load = function(env){
  // load all.json first
  parseConfig('all');

  // load the `env`.json second, allowing it to overwrite all.json
  parseConfig(env);
};
exports.load = load;