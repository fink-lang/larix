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

  // TODO: should that be supported?
  it('parses leading commas: [,, foo]', ()=> {
    expect(
      parse_expr(`[,, foo]`)
    ).toMatchSnapshot();
  });


  // TODO: should that be supported?
  it('parses dangling comma: [1, 2,]', ()=> {
    expect(
      parse_expr(`[1, 2,]`)
    ).toMatchSnapshot();
  });
});


describe('array [...] - parsing failures', ()=> {
  it('throws when missing `]`', ()=> {
    expect(
      ()=> parse_expr(`[`)
    ).toThrow(strip_block`
      Expected ']' but found Symbol(end):
      1| [
          ^`
    );
  });

  it('throws when missing `,`', ()=> {
    expect(
      ()=> parse_expr(`[1)]`)
    ).toThrow(strip_block`
      Expected ',' but found ')':
      1| [1)]
           ^`
    );
  });
});

