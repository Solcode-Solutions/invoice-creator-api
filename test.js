const generator = require('./generator.js');
const fs = require("fs")

async function test () {
    // loads test template
    const content =  fs.readFileSync("testTemplate.html").toString()

    var generatorClass = new generator(content, {total: 'test'}, {})

    generatorClass.renderTemplate();
    return await generatorClass.downloadPDF();
}

console.info(test().then(test => console.info(test)));

