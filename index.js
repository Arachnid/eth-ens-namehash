const sha3 = require('js-sha3').keccak_256
const uts46 = require('idna-uts46')

module.exports = function namehash (inputName) {
  // Reject empty names:
  let node = ''
  for (let i = 0; i < 32; i++) {
    node += '00'
  }

  name = normalize(inputName)

  if (name) {

    const labels = name.split('.')
    console.dir({ labels })

    for(var i = labels.length - 1; i >= 0; i--) {
      console.log("BEFORE")
      console.dir({ node, label:labels[i] })
      const labelSha = sha3(labels[i])
      console.dir({ node, label:labels[i], labelSha })
      node = sha3(node + labelSha)
      console.log("AFTER")
      console.dir({ node })
    }

    /*
    const label = labels.shift()
    const remainder = labels.join('.')

    const remainderHash = namehash(remainder).substr(2)
    const labelHash = sha3(label)
    if (remainderHash.match(/^0+$/)) {
      return '0x' + labelHash
    }
    return '0x' + sha3(remainderHash + remainderHash)
    */

  }

  return `0x${node}`
}

function concat (buffA, buffB) {

}

function normalize(name) {
  return name ? uts46.toUnicode(name, {useStd3ASCII: true, transitional: false}) : name
}
