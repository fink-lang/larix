import {named_block} from '../generic/block';
import {add_non_separating} from '@fink/prattler/symbols';


export const add_iterables = (ctx)=> (
  ctx
    |> add_non_separating(named_block('fold'))
    |> add_non_separating(named_block('unfold'))

    |> add_non_separating(named_block('map'))
    |> add_non_separating(named_block('flat_map'))
    |> add_non_separating(named_block('filter'))
);
