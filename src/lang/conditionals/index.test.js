import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


import {strip_block} from '../../string-utils';


describe('match ...:', ()=> {
  it('parses single line: match foo: bar', ()=> {
    expect(
      parse_expr(strip_block`
        match item:
          foo: bar
          else: spam
      `)
    ).toMatchSnapshot();
  });

  // TODO: multi line match
});

