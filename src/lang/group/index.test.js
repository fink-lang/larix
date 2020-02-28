import {parse_expr} from '../..';
import {strip_block} from '../../string-utils';


describe('group: (...)', ()=> {
  it('parses single line: (foo, bar)', ()=> {
    expect(
      parse_expr(`(foo, bar)`)
    ).toMatchSnapshot();
  });
});

