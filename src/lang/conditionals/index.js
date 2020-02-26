import {add_non_separating} from '@fink/prattler/symbols';
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
    // TODO: improve type
    {type: 'cond:test:result', test, result, loc: {start, end}},
    next_ctx
  ];
};


export const add_conditionals = (ctx)=> (
  ctx
    |> add_non_separating(named_block('match', 'cond', test_result_expr))
    |> add_non_separating(named_block('attempt', 'attempt'))
);
