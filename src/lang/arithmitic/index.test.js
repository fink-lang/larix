import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


describe('arithmitic', ()=> {

  it('parses single line: a + b * c', ()=> {
    expect(
      parse_expr(`a + b * c`)
    ).toEqual({
      type: 'arithm',
      op: '+',
      left: parse_expr(`a`),
      right: {
        type: 'arithm',
        op: '*',
        left: parse_expr(`    b`),
        right: parse_expr(`        c`),
        loc: {
          start: {pos: 4, line: 1, column: 4},
          end: {pos: 9, line: 1, column: 9}
        }
      },
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 9, line: 1, column: 9}
      }
    });
  });


  it('parses single line: a * b + c', ()=> {
    expect(
      parse_expr(`a * b + c`)
    ).toEqual({
      type: 'arithm',
      op: '+',
      left: {
        type: 'arithm',
        op: '*',
        left: parse_expr(`a`),
        right: parse_expr(`    b`),
        loc: {
          start: {pos: 0, line: 1, column: 0},
          end: {pos: 5, line: 1, column: 5}
        }
      },
      right: parse_expr(`        c`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 9, line: 1, column: 9}
      }
    });
  });


  it('parses single line: a % b / c', ()=> {
    expect(
      parse_expr(`a % b / c`)
    ).toEqual({
      type: 'arithm',
      op: '/',
      left: {
        type: 'arithm',
        op: '%',
        left: parse_expr(`a`),
        right: parse_expr(`    b`),
        loc: {
          start: {pos: 0, line: 1, column: 0},
          end: {pos: 5, line: 1, column: 5}
        }
      },
      right: parse_expr(`        c`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 9, line: 1, column: 9}
      }
    });
  });


  it('parses single line: a ^ b * c', ()=> {
    expect(
      parse_expr(`a ^ b * c`)
    ).toEqual({
      type: 'arithm',
      op: '*',
      left: {
        type: 'arithm_right',
        op: '^',
        left: parse_expr(`a`),
        right: parse_expr(`    b`),
        loc: {
          start: {pos: 0, line: 1, column: 0},
          end: {pos: 5, line: 1, column: 5}
        }
      },
      right: parse_expr(`        c`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 9, line: 1, column: 9}
      }
    });
  });


  it('parses single line: a * -b', ()=> {
    expect(
      parse_expr(`a * -b`)
    ).toEqual({
      type: 'arithm',
      op: '*',
      left: parse_expr(`a`),
      right: {
        type: 'arithm_prefix',
        op: '-',
        right: parse_expr(`     b`),
        loc: {
          start: {pos: 4, line: 1, column: 4},
          end: {pos: 6, line: 1, column: 6}
        }
      },
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 6, line: 1, column: 6}
      }
    });
  });


  it('parses grouped: (a - b) * c', ()=> {
    expect(
      parse_expr(`(a - b) * c`)
    ).toEqual({
      type: 'arithm',
      op: '*',
      left: {
        type: 'group',
        exprs: [{
          type: 'arithm',
          op: '-',
          left: parse_expr(` a`),
          right: parse_expr(`     b`),
          loc: {
            start: {pos: 1, line: 1, column: 1},
            end: {pos: 6, line: 1, column: 6}
          }
        }],
        loc: {
          start: {pos: 0, line: 1, column: 0},
          end: {pos: 7, line: 1, column: 7}
        }
      },
      right: parse_expr(`          c`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 11, line: 1, column: 11}
      }
    });
  });
});
