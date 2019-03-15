import {symbol as parser_symbol} from '@fink/prattler/symbols';
import {next_loc} from '@fink/prattler';
import {indentation} from './indentation';


export const symbol = (id)=> ({
  ...parser_symbol(id),

  lbp: (lbp)=> (ctx)=> {
    if (next_loc(ctx).start.column <= indentation(ctx)) {
      return 0;
    }
    return lbp;
  }
});
