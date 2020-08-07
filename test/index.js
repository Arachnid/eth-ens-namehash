const test = require('tape')
const namehash = require('../')

// Test results specified in original ENS Proposal:
// https://github.com/ethereum/EIPs/issues/137

test('empty name', (t) => {
  t.plan(1)
  const input = ''
  const expected = '0x0000000000000000000000000000000000000000000000000000000000000000'
  const output = namehash.hash(input)
  t.equal(output, expected)
})

test('empty param', (t) => {
  t.plan(1)
  const expected = '0x0000000000000000000000000000000000000000000000000000000000000000'
  const output = namehash.hash()
  t.equal(output, expected)
})

test('TLD eth', (t) => {
  t.plan(1)
  const input = 'eth'
  const expected = '0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae'
  const output = namehash.hash(input)
  t.equal(output, expected)
})

test('foo.eth', (t) => {
  t.plan(1)
  const input = 'foo.eth'
  const expected = '0xde9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f'
  const output = namehash.hash(input)
  t.equal(output, expected)
})

test('normalize ascii domain', (t) => {
  t.plan(1)
  const input = 'foo.eth' // latin chars only
  const expected = 'foo.eth'
  const output = namehash.normalize(input)
  t.equal(output, expected)
})

test('Don\'t normalize international domain', (t) => {
  t.plan(1)
  const input = 'fоо.eth' // with cyrillic 'o'
  const expected = 'fоо.eth' // with cyrillic 'o'
  const output = namehash.normalize(input)
  t.equal(output, expected)
})

test('Hash international domain', (t) => {
  t.plan(1)
  const input = 'fоо.eth' // with cyrillic 'o'
  const expected = '0x4ba2c679a3fd1e83c41104c61c8b149647e61d171805ef29338d789509c47be3'
  const output = namehash.hash(input)
  t.equal(output, expected)
})

test('Don\'t normalize international domain', (t) => {
  t.plan(1)
  const input = '🇳🇵🇳🇵🇳🇵.eth' // emoji
  const expected = '🇳🇵🇳🇵🇳🇵.eth'
  const output = namehash.normalize(input)
  t.equal(output, expected)
})

test('Namehash 🇳🇵🇳🇵🇳🇵.eth', (t) => {
  t.plan(1)
  const input = '🇳🇵🇳🇵🇳🇵.eth' // emoji https://etherscan.io/address/%F0%9F%87%B3%F0%9F%87%B5%F0%9F%87%B3%F0%9F%87%B5%F0%9F%87%B3%F0%9F%87%B5.eth
  const expected = '0xdfd7de6df978a1995e8239e596a4195d01e43878b8d66850a3e744bf5d136cf6'
  const output = namehash.hash(input)
  t.equal(output, expected)
})
