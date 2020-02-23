import {
  advance, curr_loc, curr_value, next_is, expression
} from '@fink/prattler';
import {add_operator_like, other_token} from '@fink/prattler/symbols';
import {symbol} from '../symbols';


const member_expr = (ctx, lbp)=> {
  // TODO: next tokens can only be a string or an identifier
  if (next_is(ctx, '`')) {
    return expression(ctx, lbp);
  }
  const key_ctx = advance(ctx);
  const loc = curr_loc(key_ctx);

  return [{type: other_token, value: curr_value(key_ctx), loc}, key_ctx];
};


const prop_access = (op, type)=> ({
  ...symbol(op),

  led: (lbp)=> (ctx, left)=> {
    const {loc: {start}} = left;
    const [right, next_ctx] = member_expr(ctx, lbp);
    const {loc: {end}} = right;

    return [{type, op, left, right, loc: {start, end}}, next_ctx];
  }
});


// TODO: right hand side cannot be any expr
export const add_prop_access = (ctx)=> (
  ctx
    |> add_operator_like(prop_access('.', 'member'))
);
