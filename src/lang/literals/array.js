import {curr_loc} from '@fink/prattler';

import {symbol} from '../symbols';
import {seq} from '../generic/sequence';


export const array = (op)=> ({
  ...symbol(op),

  nud: ()=> (ctx)=> {
    const {start} = curr_loc(ctx);
    const [elems, next_ctx] = seq(ctx, ']');
    const {end} = curr_loc(next_ctx);

    return [{type: 'array', elems, loc: {start, end}}, next_ctx];
  }
});
