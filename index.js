/**
 * Estúdio Digital Bocca
 * https://estudiodigitalbocca.com.br
 * 
 * Projeto: edb-node-pdf
 * 
 * Exemplo de uso do PDFKit com NodeJS.
 * 
 * @file index.js
 * @description Arquivo de Entrada. Gera um arquivo PDF com o conteúdo aqui definido.
 * @author Gabriel Bertola Bocca - gabriel at estudiodigitalbocca.com.br
 * @license MIT
 * @version v0.1.0
 * @since v0.1.0
 * 
 */

// const pdf = require('pdfkit')

const fs = require('fs')
const PDFDocument = require('pdfkit')

// Create a document
doc = new PDFDocument

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('exemplo.pdf'))

// Embed a font, set the font size, and render some text
doc//.font('cursive')
   .fontSize(25)
   .text('Exemplo de uso do PDFKit com NodeJS', 100, 100)

// Add another page
doc.addPage()
   .fontSize(25)
   .text('Este é um exemplo de desenho vetorial.', 100, 100)

// Draw a triangle
doc.save()
   .moveTo(100, 150)
   .lineTo(100, 250)
   .lineTo(200, 250)
   .fill("#FF3300")

// Apply some transforms and render an SVG path with the 'even-odd' fill rule
doc.scale(0.6)
   .translate(470, -380)
   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
   .fill('red', 'even-odd')
   .restore()

// Add some text with annotations
doc.addPage()
   .fillColor("blue")
   .text('Conhece um link?', 100, 100)
   .underline(100, 100, 160, 27, 'color: "#0000FF"')
   .link(100, 100, 160, 27, 'https://estudiodigitalbocca.com.br/')

// Finalize PDF file
doc.end()

console.log('Projeto Iniciado - v0.1.0')