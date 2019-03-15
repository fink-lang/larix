import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';
import {strip_block} from '../../string-utils';


describe('assignment', ()=> {

  it('parses single line: foo = bar', ()=> {
    expect(
      parse_expr(`foo = bar`)
    ).toEqual({
      type: 'assign',
      op: '=',
      left: parse_expr(`foo`),
      right: parse_expr(`      bar`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 9, line: 1, column: 9}
      }
    });
  });
});
