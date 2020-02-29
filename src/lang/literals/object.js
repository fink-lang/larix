import {curr_loc, next_loc, next_is, expression} from '@fink/prattler';
import {advance, assert_advance} from '@fink/prattler';
import {token_error} from '@fink/prattler/errors';

import {symbol} from '../symbols';
import {enter_comma, exit_comma} from '../comma';
import {enter_colon, exit_colon} from '../colon';


const to_props = (exprs)=> {
  const props = exprs.map((prop)=> {
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

  nud: ()=> (ctx)=> {
    const {start} = curr_loc(ctx);

    if (next_is(ctx, end_op)) {
      const {end} = next_loc(ctx);
      return [
        {type, exprs: [], loc: {start, end}},
        advance(ctx)
      ];
    }

    const [elems, end_ctx] = ctx
      |> enter_colon(type)
      |> enter_comma(type)
      |> ((expr_ctx)=> expression(expr_ctx, 0))
      |> exit_comma
      |> exit_colon;

    const next_ctx = assert_advance(end_ctx, end_op);

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

