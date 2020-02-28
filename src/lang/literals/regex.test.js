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


  // TODO: fix escapeing \/
  it.skip('parses escaped chars: rx/\\n\\t/', ()=> {
    expect(
      parse_expr(String.raw`rx/\n \\ \/ /`)
    ).toMatchSnapshot();
  });
});


describe('regex - parsing failures', ()=> {

  it('throws when missing end', ()=> {
    expect(
      ()=> parse_expr(`rx/foo.bar`)
    ).toThrow(strip_block`
      Unexpected end of code:
      1| rx/foo.bar
                ^`
    );
  });


  it('throws unssupported flags', ()=> {
    expect(
      ()=> parse_expr(`rx/foo.bar/n`)
    ).toThrow(strip_block`
      Unexpected end of code:
      1| rx/foo.bar/n
                    ^`
    );
  });
});

