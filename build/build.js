const fs = require('fs')
const execSync = require('child_process').execSync
const inInstall = require('in-publish').inInstall
const prettyBytes = require('pretty-bytes')
const gzipSize = require('gzip-size')

if (inInstall())
  process.exit(0)

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  })

console.log('Building CommonJS modules ...')

exec('babel modules -d cjs --ignore __tests__', {
  BABEL_ENV: 'cjs'
})

console.log('\nBuilding ES modules ...')

exec('babel modules -d es --ignore __tests__', {
  BABEL_ENV: 'es'
})

// console.log('\nBuilding comm100-react-components.js ...')

// exec('webpack modules/index.js umd/comm100-react-components.js', {
//   NODE_ENV: 'production'
// })

// console.log('\nBuilding comm100-react-components.min.js ...')

// exec('webpack -p modules/index.js umd/comm100-react-components.min.js', {
//   NODE_ENV: 'production'
// })

// const size = gzipSize.sync(
//   fs.readFileSync('umd/comm100-react-components.min.js')
// )

//console.log('\ngzipped, the UMD build is %s', prettyBytes(size))
