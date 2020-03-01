import {add_non_separating} from '@fink/prattler/symbols';

import {named_block} from '../block';


export const add_func = (ctx)=> (
  ctx
   |> add_non_separating(named_block('fn'))
);
