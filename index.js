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
 * @version v1.0.0
 * @since v0.1.0
 * 
 */

const fs = require('fs')
const PDFDocument = require('pdfkit')
const axios = require('axios')

const uniqueId = () => {
  let uId  = 'example' + Date.now().toString()
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

  doc = new PDFDocument
  doc.pipe(fs.createWriteStream('./examples/' + uniqueId() + '.pdf'))
  doc//.font('cursive')
  .fontSize(25)
  .text('Exemplo de uso do PDFKit com NodeJS', 100, 100)

  // Adicionar página de usuários (random user)
  doc.addPage().text('randomuser.me')
  doc.text(' ')
  doc.text(users)
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

console.log('Projeto Iniciado - v0.3.0')