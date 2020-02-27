import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


import {strip_block} from '../../string-utils';


describe('other symbols', ()=> {
  it('parses a word', ()=> {
    expect(
      parse_expr(`  foobar  `)
    ).toMatchSnapshot();
  });


  it('parses a non-word', ()=> {
    expect(
      parse_expr(`  π  `)
    ).toMatchSnapshot();
  });
});


describe('symbols as infix operators', ()=> {
  it('parses a word', ()=> {
    expect(
      parse_expr(`123 add 2`)
    ).toMatchSnapshot();
  });
});
