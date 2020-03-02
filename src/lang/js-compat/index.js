import {
  add_operator_like, add_non_binding, add_non_separating
} from '@fink/prattler/symbols';

import {prefix} from '../generic/prefix';


export const add_js_ops = (ctx)=> (
  ctx
    |> add_operator_like(prefix('new', 'new'))
    |> add_operator_like(prefix('throw', 'throw'))
);
