import {next_is_end, assert_advance, expression} from '@fink/prattler';


const default_seq_expr = (ctx)=> expression(ctx, 0);


export const seq = (ctx, closing_symbol, seq_expr=default_seq_expr)=> {
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
