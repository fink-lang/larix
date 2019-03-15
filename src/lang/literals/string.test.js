import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


import {strip_block} from '../../string-utils';


describe('string `...`', ()=> {

  it('parses empty: ``', ()=> {
    expect(
      parse_expr('``')
    ).toEqual({
      type: 'string',
      op: '`',
      parts: [''],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 2, line: 1, column: 2}
      }
    });
  });


  it('parses single line string: `foo bar`', ()=> {
    expect(
      parse_expr('`foo bar`')
    ).toEqual({
      type: 'string',
      op: '`',
      parts: ['foo bar'],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 9, line: 1, column: 9}
      }
    });
  });


  it('parses multi line string', ()=> {
    expect(
      parse_expr(` \`
        foobar
          spam shrub
        ni\`
      `)
    ).toEqual({
      type: 'string',
      op: '`',
      parts: ['foobar\n  spam shrub\nni'],
      loc: {
        start: {pos: 1, line: 1, column: 1},
        end: {pos: 50, line: 4, column: 11}
      }
    });
  });

  // TODO:
  it.skip('parses escape characters', ()=> {
    expect(
      parse_expr(String.raw`${'`'} \n \t \\ ${'`'}`)
    ).toEqual({
      type: 'string',
      op: '`',
      parts: [` \n \t \\ `],
      loc: {
        start: {pos: 1, line: 1, column: 1},
        end: {pos: 50, line: 4, column: 11}
      }
    });
  });
});


describe('string - parsing failures', ()=> {

  it('throws when missing end', ()=> {
    expect(
      ()=> parse_expr('`foo bar,')
    ).toThrow(strip_block`
      Unexpected end of code:
      1| \`foo bar,
                 ^`
    );
  });
});

