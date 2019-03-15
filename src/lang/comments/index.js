import {add_non_binding} from '@fink/prattler/symbols';

import {comment} from './comment';
import {doc_comment} from './doc-comment';


export const add_comments = (ctx)=> (
  ctx
    |> add_non_binding(comment(';'))
    |> add_non_binding(comment('#'))
    |> add_non_binding(doc_comment('---'))
);
