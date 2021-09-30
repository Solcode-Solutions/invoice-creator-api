var generator = require('./generator.js');

var generatorClass = new generator("<p>the test template goes there PARAMETER_NAME</p>", {PARAMETER_NAME: 'solcode'}, {})
generatorClass.fillTemplate();

console.info(generatorClass.template);
