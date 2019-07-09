const {devDependencies, dependencies} = require('./template/package');



module.exports = {
  or: (a, b, opts) => {
    if (a || b) {
      return opts.fn(this)
    }else{
      return opts.inverse(this)
    }
  },
  // Remove testing in next version
  testing: (a, b, opts) => {
    if (a || b) {
      return opts.fn(this)
    }else{
      return opts.inverse(this)
    }
  },

  dependency: (name, comma = true) => {
    const version = ((dependencies || {})[name]) || ((devDependencies || {})[name]);
    return  `"${name}": "${version}"` + (comma ? ',' : '');
  }
}
