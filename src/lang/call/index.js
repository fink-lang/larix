import {
  add_operator_like, symbol, add_non_binding
} from '@fink/prattler/symbols';

import {infix} from '../generic/infix';
import {call} from './call';


const pipe = (op)=> infix(op, 'pipe');


export const add_call_operators = (ctx)=> (
  ctx
    |> add_operator_like(pipe('|'))

    |> add_operator_like(call('('))
    |> add_non_binding(symbol(','))
    |> add_non_binding(symbol(')'))
);
