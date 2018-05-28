import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Function', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  // Note! Cover grammar - destructuring & binding - are tested various places, so we are not testing
  // it here.

  describe('Failure', () => {

      const invalidFormalParams = [
          '...x = []',
          '[...[ x ] = []]',
          '[...x = []]',
          '[...{ x } = []]',
          '[...[x], y]',
          '[...x, y]',
          '[...{ x }, y]',
          '[...[ x ] = []] = []',
          '[...x = []] = []',
          '[...{ x } = []] = []',
          '[...[x], y] = [1, 2, 3]',
          '[...x, y] = [1, 2, 3]',
          '[...{ x }, y] = [1, 2, 3]',
          '...a,',
          '"use strict"; x = yield',
      ];

      for (const arg of invalidFormalParams) {
          it(`(function (${arg}) {})`, () => {
              t.throws(() => {
                  parseSource(`(function (${arg}) {})`, undefined, Context.Empty);
              });

              t.throws(() => {
                  parseSource(`const foo = (function (${arg}) {})`, undefined, Context.Empty);
              });

              it(`(function (${arg}) {})`, () => {
                  t.throws(() => {
                      parseSource(`(function (${arg}) {})`, undefined, Context.Strict | Context.Module);
                  });
              });
          });
      }

      const validSyntax = [
        '(function(a = 0) { "use strict";})',
        '(function([...{ x }, y] = [1, 2, 3]) {})',
        '(function([...[ x ] = []] = []) {})',
        '(function([...[x], y]) {})',
        '(function([...[x], y]) {})',
        '(function([...[ x ] = []]) {})',
        '0, function(...x = []) {}',
     ];

      for (const arg of validSyntax) {
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
      fail('0, function(...x = []) {};', Context.Empty, {
          source: '0, function(...x = []) {};',
      });

      fail('"use strict"; (function eval() {})', Context.Empty, {
          source: '"use strict"; (function eval() {})',
      });

      fail('"use strict"; (function (eval) {})', Context.Empty, {
          source: '"use strict"; (function (eval) {})',
      });

      fail('"use strict"; (function (icefapper, eval) {})', Context.Empty, {
          source: '"use strict"; (function (icefapper, eval) {})',
      });

      fail('(function (eval) { "use strict"; })', Context.Empty, {
          source: '(function (eval) { "use strict"; })',
      });

      fail('(function (icefapper, eval) { "use strict"; })', Context.Empty, {
          source: '(function (icefapper, eval) { "use strict"; })',
      });

      fail('((function eval() { "use strict"; })());', Context.Empty, {
          source: '((function eval() { "use strict"; })());',
      });

      fail('(function package() { "use strict"; })', Context.Empty, {
          source: '(function package() { "use strict"; })',
      });

      fail('(function (eval) { "use strict"; })', Context.Empty, {
          source: '(function (eval) { "use strict"; })',
      });

      fail('((function eval() { "use strict"; })());', Context.Empty, {
          source: '((function eval() { "use strict"; })());',
      });

      fail('(function package() { "use strict"; })', Context.Empty, {
          source: '(function package() { "use strict"; })',
      });

      fail('"use strict"; (function package() {})', Context.Empty, {
          source: '"use strict"; (function package() {})',
      });
  });

  describe('Pass', () => {

      const validFormalparams = [
          '{...x}',
          '{ x: y }',
          '{ x, }',
          '{ x: y = 33 }',
          '{ fn = function () {}, xFn = function x() {} }',
          '{ cover = (function () {}), xCover = (0, function() {})  }',
          '{ arrow = () => {} }',
          '{}',
          '{ x: y } = { x: 23 }',
          '{ poisoned: x = ++initEvalCount } = poisonedProperty',
          '{ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }',
          '{ x, } = { x: 23 }',
          '[,] = g()',
          '[{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = []',
          '[{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]',
          '[{ x, y, z } = { x: 44, y: 55, z: 66 }] = []',
          '[x = 23] = [,]',
          '[[...x] = [2, 1, 3]] = []',
          '[[x, y, z] = [4, 5, 6]] = []',
          '[ , , ...x]',
          '[, ...x]',
          '[,]',
          '[{ x }]',
          '[{ x }]',
          '[{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }]',
          '[ a = b ]',
          '[x = 23]',
          '[[] = function() { a += 1; }()]',
          'x = args = arguments',
      ];

      for (const arg of validFormalparams) {
          it(`(function(${arg}) {})`, () => {
              t.doesNotThrow(() => {
                  parseSource(`(function(${arg}) {})`, undefined, Context.Empty);
              });
          });
      }

      const validSyntax = [
       '(function([[,] = function* g() {}]) {})',
       '(function([cover = (function () {}), xCover = (0, function() {})]) {})',
       '(function([fn = function () {}, xFn = function x() {}]) {})',
       '(function([x = 23]) {})',
       '(function([...[x, y, z]]) {})',
       '(function([...[,]]) {})',
       '(function([...x]) {})',
       '(function([...{ length }]) {})',
       '(function([x = 23] = [undefined]) {})',
       '(function([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }]) {})',
       '(function({} = null) {})',
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

      pass(`(function package() { (function gave_away_the_package() { "use strict"; }) })`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `(function package() { (function gave_away_the_package() { "use strict"; }) })`,
          expected: {
              type: 'Program',
              start: 0,
              end: 77,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 77
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 77,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 77
                      }
                  },
                  expression: {
                      type: 'FunctionExpression',
                      start: 1,
                      end: 76,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 76
                          }
                      },
                      id: {
                          type: 'Identifier',
                          start: 10,
                          end: 17,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 17
                              }
                          },
                          name: 'package'
                      },
                      generator: false,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                          type: 'BlockStatement',
                          start: 20,
                          end: 76,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 20
                              },
                              end: {
                                  line: 1,
                                  column: 76
                              }
                          },
                          body: [{
                              type: 'ExpressionStatement',
                              start: 22,
                              end: 74,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 22
                                  },
                                  end: {
                                      line: 1,
                                      column: 74
                                  }
                              },
                              expression: {
                                  type: 'FunctionExpression',
                                  start: 23,
                                  end: 73,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 23
                                      },
                                      end: {
                                          line: 1,
                                          column: 73
                                      }
                                  },
                                  id: {
                                      type: 'Identifier',
                                      start: 32,
                                      end: 53,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 32
                                          },
                                          end: {
                                              line: 1,
                                              column: 53
                                          }
                                      },
                                      name: 'gave_away_the_package'
                                  },
                                  generator: false,
                                  expression: false,
                                  async: false,
                                  params: [],
                                  body: {
                                      type: 'BlockStatement',
                                      start: 56,
                                      end: 73,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 56
                                          },
                                          end: {
                                              line: 1,
                                              column: 73
                                          }
                                      },
                                      body: [{
                                          type: 'ExpressionStatement',
                                          start: 58,
                                          end: 71,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 58
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 71
                                              }
                                          },
                                          expression: {
                                              type: 'Literal',
                                              start: 58,
                                              end: 70,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 58
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 70
                                                  }
                                              },
                                              value: 'use strict',
                                              raw: '"use strict"'
                                          },
                                          directive: 'use strict'
                                      }]
                                  }
                              }
                          }]
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`(function (eval) { (function () { "use strict"; })})`, Context.Empty, {
          source: `(function (eval) { (function () { "use strict"; })})`,
          expected: {
              body: [{
                  expression: {
                      async: false,
                      body: {
                          body: [{
                              expression: {
                                  async: false,
                                  body: {
                                      body: [{
                                          expression: {
                                              type: 'Literal',
                                              value: 'use strict',
                                          },
                                          type: 'ExpressionStatement',
                                          directive: 'use strict'
                                      }, ],
                                      type: 'BlockStatement',
                                  },
                                  expression: false,
                                  generator: false,
                                  id: null,
                                  params: [],
                                  type: 'FunctionExpression',
                              },
                              type: 'ExpressionStatement'
                          }],
                          type: 'BlockStatement'
                      },
                      expression: false,
                      generator: false,
                      id: null,
                      params: [{
                          name: 'eval',
                          type: 'Identifier',
                      }, ],
                      type: 'FunctionExpression'
                  },
                  type: 'ExpressionStatement'
              }],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass(`(function (eval) { function foo() { "use strict"; }})`, Context.Empty, {
          source: `(function (eval) { function foo() { "use strict"; }})`,
          expected: {
              body: [{
                  expression: {
                      async: false,
                      body: {
                          body: [{
                              async: false,
                              body: {
                                  body: [{
                                      expression: {
                                          type: 'Literal',
                                          value: 'use strict',
                                      },
                                      type: 'ExpressionStatement',
                                      directive: 'use strict'
                                  }, ],
                                  type: 'BlockStatement',
                              },
                              expression: false,
                              generator: false,
                              id: {
                                  name: 'foo',
                                  type: 'Identifier',
                              },
                              params: [],
                              type: 'FunctionDeclaration',
                          }],
                          type: 'BlockStatement',
                      },
                      expression: false,
                      generator: false,
                      id: null,
                      params: [{
                          name: 'eval',
                          type: 'Identifier'
                      }, ],
                      type: 'FunctionExpression'
                  },
                  type: 'ExpressionStatement'
              }],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass(`function iceFapper(idiot) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function iceFapper(idiot) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 28,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 28
                  }
              },
              body: [{
                  type: 'FunctionDeclaration',
                  start: 0,
                  end: 28,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 28
                      }
                  },
                  id: {
                      type: 'Identifier',
                      start: 9,
                      end: 18,
                      loc: {
                          start: {
                              line: 1,
                              column: 9
                          },
                          end: {
                              line: 1,
                              column: 18
                          }
                      },
                      name: 'iceFapper'
                  },
                  generator: false,
                  expression: false,
                  async: false,
                  params: [{
                      type: 'Identifier',
                      start: 19,
                      end: 24,
                      loc: {
                          start: {
                              line: 1,
                              column: 19
                          },
                          end: {
                              line: 1,
                              column: 24
                          }
                      },
                      name: 'idiot'
                  }],
                  body: {
                      type: 'BlockStatement',
                      start: 26,
                      end: 28,
                      loc: {
                          start: {
                              line: 1,
                              column: 26
                          },
                          end: {
                              line: 1,
                              column: 28
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`(function iceFapper(idiot) {})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `(function iceFapper(idiot) {})`,
          expected: {
              type: 'Program',
              start: 0,
              end: 30,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 30
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 30,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 30
                      }
                  },
                  expression: {
                      type: 'FunctionExpression',
                      start: 1,
                      end: 29,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 29
                          }
                      },
                      id: {
                          type: 'Identifier',
                          start: 10,
                          end: 19,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 19
                              }
                          },
                          name: 'iceFapper'
                      },
                      generator: false,
                      expression: false,
                      async: false,
                      params: [{
                          type: 'Identifier',
                          start: 20,
                          end: 25,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 20
                              },
                              end: {
                                  line: 1,
                                  column: 25
                              }
                          },
                          name: 'idiot'
                      }],
                      body: {
                          type: 'BlockStatement',
                          start: 27,
                          end: 29,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 27
                              },
                              end: {
                                  line: 1,
                                  column: 29
                              }
                          },
                          body: []
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`if (a && b) {
    c.d(this.e, (ctx) => a.b(this, void 0, void 0, function* () {
      return a
    }));
  }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `if (a && b) {
      c.d(this.e, (ctx) => a.b(this, void 0, void 0, function* () {
        return a
      }));
    }`,
          expected: {
            type: 'Program',
            start: 0,
            end: 115,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 5,
                column: 5
              }
            },
            body: [
              {
                type: 'IfStatement',
                start: 0,
                end: 115,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 5,
                    column: 5
                  }
                },
                test: {
                  type: 'LogicalExpression',
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
                  },
                  left: {
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
                    name: 'a'
                  },
                  operator: '&&',
                  right: {
                    type: 'Identifier',
                    start: 9,
                    end: 10,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 10
                      }
                    },
                    name: 'b'
                  }
                },
                consequent: {
                  type: 'BlockStatement',
                  start: 12,
                  end: 115,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 5,
                      column: 5
                    }
                  },
                  body: [
                    {
                      type: 'ExpressionStatement',
                      start: 20,
                      end: 109,
                      loc: {
                        start: {
                          line: 2,
                          column: 6
                        },
                        end: {
                          line: 4,
                          column: 10
                        }
                      },
                      expression: {
                        type: 'CallExpression',
                        start: 20,
                        end: 108,
                        loc: {
                          start: {
                            line: 2,
                            column: 6
                          },
                          end: {
                            line: 4,
                            column: 9
                          }
                        },
                        callee: {
                          type: 'MemberExpression',
                          start: 20,
                          end: 23,
                          loc: {
                            start: {
                              line: 2,
                              column: 6
                            },
                            end: {
                              line: 2,
                              column: 9
                            }
                          },
                          object: {
                            type: 'Identifier',
                            start: 20,
                            end: 21,
                            loc: {
                              start: {
                                line: 2,
                                column: 6
                              },
                              end: {
                                line: 2,
                                column: 7
                              }
                            },
                            name: 'c'
                          },
                          property: {
                            type: 'Identifier',
                            start: 22,
                            end: 23,
                            loc: {
                              start: {
                                line: 2,
                                column: 8
                              },
                              end: {
                                line: 2,
                                column: 9
                              }
                            },
                            name: 'd'
                          },
                          computed: false
                        },
                        arguments: [
                          {
                            type: 'MemberExpression',
                            start: 24,
                            end: 30,
                            loc: {
                              start: {
                                line: 2,
                                column: 10
                              },
                              end: {
                                line: 2,
                                column: 16
                              }
                            },
                            object: {
                              type: 'ThisExpression',
                              start: 24,
                              end: 28,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 10
                                },
                                end: {
                                  line: 2,
                                  column: 14
                                }
                              }
                            },
                            property: {
                              type: 'Identifier',
                              start: 29,
                              end: 30,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 15
                                },
                                end: {
                                  line: 2,
                                  column: 16
                                }
                              },
                              name: 'e'
                            },
                            computed: false
                          },
                          {
                            type: 'ArrowFunctionExpression',
                            start: 32,
                            end: 107,
                            loc: {
                              start: {
                                line: 2,
                                column: 18
                              },
                              end: {
                                line: 4,
                                column: 8
                              }
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: false,
                            params: [
                              {
                                type: 'Identifier',
                                start: 33,
                                end: 36,
                                loc: {
                                  start: {
                                    line: 2,
                                    column: 19
                                  },
                                  end: {
                                    line: 2,
                                    column: 22
                                  }
                                },
                                name: 'ctx'
                              }
                            ],
                            body: {
                              type: 'CallExpression',
                              start: 41,
                              end: 107,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 27
                                },
                                end: {
                                  line: 4,
                                  column: 8
                                }
                              },
                              callee: {
                                type: 'MemberExpression',
                                start: 41,
                                end: 44,
                                loc: {
                                  start: {
                                    line: 2,
                                    column: 27
                                  },
                                  end: {
                                    line: 2,
                                    column: 30
                                  }
                                },
                                object: {
                                  type: 'Identifier',
                                  start: 41,
                                  end: 42,
                                  loc: {
                                    start: {
                                      line: 2,
                                      column: 27
                                    },
                                    end: {
                                      line: 2,
                                      column: 28
                                    }
                                  },
                                  name: 'a'
                                },
                                property: {
                                  type: 'Identifier',
                                  start: 43,
                                  end: 44,
                                  loc: {
                                    start: {
                                      line: 2,
                                      column: 29
                                    },
                                    end: {
                                      line: 2,
                                      column: 30
                                    }
                                  },
                                  name: 'b'
                                },
                                computed: false
                              },
                              arguments: [
                                {
                                  type: 'ThisExpression',
                                  start: 45,
                                  end: 49,
                                  loc: {
                                    start: {
                                      line: 2,
                                      column: 31
                                    },
                                    end: {
                                      line: 2,
                                      column: 35
                                    }
                                  }
                                },
                                {
                                  type: 'UnaryExpression',
                                  start: 51,
                                  end: 57,
                                  loc: {
                                    start: {
                                      line: 2,
                                      column: 37
                                    },
                                    end: {
                                      line: 2,
                                      column: 43
                                    }
                                  },
                                  operator: 'void',
                                  prefix: true,
                                  argument: {
                                    type: 'Literal',
                                    start: 56,
                                    end: 57,
                                    loc: {
                                      start: {
                                        line: 2,
                                        column: 42
                                      },
                                      end: {
                                        line: 2,
                                        column: 43
                                      }
                                    },
                                    value: 0,
                                    raw: '0'
                                  }
                                },
                                {
                                  type: 'UnaryExpression',
                                  start: 59,
                                  end: 65,
                                  loc: {
                                    start: {
                                      line: 2,
                                      column: 45
                                    },
                                    end: {
                                      line: 2,
                                      column: 51
                                    }
                                  },
                                  operator: 'void',
                                  prefix: true,
                                  argument: {
                                    type: 'Literal',
                                    start: 64,
                                    end: 65,
                                    loc: {
                                      start: {
                                        line: 2,
                                        column: 50
                                      },
                                      end: {
                                        line: 2,
                                        column: 51
                                      }
                                    },
                                    value: 0,
                                    raw: '0'
                                  }
                                },
                                {
                                  type: 'FunctionExpression',
                                  start: 67,
                                  end: 106,
                                  loc: {
                                    start: {
                                      line: 2,
                                      column: 53
                                    },
                                    end: {
                                      line: 4,
                                      column: 7
                                    }
                                  },
                                  id: null,
                                  generator: true,
                                  expression: false,
                                  async: false,
                                  params: [],
                                  body: {
                                    type: 'BlockStatement',
                                    start: 80,
                                    end: 106,
                                    loc: {
                                      start: {
                                        line: 2,
                                        column: 66
                                      },
                                      end: {
                                        line: 4,
                                        column: 7
                                      }
                                    },
                                    body: [
                                      {
                                        type: 'ReturnStatement',
                                        start: 90,
                                        end: 98,
                                        loc: {
                                          start: {
                                            line: 3,
                                            column: 8
                                          },
                                          end: {
                                            line: 3,
                                            column: 16
                                          }
                                        },
                                        argument: {
                                          type: 'Identifier',
                                          start: 97,
                                          end: 98,
                                          loc: {
                                            start: {
                                              line: 3,
                                              column: 15
                                            },
                                            end: {
                                              line: 3,
                                              column: 16
                                            }
                                          },
                                          name: 'a'
                                        }
                                      }
                                    ]
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                },
                alternate: null
              }
            ],
            sourceType: 'script'
          }
      });

  });

});
