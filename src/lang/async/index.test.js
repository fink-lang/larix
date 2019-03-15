import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


describe('assignment', ()=> {

  it('parses single line: foo = bar', ()=> {
    expect(
      parse_expr(`await foobar`)
    ).toEqual({
      type: 'await',
      op: 'await',
      right: parse_expr(`      foobar`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 12, line: 1, column: 12}
      }
    });
  });
});
