import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


import {strip_block} from '../../string-utils';


describe('object {...}', ()=> {

  it('parses empty: {}', ()=> {
    expect(
      parse_expr(`{}`)
    ).toEqual({
      type: 'object',
      exprs: [],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 2, line: 1, column: 2}
      }
    });
  });


  it('parses single shorthand prop: {foo}', ()=> {
    expect(
      parse_expr(`{foo}`)
    ).toEqual({
      type: 'object',
      exprs: [{
        type: 'prop',
        key: parse_expr(` foo`),
        value: parse_expr(` foo`),
        loc: {
          start: {pos: 1, line: 1, column: 1},
          end: {pos: 4, line: 1, column: 4}
        }
      }],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 5, line: 1, column: 5}
      }
    });
  });


  it('parses multiple shorthand exprs: {foo, bar}', ()=> {
    expect(
      parse_expr(`{foo, bar}`)
    ).toEqual({
      type: 'object',
      exprs: [{
        type: 'prop',
        key: parse_expr(` foo`),
        value: parse_expr(` foo`),
        loc: {
          start: {pos: 1, line: 1, column: 1},
          end: {pos: 4, line: 1, column: 4}
        }
      }, {
        type: 'prop',
        key: parse_expr(`      bar`),
        value: parse_expr(`      bar`),
        loc: {
          start: {pos: 6, line: 1, column: 6},
          end: {pos: 9, line: 1, column: 9}
        }
      }],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 10, line: 1, column: 10}
      }
    });
  });


  it('parses single prop: {foo: spam}', ()=> {
    expect(
      parse_expr(`{foo: spam}`)
    ).toEqual({
      type: 'object',
      exprs: [{
        type: 'prop',
        key: parse_expr(` foo`),
        value: parse_expr(`    : spam`),
        loc: {
          start: {pos: 1, line: 1, column: 1},
          end: {pos: 10, line: 1, column: 10}
        }
      }],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 11, line: 1, column: 11}
      }
    });
  });


  it('parses single str prop: {`foo`: spam}', ()=> {
    expect(
      parse_expr('{`foo`: spam}')
    ).toEqual({
      type: 'object',
      exprs: [{
        type: 'prop',
        key: parse_expr(' `foo`'),
        value: parse_expr(`      : spam`),
        loc: {
          start: {pos: 1, line: 1, column: 1},
          end: {pos: 12, line: 1, column: 12}
        }
      }],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 13, line: 1, column: 13}
      }
    });
  });


  it('parses default assignment prop: {foo=123}', ()=> {
    expect(
      parse_expr(`{foo=123}`)
    ).toEqual({
      type: 'object',
      exprs: [{
        type: 'prop',
        key: parse_expr(` foo`),
        value: parse_expr(` foo=123`),
        loc: {
          start: {pos: 1, line: 1, column: 1},
          end: {pos: 8, line: 1, column: 8}
        }
      }],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 9, line: 1, column: 9}
      }
    });
  });
});


describe('object {...} - parsing failures', ()=> {
  it('throws when missing `}`', ()=> {
    expect(
      ()=> parse_expr(`{`)
    ).toThrow(strip_block`
      Expected '}' but found Symbol(end):
      1| {
          ^`
    );
  });

  // TODO: used to fail
  // it('throws when missing value after`:`', ()=> {
  //   expect(
  //     ()=> parse_expr(`{foo:,}`)
  //   ).toThrow(strip_block`
  //     Cannot use ',' as start of expression:
  //     1| {foo:,}
  //             ^`
  //   );
  // });

  it('throws when missing `,`', ()=> {
    expect(
      ()=> parse_expr(`{foo) bar}`)
    ).toThrow(strip_block`
      Expected ',' but found ')':
      1| {foo) bar}
             ^`
    );
  });
});

