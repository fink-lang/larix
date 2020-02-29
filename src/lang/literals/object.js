import {curr_loc, next_loc, next_is, expression} from '@fink/prattler';
import {advance, assert_advance} from '@fink/prattler';
import {token_error} from '@fink/prattler/errors';

import {symbol} from '../symbols';
import {start_comma, end_comma} from '../comma';
import {start_colon, end_colon} from '../colon';

const to_props = (expr)=> {
  const props = (expr.type === 'comma' ? expr.exprs : [expr])
    .map((prop)=> {
      const {type, left, right, loc} = prop;

      if (type === 'colon') {
        return {type: 'prop', key: left, value: right, loc};

      } else if (type === 'assign') {
        return {type: 'prop', key: left, value: prop, loc};
      }

      return {type: 'prop', key: prop, value: prop, loc};

    });
  return props;
};


export const object = (type, op, end_op)=> ({
  ...symbol(op),

  // eslint-disable-next-line max-statements
  nud: ()=> (ctx)=> {
    const {start} = curr_loc(ctx);

    if (next_is(ctx, end_op)) {
      const {end} = next_loc(ctx);
      return [
        {type, exprs: [], loc: {start, end}},
        advance(ctx)
      ];
    }

    const expr_ctx = start_comma(ctx, 'dict');
    const expr_ctx2 = start_colon(expr_ctx, 'dict');
    const [elems, end_ctx] = expression(expr_ctx2, 0);
    const end_op_ctx = end_comma(end_ctx);
    const end_op_ctx2 = end_colon(end_op_ctx);
    const next_ctx = assert_advance(end_op_ctx2, end_op);


    const {end} = curr_loc(next_ctx);
    return [
      {
        type,
        exprs: to_props(elems),
        loc: {start, end}
      },
      next_ctx
    ];
  }
});


