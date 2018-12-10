'use strict'

const _ = require('lodash')

module.exports = data => _.orderBy(data, ['name.first', 'name.last'], ['asc', 'asc'])
