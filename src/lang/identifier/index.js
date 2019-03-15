import {add_non_separating} from '@fink/prattler/symbols';

import {other} from './other';


export const add_identifier = (ctx)=> (
  ctx
    |> add_non_separating(other())
);
