import {advance, next_is, curr_loc} from '@fink/prattler';

import {symbol} from '../symbols';
import {seq} from '../generic/sequence';
import {get_block} from '../generic/block';


const get_func = (ctx, args, start)=> {
  const func_ctx = advance(ctx);
  const [body, next_ctx]= get_block(func_ctx);
  const {end} = curr_loc(next_ctx);

  return [{...body, type: 'func', args, loc: {start, end}}, next_ctx];
};


export const group_or_func = (op)=> ({
  ...symbol(op),

  nud: ()=> (ctx)=> {
    const {start} = curr_loc(ctx);
    const [exprs, next_ctx] = seq(ctx, ')');
    const {end} = curr_loc(next_ctx);

    if (next_is(next_ctx, ':')) {
      return get_func(next_ctx, exprs, start);
    }

    return [{type: 'group', exprs, loc: {start, end}}, next_ctx];
  }
});
