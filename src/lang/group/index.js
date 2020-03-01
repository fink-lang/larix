import {add_operator_like, add_non_binding} from '@fink/prattler/symbols';
import {next_is, curr_loc} from '@fink/prattler';

import {symbol} from '../symbols';
import {seq} from '../generic/sequence';
import {get_block} from '../block';


export const group = (op)=> ({
  ...symbol(op),

  nud: ()=> (ctx)=> {
    const {start} = curr_loc(ctx);
    const [exprs, next_ctx] = seq(ctx, ')');
    const {end} = curr_loc(next_ctx);

    return [{type: 'group', exprs, loc: {start, end}}, next_ctx];
  }
});


export const add_group = (ctx)=> (
  ctx
    |> add_operator_like(group('('))
    |> add_non_binding(symbol(','))
    |> add_non_binding(symbol(')'))
);
