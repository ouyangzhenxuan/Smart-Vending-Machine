const routes = require('express').Router();
const pdf = require('html-pdf');

const pdfTemplate = require('../document/pdfcontent.js')


// post routes - PDF generatrion and fetching of the data
routes.post('/create-pdf', (request, response)=>{
    console.log('generate pdf');
    console.log(request.body.name);
    pdf.create(pdfTemplate(request.body), {}).toFile('./download/result.pdf');
});

// GET - send the pdf to client
routes.get('/fetch-pdf', (request, response)=>{
    response.sendFile('result.pdf', {root: './download'});
})

module.exports = routes;