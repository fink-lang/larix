import {assert_advance, collect_text, curr_loc, next_loc} from '@fink/prattler';
import {curr_is, next_is, next_is_end, ignored_text} from '@fink/prattler';
import {curr_value, expression} from '@fink/prattler';
import {token_error} from '@fink/prattler/errors';

import {symbol} from '../symbols';

import {get_next_line_indentation, indentation} from '../indentation';
import {unindent_text} from '../../string-utils';


const get_expr_part = (ctx)=> {
  const expr_ctx = assert_advance(ctx, '{');
  const [expr, next_ctx] = expression(expr_ctx, 0);

  const str_ctx = assert_advance(next_ctx, '}');
  return [expr, str_ctx];
};


const get_str_part = (ctx, op)=> {
  const [{text, loc: {start, end}}, next_ctx] = collect_text(ctx, op, '$');

  if (text.endsWith('\\')) {
    const [str_part, final_ctx] = get_str_part(next_ctx, op);

    return [{
      type: 'string:text',
      value: `${text}${op}${str_part.value}`,
      loc: {start, end: str_part.loc.end}
    }, final_ctx];
  }

  return [{type: 'string:text', value: text, loc: {start, end}}, next_ctx];
};


const get_parts = (ctx, op)=> {
  const [str_part, next_ctx] = get_str_part(ctx, op);

  if (curr_value(next_ctx) === '$') {
    const [expr_part, parts_ctx] = get_expr_part(next_ctx);
    const [parts, final_ctx] = get_parts(parts_ctx, op);
    return [[str_part, expr_part, ...parts], final_ctx];
  }

  return [[str_part], next_ctx];
};


const get_unindented_text = (ctx, op)=> {
  const {start} = curr_loc(ctx);
  const ind = get_next_line_indentation(ctx);

  const [parts, next_ctx] = get_parts(ctx, op);

  const outdented = parts.map((part, idx)=> (
    part.type === 'string:text'
      ? {...part, value: unindent_text(part.value, ind, idx === 0)}
      : part
  ));

  const {end} = curr_loc(next_ctx);

  return [
    {type: 'string', op, parts: outdented, loc: {start, end}},
    next_ctx
  ];
};


export const string = (op)=> ({
  ...symbol(op),

  lbp: (lbp)=> (ctx, left)=> {
    // default indentation behaviour
    if (next_loc(ctx).start.column <= indentation(ctx)) {
      return 0;
    }

    if (left.type === 'ident') {
      return lbp;
    }

    throw token_error(
      `Expected identifier before tagged string.`,
      ctx.next_token, ctx
    );
  },

  led: ()=> (ctx, left)=> {
    const {loc: {start}} = left;

    const [{loc: {end}, ...str}, next_ctx] = get_unindented_text(ctx, op);

    return [{...str, tag: left, loc: {start, end}}, next_ctx];
  },

  nud: ()=> (ctx)=> (
    get_unindented_text(ctx, op)
  )
});
