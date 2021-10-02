const puppeteer = require('puppeteer')
const handlebars = require('handlebars')
const fs = require("fs")

class Generator {

    invoiceItems;
    template;
    renderedTemplate;
    data;

    // default settings for PDF
    pdfOptions = {
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

    // main constructor
    constructor (template, data, invoiceItems, pdfOptions = {}) {
        this.template = template;
        this.data = data;
        this.invoiceItems = invoiceItems;

        // if pdf options are not being set, set the default options
        if (pdfOptions.length > 0)
            this.pdfOptions = pdfOptions
    }

    // getter for template
    get template () {
        return this.template;
    }

    get renderedTemplate () {
        return this.renderTemplate();
    }

    // getter for options
    get data () {
        return this.data;
    }

    // getter for invoice items
    get invoiceItems () {
        return this.invoiceItems;
    }

    // method that renders template
    renderTemplate () {
        let templateHandlebars = handlebars.compile(this.template)
        this.renderedTemplate = templateHandlebars(this.data)
    }

    // method that fills the template
    // OBSOLETE
    fillTemplate () {
        // custom system
        for (const key in this.data) {
            this.template = this.template.replace(key, this.data[key]);
        }
    }
    // OBSOLETE

    // method that generate a PDF from a html template
    // returns PDF path
    async generatePDF (returnBuffer = false) {
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
}

module.exports = Generator;
