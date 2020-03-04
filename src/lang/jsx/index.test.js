import {strip_block} from '../../string-utils';
import {parse_expr} from '../../';


describe('JSX <Foobar>...</Foobar>', ()=> {

  it('parses self closing elem: <Foobar />', ()=> {
    expect(
      parse_expr(`<Foobar />`)
    ).toMatchSnapshot();
  });


  it('parses self closing elem with short attr: <Foobar spam />', ()=> {
    expect(
      parse_expr(`<Foobar spam />`)
    ).toMatchSnapshot();
  });


  it('parses self closing elem with str attr: <Foobar spam="ni" />', ()=> {
    expect(
      parse_expr(`<Foobar spam="ni" />`)
    ).toMatchSnapshot();
  });


  it('parses self closing elem with str attr: <Foobar spam=\'ni\' />', ()=> {
    expect(
      parse_expr(`<Foobar spam='ni' />`)
    ).toMatchSnapshot();
  });


  it('parses self closing elem with expr attr: <Foobar spam={ni} />', ()=> {
    expect(
      parse_expr(`<Foobar spam={ni} />`)
    ).toMatchSnapshot();
  });


  it('parses empty elem: <Foobar></Foobar>', ()=> {
    expect(
      parse_expr(`<Foobar></Foobar>`)
    ).toMatchSnapshot();
  });


  it('parses elem with children: <Foobar><Spam /></Foobar>', ()=> {
    expect(
      parse_expr(strip_block`
        <Foobar ni>
          <Spam />
        </Foobar>
      `)
    ).toMatchSnapshot();
  });


  it('parses elem with expr in body: <Foobar> {...} </Foobar>', ()=> {
    expect(
      parse_expr(strip_block`
        <Foobar>
          {1 + 2}
        </Foobar>
      `)
    ).toMatchSnapshot();
  });
});


describe('JSX parse errors', ()=> {
  it('throws with invalid attr value', ()=> {
    expect(()=> parse_expr(
      '<Foobar spam=123 />', 'test.fnk'
    )).toThrow(strip_block`
      test.fnk:1:13
      1| <Foobar spam=123 />
                      ^

      Expected '{' but found '123'.
    `);
  });
});

