import {parse_expr} from '../../';
import {strip_block} from '../../string-utils';


describe('object {...}', ()=> {

  it('parses empty: {}', ()=> {
    expect(
      parse_expr(`{}`)
    ).toMatchSnapshot();
  });


  it('parses single shorthand prop: {foo}', ()=> {
    expect(
      parse_expr(`{foo}`)
    ).toMatchSnapshot();
  });


  it('parses multiple shorthand exprs: {foo, bar}', ()=> {
    expect(
      parse_expr(`{foo, bar}`)
    ).toMatchSnapshot();
  });


  it('parses multiple shorthand exprs: {foo, bar}', ()=> {
    expect(
      parse_expr(`{foo, bar: 123, shrub: 'ni'}`)
    ).toMatchSnapshot();
  });


  it('parses single prop: {foo: spam}', ()=> {
    expect(
      parse_expr(`{foo: spam}`)
    ).toMatchSnapshot();
  });


  it('parses single str prop: {`foo`: spam}', ()=> {
    expect(
      parse_expr('{`foo`: spam}')
    ).toMatchSnapshot();
  });


  it('parses default assignment prop: {foo=123}', ()=> {
    expect(
      parse_expr(`{foo=123}`)
    ).toMatchSnapshot();
  });


  it('parses calculated prop: {(Symbol(`foo`)): 123, ...}', ()=> {
    expect(
      parse_expr('{foo, (Symbol(`bar`)): 123, spam}')
    ).toMatchSnapshot();
  });


  it('parses single prop with block value: {foo: spam ...}', ()=> {
    expect(
      parse_expr(strip_block`
        {
          foo:
            spam
            ni
        }
      `)
    ).toMatchSnapshot();
  });
});


describe('object {...} - parsing failures', ()=> {
  it('throws when missing `}`', ()=> {
    expect(
      ()=> parse_expr(`{`)
    ).toThrow(strip_block`
      Expected '}' but found Symbol(end):
      1| {
          ^`
    );
  });

  it('throws when missing `,`', ()=> {
    expect(
      ()=> parse_expr(`{foo) bar}`)
    ).toThrow(strip_block`
      Expected ',' but found ')':
      1| {foo) bar}
             ^`
    );
  });
});

