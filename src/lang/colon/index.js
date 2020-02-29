import {symbol} from '../symbols';
import {get_block} from '../generic/block';
import {start_comma, end_comma} from '../comma';


export const start_colon = (ctx, parent)=> {
  const {colon_foo=[]} = ctx;
  return {...ctx, colon_foo: [parent, ...colon_foo]};
};


export const end_colon = (ctx)=> {
  const {colon_foo: [, ...colon_foo]} = ctx;
  return {...ctx, colon_foo};
};


export const colon = (op, type)=> ({
  ...symbol(op),

  lbp: (lbp)=> (ctx)=> {
    const {colon_foo=[]} = ctx;
    const [curr] = colon_foo;

    if (curr) {
      return lbp;
    }
    return 0;
  },

  led: ()=> (ctx, left)=> {
    const {loc: {start}} = left;

    const block_ctx = start_comma(ctx, false);
    const [right, end_ctx] = get_block(block_ctx);
    const next_ctx = end_comma(end_ctx);

    const {loc: {end}} = right;
    return [{type, op, left, right, loc: {start, end}}, next_ctx];
  }
});


