import {other_token} from '@fink/prattler/symbols';

import {parse_expr} from '../../';


import {strip_block} from '../../string-utils';


describe('if:', ()=> {
  it('parses single line: if foo: bar', ()=> {
    expect(
      parse_expr(`if: foo: bar`)
    ).toEqual({
      type: 'cond',
      op: 'if',
      args: [],
      exprs: [{
        type: 'cond:test:result',
        test: parse_expr('    foo'),
        result: parse_expr('       : bar'),
        loc: {
          start: {pos: 4, line: 1, column: 4},
          end: {pos: 12, line: 1, column: 12}
        }
      }],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 12, line: 1, column: 12}
      }
    });
  });


  it('parses multiline', ()=> {
    expect(
      parse_expr(strip_block`
        if:
          foo: bar
          else:
            spam
            shrub
      `)
    ).toEqual({
      type: 'cond',
      op: 'if',
      args: [],
      exprs: [{
        type: 'cond:test:result',
        test: parse_expr('   \n  foo'),
        result: parse_expr('   \n     : bar'),
        loc: {
          start: {pos: 6, line: 2, column: 2},
          end: {pos: 14, line: 2, column: 10}
        }
      }, {
        type: 'cond:test:result',
        test: parse_expr('   \n          \n  else'),
        result: parse_expr('   \n          \n      :\n    spam\n    shrub\n'),
        loc: {
          start: {pos: 17, line: 3, column: 2},
          end: {pos: 41, line: 5, column: 9}
        }
      }],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 41, line: 5, column: 9}
      }
    });
  });
});


describe('if: - parsing failures', ()=> {
  it('throws when missing `:`', ()=> {
    expect(
      ()=> parse_expr(`if foo`)
    ).toThrow(strip_block`
      Expected ':' but found Symbol(end):
      1| if foo
               ^`
    );
  });


  it('throws when missing in test expr `:`', ()=> {
    expect(
      ()=> parse_expr(`if: foo`)
    ).toThrow(strip_block`
      Expected ':' but found Symbol(end):
      1| if: foo
                ^`
    );
  });
});


describe('match ...:', ()=> {
  it('parses single line: match foo: bar', ()=> {
    expect(
      parse_expr(strip_block`
        match item:
          foo: bar
          else: spam
      `)
    ).toEqual({
      type: 'cond',
      op: 'match',
      args: [parse_expr('      item')],
      exprs: [{
        type: 'cond:test:result',
        test: parse_expr('           \n  foo'),
        result: parse_expr('           \n     : bar'),
        loc: {
          start: {pos: 14, line: 2, column: 2},
          end: {pos: 22, line: 2, column: 10}
        }
      }, {
        type: 'cond:test:result',
        test: parse_expr('           \n          \n  else'),
        result: parse_expr('           \n          \n      : spam'),
        loc: {
          start: {pos: 25, line: 3, column: 2},
          end: {pos: 35, line: 3, column: 12}
        }
      }],
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 35, line: 3, column: 12}
      }
    });
  });

  // TODO: multi line match
});

