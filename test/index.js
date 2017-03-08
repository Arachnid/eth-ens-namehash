const test = require('tape')
const namehash = require('../')

// Test results specified in original ENS Proposal:
// https://github.com/ethereum/EIPs/issues/137

test('empty name', (t) => {
  t.plan(1)
  const input = ''
  const expected = '0x0000000000000000000000000000000000000000000000000000000000000000'
  const output = namehash(input)
  t.equal(output, expected)
})

test('empty param', (t) => {
  t.plan(1)
  const expected = '0x0000000000000000000000000000000000000000000000000000000000000000'
  const output = namehash()
  t.equal(output, expected)
})

test('TLD eth', (t) => {
  t.plan(1)
  const input = 'eth'
  const expected = '0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0'
  const output = namehash(input)
  t.equal(output, expected)
})

/*
 * Commented out because it turns out the EIP has incorrect specs:
 * https://github.com/ethereum/EIPs/issues/137#issuecomment-284918147
 *
 * The correct specs are here, but too sparse to use:
 * http://docs.ens.domains/en/latest/introduction.html#namehash
test('foo.eth', (t) => {
  t.plan(1)
  const input = 'foo.eth'
  const expected = '0xde9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f'
  const output = namehash(input)
  t.equal(output, expected)
})
*/
