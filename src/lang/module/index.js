import {next_is_end, assert_advance, expression} from '@fink/prattler';
import {curr_loc} from '@fink/prattler';
import {end_token} from '@fink/prattler/tokenizer';


export const module = (ctx)=> {
  const {start} = curr_loc(ctx);
  const exprs = [];

  while (!next_is_end(ctx)) {
    const [expr, next_ctx] = expression(ctx, 0);
    exprs.push(expr);
    ctx = next_ctx;
  }

  const {end} = curr_loc(ctx);
  const next_ctx = assert_advance(ctx, end_token);

  return [{type: 'module', exprs, loc: {start, end}}, next_ctx];
};
