// const configOptions = {
//   startup: {
//     ready: () => {
//       console.log('MathJax is loaded, but not yet initialized')
//       MathJax.startup.defaultReady()
//       console.log('MathJax is initialized, and the initial typeset is queued')
//       MathJax.startup.promise.then(() => {
//         console.log('MathJax initial typesetting complete')
//       })
//     },
//   },
// }

// export default function () {
//   return (window.MathJax = { configOptions })
// }

// const MathJax = {
//   loader: {
//     paths: {
//       mathjax: 'mathjax-full/es5',
//       custom: '.',
//     },
//     source: argv.dist
//       ? {}
//       : require('mathjax-full/components/src/source.js').source,
//     require: require,
//     load: ['input/tex', 'adaptors/liteDOM', '[custom]/mml'],
//   },
//   tex: { packages: argv.packages.replace('*', PACKAGES).split(/\s*,\s*/) },
//   startup: {
//     pageReady: () => {
//       MathJax.tex2mmlPromise(argv._[0] || '', { display: !argv.inline })
//         .then((mml) => console.log(mml))
//         .catch((err) => console.log(err))
//     },
//   },
// }
