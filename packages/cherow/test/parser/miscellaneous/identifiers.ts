import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Identifiers', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

      fail('"\\x{0}"', Context.Empty, {
          source: '"\\x{0}"',
      });

      fail('var 🀒', Context.Empty, {
          source: 'var 🀒',
      });

      fail('var true = 123;', Context.Empty, {
        source: 'var true = 123;',
      });

      fail('var const = 123;', Context.Empty, {
        source: 'var const = 123;',
      });

      fail('var typeof = 123;', Context.Empty, {
        source: 'var typeof = 123;',
      });

      fail('export var await;', Context.Strict | Context.Module, {
          source: 'export var await;',
          line: 1,
      });

      fail('var \\uD83B\\uDE00', Context.Empty, {
          source: 'var \\uD83B\\uDE00',
      });

      fail('"use strict"; yield', Context.Empty, {
          source: '"use strict"; yield',
      });

      fail('var func\\u0074ion = 123;', Context.Empty, {
          source: 'var func\\u0074ion = 123;',
      });

      fail('var in = 123;', Context.Empty, {
          source: 'var in = 123;'
      });

      fail('var aⸯ; // U+2E2F', Context.Empty, {
          source: 'var aⸯ; // U+2E2F',
      });

      fail('var @', Context.Empty, {
          source: 'var @',
      });

      fail('var 🀒', Context.Empty, {
          source: 'var 🀒',
      });

    //   fail("var source = '\uD800!';", Context.Empty, {
    //       source: "source = '\uD800!';",
    //   });

      fail('var cla\u{73}s = 123;', Context.Empty, {
          source: 'var cla\u{73}s = 123;',
      });
  });

  describe('Pass', () => {

      // Yield is valid as identifiers in sloppy mode
      describe('Yield', () => {

          const programs = [
              'var yield;',
              'var yield = 1',
              'var object = {yield}',
              'const yield = yield;',
              'let foo, yield;',
              'var foo, yield;',
              'try { } catch (yield) { }',
              'function yield() { }',
              '(function yield() { })',
              'function foo(yield) { }',
              'function foo(bar, yield) { }',
              'yield = 1;',
              'var foo = yield = 1;',
              'yield * 2;',
              '++yield;',
              'yield++;',
              'yield++ - 1;',
              'yield: 34',
              '(yield) => {}',
              '() => yield',
              'function yield(yield) { yield: yield (yield + yield(0)); }',
              '({ yield: 1 })',
              '({ get yield() { 1 } })',
              'yield(100)',
              'yield[100]',
          ];

          for (const arg of programs) {
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

              it(`(function foo() { ${arg}}`, () => {
                  t.doesNotThrow(() => {
                      parseSource(`(function foo() { ${arg}})`, undefined, Context.Empty);
                  });
              });

              it(`function * gen() { function not_gen() { ${arg}}}`, () => {
                  t.doesNotThrow(() => {
                      parseSource(`function * gen() { function not_gen() { ${arg}}}`, undefined, Context.Empty);
                  });
              });

              it(`(function foo() { ${arg}}`, () => {
                  t.doesNotThrow(() => {
                      parseSource(`(function foo() { ${arg}})`, undefined, Context.Empty);
                  });
              });
          }

          // Enum is valid as identifiers in sloppy mode in a few cases only

          describe('Enum', () => {

              const programs = [
                  'x = { enum: false }',
                  'class X { enum(){} }',
                  'class X { static enum(){} }',
              ];

              for (const arg of programs) {

                  it(`${arg}`, () => {
                      t.doesNotThrow(() => {
                          parseSource(`${arg}`, undefined, Context.Empty);
                      });
                  });
              }
          });

          // Async is valid as identifiers in sloppy mode

          describe('Async', () => {

              const programs = [
                  //"async: function f() {}",
                  `async
                  function f() {}`,
                  'x = { async: false }',
                  `a = async
                  function f(){}`,
                  'async => 42;',
                  'const answer = async => 42;',
                  'async function await() {}',
                  'class X { async await(){} }',
                  'f(x, async(y, z))',
                  'class X { static async await(){} }',
                  'x = async(y);',
                  'class X { async() {} }',
                  'let async = await;',
                  'x = { async: false }',
              ];

              for (const arg of programs) {

                  it(`${arg}`, () => {
                      t.doesNotThrow(() => {
                          parseSource(`${arg}`, undefined, Context.Empty);
                      });
                  });
              }
          });

          // Await is valid as identifiers in sloppy mode

          describe('Await', () => {

              const programs = [
                  //"async: function f() {}",
                  `await;`,
                  'class await {}',
                  `function await(yield) {}`,
                  'var await = 1',
                  'async(await)',
                  '({ await: async })',
                  'await => {}',
                  'await => async',
                  'class X { await(){} }',
                  'f(x, await(y, z))',
                  'class X { static await(){} }',
                  'x = await(y);',
                  'class X { await() {} }',
                  'let async = await;',
                  'x = { await: false }',
              ];

              for (const arg of programs) {

                  it(`${arg}`, () => {
                      t.doesNotThrow(() => {
                          parseSource(`${arg}`, undefined, Context.Empty);
                      });
                  });
              }
          });

          // Let is valid as identifiers in sloppy mode
          describe('Let', () => {

              const invalidLetIdentifier = [
                  'let let = 1',
                  'for (let let = 1; let < 1; let++) {}',
                  'for (let let in {}) {}',
                  'for (let let of []) {}',
                  'const let = 1',
                  'for (const let = 1; let < 1; let++) {}',
                  'for (const let in {}) {}',
                  'for (const let of []) {}',
                  'let [let] = 1',
                  'for (let [let] = 1; let < 1; let++) {}',
                  'for (let [let] in {}) {}',
                  'for (let [let] of []) {}',
                  'const [let] = 1',
                  'for (const [let] = 1; let < 1; let++) {}',
                  'for (const [let] in {}) {}',
                  'for (const [let] of []) {}',
                  'let l\\u0065t = 1',
                  'const l\\u0065t = 1',
                  'let [l\\u0065t] = 1',
                  'const [l\\u0065t] = 1',
                  'for (let l\\u0065t in {}) {}',
              ];

              for (const arg of invalidLetIdentifier) {

                  it(`${arg}`, () => {
                      t.throws(() => {
                          parseSource(`${arg}`, undefined, Context.Empty);
                      });
                  });

                  it(`(function() {${arg}})()`, () => {
                      t.throws(() => {
                          parseSource(`(function() {${arg}})()`, undefined, Context.Empty);
                      });
                  });
              }

              const programs = [
                  'var let;',
                  'var foo, let;',
                  'try { } catch (let) { }',
                  'function let() { }',
                  '(function let() { })',
                  'function foo(let) { }',
                  'function foo(bar, let) { }',
                  'let = 1;',
                  'var foo = let = 1;',
                  'let * 2;',
                  '++let;',
                  'let++;',
                  'let: 34',
                  'function let(let) { let: let(let + let(0)); }',
                  '({ let: 1 })',
                  '({ get let() { 1 } })',
                  'let(100)',
                  'L: let\nx',
                  'L: let\n{x}',
                  'let',
                  'let = 1',
                  'for (let = 1; let < 1; let++) {}',
                  'for (let in {}) {}',
                  'for (var let = 1; let < 1; let++) {}',
                  'for (var let in {}) {}',
                  'for (var [let] = 1; let < 1; let++) {}',
                  'for (var [let] in {}) {}',
                  'var let',
                  'var [let] = []',
              ];

              for (const arg of programs) {

                  it(`function f() { ${arg}}`, () => {
                      t.doesNotThrow(() => {
                          parseSource(`function f() { ${arg}}`, undefined, Context.Empty);
                      });
                  });

                  it(`function f() { ${arg}}`, () => {
                      t.doesNotThrow(() => {
                          parseSource(`(function f() { ${arg}})`, undefined, Context.Empty);
                      });
                  });

                  it(`function * gen() { function not_gen() { ${arg}}}`, () => {
                      t.doesNotThrow(() => {
                          parseSource(`function * gen() { function not_gen() { ${arg}}}`, undefined, Context.Empty);
                      });
                  });

                  it(`(function foo() { ${arg}}`, () => {
                      t.doesNotThrow(() => {
                          parseSource(`(function foo() { ${arg}})`, undefined, Context.Empty);
                      });
                  });
              }
          });
      });

      pass(`T‍ = ([]);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'T‍ = ([]);',
          expected: {
              body: [{
                  end: 10,
                  expression: {
                      end: 9,
                      left: {
                          end: 1,
                          loc: {
                              end: {
                                  column: 1,
                                  line: 1,
                              },
                              start: {
                                  column: 0,
                                  line: 1,
                              }
                          },
                          name: 'T',
                          start: 0,
                          type: 'Identifier',
                      },
                      loc: {
                          end: {
                              column: 9,
                              line: 1,
                          },
                          start: {
                              column: 0,
                              line: 1,
                          }
                      },
                      operator: '=',
                      right: {
                          elements: [],
                          end: 8,
                          loc: {
                              end: {
                                  column: 8,
                                  line: 1,
                              },
                              start: {
                                  column: 6,
                                  line: 1,
                              }
                          },
                          start: 6,
                          type: 'ArrayExpression'
                      },
                      start: 0,
                      type: 'AssignmentExpression'
                  },
                  loc: {
                      end: {
                          column: 10,
                          line: 1,
                      },
                      start: {
                          column: 0,
                          line: 1,
                      }
                  },
                  start: 0,
                  type: 'ExpressionStatement'
              }],
              end: 10,
              loc: {
                  end: {
                      column: 10,
                      line: 1,
                  },
                  start: {
                      column: 0,
                      line: 1,
                  }
              },
              sourceType: 'script',
              start: 0,
              type: 'Program'
          }
      });

      pass(`var a℮;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'var a℮;',
          expected: {
              type: 'Program',
              body: [{
                  type: 'VariableDeclaration',
                  declarations: [{
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                          type: 'Identifier',
                          name: 'a℮',
                          start: 4,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          }
                      },
                      start: 4,
                      end: 6,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 6
                          }
                      }
                  }],
                  kind: 'var',
                  start: 0,
                  end: 7,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 7
                      }
                  }
              }],
              sourceType: 'script',
              start: 0,
              end: 7,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 7
                  }
              }
          }
      });

      pass(`var aᢆ;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'var aᢆ;',
          expected: {
              type: 'Program',
              body: [{
                  type: 'VariableDeclaration',
                  declarations: [{
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                          type: 'Identifier',
                          name: 'aᢆ',
                          start: 4,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          }
                      },
                      start: 4,
                      end: 6,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 6
                          }
                      }
                  }],
                  kind: 'var',
                  start: 0,
                  end: 7,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 7
                      }
                  }
              }],
              sourceType: 'script',
              start: 0,
              end: 7,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 7
                  }
              }
          }
      });

      pass(`var a፰;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'var a፰;',
          expected: {
              type: 'Program',
              body: [{
                  type: 'VariableDeclaration',
                  declarations: [{
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                          type: 'Identifier',
                          name: 'a፰',
                          start: 4,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          }
                      },
                      start: 4,
                      end: 6,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 6
                          }
                      }
                  }],
                  kind: 'var',
                  start: 0,
                  end: 7,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 7
                      }
                  }
              }],
              sourceType: 'script',
              start: 0,
              end: 7,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 7
                  }
              }
          }
      });

      pass(`var ゛;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'var ゛;',
          expected: {
              type: 'Program',
              body: [{
                  type: 'VariableDeclaration',
                  declarations: [{
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                          type: 'Identifier',
                          name: '゛',
                          start: 4,
                          end: 5,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 5
                              }
                          }
                      },
                      start: 4,
                      end: 5,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 5
                          }
                      }
                  }],
                  kind: 'var',
                  start: 0,
                  end: 6,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 6
                      }
                  }
              }],
              sourceType: 'script',
              start: 0,
              end: 6,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 6
                  }
              }
          }
      });

      pass(`var A\\u{42}C;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'var A\\u{42}C;',
          expected: {
              type: 'Program',
              start: 0,
              end: 13,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 13
                  }
              },
              body: [{
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 13,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 13
                      }
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      id: {
                          type: 'Identifier',
                          start: 4,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          name: 'ABC'
                      },
                      init: null
                  }],
                  kind: 'var'
              }],
              sourceType: 'script'
          }
      });

      pass(`let ℮`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'let ℮',
          expected: {
              type: 'Program',
              body: [{
                  type: 'VariableDeclaration',
                  declarations: [{
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                          type: 'Identifier',
                          name: '℮',
                          start: 4,
                          end: 5,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 5
                              }
                          }
                      },
                      start: 4,
                      end: 5,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 5
                          }
                      }
                  }],
                  kind: 'let',
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
                  }
              }],
              sourceType: 'script',
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
              }
          }
      });

      pass(`var ℘;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'var ℘;',
          expected: {
              type: 'Program',
              start: 0,
              end: 6,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 6
                  }
              },
              body: [{
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 6,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 6
                      }
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 5,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 5
                          }
                      },
                      id: {
                          type: 'Identifier',
                          start: 4,
                          end: 5,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 5
                              }
                          },
                          name: '℘'
                      },
                      init: null
                  }],
                  kind: 'var'
              }],
              sourceType: 'script'
          }
      });

      pass(`a123`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module | Context.Strict, {
          source: `a123`,
          expected: {
              type: 'Program',
              start: 0,
              end: 4,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 4
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 4,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 4
                      }
                  },
                  expression: {
                      type: 'Identifier',
                      start: 0,
                      end: 4,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 4
                          }
                      },
                      name: 'a123'
                  }
              }],
              sourceType: 'module'
          }
      });

      pass(`a_123`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module | Context.Strict, {
          source: `a_123`,
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
                      name: 'a_123'
                  }
              }],
              sourceType: 'module'
          }
      });

      pass(`$foo`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
          source: `$foo`,
          expected: {
              type: 'Program',
              start: 0,
              end: 4,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 4
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 4,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 4
                      }
                  },
                  expression: {
                      type: 'Identifier',
                      start: 0,
                      end: 4,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 4
                          }
                      },
                      name: '$foo'
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`$_123`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
          source: `$_123`,
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
                      name: '$_123'
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`\\u{0069}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
          source: `\\u{0069}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 8,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 8
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 8,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 8
                      }
                  },
                  expression: {
                      type: 'Identifier',
                      start: 0,
                      end: 8,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 8
                          }
                      },
                      name: 'i'
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('\\u{00069} = i + \\u{00069};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
          source: '\\u{00069} = i + \\u{00069};',
          expected: {
              type: 'Program',
              start: 0,
              end: 26,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 26
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 26,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 26
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 25,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 25
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'Identifier',
                          start: 0,
                          end: 9,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 9
                              }
                          },
                          name: 'i'
                      },
                      right: {
                          type: 'BinaryExpression',
                          start: 12,
                          end: 25,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 12
                              },
                              end: {
                                  line: 1,
                                  column: 25
                              }
                          },
                          left: {
                              type: 'Identifier',
                              start: 12,
                              end: 13,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 13
                                  }
                              },
                              name: 'i'
                          },
                          operator: '+',
                          right: {
                              type: 'Identifier',
                              start: 16,
                              end: 25,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 16
                                  },
                                  end: {
                                      line: 1,
                                      column: 25
                                  }
                              },
                              name: 'i'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      /*  pass('T‍ = ([]);', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: 'T‍ = ([]);',
            expected: {
                type: 'Program',
                start: 0,
                end: 8,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 8
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 8,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 8
                      }
                    },
                    expression: {
                      type: 'Identifier',
                      start: 0,
                      end: 8,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 8
                        }
                      },
                      name: 'i'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });*/

      pass(`this.\\u0069`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
          source: `this.\\u0069`,
          expected: {
              type: 'Program',
              start: 0,
              end: 11,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 11
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 11,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 11
                      }
                  },
                  expression: {
                      type: 'MemberExpression',
                      start: 0,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      object: {
                          type: 'ThisExpression',
                          start: 0,
                          end: 4,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 4
                              }
                          }
                      },
                      property: {
                          type: 'Identifier',
                          start: 5,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          name: 'i'
                      },
                      computed: false
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`foo["\\u{20BB7}"]`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
          source: `foo["\\u{20BB7}"]`,
          expected: {
              type: 'Program',
              start: 0,
              end: 16,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 16
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 16,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 16
                      }
                  },
                  expression: {
                      type: 'MemberExpression',
                      start: 0,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      },
                      object: {
                          type: 'Identifier',
                          start: 0,
                          end: 3,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 3
                              }
                          },
                          name: 'foo'
                      },
                      property: {
                          type: 'Literal',
                          start: 4,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          value: '𠮷',
                          raw: '"\\u{20BB7}"'
                      },
                      computed: true
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('var $\\u{20BB7} = "b";', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
          source: 'var $\\u{20BB7} = "b";',
          expected: {
              type: 'Program',
              start: 0,
              end: 21,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 21
                  }
              },
              body: [{
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 21,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 21
                      }
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 20,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 20
                          }
                      },
                      id: {
                          type: 'Identifier',
                          start: 4,
                          end: 14,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 14
                              }
                          },
                          name: '$𠮷'
                      },
                      init: {
                          type: 'Literal',
                          start: 17,
                          end: 20,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 17
                              },
                              end: {
                                  line: 1,
                                  column: 20
                              }
                          },
                          value: 'b',
                          raw: '"b"'
                      }
                  }],
                  kind: 'var'
              }],
              sourceType: 'script'
          }
      });

      pass('var _\\u0524 = "a";', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
          source: 'var _\\u0524 = "a";',
          expected: {
              type: 'Program',
              start: 0,
              end: 18,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 18
                  }
              },
              body: [{
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 18,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 18
                      }
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      },
                      id: {
                          type: 'Identifier',
                          start: 4,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          name: '_Ԥ'
                      },
                      init: {
                          type: 'Literal',
                          start: 14,
                          end: 17,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 14
                              },
                              end: {
                                  line: 1,
                                  column: 17
                              }
                          },
                          value: 'a',
                          raw: '"a"'
                      }
                  }],
                  kind: 'var'
              }],
              sourceType: 'script'
          }
      });

      pass('var $00xxx\\u0069\\u0524\\u{20BB7} = "c";', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
          source: 'var $00xxx\\u0069\\u0524\\u{20BB7} = "c";',
          expected: {
              type: 'Program',
              start: 0,
              end: 38,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 38
                  }
              },
              body: [{
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 38,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 38
                      }
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 37,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 37
                          }
                      },
                      id: {
                          type: 'Identifier',
                          start: 4,
                          end: 31,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 31
                              }
                          },
                          name: '$00xxxiԤ𠮷'
                      },
                      init: {
                          type: 'Literal',
                          start: 34,
                          end: 37,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 34
                              },
                              end: {
                                  line: 1,
                                  column: 37
                              }
                          },
                          value: 'c',
                          raw: '"c"'
                      }
                  }],
                  kind: 'var'
              }],
              sourceType: 'script'
          }
      });

      pass('var a\\u2118;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
          source: 'var a\\u2118;',
          expected: {
              type: 'Program',
              body: [{
                  type: 'VariableDeclaration',
                  declarations: [{
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                          type: 'Identifier',
                          name: 'a℘',
                          start: 4,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          }
                      },
                      start: 4,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      }
                  }],
                  kind: 'var',
                  start: 0,
                  end: 12,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 12
                      }
                  }
              }],
              sourceType: 'script',
              start: 0,
              end: 12,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 12
                  }
              }
          }
      });

      pass('var a\\u309C;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
          source: 'var a\\u309C;',
          expected: {
              type: 'Program',
              body: [{
                  type: 'VariableDeclaration',
                  declarations: [{
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                          type: 'Identifier',
                          name: 'a゜',
                          start: 4,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          }
                      },
                      start: 4,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      }
                  }],
                  kind: 'var',
                  start: 0,
                  end: 12,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 12
                      }
                  }
              }],
              sourceType: 'script',
              start: 0,
              end: 12,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 12
                  }
              }
          }
      });

      pass('var a፰;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
          source: 'var a፰;',
          expected: {
              type: 'Program',
              body: [{
                  type: 'VariableDeclaration',
                  declarations: [{
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                          type: 'Identifier',
                          name: 'a፰',
                          start: 4,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          }
                      },
                      start: 4,
                      end: 6,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 6
                          }
                      }
                  }],
                  kind: 'var',
                  start: 0,
                  end: 7,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 7
                      }
                  }
              }],
              sourceType: 'script',
              start: 0,
              end: 7,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 7
                  }
              }
          }
      });

      pass('var a᧚;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
          source: 'var a᧚;',
          expected: {
              type: 'Program',
              body: [{
                  type: 'VariableDeclaration',
                  declarations: [{
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                          type: 'Identifier',
                          name: 'a᧚',
                          start: 4,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          }
                      },
                      start: 4,
                      end: 6,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 6
                          }
                      }
                  }],
                  kind: 'var',
                  start: 0,
                  end: 7,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 7
                      }
                  }
              }],
              sourceType: 'script',
              start: 0,
              end: 7,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 7
                  }
              }
          }
      });

      pass('var \\u1886;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
          source: 'var \\u1886;',
          expected: {
              type: 'Program',
              body: [{
                  type: 'VariableDeclaration',
                  declarations: [{
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                          type: 'Identifier',
                          name: 'ᢆ',
                          start: 4,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          }
                      },
                      start: 4,
                      end: 10,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 10
                          }
                      }
                  }],
                  kind: 'var',
                  start: 0,
                  end: 11,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 11
                      }
                  }
              }],
              sourceType: 'script',
              start: 0,
              end: 11,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 11
                  }
              }
          }
      });

      pass('var ゛;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
         source: 'var ゛;',
         expected: {
             type: 'Program',
             body: [
                 {
                     type: 'VariableDeclaration',
                     declarations: [
                         {
                             type: 'VariableDeclarator',
                             init: null,
                             id: {
                                 type: 'Identifier',
                                 name: '゛',
                                 start: 4,
                                 end: 5,
                                 loc: {
                                     start: {
                                         line: 1,
                                         column: 4
                                     },
                                     end: {
                                         line: 1,
                                         column: 5
                                     }
                                 }
                             },
                             start: 4,
                             end: 5,
                             loc: {
                                 start: {
                                     line: 1,
                                     column: 4
                                 },
                                 end: {
                                     line: 1,
                                     column: 5
                                 }
                             }
                         }
                     ],
                     kind: 'var',
                     start: 0,
                     end: 6,
                     loc: {
                         start: {
                             line: 1,
                             column: 0
                         },
                         end: {
                             line: 1,
                             column: 6
                         }
                     }
                 }
             ],
             sourceType: 'script',
             start: 0,
             end: 6,
             loc: {
                 start: {
                     line: 1,
                     column: 0
                 },
                 end: {
                     line: 1,
                     column: 6
                 }
             }
         }
      });

      // \u10140
      pass('var 𐅀𐅀;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
         source: 'var 𐅀𐅀;',
         expected: {
             type: 'Program',
             body: [
                 {
                     type: 'VariableDeclaration',
                     declarations: [
                         {
                             type: 'VariableDeclarator',
                             init: null,
                             id: {
                                 type: 'Identifier',
                                 name: '𐅀𐅀',
                                 start: 4,
                                 end: 8,
                                 loc: {
                                     start: {
                                         line: 1,
                                         column: 4
                                     },
                                     end: {
                                         line: 1,
                                         column: 6
                                     }
                                 }
                             },
                             start: 4,
                             end: 8,
                             loc: {
                                 start: {
                                     line: 1,
                                     column: 4
                                 },
                                 end: {
                                     line: 1,
                                     column: 6
                                 }
                             }
                         }
                     ],
                     kind: 'var',
                     start: 0,
                     end: 9,
                     loc: {
                         start: {
                             line: 1,
                             column: 0
                         },
                         end: {
                             line: 1,
                             column: 7
                         }
                     }
                 }
             ],
             sourceType: 'script',
             start: 0,
             end: 9,
             loc: {
                 start: {
                     line: 1,
                     column: 0
                 },
                 end: {
                     line: 1,
                     column: 7
                 }
             }
         }
      });

      pass('var \uD83B\uDE00', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
        source: 'var \uD83B\uDE00',
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: '\uD83B\uDE00',
                                start: 4,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                }
                            },
                            start: 4,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 6,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 6,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }
      });

      pass('var \u{1EE00}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
         source: 'var \u{1EE00}',
         expected: {
             type: 'Program',
             body: [
                 {
                     type: 'VariableDeclaration',
                     declarations: [
                         {
                             type: 'VariableDeclarator',
                             init: null,
                             id: {
                                 type: 'Identifier',
                                 name: '\u{1EE00}',
                                 start: 4,
                                 end: 6,
                                 loc: {
                                     start: {
                                         line: 1,
                                         column: 4
                                     },
                                     end: {
                                         line: 1,
                                         column: 5
                                     }
                                 }
                             },
                             start: 4,
                             end: 6,
                             loc: {
                                 start: {
                                     line: 1,
                                     column: 4
                                 },
                                 end: {
                                     line: 1,
                                     column: 5
                                 }
                             }
                         }
                     ],
                     kind: 'var',
                     start: 0,
                     end: 6,
                     loc: {
                         start: {
                             line: 1,
                             column: 0
                         },
                         end: {
                             line: 1,
                             column: 5
                         }
                     }
                 }
             ],
             sourceType: 'script',
             start: 0,
             end: 6,
             loc: {
                 start: {
                     line: 1,
                     column: 0
                 },
                 end: {
                     line: 1,
                     column: 5
                 }
             }
         }
      });

      pass('var _\u{1EE03}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
         source: 'var _\u{1EE03}',
         expected: {
             type: 'Program',
             body: [
                 {
                     type: 'VariableDeclaration',
                     declarations: [
                         {
                             type: 'VariableDeclarator',
                             init: null,
                             id: {
                                 type: 'Identifier',
                                 name: '_\u{1EE03}',
                                 start: 4,
                                 end: 7,
                                 loc: {
                                     start: {
                                         line: 1,
                                         column: 4
                                     },
                                     end: {
                                         line: 1,
                                         column: 6
                                     }
                                 }
                             },
                             start: 4,
                             end: 7,
                             loc: {
                                 start: {
                                     line: 1,
                                     column: 4
                                 },
                                 end: {
                                     line: 1,
                                     column: 6
                                 }
                             }
                         }
                     ],
                     kind: 'var',
                     start: 0,
                     end: 7,
                     loc: {
                         start: {
                             line: 1,
                             column: 0
                         },
                         end: {
                             line: 1,
                             column: 6
                         }
                     }
                 }
             ],
             sourceType: 'script',
             start: 0,
             end: 7,
             loc: {
                 start: {
                     line: 1,
                     column: 0
                 },
                 end: {
                     line: 1,
                     column: 6
                 }
             }
         }
      });

      pass('var \u{1EE0A}\u{1EE0B}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
         source: 'var \u{1EE0A}\u{1EE0B}',
         expected: {
             type: 'Program',
             body: [
                 {
                     type: 'VariableDeclaration',
                     declarations: [
                         {
                             type: 'VariableDeclarator',
                             init: null,
                             id: {
                                 type: 'Identifier',
                                 name: '\u{1EE0A}\u{1EE0B}',
                                 start: 4,
                                 end: 8,
                                 loc: {
                                     start: {
                                         line: 1,
                                         column: 4
                                     },
                                     end: {
                                         line: 1,
                                         column: 6
                                     }
                                 }
                             },
                             start: 4,
                             end: 8,
                             loc: {
                                 start: {
                                     line: 1,
                                     column: 4
                                 },
                                 end: {
                                     line: 1,
                                     column: 6
                                 }
                             }
                         }
                     ],
                     kind: 'var',
                     start: 0,
                     end: 8,
                     loc: {
                         start: {
                             line: 1,
                             column: 0
                         },
                         end: {
                             line: 1,
                             column: 6
                         }
                     }
                 }
             ],
             sourceType: 'script',
             start: 0,
             end: 8,
             loc: {
                 start: {
                     line: 1,
                     column: 0
                 },
                 end: {
                     line: 1,
                     column: 6
                 }
             }
         }
      });

      pass('var \u{1EE06}_$', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
         source: 'var \u{1EE06}_$',
         expected: {
             type: 'Program',
             body: [
                 {
                     type: 'VariableDeclaration',
                     declarations: [
                         {
                             type: 'VariableDeclarator',
                             init: null,
                             id: {
                                 type: 'Identifier',
                                 name: '\u{1EE06}_$',
                                 start: 4,
                                 end: 8,
                                 loc: {
                                     start: {
                                         line: 1,
                                         column: 4
                                     },
                                     end: {
                                         line: 1,
                                         column: 7
                                     }
                                 }
                             },
                             start: 4,
                             end: 8,
                             loc: {
                                 start: {
                                     line: 1,
                                     column: 4
                                 },
                                 end: {
                                     line: 1,
                                     column: 7
                                 }
                             }
                         }
                     ],
                     kind: 'var',
                     start: 0,
                     end: 8,
                     loc: {
                         start: {
                             line: 1,
                             column: 0
                         },
                         end: {
                             line: 1,
                             column: 7
                         }
                     }
                 }
             ],
             sourceType: 'script',
             start: 0,
             end: 8,
             loc: {
                 start: {
                     line: 1,
                     column: 0
                 },
                 end: {
                     line: 1,
                     column: 7
                 }
             }
         }
      });

      pass('var 𞸀', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
         source: 'var 𞸀',
         expected: {
             type: 'Program',
             body: [
                 {
                     type: 'VariableDeclaration',
                     declarations: [
                         {
                             type: 'VariableDeclarator',
                             init: null,
                             id: {
                                 type: 'Identifier',
                                 name: '𞸀',
                                 start: 4,
                                 end: 6,
                                 loc: {
                                     start: {
                                         line: 1,
                                         column: 4
                                     },
                                     end: {
                                         line: 1,
                                         column: 5
                                     }
                                 }
                             },
                             start: 4,
                             end: 6,
                             loc: {
                                 start: {
                                     line: 1,
                                     column: 4
                                 },
                                 end: {
                                     line: 1,
                                     column: 5
                                 }
                             }
                         }
                     ],
                     kind: 'var',
                     start: 0,
                     end: 6,
                     loc: {
                         start: {
                             line: 1,
                             column: 0
                         },
                         end: {
                             line: 1,
                             column: 5
                         }
                     }
                 }
             ],
             sourceType: 'script',
             start: 0,
             end: 6,
             loc: {
                 start: {
                     line: 1,
                     column: 0
                 },
                 end: {
                     line: 1,
                     column: 5
                 }
             }
         }
      });

      pass('var _𞸃', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
         source: 'var _𞸃',
         expected: {
             type: 'Program',
             body: [
                 {
                     type: 'VariableDeclaration',
                     declarations: [
                         {
                             type: 'VariableDeclarator',
                             init: null,
                             id: {
                                 type: 'Identifier',
                                 name: '_𞸃',
                                 start: 4,
                                 end: 7,
                                 loc: {
                                     start: {
                                         line: 1,
                                         column: 4
                                     },
                                     end: {
                                         line: 1,
                                         column: 6
                                     }
                                 }
                             },
                             start: 4,
                             end: 7,
                             loc: {
                                 start: {
                                     line: 1,
                                     column: 4
                                 },
                                 end: {
                                     line: 1,
                                     column: 6
                                 }
                             }
                         }
                     ],
                     kind: 'var',
                     start: 0,
                     end: 7,
                     loc: {
                         start: {
                             line: 1,
                             column: 0
                         },
                         end: {
                             line: 1,
                             column: 6
                         }
                     }
                 }
             ],
             sourceType: 'script',
             start: 0,
             end: 7,
             loc: {
                 start: {
                     line: 1,
                     column: 0
                 },
                 end: {
                     line: 1,
                     column: 6
                 }
             }
         }
      });

      pass('var 𞸊𞸋', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
         source: 'var 𞸊𞸋',
         expected: {
             type: 'Program',
             body: [
                 {
                     type: 'VariableDeclaration',
                     declarations: [
                         {
                             type: 'VariableDeclarator',
                             init: null,
                             id: {
                                 type: 'Identifier',
                                 name: '𞸊𞸋',
                                 start: 4,
                                 end: 8,
                                 loc: {
                                     start: {
                                         line: 1,
                                         column: 4
                                     },
                                     end: {
                                         line: 1,
                                         column: 6
                                     }
                                 }
                             },
                             start: 4,
                             end: 8,
                             loc: {
                                 start: {
                                     line: 1,
                                     column: 4
                                 },
                                 end: {
                                     line: 1,
                                     column: 6
                                 }
                             }
                         }
                     ],
                     kind: 'var',
                     start: 0,
                     end: 8,
                     loc: {
                         start: {
                             line: 1,
                             column: 0
                         },
                         end: {
                             line: 1,
                             column: 6
                         }
                     }
                 }
             ],
             sourceType: 'script',
             start: 0,
             end: 8,
             loc: {
                 start: {
                     line: 1,
                     column: 0
                 },
                 end: {
                     line: 1,
                     column: 6
                 }
             }
         }
      });

      pass('var 𞸆_$', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
         source: 'var 𞸆_$',
         expected: {
             type: 'Program',
             body: [
                 {
                     type: 'VariableDeclaration',
                     declarations: [
                         {
                             type: 'VariableDeclarator',
                             init: null,
                             id: {
                                 type: 'Identifier',
                                 name: '𞸆_$',
                                 start: 4,
                                 end: 8,
                                 loc: {
                                     start: {
                                         line: 1,
                                         column: 4
                                     },
                                     end: {
                                         line: 1,
                                         column: 7
                                     }
                                 }
                             },
                             start: 4,
                             end: 8,
                             loc: {
                                 start: {
                                     line: 1,
                                     column: 4
                                 },
                                 end: {
                                     line: 1,
                                     column: 7
                                 }
                             }
                         }
                     ],
                     kind: 'var',
                     start: 0,
                     end: 8,
                     loc: {
                         start: {
                             line: 1,
                             column: 0
                         },
                         end: {
                             line: 1,
                             column: 7
                         }
                     }
                 }
             ],
             sourceType: 'script',
             start: 0,
             end: 8,
             loc: {
                 start: {
                     line: 1,
                     column: 0
                 },
                 end: {
                     line: 1,
                     column: 7
                 }
             }
         }
      });
   });
});
