import {
  curr_loc, expression, next_is_end, assert_advance, curr_value,
  next_loc, next_is, assert_next, advance
} from '@fink/prattler';

import {symbol} from '../symbols';
import {get_block} from '../generic/block';
import {next_is_unindented} from '../indentation';
import {start_comma, end_comma, enter_comma, exit_comma} from '../comma';


export const call = (op)=> ({
  ...symbol(op),

  led: ()=> (ctx, callee)=> {
    const {start} = callee.loc;

    if (next_is(ctx, ')')) {
      const {end} = next_loc(ctx);
      return [
        {type: 'call', callee, args: [], loc: {start, end}},
        advance(ctx)
      ];
    }

    const [args, end_ctx] = ctx
      |> enter_comma('call')
      |> ((arg_ctx)=> expression(arg_ctx, 0))
      |> exit_comma;

    const next_ctx = assert_advance(end_ctx, ')');
    const {end} = curr_loc(next_ctx);

    return [
      {type: 'call', callee, args, loc: {start, end}},
      next_ctx
    ];
  }
});


export const call_no_parens = (op)=> ({
  ...symbol(op),

  led: ()=> (ctx, callee)=> {
    const {start} = callee.loc;

    const [args, next_ctx] = ctx
      |> enter_comma('call-no-parens')
      |> ((arg_ctx)=> expression(arg_ctx, 0))
      |> exit_comma;

    return [
      {type: 'call', callee, args, loc: {start, end: curr_loc(next_ctx).start}},
      next_ctx
    ];
  }
});
