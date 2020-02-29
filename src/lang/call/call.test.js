import {parse_expr} from '../..';
import {strip_block} from '../../string-utils';


describe('call()', ()=> {

  it('parses empty: foobar()', ()=> {
    expect(
      parse_expr(`foobar()`)
    ).toMatchSnapshot();
  });


  it('parses single arg: foobar(1)', ()=> {
    expect(
      parse_expr(`foobar(1)`)
    ).toMatchSnapshot();
  });


  it('parses multiple args: foobar(1, 2)', ()=> {
    expect(
      parse_expr(`foobar(1, 2)`)
    ).toMatchSnapshot();
  });
});


describe('call() - parsing failures', ()=> {
  it('throws when missing `)`', ()=> {
    expect(
      ()=> parse_expr(`foobar(`)
    ).toThrow(strip_block`
      Unexpected end of code:
      1| foobar(
               ^`
    );
  });

  it('throws when missing `,`', ()=> {
    expect(
      ()=> parse_expr(`foobar(1:)`)
    ).toThrow(strip_block`
      Expected ')' but found ':':
      1| foobar(1:)
                 ^`
    );
  });
});


describe('call:: ...', ()=> {

  it('parses args: foobar:: spam, ni', ()=> {
    expect(
      parse_expr(`foobar:: spam, ni`)
    ).toMatchSnapshot();
  });
});


describe('pipe foo: ...', ()=> {

  it('pipes', ()=> {
    expect(
      parse_expr(strip_block`
        pipe foo:
          bar(shrub)
          ni
      `)
    ).toMatchSnapshot();
  });
});
