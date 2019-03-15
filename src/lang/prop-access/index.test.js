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
});
