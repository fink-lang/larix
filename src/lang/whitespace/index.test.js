import {init_parser, start_parser, next_is_end, next_loc} from '@fink/prattler';
import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';
import {init_language} from '..';


describe('whitespace', ()=> {
  const init_test_parser = (code)=> (
    {code}
      |> init_parser
      |> init_language
      |> start_parser
  );

  it('ignores whitespace', ()=> {
    const ctx = init_test_parser(` \t\n`);

    expect(next_is_end(ctx)).toBe(true);
    expect(next_loc(ctx)).toEqual({
      start: {pos: 3, line: 2, column: 0},
      end: {pos: 3, line: 2, column: 0}
    });
  });
});
