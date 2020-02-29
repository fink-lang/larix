import {curr_loc, next_loc, next_is, expression} from '@fink/prattler';
import {advance, assert_advance} from '@fink/prattler';
import {token_error} from '@fink/prattler/errors';

import {symbol} from '../symbols';
import {enter_comma, exit_comma} from '../comma';


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

    const [exprs, end_ctx] = ctx
      |> enter_comma('call')
      |> ((arg_ctx)=> expression(arg_ctx, 0))
      |> exit_comma;

    const next_ctx = assert_advance(end_ctx, end_op);

    const {end} = curr_loc(next_ctx);
    return [{type, exprs, loc: {start, end}}, next_ctx];
  }
});
