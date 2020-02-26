import {add_non_separating} from '@fink/prattler/symbols';

import {prefix} from '../generic/prefix';


export const add_import = (ctx)=> (
  ctx
    |> add_non_separating(prefix('import', 'import'))
);
