import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Statements - Async function', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failures', () => {

    const invalidSyntax = [
      'async function foo() { async function bar(a = await baz()) {} }',
      'async function wrap() {\n({a = await b} = obj) => a\n}',
      'async function wrap() {\n(a = await b) => a\n}',
      'async function foo() { await }',
      'async function fn() { var await; }',
      'async function eval() { "use strict"; }',
      'async function arguments() { "use strict"; }',
      'async function fn() { var await; }',
      'async function fn() {  void await; }',
      'async function fn() {  await: ; }',
      `async function foo (foo = super()) { var bar; }`,
      `(async function foo() { } = 1)`,
      'async function fn() {  void await; }',
      'async function fn() {  void await; }',
      'async function fn() {  void await; }',
      'async function fn() {  void await; }',
      'async function fn() {  void await; }',
      'async function fn() {  void await; }',
      'async function fn() {  void await; }',
      '"use strict"; async function af(eval) { }',
      'async function fn() {  await: ; }',
      'async function af() { var a = (x, await, y) => { }; }',
      'async function af() { var a = (x, y, await) => { }; }',
      'async function af() { var a = (x, await, y) => { }; }',
      'async function af() { var a = (x = await 0) => { }; }',
      'async function af() { var a = (x, y = await 0, z = 0) => { }; }',
      'async function af() { var a = (x, y, z = await 0) => { }; }',
      'async function af(a, b = await a) { \'use strict\'; }',
      '"use strict"; async function af(a, b = await a) { }',
      'async function foo(x = 1){"use strict"}',
      '"use strict"; async function foo (arguments) {  }',
      'async function foo (x = await) {  }',
      'async function foo (await) {  }',
      '"use strict"; async function arguments () {  }',
      'var aaf = async\n(x, y) => { };',
      'async function af(x, x) { \'use strict\'; }',
      '"use strict"; "async function af(a, b, a) { }',
      'async function af() { var a = (x, y, await) => { }; }',
      'async function af() { var a = (x, await, y) => { }; }',
      'async function af() { (b = (c = await => {}) => {}) => {}; }',
      'async function foo (foo) { super() };',
      '"use strict"; async function foo (eval) {  }',
      'async function foo() { (async function await() { }) }',
      `(async function() { 0, { await } = {};  });`,

      // Babylon issue: https://github.com/babel/babel/issues/6687
      'async function foo(bar = await baz()) {}',
      'async function foo({ [await baz()]: bar }) {}',
      'async function a() {  class Foo {   bar = await baz();  }}',
      'async function foo() { async function bar(a = await baz()) {} }',
      ];

    for (const arg of invalidSyntax) {
        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });

        it(`${arg}`, () => {
          t.throws(() => {
              parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
          });
      });
    }

    fail('"use strict"; async function foo(a, a) { }', Context.Empty, {
      source: '"use strict"; async function foo(a, a) { }',
    });

    fail('async function foo (foo = super()) { let bar; }', Context.Empty, {
     source: 'async function foo (foo = super()) { let bar; }',
   });

    fail('\\u0061sync function f(){}', Context.Empty, {
    source: '\\u0061sync function f(){}',
  });

    fail('async({x=y})', Context.Empty, {
    source: 'async({x=y})',
  });

    fail(`async
  function asyncFn() { await 1; }`, Context.Empty, {
    source: `async
    function asyncFn() { await 1; }`,
  });

    fail(`async function f() {
    let
    await 0;
}`, Context.Empty, {
    source: `async function f() {
      let
      await 0;
  }`,
  });

  });

  describe('Pass', () => {

    const validSyntax = [
    'async function wrap() {\n({a = await b} = obj)\n}',
    'async function wrap() {\n(a = await b)\n}',
    'async function foo(a = class {async bar() { await b }}) {}',
    'async function foo(a = {async bar() { await b }}) {}',
    'async function foo(a = async () => await b) {}',
    'async function foo(a = async function foo() { await b }) {}',
    'async function foo() { await + 1 }',
    'async function foo(a, b) { await a + await b }',
    `(async () => { return !await Promise.resolve(false); })();`
  ];

    for (const arg of validSyntax) {
      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parseSource(`${arg}`, undefined, Context.Empty);
          });
      });

      it(`${arg}`, () => {
        t.doesNotThrow(() => {
            parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
        });
    });
  }

    pass(`async
    function asyncFn() { }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `async
      function asyncFn() { }`,
      expected: {
        type: 'Program',
        start: 0,
        end: 34,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 28
          }
        },
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 5,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 5
              }
            },
            expression: {
              type: 'Identifier',
              start: 0,
              end: 5,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 5
                }
              },
              name: 'async'
            }
          },
          {
            type: 'FunctionDeclaration',
            start: 12,
            end: 34,
            loc: {
              start: {
                line: 2,
                column: 6
              },
              end: {
                line: 2,
                column: 28
              }
            },
            id: {
              type: 'Identifier',
              start: 21,
              end: 28,
              loc: {
                start: {
                  line: 2,
                  column: 15
                },
                end: {
                  line: 2,
                  column: 22
                }
              },
              name: 'asyncFn'
            },
            generator: false,
            expression: false,
            async: false,
            params: [],
            body: {
              type: 'BlockStatement',
              start: 31,
              end: 34,
              loc: {
                start: {
                  line: 2,
                  column: 25
                },
                end: {
                  line: 2,
                  column: 28
                }
              },
              body: []
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`async function foo(a, b) { await a };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `async function foo(a, b) { await a };`,
      expected: {
        type: 'Program',
        start: 0,
        end: 37,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 37
          }
        },
        body: [
          {
            type: 'FunctionDeclaration',
            start: 0,
            end: 36,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 36
              }
            },
            id: {
              type: 'Identifier',
              start: 15,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 18
                }
              },
              name: 'foo'
            },
            generator: false,
            expression: false,
            async: true,
            params: [
              {
                type: 'Identifier',
                start: 19,
                end: 20,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 20
                  }
                },
                name: 'a'
              },
              {
                type: 'Identifier',
                start: 22,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 22
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                },
                name: 'b'
              }
            ],
            body: {
              type: 'BlockStatement',
              start: 25,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 25
                },
                end: {
                  line: 1,
                  column: 36
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
                  start: 27,
                  end: 34,
                  loc: {
                    start: {
                      line: 1,
                      column: 27
                    },
                    end: {
                      line: 1,
                      column: 34
                    }
                  },
                  expression: {
                    type: 'AwaitExpression',
                    start: 27,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 27
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    },
                    argument: {
                      type: 'Identifier',
                      start: 33,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      },
                      name: 'a'
                    }
                  }
                }
              ]
            }
          },
          {
            type: 'EmptyStatement',
            start: 36,
            end: 37,
            loc: {
              start: {
                line: 1,
                column: 36
              },
              end: {
                line: 1,
                column: 37
              }
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`async function asyncFn() { await 1; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `async function asyncFn() { await 1; }`,
      expected: {
        type: 'Program',
        start: 0,
        end: 37,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 37
          }
        },
        body: [
          {
            type: 'FunctionDeclaration',
            start: 0,
            end: 37,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 37
              }
            },
            id: {
              type: 'Identifier',
              start: 15,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 22
                }
              },
              name: 'asyncFn'
            },
            generator: false,
            expression: false,
            async: true,
            params: [],
            body: {
              type: 'BlockStatement',
              start: 25,
              end: 37,
              loc: {
                start: {
                  line: 1,
                  column: 25
                },
                end: {
                  line: 1,
                  column: 37
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
                  start: 27,
                  end: 35,
                  loc: {
                    start: {
                      line: 1,
                      column: 27
                    },
                    end: {
                      line: 1,
                      column: 35
                    }
                  },
                  expression: {
                    type: 'AwaitExpression',
                    start: 27,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 27
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    },
                    argument: {
                      type: 'Literal',
                      start: 33,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      },
                      value: 1,
                      raw: '1'
                    }
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    });
 });
});
