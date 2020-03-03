import {assert_advance, advance} from '@fink/prattler';
import {next_is, next_is_end, next_matches, next_loc} from '@fink/prattler';
import {curr_is, curr_value, curr_loc} from '@fink/prattler';

import {unindent_text} from '../../string-utils';
import {symbol} from '../symbols';
import {get_next_line_indentation, curr_next_adjecent} from '../indentation';
import {get_text} from './string';


const get_flags = (ctx)=> {
  if (curr_next_adjecent(ctx) && next_matches(ctx, /[gimsuy]/)) {
    const next_ctx = advance(ctx);
    const flags = curr_value(next_ctx);
    return [flags, next_ctx];
  }

  return ['', ctx];
};


export const regex = (op)=> ({
  ...symbol(op),

  nud: ()=> (ctx)=> {
    const {start} = curr_loc(ctx);
    const ind = get_next_line_indentation(ctx);

    const [text, flags_ctx] = get_text(ctx, '/');
    const pattern = unindent_text(text.text, ind);
    const [flags, end_ctx] = get_flags(flags_ctx);

    const {end} = curr_loc(end_ctx);
    return [{type: 'regex', pattern, flags, loc: {start, end}}, end_ctx];
  }
});