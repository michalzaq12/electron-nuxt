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
    console.log(version);
    const line =  `"${name}": "${version}"` + (comma ? ',' : '');
    console.log(line);
    return line;
  }
}
