import {next_is, next_is_end, assert_next} from '@fink/prattler';
import {curr_loc, curr_value} from '@fink/prattler';
import {advance, assert_advance, expression} from '@fink/prattler';

import {symbol} from '../symbols';
import {enter_comma, exit_comma} from '../comma';


export const seq = (ctx, closing_symbol, seq_expr)=> {
  const expressions = [];

  while (!next_is_end(ctx, closing_symbol)) {
    const [expr, seq_ctx] = seq_expr(ctx);
    expressions.push(expr);

    ctx = next_is_end(seq_ctx, closing_symbol)
      ? seq_ctx
      : assert_advance(seq_ctx, ',');
  }

  const next_ctx = assert_advance(ctx, closing_symbol);
  return [expressions, next_ctx];
};


const value_expr = (ctx, key)=> {
  if (next_is(ctx, ':')) {
    return expression(ctx, 0);
  }

  return [key, ctx];
};


const default_assignment = (ctx, left)=> {
  const expr_ctx = advance(ctx);

  const [right, next_ctx] = expression(expr_ctx, 0);
  const {loc: {end}} = right;

  // TODO: assign and this func should use common code
  return [
    {type: 'assign', op: '=', left, right, loc: {...left.loc, end}},
    next_ctx
  ];
};


const key_expr = (ctx)=> {
  if (next_is(ctx, '`') || next_is(ctx, '...')) {
    return expression(ctx, 0);
  }

  const key_ctx = advance(ctx);
  const loc = curr_loc(key_ctx);
  const key = {type: 'ident', value: curr_value(key_ctx), loc};

  if (next_is(key_ctx, '=')) {
    return default_assignment(key_ctx, key);
  }

  return [key, key_ctx];
};


const prop_expr = (ctx)=> {
  const [key_or_default, value_ctx] = key_expr(ctx);
  const [value, next_ctx] = value_expr(value_ctx, key_or_default);

  const key = (
    key_or_default.type === 'assign'
      ? key_or_default.left
      :key_or_default
  );

  const {start} = key.loc;
  const {end} = value.loc;

  // TODO: should `key, value` just be `left, right` to simplify matters
  return [{type: 'prop', key, value, loc: {start, end}}, next_ctx];
};


export const object = (op)=> ({
  ...symbol(op),

  nud: ()=> (ctx)=> {
    const {start} = curr_loc(ctx);
    const [[exprs], next_ctx] = ctx
      |> enter_comma(false)
      |> ((seq_ctx)=> seq(seq_ctx, '}', prop_expr))
      |> exit_comma;

    const {end} = curr_loc(next_ctx);

    return [{type: 'object', exprs, loc: {start, end}}, next_ctx];
  }
});
