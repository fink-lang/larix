import {parse_expr} from '../..';


describe('import `foobar`', ()=> {
  it('parses import', ()=> {
    expect(
      parse_expr('import `./foobar`')
    ).toMatchSnapshot();
  });
});
