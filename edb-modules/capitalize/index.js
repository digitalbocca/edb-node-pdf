'use strict'

const capitalize = str => {
  let splitStr = str.toLowerCase().split(' ')
  let capital = splitStr.map(elem => `${elem.charAt(0).toUpperCase()}${elem.substring(1)}`)
  return capital.join(' ')
}

module.exports = capitalize
