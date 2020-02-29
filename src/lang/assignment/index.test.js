import {parse_expr} from '../../';
import {strip_block} from '../../string-utils';


describe('assignment', ()=> {

  it('parses single line: foo = bar', ()=> {
    expect(
      parse_expr(`foo = bar`)
    ).toMatchSnapshot();
  });

  it('parses block:  foo = : bar ', ()=> {
    expect(
      parse_expr(strip_block`
        foo = :
          bar
          spam
      `)
    ).toMatchSnapshot();
  });


});
