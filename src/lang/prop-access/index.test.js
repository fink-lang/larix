import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


describe('prop access', ()=> {

  it('parses single line: foo.bar', ()=> {
    expect(
      parse_expr(`foo.bar`)
    ).toEqual({
      type: 'member',
      op: '.',
      left: parse_expr(`foo`),
      right: parse_expr(`    bar`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 7, line: 1, column: 7}
      }
    });
  });


  it('parses member expr: foo.`bar spam`', ()=> {
    expect(
      parse_expr('foo.`bar spam`')
    ).toEqual({
      type: 'member',
      op: '.',
      left: parse_expr(`foo`),
      right: parse_expr('    `bar spam`'),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 14, line: 1, column: 14}
      }
    });
  });


  it('parses member expr: foo.(Symbol.iterator)', ()=> {
    expect(
      parse_expr('foo.(Symbol.iterator)')
    ).toEqual({
      type: 'member',
      op: '.',
      left: parse_expr(`foo`),
      right: parse_expr('    (Symbol.iterator)'),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 21, line: 1, column: 21}
      }
    });
  });
});
