import {init_indentation} from './indentation';

import {add_jsx} from './jsx';
import {add_conditionals} from './conditionals';
import {add_literals} from './literals';
import {add_logical_operators} from './logical';
import {add_comparison_operators} from './comparison';
import {add_arithmetic_operators} from './arithmitic';
import {add_comments} from './comments';
import {add_call_operators} from './call';
import {add_group_or_func} from './group-or-func';
import {add_identifier} from './identifier';
import {add_assignment_operators} from './assignment';
import {add_iterables} from './iterable';
import {add_spread_operator} from './spread';
import {add_async} from './async';
import {add_prop_access} from './prop-access';
import {add_whitespace_tokens} from './whitespace';


export const init_language = (ctx)=> (
  ctx
    |> init_indentation

    |> add_whitespace_tokens
    |> add_comments

    |> add_identifier

    |> add_conditionals
    |> add_iterables
    |> add_assignment_operators

    |> add_logical_operators
    |> add_comparison_operators
    |> add_arithmetic_operators

    |> add_spread_operator
    |> add_async

    |> add_literals

    |> add_jsx
    |> add_call_operators

    |> add_group_or_func

    |> add_prop_access
);
