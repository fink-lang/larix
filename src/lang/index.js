import {init_indentation} from './indentation';

import {add_jsx} from './jsx';
import {add_conditionals} from './conditionals';
import {add_literals} from './literals';
import {add_logical_operators} from './logical';
import {add_comparison_operators} from './comparison';
import {add_arithmetic_operators} from './arithmitic';
import {add_comments} from './comments';
import {add_call_operators} from './call';
import {add_func} from './func';
import {add_group} from './group';
import {add_identifier} from './identifier';
import {add_assignment_operators} from './assignment';
import {add_iterables} from './iterable';
import {add_spread_operator} from './spread';
import {add_async} from './async';
import {add_import} from './import';
import {add_prop_access} from './prop-access';
import {add_whitespace_tokens} from './whitespace';
import {add_non_separating, add_operator_like} from '@fink/prattler/symbols';
import {named_block, add_block} from './generic/block';


export const init_language = (ctx)=> (
  ctx
    |> init_indentation

    |> add_whitespace_tokens
    |> add_comments

    |> add_func

    |> add_conditionals
    |> add_iterables

    |> add_assignment_operators
    |> add_block

    |> add_identifier

    |> add_logical_operators
    |> add_comparison_operators
    |> add_arithmetic_operators

    |> add_spread_operator
    |> add_async
    |> add_import

    |> add_literals

    |> add_jsx
    |> add_call_operators

    |> add_group

    |> add_prop_access
);
