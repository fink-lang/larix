import {add_operator_like} from '@fink/prattler/symbols';
import {infix} from '../generic/infix';


export const add_prop_access = (ctx)=> (
  ctx
    |> add_operator_like(infix('.', 'member'))
);
