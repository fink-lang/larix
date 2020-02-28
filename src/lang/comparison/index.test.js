import {parse_expr} from '../../';


describe('comparison', ()=> {

  it('parses single line: a == b', ()=> {
    expect(
      parse_expr(`a == b`)
    ).toMatchSnapshot();
  });

  it('parses single line: a != b', ()=> {
    expect(
      parse_expr(`a != b`)
    ).toMatchSnapshot();
  });


  it('parses single line: a <= b', ()=> {
    expect(
      parse_expr(`a <= b`)
    ).toMatchSnapshot();
  });


  it('parses single line: a >= b', ()=> {
    expect(
      parse_expr(`a >= b`)
    ).toMatchSnapshot();
  });


  it('parses single line: a > b', ()=> {
    expect(
      parse_expr(`a > b`)
    ).toMatchSnapshot();
  });


  it('parses single line: a < b', ()=> {
    expect(
      parse_expr(`a < b`)
    ).toMatchSnapshot();
  });
});
