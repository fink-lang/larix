import {next_is, collect_text, expression} from '@fink/prattler';

import {symbol} from '../symbols';


export const comment = (op)=> ({
  ...symbol(op),

  nud: ()=> (ctx)=> {
    const [text, expr_ctx] = collect_text(ctx, '\n');
    const [expr, next_ctx] = expression(expr_ctx, 0);

    return [{...expr, comment: text}, next_ctx];
  }
});
