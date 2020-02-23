import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../..';


import {strip_block} from '../../string-utils';


describe('group: (...)', ()=> {
  it('parses single line: (foo, bar)', ()=> {
    expect(
      parse_expr(`(foo, bar)`)
    ).toEqual({
      type: 'group',
      exprs: [
        parse_expr(' foo'),
        parse_expr('      bar')
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 10, line: 1, column: 10}
      }
    });
  });
});

