import {
  add_operator_like, symbol, add_non_binding
} from '@fink/prattler/symbols';

import {array} from './array';
import {object} from './object';
import {string} from './string';
import {regex} from './regex';
import {comma} from '../comma';


const add_array_literal = (ctx)=> (
  ctx
    |> add_operator_like(array('array', '[', ']'))
    |> add_non_binding(symbol(']'))
);


const add_object_literal= (ctx)=> (
  ctx
    |> add_operator_like(object('{', '}'))
    // |> add_non_binding(symbol(','))
    |> add_non_binding(symbol('}'))
);


const add_string_literal = (ctx)=> (
  ctx
    |> add_operator_like(string('`'))
    |> add_operator_like(string(`'`))
    |> add_operator_like(string(`"`))
);


const add_regex_literal = (ctx)=> (
  ctx
    |> add_operator_like(regex('rx/'))
    // TODO: |> add_non_binding(regex('/'))
);


export const add_literals = (ctx)=> (
  ctx
    |> add_array_literal
    |> add_object_literal
    |> add_string_literal
    |> add_regex_literal
);
