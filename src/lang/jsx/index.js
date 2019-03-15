import {
  add_operator_like, symbol, add_non_binding
} from '@fink/prattler/symbols';

import {jsx} from './jsx';


export const add_jsx = (ctx)=> (
  ctx
    |> add_operator_like(jsx('<'))
    |> add_non_binding(symbol('/>'))
    |> add_non_binding(symbol('</'))
);
