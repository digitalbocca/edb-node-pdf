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
 * @version v3.2.0
 * @since v0.1.0
 */

process.env.VER = 'v0.8.0'

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

// Implementação com for

// const toUpper = str => {
//   let splitStr = str.toLowerCase().split(' ')
//   for (let i = 0; i < splitStr.length; i++) {
//     splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
//   }
//   return splitStr.join(' ')
// }

// Implementação com map

const toUpperFunctional = str => {
  let splitStr = str.toLowerCase().split(' ')
  let capital = splitStr.map(elem => {
    return elem.charAt(0).toUpperCase() + elem.substring(1)
  })
  return capital.join(' ')
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
        // Implementação com for

        // let completeName = '- ' + toUpper(user.name.first) + ' ' + toUpper(user.name.last)
        // return completeName

        // Implementação com map

        let completeName = '- ' + user.name.first + ' ' + user.name.last
        return toUpperFunctional(completeName)
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
     .text('©2018 - Estúdio Digital Bocca', center)

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

console.log('Projeto Iniciado - ', process.env.VER)
