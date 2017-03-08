// const sha3 = require('js-sha3').sha3_256
const sha3 = require('js-sha3').shake_256
const uts46 = require('idna-uts46')
// const SHA3 = require('crypto-js/sha3')

module.exports = function namehash (inputName) {
  console.log('called with ' + inputName)

  // Reject empty names:
  if (!inputName || inputName === '') {
    let result = ''
    for (let i = 0; i < 32; i++) {
      result += '00'
    }
    return result
  }

  const name = normalize(inputName)
  const split = name.split('.')

  const label = toBuffer(split.shift())
  const remainder = toBuffer(split.join('.'))

  console.log('finishing with ', typeof sha3(label))

  console.log(sha3(label))

  const result =  sha3(namehash(remainder) + sha3(label))
  console.dir(result)
  throw new Error('stop')
  return result
}

/*
function sha3 (input) {
  return SHA3(input, { outputLength: 256 })
}
*/

function normalize(name) {
  return uts46.toUnicode(name, {useStd3ASCII: true, transitional: false});
}

function toBuffer(str) {
  return new Buffer(str, 'utf8')
}
