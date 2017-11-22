/**
 * Estúdio Digital Bocca
 * https://estudiodigitalbocca.com.br
 *
 * Projeto: edb-node-pdf
 * https://github.com/digitalbocca/edb-node-pdf
 *
 * Exemplo de uso do PDFKit com NodeJS.
 *
 * @file index.js
 * @description Arquivo de Entrada. Gera um arquivo PDF com o conteúdo aqui definido.
 * @author Gabriel Bertola Bocca - gabriel at estudiodigitalbocca.com.br
 * @license MIT
 * @version v2.0.0
 * @since v0.1.0
 */

process.env.VER = 'v0.4.0'

const fs = require('fs')
const PDFDocument = require('pdfkit')
const axios = require('axios')
const SVGtoPDF = require('svg-to-pdfkit')
const logo = require('./images/logo')

const center = { align: 'center' }

const uniqueId = () => {
  let uId = 'example-' + process.env.VER + '-' + Date.now().toString()
  return uId
}

const createDocument = async (axios) => {
  let users = await axios.get('https://randomuser.me/api/?nat=br&results=50')
    .then(response => {
      let usersList = response.data.results

      // Mostrar partes dos nomes
      // usersList.forEach((element, index, array) => {
      //   console.log(element.name)
      // })

      let usersNames = usersList.map((user) => {
        return user.name.first + ' ' + user.name.last
      })

      // console.log(usersNames.toString())
      // console.log(usersNames.toString().split(','))
      // console.log(usersNames.toString().split(',').join('\n'))
      return usersNames.toString().split(',').join('\n')
    })
    .catch(err => {
      console.log(err)
      return err.code
    })

  let doc = new PDFDocument()
  doc.registerFont('Titulo', './fonts/Titillium_Web/TitilliumWeb-SemiBold.ttf')
  doc.registerFont('Corpo', './fonts/Open_Sans/OpenSans-Regular.ttf')
  doc.registerFont('EDBLogo', './fonts/Denk_One/DenkOne-Regular.ttf')
  doc.pipe(fs.createWriteStream('./examples/' + uniqueId() + '.pdf'))

  doc.font('Titulo')
     .fontSize(26)
     .text('Exemplo de uso do PDFKit com NodeJS', center)

  doc.fontSize(22)
     .text(process.env.VER, center)

  SVGtoPDF(doc, logo, 210, 400, {
    width: 200,
    height: 200
  })

  doc.font('EDBLogo')
     .fontSize(16)
     .moveDown(25)
     .text('©2017 - Estúdio Digital Bocca', center)

  doc.addPage()

  doc.font('Titulo')
     .fontSize(26)
     .text('randomuser.me', center)

  doc.font('Corpo')
     .fillColor('#000')
     .fontSize(12)
     .moveDown(5)
     .text(users)

  doc.end()
}

createDocument(axios)

/**
 * @todo Remover código comentado abaixo.
 */

// Add another page
// doc.addPage()
//    .fontSize(25)
//    .text('Este é um exemplo de desenho vetorial.', 100, 100)

// Draw a triangle
// doc.save()
//    .moveTo(100, 150)
//    .lineTo(100, 250)
//    .lineTo(200, 250)
//    .fill("#FF3300")

// Apply some transforms and render an SVG path with the 'even-odd' fill rule
// doc.scale(0.6)
//    .translate(470, -380)
//    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
//    .fill('red', 'even-odd')
//    .restore()

// Add some text with annotations
// doc.addPage()
//    .fillColor("blue")
//    .text('Conhece um link?', 100, 100)
//    .underline(100, 100, 160, 27, 'color: "#0000FF"')
//    .link(100, 100, 160, 27, 'https://estudiodigitalbocca.com.br/')

console.log('Projeto Iniciado - ', process.env.VER)
