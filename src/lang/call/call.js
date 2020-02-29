import {
  curr_loc, expression, next_is_end, assert_advance, curr_value,
  next_loc, next_is, assert_next, advance
} from '@fink/prattler';

import {symbol} from '../symbols';
import {get_block} from '../generic/block';
import {next_is_unindented} from '../indentation';
import {start_comma, end_comma} from '../comma';


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

    const arg_ctx = start_comma(ctx, 'call');
    const [args, expr_ctx] = expression(arg_ctx, 0);
    const end_ctx = end_comma(expr_ctx, 'call');
    const next_ctx = assert_advance(end_ctx, ')');
    const {end} = curr_loc(next_ctx);

    return [
      {
        type: 'call',
        callee, args: args.exprs ? args.exprs : [args],
        loc: {start, end}
      },
      next_ctx
    ];
  }
});


// export const params = (ctx)=> {
//   const expressions = [];

//   // TODO: is this the right check?
//   // eslint-disable-next-line no-constant-condition
//   while (true) {
//     const [expr, seq_ctx] = expression(ctx, 0);
//     expressions.push(expr);

//     if (!next_is(seq_ctx, ',')) {
//       return [expressions, seq_ctx];
//     }
//     ctx = assert_advance(seq_ctx, ',');
//   }
// };


export const call_no_parens = (op)=> ({
  ...symbol(op),

  led: ()=> (ctx, callee)=> {
    const {start} = callee.loc;

    const arg_ctx = start_comma(ctx, 'call-no-parens');
    const [args, body_ctx_] = expression(arg_ctx, 0);
    const next_ctx = end_comma(body_ctx_, 'call-no-parens');

    return [
      {
        type: 'call',
        callee,
        args: [...args.exprs],
        loc: {start, end: curr_loc(next_ctx).start}
      },
      next_ctx
    ];
  }
});
