import {
  next_is, expression, curr_loc, assert_next, advance, curr_value,
  assert_advance
} from '@fink/prattler';

import {symbol} from '../symbols';
import {seq} from '../generic/sequence';
import {other_token} from '@fink/prattler/symbols';


const value_expr = (ctx, key)=> {
  if (next_is(ctx, ':')) {
    return expression(ctx, 0);
  }

  return [key, ctx];
};


const key_expr = (ctx)=> {
  if (next_is(ctx, '`') || next_is(ctx, '...')) {
    return expression(ctx, 0);
  }

  const key_ctx = advance(ctx);
  const loc = curr_loc(key_ctx);

  return [{type: other_token, value: curr_value(key_ctx), loc}, key_ctx];
};


const prop_expr = (ctx)=> {
  const [key, value_ctx] = key_expr(ctx);
  const [value, next_ctx] = value_expr(value_ctx, key);

  const {start} = key.loc;
  const {end} = value.loc;

  return [{type: 'prop', key, value, loc: {start, end}}, next_ctx];
};


export const object = (op)=> ({
  ...symbol(op),

  nud: ()=> (ctx)=> {
    const {start} = curr_loc(ctx);
    const [props, next_ctx] = seq(ctx, '}', prop_expr);
    const {end} = curr_loc(next_ctx);

    return [{type: 'object', props, loc: {start, end}}, next_ctx];
  }
});
