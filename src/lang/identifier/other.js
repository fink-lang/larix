import {
  curr_value, curr_loc, expression, next_matches, next_loc, next_is,
  assert_advance, advance
} from '@fink/prattler';
import {token_error} from '@fink/prattler/errors';
import {other_token, next_lbp} from '@fink/prattler/symbols';

import {symbol} from '../symbols';


const infix_led = (lbp)=> (ctx, left)=> {
  const type = 'infix';
  const op = curr_value(ctx);

  const {loc: {start}} = left;
  // precedence left to right (lbp + 1) or right to left (lbp - 1)
  const [right, next_ctx] = expression(ctx, lbp + 1);
  const {loc: {end}} = right;

  return [{type, op, left, right, loc: {start, end}}, next_ctx];
};


const looks_like_num = (ctx)=> {
  const value = curr_value(ctx);
  return value.match(/^[0-9]+.*/) !== null;
};


// eslint-disable-next-line max-statements
const number = (ctx)=> {
  let value = curr_value(ctx);
  const {start} = curr_loc(ctx);

  if (next_is(ctx, '.')) {
    ctx = advance(ctx);
    value += curr_value(ctx);
    ctx = advance(ctx);
    value += curr_value(ctx);

    if (value.endsWith('e')) {
      ctx = advance(ctx);
      value += curr_value(ctx);

      if (curr_value(ctx) === '+' || curr_value(ctx) === '-') {
        ctx = advance(ctx);
        value += curr_value(ctx);
      } else {
        throw token_error(
          `Expected exponent:`,
          ctx.curr_token, ctx
        );
      }
    }
  }

  const {end} = curr_loc(ctx);
  return [{type: 'number', value, loc: {start, end}}, ctx];
};


export const other = ()=> ({
  ...symbol(other_token),

  nud: ()=> (ctx)=> {
    const value = curr_value(ctx);
    const loc = curr_loc(ctx);

    if (looks_like_num(ctx)) {
      return number(ctx);
    }

    return [{type: 'ident', value, loc}, ctx];
  },

  led: (lbp)=> infix_led(lbp-1)
});
