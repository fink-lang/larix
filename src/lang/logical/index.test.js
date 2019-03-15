import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


import {strip_block} from '../../string-utils';


describe('logical', ()=> {

  it('parses single line: a && b || c', ()=> {
    expect(
      parse_expr(`a && b || c`)
    ).toEqual({
      type: 'logical',
      op: '||',
      left: {
        type: 'logical',
        op: '&&',
        left: parse_expr(`a`),
        right: parse_expr(`     b`),
        loc: {
          start: {pos: 0, line: 1, column: 0},
          end: {pos: 6, line: 1, column: 6}
        }
      },
      right: parse_expr(`          c`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 11, line: 1, column: 11}
      }
    });
  });


  it('parses single line: a || b && c', ()=> {
    expect(
      parse_expr(`a || b && c`)
    ).toEqual({
      type: 'logical',
      op: '||',
      left: parse_expr(`a`),
      right: {
        type: 'logical',
        op: '&&',
        left: parse_expr(`     b`),
        right: parse_expr(`          c`),
        loc: {
          start: {pos: 5, line: 1, column: 5},
          end: {pos: 11, line: 1, column: 11}
        }
      },
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 11, line: 1, column: 11}
      }
    });
  });


  it('parses single line: !a', ()=> {
    expect(
      parse_expr(`!a`)
    ).toEqual({
      type: 'logical',
      op: '!',
      right: parse_expr(` a`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 2, line: 1, column: 2}
      }
    });
  });
});
