const puppeteer = require('puppeteer')
const handlebars = require('handlebars')
const fs = require("fs")

// new class declaration that is suitable for webpack compiler
function Generator(template, data, invoiceItems) {
    this.invoiceItems = invoiceItems
    this.template = template
    this.renderedTemplate = null
    this.data = data
    this.pdfOptions = {
        format: 'A4',
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
            top: "40px",
            bottom: "100px"
        },
        printBackground: true,
        path: 'invoice.pdf'
    };
}

Generator.prototype.getTemplate = function () {
    return this.template
}

Generator.prototype.getData = function () {
    return this.data
}

Generator.prototype.renderTemplate = function () {
    let templateHandlebars = handlebars.compile(this.template)
    this.renderedTemplate = templateHandlebars(this.data)
}

Generator.prototype.generatePDF = async function () {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(`data:text/html;charset=UTF-8,${encodeURIComponent(this.renderedTemplate)}`, {
        waitUntil: 'networkidle0'
    });
    await page.pdf(this.pdfOptions);
    await browser.close();

    return this.pdfOptions.path
}

module.exports = Generator;
