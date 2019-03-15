import {add_non_binding, add_operator_like} from '@fink/prattler/symbols';
import {block} from '../generic/block';
import {infix_right} from '../generic/infix';


const assign = (op)=> infix_right(op, 'assign');


export const add_assignment_operators = (ctx)=> (
  ctx
    // TODO: not really an assignment
    |> add_non_binding(block(':'))
    |> add_operator_like(assign('='))
);
