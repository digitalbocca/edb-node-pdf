'use strict'

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
 * @version v4.0.0
 * @since v0.1.0
 */

process.env.VER = 'v0.14.0'

const axios = require('axios')
const fs = require('fs')
const PDFDocument = require('pdfkit')
const SVGtoPDF = require('svg-to-pdfkit')

const capitalize = require('./edb-modules/capitalize')

const logo = require('./images/logo')
const center = { align: 'center' }
const uniqueId = () => `example-${process.env.VER}-${Date.now().toString()}`

const createDocument = async axios => {
  let users = await axios.get('https://randomuser.me/api/?nat=br&results=50')
    .then(response => {
      let usersList = response.data.results
      let usersNames = usersList.map(user => {
        let completeName = '- ' + user.name.first + ' ' + user.name.last
        return capitalize(completeName)
      })

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
