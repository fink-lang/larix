import {
  add_operator_like, symbol, add_non_binding
} from '@fink/prattler/symbols';

import {group} from './group-or-func';


export const add_group = (ctx)=> (
  ctx
    |> add_operator_like(group('('))
    |> add_non_binding(symbol(','))
    |> add_non_binding(symbol(')'))
);
