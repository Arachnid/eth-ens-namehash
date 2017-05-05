# Eth ENS Namehash [![CircleCI](https://circleci.com/gh/flyswatter/eth-ens-namehash.svg?style=svg)](https://circleci.com/gh/flyswatter/eth-ens-namehash)

A javascript library for generating Ethereum Name Service (ENS) namehashes per [spec](https://github.com/ethereum/EIPs/issues/137).

[Available on NPM](https://www.npmjs.com/package/eth-ens-namehash)

## Installation

`npm install eth-ens namehash -S`

## Usage

```javascript
var namehash = require('eth-ens-namehash')
var hash = namehash.hash('foo.eth')
// '0xde9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f'

// Also supports normalizing strings to ENS compatibility:
var input = getUserInput()
var normalized = namehash.normalize(input)
```

