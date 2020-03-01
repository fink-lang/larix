import {
  curr_loc, expression, next_is_end, assert_advance, curr_value,
  next_loc, next_is
} from '@fink/prattler';

import {symbol} from '../symbols';
import {seq} from '../generic/sequence';
import {get_block} from '../block';
import {next_is_unindented} from '../indentation';


export const call = (op)=> ({
  ...symbol(op),

  led: ()=> (ctx, callee)=> {
    const {start} = callee.loc;
    const [args, next_ctx] = seq(ctx, ')');
    const {end} = curr_loc(next_ctx);

    return [{type: 'call', callee, args, loc: {start, end}}, next_ctx];
  }
});


export const params = (ctx)=> {
  const expressions = [];

  // TODO: is this the right check?
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const [expr, seq_ctx] = expression(ctx, 0);
    expressions.push(expr);

    if (!next_is(seq_ctx, ',')) {
      return [expressions, seq_ctx];
    }
    ctx = assert_advance(seq_ctx, ',');
  }
};


export const call_no_parens = (op)=> ({
  ...symbol(op),

  led: ()=> (ctx, callee)=> {
    const {start} = callee.loc;
    const [args, next_ctx] = params(ctx);

    return [
      {
        type: 'call',
        callee,
        args: [...args],
        loc: {start, end: curr_loc(next_ctx).start}
      },
      next_ctx
    ];
  }
});
