import {parse_expr, parse} from '../../';
import {strip_block} from '../../string-utils';


describe('other symbols', ()=> {
  it('parses a word', ()=> {
    expect(
      parse_expr(`  foobar  `)
    ).toMatchSnapshot();
  });


  it('parses a non-word', ()=> {
    expect(
      parse_expr(`  π  `)
    ).toMatchSnapshot();
  });
});


describe('numbers', ()=> {
  it('parses int 12345', ()=> {
    expect(
      parse_expr(` 12345  `)
    ).toMatchSnapshot();
  });


  it('parses hex, oct, bin', ()=> {
    expect(
      parse(strip_block`
        0x123456789abcdef0
        0x123456789abcde
        0o12345670
        0b101010
      `)
    ).toMatchSnapshot();
  });


  it('parses float 123.456', ()=> {
    expect(
      parse_expr(`  123.456  `)
    ).toMatchSnapshot();
  });


  it('parses float 123.456e10', ()=> {
    expect(
      parse(strip_block`
        123.456e78
        123.456e+78
        123.456e-78
      `)
    ).toMatchSnapshot();
  });

  it('throws when missing exponent', ()=> {
    expect(
      ()=> parse_expr(`123.456e * 78`)
    ).toThrow(strip_block`
      Expected exponent:
      1| 123.456e * 78
                  ^`
    );
  });
});


describe('symbols as infix operators', ()=> {
  it('parses with left to right precendence', ()=> {
    expect(
      parse_expr(`123 add 4 add 5`)
    ).toMatchSnapshot();
  });
});
