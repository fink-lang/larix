import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


describe('comparison', ()=> {

  it('parses single line: a == b', ()=> {
    expect(
      parse_expr(`a == b`)
    ).toEqual({
      type: 'comp',
      op: '==',
      left: parse_expr(`a`),
      right: parse_expr(`     b`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 6, line: 1, column: 6}
      }
    });
  });

  it('parses single line: a != b', ()=> {
    expect(
      parse_expr(`a != b`)
    ).toEqual({
      type: 'comp',
      op: '!=',
      left: parse_expr(`a`),
      right: parse_expr(`     b`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 6, line: 1, column: 6}
      }
    });
  });


  it('parses single line: a <= b', ()=> {
    expect(
      parse_expr(`a <= b`)
    ).toEqual({
      type: 'comp',
      op: '<=',
      left: parse_expr(`a`),
      right: parse_expr(`     b`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 6, line: 1, column: 6}
      }
    });
  });


  it('parses single line: a >= b', ()=> {
    expect(
      parse_expr(`a >= b`)
    ).toEqual({
      type: 'comp',
      op: '>=',
      left: parse_expr(`a`),
      right: parse_expr(`     b`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 6, line: 1, column: 6}
      }
    });
  });


  it('parses single line: a > b', ()=> {
    expect(
      parse_expr(`a > b`)
    ).toEqual({
      type: 'comp',
      op: '>',
      left: parse_expr(`a`),
      right: parse_expr(`    b`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 5, line: 1, column: 5}
      }
    });
  });


  it('parses single line: a < b', ()=> {
    expect(
      parse_expr(`a < b`)
    ).toEqual({
      type: 'comp',
      op: '<',
      left: parse_expr(`a`),
      right: parse_expr(`    b`),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 5, line: 1, column: 5}
      }
    });
  });
});
