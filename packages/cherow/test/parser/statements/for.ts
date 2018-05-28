import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Statements - For', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

    const programs = [
        'for ((i in {}));',
        'for (i + 1 in {});',
        'for (+i in {});',
        'for (let [];;);',
        'for (let [a = 0];;);',
        'for (let a = 0, [];;);',
        'for (let [] = 0, [];;);',
        'for (let {};;);',
        'for (let {a = 0};;);',
        'for (let a = 0, {};;);',
        'for (let [] = 0, {};;);',
    ];

    for (const arg of programs) {
        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
    }

    fail('for(const x,y = 1; ; ) {}', Context.Empty, {
          source: 'for(const x,y = 1; ; ) {}',
      });

    fail('for (let [...x = []] = []; a < 1; ) {}', Context.Empty, {
          source: 'for (let [...x = []] = []; a < 1; ) {}',
      });

    fail('for (let [...{ x } = []] = []; a < 1; ) {}', Context.OptionsNext, {
          source: 'for (let [...{ x } = []] = []; a < 1; ) {}',
      });

    fail('for(;;){ a: continue a; }', Context.OptionsNext, {
        source: 'for(;;){ a: continue a; }',
      });

    fail('for (let [...{ x } = []] = []; a < 1; ) {}', Context.OptionsNext, {
          source: 'for (let [...{ x } = []] = []; a < 1; ) {}',
      });

    fail('for (var a in arr;1;){ break; }', Context.Empty, {
          source: 'for (var a in arr;1;){ break; }',
      });

    fail('for(index=0; index<10; index++; index--) ;', Context.Empty, {
          source: 'for(index=0; index<10; index++; index--) ;',
      });

    fail('for(var index=0; index<100; {index++; index*2;}) {	arr.add(""+index);};', Context.Empty, {
          source: 'for(var index=0; index<100; {index++; index*2;}) {	arr.add(""+index);};',
      });

    fail('for ( ; false; ) class C {}', Context.Empty, {
          source: 'for ( ; false; ) class C {}',
      });

    fail('for ( ; false; ) const x = null;', Context.Empty, {
          source: 'for ( ; false; ) const x = null;',
      });

    fail('for ( ; false; ) function f() {}', Context.Empty, {
          source: 'for ( ; false; ) function f() {}',
      });

    fail('for ( ; false; ) function* g() {}', Context.Empty, {
          source: 'for ( ; false; ) function* g() {}',
      });

    fail('for (const [...[ x ] = []] = []; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (const [...[ x ] = []] = []; iterCount < 1; ) {}',
      });

    fail('for (const [...x = []] = []; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (const [...x = []] = []; iterCount < 1; ) {}',
      });

    fail('for (const [...{ x } = []] = []; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (const [...{ x } = []] = []; iterCount < 1; ) {}',
      });

    fail('for (const [...[x], y] = [1, 2, 3]; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (const [...[x], y] = [1, 2, 3]; iterCount < 1; ) {}',
      });

    fail('for (const [...{ x }, y] = [1, 2, 3]; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (const [...{ x }, y] = [1, 2, 3]; iterCount < 1; ) {}',
      });

    fail('for (let [...[ x ] = []] = []; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (let [...[ x ] = []] = []; iterCount < 1; ) {}',
      });

    fail('for (let [...x = []] = []; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (let [...x = []] = []; iterCount < 1; ) {}',
      });

    fail('for (let [...{ x } = []] = []; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (let [...{ x } = []] = []; iterCount < 1; ) {}',
      });

    fail('for (let [...[x], y] = [1, 2, 3]; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (let [...[x], y] = [1, 2, 3]; iterCount < 1; ) {}',
      });

    fail('for (let [...x, y] = [1, 2, 3]; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (let [...x, y] = [1, 2, 3]; iterCount < 1; ) {}',
      });

    fail('for (let [...{ x }, y] = [1, 2, 3]; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (let [...{ x }, y] = [1, 2, 3]; iterCount < 1; ) {}',
      });

    fail('for (var [...[ x ] = []] = []; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (var [...[ x ] = []] = []; iterCount < 1; ) {}',
      });

    fail('for (const x; false; ) label1: label2: function f() {}', Context.Empty, {
          source: 'for (const x; false; ) label1: label2: function f() {}',
      });

    fail('for ( ; false; ) label1: label2: function f() {}', Context.Empty, {
          source: 'for ( ; false; ) label1: label2: function f() {}',
      });

    fail('for (var x; false; ) label1: label2: function f() {}', Context.Empty, {
          source: 'for (var x; false; ) label1: label2: function f() {}',
      });
  });

  describe('Pass', () => {

    const programs = [
        'for (j=x; j<10; ++j) { foo = j }',
        'for (j=x; j<10; ++j) { [foo] = [j] }',
        'for (j=x; j<10; ++j) { let foo = j }',
        'for (j=x; j<10; ++j) { function foo() {return j} }',
        'for ({j}=x; j<10; ++j) { var [foo] = [j] }',
        'for ({j}=x; j<10; ++j) { let foo = j }',
        'for ({j}=x; j<10; ++j) { const [foo] = [j] }',
        'for ({j}=x; j<10; ++j) { function foo() {return j} }',
        'for (var j=x; j<10; ++j) { foo = j }',
        'for (var {j}=x; j<10; ++j) { var [foo] = [j] }',
        'for (let {j}=x; j<10; ++j) { function foo(){return j} }',
        'for (let j=x; j<10; ++j) { const foo = j }',
        'for (let j=x; j<10; ++j) { let [foo] = [j] }',
        `let = 1;
        for ( let; ; )
          break;`,
        `for (; false; ) let // ASI
          {}`,
          `for (; false; ) let // ASI
          x = 1;`,
        // tests for possible destructuring regression
        'for (var {j}=x; j<10; ++j) { const foo = j }',
        `        for ("boolean" == typeof a && (l = a, a = arguments[s] ||
                {}, s++), "object" == typeof a ||
                g(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
        if (null != (e = arguments[s]))
            for (t in e) n = a[t], a !== (r = e[t]) && (l && r && (w.isPlainObject(r) ||
            (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n)
            ? n : [])
            : o = n && w.isPlainObject(n)
            ? n : {}, a[t] = w.extend(l, o, r))
            : void 0 !== r && (a[t] = r));`
    ];

    for (const arg of programs) {
        it(`${arg}`, () => {
            t.doesNotThrow(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
    }

    pass(`for(x, y;;);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(x, y;;);`,
          expected: {
              type: 'Program',
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
              body: [{
                  type: 'ForStatement',
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
                  init: {
                      type: 'SequenceExpression',
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
                      expressions: [{
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
                          {
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
                              name: 'y'
                          }
                      ]
                  },
                  test: null,
                  update: null,
                  body: {
                      type: 'EmptyStatement',
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
                      }
                  }
              }],
              sourceType: 'script'
          }
      });
    pass(`for(x = 0;;);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(x = 0;;);`,
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
                  type: 'ForStatement',
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
                  init: {
                      type: 'AssignmentExpression',
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
                      operator: '=',
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
                          name: 'x'
                      },
                      right: {
                          type: 'Literal',
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
                          value: 0,
                          raw: '0'
                      }
                  },
                  test: null,
                  update: null,
                  body: {
                      type: 'EmptyStatement',
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
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for(x; x < 0;);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(x; x < 0;);`,
          expected: {
              type: 'Program',
              start: 0,
              end: 15,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 15
                  }
              },
              body: [{
                  type: 'ForStatement',
                  start: 0,
                  end: 15,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 15
                      }
                  },
                  init: {
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
                  test: {
                      type: 'BinaryExpression',
                      start: 7,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 7
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      left: {
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
                      operator: '<',
                      right: {
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
                          value: 0,
                          raw: '0'
                      }
                  },
                  update: null,
                  body: {
                      type: 'EmptyStatement',
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
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for(x; x < 0; x++);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(x; x < 0; x++);`,
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
                  type: 'ForStatement',
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
                  init: {
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
                  test: {
                      type: 'BinaryExpression',
                      start: 7,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 7
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      left: {
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
                      operator: '<',
                      right: {
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
                          value: 0,
                          raw: '0'
                      }
                  },
                  update: {
                      type: 'UpdateExpression',
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
                      operator: '++',
                      prefix: false,
                      argument: {
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
                          name: 'x'
                      }
                  },
                  body: {
                      type: 'EmptyStatement',
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
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for(x; x < 0; x++) process(x);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(x; x < 0; x++) process(x);`,
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
                  type: 'ForStatement',
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
                  init: {
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
                  test: {
                      type: 'BinaryExpression',
                      start: 7,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 7
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      left: {
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
                      operator: '<',
                      right: {
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
                          value: 0,
                          raw: '0'
                      }
                  },
                  update: {
                      type: 'UpdateExpression',
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
                      operator: '++',
                      prefix: false,
                      argument: {
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
                          name: 'x'
                      }
                  },
                  body: {
                      type: 'ExpressionStatement',
                      start: 19,
                      end: 30,
                      loc: {
                          start: {
                              line: 1,
                              column: 19
                          },
                          end: {
                              line: 1,
                              column: 30
                          }
                      },
                      expression: {
                          type: 'CallExpression',
                          start: 19,
                          end: 29,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 19
                              },
                              end: {
                                  line: 1,
                                  column: 29
                              }
                          },
                          callee: {
                              type: 'Identifier',
                              start: 19,
                              end: 26,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 19
                                  },
                                  end: {
                                      line: 1,
                                      column: 26
                                  }
                              },
                              name: 'process'
                          },
                          arguments: [{
                              type: 'Identifier',
                              start: 27,
                              end: 28,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 27
                                  },
                                  end: {
                                      line: 1,
                                      column: 28
                                  }
                              },
                              name: 'x'
                          }]
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for(a;b;c);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(a;b;c);`,
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
                  type: 'ForStatement',
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
                  init: {
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
                  test: {
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
                      name: 'b'
                  },
                  update: {
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
                      name: 'c'
                  },
                  body: {
                      type: 'EmptyStatement',
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
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for(;b;c);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(;b;c);`,
          expected: {
              type: 'Program',
              start: 0,
              end: 10,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 10
                  }
              },
              body: [{
                  type: 'ForStatement',
                  start: 0,
                  end: 10,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 10
                      }
                  },
                  init: null,
                  test: {
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
                      name: 'b'
                  },
                  update: {
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
                      name: 'c'
                  },
                  body: {
                      type: 'EmptyStatement',
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
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for(var x = 0;;)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(var x = 0;;);`,
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
              body: [{
                  type: 'ForStatement',
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
                  init: {
                      type: 'VariableDeclaration',
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
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 8,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          id: {
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
                          },
                          init: {
                              type: 'Literal',
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
                              value: 0,
                              raw: '0'
                          }
                      }],
                      kind: 'var'
                  },
                  test: null,
                  update: null,
                  body: {
                      type: 'EmptyStatement',
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
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for(let x = 0;;);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(let x = 0;;);`,
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
              body: [{
                  type: 'ForStatement',
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
                  init: {
                      type: 'VariableDeclaration',
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
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 8,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          id: {
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
                          },
                          init: {
                              type: 'Literal',
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
                              value: 0,
                              raw: '0'
                          }
                      }],
                      kind: 'let'
                  },
                  test: null,
                  update: null,
                  body: {
                      type: 'EmptyStatement',
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
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for(var x = 0, y = 1;;);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(var x = 0, y = 1;;);`,
          expected: {
              type: 'Program',
              start: 0,
              end: 24,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 24
                  }
              },
              body: [{
                  type: 'ForStatement',
                  start: 0,
                  end: 24,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 24
                      }
                  },
                  init: {
                      type: 'VariableDeclaration',
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
                      declarations: [{
                              type: 'VariableDeclarator',
                              start: 8,
                              end: 13,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 8
                                  },
                                  end: {
                                      line: 1,
                                      column: 13
                                  }
                              },
                              id: {
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
                              },
                              init: {
                                  type: 'Literal',
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
                                  value: 0,
                                  raw: '0'
                              }
                          },
                          {
                              type: 'VariableDeclarator',
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
                              id: {
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
                                  name: 'y'
                              },
                              init: {
                                  type: 'Literal',
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
                                  value: 1,
                                  raw: '1'
                              }
                          }
                      ],
                      kind: 'var'
                  },
                  test: null,
                  update: null,
                  body: {
                      type: 'EmptyStatement',
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
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for(var a;b;c);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(var a;b;c);`,
          expected: {
              type: 'Program',
              start: 0,
              end: 15,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 15
                  }
              },
              body: [{
                  type: 'ForStatement',
                  start: 0,
                  end: 15,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 15
                      }
                  },
                  init: {
                      type: 'VariableDeclaration',
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
                      declarations: [{
                          type: 'VariableDeclarator',
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
                          id: {
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
                              name: 'a'
                          },
                          init: null
                      }],
                      kind: 'var'
                  },
                  test: {
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
                      name: 'b'
                  },
                  update: {
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
                      name: 'c'
                  },
                  body: {
                      type: 'EmptyStatement',
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
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for(var a = 0;b;c);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(var a = 0;b;c);`,
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
                  type: 'ForStatement',
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
                  init: {
                      type: 'VariableDeclaration',
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
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 8,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          id: {
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
                              name: 'a'
                          },
                          init: {
                              type: 'Literal',
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
                              value: 0,
                              raw: '0'
                          }
                      }],
                      kind: 'var'
                  },
                  test: {
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
                      name: 'b'
                  },
                  update: {
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
                      name: 'c'
                  },
                  body: {
                      type: 'EmptyStatement',
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
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for(var a = 0;;) { let a; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(var a = 0;;) { let a; }`,
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
                  type: 'ForStatement',
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
                  init: {
                      type: 'VariableDeclaration',
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
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 8,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          id: {
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
                              name: 'a'
                          },
                          init: {
                              type: 'Literal',
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
                              value: 0,
                              raw: '0'
                          }
                      }],
                      kind: 'var'
                  },
                  test: null,
                  update: null,
                  body: {
                      type: 'BlockStatement',
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
                      body: [{
                          type: 'VariableDeclaration',
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
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
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
                                  name: 'a'
                              },
                              init: null
                          }],
                          kind: 'let'
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for (var { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: undefined }; a < 1; ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (var { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: undefined }; a < 1; ) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 82,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 82
                  }
              },
              body: [{
                  type: 'ForStatement',
                  start: 0,
                  end: 82,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 82
                      }
                  },
                  init: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 69,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 69
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 9,
                          end: 69,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 69
                              }
                          },
                          id: {
                              type: 'ObjectPattern',
                              start: 9,
                              end: 50,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 50
                                  }
                              },
                              properties: [{
                                  type: 'Property',
                                  start: 11,
                                  end: 48,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 11
                                      },
                                      end: {
                                          line: 1,
                                          column: 48
                                      }
                                  },
                                  method: false,
                                  shorthand: false,
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
                                      name: 'w'
                                  },
                                  value: {
                                      type: 'AssignmentPattern',
                                      start: 14,
                                      end: 48,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 14
                                          },
                                          end: {
                                              line: 1,
                                              column: 48
                                          }
                                      },
                                      left: {
                                          type: 'ObjectPattern',
                                          start: 14,
                                          end: 25,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 14
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 25
                                              }
                                          },
                                          properties: [{
                                                  type: 'Property',
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
                                                  method: false,
                                                  shorthand: true,
                                                  computed: false,
                                                  key: {
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
                                                      name: 'x'
                                                  },
                                                  kind: 'init',
                                                  value: {
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
                                                      name: 'x'
                                                  }
                                              },
                                              {
                                                  type: 'Property',
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
                                                  method: false,
                                                  shorthand: true,
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
                                                  kind: 'init',
                                                  value: {
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
                                                  }
                                              },
                                              {
                                                  type: 'Property',
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
                                                  method: false,
                                                  shorthand: true,
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
                                                      name: 'z'
                                                  },
                                                  kind: 'init',
                                                  value: {
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
                                                      name: 'z'
                                                  }
                                              }
                                          ]
                                      },
                                      right: {
                                          type: 'ObjectExpression',
                                          start: 28,
                                          end: 48,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 28
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 48
                                              }
                                          },
                                          properties: [{
                                                  type: 'Property',
                                                  start: 30,
                                                  end: 34,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 30
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 34
                                                      }
                                                  },
                                                  method: false,
                                                  shorthand: false,
                                                  computed: false,
                                                  key: {
                                                      type: 'Identifier',
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
                                                      name: 'x'
                                                  },
                                                  value: {
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
                                                      value: 4,
                                                      raw: '4'
                                                  },
                                                  kind: 'init'
                                              },
                                              {
                                                  type: 'Property',
                                                  start: 36,
                                                  end: 40,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 36
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
                                                      name: 'y'
                                                  },
                                                  value: {
                                                      type: 'Literal',
                                                      start: 39,
                                                      end: 40,
                                                      loc: {
                                                          start: {
                                                              line: 1,
                                                              column: 39
                                                          },
                                                          end: {
                                                              line: 1,
                                                              column: 40
                                                          }
                                                      },
                                                      value: 5,
                                                      raw: '5'
                                                  },
                                                  kind: 'init'
                                              },
                                              {
                                                  type: 'Property',
                                                  start: 42,
                                                  end: 46,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 42
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 46
                                                      }
                                                  },
                                                  method: false,
                                                  shorthand: false,
                                                  computed: false,
                                                  key: {
                                                      type: 'Identifier',
                                                      start: 42,
                                                      end: 43,
                                                      loc: {
                                                          start: {
                                                              line: 1,
                                                              column: 42
                                                          },
                                                          end: {
                                                              line: 1,
                                                              column: 43
                                                          }
                                                      },
                                                      name: 'z'
                                                  },
                                                  value: {
                                                      type: 'Literal',
                                                      start: 45,
                                                      end: 46,
                                                      loc: {
                                                          start: {
                                                              line: 1,
                                                              column: 45
                                                          },
                                                          end: {
                                                              line: 1,
                                                              column: 46
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
                              start: 53,
                              end: 69,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 53
                                  },
                                  end: {
                                      line: 1,
                                      column: 69
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
                                      name: 'w'
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
                              }]
                          }
                      }],
                      kind: 'var'
                  },
                  test: {
                      type: 'BinaryExpression',
                      start: 71,
                      end: 76,
                      loc: {
                          start: {
                              line: 1,
                              column: 71
                          },
                          end: {
                              line: 1,
                              column: 76
                          }
                      },
                      left: {
                          type: 'Identifier',
                          start: 71,
                          end: 72,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 71
                              },
                              end: {
                                  line: 1,
                                  column: 72
                              }
                          },
                          name: 'a'
                      },
                      operator: '<',
                      right: {
                          type: 'Literal',
                          start: 75,
                          end: 76,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 75
                              },
                              end: {
                                  line: 1,
                                  column: 76
                              }
                          },
                          value: 1,
                          raw: '1'
                      }
                  },
                  update: null,
                  body: {
                      type: 'BlockStatement',
                      start: 80,
                      end: 82,
                      loc: {
                          start: {
                              line: 1,
                              column: 80
                          },
                          end: {
                              line: 1,
                              column: 82
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for (var { w: [x, y, z] = [4, 5, 6] } = {}; foo < 1; ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (var { w: [x, y, z] = [4, 5, 6] } = {}; foo < 1; ) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 57,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 57
                  }
              },
              body: [{
                  type: 'ForStatement',
                  start: 0,
                  end: 57,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 57
                      }
                  },
                  init: {
                      type: 'VariableDeclaration',
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
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 9,
                          end: 42,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 42
                              }
                          },
                          id: {
                              type: 'ObjectPattern',
                              start: 9,
                              end: 37,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 37
                                  }
                              },
                              properties: [{
                                  type: 'Property',
                                  start: 11,
                                  end: 35,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 11
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
                                      name: 'w'
                                  },
                                  value: {
                                      type: 'AssignmentPattern',
                                      start: 14,
                                      end: 35,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 14
                                          },
                                          end: {
                                              line: 1,
                                              column: 35
                                          }
                                      },
                                      left: {
                                          type: 'ArrayPattern',
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
                                          elements: [{
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
                                              {
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
                                                  name: 'y'
                                              },
                                              {
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
                                              }
                                          ]
                                      },
                                      right: {
                                          type: 'ArrayExpression',
                                          start: 26,
                                          end: 35,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 26
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 35
                                              }
                                          },
                                          elements: [{
                                                  type: 'Literal',
                                                  start: 27,
                                                  end: 28,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 27
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 28
                                                      }
                                                  },
                                                  value: 4,
                                                  raw: '4'
                                              },
                                              {
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
                                                  value: 5,
                                                  raw: '5'
                                              },
                                              {
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
                              start: 40,
                              end: 42,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 40
                                  },
                                  end: {
                                      line: 1,
                                      column: 42
                                  }
                              },
                              properties: []
                          }
                      }],
                      kind: 'var'
                  },
                  test: {
                      type: 'BinaryExpression',
                      start: 44,
                      end: 51,
                      loc: {
                          start: {
                              line: 1,
                              column: 44
                          },
                          end: {
                              line: 1,
                              column: 51
                          }
                      },
                      left: {
                          type: 'Identifier',
                          start: 44,
                          end: 47,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 44
                              },
                              end: {
                                  line: 1,
                                  column: 47
                              }
                          },
                          name: 'foo'
                      },
                      operator: '<',
                      right: {
                          type: 'Literal',
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
                          value: 1,
                          raw: '1'
                      }
                  },
                  update: null,
                  body: {
                      type: 'BlockStatement',
                      start: 55,
                      end: 57,
                      loc: {
                          start: {
                              line: 1,
                              column: 55
                          },
                          end: {
                              line: 1,
                              column: 57
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for (var { cover = (function () {}), xCover = (0, function() {})  } = {}; a < 1; ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (var { cover = (function () {}), xCover = (0, function() {})  } = {}; a < 1; ) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 85,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 85
                  }
              },
              body: [{
                  type: 'ForStatement',
                  start: 0,
                  end: 85,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 85
                      }
                  },
                  init: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 72,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 72
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 9,
                          end: 72,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 72
                              }
                          },
                          id: {
                              type: 'ObjectPattern',
                              start: 9,
                              end: 67,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 67
                                  }
                              },
                              properties: [{
                                      type: 'Property',
                                      start: 11,
                                      end: 35,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 11
                                          },
                                          end: {
                                              line: 1,
                                              column: 35
                                          }
                                      },
                                      method: false,
                                      shorthand: true,
                                      computed: false,
                                      key: {
                                          type: 'Identifier',
                                          start: 11,
                                          end: 16,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 11
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 16
                                              }
                                          },
                                          name: 'cover'
                                      },
                                      kind: 'init',
                                      value: {
                                          type: 'AssignmentPattern',
                                          start: 11,
                                          end: 35,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 11
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 35
                                              }
                                          },
                                          left: {
                                              type: 'Identifier',
                                              start: 11,
                                              end: 16,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 11
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 16
                                                  }
                                              },
                                              name: 'cover'
                                          },
                                          right: {
                                              type: 'FunctionExpression',
                                              start: 20,
                                              end: 34,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 20
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 34
                                                  }
                                              },
                                              id: null,
                                              generator: false,
                                              expression: false,
                                              async: false,
                                              params: [],
                                              body: {
                                                  type: 'BlockStatement',
                                                  start: 32,
                                                  end: 34,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 32
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 34
                                                      }
                                                  },
                                                  body: []
                                              }
                                          }
                                      }
                                  },
                                  {
                                      type: 'Property',
                                      start: 37,
                                      end: 64,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 37
                                          },
                                          end: {
                                              line: 1,
                                              column: 64
                                          }
                                      },
                                      method: false,
                                      shorthand: true,
                                      computed: false,
                                      key: {
                                          type: 'Identifier',
                                          start: 37,
                                          end: 43,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 37
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 43
                                              }
                                          },
                                          name: 'xCover'
                                      },
                                      kind: 'init',
                                      value: {
                                          type: 'AssignmentPattern',
                                          start: 37,
                                          end: 64,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 37
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 64
                                              }
                                          },
                                          left: {
                                              type: 'Identifier',
                                              start: 37,
                                              end: 43,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 37
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 43
                                                  }
                                              },
                                              name: 'xCover'
                                          },
                                          right: {
                                              type: 'SequenceExpression',
                                              start: 47,
                                              end: 63,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 47
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 63
                                                  }
                                              },
                                              expressions: [{
                                                      type: 'Literal',
                                                      start: 47,
                                                      end: 48,
                                                      loc: {
                                                          start: {
                                                              line: 1,
                                                              column: 47
                                                          },
                                                          end: {
                                                              line: 1,
                                                              column: 48
                                                          }
                                                      },
                                                      value: 0,
                                                      raw: '0'
                                                  },
                                                  {
                                                      type: 'FunctionExpression',
                                                      start: 50,
                                                      end: 63,
                                                      loc: {
                                                          start: {
                                                              line: 1,
                                                              column: 50
                                                          },
                                                          end: {
                                                              line: 1,
                                                              column: 63
                                                          }
                                                      },
                                                      id: null,
                                                      generator: false,
                                                      expression: false,
                                                      async: false,
                                                      params: [],
                                                      body: {
                                                          type: 'BlockStatement',
                                                          start: 61,
                                                          end: 63,
                                                          loc: {
                                                              start: {
                                                                  line: 1,
                                                                  column: 61
                                                              },
                                                              end: {
                                                                  line: 1,
                                                                  column: 63
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
                              start: 70,
                              end: 72,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 70
                                  },
                                  end: {
                                      line: 1,
                                      column: 72
                                  }
                              },
                              properties: []
                          }
                      }],
                      kind: 'var'
                  },
                  test: {
                      type: 'BinaryExpression',
                      start: 74,
                      end: 79,
                      loc: {
                          start: {
                              line: 1,
                              column: 74
                          },
                          end: {
                              line: 1,
                              column: 79
                          }
                      },
                      left: {
                          type: 'Identifier',
                          start: 74,
                          end: 75,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 74
                              },
                              end: {
                                  line: 1,
                                  column: 75
                              }
                          },
                          name: 'a'
                      },
                      operator: '<',
                      right: {
                          type: 'Literal',
                          start: 78,
                          end: 79,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 78
                              },
                              end: {
                                  line: 1,
                                  column: 79
                              }
                          },
                          value: 1,
                          raw: '1'
                      }
                  },
                  update: null,
                  body: {
                      type: 'BlockStatement',
                      start: 83,
                      end: 85,
                      loc: {
                          start: {
                              line: 1,
                              column: 83
                          },
                          end: {
                              line: 1,
                              column: 85
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for (var [x] = []; a < 1; ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (var [x] = []; a < 1; ) {}`,
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
                  type: 'ForStatement',
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
                  init: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 9,
                          end: 17,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 17
                              }
                          },
                          id: {
                              type: 'ArrayPattern',
                              start: 9,
                              end: 12,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 12
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
                              }]
                          },
                          init: {
                              type: 'ArrayExpression',
                              start: 15,
                              end: 17,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 15
                                  },
                                  end: {
                                      line: 1,
                                      column: 17
                                  }
                              },
                              elements: []
                          }
                      }],
                      kind: 'var'
                  },
                  test: {
                      type: 'BinaryExpression',
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
                          name: 'a'
                      },
                      operator: '<',
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
                  },
                  update: null,
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
              }],
              sourceType: 'script'
          }
      });

    pass(`for (var [x = 23] = [,]; t < 1; ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (var [x = 23] = [,]; t < 1; ) {}`,
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
              body: [{
                  type: 'ForStatement',
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
                  init: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 23,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 23
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
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
                          id: {
                              type: 'ArrayPattern',
                              start: 9,
                              end: 17,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 17
                                  }
                              },
                              elements: [{
                                  type: 'AssignmentPattern',
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
                                      name: 'x'
                                  },
                                  right: {
                                      type: 'Literal',
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
                                      value: 23,
                                      raw: '23'
                                  }
                              }]
                          },
                          init: {
                              type: 'ArrayExpression',
                              start: 20,
                              end: 23,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 20
                                  },
                                  end: {
                                      line: 1,
                                      column: 23
                                  }
                              },
                              elements: [
                                  null
                              ]
                          }
                      }],
                      kind: 'var'
                  },
                  test: {
                      type: 'BinaryExpression',
                      start: 25,
                      end: 30,
                      loc: {
                          start: {
                              line: 1,
                              column: 25
                          },
                          end: {
                              line: 1,
                              column: 30
                          }
                      },
                      left: {
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
                          name: 't'
                      },
                      operator: '<',
                      right: {
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
                          value: 1,
                          raw: '1'
                      }
                  },
                  update: null,
                  body: {
                      type: 'BlockStatement',
                      start: 34,
                      end: 36,
                      loc: {
                          start: {
                              line: 1,
                              column: 34
                          },
                          end: {
                              line: 1,
                              column: 36
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for (var [[] = function() { a += 1; }()] = [[23]]; b < 1; ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (var [[] = function() { a += 1; }()] = [[23]]; b < 1; ) {}`,
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
                  type: 'ForStatement',
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
                  init: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 49,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 49
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 9,
                          end: 49,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 49
                              }
                          },
                          id: {
                              type: 'ArrayPattern',
                              start: 9,
                              end: 40,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 40
                                  }
                              },
                              elements: [{
                                  type: 'AssignmentPattern',
                                  start: 10,
                                  end: 39,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 10
                                      },
                                      end: {
                                          line: 1,
                                          column: 39
                                      }
                                  },
                                  left: {
                                      type: 'ArrayPattern',
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
                                      elements: []
                                  },
                                  right: {
                                      type: 'CallExpression',
                                      start: 15,
                                      end: 39,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 15
                                          },
                                          end: {
                                              line: 1,
                                              column: 39
                                          }
                                      },
                                      callee: {
                                          type: 'FunctionExpression',
                                          start: 15,
                                          end: 37,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 15
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 37
                                              }
                                          },
                                          id: null,
                                          generator: false,
                                          expression: false,
                                          async: false,
                                          params: [],
                                          body: {
                                              type: 'BlockStatement',
                                              start: 26,
                                              end: 37,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 26
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 37
                                                  }
                                              },
                                              body: [{
                                                  type: 'ExpressionStatement',
                                                  start: 28,
                                                  end: 35,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 28
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 35
                                                      }
                                                  },
                                                  expression: {
                                                      type: 'AssignmentExpression',
                                                      start: 28,
                                                      end: 34,
                                                      loc: {
                                                          start: {
                                                              line: 1,
                                                              column: 28
                                                          },
                                                          end: {
                                                              line: 1,
                                                              column: 34
                                                          }
                                                      },
                                                      operator: '+=',
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
                                                          name: 'a'
                                                      },
                                                      right: {
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
                                              }]
                                          }
                                      },
                                      arguments: []
                                  }
                              }]
                          },
                          init: {
                              type: 'ArrayExpression',
                              start: 43,
                              end: 49,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 43
                                  },
                                  end: {
                                      line: 1,
                                      column: 49
                                  }
                              },
                              elements: [{
                                  type: 'ArrayExpression',
                                  start: 44,
                                  end: 48,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 44
                                      },
                                      end: {
                                          line: 1,
                                          column: 48
                                      }
                                  },
                                  elements: [{
                                      type: 'Literal',
                                      start: 45,
                                      end: 47,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 45
                                          },
                                          end: {
                                              line: 1,
                                              column: 47
                                          }
                                      },
                                      value: 23,
                                      raw: '23'
                                  }]
                              }]
                          }
                      }],
                      kind: 'var'
                  },
                  test: {
                      type: 'BinaryExpression',
                      start: 51,
                      end: 56,
                      loc: {
                          start: {
                              line: 1,
                              column: 51
                          },
                          end: {
                              line: 1,
                              column: 56
                          }
                      },
                      left: {
                          type: 'Identifier',
                          start: 51,
                          end: 52,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 51
                              },
                              end: {
                                  line: 1,
                                  column: 52
                              }
                          },
                          name: 'b'
                      },
                      operator: '<',
                      right: {
                          type: 'Literal',
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
                          value: 1,
                          raw: '1'
                      }
                  },
                  update: null,
                  body: {
                      type: 'BlockStatement',
                      start: 60,
                      end: 62,
                      loc: {
                          start: {
                              line: 1,
                              column: 60
                          },
                          end: {
                              line: 1,
                              column: 62
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for (let { w = a(), x = b(), y = c(), z = d() } = { w: null, x: 0, y: false, z: '' }; e < 1; ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (let { w = a(), x = b(), y = c(), z = d() } = { w: null, x: 0, y: false, z: '' }; e < 1; ) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 97,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 97
                  }
              },
              body: [{
                  type: 'ForStatement',
                  start: 0,
                  end: 97,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 97
                      }
                  },
                  init: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 84,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 84
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 9,
                          end: 84,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 84
                              }
                          },
                          id: {
                              type: 'ObjectPattern',
                              start: 9,
                              end: 47,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 47
                                  }
                              },
                              properties: [{
                                      type: 'Property',
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
                                          name: 'w'
                                      },
                                      kind: 'init',
                                      value: {
                                          type: 'AssignmentPattern',
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
                                          },
                                          left: {
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
                                              name: 'w'
                                          },
                                          right: {
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
                                                  name: 'a'
                                              },
                                              arguments: []
                                          }
                                      }
                                  },
                                  {
                                      type: 'Property',
                                      start: 20,
                                      end: 27,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 20
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
                                          name: 'x'
                                      },
                                      kind: 'init',
                                      value: {
                                          type: 'AssignmentPattern',
                                          start: 20,
                                          end: 27,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 20
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 27
                                              }
                                          },
                                          left: {
                                              type: 'Identifier',
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
                                              name: 'x'
                                          },
                                          right: {
                                              type: 'CallExpression',
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
                                              callee: {
                                                  type: 'Identifier',
                                                  start: 24,
                                                  end: 25,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 24
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 25
                                                      }
                                                  },
                                                  name: 'b'
                                              },
                                              arguments: []
                                          }
                                      }
                                  },
                                  {
                                      type: 'Property',
                                      start: 29,
                                      end: 36,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 29
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
                                      kind: 'init',
                                      value: {
                                          type: 'AssignmentPattern',
                                          start: 29,
                                          end: 36,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 29
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 36
                                              }
                                          },
                                          left: {
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
                                          right: {
                                              type: 'CallExpression',
                                              start: 33,
                                              end: 36,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 33
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 36
                                                  }
                                              },
                                              callee: {
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
                                                  name: 'c'
                                              },
                                              arguments: []
                                          }
                                      }
                                  },
                                  {
                                      type: 'Property',
                                      start: 38,
                                      end: 45,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 38
                                          },
                                          end: {
                                              line: 1,
                                              column: 45
                                          }
                                      },
                                      method: false,
                                      shorthand: true,
                                      computed: false,
                                      key: {
                                          type: 'Identifier',
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
                                          name: 'z'
                                      },
                                      kind: 'init',
                                      value: {
                                          type: 'AssignmentPattern',
                                          start: 38,
                                          end: 45,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 38
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 45
                                              }
                                          },
                                          left: {
                                              type: 'Identifier',
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
                                              name: 'z'
                                          },
                                          right: {
                                              type: 'CallExpression',
                                              start: 42,
                                              end: 45,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 42
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 45
                                                  }
                                              },
                                              callee: {
                                                  type: 'Identifier',
                                                  start: 42,
                                                  end: 43,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 42
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 43
                                                      }
                                                  },
                                                  name: 'd'
                                              },
                                              arguments: []
                                          }
                                      }
                                  }
                              ]
                          },
                          init: {
                              type: 'ObjectExpression',
                              start: 50,
                              end: 84,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 50
                                  },
                                  end: {
                                      line: 1,
                                      column: 84
                                  }
                              },
                              properties: [{
                                      type: 'Property',
                                      start: 52,
                                      end: 59,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 52
                                          },
                                          end: {
                                              line: 1,
                                              column: 59
                                          }
                                      },
                                      method: false,
                                      shorthand: false,
                                      computed: false,
                                      key: {
                                          type: 'Identifier',
                                          start: 52,
                                          end: 53,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 52
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 53
                                              }
                                          },
                                          name: 'w'
                                      },
                                      value: {
                                          type: 'Literal',
                                          start: 55,
                                          end: 59,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 55
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 59
                                              }
                                          },
                                          value: null,
                                          raw: 'null'
                                      },
                                      kind: 'init'
                                  },
                                  {
                                      type: 'Property',
                                      start: 61,
                                      end: 65,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 61
                                          },
                                          end: {
                                              line: 1,
                                              column: 65
                                          }
                                      },
                                      method: false,
                                      shorthand: false,
                                      computed: false,
                                      key: {
                                          type: 'Identifier',
                                          start: 61,
                                          end: 62,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 61
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 62
                                              }
                                          },
                                          name: 'x'
                                      },
                                      value: {
                                          type: 'Literal',
                                          start: 64,
                                          end: 65,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 64
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 65
                                              }
                                          },
                                          value: 0,
                                          raw: '0'
                                      },
                                      kind: 'init'
                                  },
                                  {
                                      type: 'Property',
                                      start: 67,
                                      end: 75,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 67
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
                                          start: 67,
                                          end: 68,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 67
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 68
                                              }
                                          },
                                          name: 'y'
                                      },
                                      value: {
                                          type: 'Literal',
                                          start: 70,
                                          end: 75,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 70
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 75
                                              }
                                          },
                                          value: false,
                                          raw: 'false'
                                      },
                                      kind: 'init'
                                  },
                                  {
                                      type: 'Property',
                                      start: 77,
                                      end: 82,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 77
                                          },
                                          end: {
                                              line: 1,
                                              column: 82
                                          }
                                      },
                                      method: false,
                                      shorthand: false,
                                      computed: false,
                                      key: {
                                          type: 'Identifier',
                                          start: 77,
                                          end: 78,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 77
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 78
                                              }
                                          },
                                          name: 'z'
                                      },
                                      value: {
                                          type: 'Literal',
                                          start: 80,
                                          end: 82,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 80
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 82
                                              }
                                          },
                                          value: '',
                                          raw: '\'\''
                                      },
                                      kind: 'init'
                                  }
                              ]
                          }
                      }],
                      kind: 'let'
                  },
                  test: {
                      type: 'BinaryExpression',
                      start: 86,
                      end: 91,
                      loc: {
                          start: {
                              line: 1,
                              column: 86
                          },
                          end: {
                              line: 1,
                              column: 91
                          }
                      },
                      left: {
                          type: 'Identifier',
                          start: 86,
                          end: 87,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 86
                              },
                              end: {
                                  line: 1,
                                  column: 87
                              }
                          },
                          name: 'e'
                      },
                      operator: '<',
                      right: {
                          type: 'Literal',
                          start: 90,
                          end: 91,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 90
                              },
                              end: {
                                  line: 1,
                                  column: 91
                              }
                          },
                          value: 1,
                          raw: '1'
                      }
                  },
                  update: null,
                  body: {
                      type: 'BlockStatement',
                      start: 95,
                      end: 97,
                      loc: {
                          start: {
                              line: 1,
                              column: 95
                          },
                          end: {
                              line: 1,
                              column: 97
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for (let [,] = a(); b < 1; ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (let [,] = a(); b < 1; ) {}`,
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
              body: [{
                  type: 'ForStatement',
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
                  init: {
                      type: 'VariableDeclaration',
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
                      declarations: [{
                          type: 'VariableDeclarator',
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
                          id: {
                              type: 'ArrayPattern',
                              start: 9,
                              end: 12,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 12
                                  }
                              },
                              elements: [
                                  null
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
                                  name: 'a'
                              },
                              arguments: []
                          }
                      }],
                      kind: 'let'
                  },
                  test: {
                      type: 'BinaryExpression',
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
                      left: {
                          type: 'Identifier',
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
                          name: 'b'
                      },
                      operator: '<',
                      right: {
                          type: 'Literal',
                          start: 24,
                          end: 25,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 24
                              },
                              end: {
                                  line: 1,
                                  column: 25
                              }
                          },
                          value: 1,
                          raw: '1'
                      }
                  },
                  update: null,
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
              }],
              sourceType: 'script'
          }
      });

    pass(`for (let [x, y, z] = [1, 2, 3]; a < 1; ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (let [x, y, z] = [1, 2, 3]; a < 1; ) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 43,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 43
                  }
              },
              body: [{
                  type: 'ForStatement',
                  start: 0,
                  end: 43,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 43
                      }
                  },
                  init: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 30,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 30
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
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
                          id: {
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
                          init: {
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
                                      value: 1,
                                      raw: '1'
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
                                      value: 2,
                                      raw: '2'
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
                                      value: 3,
                                      raw: '3'
                                  }
                              ]
                          }
                      }],
                      kind: 'let'
                  },
                  test: {
                      type: 'BinaryExpression',
                      start: 32,
                      end: 37,
                      loc: {
                          start: {
                              line: 1,
                              column: 32
                          },
                          end: {
                              line: 1,
                              column: 37
                          }
                      },
                      left: {
                          type: 'Identifier',
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
                          name: 'a'
                      },
                      operator: '<',
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
                  },
                  update: null,
                  body: {
                      type: 'BlockStatement',
                      start: 41,
                      end: 43,
                      loc: {
                          start: {
                              line: 1,
                              column: 41
                          },
                          end: {
                              line: 1,
                              column: 43
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for (const { x, } = { x: 23 }; a < 1; ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (const { x, } = { x: 23 }; a < 1; ) {};`,
          expected: {
              type: 'Program',
              start: 0,
              end: 43,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 43
                  }
              },
              body: [{
                      type: 'ForStatement',
                      start: 0,
                      end: 42,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 42
                          }
                      },
                      init: {
                          type: 'VariableDeclaration',
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
                          declarations: [{
                              type: 'VariableDeclarator',
                              start: 11,
                              end: 29,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 11
                                  },
                                  end: {
                                      line: 1,
                                      column: 29
                                  }
                              },
                              id: {
                                  type: 'ObjectPattern',
                                  start: 11,
                                  end: 17,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 11
                                      },
                                      end: {
                                          line: 1,
                                          column: 17
                                      }
                                  },
                                  properties: [{
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
                                          name: 'x'
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
                                          name: 'x'
                                      }
                                  }]
                              },
                              init: {
                                  type: 'ObjectExpression',
                                  start: 20,
                                  end: 29,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 20
                                      },
                                      end: {
                                          line: 1,
                                          column: 29
                                      }
                                  },
                                  properties: [{
                                      type: 'Property',
                                      start: 22,
                                      end: 27,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 22
                                          },
                                          end: {
                                              line: 1,
                                              column: 27
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
                                          value: 23,
                                          raw: '23'
                                      },
                                      kind: 'init'
                                  }]
                              }
                          }],
                          kind: 'const'
                      },
                      test: {
                          type: 'BinaryExpression',
                          start: 31,
                          end: 36,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 31
                              },
                              end: {
                                  line: 1,
                                  column: 36
                              }
                          },
                          left: {
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
                              name: 'a'
                          },
                          operator: '<',
                          right: {
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
                              value: 1,
                              raw: '1'
                          }
                      },
                      update: null,
                      body: {
                          type: 'BlockStatement',
                          start: 40,
                          end: 42,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 40
                              },
                              end: {
                                  line: 1,
                                  column: 42
                              }
                          },
                          body: []
                      }
                  },
                  {
                      type: 'EmptyStatement',
                      start: 42,
                      end: 43,
                      loc: {
                          start: {
                              line: 1,
                              column: 42
                          },
                          end: {
                              line: 1,
                              column: 43
                          }
                      }
                  }
              ],
              sourceType: 'script'
          }
      });

    pass(`for (const { x, } = { x: 23 }; a < 1; ) {};
      for (const { x, } = { x: 23 }; a < 1; ) {};
      for (const { x, } = { x: 23 }; a < 1; ) {};
      for (const { x, } = { x: 23 }; a < 1; ) {};
      for (const { x, } = { x: 23 }; a < 1; ) {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (const { x, } = { x: 23 }; a < 1; ) {};
      for (const { x, } = { x: 23 }; a < 1; ) {};
      for (const { x, } = { x: 23 }; a < 1; ) {};
      for (const { x, } = { x: 23 }; a < 1; ) {};
      for (const { x, } = { x: 23 }; a < 1; ) {};`,
          expected: {
            type: 'Program',
            start: 0,
            end: 243,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 5,
                column: 49
              }
            },
            body: [
              {
                type: 'ForStatement',
                start: 0,
                end: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 42
                  }
                },
                init: {
                  type: 'VariableDeclaration',
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
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 11,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 11
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
                        start: 11,
                        end: 17,
                        loc: {
                          start: {
                            line: 1,
                            column: 11
                          },
                          end: {
                            line: 1,
                            column: 17
                          }
                        },
                        properties: [
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
                              name: 'x'
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
                              name: 'x'
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 20,
                        end: 29,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 29
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 22,
                            end: 27,
                            loc: {
                              start: {
                                line: 1,
                                column: 22
                              },
                              end: {
                                line: 1,
                                column: 27
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
                              value: 23,
                              raw: '23'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  kind: 'const'
                },
                test: {
                  type: 'BinaryExpression',
                  start: 31,
                  end: 36,
                  loc: {
                    start: {
                      line: 1,
                      column: 31
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
                  },
                  left: {
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
                    name: 'a'
                  },
                  operator: '<',
                  right: {
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
                    value: 1,
                    raw: '1'
                  }
                },
                update: null,
                body: {
                  type: 'BlockStatement',
                  start: 40,
                  end: 42,
                  loc: {
                    start: {
                      line: 1,
                      column: 40
                    },
                    end: {
                      line: 1,
                      column: 42
                    }
                  },
                  body: []
                }
              },
              {
                type: 'EmptyStatement',
                start: 42,
                end: 43,
                loc: {
                  start: {
                    line: 1,
                    column: 42
                  },
                  end: {
                    line: 1,
                    column: 43
                  }
                }
              },
              {
                type: 'ForStatement',
                start: 50,
                end: 92,
                loc: {
                  start: {
                    line: 2,
                    column: 6
                  },
                  end: {
                    line: 2,
                    column: 48
                  }
                },
                init: {
                  type: 'VariableDeclaration',
                  start: 55,
                  end: 79,
                  loc: {
                    start: {
                      line: 2,
                      column: 11
                    },
                    end: {
                      line: 2,
                      column: 35
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 61,
                      end: 79,
                      loc: {
                        start: {
                          line: 2,
                          column: 17
                        },
                        end: {
                          line: 2,
                          column: 35
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
                        start: 61,
                        end: 67,
                        loc: {
                          start: {
                            line: 2,
                            column: 17
                          },
                          end: {
                            line: 2,
                            column: 23
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 63,
                            end: 64,
                            loc: {
                              start: {
                                line: 2,
                                column: 19
                              },
                              end: {
                                line: 2,
                                column: 20
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 63,
                              end: 64,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 19
                                },
                                end: {
                                  line: 2,
                                  column: 20
                                }
                              },
                              name: 'x'
                            },
                            kind: 'init',
                            value: {
                              type: 'Identifier',
                              start: 63,
                              end: 64,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 19
                                },
                                end: {
                                  line: 2,
                                  column: 20
                                }
                              },
                              name: 'x'
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 70,
                        end: 79,
                        loc: {
                          start: {
                            line: 2,
                            column: 26
                          },
                          end: {
                            line: 2,
                            column: 35
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 72,
                            end: 77,
                            loc: {
                              start: {
                                line: 2,
                                column: 28
                              },
                              end: {
                                line: 2,
                                column: 33
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 72,
                              end: 73,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 28
                                },
                                end: {
                                  line: 2,
                                  column: 29
                                }
                              },
                              name: 'x'
                            },
                            value: {
                              type: 'Literal',
                              start: 75,
                              end: 77,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 31
                                },
                                end: {
                                  line: 2,
                                  column: 33
                                }
                              },
                              value: 23,
                              raw: '23'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  kind: 'const'
                },
                test: {
                  type: 'BinaryExpression',
                  start: 81,
                  end: 86,
                  loc: {
                    start: {
                      line: 2,
                      column: 37
                    },
                    end: {
                      line: 2,
                      column: 42
                    }
                  },
                  left: {
                    type: 'Identifier',
                    start: 81,
                    end: 82,
                    loc: {
                      start: {
                        line: 2,
                        column: 37
                      },
                      end: {
                        line: 2,
                        column: 38
                      }
                    },
                    name: 'a'
                  },
                  operator: '<',
                  right: {
                    type: 'Literal',
                    start: 85,
                    end: 86,
                    loc: {
                      start: {
                        line: 2,
                        column: 41
                      },
                      end: {
                        line: 2,
                        column: 42
                      }
                    },
                    value: 1,
                    raw: '1'
                  }
                },
                update: null,
                body: {
                  type: 'BlockStatement',
                  start: 90,
                  end: 92,
                  loc: {
                    start: {
                      line: 2,
                      column: 46
                    },
                    end: {
                      line: 2,
                      column: 48
                    }
                  },
                  body: []
                }
              },
              {
                type: 'EmptyStatement',
                start: 92,
                end: 93,
                loc: {
                  start: {
                    line: 2,
                    column: 48
                  },
                  end: {
                    line: 2,
                    column: 49
                  }
                }
              },
              {
                type: 'ForStatement',
                start: 100,
                end: 142,
                loc: {
                  start: {
                    line: 3,
                    column: 6
                  },
                  end: {
                    line: 3,
                    column: 48
                  }
                },
                init: {
                  type: 'VariableDeclaration',
                  start: 105,
                  end: 129,
                  loc: {
                    start: {
                      line: 3,
                      column: 11
                    },
                    end: {
                      line: 3,
                      column: 35
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 111,
                      end: 129,
                      loc: {
                        start: {
                          line: 3,
                          column: 17
                        },
                        end: {
                          line: 3,
                          column: 35
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
                        start: 111,
                        end: 117,
                        loc: {
                          start: {
                            line: 3,
                            column: 17
                          },
                          end: {
                            line: 3,
                            column: 23
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 113,
                            end: 114,
                            loc: {
                              start: {
                                line: 3,
                                column: 19
                              },
                              end: {
                                line: 3,
                                column: 20
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 113,
                              end: 114,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 19
                                },
                                end: {
                                  line: 3,
                                  column: 20
                                }
                              },
                              name: 'x'
                            },
                            kind: 'init',
                            value: {
                              type: 'Identifier',
                              start: 113,
                              end: 114,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 19
                                },
                                end: {
                                  line: 3,
                                  column: 20
                                }
                              },
                              name: 'x'
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 120,
                        end: 129,
                        loc: {
                          start: {
                            line: 3,
                            column: 26
                          },
                          end: {
                            line: 3,
                            column: 35
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 122,
                            end: 127,
                            loc: {
                              start: {
                                line: 3,
                                column: 28
                              },
                              end: {
                                line: 3,
                                column: 33
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 122,
                              end: 123,
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
                              name: 'x'
                            },
                            value: {
                              type: 'Literal',
                              start: 125,
                              end: 127,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 31
                                },
                                end: {
                                  line: 3,
                                  column: 33
                                }
                              },
                              value: 23,
                              raw: '23'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  kind: 'const'
                },
                test: {
                  type: 'BinaryExpression',
                  start: 131,
                  end: 136,
                  loc: {
                    start: {
                      line: 3,
                      column: 37
                    },
                    end: {
                      line: 3,
                      column: 42
                    }
                  },
                  left: {
                    type: 'Identifier',
                    start: 131,
                    end: 132,
                    loc: {
                      start: {
                        line: 3,
                        column: 37
                      },
                      end: {
                        line: 3,
                        column: 38
                      }
                    },
                    name: 'a'
                  },
                  operator: '<',
                  right: {
                    type: 'Literal',
                    start: 135,
                    end: 136,
                    loc: {
                      start: {
                        line: 3,
                        column: 41
                      },
                      end: {
                        line: 3,
                        column: 42
                      }
                    },
                    value: 1,
                    raw: '1'
                  }
                },
                update: null,
                body: {
                  type: 'BlockStatement',
                  start: 140,
                  end: 142,
                  loc: {
                    start: {
                      line: 3,
                      column: 46
                    },
                    end: {
                      line: 3,
                      column: 48
                    }
                  },
                  body: []
                }
              },
              {
                type: 'EmptyStatement',
                start: 142,
                end: 143,
                loc: {
                  start: {
                    line: 3,
                    column: 48
                  },
                  end: {
                    line: 3,
                    column: 49
                  }
                }
              },
              {
                type: 'ForStatement',
                start: 150,
                end: 192,
                loc: {
                  start: {
                    line: 4,
                    column: 6
                  },
                  end: {
                    line: 4,
                    column: 48
                  }
                },
                init: {
                  type: 'VariableDeclaration',
                  start: 155,
                  end: 179,
                  loc: {
                    start: {
                      line: 4,
                      column: 11
                    },
                    end: {
                      line: 4,
                      column: 35
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 161,
                      end: 179,
                      loc: {
                        start: {
                          line: 4,
                          column: 17
                        },
                        end: {
                          line: 4,
                          column: 35
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
                        start: 161,
                        end: 167,
                        loc: {
                          start: {
                            line: 4,
                            column: 17
                          },
                          end: {
                            line: 4,
                            column: 23
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 163,
                            end: 164,
                            loc: {
                              start: {
                                line: 4,
                                column: 19
                              },
                              end: {
                                line: 4,
                                column: 20
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 163,
                              end: 164,
                              loc: {
                                start: {
                                  line: 4,
                                  column: 19
                                },
                                end: {
                                  line: 4,
                                  column: 20
                                }
                              },
                              name: 'x'
                            },
                            kind: 'init',
                            value: {
                              type: 'Identifier',
                              start: 163,
                              end: 164,
                              loc: {
                                start: {
                                  line: 4,
                                  column: 19
                                },
                                end: {
                                  line: 4,
                                  column: 20
                                }
                              },
                              name: 'x'
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 170,
                        end: 179,
                        loc: {
                          start: {
                            line: 4,
                            column: 26
                          },
                          end: {
                            line: 4,
                            column: 35
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 172,
                            end: 177,
                            loc: {
                              start: {
                                line: 4,
                                column: 28
                              },
                              end: {
                                line: 4,
                                column: 33
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 172,
                              end: 173,
                              loc: {
                                start: {
                                  line: 4,
                                  column: 28
                                },
                                end: {
                                  line: 4,
                                  column: 29
                                }
                              },
                              name: 'x'
                            },
                            value: {
                              type: 'Literal',
                              start: 175,
                              end: 177,
                              loc: {
                                start: {
                                  line: 4,
                                  column: 31
                                },
                                end: {
                                  line: 4,
                                  column: 33
                                }
                              },
                              value: 23,
                              raw: '23'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  kind: 'const'
                },
                test: {
                  type: 'BinaryExpression',
                  start: 181,
                  end: 186,
                  loc: {
                    start: {
                      line: 4,
                      column: 37
                    },
                    end: {
                      line: 4,
                      column: 42
                    }
                  },
                  left: {
                    type: 'Identifier',
                    start: 181,
                    end: 182,
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
                    name: 'a'
                  },
                  operator: '<',
                  right: {
                    type: 'Literal',
                    start: 185,
                    end: 186,
                    loc: {
                      start: {
                        line: 4,
                        column: 41
                      },
                      end: {
                        line: 4,
                        column: 42
                      }
                    },
                    value: 1,
                    raw: '1'
                  }
                },
                update: null,
                body: {
                  type: 'BlockStatement',
                  start: 190,
                  end: 192,
                  loc: {
                    start: {
                      line: 4,
                      column: 46
                    },
                    end: {
                      line: 4,
                      column: 48
                    }
                  },
                  body: []
                }
              },
              {
                type: 'EmptyStatement',
                start: 192,
                end: 193,
                loc: {
                  start: {
                    line: 4,
                    column: 48
                  },
                  end: {
                    line: 4,
                    column: 49
                  }
                }
              },
              {
                type: 'ForStatement',
                start: 200,
                end: 242,
                loc: {
                  start: {
                    line: 5,
                    column: 6
                  },
                  end: {
                    line: 5,
                    column: 48
                  }
                },
                init: {
                  type: 'VariableDeclaration',
                  start: 205,
                  end: 229,
                  loc: {
                    start: {
                      line: 5,
                      column: 11
                    },
                    end: {
                      line: 5,
                      column: 35
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 211,
                      end: 229,
                      loc: {
                        start: {
                          line: 5,
                          column: 17
                        },
                        end: {
                          line: 5,
                          column: 35
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
                        start: 211,
                        end: 217,
                        loc: {
                          start: {
                            line: 5,
                            column: 17
                          },
                          end: {
                            line: 5,
                            column: 23
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 213,
                            end: 214,
                            loc: {
                              start: {
                                line: 5,
                                column: 19
                              },
                              end: {
                                line: 5,
                                column: 20
                              }
                            },
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 213,
                              end: 214,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 19
                                },
                                end: {
                                  line: 5,
                                  column: 20
                                }
                              },
                              name: 'x'
                            },
                            kind: 'init',
                            value: {
                              type: 'Identifier',
                              start: 213,
                              end: 214,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 19
                                },
                                end: {
                                  line: 5,
                                  column: 20
                                }
                              },
                              name: 'x'
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'ObjectExpression',
                        start: 220,
                        end: 229,
                        loc: {
                          start: {
                            line: 5,
                            column: 26
                          },
                          end: {
                            line: 5,
                            column: 35
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 222,
                            end: 227,
                            loc: {
                              start: {
                                line: 5,
                                column: 28
                              },
                              end: {
                                line: 5,
                                column: 33
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 222,
                              end: 223,
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
                              name: 'x'
                            },
                            value: {
                              type: 'Literal',
                              start: 225,
                              end: 227,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 31
                                },
                                end: {
                                  line: 5,
                                  column: 33
                                }
                              },
                              value: 23,
                              raw: '23'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  kind: 'const'
                },
                test: {
                  type: 'BinaryExpression',
                  start: 231,
                  end: 236,
                  loc: {
                    start: {
                      line: 5,
                      column: 37
                    },
                    end: {
                      line: 5,
                      column: 42
                    }
                  },
                  left: {
                    type: 'Identifier',
                    start: 231,
                    end: 232,
                    loc: {
                      start: {
                        line: 5,
                        column: 37
                      },
                      end: {
                        line: 5,
                        column: 38
                      }
                    },
                    name: 'a'
                  },
                  operator: '<',
                  right: {
                    type: 'Literal',
                    start: 235,
                    end: 236,
                    loc: {
                      start: {
                        line: 5,
                        column: 41
                      },
                      end: {
                        line: 5,
                        column: 42
                      }
                    },
                    value: 1,
                    raw: '1'
                  }
                },
                update: null,
                body: {
                  type: 'BlockStatement',
                  start: 240,
                  end: 242,
                  loc: {
                    start: {
                      line: 5,
                      column: 46
                    },
                    end: {
                      line: 5,
                      column: 48
                    }
                  },
                  body: []
                }
              },
              {
                type: 'EmptyStatement',
                start: 242,
                end: 243,
                loc: {
                  start: {
                    line: 5,
                    column: 48
                  },
                  end: {
                    line: 5,
                    column: 49
                  }
                }
              }
            ],
            sourceType: 'script'
          }
      });

    pass(`for (const {} = obj; a < 1; ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (const {} = obj; a < 1; ) {}`,
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
                  type: 'ForStatement',
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
                  init: {
                      type: 'VariableDeclaration',
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
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 11,
                          end: 19,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 19
                              }
                          },
                          id: {
                              type: 'ObjectPattern',
                              start: 11,
                              end: 13,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 11
                                  },
                                  end: {
                                      line: 1,
                                      column: 13
                                  }
                              },
                              properties: []
                          },
                          init: {
                              type: 'Identifier',
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
                              name: 'obj'
                          }
                      }],
                      kind: 'const'
                  },
                  test: {
                      type: 'BinaryExpression',
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
                      left: {
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
                          name: 'a'
                      },
                      operator: '<',
                      right: {
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
                          value: 1,
                          raw: '1'
                      }
                  },
                  update: null,
                  body: {
                      type: 'BlockStatement',
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
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`for (const [x] = iter; a < 1; ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (const [x] = iter; a < 1; ) {}`,
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
                  type: 'ForStatement',
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
                  init: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 21,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 21
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 11,
                          end: 21,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 21
                              }
                          },
                          id: {
                              type: 'ArrayPattern',
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
                              elements: [{
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
                              }]
                          },
                          init: {
                              type: 'Identifier',
                              start: 17,
                              end: 21,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 17
                                  },
                                  end: {
                                      line: 1,
                                      column: 21
                                  }
                              },
                              name: 'iter'
                          }
                      }],
                      kind: 'const'
                  },
                  test: {
                      type: 'BinaryExpression',
                      start: 23,
                      end: 28,
                      loc: {
                          start: {
                              line: 1,
                              column: 23
                          },
                          end: {
                              line: 1,
                              column: 28
                          }
                      },
                      left: {
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
                          name: 'a'
                      },
                      operator: '<',
                      right: {
                          type: 'Literal',
                          start: 27,
                          end: 28,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 27
                              },
                              end: {
                                  line: 1,
                                  column: 28
                              }
                          },
                          value: 1,
                          raw: '1'
                      }
                  },
                  update: null,
                  body: {
                      type: 'BlockStatement',
                      start: 32,
                      end: 34,
                      loc: {
                          start: {
                              line: 1,
                              column: 32
                          },
                          end: {
                              line: 1,
                              column: 34
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });
  });
});
