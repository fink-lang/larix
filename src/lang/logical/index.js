import {add_operator_like} from '@fink/prattler/symbols';

import {infix_right} from '../generic/infix';
import {prefix} from '../generic/prefix';


const logical = (op)=> infix_right(op, 'logical');
const prefix_logical = (op)=> prefix(op, 'logical');


export const add_logical_operators = (ctx)=> (
  ctx
    // TODO: call them `and`, `or`, `not`
    |> add_operator_like(logical('||'))
    |> add_operator_like(logical('&&'))
    |> add_operator_like(prefix_logical('!'))
);
