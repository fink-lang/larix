import {next_is, expression, curr_loc, assert_next} from '@fink/prattler';

import {symbol} from '../symbols';
import {seq} from '../generic/sequence';


const value_expr = (ctx, key)=> {
  if (next_is(ctx, ':')) {
    return expression(ctx, 0);
  }

  return [key, ctx];
};


const prop_expr = (ctx)=> {
  const [key, value_ctx] = expression(ctx, 0);
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
