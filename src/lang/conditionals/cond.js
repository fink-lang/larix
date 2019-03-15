import {assert_advance, expression, curr_loc} from '@fink/prattler';

import {get_block, named_block} from '../generic/block';


const test_expr = (ctx)=> {
  const [test, test_ctx] = expression(ctx, 0);
  const next_ctx = assert_advance(test_ctx, ':');
  return [test, next_ctx];
};


const test_result_expr = (ctx)=> {
  const [test, result_ctx] = test_expr(ctx);
  const [result, next_ctx] = get_block(result_ctx);
  const {start} = test.loc;
  const {end} = result.loc;
  return [
    {type: 'cond:test:result', test, result, loc: {start, end}},
    next_ctx
  ];
};


export const cond = (op)=> ({
  ...named_block(op, 'cond', test_result_expr)
});
