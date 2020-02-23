import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


import {strip_block} from '../../string-utils';


describe('other symbols', ()=> {
  it('parses a word', ()=> {
    expect(
      parse_expr(`  foobar  `)
    ).toEqual({
      type: other_token,
      value: 'foobar',
      loc: {
        start: {pos: 2, line: 1, column: 2},
        end: {pos: 8, line: 1, column: 8}
      }
    });
  });


  it('parses a non-word', ()=> {
    expect(
      parse_expr(`  π  `)
    ).toEqual({
      type: other_token,
      value: 'π',
      loc: {
        start: {pos: 2, line: 1, column: 2},
        end: {pos: 3, line: 1, column: 3}
      }
    });
  });
});


describe('symbols as infix operators', ()=> {
  it('parses a word', ()=> {
    expect(
      parse_expr(`123 add 2`)
    ).toEqual({
      type: 'infix',
      op: 'add',
      left: parse_expr(`123`),
      right: parse_expr(`        2`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 9, line: 1, column: 9}
      }
    });
  });
});
