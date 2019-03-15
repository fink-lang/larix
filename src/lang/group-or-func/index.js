import {
  add_operator_like, symbol, add_non_binding
} from '@fink/prattler/symbols';

import {group_or_func} from './group-or-func';


export const add_group_or_func = (ctx)=> (
  ctx
    |> add_operator_like(group_or_func('('))
    |> add_non_binding(symbol(','))
    |> add_non_binding(symbol(')'))
);
