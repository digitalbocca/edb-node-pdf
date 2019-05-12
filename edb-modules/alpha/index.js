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
 * @description Ordena os nomes por ordem alfabética.
 * @since v0.15.0
 * @version v2.0.0
 *
 * @copyright (c)2019 - Estúdio Digital Bocca - https://estudiodigitalbocca.com.br/
 * @author Gabriel Bertola Bocca - gabriel at estudiodigitalbocca.com.br
 * @license MIT
 */

const orderBy = require('lodash.orderby')

module.exports = data => orderBy(data, ['name.first', 'name.last'], ['asc', 'asc'])
