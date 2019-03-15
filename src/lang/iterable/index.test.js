import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';
import {strip_block} from '../../string-utils';


describe('fold item, accu: ...', ()=> {

  it('parses', ()=> {
    expect(
      parse_expr(strip_block`
        fold item, accu=0:
          item + accu
      `)
    ).toEqual({
      type: 'block',
      op: 'fold',
      args: [
        parse_expr('     item'),
        parse_expr('           accu=0')
      ],
      exprs: [
        parse_expr('                  \n  item + accu')
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 32, line: 2, column: 13}
      }
    });
  });
});


describe('unfold item, accu: ...', ()=> {

  it('parses', ()=> {
    expect(
      parse_expr(strip_block`
        unfold curr=start, accu=0:
          (start + accu, accu + 1)
      `)
    ).toEqual({
      type: 'block',
      op: 'unfold',
      args: [
        parse_expr('       curr=start'),
        parse_expr('                   accu=0')
      ],
      exprs: [
        parse_expr('                          \n  (start + accu, accu + 1)')
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 53, line: 2, column: 26}
      }
    });
  });
});


describe('map item: ...', ()=> {

  it('parses', ()=> {
    expect(
      parse_expr(strip_block`
        map item:
          item * 2
      `)
    ).toEqual({
      type: 'block',
      op: 'map',
      args: [
        parse_expr('    item')
      ],
      exprs: [
        parse_expr('         \n  item * 2')
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 20, line: 2, column: 10}
      }
    });
  });
});


describe('flat_map item: ...', ()=> {

  it('parses', ()=> {
    expect(
      parse_expr(strip_block`
        flat_map item:
          [item, item * 2]
      `)
    ).toEqual({
      type: 'block',
      op: 'flat_map',
      args: [
        parse_expr('         item')
      ],
      exprs: [
        parse_expr('              \n  [item, item * 2]')
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 33, line: 2, column: 18}
      }
    });
  });
});


describe('filter item: ...', ()=> {

  it('parses', ()=> {
    expect(
      parse_expr(strip_block`
        filter item:
          item % 2 == 0
      `)
    ).toEqual({
      type: 'block',
      op: 'filter',
      args: [
        parse_expr('       item')
      ],
      exprs: [
        parse_expr('            \n  item % 2 == 0')
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 28, line: 2, column: 15}
      }
    });
  });
});
