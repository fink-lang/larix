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
      left: parse_expr(`foo`),
      right: {
        type: 'pipe',
        op: '|',
        left: parse_expr('      bar'),
        right: parse_expr('            spam'),
        loc: {
          start: {pos: 6, line: 1, column: 6},
          end: {pos: 16, line: 1, column: 16}
        }
      },
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 16, line: 1, column: 16}
      }
    });
  });
});

