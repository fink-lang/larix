import {curr_loc, curr_value, next_loc, next_is} from '@fink/prattler';
import {assert_curr, assert_next, assert_advance} from '@fink/prattler';
import {expression} from '@fink/prattler';
import {token_error} from '@fink/prattler/errors';

import {symbol} from '../symbols';

import {next_is_unindented} from '../indentation';
import {get_next_line_indentation, indentation} from '../indentation';
import {push_indentation, pop_indentation} from '../indentation';
import {enter_comma, exit_comma} from '../comma';


const default_expr = (ctx)=> expression(ctx, 0);


export const get_indentations = (ctx)=> {
  const curr_ind = indentation(ctx);
  const next_line_ind = get_next_line_indentation(ctx);

  if (next_line_ind > 0 && next_line_ind <= curr_ind) {
    // TODO: assert_next should accept a test func and custom error msg.
    throw token_error(
      `Expected indentation > ${curr_ind}:`,
      ctx.next_token, ctx
    );
  }

  return [curr_ind, next_line_ind];
};


const single_expr_block = (ctx, block_expr)=> {
  const [expr, next_ctx] = block_expr(ctx);
  return [[expr], next_ctx];
};


const indented_expr_block = (ctx, block_expr, end_ind, block_ind)=> {
  const expressions = [];

  ctx = push_indentation(ctx, block_ind);

  while (!next_is_unindented(ctx)) {
    let expr = null;
    [expr, ctx] = block_expr(ctx);
    expressions.push(expr);
  }

  const next_ctx = pop_indentation(ctx, end_ind);

  return [expressions, next_ctx];
};


export const get_block = (ctx, type='block', block_expr=default_expr)=> {
  const {start} = curr_loc(ctx);

  const [end_ind, block_ind] = get_indentations(ctx);

  const [exprs, next_ctx] = block_ind
    ? indented_expr_block(ctx, block_expr, end_ind, block_ind)
    : single_expr_block(ctx, block_expr);

  const {end} = curr_loc(next_ctx);

  return [{type, exprs, loc: {start, end}}, next_ctx];
};


export const named_block = (op, type='block', block_expr=default_expr)=> ({
  ...symbol(op),

  nud: ()=> (ctx)=> {
    const {start} = curr_loc(ctx);

    const [args, expr_ctx] = ctx
      |> enter_comma('call')
      |> ((arg_ctx)=> expression(arg_ctx, 0))
      |> exit_comma;

    const body_ctx = assert_advance(expr_ctx, ':');
    const [{exprs, loc}, next_ctx] = get_block(body_ctx, type, block_expr);

    return [
      {type, op, args, exprs, loc: {start, end: loc.end}},
      next_ctx
    ];
  }
});
