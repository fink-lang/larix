import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


import {strip_block} from '../../string-utils';


describe('array [...]', ()=> {

  it('parses empty: []', ()=> {
    expect(
      parse_expr(`[]`)
    ).toEqual({
      type: 'array',
      exprs: [],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 2, line: 1, column: 2}
      }
    });
  });


  it('parses single elemement: [1]', ()=> {
    expect(
      parse_expr(`[1]`)
    ).toEqual({
      type: 'array',
      exprs: [parse_expr(` 1`)],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 3, line: 1, column: 3}
      }
    });
  });


  it('parses multiple elements: [1, 2]', ()=> {
    expect(
      parse_expr(`[1, 2]`)
    ).toEqual({
      type: 'array',
      exprs: [
        parse_expr(` 1`),
        parse_expr(`    2`)
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 6, line: 1, column: 6}
      }
    });
  });

  // TODO: should that be supported?
  it('parses leading commas: [,, foo]', ()=> {
    expect(
      parse_expr(`[,, foo]`)
    ).toEqual({
      type: 'array',
      exprs: [
        null,
        null,
        parse_expr(`    foo`)
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 8, line: 1, column: 8}
      }
    });
  });


  // TODO: should that be supported?
  it('parses dangling comma: [1, 2,]', ()=> {
    expect(
      parse_expr(`[1, 2,]`)
    ).toEqual({
      type: 'array',
      exprs: [
        parse_expr(` 1`),
        parse_expr(`    2`)
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 7, line: 1, column: 7}
      }
    });
  });
});


describe('array [...] - parsing failures', ()=> {
  it('throws when missing `]`', ()=> {
    expect(
      ()=> parse_expr(`[`)
    ).toThrow(strip_block`
      Expected ']' but found Symbol(end):
      1| [
          ^`
    );
  });

  it('throws when missing `,`', ()=> {
    expect(
      ()=> parse_expr(`[1)]`)
    ).toThrow(strip_block`
      Expected ',' but found ')':
      1| [1)]
           ^`
    );
  });
});

