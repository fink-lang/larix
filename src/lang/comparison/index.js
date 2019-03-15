import {add_operator_like} from '@fink/prattler/symbols';
import {infix} from '../generic/infix';


const comp = (op)=> infix(op, 'comp');


export const add_comparison_operators = (ctx)=> (
  ctx
    |> add_operator_like(comp('=='))
    |> add_operator_like(comp('!='))
    |> add_operator_like(comp('>='))
    |> add_operator_like(comp('<='))
    |> add_operator_like(comp('>'))
    |> add_operator_like(comp('<'))
);
