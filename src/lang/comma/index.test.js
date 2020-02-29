import {parse_expr} from '../..';
import {strip_block} from '../../string-utils';


describe('comma', ()=> {
  it('parses single line: fn foo, bar: foo', ()=> {
    expect(
      parse_expr(`foo, bar`)
    ).toMatchSnapshot();
  });
});
