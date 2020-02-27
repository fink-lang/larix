import {strip_block} from '../../string-utils';
import {parse, parse_expr} from '../../';


describe('module', ()=> {

  it('parses module', ()=> {
    const mod = parse(strip_block`
      foo = bar
      spam = ni
    `);

    expect(mod).toMatchSnapshot();
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
