import {expression, curr_loc} from '@fink/prattler';

import {symbol} from '../symbols';


const infix_led = (type, op, lbp)=> (ctx, left)=> {
  const {loc: {start}} = left;
  const [right, next_ctx] = expression(ctx, lbp);
  const {loc: {end}} = right;

  return [{type, op, left, right, loc: {start, end}}, next_ctx];
};


export const infix = (op, type)=> ({
  ...symbol(op),

  led: (lbp)=> infix_led(type, op, lbp)
});


export const infix_right = (op, type)=> ({
  ...symbol(op),

  led: (lbp)=> infix_led(type, op, lbp - 1)
});

