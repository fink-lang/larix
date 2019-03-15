import {init_parser, start_parser, expression} from '@fink/prattler';

import {init_language} from './lang';
import {module} from './lang/module';


const init = (ctx)=> (
  ctx
    |> init_parser
    |> init_language
    |> start_parser
);


export const parse_expr = (code)=> {
  const ctx = init({code});
  const [expr] = expression(ctx, 0);
  return expr;
};


export const parse = (code)=> {
  const ctx = init({code});
  const [ast] = module(ctx);
  return ast;
};
