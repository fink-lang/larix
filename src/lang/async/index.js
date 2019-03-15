import {add_non_separating} from '@fink/prattler/symbols';

import {prefix} from '../generic/prefix';


const awaitop = (op)=> prefix(op, 'await');


export const add_async = (ctx)=> (
  ctx
    |> add_non_separating(awaitop('await'))
);
