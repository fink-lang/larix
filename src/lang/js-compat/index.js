import {add_non_separating} from '@fink/prattler/symbols';

import {prefix} from '../generic/prefix';


export const add_js_ops = (ctx)=> (
  ctx
    |> add_non_separating(prefix('new', 'new'))
    |> add_non_separating(prefix('throw', 'throw'))
);
