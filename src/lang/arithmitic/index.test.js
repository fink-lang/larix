import {parse_expr} from '../../';


describe('arithmitic', ()=> {

  it('parses single line: a + b * c', ()=> {
    expect(
      parse_expr(`a + b * c`)
    ).toMatchSnapshot();
  });


  it('parses single line: a * b + c', ()=> {
    expect(
      parse_expr(`a * b + c`)
    ).toMatchSnapshot();
  });


  it('parses single line: a % b / c', ()=> {
    expect(
      parse_expr(`a % b / c`)
    ).toMatchSnapshot();
  });


  it('parses single line: a ^ b * c', ()=> {
    expect(
      parse_expr(`a ^ b * c`)
    ).toMatchSnapshot();
  });


  it('parses single line: a * -b', ()=> {
    expect(
      parse_expr(`a * -b`)
    ).toMatchSnapshot();
  });


  it('parses grouped: (a - b) * c', ()=> {
    expect(
      parse_expr(`(a - b) * c`)
    ).toMatchSnapshot();
  });
});
