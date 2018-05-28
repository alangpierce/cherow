import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Destructuring - Miscellaneous', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

    const invalidSyntax = [
        // Syntax errors
        'function f1() { var a = 10; [a+2] = []; }; f1();',
        'function f2() { var a = 10; ({x:a+2} = {x:2}); }; f2();',
        'for (let []; ;) { }',
        'for (let a = 1, []; ;) { }',
        'for (let [] = [], a = 1, {}; ;) { }',
        'for (let [[a] = []]; ;) { }',
        'for (var {a: ...a1} = {}; ; ) { } ',
        'for (var {a: ...[]} = {}; ; ) { } ',
        'for (var {a: ...[]} of \'\' ) { } ',
        'for (var a of {b: foo()} = {}) { }',
        'for ([{b: foo()} = {}] of {}) { }',
        'for (var a in {b: foo().bar()} = {}) { }',
        '({x : , y} = {});',
        'var {...[z]} = {0:0 };',
        'var {x :  , y} = {};',
        'var {x :  } = {};',
        'var {x :  , } = {};',
        '(bar, [((zoo) = (1))] = (bar)) => { };',
        'var e = 1;       ( {abcdef  = ((((({})) = (1))))} = (e)) => {  try{ } catch(e) {}}',
        'var e = 1;       ( {ghijkl  = ((((({})) =  1 )))} = (e)) => {  try{ } catch(e) {}}',
        '( {abcdef  = ((((([...((abcdef))] = [1, 2, 3])) = (1))))} = (e)) => {  try{  } catch(abcdef) {}}',
        '(bar, [((zoo) = (1))] = (bar)) => { };',
        'function test5(){ var ggnzrk=function(){ }; ({ggnzrk, namespace: {}, w: [(inmgdv)]}) => { };};'
    ];

    for (const arg of invalidSyntax) {

        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
    }

    fail(' [([a])] = 12;', Context.Empty, {
        source: ' [([a])] = 12;',
    });

    fail('[...a, b] = [...e,] = 12', Context.Empty, {
        source: '[...a, b] = [...e,] = 12',
    });

    fail('[ a -= 12 ] = 12;', Context.Empty, {
        source: '[ a -= 12 ] = 12;',
    });

    fail('();', Context.Empty, {
        source: '();',
    });

    fail('for (var [ a ]; a; ) {}', Context.Empty, {
        source: 'for (var [ a ]; a; ) {}',
    });

    fail('var { a, b, c };', Context.Empty, {
        source: 'var { a, b, c };',
    });

    fail('for (var { a, b, c }; a && b && c; ) {}', Context.Empty, {
        source: 'for (var { a, b, c }; a && b && c; ) {}',
    });

    fail('function f1() { var a = 10; [a+2] = []; }; f1();', Context.Empty, {
        source: 'function f1() { var a = 10; [a+2] = []; }; f1();',
    });

    fail('function f2() { var a = 10; ({x:a+2} = {x:2}); }; f2();', Context.Empty, {
        source: 'function f2() { var a = 10; ({x:a+2} = {x:2}); }; f2();',
    });

    // This tests isn't implemented with the Jazzle parser
    fail('[...(a),] = 12', Context.Empty, {
        source: '[...(a),] = 12',
    });

    fail('([a]) = 12', Context.Empty, {
        source: '([a]) = 12',
    });

    fail('function* l() { ({[yield]: (a)})=>12 }', Context.Empty, {
        source: 'function* l() { ({[yield]: (a)})=>12 }',
    });
});

describe('Pass', () => {

            const validCombos = [
                'var e = 1; ( {foo = (((  {}   = (1))))} = (e)) => {  try{ } catch(e) {}}',
                'var e = 1; ( {foo = (((  foo   = (1))))} = (e)) => {  try{ } catch(e) {}}',
                'var e = 1; ( {tuvwxy  = (((  foo   =  1 )))} = (e)) => {  try{ } catch(e) {}}',
                'var a; [a = class aClass {}] = [];',
                'var a; ({ bar = ((cspagh = 4) => a) } = 1) => { /*jjj*/ }; (function(a) { })()',
                'var e = 1; ( {bar  = (((  foo   =  1 )))} = (e)) => {  try{ } catch(e) {}}',
                'var e = 1; ( {foo = (((  foo   = (1))))} = (e)) => {  try{ } catch(e) {}}',
                'var e = 1;       ( {ghijkl  = (((((foo)) =  1 )))} = (e)) => {  try{ } catch(e) {}}',
                'var e = 1;       ( {abcdef  = (((((foo)) = (1))))} = (e)) => {  try{ } catch(e) {}}',
                'var e = 1; ( {bar  = (((  {}   =  1 )))} = (e)) => {  try{ } catch(e) {}}',
                // Babylon PR: 'https://github.com/babel/babylon/pull/317'
                '({set = {}}) => set;',
                // Babylon issue: https://github.com/babel/babylon/issues/397
                'for (var a = 0 in {});',
                `function pythag ( [ x, z = 1 ] ) {
      return Math.sqrt( x * x + z * z );
    }`,
                `function drawRect ( { ctx, x1, y1, x2, y2 } ) {
    ctx.fillRect( x1, y1, x2 - x1, y2 - y1 );
  }
  function scale ([ d0, d1 ], [ r0, r1 ]) {
    const m = ( r1 - r0 ) / ( d1 - d0 );
    return function ( num ) {
      return r0 + ( num - d0 ) * m;
    }
  }`,
                `
  var { name: value, description = null } = obj;
  console.log( value, description );`,
                'var { a: { b: c }, d: { e: f, g: h } } = x();',
                `function foo ({ a: { b: c }, d: { e: f, g: h } }) {
    console.log( c, f, h );
  }`,
                `function foo({ [FirstProp]: one, [SecondProp]: two = 'Too', 3: three, Fore: four } = x) {
    console.log(one, two, three, four);
  }`,
                `
  function foo ({ [a]: { [b]: c }, d: { 'e': f, [g]: h }, [i + j]: { [k + l]: m, n: o } }) {
    console.log( c, f, h, m, o );
  }`,
                `const x = [1, 2, {r: 9}, 3], [a, ...[, {r: b, s: c = 4} ]] = x;
  console.log(a, b, c);
`,
                `
let x = [1, 2, {r: 9}, {s: ["table"]} ];
let a, b, c, d;
([a, ...[ , {r: b}, {r: c = "nothing", s: [d] = "nope"} ]] = x);
console.log(a, b, c, d);
`,
                '({x, y: {z, q}} = {x: 1});',
                `foo();
  if ( bar([x, y] = [1, 2]) ) {
    baz();
  }`,
                `
  let [
    a = \`A\${baz() - 4}\`,
    , /* hole */
    c = (x => -x),
    d = ({ r: 5, [h()]: i }),
  ] = [ "ok" ];
`,
                ` class Point {
  set ( array ) {
    [ this.x, this.y ] = array;
  }
}
let a, b, c = [ 1, 2, 3 ];
[ a, b ] = c;
`, `
let x;
if (maybe) {
let x;
({ x } = { x: 3 });
[ x ] = [ 3 ];
}`,
                `
const a = {
options (options) {
  const { input } = options;
}
}`,
            ];
      for (const arg of validCombos) {

        it(`${arg}`, () => {
            t.doesNotThrow(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
      }

      const validSyntax = [
            'a',
            '{ x : y }',
            '{ x : y = 1 }',
            '{ get, set }',
            '{ get = 1, set = 2 }',
            '[a]',
            '[a = 1]',
            '[a,b,c]',
            '[a, b = 42, c]',
            '{ x : x, y : y }',
            '{ x : x = 1, y : y }',
            '{ x : x, y : y = 42 }',
            '[]',
            '{}',
            '[{x:x, y:y}, [a,b,c]]',
            '[{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]]',
            '{x}',
            '{x, y}',
            '{x = 42, y = 15}',
            '[a,,b]',
            '{42 : x}',
            '{42 : x = 42}',
            '{42e-2 : x}',
            '{42e-2 : x = 42}',
            '{x : y, x : z}',
            '{\'hi\' : x}',
            '{\'hi\' : x = 42}',
            '{var: x}',
            '{var: x = 42}',
            '{[x] : z}',
            '{[1+1] : z}',
            '{[foo()] : z}',
            '{}',
            '[...rest]',
            '[a,b,...rest]',
            '[a,,...rest]',
            '{ __proto__: x, __proto__: y}',
            '{arguments: x}',
            '{eval: x}',
            '{ x : y, ...z }',
            '{ x : y = 1, ...z }',
            '{ x : x, y : y, ...z }',
            '{ x : x = 1, y : y, ...z }',
            '{ x : x, y : y = 42, ...z }',
            '[{x:x, y:y, ...z}, [a,b,c]]',
            '[{x:x = 1, y:y = 2, ...z}, [a = 3, b = 4, c = 5]]',
            '{...x}',
            '{x, ...y}',
            '{x = 42, y = 15, ...z}',
            '{42 : x = 42, ...y}',
            '{\'hi\' : x, ...z}',
            '{\'hi\' : x = 42, ...z}',
            '{var: x = 42, ...z}',
            '{[x] : z, ...y}',
            '{[1+1] : z, ...x}',
            '{arguments: x, ...z}',
            '{ __proto__: x, __proto__: y, ...z}',
        ];

      for (const arg of validSyntax) {

            it(`var ${arg} = {};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var ${arg} = {};`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; let ${arg} = {};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`"use strict"; let ${arg} = {};`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; const ${arg} = {};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`"use strict"; const ${arg} = {};`, undefined, Context.Empty);
                });
            });

            it(`function foo(arg1, ${arg}) {};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`function foo(arg1, ${arg}) {};`, undefined, Context.Empty);
                });
            });

            it(`var f = (arg, ${arg}) => {};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var f = (arg, ${arg}) => {};`, undefined, Context.Empty);
                });
            });

            it(`try {} catch(${arg}) {}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`try {} catch(${arg}) {}`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

      pass('({i: {...j}} = k);', Context.Empty, {
        source: '({i: {...j}} = k);',
        expected: {
            body: [
              {
                expression: {
                  left: {
                    properties: [
                      {
                        computed: false,
                        key: {
                          name: 'i',
                          type: 'Identifier'
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        type: 'Property',
                       value: {
                          properties: [
                            {
                             argument: {
                                name: 'j',
                                type: 'Identifier'
                              },
                              type: 'RestElement'
                            }
                          ],
                          type: 'ObjectPattern'
                        }
                      }
                    ],
                    type: 'ObjectPattern'
                  },
                  operator: '=',
                  right: {
                    name: 'k',
                    type: 'Identifier'
                 },
                  type: 'AssignmentExpression'
                },
                type: 'ExpressionStatement'
              }
            ],
            sourceType: 'script',
            type: 'Program'
          }
      });

      pass('(a, c) => (({ [c]: _, ...rest } = a), rest)', Context.Empty, {
        source: '(a, c) => (({ [c]: _, ...rest } = a), rest)',
        expected: {
            body: [
              {
                expression: {
                  async: false,
                  body: {
                    expressions: [
                      {
                        left: {
                          properties: [
                            {
                             computed: true,
                              key: {
                                name: 'c',
                                type: 'Identifier'
                              },
                              kind: 'init',
                              method: false,
                              shorthand: false,
                              type: 'Property',
                              value: {
                                name: '_',
                                type: 'Identifier',
                              }
                            },
                            {
                              argument: {
                                name: 'rest',
                                type: 'Identifier'
                              },
                              type: 'RestElement'
                            }
                          ],
                          type: 'ObjectPattern',
                        },
                        operator: '=',
                        right: {
                          name: 'a',
                          type: 'Identifier'
                        },
                        type: 'AssignmentExpression'
                      },
                      {
                        name: 'rest',
                        type: 'Identifier',
                      },
                    ],
                   type: 'SequenceExpression',
                  },
                  expression: true,
                  generator: false,
                  id: null,
                  params: [
                    {
                      name: 'a',
                      type: 'Identifier'
                    },
                    {
                      name: 'c',
                      type: 'Identifier'
                    },
                  ],
                  type: 'ArrowFunctionExpression'
               },
                type: 'ExpressionStatement'
              }
            ],
            sourceType: 'script',
            type: 'Program'
          }
    });

      pass('c = ({b} = b);', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: 'c = ({b} = b);',
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
                type: 'ExpressionStatement',
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
                expression: {
                  type: 'AssignmentExpression',
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
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    start: 0,
                    end: 1,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 1
                      }
                    },
                    name: 'c'
                  },
                  right: {
                    type: 'AssignmentExpression',
                    start: 5,
                    end: 12,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 12
                      }
                    },
                    operator: '=',
                    left: {
                      type: 'ObjectPattern',
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
                      properties: [
                        {
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
                            name: 'b'
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
                            name: 'b'
                          }
                        }
                      ]
                    },
                    right: {
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
                      name: 'b'
                    }
                  }
                }
              }
            ],
            sourceType: 'script'
          }
    });

      pass('for (var {z} = { z : 3 }; z != 0; z--) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: 'for (var {z} = { z : 3 }; z != 0; z--) {}',
        expected: {
            type: 'Program',
            start: 0,
            end: 41,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 41
              }
            },
            body: [
              {
                type: 'ForStatement',
                start: 0,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                },
                init: {
                  type: 'VariableDeclaration',
                  start: 5,
                  end: 24,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 24
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 9,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 24
                        }
                      },
                      id: {
                        type: 'ObjectPattern',
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
                        properties: [
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
                              name: 'z'
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
                              name: 'z'
                            }
                          }
                        ]
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
                        properties: [
                          {
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
                              name: 'z'
                            },
                            value: {
                              type: 'Literal',
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
                              value: 3,
                              raw: '3'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  kind: 'var'
                },
                test: {
                  type: 'BinaryExpression',
                  start: 26,
                  end: 32,
                  loc: {
                    start: {
                      line: 1,
                      column: 26
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  },
                  left: {
                    type: 'Identifier',
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
                    name: 'z'
                  },
                  operator: '!=',
                  right: {
                    type: 'Literal',
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
                    value: 0,
                    raw: '0'
                  }
                },
                update: {
                  type: 'UpdateExpression',
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
                  operator: '--',
                  prefix: false,
                  argument: {
                    type: 'Identifier',
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
                    name: 'z'
                  }
                },
                body: {
                  type: 'BlockStatement',
                  start: 39,
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 39
                    },
                    end: {
                      line: 1,
                      column: 41
                    }
                  },
                  body: []
                }
              }
            ],
            sourceType: 'script'
          }
    });

      pass('var { x : { z1 }, y2} = { x : {}, y2 : 42 }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: 'var { x : { z1 }, y2} = { x : {}, y2 : 42 }',
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
            body: [
              {
                type: 'VariableDeclaration',
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
                declarations: [
                  {
                    type: 'VariableDeclarator',
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
                    id: {
                      type: 'ObjectPattern',
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
                      properties: [
                        {
                          type: 'Property',
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
                            type: 'ObjectPattern',
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
                            properties: [
                              {
                                type: 'Property',
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
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
                                  type: 'Identifier',
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
                                  name: 'z1'
                                },
                                kind: 'init',
                                value: {
                                  type: 'Identifier',
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
                                  name: 'z1'
                                }
                              }
                            ]
                          },
                          kind: 'init'
                        },
                        {
                          type: 'Property',
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
                          method: false,
                          shorthand: true,
                          computed: false,
                          key: {
                            type: 'Identifier',
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
                            name: 'y2'
                          },
                          kind: 'init',
                          value: {
                            type: 'Identifier',
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
                            name: 'y2'
                          }
                        }
                      ]
                    },
                    init: {
                      type: 'ObjectExpression',
                      start: 24,
                      end: 43,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 43
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 26,
                          end: 32,
                          loc: {
                            start: {
                              line: 1,
                              column: 26
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
                            name: 'x'
                          },
                          value: {
                            type: 'ObjectExpression',
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
                            properties: []
                          },
                          kind: 'init'
                        },
                        {
                          type: 'Property',
                          start: 34,
                          end: 41,
                          loc: {
                            start: {
                              line: 1,
                              column: 34
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
                            name: 'y2'
                          },
                          value: {
                            type: 'Literal',
                            start: 39,
                            end: 41,
                            loc: {
                              start: {
                                line: 1,
                                column: 39
                              },
                              end: {
                                line: 1,
                                column: 41
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
                kind: 'var'
              }
            ],
            sourceType: 'script'
          }
    });

});
});
