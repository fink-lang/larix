import {add_operator_like} from '@fink/prattler/symbols';

import {prefix} from '../generic/prefix';


export const add_spread_operator = (ctx)=> (
  ctx
    |> add_operator_like(prefix('...', 'spread'))
);
