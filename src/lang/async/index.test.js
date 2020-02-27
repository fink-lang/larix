import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


describe('assignment', ()=> {

  it('parses single line: foo = bar', ()=> {
    expect(
      parse_expr(`await foobar`)
    ).toMatchSnapshot();
  });
});
