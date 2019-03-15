import {add_operator_like} from '@fink/prattler/symbols';

import {infix, infix_right} from '../generic/infix';
import {prefix} from '../generic/prefix';


const arithm = (op)=> infix(op, 'arithm');
const arithm_right = (op)=> infix_right(op, 'arithm_right');
const arithm_prefix = (op)=> prefix(op, 'arithm_prefix');


export const add_arithmetic_operators = (ctx)=> (
  ctx
    |> add_operator_like(arithm('+'))
    |> add_operator_like(arithm('-'))

    |> add_operator_like(arithm('*'))
    |> add_operator_like(arithm('/'))
    |> add_operator_like(arithm('%'))
    |> add_operator_like(arithm_right('^'))

    |> add_operator_like(arithm_prefix('-'))
);
