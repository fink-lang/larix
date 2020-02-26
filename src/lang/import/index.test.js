import {parse_expr} from '../..';


describe('import `foobar`', ()=> {
  it('parses import', ()=> {
    expect(
      parse_expr('import `./foobar`')
    ).toEqual({
      type: 'import',
      op: 'import',
      right: parse_expr('       `./foobar`'),
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 17, line: 1, column: 17}
      }
    });
  });
});
