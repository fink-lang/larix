import {strip_block} from '../../string-utils';
import {parse_expr} from '../../';


describe('JSX <Foobar>...</Foobar>', ()=> {

  it('parses self closing elem: <Foobar />', ()=> {
    expect(
      parse_expr(`<Foobar />`)
    ).toEqual({
      type: 'jsx-elem',
      name: 'Foobar',
      props: [],
      children: [],
      self_closing: true,
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 10, line: 1, column: 10}
      }
    });
  });


  it('parses self closing elem with short attr: <Foobar spam />', ()=> {
    expect(
      parse_expr(`<Foobar spam />`)
    ).toEqual({
      type: 'jsx-elem',
      name: 'Foobar',
      props: [{
        type: 'jsx-attr',
        name: 'spam',
        value: null,
        loc: {
          start: {pos: 8, line: 1, column: 8},
          end: {pos: 12, line: 1, column: 12}
        }
      }],
      children: [],
      self_closing: true,
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 15, line: 1, column: 15}
      }
    });
  });


  it('parses self closing elem with str attr: <Foobar spam="ni" />', ()=> {
    expect(
      parse_expr(`<Foobar spam="ni" />`)
    ).toEqual({
      type: 'jsx-elem',
      name: 'Foobar',
      props: [{
        type: 'jsx-attr',
        name: 'spam',
        value: {
          type: 'jsx-string',
          value: 'ni',
          loc: {
            start: {pos: 13, line: 1, column: 13},
            end: {pos: 17, line: 1, column: 17}
          }
        },
        loc: {
          start: {pos: 8, line: 1, column: 8},
          end: {pos: 17, line: 1, column: 17}
        }
      }],
      children: [],
      self_closing: true,
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 20, line: 1, column: 20}
      }
    });
  });


  it('parses self closing elem with str attr: <Foobar spam=\'ni\' />', ()=> {
    expect(
      parse_expr(`<Foobar spam='ni' />`)
    ).toEqual({
      type: 'jsx-elem',
      name: 'Foobar',
      props: [{
        type: 'jsx-attr',
        name: 'spam',
        value: {
          type: 'jsx-string',
          value: 'ni',
          loc: {
            start: {pos: 13, line: 1, column: 13},
            end: {pos: 17, line: 1, column: 17}
          }
        },
        loc: {
          start: {pos: 8, line: 1, column: 8},
          end: {pos: 17, line: 1, column: 17}
        }
      }],
      children: [],
      self_closing: true,
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 20, line: 1, column: 20}
      }
    });
  });


  it('parses self closing elem with expr attr: <Foobar spam={ni} />', ()=> {
    expect(
      parse_expr(`<Foobar spam={ni} />`)
    ).toEqual({
      type: 'jsx-elem',
      name: 'Foobar',
      props: [{
        type: 'jsx-attr',
        name: 'spam',
        value: {
          type: 'jsx-expr-container',
          expr: parse_expr(`             :ni`),
          loc: {
            start: {pos: 13, line: 1, column: 13},
            end: {pos: 16, line: 1, column: 16}
          }
        },
        loc: {
          start: {pos: 8, line: 1, column: 8},
          end: {pos: 17, line: 1, column: 17}
        }
      }],
      children: [],
      self_closing: true,
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 20, line: 1, column: 20}
      }
    });
  });


  it('parses empty elem: <Foobar></Foobar>', ()=> {
    expect(
      parse_expr(`<Foobar></Foobar>`)
    ).toEqual({
      type: 'jsx-elem',
      name: 'Foobar',
      props: [],
      children: [],
      self_closing: false,
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 17, line: 1, column: 17}
      }
    });
  });


  it('parses elem with children: <Foobar><Spam /></Foobar>', ()=> {
    expect(
      parse_expr(strip_block`
        <Foobar>
          <Spam />
        </Foobar>
      `)
    ).toEqual({
      type: 'jsx-elem',
      name: 'Foobar',
      props: [],
      children: [
        {
          type: 'jsx-text',
          value: '\n  ',
          loc: {
            start: {pos: 7, line: 1, column: 7},
            end: {pos: 8, line: 1, column: 8}
          }
        }, {
          type: 'jsx-elem',
          name: 'Spam',
          props: [],
          children: [],
          self_closing: true,
          loc: {
            start: {pos: 11, line: 2, column: 2},
            end: {pos: 19, line: 2, column: 10}
          }
        }, {
          type: 'jsx-text',
          value: '\n',
          loc: {
            start: {pos: 17, line: 2, column: 8},
            end: {pos: 19, line: 2, column: 10}
          }
        }
      ],
      self_closing: false,
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 29, line: 3, column: 9}
      }
    });
  });


  it('parses elem with expr in body: <Foobar> {...} </Foobar>', ()=> {
    expect(
      parse_expr(strip_block`
        <Foobar>
          {1 + 2}
        </Foobar>
      `)
    ).toEqual({
      type: 'jsx-elem',
      name: 'Foobar',
      props: [],
      children: [
        {
          type: 'jsx-text',
          value: '\n  ',
          loc: {
            start: {pos: 7, line: 1, column: 7},
            end: {pos: 8, line: 1, column: 8}
          }
        }, {
          type: 'jsx-expr-container',
          expr: parse_expr(`        \n  :1 + 2`),
          loc: {
            start: {pos: 11, line: 2, column: 2},
            end: {pos: 17, line: 2, column: 8}
          }
        }, {
          type: 'jsx-text',
          value: '\n',
          loc: {
            start: {pos: 17, line: 2, column: 8},
            end: {pos: 18, line: 2, column: 9}
          }
        }
      ],
      self_closing: false,
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 28, line: 3, column: 9}
      }
    });
  });
});


describe('JSX parse errors', ()=> {
  it('throws with invalid attr value', ()=> {
    expect(()=> parse_expr(
      '<Foobar spam=123 />'
    )).toThrow(strip_block`
      Expected '{' but found '123':
      1| <Foobar spam=123 />`
    );
  });


  it('throws with invalid attr value', ()=> {
    expect(()=> parse_expr(
      '<Foobar spam=123 />'
    )).toThrow(strip_block`
      Expected '{' but found '123':
      1| <Foobar spam=123 />`
    );
  });
});

