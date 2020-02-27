import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


describe('prop access', ()=> {

  it('parses single line: foo.bar', ()=> {
    expect(
      parse_expr(`foo.bar`)
    ).toMatchSnapshot();
  });


  it('parses member expr: foo.`bar spam`', ()=> {
    expect(
      parse_expr('foo.`bar spam`')
    ).toMatchSnapshot();
  });


  it('parses member expr: foo.(Symbol.iterator)', ()=> {
    expect(
      parse_expr('foo.(Symbol.iterator)')
    ).toMatchSnapshot();
  });
});
