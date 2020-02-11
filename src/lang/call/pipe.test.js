import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../..';


import {strip_block} from '../../string-utils';


describe('pipe: ... | ...', ()=> {

  it('parses pipe: foo | bar | spam', ()=> {
    expect(
      parse_expr(`foo | bar | spam`)
    ).toEqual({
      type: 'pipe',
      op: '|',
      left: {
        type: 'pipe',
        op: '|',
        left: parse_expr('foo'),
        right: parse_expr('      bar'),
        loc: {
          start: {pos: 0, line: 1, column: 0},
          end: {pos: 9, line: 1, column: 9}
        }
      },
      right: parse_expr(`            spam`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 16, line: 1, column: 16}
      }
    });
  });
});

