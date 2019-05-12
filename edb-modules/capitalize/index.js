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
 * @description Capitaliza as palavras do nome.
 * @since v0.12.0
 * @version v2.0.0
 *
 * @copyright (c)2019 - Estúdio Digital Bocca - https://estudiodigitalbocca.com.br/
 * @author Gabriel Bertola Bocca - gabriel at estudiodigitalbocca.com.br
 * @license MIT
 */

const capitalize = str => {
  let splitStr = str.toLowerCase().split(' ')
  let capital = splitStr.map(elem => `${elem.charAt(0).toUpperCase()}${elem.substring(1)}`)
  return capital.join(' ')
}

module.exports = capitalize
