import {parse_expr, parse} from '../../';
import {strip_block} from '../../string-utils';


describe('string `...`', ()=> {

  it('parses empty: ``', ()=> {
    expect(
      parse_expr('``')
    ).toMatchSnapshot();
  });


  it('parses single line string: `foo bar`', ()=> {
    expect(
      parse_expr('`foo bar`')
    ).toMatchSnapshot();
  });


  it('parses multi line string', ()=> {
    expect(
      parse_expr(` \`
        foobar
          spam shrub
        ni\`
      `)
    ).toMatchSnapshot();
  });


  it('parses escape characters', ()=> {
    expect(
      parse_expr(String.raw`${'`'} \n \t \\ \` ${'`'}`)
    ).toMatchSnapshot();
  });


  it('parses tagged string: foo`bar spam`', ()=> {
    expect(
      parse_expr('foo`bar spam`')
    ).toMatchSnapshot();
  });


  it(`handles default indentation for lbp`, ()=> {
    expect(
      parse(strip_block`
        'foobar'
        'spam'
      `)
    ).toMatchSnapshot();
  });
});


describe('string - parsing failures', ()=> {

  it('throws when missing end', ()=> {
    expect(
      ()=> parse_expr('"foo bar,', 'test.fnk')
    ).toThrow(strip_block`
      test.fnk:1:8
      1| \"foo bar,
                 ^

      Unexpected end of code.
    `);
  });

  it('throws when not tagged with identifier', ()=> {
    expect(
      ()=> parse_expr(`12'bar spam'`, 'test.fnk')
    ).toThrow(strip_block`
      test.fnk:1:2
      1| 12'bar spam'
           ^

      Expected identifier before tagged string.
    `);
  });
});

