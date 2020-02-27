import {serialize} from './serialize';


export const print = (ast)=> serialize(ast);


export const test = (val)=> (
  val
    && val.hasOwnProperty('type')
    && val.hasOwnProperty('loc')
);


export const jest_serializer = {print, test};

