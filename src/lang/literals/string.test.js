import {parse_expr} from '../../';
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

});


describe('string - parsing failures', ()=> {

  it('throws when missing end', ()=> {
    expect(
      ()=> parse_expr('`foo bar,')
    ).toThrow(strip_block`
      Unexpected end of code:
      1| \`foo bar,
                 ^`
    );
  });

  it('throws when not tagged with identifier', ()=> {
    expect(
      ()=> parse_expr('12`bar spam`')
    ).toThrow(strip_block`
      Expected identifier for tagged string:
      1| 12\`bar spam\`
         ^`
    );
  });
});

