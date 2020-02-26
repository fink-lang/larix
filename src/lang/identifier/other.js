import {
  curr_value, curr_loc, expression, next_matches, next_loc
} from '@fink/prattler';
import {other_token, next_lbp} from '@fink/prattler/symbols';

import {symbol} from '../symbols';


// TODO: allow identifiers being infix operators
const infix_led = (lbp)=> (ctx, left)=> {
  const type = 'infix';
  const op = curr_value(ctx);

  const {loc: {start}} = left;
  // TODO: precedence left to right (+1) or right to left (-1)
  const [right, next_ctx] = expression(ctx, lbp+1);
  const {loc: {end}} = right;

  return [{type, op, left, right, loc: {start, end}}, next_ctx];
};


export const other = ()=> ({
  ...symbol(other_token),

  nud: ()=> (ctx)=> {
    const value = curr_value(ctx);
    const loc = curr_loc(ctx);

    // TODO: use 'other' instead of other_token
    return [{type: other_token, value, loc}, ctx];
  },

  led: (lbp)=> infix_led(lbp-1)
});
