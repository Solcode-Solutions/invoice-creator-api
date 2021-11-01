[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/solcode)

# 🧾 Invoice client-side PDF generator

This NPM package takes care of filling the HTML template (handlebars), letting you use the HTML preview, and of course, generating a PDF.

## 🤔 Why?

I've written this package due to my need for generating a custom template invoices.

## 🧰 Installation

Node
```javascript
npm i @solcode/invoice-creator-api-package
```

Yarn
```javascript
yarn add @solcode/invoice-creator-api-package
```

# 🎬 Introduction & Usage

This NPM package represents a generator class that consists of 2 main functions.


| Action        | Function           | Parameters  |
| ------------- | ------------------|  -------------|
| Constructor      | new Generator() | template, data |
| Fill template with data      | renderTemplate()      |    |
| Download PDF client-side | downloadPDF()      |   generateRenderedPdf = true  |

## 📝 Template
Template is a handlebars (or vanilla HTML5) string, but since the PDF generation is limited in some ways, there are a **few additional requirements for the HTML, such as**:

- src attribute of img tags needs to have base64 encoded data instead of URLs (otherwise, images won't load in PDFs)
- same rule applies for SVGs, they need to be inline

You can use https://www.base64-image.de for converting images to base64 data.

## 💿 Data
Data is nothing more than a simple JSON object that matches handlebars variables inside of the template.
**Eg.**:
```javascript
{{ total }} // handlebar variable inside of HTML

// and this would be the JSON
const data = {
    total: 200
}
```
## ➡️ Example
Take a look at this simple example down there.
```javascript
import Generator from '@solcode/invoice-creator-api-package'

const template = '<p>this is my {{ title }}</p>'
const data = {
    title: 'test'
}

const generatorObject = new Generator(template, data) // returns Generator object
generatorObject.renderTemplate() // renders the template and save it to generator's property renderedTemplate

// if we wanna see preview of html we can get it by
let previewHtml = generatorObject.renderedTemplate
console.log(previewHtml) // we can display it how we want then

generatorObject.downloadPDF() // generates and downloads PDF
```

## 📎 License
This piece of code is open-source under MIT license.

## 🛣 Roadmap
- creating template variables standard
- class abstraction over data json object

## 💻 Contributing
If you feel that you have a great idea which could improve this piece of code, fork it, commit your changes and make a pull request, so we can take a look at it, thanks! 😎

## ❤️ Feel free to support us
Even that we have our clients, a little support would really help us to speed up free & open-source projects like this.
###
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/solcode)
###
BTC Address
(3KkrgnJfN8zCGTqWPfjRAKLeUSPD2z79aG)
###
<img src="https://solcode.net/public/img/btc_donate.png" width=150>
