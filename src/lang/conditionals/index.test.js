import {parse_expr} from '../../';
import {strip_block} from '../../string-utils';


describe('match ...:', ()=> {
  it('parses single line: match foo: bar', ()=> {
    expect(
      parse_expr(strip_block`
        match item:
          foo: bar
          else: spam
      `)
    ).toMatchSnapshot();
  });


  it('parses complex: {foo}: bar', ()=> {
    expect(
      parse_expr(strip_block`
        match item:
          {foo, spam: {ni}}: bar
          [foo, [1, 2]]: bar
          else: spam
      `)
    ).toMatchSnapshot();
  });
});

