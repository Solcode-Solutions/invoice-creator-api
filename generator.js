const handlebars = require('handlebars')
const html2pdf = require('html2pdf.js')
const { jsPDF } = require("jspdf")

// new class declaration that is suitable for webpack compiler
function Generator(template, data, invoiceItems) {
    this.invoiceItems = invoiceItems
    this.template = template
    this.renderedTemplate = null
    this.data = data
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

Generator.prototype.downloadPDF = async function () {
    // function that prompts user to download a pdf
    // must be ran in a browser
    html2pdf().from(this.renderedTemplate).save()
}

Generator.prototype.downloadPDFjsPDF = async function () {
    const doc = new jsPDF()
    doc.fromHTML(this.renderedTemplate)
    doc.save()
}

module.exports = Generator;
