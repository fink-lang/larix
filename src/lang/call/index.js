import {
  add_operator_like, symbol, add_non_binding, add_non_separating
} from '@fink/prattler/symbols';

import {call, call_no_parens} from './call';
import {named_block} from '../generic/block';


export const add_call_operators = (ctx)=> (
  ctx
    |> add_operator_like(call('('))
    |> add_non_binding(symbol(')'))
    |> add_operator_like(call_no_parens('::'))
    |> add_non_separating(named_block('pipe'))

);
