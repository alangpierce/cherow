import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Let', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [
            `let
            let;`,
            'for (;false;) let x = 1;',
            'do let x; while (false)',
            'if (true) {} else let x;',
            'if (true) let x;',
            'label: let x;',
            'while (false) let x;',
            `let  // start of a LexicalDeclaration, *not* an ASI opportunity
            let = "irrelevant initializer";`,
             // Acorn issue: https://github.com/acornjs/acorn/issues/586
            'let let',
            'label: let x;',
            'let {a: o.a} = obj;',
            'let default',
            'let test = 2, let = 1;',
            'do let x = 1; while (false)',
            'if (true) {} else let x = 1;',
            'if (true) let x = 1;',
            'do let x; while (false)',
            'let [...x = []] = [];',
            'if (true) {} else let x;',
            'let {...{}} = {};',
            'let [...[ x ] = []] = [];',
            'let [...[ x ] = []] = [];',
            'let [...{ x } = []] = [];',
            'let [...x, y] = [1, 2, 3];',
            'let [...{ x }, y] = [1, 2, 3];',
            'let [...x = []] = [];',
            // 'let' should not be an allowed name in destructuring let declarations
            'let [a, let, b] = [1, 2, 3];',
            // Babylon issue: https://github.com/babel/babylon/issues/148
            'let { ...x, y, z } = obj;',
            'let { x, ...y, ...z } = obj;'
        ];

        for (const arg of invalidSyntax) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        fail(`do let
      [x] = 0
      while (false);`, Context.Empty, {
          source: `do let
          [x] = 0
          while (false);`
      });

        fail(`let
            let;`, Context.Empty, {
              source: `let
              let;`,
          });

        fail(`let  // start of a LexicalDeclaration, *not* an ASI opportunity
  let = "irrelevant initializer";`, Context.Empty, {
    source: `let  // start of a LexicalDeclaration, *not* an ASI opportunity
    let = "irrelevant initializer";`,
  });

        fail(`let
  await 0;`, Context.Empty, {
            source: `let
  await 0;`,
        });

        fail(`let
  yield 0;`, Context.Empty, {
            source: `let
  yield 0;`,
        });
    });

    describe('Pass', () => {

    // Testing lexical scoping in sloppy mode
    const lexivalScoping = [
        'let = 1;',
        'for(let = 1;;){}'
    ];

    for (const arg of lexivalScoping) {

        it(`${arg}`, () => {
            t.doesNotThrow(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });

        it(`function f() {${arg}}`, () => {
            t.doesNotThrow(() => {
                parseSource(`function f() {${arg}}`, undefined, Context.Empty);
            });
        });

        it(`${arg}`, () => {
            t.doesNotThrow(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
    }

    const validSyntax = [
        'let { w = a(), x = b(), y = c(), z = d() } = { w: null, x: 0, y: false, z: "" };',
        'let { fn = function () {}, xFn = function x() {} } = {};',
        'let { x, } = { x: 23 };',
        'let { w: [x, y, z] = [4, 5, 6] } = {};',
        'let { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] };',
        'let { x: y = 33 } = { };',
        'let { x: y, } = { x: 23 };',
        'let xCls = class x {};',
        'let cls = class {};',
        'let xCls2 = class { static name() {} };',
        'let { s: t = a(), u: v = b(), w: x = c(), y: z = d() } = { s: null, u: 0, w: false, y: "" };',
        'let {} = obj;',
        'let {} = undefined;',
        'let [, , ...x] = [1, 2];',
        'let [ , , ...x] = [1, 2, 3, 4, 5];',
        'let [[x]] = [null];',
        'let test262id8;',
        'for (let i = 0; i < 5; a.push(function () { return i; }), ++i) { }',
        'switch (true) { default: let x = 1; }',
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

    pass(`let {x, y = x + 1} = { x : 42 };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let {x, y = x + 1} = { x : 42 };`,
          expected: {
              type: 'Program',
              start: 0,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 32
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 32,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
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
                      id: {
                        type: 'ObjectPattern',
                        start: 4,
                        end: 18,
                        loc: {
                          start: {
                            line: 1,
                            column: 4
                          },
                          end: {
                            line: 1,
                            column: 18
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 5,
                            end: 6,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
                              },
                              end: {
                                line: 1,
                                column: 6
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 5,
                              end: 6,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 6
                                }
                              },
                              name: 'x'
                            },
                            kind: 'init',
                            value: {
                              type: 'Identifier',
                              start: 5,
                              end: 6,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 6
                                }
                              },
                              name: 'x'
                            }
                          },
                          {
                            type: 'Property',
                            start: 8,
                            end: 17,
                            loc: {
                              start: {
                                line: 1,
                                column: 8
                              },
                              end: {
                                line: 1,
                                column: 17
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 8,
                              end: 9,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 8
                                },
                                end: {
                                  line: 1,
                                  column: 9
                                }
                              },
                              name: 'y'
                            },
                            kind: 'init',
                            value: {
                              type: 'AssignmentPattern',
                              start: 8,
                              end: 17,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 8
                                },
                                end: {
                                  line: 1,
                                  column: 17
                                }
                              },
                              left: {
                                type: 'Identifier',
                                start: 8,
                                end: 9,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 8
                                  },
                                  end: {
                                    line: 1,
                                    column: 9
                                  }
                                },
                                name: 'y'
                              },
                              right: {
                                type: 'BinaryExpression',
                                start: 12,
                                end: 17,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 12
                                  },
                                  end: {
                                    line: 1,
                                    column: 17
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
                                  name: 'x'
                                },
                                operator: '+',
                                right: {
                                  type: 'Literal',
                                  start: 16,
                                  end: 17,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 16
                                    },
                                    end: {
                                      line: 1,
                                      column: 17
                                    }
                                  },
                                  value: 1,
                                  raw: '1'
                                }
                              }
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 21,
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 21
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 23,
                            end: 29,
                            loc: {
                              start: {
                                line: 1,
                                column: 23
                              },
                              end: {
                                line: 1,
                                column: 29
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 23,
                              end: 24,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 23
                                },
                                end: {
                                  line: 1,
                                  column: 24
                                }
                              },
                              name: 'x'
                            },
                            value: {
                              type: 'Literal',
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
                              value: 42,
                              raw: '42'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(`let {x = y, y} = { y : 42 };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let {x = y, y} = { y : 42 };`,
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
              body: [
                {
                  type: 'VariableDeclaration',
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
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 27,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 27
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
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
                        properties: [
                          {
                            type: 'Property',
                            start: 5,
                            end: 10,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
                              },
                              end: {
                                line: 1,
                                column: 10
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 5,
                              end: 6,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 6
                                }
                              },
                              name: 'x'
                            },
                            kind: 'init',
                            value: {
                              type: 'AssignmentPattern',
                              start: 5,
                              end: 10,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 10
                                }
                              },
                              left: {
                                type: 'Identifier',
                                start: 5,
                                end: 6,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 5
                                  },
                                  end: {
                                    line: 1,
                                    column: 6
                                  }
                                },
                                name: 'x'
                              },
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
                                name: 'y'
                              }
                            }
                          },
                          {
                            type: 'Property',
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
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
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
                              name: 'y'
                            },
                            kind: 'init',
                            value: {
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
                              name: 'y'
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 17,
                        end: 27,
                        loc: {
                          start: {
                            line: 1,
                            column: 17
                          },
                          end: {
                            line: 1,
                            column: 27
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 19,
                            end: 25,
                            loc: {
                              start: {
                                line: 1,
                                column: 19
                              },
                              end: {
                                line: 1,
                                column: 25
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
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
                              name: 'y'
                            },
                            value: {
                              type: 'Literal',
                              start: 23,
                              end: 25,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 23
                                },
                                end: {
                                  line: 1,
                                  column: 25
                                }
                              },
                              value: 42,
                              raw: '42'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(`let {x, y = eval("x+1")} = {x:42};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let {x, y = eval("x+1")} = {x:42};`,
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
                  line: 1,
                  column: 34
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 34,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 34
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
                        start: 4,
                        end: 24,
                        loc: {
                          start: {
                            line: 1,
                            column: 4
                          },
                          end: {
                            line: 1,
                            column: 24
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 5,
                            end: 6,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
                              },
                              end: {
                                line: 1,
                                column: 6
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 5,
                              end: 6,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 6
                                }
                              },
                              name: 'x'
                            },
                            kind: 'init',
                            value: {
                              type: 'Identifier',
                              start: 5,
                              end: 6,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 6
                                }
                              },
                              name: 'x'
                            }
                          },
                          {
                            type: 'Property',
                            start: 8,
                            end: 23,
                            loc: {
                              start: {
                                line: 1,
                                column: 8
                              },
                              end: {
                                line: 1,
                                column: 23
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 8,
                              end: 9,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 8
                                },
                                end: {
                                  line: 1,
                                  column: 9
                                }
                              },
                              name: 'y'
                            },
                            kind: 'init',
                            value: {
                              type: 'AssignmentPattern',
                              start: 8,
                              end: 23,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 8
                                },
                                end: {
                                  line: 1,
                                  column: 23
                                }
                              },
                              left: {
                                type: 'Identifier',
                                start: 8,
                                end: 9,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 8
                                  },
                                  end: {
                                    line: 1,
                                    column: 9
                                  }
                                },
                                name: 'y'
                              },
                              right: {
                                type: 'CallExpression',
                                start: 12,
                                end: 23,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 12
                                  },
                                  end: {
                                    line: 1,
                                    column: 23
                                  }
                                },
                                callee: {
                                  type: 'Identifier',
                                  start: 12,
                                  end: 16,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 12
                                    },
                                    end: {
                                      line: 1,
                                      column: 16
                                    }
                                  },
                                  name: 'eval'
                                },
                                arguments: [
                                  {
                                    type: 'Literal',
                                    start: 17,
                                    end: 22,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 17
                                      },
                                      end: {
                                        line: 1,
                                        column: 22
                                      }
                                    },
                                    value: 'x+1',
                                    raw: '"x+1"'
                                  }
                                ]
                              }
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 27,
                        end: 33,
                        loc: {
                          start: {
                            line: 1,
                            column: 27
                          },
                          end: {
                            line: 1,
                            column: 33
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 28,
                            end: 32,
                            loc: {
                              start: {
                                line: 1,
                                column: 28
                              },
                              end: {
                                line: 1,
                                column: 32
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 28,
                              end: 29,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 28
                                },
                                end: {
                                  line: 1,
                                  column: 29
                                }
                              },
                              name: 'x'
                            },
                            value: {
                              type: 'Literal',
                              start: 30,
                              end: 32,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 30
                                },
                                end: {
                                  line: 1,
                                  column: 32
                                }
                              },
                              value: 42,
                              raw: '42'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(`let {x = function() {return y+1;}, y} = {y:42};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let {x = function() {return y+1;}, y} = {y:42};`,
          expected: {
              type: 'Program',
              start: 0,
              end: 47,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 47
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 47
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 46,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 46
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
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
                        properties: [
                          {
                            type: 'Property',
                            start: 5,
                            end: 33,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
                              },
                              end: {
                                line: 1,
                                column: 33
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 5,
                              end: 6,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 6
                                }
                              },
                              name: 'x'
                            },
                            kind: 'init',
                            value: {
                              type: 'AssignmentPattern',
                              start: 5,
                              end: 33,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 33
                                }
                              },
                              left: {
                                type: 'Identifier',
                                start: 5,
                                end: 6,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 5
                                  },
                                  end: {
                                    line: 1,
                                    column: 6
                                  }
                                },
                                name: 'x'
                              },
                              right: {
                                type: 'FunctionExpression',
                                start: 9,
                                end: 33,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 9
                                  },
                                  end: {
                                    line: 1,
                                    column: 33
                                  }
                                },
                                id: null,
                                generator: false,
                                expression: false,
                                async: false,
                                params: [],
                                body: {
                                  type: 'BlockStatement',
                                  start: 20,
                                  end: 33,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 20
                                    },
                                    end: {
                                      line: 1,
                                      column: 33
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'ReturnStatement',
                                      start: 21,
                                      end: 32,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 21
                                        },
                                        end: {
                                          line: 1,
                                          column: 32
                                        }
                                      },
                                      argument: {
                                        type: 'BinaryExpression',
                                        start: 28,
                                        end: 31,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 28
                                          },
                                          end: {
                                            line: 1,
                                            column: 31
                                          }
                                        },
                                        left: {
                                          type: 'Identifier',
                                          start: 28,
                                          end: 29,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 28
                                            },
                                            end: {
                                              line: 1,
                                              column: 29
                                            }
                                          },
                                          name: 'y'
                                        },
                                        operator: '+',
                                        right: {
                                          type: 'Literal',
                                          start: 30,
                                          end: 31,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 30
                                            },
                                            end: {
                                              line: 1,
                                              column: 31
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
                            }
                          },
                          {
                            type: 'Property',
                            start: 35,
                            end: 36,
                            loc: {
                              start: {
                                line: 1,
                                column: 35
                              },
                              end: {
                                line: 1,
                                column: 36
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 35,
                              end: 36,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 35
                                },
                                end: {
                                  line: 1,
                                  column: 36
                                }
                              },
                              name: 'y'
                            },
                            kind: 'init',
                            value: {
                              type: 'Identifier',
                              start: 35,
                              end: 36,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 35
                                },
                                end: {
                                  line: 1,
                                  column: 36
                                }
                              },
                              name: 'y'
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 40,
                        end: 46,
                        loc: {
                          start: {
                            line: 1,
                            column: 40
                          },
                          end: {
                            line: 1,
                            column: 46
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 41,
                            end: 45,
                            loc: {
                              start: {
                                line: 1,
                                column: 41
                              },
                              end: {
                                line: 1,
                                column: 45
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 41,
                              end: 42,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 41
                                },
                                end: {
                                  line: 1,
                                  column: 42
                                }
                              },
                              name: 'y'
                            },
                            value: {
                              type: 'Literal',
                              start: 43,
                              end: 45,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 43
                                },
                                end: {
                                  line: 1,
                                  column: 45
                                }
                              },
                              value: 42,
                              raw: '42'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(`var { x = f(42) } = { x : 27 };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `var { x = f(42) } = { x : 27 };`,
          expected: {
              type: 'Program',
              start: 0,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 31
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 31
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
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
                        properties: [
                          {
                            type: 'Property',
                            start: 6,
                            end: 15,
                            loc: {
                              start: {
                                line: 1,
                                column: 6
                              },
                              end: {
                                line: 1,
                                column: 15
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 6,
                              end: 7,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 6
                                },
                                end: {
                                  line: 1,
                                  column: 7
                                }
                              },
                              name: 'x'
                            },
                            kind: 'init',
                            value: {
                              type: 'AssignmentPattern',
                              start: 6,
                              end: 15,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 6
                                },
                                end: {
                                  line: 1,
                                  column: 15
                                }
                              },
                              left: {
                                type: 'Identifier',
                                start: 6,
                                end: 7,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 6
                                  },
                                  end: {
                                    line: 1,
                                    column: 7
                                  }
                                },
                                name: 'x'
                              },
                              right: {
                                type: 'CallExpression',
                                start: 10,
                                end: 15,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 10
                                  },
                                  end: {
                                    line: 1,
                                    column: 15
                                  }
                                },
                                callee: {
                                  type: 'Identifier',
                                  start: 10,
                                  end: 11,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 10
                                    },
                                    end: {
                                      line: 1,
                                      column: 11
                                    }
                                  },
                                  name: 'f'
                                },
                                arguments: [
                                  {
                                    type: 'Literal',
                                    start: 12,
                                    end: 14,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 12
                                      },
                                      end: {
                                        line: 1,
                                        column: 14
                                      }
                                    },
                                    value: 42,
                                    raw: '42'
                                  }
                                ]
                              }
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 20,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 22,
                            end: 28,
                            loc: {
                              start: {
                                line: 1,
                                column: 22
                              },
                              end: {
                                line: 1,
                                column: 28
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
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
                              name: 'x'
                            },
                            value: {
                              type: 'Literal',
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
                              value: 27,
                              raw: '27'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  kind: 'var'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(`let { x = y = 1 } = {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let { x = y = 1 } = {};`,
          expected: {
              type: 'Program',
              start: 0,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 23
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 23,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 23
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 22,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 22
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
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
                        properties: [
                          {
                            type: 'Property',
                            start: 6,
                            end: 15,
                            loc: {
                              start: {
                                line: 1,
                                column: 6
                              },
                              end: {
                                line: 1,
                                column: 15
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 6,
                              end: 7,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 6
                                },
                                end: {
                                  line: 1,
                                  column: 7
                                }
                              },
                              name: 'x'
                            },
                            kind: 'init',
                            value: {
                              type: 'AssignmentPattern',
                              start: 6,
                              end: 15,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 6
                                },
                                end: {
                                  line: 1,
                                  column: 15
                                }
                              },
                              left: {
                                type: 'Identifier',
                                start: 6,
                                end: 7,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 6
                                  },
                                  end: {
                                    line: 1,
                                    column: 7
                                  }
                                },
                                name: 'x'
                              },
                              right: {
                                type: 'AssignmentExpression',
                                start: 10,
                                end: 15,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 10
                                  },
                                  end: {
                                    line: 1,
                                    column: 15
                                  }
                                },
                                operator: '=',
                                left: {
                                  type: 'Identifier',
                                  start: 10,
                                  end: 11,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 10
                                    },
                                    end: {
                                      line: 1,
                                      column: 11
                                    }
                                  },
                                  name: 'y'
                                },
                                right: {
                                  type: 'Literal',
                                  start: 14,
                                  end: 15,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 14
                                    },
                                    end: {
                                      line: 1,
                                      column: 15
                                    }
                                  },
                                  value: 1,
                                  raw: '1'
                                }
                              }
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 20,
                        end: 22,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 22
                          }
                        },
                        properties: []
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(` let [ x = y = 1 ] = [];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let [ x = y = 1 ] = [];`,
          expected: {
              type: 'Program',
              start: 0,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 23
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 23,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 23
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 22,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 22
                        }
                      },
                      id: {
                        type: 'ArrayPattern',
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
                        elements: [
                          {
                            type: 'AssignmentPattern',
                            start: 6,
                            end: 15,
                            loc: {
                              start: {
                                line: 1,
                                column: 6
                              },
                              end: {
                                line: 1,
                                column: 15
                              }
                            },
                            left: {
                              type: 'Identifier',
                              start: 6,
                              end: 7,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 6
                                },
                                end: {
                                  line: 1,
                                  column: 7
                                }
                              },
                              name: 'x'
                            },
                            right: {
                              type: 'AssignmentExpression',
                              start: 10,
                              end: 15,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 10
                                },
                                end: {
                                  line: 1,
                                  column: 15
                                }
                              },
                              operator: '=',
                              left: {
                                type: 'Identifier',
                                start: 10,
                                end: 11,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 10
                                  },
                                  end: {
                                    line: 1,
                                    column: 11
                                  }
                                },
                                name: 'y'
                              },
                              right: {
                                type: 'Literal',
                                start: 14,
                                end: 15,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 14
                                  },
                                  end: {
                                    line: 1,
                                    column: 15
                                  }
                                },
                                value: 1,
                                raw: '1'
                              }
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'ArrayExpression',
                        start: 20,
                        end: 22,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 22
                          }
                        },
                        elements: []
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(` (function({ x = y = 1 }) {}({}));`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `(function({ x = y = 1 }) {}({}));`,
          expected: {
              type: 'Program',
              start: 0,
              end: 33,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 33
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  },
                  expression: {
                    type: 'CallExpression',
                    start: 1,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    },
                    callee: {
                      type: 'FunctionExpression',
                      start: 1,
                      end: 27,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 27
                        }
                      },
                      id: null,
                      generator: false,
                      expression: false,
                      async: false,
                      params: [
                        {
                          type: 'ObjectPattern',
                          start: 10,
                          end: 23,
                          loc: {
                            start: {
                              line: 1,
                              column: 10
                            },
                            end: {
                              line: 1,
                              column: 23
                            }
                          },
                          properties: [
                            {
                              type: 'Property',
                              start: 12,
                              end: 21,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 12
                                },
                                end: {
                                  line: 1,
                                  column: 21
                                }
                              },
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
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
                                name: 'x'
                              },
                              kind: 'init',
                              value: {
                                type: 'AssignmentPattern',
                                start: 12,
                                end: 21,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 12
                                  },
                                  end: {
                                    line: 1,
                                    column: 21
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
                                  name: 'x'
                                },
                                right: {
                                  type: 'AssignmentExpression',
                                  start: 16,
                                  end: 21,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 16
                                    },
                                    end: {
                                      line: 1,
                                      column: 21
                                    }
                                  },
                                  operator: '=',
                                  left: {
                                    type: 'Identifier',
                                    start: 16,
                                    end: 17,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 16
                                      },
                                      end: {
                                        line: 1,
                                        column: 17
                                      }
                                    },
                                    name: 'y'
                                  },
                                  right: {
                                    type: 'Literal',
                                    start: 20,
                                    end: 21,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 20
                                      },
                                      end: {
                                        line: 1,
                                        column: 21
                                      }
                                    },
                                    value: 1,
                                    raw: '1'
                                  }
                                }
                              }
                            }
                          ]
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        start: 25,
                        end: 27,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 27
                          }
                        },
                        body: []
                      }
                    },
                    arguments: [
                      {
                        type: 'ObjectExpression',
                        start: 28,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        },
                        properties: []
                      }
                    ]
                  }
                }
              ],
              sourceType: 'script'
            }
      });

    pass(` (function({ x: x = y = 1 }) {}({}));`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `(function({ x: x = y = 1 }) {}({}));`,
          expected: {
              type: 'Program',
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
              body: [
                {
                  type: 'ExpressionStatement',
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
                  expression: {
                    type: 'CallExpression',
                    start: 1,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    },
                    callee: {
                      type: 'FunctionExpression',
                      start: 1,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      },
                      id: null,
                      generator: false,
                      expression: false,
                      async: false,
                      params: [
                        {
                          type: 'ObjectPattern',
                          start: 10,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 10
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          },
                          properties: [
                            {
                              type: 'Property',
                              start: 12,
                              end: 24,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 12
                                },
                                end: {
                                  line: 1,
                                  column: 24
                                }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
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
                                name: 'x'
                              },
                              value: {
                                type: 'AssignmentPattern',
                                start: 15,
                                end: 24,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 15
                                  },
                                  end: {
                                    line: 1,
                                    column: 24
                                  }
                                },
                                left: {
                                  type: 'Identifier',
                                  start: 15,
                                  end: 16,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 15
                                    },
                                    end: {
                                      line: 1,
                                      column: 16
                                    }
                                  },
                                  name: 'x'
                                },
                                right: {
                                  type: 'AssignmentExpression',
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
                                  operator: '=',
                                  left: {
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
                                    name: 'y'
                                  },
                                  right: {
                                    type: 'Literal',
                                    start: 23,
                                    end: 24,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 23
                                      },
                                      end: {
                                        line: 1,
                                        column: 24
                                      }
                                    },
                                    value: 1,
                                    raw: '1'
                                  }
                                }
                              },
                              kind: 'init'
                            }
                          ]
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        start: 28,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        },
                        body: []
                      }
                    },
                    arguments: [
                      {
                        type: 'ObjectExpression',
                        start: 31,
                        end: 33,
                        loc: {
                          start: {
                            line: 1,
                            column: 31
                          },
                          end: {
                            line: 1,
                            column: 33
                          }
                        },
                        properties: []
                      }
                    ]
                  }
                }
              ],
              sourceType: 'script'
            }
      });

    pass(`let {foo} = {foo: 2};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let {foo} = {foo: 2};`,
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
              body: [
                {
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
                  declarations: [
                    {
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
                        type: 'ObjectPattern',
                        start: 4,
                        end: 9,
                        loc: {
                          start: {
                            line: 1,
                            column: 4
                          },
                          end: {
                            line: 1,
                            column: 9
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 5,
                            end: 8,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
                              },
                              end: {
                                line: 1,
                                column: 8
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 5,
                              end: 8,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 8
                                }
                              },
                              name: 'foo'
                            },
                            kind: 'init',
                            value: {
                              type: 'Identifier',
                              start: 5,
                              end: 8,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 8
                                }
                              },
                              name: 'foo'
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 12,
                        end: 20,
                        loc: {
                          start: {
                            line: 1,
                            column: 12
                          },
                          end: {
                            line: 1,
                            column: 20
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
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
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 13,
                              end: 16,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 13
                                },
                                end: {
                                  line: 1,
                                  column: 16
                                }
                              },
                              name: 'foo'
                            },
                            value: {
                              type: 'Literal',
                              start: 18,
                              end: 19,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 18
                                },
                                end: {
                                  line: 1,
                                  column: 19
                                }
                              },
                              value: 2,
                              raw: '2'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(`let {foo=3} = {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Strict | Context.Module, {
          source: `let {foo=3} = {};`,
          expected: {
              type: 'Program',
              start: 0,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 17
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 16,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 16
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
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
                        properties: [
                          {
                            type: 'Property',
                            start: 5,
                            end: 10,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
                              },
                              end: {
                                line: 1,
                                column: 10
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 5,
                              end: 8,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 8
                                }
                              },
                              name: 'foo'
                            },
                            kind: 'init',
                            value: {
                              type: 'AssignmentPattern',
                              start: 5,
                              end: 10,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 10
                                }
                              },
                              left: {
                                type: 'Identifier',
                                start: 5,
                                end: 8,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 5
                                  },
                                  end: {
                                    line: 1,
                                    column: 8
                                  }
                                },
                                name: 'foo'
                              },
                              right: {
                                type: 'Literal',
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
                                value: 3,
                                raw: '3'
                              }
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 14,
                        end: 16,
                        loc: {
                          start: {
                            line: 1,
                            column: 14
                          },
                          end: {
                            line: 1,
                            column: 16
                          }
                        },
                        properties: []
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'module'
            }
      });

    pass(`let {[foo("abc")]:x} = {abc:42};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let {[foo("abc")]:x} = {abc:42};`,
          expected: {
              type: 'Program',
              start: 0,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 32
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 32,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
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
                      id: {
                        type: 'ObjectPattern',
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
                        properties: [
                          {
                            type: 'Property',
                            start: 5,
                            end: 19,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
                              },
                              end: {
                                line: 1,
                                column: 19
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: true,
                            key: {
                              type: 'CallExpression',
                              start: 6,
                              end: 16,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 6
                                },
                                end: {
                                  line: 1,
                                  column: 16
                                }
                              },
                              callee: {
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
                                name: 'foo'
                              },
                              arguments: [
                                {
                                  type: 'Literal',
                                  start: 10,
                                  end: 15,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 10
                                    },
                                    end: {
                                      line: 1,
                                      column: 15
                                    }
                                  },
                                  value: 'abc',
                                  raw: '"abc"'
                                }
                              ]
                            },
                            value: {
                              type: 'Identifier',
                              start: 18,
                              end: 19,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 18
                                },
                                end: {
                                  line: 1,
                                  column: 19
                                }
                              },
                              name: 'x'
                            },
                            kind: 'init'
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 23,
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 24,
                            end: 30,
                            loc: {
                              start: {
                                line: 1,
                                column: 24
                              },
                              end: {
                                line: 1,
                                column: 30
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 24,
                              end: 27,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 24
                                },
                                end: {
                                  line: 1,
                                  column: 27
                                }
                              },
                              name: 'abc'
                            },
                            value: {
                              type: 'Literal',
                              start: 28,
                              end: 30,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 28
                                },
                                end: {
                                  line: 1,
                                  column: 30
                                }
                              },
                              value: 42,
                              raw: '42'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(`var {[foo("abc")]:x} = {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `var {[foo("abc")]:x} = {};`,
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
              body: [
                {
                  type: 'VariableDeclaration',
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
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 25,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 25
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
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
                        properties: [
                          {
                            type: 'Property',
                            start: 5,
                            end: 19,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
                              },
                              end: {
                                line: 1,
                                column: 19
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: true,
                            key: {
                              type: 'CallExpression',
                              start: 6,
                              end: 16,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 6
                                },
                                end: {
                                  line: 1,
                                  column: 16
                                }
                              },
                              callee: {
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
                                name: 'foo'
                              },
                              arguments: [
                                {
                                  type: 'Literal',
                                  start: 10,
                                  end: 15,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 10
                                    },
                                    end: {
                                      line: 1,
                                      column: 15
                                    }
                                  },
                                  value: 'abc',
                                  raw: '"abc"'
                                }
                              ]
                            },
                            value: {
                              type: 'Identifier',
                              start: 18,
                              end: 19,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 18
                                },
                                end: {
                                  line: 1,
                                  column: 19
                                }
                              },
                              name: 'x'
                            },
                            kind: 'init'
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 23,
                        end: 25,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 25
                          }
                        },
                        properties: []
                      }
                    }
                  ],
                  kind: 'var'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(`let {[foo("abc")]:x} = {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let {[foo("abc")]:x} = {};`,
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
              body: [
                {
                  type: 'VariableDeclaration',
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
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 25,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 25
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
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
                        properties: [
                          {
                            type: 'Property',
                            start: 5,
                            end: 19,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
                              },
                              end: {
                                line: 1,
                                column: 19
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: true,
                            key: {
                              type: 'CallExpression',
                              start: 6,
                              end: 16,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 6
                                },
                                end: {
                                  line: 1,
                                  column: 16
                                }
                              },
                              callee: {
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
                                name: 'foo'
                              },
                              arguments: [
                                {
                                  type: 'Literal',
                                  start: 10,
                                  end: 15,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 10
                                    },
                                    end: {
                                      line: 1,
                                      column: 15
                                    }
                                  },
                                  value: 'abc',
                                  raw: '"abc"'
                                }
                              ]
                            },
                            value: {
                              type: 'Identifier',
                              start: 18,
                              end: 19,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 18
                                },
                                end: {
                                  line: 1,
                                  column: 19
                                }
                              },
                              name: 'x'
                            },
                            kind: 'init'
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 23,
                        end: 25,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 25
                          }
                        },
                        properties: []
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(`const { [f('x')]:x, [f('y')]:y } = o;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `const { [f('x')]:x, [f('y')]:y } = o;`,
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
                  type: 'VariableDeclaration',
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
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 6,
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 36
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
                        start: 6,
                        end: 32,
                        loc: {
                          start: {
                            line: 1,
                            column: 6
                          },
                          end: {
                            line: 1,
                            column: 32
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 8,
                            end: 18,
                            loc: {
                              start: {
                                line: 1,
                                column: 8
                              },
                              end: {
                                line: 1,
                                column: 18
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: true,
                            key: {
                              type: 'CallExpression',
                              start: 9,
                              end: 15,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 9
                                },
                                end: {
                                  line: 1,
                                  column: 15
                                }
                              },
                              callee: {
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
                                name: 'f'
                              },
                              arguments: [
                                {
                                  type: 'Literal',
                                  start: 11,
                                  end: 14,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 11
                                    },
                                    end: {
                                      line: 1,
                                      column: 14
                                    }
                                  },
                                  value: 'x',
                                  raw: '\'x\''
                                }
                              ]
                            },
                            value: {
                              type: 'Identifier',
                              start: 17,
                              end: 18,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 17
                                },
                                end: {
                                  line: 1,
                                  column: 18
                                }
                              },
                              name: 'x'
                            },
                            kind: 'init'
                          },
                          {
                            type: 'Property',
                            start: 20,
                            end: 30,
                            loc: {
                              start: {
                                line: 1,
                                column: 20
                              },
                              end: {
                                line: 1,
                                column: 30
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: true,
                            key: {
                              type: 'CallExpression',
                              start: 21,
                              end: 27,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 21
                                },
                                end: {
                                  line: 1,
                                  column: 27
                                }
                              },
                              callee: {
                                type: 'Identifier',
                                start: 21,
                                end: 22,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 21
                                  },
                                  end: {
                                    line: 1,
                                    column: 22
                                  }
                                },
                                name: 'f'
                              },
                              arguments: [
                                {
                                  type: 'Literal',
                                  start: 23,
                                  end: 26,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 23
                                    },
                                    end: {
                                      line: 1,
                                      column: 26
                                    }
                                  },
                                  value: 'y',
                                  raw: '\'y\''
                                }
                              ]
                            },
                            value: {
                              type: 'Identifier',
                              start: 29,
                              end: 30,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 29
                                },
                                end: {
                                  line: 1,
                                  column: 30
                                }
                              },
                              name: 'y'
                            },
                            kind: 'init'
                          }
                        ]
                      },
                      init: {
                        type: 'Identifier',
                        start: 35,
                        end: 36,
                        loc: {
                          start: {
                            line: 1,
                            column: 35
                          },
                          end: {
                            line: 1,
                            column: 36
                          }
                        },
                        name: 'o'
                      }
                    }
                  ],
                  kind: 'const'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(`let [a, , c] = f();`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let [a, , c] = f();`,
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
              body: [
                {
                  type: 'VariableDeclaration',
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
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      },
                      id: {
                        type: 'ArrayPattern',
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
                        elements: [
                          {
                            type: 'Identifier',
                            start: 5,
                            end: 6,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
                              },
                              end: {
                                line: 1,
                                column: 6
                              }
                            },
                            name: 'a'
                          },
                          null,
                          {
                            type: 'Identifier',
                            start: 10,
                            end: 11,
                            loc: {
                              start: {
                                line: 1,
                                column: 10
                              },
                              end: {
                                line: 1,
                                column: 11
                              }
                            },
                            name: 'c'
                          }
                        ]
                      },
                      init: {
                        type: 'CallExpression',
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
                        callee: {
                          type: 'Identifier',
                          start: 15,
                          end: 16,
                          loc: {
                            start: {
                              line: 1,
                              column: 15
                            },
                            end: {
                              line: 1,
                              column: 16
                            }
                          },
                          name: 'f'
                        },
                        arguments: []
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(`let [a, , c, d] = f();`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let [a, , c, d] = f();`,
          expected: {
              type: 'Program',
              start: 0,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 22
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 22,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 22
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 21,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 21
                        }
                      },
                      id: {
                        type: 'ArrayPattern',
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
                        elements: [
                          {
                            type: 'Identifier',
                            start: 5,
                            end: 6,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
                              },
                              end: {
                                line: 1,
                                column: 6
                              }
                            },
                            name: 'a'
                          },
                          null,
                          {
                            type: 'Identifier',
                            start: 10,
                            end: 11,
                            loc: {
                              start: {
                                line: 1,
                                column: 10
                              },
                              end: {
                                line: 1,
                                column: 11
                              }
                            },
                            name: 'c'
                          },
                          {
                            type: 'Identifier',
                            start: 13,
                            end: 14,
                            loc: {
                              start: {
                                line: 1,
                                column: 13
                              },
                              end: {
                                line: 1,
                                column: 14
                              }
                            },
                            name: 'd'
                          }
                        ]
                      },
                      init: {
                        type: 'CallExpression',
                        start: 18,
                        end: 21,
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 21
                          }
                        },
                        callee: {
                          type: 'Identifier',
                          start: 18,
                          end: 19,
                          loc: {
                            start: {
                              line: 1,
                              column: 18
                            },
                            end: {
                              line: 1,
                              column: 19
                            }
                          },
                          name: 'f'
                        },
                        arguments: []
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(`let [a, b, ,] = f();`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let [a, b, ,] = f();`,
          expected: {
              type: 'Program',
              start: 0,
              end: 20,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 20
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 19
                        }
                      },
                      id: {
                        type: 'ArrayPattern',
                        start: 4,
                        end: 13,
                        loc: {
                          start: {
                            line: 1,
                            column: 4
                          },
                          end: {
                            line: 1,
                            column: 13
                          }
                        },
                        elements: [
                          {
                            type: 'Identifier',
                            start: 5,
                            end: 6,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
                              },
                              end: {
                                line: 1,
                                column: 6
                              }
                            },
                            name: 'a'
                          },
                          {
                            type: 'Identifier',
                            start: 8,
                            end: 9,
                            loc: {
                              start: {
                                line: 1,
                                column: 8
                              },
                              end: {
                                line: 1,
                                column: 9
                              }
                            },
                            name: 'b'
                          },
                          null
                        ]
                      },
                      init: {
                        type: 'CallExpression',
                        start: 16,
                        end: 19,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 19
                          }
                        },
                        callee: {
                          type: 'Identifier',
                          start: 16,
                          end: 17,
                          loc: {
                            start: {
                              line: 1,
                              column: 16
                            },
                            end: {
                              line: 1,
                              column: 17
                            }
                          },
                          name: 'f'
                        },
                        arguments: []
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
      });

    pass(`let eval = 1, arguments = 2`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let eval = 1, arguments = 2`,
          expected: {
              type: 'Program',
              start: 0,
              end: 27,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 27
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 27
                    }
                  },
                  declarations: [
                    {
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
                        end: 8,
                        loc: {
                          start: {
                            line: 1,
                            column: 4
                          },
                          end: {
                            line: 1,
                            column: 8
                          }
                        },
                        name: 'eval'
                      },
                      init: {
                        type: 'Literal',
                        start: 11,
                        end: 12,
                        loc: {
                          start: {
                            line: 1,
                            column: 11
                          },
                          end: {
                            line: 1,
                            column: 12
                          }
                        },
                        value: 1,
                        raw: '1'
                      }
                    },
                    {
                      type: 'VariableDeclarator',
                      start: 14,
                      end: 27,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 27
                        }
                      },
                      id: {
                        type: 'Identifier',
                        start: 14,
                        end: 23,
                        loc: {
                          start: {
                            line: 1,
                            column: 14
                          },
                          end: {
                            line: 1,
                            column: 23
                          }
                        },
                        name: 'arguments'
                      },
                      init: {
                        type: 'Literal',
                        start: 26,
                        end: 27,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 27
                          }
                        },
                        value: 2,
                        raw: '2'
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
        });

    pass(`let [a,,b] = c`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let [a,,b] = c`,
          expected: {
              type: 'Program',
              start: 0,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 14
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
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
                      id: {
                        type: 'ArrayPattern',
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
                        elements: [
                          {
                            type: 'Identifier',
                            start: 5,
                            end: 6,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
                              },
                              end: {
                                line: 1,
                                column: 6
                              }
                            },
                            name: 'a'
                          },
                          null,
                          {
                            type: 'Identifier',
                            start: 8,
                            end: 9,
                            loc: {
                              start: {
                                line: 1,
                                column: 8
                              },
                              end: {
                                line: 1,
                                column: 9
                              }
                            },
                            name: 'b'
                          }
                        ]
                      },
                      init: {
                        type: 'Identifier',
                        start: 13,
                        end: 14,
                        loc: {
                          start: {
                            line: 1,
                            column: 13
                          },
                          end: {
                            line: 1,
                            column: 14
                          }
                        },
                        name: 'c'
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
        });

    pass(`let++;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let++;`,
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
              body: [
                {
                  type: 'ExpressionStatement',
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
                  expression: {
                    type: 'UpdateExpression',
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
                    operator: '++',
                    prefix: false,
                    argument: {
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
                      name: 'let'
                    }
                  }
                }
              ],
              sourceType: 'script'
            }
        });

    pass(`let: 34`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let: 34`,
          expected: {
              type: 'Program',
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
              },
              body: [
                {
                  type: 'LabeledStatement',
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
                  },
                  body: {
                    type: 'ExpressionStatement',
                    start: 5,
                    end: 7,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 7
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 5,
                      end: 7,
                      loc: {
                        start: {
                          line: 1,
                          column: 5
                        },
                        end: {
                          line: 1,
                          column: 7
                        }
                      },
                      value: 34,
                      raw: '34'
                    }
                  },
                  label: {
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
                    name: 'let'
                  }
                }
              ],
              sourceType: 'script'
            }
        });

    pass(`let(100)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let(100)`,
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
                    type: 'CallExpression',
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
                    callee: {
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
                      name: 'let'
                    },
                    arguments: [
                      {
                        type: 'Literal',
                        start: 4,
                        end: 7,
                        loc: {
                          start: {
                            line: 1,
                            column: 4
                          },
                          end: {
                            line: 1,
                            column: 7
                          }
                        },
                        value: 100,
                        raw: '100'
                      }
                    ]
                  }
                }
              ],
              sourceType: 'script'
            }
        });

    pass(`let {a: b} = ({});`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let {a: b} = ({});`,
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
              body: [
                {
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
                  declarations: [
                    {
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
                        type: 'ObjectPattern',
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
                        properties: [
                          {
                            type: 'Property',
                            start: 5,
                            end: 9,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
                              },
                              end: {
                                line: 1,
                                column: 9
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 5,
                              end: 6,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 6
                                }
                              },
                              name: 'a'
                            },
                            value: {
                              type: 'Identifier',
                              start: 8,
                              end: 9,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 8
                                },
                                end: {
                                  line: 1,
                                  column: 9
                                }
                              },
                              name: 'b'
                            },
                            kind: 'init'
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 14,
                        end: 16,
                        loc: {
                          start: {
                            line: 1,
                            column: 14
                          },
                          end: {
                            line: 1,
                            column: 16
                          }
                        },
                        properties: []
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
        });

    pass(`let instanceof Foo`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let instanceof Foo`,
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
              body: [
                {
                  type: 'ExpressionStatement',
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
                  expression: {
                    type: 'BinaryExpression',
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
                    left: {
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
                      name: 'let'
                    },
                    operator: 'instanceof',
                    right: {
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
                      name: 'Foo'
                    }
                  }
                }
              ],
              sourceType: 'script'
            }
        });

    pass(`let async = ""`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let async = ""`,
          expected: {
              type: 'Program',
              start: 0,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 14
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
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
                      id: {
                        type: 'Identifier',
                        start: 4,
                        end: 9,
                        loc: {
                          start: {
                            line: 1,
                            column: 4
                          },
                          end: {
                            line: 1,
                            column: 9
                          }
                        },
                        name: 'async'
                      },
                      init: {
                        type: 'Literal',
                        start: 12,
                        end: 14,
                        loc: {
                          start: {
                            line: 1,
                            column: 12
                          },
                          end: {
                            line: 1,
                            column: 14
                          }
                        },
                        value: '',
                        raw: '""'
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
        });

    pass(`let [[] = function() { initCount += 1; }()] = [[23]];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let [[] = function() { initCount += 1; }()] = [[23]];`,
            expected: {
                type: 'Program',
                start: 0,
                end: 53,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 53
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 53,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 53
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 52,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 52
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
                            start: 4,
                            end: 43,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 43
                                }
                            },
                            elements: [{
                                type: 'AssignmentPattern',
                                start: 5,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                },
                                left: {
                                    type: 'ArrayPattern',
                                    start: 5,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    },
                                    elements: []
                                },
                                right: {
                                    type: 'CallExpression',
                                    start: 10,
                                    end: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 42
                                        }
                                    },
                                    callee: {
                                        type: 'FunctionExpression',
                                        start: 10,
                                        end: 40,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 40
                                            }
                                        },
                                        id: null,
                                        generator: false,
                                        expression: false,
                                        async: false,
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            start: 21,
                                            end: 40,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 40
                                                }
                                            },
                                            body: [{
                                                type: 'ExpressionStatement',
                                                start: 23,
                                                end: 38,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 38
                                                    }
                                                },
                                                expression: {
                                                    type: 'AssignmentExpression',
                                                    start: 23,
                                                    end: 37,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 23
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 37
                                                        }
                                                    },
                                                    operator: '+=',
                                                    left: {
                                                        type: 'Identifier',
                                                        start: 23,
                                                        end: 32,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 23
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 32
                                                            }
                                                        },
                                                        name: 'initCount'
                                                    },
                                                    right: {
                                                        type: 'Literal',
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
                                                        },
                                                        value: 1,
                                                        raw: '1'
                                                    }
                                                }
                                            }]
                                        }
                                    },
                                    arguments: []
                                }
                            }]
                        },
                        init: {
                            type: 'ArrayExpression',
                            start: 46,
                            end: 52,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 46
                                },
                                end: {
                                    line: 1,
                                    column: 52
                                }
                            },
                            elements: [{
                                type: 'ArrayExpression',
                                start: 47,
                                end: 51,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 47
                                    },
                                    end: {
                                        line: 1,
                                        column: 51
                                    }
                                },
                                elements: [{
                                    type: 'Literal',
                                    start: 48,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 48
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    },
                                    value: 23,
                                    raw: '23'
                                }]
                            }]
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let [[...x] = function() {}()] = [[2, 1, 3]];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let [[...x] = function() {}()] = [[2, 1, 3]];`,
            expected: {
                type: 'Program',
                start: 0,
                end: 45,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 45
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 45,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 45
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 44,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 44
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
                            start: 4,
                            end: 30,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 30
                                }
                            },
                            elements: [{
                                type: 'AssignmentPattern',
                                start: 5,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                },
                                left: {
                                    type: 'ArrayPattern',
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
                                    elements: [{
                                        type: 'RestElement',
                                        start: 6,
                                        end: 10,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 10
                                            }
                                        },
                                        argument: {
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
                                            name: 'x'
                                        }
                                    }]
                                },
                                right: {
                                    type: 'CallExpression',
                                    start: 14,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    },
                                    callee: {
                                        type: 'FunctionExpression',
                                        start: 14,
                                        end: 27,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 27
                                            }
                                        },
                                        id: null,
                                        generator: false,
                                        expression: false,
                                        async: false,
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            start: 25,
                                            end: 27,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 27
                                                }
                                            },
                                            body: []
                                        }
                                    },
                                    arguments: []
                                }
                            }]
                        },
                        init: {
                            type: 'ArrayExpression',
                            start: 33,
                            end: 44,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 33
                                },
                                end: {
                                    line: 1,
                                    column: 44
                                }
                            },
                            elements: [{
                                type: 'ArrayExpression',
                                start: 34,
                                end: 43,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 34
                                    },
                                    end: {
                                        line: 1,
                                        column: 43
                                    }
                                },
                                elements: [{
                                        type: 'Literal',
                                        start: 35,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 35
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        },
                                        value: 2,
                                        raw: '2'
                                    },
                                    {
                                        type: 'Literal',
                                        start: 38,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 38
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        },
                                        value: 1,
                                        raw: '1'
                                    },
                                    {
                                        type: 'Literal',
                                        start: 41,
                                        end: 42,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 41
                                            },
                                            end: {
                                                line: 1,
                                                column: 42
                                            }
                                        },
                                        value: 3,
                                        raw: '3'
                                    }
                                ]
                            }]
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let [x = 23] = [undefined];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let [x = 23] = [undefined];`,
            expected: {
                type: 'Program',
                start: 0,
                end: 27,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 27
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 27,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 27
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
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
                            elements: [{
                                type: 'AssignmentPattern',
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
                                left: {
                                    type: 'Identifier',
                                    start: 5,
                                    end: 6,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 6
                                        }
                                    },
                                    name: 'x'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 9,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    },
                                    value: 23,
                                    raw: '23'
                                }
                            }]
                        },
                        init: {
                            type: 'ArrayExpression',
                            start: 15,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            },
                            elements: [{
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
                                name: 'undefined'
                            }]
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let [_, x] = [];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let [_, x] = [];`,
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
                    type: 'VariableDeclaration',
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
                    declarations: [{
                        type: 'VariableDeclarator',
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
                        id: {
                            type: 'ArrayPattern',
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
                            elements: [{
                                    type: 'Identifier',
                                    start: 5,
                                    end: 6,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 6
                                        }
                                    },
                                    name: '_'
                                },
                                {
                                    type: 'Identifier',
                                    start: 8,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    name: 'x'
                                }
                            ]
                        },
                        init: {
                            type: 'ArrayExpression',
                            start: 13,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            },
                            elements: []
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let [, ...x] = function*() {}();`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let [, ...x] = function*() {}();`,
            expected: {
                type: 'Program',
                start: 0,
                end: 32,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 32
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
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
                        id: {
                            type: 'ArrayPattern',
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
                            elements: [
                                null,
                                {
                                    type: 'RestElement',
                                    start: 7,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    },
                                    argument: {
                                        type: 'Identifier',
                                        start: 10,
                                        end: 11,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 11
                                            }
                                        },
                                        name: 'x'
                                    }
                                }
                            ]
                        },
                        init: {
                            type: 'CallExpression',
                            start: 15,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            },
                            callee: {
                                type: 'FunctionExpression',
                                start: 15,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [],
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
                            },
                            arguments: []
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let [] = function*() {}();`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let [] = function*() {}();`,
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
                    type: 'VariableDeclaration',
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
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
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
                            },
                            elements: []
                        },
                        init: {
                            type: 'CallExpression',
                            start: 9,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            },
                            callee: {
                                type: 'FunctionExpression',
                                start: 9,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    start: 21,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    },
                                    body: []
                                }
                            },
                            arguments: []
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let [...{ length }] = [1, 2, 3];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let [...{ length }] = [1, 2, 3];`,
            expected: {
                type: 'Program',
                start: 0,
                end: 32,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 32
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
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
                        id: {
                            type: 'ArrayPattern',
                            start: 4,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            },
                            elements: [{
                                type: 'RestElement',
                                start: 5,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                },
                                argument: {
                                    type: 'ObjectPattern',
                                    start: 8,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
                                        start: 10,
                                        end: 16,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 16
                                            }
                                        },
                                        method: false,
                                        shorthand: true,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
                                            start: 10,
                                            end: 16,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 10
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 16
                                                }
                                            },
                                            name: 'length'
                                        },
                                        kind: 'init',
                                        value: {
                                            type: 'Identifier',
                                            start: 10,
                                            end: 16,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 10
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 16
                                                }
                                            },
                                            name: 'length'
                                        }
                                    }]
                                }
                            }]
                        },
                        init: {
                            type: 'ArrayExpression',
                            start: 22,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            },
                            elements: [{
                                    type: 'Literal',
                                    start: 23,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    },
                                    value: 1,
                                    raw: '1'
                                },
                                {
                                    type: 'Literal',
                                    start: 26,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    },
                                    value: 2,
                                    raw: '2'
                                },
                                {
                                    type: 'Literal',
                                    start: 29,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    },
                                    value: 3,
                                    raw: '3'
                                }
                            ]
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let {} = null;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let {} = null;`,
            expected: {
                type: 'Program',
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
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
                            },
                            properties: []
                        },
                        init: {
                            type: 'Literal',
                            start: 9,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            value: null,
                            raw: 'null'
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let { x: y } = { x: 23 };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let { x: y } = { x: 23 };`,
            expected: {
                type: 'Program',
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
                body: [{
                    type: 'VariableDeclaration',
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
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
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
                            properties: [{
                                type: 'Property',
                                start: 6,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 6,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    },
                                    name: 'x'
                                },
                                value: {
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
                                    name: 'y'
                                },
                                kind: 'init'
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            start: 15,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 17,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 17,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    },
                                    name: 'x'
                                },
                                value: {
                                    type: 'Literal',
                                    start: 20,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    },
                                    value: 23,
                                    raw: '23'
                                },
                                kind: 'init'
                            }]
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };`,
            expected: {
                type: 'Program',
                start: 0,
                end: 78,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 78
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 78,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 78
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 77,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 77
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            start: 4,
                            end: 45,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 45
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 6,
                                end: 43,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 43
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 6,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    },
                                    name: 'w'
                                },
                                value: {
                                    type: 'AssignmentPattern',
                                    start: 9,
                                    end: 43,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 43
                                        }
                                    },
                                    left: {
                                        type: 'ObjectPattern',
                                        start: 9,
                                        end: 20,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 9
                                            },
                                            end: {
                                                line: 1,
                                                column: 20
                                            }
                                        },
                                        properties: [{
                                                type: 'Property',
                                                start: 11,
                                                end: 12,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 11
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 12
                                                    }
                                                },
                                                method: false,
                                                shorthand: true,
                                                computed: false,
                                                key: {
                                                    type: 'Identifier',
                                                    start: 11,
                                                    end: 12,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 11
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 12
                                                        }
                                                    },
                                                    name: 'x'
                                                },
                                                kind: 'init',
                                                value: {
                                                    type: 'Identifier',
                                                    start: 11,
                                                    end: 12,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 11
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 12
                                                        }
                                                    },
                                                    name: 'x'
                                                }
                                            },
                                            {
                                                type: 'Property',
                                                start: 14,
                                                end: 15,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 14
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 15
                                                    }
                                                },
                                                method: false,
                                                shorthand: true,
                                                computed: false,
                                                key: {
                                                    type: 'Identifier',
                                                    start: 14,
                                                    end: 15,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 14
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 15
                                                        }
                                                    },
                                                    name: 'y'
                                                },
                                                kind: 'init',
                                                value: {
                                                    type: 'Identifier',
                                                    start: 14,
                                                    end: 15,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 14
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 15
                                                        }
                                                    },
                                                    name: 'y'
                                                }
                                            },
                                            {
                                                type: 'Property',
                                                start: 17,
                                                end: 18,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 17
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 18
                                                    }
                                                },
                                                method: false,
                                                shorthand: true,
                                                computed: false,
                                                key: {
                                                    type: 'Identifier',
                                                    start: 17,
                                                    end: 18,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 17
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 18
                                                        }
                                                    },
                                                    name: 'z'
                                                },
                                                kind: 'init',
                                                value: {
                                                    type: 'Identifier',
                                                    start: 17,
                                                    end: 18,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 17
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 18
                                                        }
                                                    },
                                                    name: 'z'
                                                }
                                            }
                                        ]
                                    },
                                    right: {
                                        type: 'ObjectExpression',
                                        start: 23,
                                        end: 43,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 23
                                            },
                                            end: {
                                                line: 1,
                                                column: 43
                                            }
                                        },
                                        properties: [{
                                                type: 'Property',
                                                start: 25,
                                                end: 29,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 25
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 29
                                                    }
                                                },
                                                method: false,
                                                shorthand: false,
                                                computed: false,
                                                key: {
                                                    type: 'Identifier',
                                                    start: 25,
                                                    end: 26,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 25
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 26
                                                        }
                                                    },
                                                    name: 'x'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    start: 28,
                                                    end: 29,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 28
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 29
                                                        }
                                                    },
                                                    value: 4,
                                                    raw: '4'
                                                },
                                                kind: 'init'
                                            },
                                            {
                                                type: 'Property',
                                                start: 31,
                                                end: 35,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 31
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 35
                                                    }
                                                },
                                                method: false,
                                                shorthand: false,
                                                computed: false,
                                                key: {
                                                    type: 'Identifier',
                                                    start: 31,
                                                    end: 32,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 31
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 32
                                                        }
                                                    },
                                                    name: 'y'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    start: 34,
                                                    end: 35,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 34
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 35
                                                        }
                                                    },
                                                    value: 5,
                                                    raw: '5'
                                                },
                                                kind: 'init'
                                            },
                                            {
                                                type: 'Property',
                                                start: 37,
                                                end: 41,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 37
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 41
                                                    }
                                                },
                                                method: false,
                                                shorthand: false,
                                                computed: false,
                                                key: {
                                                    type: 'Identifier',
                                                    start: 37,
                                                    end: 38,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 37
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 38
                                                        }
                                                    },
                                                    name: 'z'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    start: 40,
                                                    end: 41,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 40
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 41
                                                        }
                                                    },
                                                    value: 6,
                                                    raw: '6'
                                                },
                                                kind: 'init'
                                            }
                                        ]
                                    }
                                },
                                kind: 'init'
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            start: 48,
                            end: 77,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 48
                                },
                                end: {
                                    line: 1,
                                    column: 77
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 50,
                                end: 75,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 50
                                    },
                                    end: {
                                        line: 1,
                                        column: 75
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 50,
                                    end: 51,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 50
                                        },
                                        end: {
                                            line: 1,
                                            column: 51
                                        }
                                    },
                                    name: 'w'
                                },
                                value: {
                                    type: 'ObjectExpression',
                                    start: 53,
                                    end: 75,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 53
                                        },
                                        end: {
                                            line: 1,
                                            column: 75
                                        }
                                    },
                                    properties: [{
                                            type: 'Property',
                                            start: 55,
                                            end: 67,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 55
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 67
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 55,
                                                end: 56,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 55
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 56
                                                    }
                                                },
                                                name: 'x'
                                            },
                                            value: {
                                                type: 'Identifier',
                                                start: 58,
                                                end: 67,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 58
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 67
                                                    }
                                                },
                                                name: 'undefined'
                                            },
                                            kind: 'init'
                                        },
                                        {
                                            type: 'Property',
                                            start: 69,
                                            end: 73,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 69
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 73
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 69,
                                                end: 70,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 69
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 70
                                                    }
                                                },
                                                name: 'z'
                                            },
                                            value: {
                                                type: 'Literal',
                                                start: 72,
                                                end: 73,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 72
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 73
                                                    }
                                                },
                                                value: 7,
                                                raw: '7'
                                            },
                                            kind: 'init'
                                        }
                                    ]
                                },
                                kind: 'init'
                            }]
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let arrow = () => {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let arrow = () => {};`,
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
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            },
                            name: 'arrow'
                        },
                        init: {
                            type: 'ArrowFunctionExpression',
                            start: 12,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                start: 18,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                },
                                body: []
                            }
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let ice = function* fapper() {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let ice = function* fapper() {};`,
            expected: {
                type: 'Program',
                start: 0,
                end: 32,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 32
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
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
                        id: {
                            type: 'Identifier',
                            start: 4,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            },
                            name: 'ice'
                        },
                        init: {
                            type: 'FunctionExpression',
                            start: 10,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            },
                            id: {
                                type: 'Identifier',
                                start: 20,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                },
                                name: 'fapper'
                            },
                            generator: true,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                start: 29,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 29
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                },
                                body: []
                            }
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let {a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let {a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3};`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'ObjectExpression',
                            properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 23,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 23
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 1,
                                        start: 26,
                                        end: 27,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26
                                            },
                                            end: {
                                                line: 1,
                                                column: 27
                                            }
                                        },
                                        raw: '1'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 23,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'y',
                                        start: 29,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 29
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 2,
                                        start: 32,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 32
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
                                            }
                                        },
                                        raw: '2'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 29,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 35,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 35
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 5,
                                        start: 38,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 38
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        },
                                        raw: '5'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 35,
                                    end: 39,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 35
                                        },
                                        end: {
                                            line: 1,
                                            column: 39
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 41,
                                        end: 42,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 41
                                            },
                                            end: {
                                                line: 1,
                                                column: 42
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 3,
                                        start: 44,
                                        end: 45,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 44
                                            },
                                            end: {
                                                line: 1,
                                                column: 45
                                            }
                                        },
                                        raw: '3'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 41,
                                    end: 45,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 41
                                        },
                                        end: {
                                            line: 1,
                                            column: 45
                                        }
                                    }
                                }
                            ],
                            start: 22,
                            end: 46,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 46
                                }
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 5,
                                        end: 6,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 6
                                            }
                                        }
                                    },
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 5,
                                        end: 6,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 6
                                            }
                                        }
                                    },
                                    method: false,
                                    shorthand: true,
                                    start: 5,
                                    end: 6,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 6
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 8,
                                        end: 9,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 9
                                            }
                                        }
                                    },
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 8,
                                        end: 9,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 9
                                            }
                                        }
                                    },
                                    method: false,
                                    shorthand: true,
                                    start: 8,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    }
                                },
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'rest',
                                        start: 14,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
                                            }
                                        }
                                    },
                                    start: 11,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                }
                            ],
                            start: 4,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        start: 4,
                        end: 46,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 46
                            }
                        }
                    }],
                    kind: 'let',
                    start: 0,
                    end: 47,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 47
                        }
                    }
                }],
                start: 0,
                end: 47,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 47
                    }
                }
            }
        });

    pass(`let {...x} = { get v() { return 2; } };`, Context.Empty, {
            source: `let {...x} = { get v() { return 2; } };`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'ObjectExpression',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'v'
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [{
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'Literal',
                                                value: 2
                                            }
                                        }]
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null
                                },
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false
                            }]
                        },
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'RestElement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'x'
                                }
                            }]
                        }
                    }],
                    kind: 'let'
                }]
            }
        });

    pass(`let { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] };`,
            expected: {
                type: 'Program',
                start: 0,
                end: 59,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 59
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 59,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 59
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 58
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            start: 4,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 6,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 6,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    },
                                    name: 'w'
                                },
                                value: {
                                    type: 'AssignmentPattern',
                                    start: 9,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    },
                                    left: {
                                        type: 'ArrayPattern',
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
                                        elements: [{
                                                type: 'Identifier',
                                                start: 10,
                                                end: 11,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 10
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 11
                                                    }
                                                },
                                                name: 'x'
                                            },
                                            {
                                                type: 'Identifier',
                                                start: 13,
                                                end: 14,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 13
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 14
                                                    }
                                                },
                                                name: 'y'
                                            },
                                            {
                                                type: 'Identifier',
                                                start: 16,
                                                end: 17,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 16
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 17
                                                    }
                                                },
                                                name: 'z'
                                            }
                                        ]
                                    },
                                    right: {
                                        type: 'ArrayExpression',
                                        start: 21,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        },
                                        elements: [{
                                                type: 'Literal',
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
                                                value: 4,
                                                raw: '4'
                                            },
                                            {
                                                type: 'Literal',
                                                start: 25,
                                                end: 26,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 25
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 26
                                                    }
                                                },
                                                value: 5,
                                                raw: '5'
                                            },
                                            {
                                                type: 'Literal',
                                                start: 28,
                                                end: 29,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 29
                                                    }
                                                },
                                                value: 6,
                                                raw: '6'
                                            }
                                        ]
                                    }
                                },
                                kind: 'init'
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            start: 35,
                            end: 58,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 35
                                },
                                end: {
                                    line: 1,
                                    column: 58
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 37,
                                end: 56,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 37
                                    },
                                    end: {
                                        line: 1,
                                        column: 56
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 37,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 37
                                        },
                                        end: {
                                            line: 1,
                                            column: 38
                                        }
                                    },
                                    name: 'w'
                                },
                                value: {
                                    type: 'ArrayExpression',
                                    start: 40,
                                    end: 56,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 40
                                        },
                                        end: {
                                            line: 1,
                                            column: 56
                                        }
                                    },
                                    elements: [{
                                            type: 'Literal',
                                            start: 41,
                                            end: 42,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 41
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 42
                                                }
                                            },
                                            value: 7,
                                            raw: '7'
                                        },
                                        {
                                            type: 'Identifier',
                                            start: 44,
                                            end: 53,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 44
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 53
                                                }
                                            },
                                            name: 'undefined'
                                        }
                                    ]
                                },
                                kind: 'init'
                            }]
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let { x, } = { x: 23 };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let { x, } = { x: 23 };`,
            expected: {
                type: 'Program',
                start: 0,
                end: 23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
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
                            properties: [{
                                type: 'Property',
                                start: 6,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                },
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 6,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    },
                                    name: 'x'
                                },
                                kind: 'init',
                                value: {
                                    type: 'Identifier',
                                    start: 6,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    },
                                    name: 'x'
                                }
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            start: 13,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 15,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 15,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    },
                                    name: 'x'
                                },
                                value: {
                                    type: 'Literal',
                                    start: 18,
                                    end: 20,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 20
                                        }
                                    },
                                    value: 23,
                                    raw: '23'
                                },
                                kind: 'init'
                            }]
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let { ice = function* () {}, fapper = function* x() {} } = {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let { ice = function* () {}, fapper = function* x() {} } = {};`,
            expected: {
                type: 'Program',
                start: 0,
                end: 62,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 62
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 62,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 62
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 61,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 61
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            start: 4,
                            end: 56,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 56
                                }
                            },
                            properties: [{
                                    type: 'Property',
                                    start: 6,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    },
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
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
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'AssignmentPattern',
                                        start: 6,
                                        end: 27,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 27
                                            }
                                        },
                                        left: {
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
                                        },
                                        right: {
                                            type: 'FunctionExpression',
                                            start: 12,
                                            end: 27,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 27
                                                }
                                            },
                                            id: null,
                                            generator: true,
                                            expression: false,
                                            async: false,
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                start: 25,
                                                end: 27,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 25
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 27
                                                    }
                                                },
                                                body: []
                                            }
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    start: 29,
                                    end: 54,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 54
                                        }
                                    },
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 29,
                                        end: 35,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 29
                                            },
                                            end: {
                                                line: 1,
                                                column: 35
                                            }
                                        },
                                        name: 'fapper'
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'AssignmentPattern',
                                        start: 29,
                                        end: 54,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 29
                                            },
                                            end: {
                                                line: 1,
                                                column: 54
                                            }
                                        },
                                        left: {
                                            type: 'Identifier',
                                            start: 29,
                                            end: 35,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 29
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 35
                                                }
                                            },
                                            name: 'fapper'
                                        },
                                        right: {
                                            type: 'FunctionExpression',
                                            start: 38,
                                            end: 54,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 38
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 54
                                                }
                                            },
                                            id: {
                                                type: 'Identifier',
                                                start: 48,
                                                end: 49,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 48
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 49
                                                    }
                                                },
                                                name: 'x'
                                            },
                                            generator: true,
                                            expression: false,
                                            async: false,
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                start: 52,
                                                end: 54,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 52
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 54
                                                    }
                                                },
                                                body: []
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        init: {
                            type: 'ObjectExpression',
                            start: 59,
                            end: 61,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 59
                                },
                                end: {
                                    line: 1,
                                    column: 61
                                }
                            },
                            properties: []
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let { a = (function () {}), b = (0, function() {})  } = {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let { a = (function () {}), b = (0, function() {})  } = {};`,
            expected: {
                type: 'Program',
                start: 0,
                end: 59,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 59
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 59,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 59
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 58
                            }
                        },
                        id: {
                            type: 'ObjectPattern',
                            start: 4,
                            end: 53,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 53
                                }
                            },
                            properties: [{
                                    type: 'Property',
                                    start: 6,
                                    end: 26,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 26
                                        }
                                    },
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 6,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        },
                                        name: 'a'
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'AssignmentPattern',
                                        start: 6,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        },
                                        left: {
                                            type: 'Identifier',
                                            start: 6,
                                            end: 7,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 6
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 7
                                                }
                                            },
                                            name: 'a'
                                        },
                                        right: {
                                            type: 'FunctionExpression',
                                            start: 11,
                                            end: 25,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 11
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 25
                                                }
                                            },
                                            id: null,
                                            generator: false,
                                            expression: false,
                                            async: false,
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                start: 23,
                                                end: 25,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 25
                                                    }
                                                },
                                                body: []
                                            }
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    start: 28,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 28
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    },
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 28,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 28
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        },
                                        name: 'b'
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'AssignmentPattern',
                                        start: 28,
                                        end: 50,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 28
                                            },
                                            end: {
                                                line: 1,
                                                column: 50
                                            }
                                        },
                                        left: {
                                            type: 'Identifier',
                                            start: 28,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            },
                                            name: 'b'
                                        },
                                        right: {
                                            type: 'SequenceExpression',
                                            start: 33,
                                            end: 49,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 49
                                                }
                                            },
                                            expressions: [{
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
                                                    value: 0,
                                                    raw: '0'
                                                },
                                                {
                                                    type: 'FunctionExpression',
                                                    start: 36,
                                                    end: 49,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 36
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 49
                                                        }
                                                    },
                                                    id: null,
                                                    generator: false,
                                                    expression: false,
                                                    async: false,
                                                    params: [],
                                                    body: {
                                                        type: 'BlockStatement',
                                                        start: 47,
                                                        end: 49,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 47
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 49
                                                            }
                                                        },
                                                        body: []
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        },
                        init: {
                            type: 'ObjectExpression',
                            start: 56,
                            end: 58,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 56
                                },
                                end: {
                                    line: 1,
                                    column: 58
                                }
                            },
                            properties: []
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let [...[,]] = g();`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let [...[,]] = g();`,
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
                    type: 'VariableDeclaration',
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
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
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
                            elements: [{
                                type: 'RestElement',
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
                                argument: {
                                    type: 'ArrayPattern',
                                    start: 8,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    },
                                    elements: [
                                        null
                                    ]
                                }
                            }]
                        },
                        init: {
                            type: 'CallExpression',
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
                            callee: {
                                type: 'Identifier',
                                start: 15,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                },
                                name: 'g'
                            },
                            arguments: []
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let [...[]] = function*() {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let [...[]] = function*() {};`,
            expected: {
                type: 'Program',
                start: 0,
                end: 29,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 29
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 29,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 29
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
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
                            elements: [{
                                type: 'RestElement',
                                start: 5,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                },
                                argument: {
                                    type: 'ArrayPattern',
                                    start: 8,
                                    end: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    },
                                    elements: []
                                }
                            }]
                        },
                        init: {
                            type: 'FunctionExpression',
                            start: 14,
                            end: 28,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 28
                                }
                            },
                            id: null,
                            generator: true,
                            expression: false,
                            async: false,
                            params: [],
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
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [];`,
            expected: {
                type: 'Program',
                start: 0,
                end: 49,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 49
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 49,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 49
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
                            start: 4,
                            end: 43,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 43
                                }
                            },
                            elements: [{
                                type: 'AssignmentPattern',
                                start: 5,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                },
                                left: {
                                    type: 'ObjectPattern',
                                    start: 5,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    },
                                    properties: [{
                                            type: 'Property',
                                            start: 7,
                                            end: 8,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 7
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 8
                                                }
                                            },
                                            method: false,
                                            shorthand: true,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 7,
                                                end: 8,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 7
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 8
                                                    }
                                                },
                                                name: 'x'
                                            },
                                            kind: 'init',
                                            value: {
                                                type: 'Identifier',
                                                start: 7,
                                                end: 8,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 7
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 8
                                                    }
                                                },
                                                name: 'x'
                                            }
                                        },
                                        {
                                            type: 'Property',
                                            start: 10,
                                            end: 11,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 10
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 11
                                                }
                                            },
                                            method: false,
                                            shorthand: true,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 10,
                                                end: 11,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 10
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 11
                                                    }
                                                },
                                                name: 'y'
                                            },
                                            kind: 'init',
                                            value: {
                                                type: 'Identifier',
                                                start: 10,
                                                end: 11,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 10
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 11
                                                    }
                                                },
                                                name: 'y'
                                            }
                                        },
                                        {
                                            type: 'Property',
                                            start: 13,
                                            end: 14,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 14
                                                }
                                            },
                                            method: false,
                                            shorthand: true,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 13,
                                                end: 14,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 13
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 14
                                                    }
                                                },
                                                name: 'z'
                                            },
                                            kind: 'init',
                                            value: {
                                                type: 'Identifier',
                                                start: 13,
                                                end: 14,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 13
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 14
                                                    }
                                                },
                                                name: 'z'
                                            }
                                        }
                                    ]
                                },
                                right: {
                                    type: 'ObjectExpression',
                                    start: 19,
                                    end: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 42
                                        }
                                    },
                                    properties: [{
                                            type: 'Property',
                                            start: 21,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 21,
                                                end: 22,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 21
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 22
                                                    }
                                                },
                                                name: 'x'
                                            },
                                            value: {
                                                type: 'Literal',
                                                start: 24,
                                                end: 26,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 24
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 26
                                                    }
                                                },
                                                value: 44,
                                                raw: '44'
                                            },
                                            kind: 'init'
                                        },
                                        {
                                            type: 'Property',
                                            start: 28,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 28,
                                                end: 29,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 29
                                                    }
                                                },
                                                name: 'y'
                                            },
                                            value: {
                                                type: 'Literal',
                                                start: 31,
                                                end: 33,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 31
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 33
                                                    }
                                                },
                                                value: 55,
                                                raw: '55'
                                            },
                                            kind: 'init'
                                        },
                                        {
                                            type: 'Property',
                                            start: 35,
                                            end: 40,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 35
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 40
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 35,
                                                end: 36,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 35
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 36
                                                    }
                                                },
                                                name: 'z'
                                            },
                                            value: {
                                                type: 'Literal',
                                                start: 38,
                                                end: 40,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 38
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 40
                                                    }
                                                },
                                                value: 66,
                                                raw: '66'
                                            },
                                            kind: 'init'
                                        }
                                    ]
                                }
                            }]
                        },
                        init: {
                            type: 'ArrayExpression',
                            start: 46,
                            end: 48,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 46
                                },
                                end: {
                                    line: 1,
                                    column: 48
                                }
                            },
                            elements: []
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let [x = 23] = [undefined];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let [x = 23] = [undefined];`,
            expected: {
                type: 'Program',
                start: 0,
                end: 27,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 27
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 27,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 27
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
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
                            elements: [{
                                type: 'AssignmentPattern',
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
                                left: {
                                    type: 'Identifier',
                                    start: 5,
                                    end: 6,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 6
                                        }
                                    },
                                    name: 'x'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 9,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    },
                                    value: 23,
                                    raw: '23'
                                }
                            }]
                        },
                        init: {
                            type: 'ArrayExpression',
                            start: 15,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            },
                            elements: [{
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
                                name: 'undefined'
                            }]
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`let [[,] = function* g() {}] = [];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let [[,] = function* g() {}] = [];`,
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
                        line: 1,
                        column: 34
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 34,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 34
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 33,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 33
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
                            start: 4,
                            end: 28,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 28
                                }
                            },
                            elements: [{
                                type: 'AssignmentPattern',
                                start: 5,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                },
                                left: {
                                    type: 'ArrayPattern',
                                    start: 5,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    },
                                    elements: [
                                        null
                                    ]
                                },
                                right: {
                                    type: 'FunctionExpression',
                                    start: 11,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    },
                                    id: {
                                        type: 'Identifier',
                                        start: 21,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        },
                                        name: 'g'
                                    },
                                    generator: true,
                                    expression: false,
                                    async: false,
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 25,
                                        end: 27,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 27
                                            }
                                        },
                                        body: []
                                    }
                                }
                            }]
                        },
                        init: {
                            type: 'ArrayExpression',
                            start: 31,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 31
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            },
                            elements: []
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

    pass(`switch (true) { default: let x; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `switch (true) { default: let x; }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 33,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 33
                    }
                },
                body: [{
                    type: 'SwitchStatement',
                    start: 0,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 33
                        }
                    },
                    discriminant: {
                        type: 'Literal',
                        start: 8,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        },
                        value: true,
                        raw: 'true'
                    },
                    cases: [{
                        type: 'SwitchCase',
                        start: 16,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 31
                            }
                        },
                        consequent: [{
                            type: 'VariableDeclaration',
                            start: 25,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 25
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            },
                            declarations: [{
                                type: 'VariableDeclarator',
                                start: 29,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 29
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                },
                                id: {
                                    type: 'Identifier',
                                    start: 29,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    },
                                    name: 'x'
                                },
                                init: null
                            }],
                            kind: 'let'
                        }],
                        test: null
                    }]
                }],
                sourceType: 'script'
            }
        });

    pass(`switch (true) { case true: let x; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `switch (true) { case true: let x; }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 35,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 35
                    }
                },
                body: [{
                    type: 'SwitchStatement',
                    start: 0,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    },
                    discriminant: {
                        type: 'Literal',
                        start: 8,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        },
                        value: true,
                        raw: 'true'
                    },
                    cases: [{
                        type: 'SwitchCase',
                        start: 16,
                        end: 33,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 33
                            }
                        },
                        consequent: [{
                            type: 'VariableDeclaration',
                            start: 27,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 27
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            },
                            declarations: [{
                                type: 'VariableDeclarator',
                                start: 31,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 31
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                },
                                id: {
                                    type: 'Identifier',
                                    start: 31,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 31
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    },
                                    name: 'x'
                                },
                                init: null
                            }],
                            kind: 'let'
                        }],
                        test: {
                            type: 'Literal',
                            start: 21,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            },
                            value: true,
                            raw: 'true'
                        }
                    }]
                }],
                sourceType: 'script'
            }
        });

    pass(`let x = "a";
      let y = "b";

      for (let x = "c", i = 0; i < 1; i++) { let y = "d"; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let x = "a";
        let y = "b";

        for (let x = "c", i = 0; i < 1; i++) { let y = "d"; }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 96,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 4,
                    column: 61
                  }
                },
                body: [
                  {
                    type: 'VariableDeclaration',
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
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
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
                          name: 'x'
                        },
                        init: {
                          type: 'Literal',
                          start: 8,
                          end: 11,
                          loc: {
                            start: {
                              line: 1,
                              column: 8
                            },
                            end: {
                              line: 1,
                              column: 11
                            }
                          },
                          value: 'a',
                          raw: '"a"'
                        }
                      }
                    ],
                    kind: 'let'
                  },
                  {
                    type: 'VariableDeclaration',
                    start: 21,
                    end: 33,
                    loc: {
                      start: {
                        line: 2,
                        column: 8
                      },
                      end: {
                        line: 2,
                        column: 20
                      }
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 25,
                        end: 32,
                        loc: {
                          start: {
                            line: 2,
                            column: 12
                          },
                          end: {
                            line: 2,
                            column: 19
                          }
                        },
                        id: {
                          type: 'Identifier',
                          start: 25,
                          end: 26,
                          loc: {
                            start: {
                              line: 2,
                              column: 12
                            },
                            end: {
                              line: 2,
                              column: 13
                            }
                          },
                          name: 'y'
                        },
                        init: {
                          type: 'Literal',
                          start: 29,
                          end: 32,
                          loc: {
                            start: {
                              line: 2,
                              column: 16
                            },
                            end: {
                              line: 2,
                              column: 19
                            }
                          },
                          value: 'b',
                          raw: '"b"'
                        }
                      }
                    ],
                    kind: 'let'
                  },
                  {
                    type: 'ForStatement',
                    start: 43,
                    end: 96,
                    loc: {
                      start: {
                        line: 4,
                        column: 8
                      },
                      end: {
                        line: 4,
                        column: 61
                      }
                    },
                    init: {
                      type: 'VariableDeclaration',
                      start: 48,
                      end: 66,
                      loc: {
                        start: {
                          line: 4,
                          column: 13
                        },
                        end: {
                          line: 4,
                          column: 31
                        }
                      },
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          start: 52,
                          end: 59,
                          loc: {
                            start: {
                              line: 4,
                              column: 17
                            },
                            end: {
                              line: 4,
                              column: 24
                            }
                          },
                          id: {
                            type: 'Identifier',
                            start: 52,
                            end: 53,
                            loc: {
                              start: {
                                line: 4,
                                column: 17
                              },
                              end: {
                                line: 4,
                                column: 18
                              }
                            },
                            name: 'x'
                          },
                          init: {
                            type: 'Literal',
                            start: 56,
                            end: 59,
                            loc: {
                              start: {
                                line: 4,
                                column: 21
                              },
                              end: {
                                line: 4,
                                column: 24
                              }
                            },
                            value: 'c',
                            raw: '"c"'
                          }
                        },
                        {
                          type: 'VariableDeclarator',
                          start: 61,
                          end: 66,
                          loc: {
                            start: {
                              line: 4,
                              column: 26
                            },
                            end: {
                              line: 4,
                              column: 31
                            }
                          },
                          id: {
                            type: 'Identifier',
                            start: 61,
                            end: 62,
                            loc: {
                              start: {
                                line: 4,
                                column: 26
                              },
                              end: {
                                line: 4,
                                column: 27
                              }
                            },
                            name: 'i'
                          },
                          init: {
                            type: 'Literal',
                            start: 65,
                            end: 66,
                            loc: {
                              start: {
                                line: 4,
                                column: 30
                              },
                              end: {
                                line: 4,
                                column: 31
                              }
                            },
                            value: 0,
                            raw: '0'
                          }
                        }
                      ],
                      kind: 'let'
                    },
                    test: {
                      type: 'BinaryExpression',
                      start: 68,
                      end: 73,
                      loc: {
                        start: {
                          line: 4,
                          column: 33
                        },
                        end: {
                          line: 4,
                          column: 38
                        }
                      },
                      left: {
                        type: 'Identifier',
                        start: 68,
                        end: 69,
                        loc: {
                          start: {
                            line: 4,
                            column: 33
                          },
                          end: {
                            line: 4,
                            column: 34
                          }
                        },
                        name: 'i'
                      },
                      operator: '<',
                      right: {
                        type: 'Literal',
                        start: 72,
                        end: 73,
                        loc: {
                          start: {
                            line: 4,
                            column: 37
                          },
                          end: {
                            line: 4,
                            column: 38
                          }
                        },
                        value: 1,
                        raw: '1'
                      }
                    },
                    update: {
                      type: 'UpdateExpression',
                      start: 75,
                      end: 78,
                      loc: {
                        start: {
                          line: 4,
                          column: 40
                        },
                        end: {
                          line: 4,
                          column: 43
                        }
                      },
                      operator: '++',
                      prefix: false,
                      argument: {
                        type: 'Identifier',
                        start: 75,
                        end: 76,
                        loc: {
                          start: {
                            line: 4,
                            column: 40
                          },
                          end: {
                            line: 4,
                            column: 41
                          }
                        },
                        name: 'i'
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      start: 80,
                      end: 96,
                      loc: {
                        start: {
                          line: 4,
                          column: 45
                        },
                        end: {
                          line: 4,
                          column: 61
                        }
                      },
                      body: [
                        {
                          type: 'VariableDeclaration',
                          start: 82,
                          end: 94,
                          loc: {
                            start: {
                              line: 4,
                              column: 47
                            },
                            end: {
                              line: 4,
                              column: 59
                            }
                          },
                          declarations: [
                            {
                              type: 'VariableDeclarator',
                              start: 86,
                              end: 93,
                              loc: {
                                start: {
                                  line: 4,
                                  column: 51
                                },
                                end: {
                                  line: 4,
                                  column: 58
                                }
                              },
                              id: {
                                type: 'Identifier',
                                start: 86,
                                end: 87,
                                loc: {
                                  start: {
                                    line: 4,
                                    column: 51
                                  },
                                  end: {
                                    line: 4,
                                    column: 52
                                  }
                                },
                                name: 'y'
                              },
                              init: {
                                type: 'Literal',
                                start: 90,
                                end: 93,
                                loc: {
                                  start: {
                                    line: 4,
                                    column: 55
                                  },
                                  end: {
                                    line: 4,
                                    column: 58
                                  }
                                },
                                value: 'd',
                                raw: '"d"'
                              }
                            }
                          ],
                          kind: 'let'
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`let a = [];
      for (let i = 0, f = function() { return i }; i < 5; ++i) {
        a.push(f);
      }
      for (let k = 0; k < 5; ++k) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let a = [];
        for (let i = 0, f = function() { return i }; i < 5; ++i) {
          a.push(f);
        }
        for (let k = 0; k < 5; ++k) {}`,
            expected: {
                type: 'Program',
                start: 0,
                end: 148,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 5,
                    column: 38
                  }
                },
                body: [
                  {
                    type: 'VariableDeclaration',
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
                    declarations: [
                      {
                        type: 'VariableDeclarator',
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
                          name: 'a'
                        },
                        init: {
                          type: 'ArrayExpression',
                          start: 8,
                          end: 10,
                          loc: {
                            start: {
                              line: 1,
                              column: 8
                            },
                            end: {
                              line: 1,
                              column: 10
                            }
                          },
                          elements: []
                        }
                      }
                    ],
                    kind: 'let'
                  },
                  {
                    type: 'ForStatement',
                    start: 20,
                    end: 109,
                    loc: {
                      start: {
                        line: 2,
                        column: 8
                      },
                      end: {
                        line: 4,
                        column: 9
                      }
                    },
                    init: {
                      type: 'VariableDeclaration',
                      start: 25,
                      end: 63,
                      loc: {
                        start: {
                          line: 2,
                          column: 13
                        },
                        end: {
                          line: 2,
                          column: 51
                        }
                      },
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          start: 29,
                          end: 34,
                          loc: {
                            start: {
                              line: 2,
                              column: 17
                            },
                            end: {
                              line: 2,
                              column: 22
                            }
                          },
                          id: {
                            type: 'Identifier',
                            start: 29,
                            end: 30,
                            loc: {
                              start: {
                                line: 2,
                                column: 17
                              },
                              end: {
                                line: 2,
                                column: 18
                              }
                            },
                            name: 'i'
                          },
                          init: {
                            type: 'Literal',
                            start: 33,
                            end: 34,
                            loc: {
                              start: {
                                line: 2,
                                column: 21
                              },
                              end: {
                                line: 2,
                                column: 22
                              }
                            },
                            value: 0,
                            raw: '0'
                          }
                        },
                        {
                          type: 'VariableDeclarator',
                          start: 36,
                          end: 63,
                          loc: {
                            start: {
                              line: 2,
                              column: 24
                            },
                            end: {
                              line: 2,
                              column: 51
                            }
                          },
                          id: {
                            type: 'Identifier',
                            start: 36,
                            end: 37,
                            loc: {
                              start: {
                                line: 2,
                                column: 24
                              },
                              end: {
                                line: 2,
                                column: 25
                              }
                            },
                            name: 'f'
                          },
                          init: {
                            type: 'FunctionExpression',
                            start: 40,
                            end: 63,
                            loc: {
                              start: {
                                line: 2,
                                column: 28
                              },
                              end: {
                                line: 2,
                                column: 51
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 51,
                              end: 63,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 39
                                },
                                end: {
                                  line: 2,
                                  column: 51
                                }
                              },
                              body: [
                                {
                                  type: 'ReturnStatement',
                                  start: 53,
                                  end: 61,
                                  loc: {
                                    start: {
                                      line: 2,
                                      column: 41
                                    },
                                    end: {
                                      line: 2,
                                      column: 49
                                    }
                                  },
                                  argument: {
                                    type: 'Identifier',
                                    start: 60,
                                    end: 61,
                                    loc: {
                                      start: {
                                        line: 2,
                                        column: 48
                                      },
                                      end: {
                                        line: 2,
                                        column: 49
                                      }
                                    },
                                    name: 'i'
                                  }
                                }
                              ]
                            }
                          }
                        }
                      ],
                      kind: 'let'
                    },
                    test: {
                      type: 'BinaryExpression',
                      start: 65,
                      end: 70,
                      loc: {
                        start: {
                          line: 2,
                          column: 53
                        },
                        end: {
                          line: 2,
                          column: 58
                        }
                      },
                      left: {
                        type: 'Identifier',
                        start: 65,
                        end: 66,
                        loc: {
                          start: {
                            line: 2,
                            column: 53
                          },
                          end: {
                            line: 2,
                            column: 54
                          }
                        },
                        name: 'i'
                      },
                      operator: '<',
                      right: {
                        type: 'Literal',
                        start: 69,
                        end: 70,
                        loc: {
                          start: {
                            line: 2,
                            column: 57
                          },
                          end: {
                            line: 2,
                            column: 58
                          }
                        },
                        value: 5,
                        raw: '5'
                      }
                    },
                    update: {
                      type: 'UpdateExpression',
                      start: 72,
                      end: 75,
                      loc: {
                        start: {
                          line: 2,
                          column: 60
                        },
                        end: {
                          line: 2,
                          column: 63
                        }
                      },
                      operator: '++',
                      prefix: true,
                      argument: {
                        type: 'Identifier',
                        start: 74,
                        end: 75,
                        loc: {
                          start: {
                            line: 2,
                            column: 62
                          },
                          end: {
                            line: 2,
                            column: 63
                          }
                        },
                        name: 'i'
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      start: 77,
                      end: 109,
                      loc: {
                        start: {
                          line: 2,
                          column: 65
                        },
                        end: {
                          line: 4,
                          column: 9
                        }
                      },
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 89,
                          end: 99,
                          loc: {
                            start: {
                              line: 3,
                              column: 10
                            },
                            end: {
                              line: 3,
                              column: 20
                            }
                          },
                          expression: {
                            type: 'CallExpression',
                            start: 89,
                            end: 98,
                            loc: {
                              start: {
                                line: 3,
                                column: 10
                              },
                              end: {
                                line: 3,
                                column: 19
                              }
                            },
                            callee: {
                              type: 'MemberExpression',
                              start: 89,
                              end: 95,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 10
                                },
                                end: {
                                  line: 3,
                                  column: 16
                                }
                              },
                              object: {
                                type: 'Identifier',
                                start: 89,
                                end: 90,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 10
                                  },
                                  end: {
                                    line: 3,
                                    column: 11
                                  }
                                },
                                name: 'a'
                              },
                              property: {
                                type: 'Identifier',
                                start: 91,
                                end: 95,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 12
                                  },
                                  end: {
                                    line: 3,
                                    column: 16
                                  }
                                },
                                name: 'push'
                              },
                              computed: false
                            },
                            arguments: [
                              {
                                type: 'Identifier',
                                start: 96,
                                end: 97,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 17
                                  },
                                  end: {
                                    line: 3,
                                    column: 18
                                  }
                                },
                                name: 'f'
                              }
                            ]
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'ForStatement',
                    start: 118,
                    end: 148,
                    loc: {
                      start: {
                        line: 5,
                        column: 8
                      },
                      end: {
                        line: 5,
                        column: 38
                      }
                    },
                    init: {
                      type: 'VariableDeclaration',
                      start: 123,
                      end: 132,
                      loc: {
                        start: {
                          line: 5,
                          column: 13
                        },
                        end: {
                          line: 5,
                          column: 22
                        }
                      },
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          start: 127,
                          end: 132,
                          loc: {
                            start: {
                              line: 5,
                              column: 17
                            },
                            end: {
                              line: 5,
                              column: 22
                            }
                          },
                          id: {
                            type: 'Identifier',
                            start: 127,
                            end: 128,
                            loc: {
                              start: {
                                line: 5,
                                column: 17
                              },
                              end: {
                                line: 5,
                                column: 18
                              }
                            },
                            name: 'k'
                          },
                          init: {
                            type: 'Literal',
                            start: 131,
                            end: 132,
                            loc: {
                              start: {
                                line: 5,
                                column: 21
                              },
                              end: {
                                line: 5,
                                column: 22
                              }
                            },
                            value: 0,
                            raw: '0'
                          }
                        }
                      ],
                      kind: 'let'
                    },
                    test: {
                      type: 'BinaryExpression',
                      start: 134,
                      end: 139,
                      loc: {
                        start: {
                          line: 5,
                          column: 24
                        },
                        end: {
                          line: 5,
                          column: 29
                        }
                      },
                      left: {
                        type: 'Identifier',
                        start: 134,
                        end: 135,
                        loc: {
                          start: {
                            line: 5,
                            column: 24
                          },
                          end: {
                            line: 5,
                            column: 25
                          }
                        },
                        name: 'k'
                      },
                      operator: '<',
                      right: {
                        type: 'Literal',
                        start: 138,
                        end: 139,
                        loc: {
                          start: {
                            line: 5,
                            column: 28
                          },
                          end: {
                            line: 5,
                            column: 29
                          }
                        },
                        value: 5,
                        raw: '5'
                      }
                    },
                    update: {
                      type: 'UpdateExpression',
                      start: 141,
                      end: 144,
                      loc: {
                        start: {
                          line: 5,
                          column: 31
                        },
                        end: {
                          line: 5,
                          column: 34
                        }
                      },
                      operator: '++',
                      prefix: true,
                      argument: {
                        type: 'Identifier',
                        start: 143,
                        end: 144,
                        loc: {
                          start: {
                            line: 5,
                            column: 33
                          },
                          end: {
                            line: 5,
                            column: 34
                          }
                        },
                        name: 'k'
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      start: 146,
                      end: 148,
                      loc: {
                        start: {
                          line: 5,
                          column: 36
                        },
                        end: {
                          line: 5,
                          column: 38
                        }
                      },
                      body: []
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`let a = [];
      for (let i = 0; a.push(function () { return i; }), i < 5; ++i) { }
      for (let k = 0; k < 5; ++k) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `let a = [];
        for (let i = 0; a.push(function () { return i; }), i < 5; ++i) { }
        for (let k = 0; k < 5; ++k) {}`,
            expected: {
                type: 'Program',
                start: 0,
                end: 125,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 3,
                    column: 38
                  }
                },
                body: [
                  {
                    type: 'VariableDeclaration',
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
                    declarations: [
                      {
                        type: 'VariableDeclarator',
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
                          name: 'a'
                        },
                        init: {
                          type: 'ArrayExpression',
                          start: 8,
                          end: 10,
                          loc: {
                            start: {
                              line: 1,
                              column: 8
                            },
                            end: {
                              line: 1,
                              column: 10
                            }
                          },
                          elements: []
                        }
                      }
                    ],
                    kind: 'let'
                  },
                  {
                    type: 'ForStatement',
                    start: 20,
                    end: 86,
                    loc: {
                      start: {
                        line: 2,
                        column: 8
                      },
                      end: {
                        line: 2,
                        column: 74
                      }
                    },
                    init: {
                      type: 'VariableDeclaration',
                      start: 25,
                      end: 34,
                      loc: {
                        start: {
                          line: 2,
                          column: 13
                        },
                        end: {
                          line: 2,
                          column: 22
                        }
                      },
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          start: 29,
                          end: 34,
                          loc: {
                            start: {
                              line: 2,
                              column: 17
                            },
                            end: {
                              line: 2,
                              column: 22
                            }
                          },
                          id: {
                            type: 'Identifier',
                            start: 29,
                            end: 30,
                            loc: {
                              start: {
                                line: 2,
                                column: 17
                              },
                              end: {
                                line: 2,
                                column: 18
                              }
                            },
                            name: 'i'
                          },
                          init: {
                            type: 'Literal',
                            start: 33,
                            end: 34,
                            loc: {
                              start: {
                                line: 2,
                                column: 21
                              },
                              end: {
                                line: 2,
                                column: 22
                              }
                            },
                            value: 0,
                            raw: '0'
                          }
                        }
                      ],
                      kind: 'let'
                    },
                    test: {
                      type: 'SequenceExpression',
                      start: 36,
                      end: 76,
                      loc: {
                        start: {
                          line: 2,
                          column: 24
                        },
                        end: {
                          line: 2,
                          column: 64
                        }
                      },
                      expressions: [
                        {
                          type: 'CallExpression',
                          start: 36,
                          end: 69,
                          loc: {
                            start: {
                              line: 2,
                              column: 24
                            },
                            end: {
                              line: 2,
                              column: 57
                            }
                          },
                          callee: {
                            type: 'MemberExpression',
                            start: 36,
                            end: 42,
                            loc: {
                              start: {
                                line: 2,
                                column: 24
                              },
                              end: {
                                line: 2,
                                column: 30
                              }
                            },
                            object: {
                              type: 'Identifier',
                              start: 36,
                              end: 37,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 24
                                },
                                end: {
                                  line: 2,
                                  column: 25
                                }
                              },
                              name: 'a'
                            },
                            property: {
                              type: 'Identifier',
                              start: 38,
                              end: 42,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 26
                                },
                                end: {
                                  line: 2,
                                  column: 30
                                }
                              },
                              name: 'push'
                            },
                            computed: false
                          },
                          arguments: [
                            {
                              type: 'FunctionExpression',
                              start: 43,
                              end: 68,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 31
                                },
                                end: {
                                  line: 2,
                                  column: 56
                                }
                              },
                              id: null,
                              generator: false,
                              expression: false,
                              async: false,
                              params: [],
                              body: {
                                type: 'BlockStatement',
                                start: 55,
                                end: 68,
                                loc: {
                                  start: {
                                    line: 2,
                                    column: 43
                                  },
                                  end: {
                                    line: 2,
                                    column: 56
                                  }
                                },
                                body: [
                                  {
                                    type: 'ReturnStatement',
                                    start: 57,
                                    end: 66,
                                    loc: {
                                      start: {
                                        line: 2,
                                        column: 45
                                      },
                                      end: {
                                        line: 2,
                                        column: 54
                                      }
                                    },
                                    argument: {
                                      type: 'Identifier',
                                      start: 64,
                                      end: 65,
                                      loc: {
                                        start: {
                                          line: 2,
                                          column: 52
                                        },
                                        end: {
                                          line: 2,
                                          column: 53
                                        }
                                      },
                                      name: 'i'
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        },
                        {
                          type: 'BinaryExpression',
                          start: 71,
                          end: 76,
                          loc: {
                            start: {
                              line: 2,
                              column: 59
                            },
                            end: {
                              line: 2,
                              column: 64
                            }
                          },
                          left: {
                            type: 'Identifier',
                            start: 71,
                            end: 72,
                            loc: {
                              start: {
                                line: 2,
                                column: 59
                              },
                              end: {
                                line: 2,
                                column: 60
                              }
                            },
                            name: 'i'
                          },
                          operator: '<',
                          right: {
                            type: 'Literal',
                            start: 75,
                            end: 76,
                            loc: {
                              start: {
                                line: 2,
                                column: 63
                              },
                              end: {
                                line: 2,
                                column: 64
                              }
                            },
                            value: 5,
                            raw: '5'
                          }
                        }
                      ]
                    },
                    update: {
                      type: 'UpdateExpression',
                      start: 78,
                      end: 81,
                      loc: {
                        start: {
                          line: 2,
                          column: 66
                        },
                        end: {
                          line: 2,
                          column: 69
                        }
                      },
                      operator: '++',
                      prefix: true,
                      argument: {
                        type: 'Identifier',
                        start: 80,
                        end: 81,
                        loc: {
                          start: {
                            line: 2,
                            column: 68
                          },
                          end: {
                            line: 2,
                            column: 69
                          }
                        },
                        name: 'i'
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      start: 83,
                      end: 86,
                      loc: {
                        start: {
                          line: 2,
                          column: 71
                        },
                        end: {
                          line: 2,
                          column: 74
                        }
                      },
                      body: []
                    }
                  },
                  {
                    type: 'ForStatement',
                    start: 95,
                    end: 125,
                    loc: {
                      start: {
                        line: 3,
                        column: 8
                      },
                      end: {
                        line: 3,
                        column: 38
                      }
                    },
                    init: {
                      type: 'VariableDeclaration',
                      start: 100,
                      end: 109,
                      loc: {
                        start: {
                          line: 3,
                          column: 13
                        },
                        end: {
                          line: 3,
                          column: 22
                        }
                      },
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          start: 104,
                          end: 109,
                          loc: {
                            start: {
                              line: 3,
                              column: 17
                            },
                            end: {
                              line: 3,
                              column: 22
                            }
                          },
                          id: {
                            type: 'Identifier',
                            start: 104,
                            end: 105,
                            loc: {
                              start: {
                                line: 3,
                                column: 17
                              },
                              end: {
                                line: 3,
                                column: 18
                              }
                            },
                            name: 'k'
                          },
                          init: {
                            type: 'Literal',
                            start: 108,
                            end: 109,
                            loc: {
                              start: {
                                line: 3,
                                column: 21
                              },
                              end: {
                                line: 3,
                                column: 22
                              }
                            },
                            value: 0,
                            raw: '0'
                          }
                        }
                      ],
                      kind: 'let'
                    },
                    test: {
                      type: 'BinaryExpression',
                      start: 111,
                      end: 116,
                      loc: {
                        start: {
                          line: 3,
                          column: 24
                        },
                        end: {
                          line: 3,
                          column: 29
                        }
                      },
                      left: {
                        type: 'Identifier',
                        start: 111,
                        end: 112,
                        loc: {
                          start: {
                            line: 3,
                            column: 24
                          },
                          end: {
                            line: 3,
                            column: 25
                          }
                        },
                        name: 'k'
                      },
                      operator: '<',
                      right: {
                        type: 'Literal',
                        start: 115,
                        end: 116,
                        loc: {
                          start: {
                            line: 3,
                            column: 28
                          },
                          end: {
                            line: 3,
                            column: 29
                          }
                        },
                        value: 5,
                        raw: '5'
                      }
                    },
                    update: {
                      type: 'UpdateExpression',
                      start: 118,
                      end: 121,
                      loc: {
                        start: {
                          line: 3,
                          column: 31
                        },
                        end: {
                          line: 3,
                          column: 34
                        }
                      },
                      operator: '++',
                      prefix: true,
                      argument: {
                        type: 'Identifier',
                        start: 120,
                        end: 121,
                        loc: {
                          start: {
                            line: 3,
                            column: 33
                          },
                          end: {
                            line: 3,
                            column: 34
                          }
                        },
                        name: 'k'
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      start: 123,
                      end: 125,
                      loc: {
                        start: {
                          line: 3,
                          column: 36
                        },
                        end: {
                          line: 3,
                          column: 38
                        }
                      },
                      body: []
                    }
                  }
                ],
                sourceType: 'script'
              }
        });
    });

    pass(`{ let x }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `{ let x }`,
      expected: {
          type: 'Program',
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
          body: [
            {
              type: 'BlockStatement',
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
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 2,
                  end: 7,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 7
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 6,
                      end: 7,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 7
                        }
                      },
                      id: {
                        type: 'Identifier',
                        start: 6,
                        end: 7,
                        loc: {
                          start: {
                            line: 1,
                            column: 6
                          },
                          end: {
                            line: 1,
                            column: 7
                          }
                        },
                        name: 'x'
                      },
                      init: null
                    }
                  ],
                  kind: 'let'
                }
              ]
            }
          ],
          sourceType: 'script'
        }
    });

    pass(`{ let x = 42 }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `{ let x = 42 }`,
      expected: {
          type: 'Program',
          start: 0,
          end: 14,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 14
            }
          },
          body: [
            {
              type: 'BlockStatement',
              start: 0,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 14
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 2,
                  end: 12,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 12
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 6,
                      end: 12,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 12
                        }
                      },
                      id: {
                        type: 'Identifier',
                        start: 6,
                        end: 7,
                        loc: {
                          start: {
                            line: 1,
                            column: 6
                          },
                          end: {
                            line: 1,
                            column: 7
                          }
                        },
                        name: 'x'
                      },
                      init: {
                        type: 'Literal',
                        start: 10,
                        end: 12,
                        loc: {
                          start: {
                            line: 1,
                            column: 10
                          },
                          end: {
                            line: 1,
                            column: 12
                          }
                        },
                        value: 42,
                        raw: '42'
                      }
                    }
                  ],
                  kind: 'let'
                }
              ]
            }
          ],
          sourceType: 'script'
        }
    });

    pass(`{ let x = 14, y = 3, z = 1977 }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `{ let x = 14, y = 3, z = 1977 }`,
      expected: {
          type: 'Program',
          start: 0,
          end: 31,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 31
            }
          },
          body: [
            {
              type: 'BlockStatement',
              start: 0,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 31
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 2,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 6,
                      end: 12,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 12
                        }
                      },
                      id: {
                        type: 'Identifier',
                        start: 6,
                        end: 7,
                        loc: {
                          start: {
                            line: 1,
                            column: 6
                          },
                          end: {
                            line: 1,
                            column: 7
                          }
                        },
                        name: 'x'
                      },
                      init: {
                        type: 'Literal',
                        start: 10,
                        end: 12,
                        loc: {
                          start: {
                            line: 1,
                            column: 10
                          },
                          end: {
                            line: 1,
                            column: 12
                          }
                        },
                        value: 14,
                        raw: '14'
                      }
                    },
                    {
                      type: 'VariableDeclarator',
                      start: 14,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 19
                        }
                      },
                      id: {
                        type: 'Identifier',
                        start: 14,
                        end: 15,
                        loc: {
                          start: {
                            line: 1,
                            column: 14
                          },
                          end: {
                            line: 1,
                            column: 15
                          }
                        },
                        name: 'y'
                      },
                      init: {
                        type: 'Literal',
                        start: 18,
                        end: 19,
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 19
                          }
                        },
                        value: 3,
                        raw: '3'
                      }
                    },
                    {
                      type: 'VariableDeclarator',
                      start: 21,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      },
                      id: {
                        type: 'Identifier',
                        start: 21,
                        end: 22,
                        loc: {
                          start: {
                            line: 1,
                            column: 21
                          },
                          end: {
                            line: 1,
                            column: 22
                          }
                        },
                        name: 'z'
                      },
                      init: {
                        type: 'Literal',
                        start: 25,
                        end: 29,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 29
                          }
                        },
                        value: 1977,
                        raw: '1977'
                      }
                    }
                  ],
                  kind: 'let'
                }
              ]
            }
          ],
          sourceType: 'script'
        }
    });

  });
