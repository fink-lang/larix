import {parse_expr} from '../../';
import {strip_block} from '../../string-utils';


describe('fold item, accu: ...', ()=> {

  it('parses', ()=> {
    expect(
      parse_expr(strip_block`
        fold item, accu=0:
          item + accu
      `)
    ).toMatchSnapshot();
  });
});


describe('unfold item, accu: ...', ()=> {

  it('parses', ()=> {
    expect(
      // TODO: no need for accu as we can return tuple
      parse_expr(strip_block`
        unfold curr=start, accu=0:
          (start + accu, accu + 1)
      `)
    ).toMatchSnapshot();
  });
});


describe('map item: ...', ()=> {

  it('parses', ()=> {
    expect(
      parse_expr(strip_block`
        map item:
          item * 2
      `)
    ).toMatchSnapshot();
  });
});


describe('flat_map item: ...', ()=> {

  it('parses', ()=> {
    expect(
      parse_expr(strip_block`
        flat_map item:
          [item, item * 2]
      `)
    ).toMatchSnapshot();
  });
});


describe('filter item: ...', ()=> {

  it('parses', ()=> {
    expect(
      parse_expr(strip_block`
        filter item:
          item % 2 == 0
      `)
    ).toMatchSnapshot();
  });
});