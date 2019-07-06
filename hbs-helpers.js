const TEMPLATE_DEV_MODE = true;

module.exports = {
    ifEqOrDev: (a, b, opts) => {
        if(TEMPLATE_DEV_MODE) return opts.fn(this);
        return a === b
            ? opts.fn(this)
            : opts.inverse(this)
    },
    ifTrueOrDev: (a, opts) => {
        if(TEMPLATE_DEV_MODE) return opts.fn(this);
        return a === true ? opts.fn(this) : opts.inverse(this);
    },
    or: (a, b, opts) => {
        if(TEMPLATE_DEV_MODE) return opts.fn(this);
        if (a || b) {
            return opts.fn(this)
        }else{
            return opts.inverse(this)
        }
    }
}