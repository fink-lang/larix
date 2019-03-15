import {next_is, collect_text, expression} from '@fink/prattler';

import {symbol} from '../symbols';


export const doc_comment = (op)=> ({
  ...symbol(op),

  nud: ()=> (ctx)=> {
    const [body, expr_ctx] = collect_text(ctx, '---');
    const [expr, next_ctx] = expression(expr_ctx, 0);

    return [{...expr, comment: body}, next_ctx];
  }
});
