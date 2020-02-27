
import {other_token} from '@fink/prattler/symbols';
import {parse_expr, parse} from '..';
import {strip_block} from '../string-utils';


describe('foo', ()=> {
  it('parses', ()=> {
    expect(
      parse(strip_block`
        foo.ni(bar+spam)
        bar:: spam
      `)).toMatchSnapshot();
  });
});


