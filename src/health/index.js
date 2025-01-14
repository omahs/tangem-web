require('dotenv').config({ path: '.env.production' })
const fs = require('fs');
const config = require("../config");
const output = Object.entries(config)
  .reduce((acc, [key,value]) => {
  if (value && (key.indexOf('URI') !== -1 || key.indexOf('URL') !== -1 ||  value.slice(0, 4) === 'http')) {
    acc[key] = value;
  }
  return acc
}, {});

fs.writeFile("public/config.json", JSON.stringify(output), function(err, result) {
  console.log(output);
});
