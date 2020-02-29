import {expression, curr_loc} from '@fink/prattler';

import {symbol} from '../symbols';


export const enter_comma = (enable)=> (ctx)=> {
  const {comma_foo=[]} = ctx;
  const next_ctx = {...ctx, comma_foo: [enable, ...comma_foo]};
  return next_ctx;
};


export const exit_comma = ([result, ctx])=> {
  const {comma_foo: [, ...comma_foo]} = ctx;
  const next_ctx = {...ctx, comma_foo};

  const expressions = (
    result.type === 'comma'
      ? result.exprs
      : [result]
  );
  return [expressions, next_ctx];
};


export const comma =(op, type)=> ({
  ...symbol(op),

  lbp: (lbp)=> (ctx)=> {
    const {comma_foo=[]} = ctx;
    const [curr] = comma_foo;

    if (curr) {
      return lbp;
    }
    return 0;
  },


  led: (lbp)=> (ctx, left)=> {
    const {loc: {start}} = left;

    const [right, next_ctx] = expression(ctx, lbp);

    const exprs = (
      left.type === type
        ? [...left.exprs, right]
        : [left, right]
    );

    const {loc: {end}} = right;
    return [{type, op, exprs, loc: {start, end}}, next_ctx];
  },


  nud: (lbp)=> (ctx)=> {
    const {start} = curr_loc(ctx);

    const [right, next_ctx] = expression(ctx, lbp);

    const exprs = (
      right.type === type
        ? [null, ...right.exprs]
        : [null, right]
    );

    const {loc: {end}} = right;

    return [{type, op, exprs, loc: {start, end}}, next_ctx, next_ctx];
  }
});
