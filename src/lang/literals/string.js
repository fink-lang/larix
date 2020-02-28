import {assert_advance, collect_text, curr_loc} from '@fink/prattler';
import {curr_is, next_is, next_is_end, ignored_text} from '@fink/prattler';
import {curr_value} from '@fink/prattler';

import {symbol} from '../symbols';

import {get_next_line_indentation} from '../indentation';
import {unindent_text} from '../../string-utils';


const get_text = (ctx, op)=> {
  let [{text, loc: {start, end}}, next_ctx] = collect_text(ctx, op);
  let new_text = null;

  while (text.endsWith('\\')) {
    [{text: new_text, loc: {end}}, next_ctx] = collect_text(next_ctx, op);
    text = `${text}${op}${new_text}`;
  }

  return [{text, loc: {start, end}}, next_ctx];
};


export const string = (op)=> ({
  ...symbol(op),

  nud: ()=> (ctx)=> {
    const {start} = curr_loc(ctx);
    const ind = get_next_line_indentation(ctx);

    const [text, next_ctx] = get_text(ctx, op);

    const outdented = unindent_text(text.text, ind);
    const {end} = curr_loc(next_ctx);

    return [
      {type: 'string', op, parts: [outdented], loc: {start, end}},
      next_ctx
    ];
  }
});
