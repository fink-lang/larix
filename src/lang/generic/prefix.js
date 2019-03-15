import {expression, curr_loc} from '@fink/prattler';

import {symbol} from '../symbols';


export const prefix = (op, type)=> ({
  ...symbol(op),

  nud: (lbp)=> (ctx)=> {
    const {start} = curr_loc(ctx);
    const [right, next_ctx] = expression(ctx, lbp);
    const {end} = right.loc;

    return [{type, op, right, loc: {start, end}}, next_ctx];
  }
});
