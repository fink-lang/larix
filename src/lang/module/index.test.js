import {strip_block} from '../../string-utils';
import {parse, parse_expr} from '../../';


describe('module', ()=> {

  it('parses module', ()=> {
    const mod = parse(strip_block`
      foo = bar
      spam = ni
    `);

    expect(mod).toEqual({
      type: 'module',
      exprs: [
        parse_expr('foo = bar'),
        parse_expr('         \nspam = ni\n')
      ],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 19, line: 2, column: 9}
      }
    });
  });
});


describe('module parse errors', ()=> {

  it('throws with bad indentation', ()=> {
    expect(()=> parse(strip_block`
      match fooobar:
        match spam:
        shrub
   `)).toThrow(strip_block`
      Expected indentation > 2:
      1| match fooobar:
      2|   match spam:
      3|   shrub
           ^
      4|`
    );
  });

});
