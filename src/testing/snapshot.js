const {serialize} = require('./serialize');


const print = (ast)=> serialize(ast);

const test = (val)=> (
  val
    // eslint-disable-next-line no-prototype-builtins
    && val.hasOwnProperty('type')
    // eslint-disable-next-line no-prototype-builtins
    && val.hasOwnProperty('loc')
);

const jest_serializer = {print, test};


module.exports = {print, test, jest_serializer};
