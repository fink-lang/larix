import {strip_block} from '../../string-utils';
import {parse_expr} from '../../';


describe('comments', ()=> {

  it('parses line comment', ()=> {
    expect(
      parse_expr(strip_block`
        # foobar
        spam = ni
      `)
    ).toMatchSnapshot();
  });


  it('parses doc-comment', ()=> {
    expect(
      parse_expr(strip_block`
        ---
        foobar
        ---
        spam = ni
      `)
    ).toMatchSnapshot();
  });
});
