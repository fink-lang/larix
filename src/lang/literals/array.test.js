import {parse_expr} from '../../';
import {strip_block} from '../../string-utils';


describe('array [...]', ()=> {

  it('parses empty: []', ()=> {
    expect(
      parse_expr(`[]`)
    ).toMatchSnapshot();
  });


  it('parses single elemement: [1]', ()=> {
    expect(
      parse_expr(`[1]`)
    ).toMatchSnapshot();
  });


  it('parses multiple elements: [1, 2]', ()=> {
    expect(
      parse_expr(`[1, 2]`)
    ).toMatchSnapshot();
  });


  it('parses leading commas: [,, foo]', ()=> {
    expect(
      parse_expr(`[,, foo]`)
    ).toMatchSnapshot();
  });
});


describe('array [...] - parsing failures', ()=> {
  it('throws when missing `]`', ()=> {
    expect(
      ()=> parse_expr(`[`, 'test.fnk')
    ).toThrow(strip_block`
      test.fnk:1:1
      1| [
          ^

      Expected ']' but found Symbol(end).
    `);
  });

  it('throws when missing `,`', ()=> {
    expect(
      ()=> parse_expr(`[1)]`, 'test.fnk')
    ).toThrow(strip_block`
      test.fnk:1:2
      1| [1)]
           ^

      Expected ',' but found ')'.
    `);
  });
});

