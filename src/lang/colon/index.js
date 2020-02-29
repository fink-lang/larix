import {add_operator_like} from '@fink/prattler/symbols';

import {symbol} from '../symbols';
import {get_block} from '../generic/block';
import { enter_comma, exit_comma } from '../comma';


export const enter_colon = (enable)=> (ctx)=> {
  const {colon_foo=[]} = ctx;
  const next_ctx = {...ctx, colon_foo: [enable, ...colon_foo]};
  return next_ctx;
};


export const exit_colon = ([result, ctx])=> {
  const {colon_foo: [, ...colon_foo]} = ctx;
  const next_ctx = {...ctx, colon_foo};

  return [result, next_ctx];
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

    const [[right], next_ctx] = ctx
      |> enter_colon(false)
      |> enter_comma(false)
      |> get_block
      |> exit_comma
      |> exit_colon;

    const {loc: {end}} = right;
    return [{type, op, left, right, loc: {start, end}}, next_ctx];
  },

  nud: ()=> (ctx)=> (
    get_block(ctx, 'block')
  )
});


export const add_colon = (ctx)=> (
  ctx
    |> add_operator_like(colon(':', 'colon'))
);

