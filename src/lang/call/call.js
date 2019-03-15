import {curr_loc} from '@fink/prattler';

import {symbol} from '../symbols';
import {seq} from '../generic/sequence';


export const call = (op)=> ({
  ...symbol(op),

  led: ()=> (ctx, callee)=> {
    const {start} = callee.loc;
    const [args, next_ctx] = seq(ctx, ')');
    const {end} = curr_loc(next_ctx);

    return [{type: 'call', callee, args, loc: {start, end}}, next_ctx];
  }
});
