import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


describe('spread', ()=> {

  it('parses single line: ...foobar', ()=> {
    expect(
      parse_expr(`...foobar`)
    ).toEqual({
      type: 'spread',
      op: '...',
      right: parse_expr(`   foobar`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 9, line: 1, column: 9}
      }
    });
  });
});
