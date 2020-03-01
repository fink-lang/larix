import {parse_expr} from '../..';
import {strip_block} from '../../string-utils';


describe('func: fn ...: ...', ()=> {
  it('parses no arg: fn: foo', ()=> {
    expect(
      parse_expr(`fn: foo`)
    ).toMatchSnapshot();
  });


  it('parses single arg: fn foo: bar', ()=> {
    expect(
      parse_expr(`fn foo: bar`)
    ).toMatchSnapshot();
  });


  it('parses single line: fn foo, bar: foo', ()=> {
    expect(
      parse_expr(`fn foo, bar: foo`)
    ).toMatchSnapshot();
  });


  it('parses multi line: fn foo, bar=1: foo', ()=> {
    expect(
      parse_expr(strip_block`
        fn foo, bar=1:
          foo
          bar
      `)
    ).toMatchSnapshot();
  });
});
