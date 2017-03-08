const sha3 = require('js-sha3').sha3_256
const uts46 = require('idna-uts46')

module.exports = function namehash (inputName) {
  // Reject empty names:
  if (!inputName || inputName === '') {
    let result = '0x'
    for (let i = 0; i < 32; i++) {
      result += '00'
    }
    return result
  }

  name = normalize(inputName)
  const split = name.split('.')

  const label = split.shift()
  const remainder = split.join('.')

  const remainderHash = namehash(remainder).substr(2)
  const labelHash = sha3(label)
  if (remainderHash.match(/^0+$/)) {
    return '0x' + labelHash
  }
  return '0x' + sha3(remainderHash + remainderHash)
}

function normalize(name) {
  return uts46.toUnicode(name, {useStd3ASCII: true, transitional: false})
}
