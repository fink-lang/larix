import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../..';


import {strip_block} from '../../string-utils';


describe('call()', ()=> {

  it('parses empty: foobar()', ()=> {
    expect(
      parse_expr(`foobar()`)
    ).toEqual({
      type: 'call',
      callee: parse_expr(`foobar`),
      args: [],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 8, line: 1, column: 8}
      }
    });
  });


  it('parses single arg: foobar(1)', ()=> {
    expect(
      parse_expr(`foobar(1)`)
    ).toEqual({
      type: 'call',
      callee: parse_expr(`foobar`),
      args: [parse_expr(`       1`)],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 9, line: 1, column: 9}
      }
    });
  });


  it('parses multiple args: foobar(1, 2)', ()=> {
    expect(
      parse_expr(`foobar(1, 2)`)
    ).toEqual({
      type: 'call',
      callee: parse_expr(`foobar`),
      args: [
        parse_expr(`       1`),
        parse_expr(`          2`)
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 12, line: 1, column: 12}
      }
    });
  });


  // TODO: should that be supported?
  it('parses dangling comma: foobar(1, 2,)', ()=> {
    expect(
      parse_expr(`foobar(1, 2,)`)
    ).toEqual({
      type: 'call',
      callee: parse_expr(`foobar`),
      args: [
        parse_expr(`       1`),
        parse_expr(`          2`)
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 13, line: 1, column: 13}
      }
    });
  });
});


describe('call() - parsing failures', ()=> {
  it('throws when missing `)`', ()=> {
    expect(
      ()=> parse_expr(`foobar(`)
    ).toThrow(strip_block`
      Expected ')' but found Symbol(end):
      1| foobar(
                ^`
    );
  });

  it('throws when missing `,`', ()=> {
    expect(
      ()=> parse_expr(`foobar(1:)`)
    ).toThrow(strip_block`
      Expected ',' but found ':':
      1| foobar(1:)
                 ^`
    );
  });
});

