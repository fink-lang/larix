import {parse_expr} from '../..';


describe('js-compat operators', ()=> {
  it('parses new', ()=> {
    expect(
      parse_expr('new Foobar(spam, ni)')
    ).toMatchSnapshot();
  });

  it('parses throw', ()=> {
    expect(
      parse_expr('throw err(`foobar`)')
    ).toMatchSnapshot();
  });
});
