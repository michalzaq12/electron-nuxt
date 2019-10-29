const {devDependencies, dependencies} = require('./template/package');
const {version} = require('./package');



module.exports = {
  or: (a, b, opts) => {
    if (a || b) {
      return opts.fn(this)
    }else{
      return opts.inverse(this)
    }
  },

  and: (a, b, opts) => {
    if (a && b) {
      return opts.fn(this)
    }else{
      return opts.inverse(this)
    }
  },

  templateVersion: () => {
    return version;
  },

  dependency: (name, comma = true) => {
    const version = ((dependencies || {})[name]) || ((devDependencies || {})[name]);
    return  `"${name}": "${version}"` + (comma ? ',' : '');
  },

  if_eq: (arg1, arg2, opts) => {
    const TEST_SUITE = process.env.TEST_SUITE;
    if(TEST_SUITE){
      const cssFramewoks = ['vuetify', 'buefy', 'element'];
      const loaders = ['less', 'sass', 'stylus'];

      if(cssFramewoks.includes(arg2)) return TEST_SUITE === 'css_frameworks' ? opts.fn(this) : opts.inverse(this);
      if(loaders.includes(arg2)) return TEST_SUITE === 'loaders' ? opts.fn(this) : opts.inverse(this);
    }

    return (arg1 === arg2) ? opts.fn(this) : opts.inverse(this);
  }

}
