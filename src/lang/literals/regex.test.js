import {parse_expr} from '../../';
import {strip_block} from '../../string-utils';


describe('regex rx/.../', ()=> {

  it('parses empty: rx//', ()=> {
    expect(
      parse_expr(`rx//`)
    ).toMatchSnapshot();
  });


  it('parses flags: rx//gimsuy', ()=> {
    expect(
      parse_expr(`rx//gimsuy`)
    ).toMatchSnapshot();
  });


  it('parses regex: rx/.+foo/', ()=> {
    expect(
      parse_expr(`rx/.+foo/gimsuy`)
    ).toMatchSnapshot();
  });


  it('parses escaped chars: rx/\\n\\t/', ()=> {
    expect(
      parse_expr(String.raw`rx/\n \\ \/ /`)
    ).toMatchSnapshot();
  });
});


describe('regex - parsing failures', ()=> {

  it('throws when missing end', ()=> {
    expect(
      ()=> parse_expr(`rx/foo.bar`, 'test.fnk')
    ).toThrow(strip_block`
      test.fnk:1:7
      1| rx/foo.bar
                ^

      Unexpected end of code.
    `);
  });


  it('throws unssupported flags', ()=> {
    expect(
      ()=> parse_expr(`rx/foo.bar/n`, 'test.fnk')
    ).toThrow(strip_block`
      test.fnk:1:11
      1| rx/foo.bar/n
                    ^

      Unexpected end of code.
    `);
  });
});

