import {add_non_separating} from '@fink/prattler/symbols';

import {named_block} from '../generic/block';
import {cond} from './cond';


export const add_conditionals = (ctx)=> (
  ctx
    |> add_non_separating(cond('match'))
    // TODO: should we use: |> add_non_separating(block('if:'))
    |> add_non_separating(cond('if'))
    |> add_non_separating(named_block('attempt'))
);
