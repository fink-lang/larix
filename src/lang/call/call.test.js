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
      ()=> parse_expr(`foobar(`, 'test.fnk')
    ).toThrow(strip_block`
      test.fnk:1:7
      1| foobar(
                ^

      Expected ')' but found Symbol(end).
    `);
  });

  it('throws when missing `,`', ()=> {
    expect(
      ()=> parse_expr(`foobar(1:)`, 'test.fnk')
    ).toThrow(strip_block`
      test.fnk:1:8
      1| foobar(1:)
                 ^

      Expected ',' but found ':'.
    `);
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

