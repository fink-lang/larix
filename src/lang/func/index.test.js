import {parse_expr} from '../..';
import {strip_block} from '../../string-utils';


describe('func: fn ...: ...', ()=> {
  it('parses single line: fn foo, bar: foo', ()=> {
    expect(
      parse_expr(`fn foo, bar: foo`)
    ).toMatchSnapshot();
  });


  it('parses multi line: fn foo, bar: foo', ()=> {
    expect(
      parse_expr(strip_block`
        fn foo, bar:
          foo
          bar
      `)
    ).toMatchSnapshot();
  });
});
