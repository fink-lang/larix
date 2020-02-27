import {serialize} from './serialize';


export const print = (ast)=> serialize(ast);


export const test = (val)=> (
  val
    // eslint-disable-next-line no-prototype-builtins
    && val.hasOwnProperty('type')
    // eslint-disable-next-line no-prototype-builtins
    && val.hasOwnProperty('loc')
);


export const jest_serializer = {print, test};

