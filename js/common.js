/**
 * Odd bits and bobs
 */


const mf = window.mf || {}
mf.now = Date.now()

// Allow idiomatic code pattern from Golang now JS has destructuring
// e.g. let v, err = do(); if (err !== nil) { ... }
const nil = undefined
let err = nil
