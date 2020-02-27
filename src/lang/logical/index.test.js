import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


import {strip_block} from '../../string-utils';


describe('logical', ()=> {

  it('parses single line: a && b || c', ()=> {
    expect(
      parse_expr(`a && b || c`)
    ).toMatchSnapshot();
  });


  it('parses single line: a || b && c', ()=> {
    expect(
      parse_expr(`a || b && c`)
    ).toMatchSnapshot();
  });


  it('parses single line: !a', ()=> {
    expect(
      parse_expr(`!a`)
    ).toMatchSnapshot();
  });
});
