import {curr_is, curr_value, curr_loc} from '@fink/prattler';
import {next_is, next_is_end, assert_next} from '@fink/prattler';
import {assert_advance, advance, collect_text} from '@fink/prattler';

import {symbol} from '../symbols';
import {get_block} from '../block';
import {token_error} from '@fink/prattler/errors';


const jsx_expr_container = (ctx)=> {
  const [expr, end_ctx] = get_block(ctx);
  const next_ctx = assert_advance(end_ctx, '}');

  return [{type: 'jsx-expr-container', expr, loc: expr.loc}, next_ctx];
};


const jsx_txt = (ctx)=> {
  const [text, next_ctx] = collect_text(ctx, '</', '<', '{');

  return [{type: 'jsx-text', value: text.text, loc: text.loc}, next_ctx];
};


// eslint-disable-next-line max-statements
const jsx_body = (name, ctx)=> {
  const children = [];

  while (!next_is_end(ctx)) {
    let expr = null;
    [expr, ctx] = jsx_txt(ctx);
    if (expr.value !== '') {
      children.push(expr);
    }

    if (curr_is(ctx, '<')) {
      // eslint-disable-next-line no-use-before-define
      [expr, ctx] = jsx_elem(ctx);
      children.push(expr);

    } else if (curr_is(ctx, '{')) {
      [expr, ctx] = jsx_expr_container(ctx);
      children.push(expr);

    } else { // TODO:? if (curr_is(ctx, '</')) {
      break;
    }
  }

  // TODO: ? ctx = assert_advance(ctx, '</');
  ctx = assert_advance(ctx, name);
  ctx = assert_advance(ctx, '>');

  return [children, ctx];
};


const jsx_string_val = (ctx)=> {
  const [value, next_ctx] = collect_text(ctx, curr_value(ctx));

  return [{type: 'jsx-string', value: value.text, loc: value.loc}, next_ctx];
};


const jsx_attr_value = (ctx)=> {
  if (next_is(ctx, '{')) {
    return jsx_expr_container(advance(ctx));

  } else if (next_is(ctx, `"`) || next_is(ctx, `'`)) {
    return jsx_string_val(advance(ctx));
  }

  // TODO: multiple values not supported by assert
  assert_next(ctx, '{', '"', "'");
};


const jsx_attr = (ctx)=> {
  const name = curr_value(ctx);
  const {start} = curr_loc(ctx);

  const [value, next_ctx] = next_is(ctx, '=')
    ? jsx_attr_value(advance(ctx))
    : [null, ctx];

  const {end} = curr_loc(next_ctx);
  return [{type: 'jsx-attr', name, value, loc: {start, end}}, next_ctx];
};


const jsx_props = (ctx)=> {
  const props = [];

  while (!(next_is_end(ctx, '/>') || next_is_end(ctx, '>'))) {
    let prop = null;
    [prop, ctx] = jsx_attr(advance(ctx));
    props.push(prop);
  }

  return [props, ctx];
};


const body_or_end_elem = (ctx, name)=> {
  if (next_is(ctx, '>')) {
    const [children, next_ctx] = jsx_body(name, advance(ctx));
    return [false, children, next_ctx];
  }

  return [true, [], assert_advance(ctx, '/>')];
};


const jsx_elem = (ctx)=> {
  const {start} = curr_loc(ctx);
  ctx = advance(ctx);
  const name = curr_value(ctx);
  const [props, body_ctx] = jsx_props(ctx);
  const [self_closing, children, next_ctx] = body_or_end_elem(body_ctx, name);
  const {end} = curr_loc(next_ctx);

  return [
    {type: 'jsx-elem', name, props, children, self_closing, loc: {start, end}},
    next_ctx
  ];
};


export const jsx = (op)=> ({
  ...symbol(op),

  nud: ()=> (ctx)=> jsx_elem(ctx)
});
