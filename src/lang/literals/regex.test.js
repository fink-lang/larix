import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


import {strip_block} from '../../string-utils';


describe('regex rx/.../', ()=> {

  it('parses empty: rx//', ()=> {
    expect(
      parse_expr(`rx//`)
    ).toEqual({
      type: 'regex',
      pattern: '',
      flags: '',
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 4, line: 1, column: 4}
      }
    });
  });


  it('parses flags: rx//gimsuy', ()=> {
    expect(
      parse_expr(`rx//gimsuy`)
    ).toEqual({
      type: 'regex',
      pattern: '',
      flags: 'gimsuy',
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 10, line: 1, column: 10}
      }
    });
  });

  // TODO: fix escapeing \/
  it.skip('parses escaped chars: rx/\\n\\t/', ()=> {
    expect(
      parse_expr(String.raw`rx/\n \\ \/ /`)
    ).toEqual({
      type: 'regex',
      pattern: String.raw`\n \\ /`,
      flags: '',
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 10, line: 1, column: 10}
      }
    });
  });
});


describe('regex - parsing failures', ()=> {

  it('throws when missing end', ()=> {
    expect(
      ()=> parse_expr(`rx/foo.bar`)
    ).toThrow(strip_block`
      Unexpected end of code:
      1| rx/foo.bar
                ^`
    );
  });


  it('throws unssupported flags', ()=> {
    expect(
      ()=> parse_expr(`rx/foo.bar/n`)
    ).toThrow(strip_block`
      Unexpected end of code:
      1| rx/foo.bar/n
                    ^`
    );
  });
});

