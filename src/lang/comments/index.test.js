import {strip_block} from '../../string-utils';
import {parse_expr} from '../../';


describe('comments', ()=> {

  it('parses line comment', ()=> {
    expect(
      parse_expr(strip_block`
        # foobar
        spam = ni
      `)
    ).toEqual({
      type: 'assign',
      op: '=',
      left: parse_expr('        \nspam'),
      right: parse_expr('        \n       ni'),
      comment: {
        // TODO: should there be a space?
        text: ' foobar',
        loc: {
          start: {pos: 0, line: 1, column: 0},
          end: {pos: 9, line: 2, column: 0}
        }
      },
      loc: {
        start: {pos: 9, line: 2, column: 0},
        end: {pos: 18, line: 2, column: 9}
      }
    });
  });


  it('parses doc-comment', ()=> {
    expect(
      parse_expr(strip_block`
        ---
        foobar
        ---
        spam = ni
      `)
    ).toEqual({
      type: 'assign',
      op: '=',
      left: parse_expr('   \n      \n   \nspam'),
      right: parse_expr('   \n      \n   \n       ni'),
      comment: {
        text: '\nfoobar\n',
        loc: {
          start: {pos: 0, line: 1, column: 0},
          end: {pos: 14, line: 3, column: 3}
        }
      },
      loc: {
        start: {pos: 15, line: 4, column: 0},
        end: {pos: 24, line: 4, column: 9}
      }
    });
  });
});
