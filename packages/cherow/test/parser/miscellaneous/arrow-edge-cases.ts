import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

// Validate miscellaneous combinations of call expr, arrows and async arrows
describe('Miscellaneous - Edge cases', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  pass(`async`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: 'async',
      expected: {
          type: 'Program',
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
          body: [{
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
          }],
          sourceType: 'script'
      }
  });

  pass(`async ice => fapper`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: 'async ice => fapper',
      expected: {
          type: 'Program',
          start: 0,
          end: 19,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 19
              }
          },
          body: [{
              type: 'ExpressionStatement',
              start: 0,
              end: 19,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 19
                  }
              },
              expression: {
                  type: 'ArrowFunctionExpression',
                  start: 0,
                  end: 19,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 19
                      }
                  },
                  id: null,
                  generator: false,
                  expression: true,
                  async: true,
                  params: [{
                      type: 'Identifier',
                      start: 6,
                      end: 9,
                      loc: {
                          start: {
                              line: 1,
                              column: 6
                          },
                          end: {
                              line: 1,
                              column: 9
                          }
                      },
                      name: 'ice'
                  }],
                  body: {
                      type: 'Identifier',
                      start: 13,
                      end: 19,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 19
                          }
                      },
                      name: 'fapper'
                  }
              }
          }],
          sourceType: 'script'
      }
  });

  describe('Failures', () => {

      // I'm not sure what's wrong with Acorn here
      /*        fail(`async()
               () => {}`, Context.Empty, {
                  source: `async()
              () => {}`,
              });*/

      fail(`async () => a
  () => {}`, Context.Empty, {
          source: `async () => a
      () => {}`,
      });

      fail(`() => {}()`, Context.Empty, {
          source: `() => {}()`,
      });
  });

  describe('Pass', () => {

      const validSyntax = [
          `() => {}`,
          `a => {}`,
          `async () => {}`,
          `async => {}`,
          `async => {}
         async => {}`,
          `() => {}`,
          `() => {}
         async()
         async => {}
         async => {}
         a => {}
         a => {}`,
          `() => {}`,
          `() => {}
         async()
         async => {}
         async => {}
         a => {}
         a => {}`,
          `a => {}
         a => {}
         async () => {}
         a => {}
         a => {}
         a => {}
         a => {}
         async a => {}
         async a => {}
         async a => {}
         async a => {}`,
          `async () => {}`,
          `() => {}
         async => {}
         async => {}
         a => a
         async a => {}`,

          `() => {}
          () => {}
          () => {}
          () => {}
          () => {}
          () => {}
          () => {}
          () => {}
          () => {}
          () => {}
         `,

          `async () => {}
          async () => {}
          async () => {}
          async () => {}
          async () => {}
          async () => {}
          async () => {}
          async () => {}
          async () => {}
          async () => {}
         `,

          `async () => {}
          () => {}
           async () => {}
          async () => {}
          () => {}
             () => {}
          a((a))
       async () => {}
       async () => {}
        async () => {}
        async () => {}
         `,

          `async () => {}
          () => {}
          async () => {}
          async () => {}
          () => {}
          () => {}
          async () => {}
          async () => {}
          async () => {}
          async a => {}
          () => {}
          () => {}
          async()
          async a => {}
         `,

          `() => {}
         () => {}
         () => {}
         () => {}
         () => {}`,
          `() => {}
         async => {}
         async => {}
         a => {}
         a => {}`,

          `() => {}`,
          `() => {}
         async()
         async => {}
         async => {}
         a => {}
         a => {}`,

          `() => {}`,
          `() => {}
         async()
         async => {}
         async => {}
         a => {}
         a => {}`,

          `() => {}`,
          `() => {}
         async()
         async => {}
         async => {}
         a => {}
         a => {}`,

          `() => {}`,
          `() => {}
         async()
         async => {}
         async => {}
         a => {}
         a => {}`,

          `() => {}`,
          `() => {}
         async()
         async => {}
         async => {}
         a => {}
         a => {}`,

          `() => {}
         async()
         async => {}
         async => {}
         async icefapper => {}
         async icefapper => {}`,

          `() => {}
         async()
         async => {}
         async => {}
         a => {}
         a => {}`,

          `() => {}
          a()
          async()`,
          `async () => {}
      () => {}
      async b => {}
      async b => {}
      async () => {}
      async () => {}
      () => {}
      a => {}
      a => {}
      async () => {}
      () => {}
      a => {}
      async () => {}
      () => {}
      async () => {}
      a => {}
      async () => {}
      async () => {}
      () => {}`,
          `a => a => a => async a => a`,
          `a => a => a => async a => a
      async a => a
      a => a => a => async a => a
      async () => {}
      async a => a`,
          `() => {}
      () => {}
      () => {}
      () => {}
      () => {}
      () => {}
      () => {}
      async b => {}
      async b => {}
      async b => {}
      async () => {}
      async () => {}
      async () => {}
      async () => {}
      async () => {}
      () => {}
      async () => {}
      () => {}
      async () => {}
      () => {}
      a => {}
      a => {}
      async () => {}
      () => {}
      a => {}
      () => {}
      async () => {}
      async () => {}
      () => {}
      async () => {}
      a => {}
      async () => {}
      async () => {}
      () => {}`,
          `async () => {}
    async () => {}`,
          `async () => {}
    () => {}`,
          `() => {}
    () => {}
    a => {}
    b => {}
    async b => {}
    async b => {}
    () => {}
    () => {}
    async cherow => a`,
          `() => {}
    () => {}
     cherow => a.b()()()((b => {})())()()()()(a,b)
    a => {
     return f.call(b, a => {
     return f.call(b, a);
    });
    }`,
          `async () => {}
    async () => {}
    async () => {}
    async () => {}
    async () => {}
    async cherow => {}
    async cherow => {}
    async cherow => {}
    async cherow => {}
    async cherow => {}
    () => {}
    () => {}
    () => {}
    () => {}
    (() => {})().abc.call("Hello")`,
          `async () => {}
    async () => {}
    async () => {}
    async () => {}
    async () => {}
    async cherow => {}
    async cherow => {}
    async cherow => {}
    async cherow => {
    async cherow => {}
    async cherow => {}
    async cherow => {}
    async cherow => {}
    }
    async cherow => {}
    () => {
      (() => {})().abc.call("Hello")
      (() => {})().abc.call("Hello")
      (() => {})().abc.call("Hello")
    }
    () => {}
    () => {}
    () => {}
    (() => {})().abc.call("Hello")`,
          `a.b.c = (() => {})
    async () => {}
    async () => {}
    async () => {}
    async () => {}
    a.b.c = (() => {})( (() => {})().abc.call("Hello"))
     cherow => {
    (() => {})().abc.call("Hello")
    }
    cherow => {}
     cherow => {
     cherow => {
     cherow => {}
    }
    (a)(b).c.d.e(
      a => {
      (a) => {
      (a)(b).c.d.e()
      }
      }
    )
    }
    a => {
    b => {}
     cherow => {}
     cherow => {
     (() => {
      (() => {})().abc.call("Hello")
     })().abc.call("Hello")
    }
     cherow => {}
    }
     cherow => {}
    () => {
      (() => {})().abc.call("Hello")
      (() => {})().abc.call("Hello")
      (() => {})().abc.call("Hello")
    }
    () => {}
    () => {}
    () => {}
    (() => {})().abc.call("Hello")`,
      ];

      for (const arg of validSyntax) {

          it(`${arg}`, () => {
              t.doesNotThrow(() => {
                  parseSource(`${arg}`, undefined, Context.Empty);
              });
          });

          it(`function foo() { ${arg} }`, () => {
              t.doesNotThrow(() => {
                  parseSource(`function foo() { ${arg} }`, undefined, Context.Empty);
              });
          });
      }
  });
});
