import {add_operator_like, add_non_binding} from '@fink/prattler/symbols';
import {array} from '../literals/array';
import {comma} from '../comma';
import {symbol} from '../symbols';


export const add_group = (ctx)=> (
  ctx
    |> add_operator_like(array('group', '(', ')'))
    |> add_non_binding(symbol(')'))
);
