import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


import {strip_block} from '../../string-utils';


describe('match ...:', ()=> {
  it('parses single line: match foo: bar', ()=> {
    expect(
      parse_expr(strip_block`
        match item:
          foo: bar
          else: spam
      `)
    ).toEqual({
      type: 'cond',
      op: 'match',
      args: [parse_expr('      item')],
      exprs: [{
        type: 'cond:test:result',
        left: parse_expr('           \n  foo'),
        right: parse_expr('           \n     : bar'),
        loc: {
          start: {pos: 14, line: 2, column: 2},
          end: {pos: 22, line: 2, column: 10}
        }
      }, {
        type: 'cond:test:result',
        left: parse_expr('           \n          \n  else'),
        right: parse_expr('           \n          \n      : spam'),
        loc: {
          start: {pos: 25, line: 3, column: 2},
          end: {pos: 35, line: 3, column: 12}
        }
      }],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 35, line: 3, column: 12}
      }
    });
  });

  // TODO: multi line match
});

