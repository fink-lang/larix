import {parse_expr} from '../../';


describe('assignment', ()=> {

  it('parses single line: foo = bar', ()=> {
    expect(
      parse_expr(`foo = bar`)
    ).toMatchSnapshot();
  });
});
