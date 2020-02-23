import {parse_expr} from '../..';
import {strip_block} from '../../string-utils';


describe('func: fn ...: ...', ()=> {
  it('parses single line: fn foo, bar: foo', ()=> {
    expect(
      parse_expr(`fn foo, bar: foo`)
    ).toEqual({
      type: 'block',
      op: 'fn',
      args: [
        parse_expr('   foo'),
        parse_expr('        bar')
      ],
      exprs: [
        parse_expr('             foo')
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 16, line: 1, column: 16}
      }
    });
  });


  it('parses multi line: fn foo, bar: foo', ()=> {
    expect(
      parse_expr(strip_block`
        fn foo, bar:
          foo
          bar
      `)
    ).toEqual({
      type: 'block',
      op: 'fn',
      args: [
        parse_expr('   foo'),
        parse_expr('        bar')
      ],
      exprs: [
        parse_expr('            \n  foo'),
        parse_expr('            \n     \n  bar')
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 24, line: 3, column: 5}
      }
    });
  });
});
