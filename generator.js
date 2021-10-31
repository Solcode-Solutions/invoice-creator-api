const handlebars = require('handlebars')
const html2pdf = require('html2pdf.js')
const { jsPDF } = require("jspdf")

/**
 * New class declaration that is supported by WebPack.
 *
 * Generator class that takes care of filling data into template and
 * generating a client-side PDF.
 *
 * TO-DO: make support for server-side.
 *
 * @param template
 * @param data
 * @constructor
 */
function Generator(template, data) {
    this.template = template
    this.renderedTemplate = null
    this.data = data
}

/**
 * Simple getter for template property.
 * @returns {*}
 */
Generator.prototype.getTemplate = function () {
    return this.template
}

/**
 * Simple getter for data property.
 * @returns {*}
 */
Generator.prototype.getData = function () {
    return this.data
}

/**
 * Simple function that fills HTML (handlebars) template with provided data.
 */
Generator.prototype.renderTemplate = function () {
    let templateHandlebars = handlebars.compile(this.template)
    this.renderedTemplate = templateHandlebars(this.data)
}

/**
 * Function that generates and downloads PDF created from a HTML template.
 *
 * generateRenderedPdf is a switch that generates rendered template or non-filled template.
 *
 * @returns {Promise<void>}
 */
Generator.prototype.downloadPDF = async function (generateRenderedPdf = true) {
    // function that prompts user to download a pdf
    // must be ran in a browser
    if (generateRenderedPdf)
        html2pdf().from(this.renderedTemplate).save()
    else
        html2pdf().from(this.template).save()
}

module.exports = Generator;
