import {add_operator_like} from '@fink/prattler/symbols';

import {symbol} from '../symbols';
import {get_block} from '../block';


export const colon = (op, type)=> ({
  ...symbol(op),

  lbp: ()=> ()=> 0,

  nud: ()=> (ctx)=> (
    get_block(ctx, type)
  )
});


export const add_colon = (ctx)=> (
  ctx
    |> add_operator_like(colon(':', 'block'))
);

