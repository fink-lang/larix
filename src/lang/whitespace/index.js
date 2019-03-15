import {add_whitespace} from '@fink/prattler/symbols';


export const add_whitespace_tokens = (ctx)=> (
  ctx
    |> add_whitespace(' ')
    |> add_whitespace('\t')
    |> add_whitespace('\n')
);
