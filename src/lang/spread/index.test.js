import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


describe('spread', ()=> {

  it('parses single line: ...foobar', ()=> {
    expect(
      parse_expr(`...foobar`)
    ).toMatchSnapshot();
  });
});
