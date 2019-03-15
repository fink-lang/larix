import {curr_value, curr_loc} from '@fink/prattler';
import {other_token} from '@fink/prattler/symbols';

import {symbol} from '../symbols';


export const other = ()=> ({
  ...symbol(other_token),

  nud: ()=> (ctx)=> {
    const value = curr_value(ctx);
    const loc = curr_loc(ctx);
    // TODO: use 'other' instead of other_token
    return [{type: other_token, value, loc}, ctx];
  }
});
