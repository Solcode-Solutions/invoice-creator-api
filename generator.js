class Generator {

    invoiceItems;
    template;
    options;

    // main constructor
    constructor (template, options, invoiceItems) {
        this.template = template;
        this.options = options;
        this.invoiceItems = invoiceItems;
    }

    // getter for template
    get template () {
        return this.template;
    }

    // getter for options
    get options () {
        return this.options;
    }

    // getter for invoice items
    get invoiceItems () {
        return this.invoiceItems;
    }

    // method that fills the template
    fillTemplate () {
        for (const key in this.options) {
            this.template = this.template.replace(key, this.options[key]);
        }
    }
}

module.exports = Generator;
