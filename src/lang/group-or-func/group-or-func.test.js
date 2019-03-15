import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


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


describe('func: (...): ...', ()=> {
  it('parses single line: (foo, bar): foo', ()=> {
    expect(
      parse_expr(`(foo, bar): foo`)
    ).toEqual({
      type: 'func',
      args: [
        parse_expr(' foo'),
        parse_expr('      bar')
      ],
      exprs: [
        parse_expr('            foo')
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 15, line: 1, column: 15}
      }
    });
  });


  it('parses multi line: (foo, bar): foo', ()=> {
    expect(
      parse_expr(strip_block`
        (foo, bar):
          foo
          bar
      `)
    ).toEqual({
      type: 'func',
      args: [
        parse_expr(' foo'),
        parse_expr('      bar')
      ],
      exprs: [
        parse_expr('           \n  foo'),
        parse_expr('           \n     \n  bar')
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 23, line: 3, column: 5}
      }
    });
  });
});
