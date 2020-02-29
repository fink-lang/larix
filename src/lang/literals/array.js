import {curr_loc, next_loc, next_is, expression} from '@fink/prattler';
import {advance, assert_advance} from '@fink/prattler';
import {token_error} from '@fink/prattler/errors';

import {symbol} from '../symbols';
import {start_comma, end_comma} from '../comma';


export const array = (type, op, end_op)=> ({
  ...symbol(op),

  nud: ()=> (ctx)=> {
    const {start} = curr_loc(ctx);

    if (next_is(ctx, end_op)) {
      const {end} = next_loc(ctx);
      return [
        {type, exprs: [], loc: {start, end}},
        advance(ctx)
      ];
    }

    const expr_ctx = start_comma(ctx, type);
    const [expr, end_ctx] = expression(expr_ctx, 0);
    const end_op_ctx = end_comma(end_ctx);
    const next_ctx = assert_advance(end_op_ctx, end_op);

    const {end} = curr_loc(next_ctx);
    return [
      {
        type,
        exprs: expr.type === 'comma' ? expr.exprs : [expr],
        loc: {start, end}
      },
      next_ctx
    ];
  }
});
