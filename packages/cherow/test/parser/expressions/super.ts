import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Super property', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

      const InvalidNewErrors = [
          'new super;',
          'new super();',
          '() => new super;',
          '() => new super();'
      ];

      for (const arg of InvalidNewErrors) {

          it(`class C { method() { ${arg} } }`, () => {
              t.throws(() => {
                  parseSource(`class C { method() { ${arg} } }`, undefined, Context.Empty);
              });
          });

          it(`class C { *method() { ${arg} } }`, () => {
              t.throws(() => {
                  parseSource(`class C { *method() { ${arg} } }`, undefined, Context.Empty);
              });
          });

          it(`class C { get x() { ${arg} } }`, () => {
              t.throws(() => {
                  parseSource(`class C { get x() { ${arg} } }`, undefined, Context.Empty);
              });
          });

          it(`class C { set x(_) { ${arg} } }`, () => {
              t.throws(() => {
                  parseSource(`class C { set x(_) { ${arg} } }`, undefined, Context.Empty);
              });
          });

          it(`({ method() { ${arg} } })`, () => {
              t.throws(() => {
                  parseSource(`({ method() { ${arg} } })`, undefined, Context.Empty);
              });
          });

          it(`(function() { ${arg} } )`, () => {
              t.throws(() => {
                  parseSource(`(function() { ${arg} } )`, undefined, Context.Empty);
              });
          });

          it(`var f = function() { ${arg} }`, () => {
              t.throws(() => {
                  parseSource(`var f = function() { ${arg} }`, undefined, Context.Empty);
              });
          });

          it(`({ f: function*() {${arg} } })`, () => {
              t.throws(() => {
                  parseSource(`({ f: function*() { ${arg} } })`, undefined, Context.Empty);
              });
          });

          it(`(function*() { ${arg} })`, () => {
              t.throws(() => {
                  parseSource(`(function*() { ${arg} })`, undefined, Context.Empty);
              });
          });

          it(`var f = function*() { ${arg} }`, () => {
              t.throws(() => {
                  parseSource(`var f = function*() { ${arg} }`, undefined, Context.Empty);
              });
          });
      }

      // Note: Acorn fails on this, and have commented out their tests for this

      fail('async function* x() { super(); }', Context.Empty, {
          source: 'async function* x() { super(); }',
      });

      fail('ref = async function*() { super(); }', Context.Empty, {
          source: 'ref = async function*() { super(); }',
      });

      fail('(async function*() { super(); })', Context.Empty, {
          source: '(async function*() { super(); })',
      });

      fail('var gen = { async *method() { super(); } }', Context.Empty, {
          source: 'var gen = { async *method() { super(); } }',
      });

      fail('export default async function*() { super(); }', Context.Strict | Context.Module, {
          source: 'export default async function*() { super(); }',
      });

      fail('var C = class { async *method() { super(); } }', Context.Empty, {
          source: 'var C = class { async *method() { super(); } }',
      });

      fail('var C = class { static async *method() { super(); } }', Context.Empty, {
          source: 'var C = class { static async *method() { super(); } }',
      });

      fail('var C = class { async *method() { var x = function () { super(); } } }', Context.Empty, {
        source: 'var C = class { async *method() { var x = function () { super(); } } }',
      });

      fail('var C = class { static async *method() { var x = function () { super(); } } }', Context.Empty, {
        source: 'var C = class { static async *method() { var x = function () { super(); } } }',
      });

      fail('async function* x() { var x = { y: function () { super(); } } }', Context.Empty, {
        source: 'async function* x() { var x = { y: function () { super(); } } }',
      });

      fail('ref = async function*() { var x = { y: function () { super(); } } }', Context.Empty, {
        source: 'ref = async function*() { var x = { y: function () { super(); } } }',
      });

      fail('(async function*() { var x = { y: function () { super(); } } })', Context.Empty, {
        source: '(async function*() { var x = { y: function () { super(); } } })',
      });

      fail('var gen = { async *method() { var x = { y: function () { super(); } } } }', Context.Empty, {
        source: 'var gen = { async *method() { var x = { y: function () { super(); } } } }',
      });

      fail('export default async function*() { var x = { y: function () { super(); } } }', Context.Strict | Context.Module, {
        source: 'export default async function*() { var x = { y: function () { super(); } } }',
      });

      fail('var C = class { async *method() { var x = { y: function () { super(); } } } }', Context.Empty, {
        source: 'var C = class { async *method() { var x = { y: function () { super(); } } } }',
      });

      fail('var C = class { static async *method() { var x = { y: function () { super(); } } } }', Context.Empty, {
        source: 'var C = class { static async *method() { var x = { y: function () { super(); } } } }',
      });

      // Testing invalid use of super property
      const invalidSuperKeyword = [
          'super',
          'super = x',
          'y = super',
          'foo(super)',
          'super.x',
          'super[27]',
          'super.x()',
          'super[27]()',
          'super()',
          'new super.x',
          'new super.x()',
          'new super[27]',
          'new super[27]()',
      ];

      for (const arg of invalidSuperKeyword) {

          it(`${arg}`, () => {
              t.throws(() => {
                  parseSource(`${arg}`, undefined, Context.Empty);
              });
          });

          it(`icefapper = ${arg}`, () => {
              t.throws(() => {
                  parseSource(`icefapper = ${arg}`, undefined, Context.Empty);
              });
          });

          it(`foo(${arg})`, () => {
              t.throws(() => {
                  parseSource(`foo(${arg})`, undefined, Context.Empty);
              });
          });

          it(`if (${arg}) {}`, () => {
              t.throws(() => {
                  parseSource(`if (${arg}) {}`, undefined, Context.Empty);
              });
          });

          it(`if (false) {} else {${arg}}`, () => {
              t.throws(() => {
                  parseSource(`if (false) {} else {${arg}}`, undefined, Context.Empty);
              });
          });

          it(`class C { m() { function f() {${arg}} } }`, () => {
              t.throws(() => {
                  parseSource(`class C { m() { function f() {${arg}} } }`, undefined, Context.Empty);
              });
          });

          it(`({ m() { function f() {${arg}} } })`, () => {
              t.throws(() => {
                  parseSource(`({ m() { function f() {${arg}} } })`, undefined, Context.Empty);
              });
          });

          it(`while (true) {${arg}}`, () => {
              t.throws(() => {
                  parseSource(`while (true) {${arg}}`, undefined, Context.Empty);
              });
          });

          it(`class C extends (${arg}) {}`, () => {
              t.throws(() => {
                  parseSource(`class C extends (${arg}) {}`, undefined, Context.Empty);
              });
          });
      }

      // V8
      const invalidSuperCall = [
          'class C { constructor() { super(); } }',
          'class C { method() { super(); } }',
          'class C { method() { () => super(); } }',
          'class C { *method() { super(); } }',
          'class C { get x() { super(); } }',
          'class C { set x(_) { super(); } }',
          '({ method() { super(); } })',
          '({ *method() { super(); } })',
          '({ get x() { super(); } })',
          '({ set x(_) { super(); } })',
          '({ f: function() { super(); } })',
          '(function() { super(); })',
          'var f = function() { super(); }',
          '({ f: function*() { super(); } })',
          '(function*() { super(); })',
          'var f = function*() { super(); }',
      ];

      for (const arg of invalidSuperCall) {

          it(`${arg}`, () => {
              t.throws(() => {
                  parseSource(`${arg}`, undefined, Context.Empty);
              });
          });
      }

      const invalidSyntax = [
          'super',
          'super = x',
          'y = super',
          'f(super)',
          'new super',
          'new super()',
          'new super(12, 45)',
          'new new super',
          'new new super()',
          'new new super()()',
      ];

      for (const arg of invalidSyntax) {

          it(`class C { m() { ${arg}; } }`, () => {
              t.throws(() => {
                  parseSource(`class C { m() { ${arg}; } }`, undefined, Context.Empty);
              });
          });

          it(`class C { m() { k = ${arg}; } }`, () => {
              t.throws(() => {
                  parseSource(`class C { m() { k = ${arg}; } }`, undefined, Context.Empty);
              });
          });

          it(`class C { m() { foo(${arg}); } }`, () => {
              t.throws(() => {
                  parseSource(`class C { m() { foo(${arg}); } }`, undefined, Context.Empty);
              });
          });

          it(`class C { m() { () => ${arg}; } }`, () => {
              t.throws(() => {
                  parseSource(`class C { m() { () => ${arg}; } }`, undefined, Context.Empty);
              });
          });
      }

      // super in global scope
      fail(`() => { super(); };`, Context.Empty, {
          source: '() => { super.foo; };',
      });

      fail(`() => { super(); };`, Context.Empty, {
        source: '() => { super.foo; };',
    });

      fail(`super.property;`, Context.Empty, {
      source: 'super.property;',
    });

    // Esprima issue: https://github.com/jquery/esprima/issues/1784
      fail('!{ a() { !function* (a = super.b()){} } };', Context.Empty, {
      source: '!{ a() { !function* (a = super.b()){} } };',
    });

      fail('!{ a() { !function* (){ super.b(); } } };', Context.Empty, {
      source: '!{ a() { !function* (){ super.b(); } } };',
    });

      fail(`super.property;`, Context.Empty, {
        source: 'super.property;',
      });

      fail(`class a extends b { c() { function* d(c = super.e()){} } }`, Context.Empty, {
          source: 'class a extends b { c() { function* d(c = super.e()){} } }',
      });

      fail(`function* a(b){ super.c }`, Context.Empty, {
          source: 'function* a(b){ super.c }',
      });

      fail(`!function* (a){ super.b }`, Context.Empty, {
          source: '!function* (a){ super.b }',
      });

      fail(`class A extends B { constructor() { super; } }`, Context.Empty, {
          source: 'class A extends B { constructor() { super; } }',
      });

      fail(`class A extends B { constructor() { (super)() } }`, Context.Empty, {
          source: 'class A extends B { constructor() { (super)() } }',
      });

      fail(`!{ a() { !function* (){ super.b(); } } };`, Context.Empty, {
          source: '!{ a() { !function* (){ super.b(); } } };',
      });

      fail(`"class A extends B { *g1() { return super() } }}`, Context.Empty, {
          source: 'class A extends B { *g1() { return super() } }}',
      });

      fail(`function wrap() { function* foo(a = super(), b = super.foo()) { } }`, Context.Empty, {
          source: 'function wrap() { function* foo(a = super(), b = super.foo()) { } }',
      });

      fail(`function wrap() { function foo(a = super(), b = super.foo()) {}}`, Context.Empty, {
          source: 'function wrap() { function foo(a = super(), b = super.foo()) {}}',
      });

      fail(`class A extends B { constructor() { super; } }`, Context.Empty, {
          source: 'class A extends B { constructor() { super; } }',
      });

      fail(`({ a() { (super).b(); } });`, Context.Empty, {
          source: '({ a() { (super).b(); } });',
      });

      fail(`({ a() { (super).b(); } });`, Context.Empty, {
          source: '({ a() { (super).b(); } });',
      });

      fail(`({ a() { (super).b(); } });`, Context.Empty, {
          source: '({ a() { (super).b(); } });',
      });

      fail(`class C { m() { new super(); }  }`, Context.Empty, {
          source: 'class C { m() { new super(); }  }',
      });

      fail(`class X { x(){super();} }`, Context.Empty, {
          source: 'class X { x(){super();} }',
      });

      fail(`() => {super();}`, Context.Empty, {
          source: '() => {super();}',
      });

      fail(`class X { x(){class X { constructor(){super();} }} }`, Context.Empty, {
          source: 'class X { x(){class X { constructor(){super();} }} }',
      });

      fail(`class X { x(){class X { x(){super();} }} }`, Context.Empty, {
          source: 'class X { x(){class X { x(){super();} }} }',
      });

      fail(`class X { x(){function x(){super();}} }`, Context.Empty, {
          source: 'class X { x(){function x(){super();}} }',
      });

      fail(`class X { x(){function x(){super.x;}} }`, Context.Empty, {
          source: 'class X { x(){function x(){super.x;}} }',
      });

      fail(`function x(){function x(){super();}}`, Context.Empty, {
          source: 'function x(){function x(){super();}}',
      });

      fail(`function x(){() => {super();}}`, Context.Empty, {
          source: 'function x(){() => {super();}}',
      });

      fail(`() => {class X { x(){super();} }}`, Context.Empty, {
          source: '() => {class X { x(){super();} }}',
      });

      fail(`() => {() => {super();}}`, Context.Empty, {
          source: '() => {() => {super();}}',
      });

      fail(`function x(){function x(){super();}}`, Context.Empty, {
        source: 'function x(){function x(){super();}}',
      });

      // Acorn: https://github.com/acornjs/acorn/issues/448

      fail(`class A extends B { *g1() { return super() } }`, Context.Empty, {
          source: 'class A extends B { *g1() { return super() } }',
      });

      // fail(`class A extends B { *g2(a = 1 + (yield 2)) { } }`, Context.Empty, {
        // source: 'class A extends B { *g2(a = 1 + (yield 2)) { } }',
    // });

      fail(`function x(){function x(){super();}}`, Context.Empty, {
        source: 'function x(){function x(){super();}}',
    });

      fail(`function x(){function x(){super();}}`, Context.Empty, {
      source: 'function x(){function x(){super();}}',
  });

      fail(`function* foo(a = 1 + (yield 2)) { super.foo() }`, Context.Empty, {
    source: '`function* foo(a = 1 + (yield 2)) { super.foo() }`,',
  });

      fail(`var foo = function*(a = 1 + (yield 2)) { super.foo() }`, Context.Empty, {
    source: '`var foo = function*(a = 1 + (yield 2)) { super.foo() }`,',
});

  });

  describe('Pass', () => {

      const SuperNewNoErrors = [
          'new super.x;', 'new super.x();',
          '() => new super.x;', '() => new super.x();'
      ];

      for (const arg of SuperNewNoErrors) {

          it(`class C { constructor() { ${arg} } }`, () => {
              t.doesNotThrow(() => {
                  parseSource(`class C { constructor() { ${arg} } }`, undefined, Context.Empty);
              });
          });

          it(`class C { *method() { ${arg} } }`, () => {
              t.doesNotThrow(() => {
                  parseSource(`class C { *method() { ${arg} } }`, undefined, Context.Empty);
              });
          });

          it(`class C { get x() { ${arg} } }`, () => {
              t.doesNotThrow(() => {
                  parseSource(`class C { get x() { ${arg} } }`, undefined, Context.Empty);
              });
          });

          it(`class C { set x(_) { ${arg} } }`, () => {
              t.doesNotThrow(() => {
                  parseSource(`class C { set x(_) { ${arg} } }`, undefined, Context.Empty);
              });
          });

          it(`({ method() { ${arg} } })`, () => {
              t.doesNotThrow(() => {
                  parseSource(`({ method() { ${arg} } })`, undefined, Context.Empty);
              });
          });

          it(`({ *method() { ${arg} } })`, () => {
              t.doesNotThrow(() => {
                  parseSource(`({ *method() { ${arg} } })`, undefined, Context.Empty);
              });
          });

          it(`(class C { get x() { ${arg} } })`, () => {
              t.doesNotThrow(() => {
                  parseSource(`(class C { get x() { ${arg} } })`, undefined, Context.Empty);
              });
          });

          it(`(class C { set x(_) { ${arg} } })`, () => {
              t.doesNotThrow(() => {
                  parseSource(`(class C { set x(_) { ${arg} } })`, undefined, Context.Empty);
              });
          });
      }

      // V8
      const validSyntax = [
          'super.x',
          'super[27]',
          'new super.x',
          'new super.x()',
          'new super[27]',
          'new super[27]()',
          'z.super',
      ];

      for (const arg of validSyntax) {

          it(`class C { m() { ${arg}; } }`, () => {
              t.doesNotThrow(() => {
                  parseSource(`class C { m() { ${arg}; } }`, undefined, Context.Empty);
              });
          });

          it(`class C { m() { k = ${arg}; } }`, () => {
              t.doesNotThrow(() => {
                  parseSource(`class C { m() { k = ${arg}; } }`, undefined, Context.Empty);
              });
          });

          it(`class C { m() { foo(${arg}); } }`, () => {
              t.doesNotThrow(() => {
                  parseSource(`class C { m() { foo(${arg}); } }`, undefined, Context.Empty);
              });
          });

          it(`class C { m() { () => ${arg}; } }`, () => {
              t.doesNotThrow(() => {
                  parseSource(`class C { m() { () => ${arg}; } }`, undefined, Context.Empty);
              });
          });
      }

      // Testing ESTree AST

      pass('({ a(){ (class {[super.a](){}}); } })', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: '({ a(){ (class {[super.a](){}}); } })',
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
              type: 'ExpressionStatement',
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
              expression: {
                type: 'ObjectExpression',
                start: 1,
                end: 36,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 36
                  }
                },
                properties: [
                  {
                    type: 'Property',
                    start: 3,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    },
                    method: true,
                    shorthand: false,
                    computed: false,
                    key: {
                      type: 'Identifier',
                      start: 3,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 3
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      },
                      name: 'a'
                    },
                    kind: 'init',
                    value: {
                      type: 'FunctionExpression',
                      start: 4,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
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
                        start: 6,
                        end: 34,
                        loc: {
                          start: {
                            line: 1,
                            column: 6
                          },
                          end: {
                            line: 1,
                            column: 34
                          }
                        },
                        body: [
                          {
                            type: 'ExpressionStatement',
                            start: 8,
                            end: 32,
                            loc: {
                              start: {
                                line: 1,
                                column: 8
                              },
                              end: {
                                line: 1,
                                column: 32
                              }
                            },
                            expression: {
                              type: 'ClassExpression',
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
                              id: null,
                              superClass: null,
                              body: {
                                type: 'ClassBody',
                                start: 15,
                                end: 30,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 15
                                  },
                                  end: {
                                    line: 1,
                                    column: 30
                                  }
                                },
                                body: [
                                  {
                                    type: 'MethodDefinition',
                                    start: 16,
                                    end: 29,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 16
                                      },
                                      end: {
                                        line: 1,
                                        column: 29
                                      }
                                    },
                                    computed: true,
                                    key: {
                                      type: 'MemberExpression',
                                      start: 17,
                                      end: 24,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 17
                                        },
                                        end: {
                                          line: 1,
                                          column: 24
                                        }
                                      },
                                      object: {
                                        type: 'Super',
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
                                        }
                                      },
                                      property: {
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
                                      computed: false
                                    },
                                    static: false,
                                    kind: 'method',
                                    value: {
                                      type: 'FunctionExpression',
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
                                      id: null,
                                      generator: false,
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
                                    }
                                  }
                                ]
                              }
                            }
                          }
                        ]
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

      pass('({ *a() { super.b = 0; } });', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: 'class A extends Object { constructor(){ (class {[super()](){}}); } }',
        expected: {
          type: 'Program',
          start: 0,
          end: 68,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 68
            }
          },
          body: [
            {
              type: 'ClassDeclaration',
              start: 0,
              end: 68,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 68
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
                name: 'A'
              },
              superClass: {
                type: 'Identifier',
                start: 16,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 22
                  }
                },
                name: 'Object'
              },
              body: {
                type: 'ClassBody',
                start: 23,
                end: 68,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 68
                  }
                },
                body: [
                  {
                    type: 'MethodDefinition',
                    start: 25,
                    end: 66,
                    loc: {
                      start: {
                        line: 1,
                        column: 25
                      },
                      end: {
                        line: 1,
                        column: 66
                      }
                    },
                    computed: false,
                    key: {
                      type: 'Identifier',
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
                      name: 'constructor'
                    },
                    static: false,
                    kind: 'constructor',
                    value: {
                      type: 'FunctionExpression',
                      start: 36,
                      end: 66,
                      loc: {
                        start: {
                          line: 1,
                          column: 36
                        },
                        end: {
                          line: 1,
                          column: 66
                        }
                      },
                      id: null,
                      generator: false,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        start: 38,
                        end: 66,
                        loc: {
                          start: {
                            line: 1,
                            column: 38
                          },
                          end: {
                            line: 1,
                            column: 66
                          }
                        },
                        body: [
                          {
                            type: 'ExpressionStatement',
                            start: 40,
                            end: 64,
                            loc: {
                              start: {
                                line: 1,
                                column: 40
                              },
                              end: {
                                line: 1,
                                column: 64
                              }
                            },
                            expression: {
                              type: 'ClassExpression',
                              start: 41,
                              end: 62,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 41
                                },
                                end: {
                                  line: 1,
                                  column: 62
                                }
                              },
                              id: null,
                              superClass: null,
                              body: {
                                type: 'ClassBody',
                                start: 47,
                                end: 62,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 47
                                  },
                                  end: {
                                    line: 1,
                                    column: 62
                                  }
                                },
                                body: [
                                  {
                                    type: 'MethodDefinition',
                                    start: 48,
                                    end: 61,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 48
                                      },
                                      end: {
                                        line: 1,
                                        column: 61
                                      }
                                    },
                                    computed: true,
                                    key: {
                                      type: 'CallExpression',
                                      start: 49,
                                      end: 56,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 49
                                        },
                                        end: {
                                          line: 1,
                                          column: 56
                                        }
                                      },
                                      callee: {
                                        type: 'Super',
                                        start: 49,
                                        end: 54,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 49
                                          },
                                          end: {
                                            line: 1,
                                            column: 54
                                          }
                                        }
                                      },
                                      arguments: []
                                    },
                                    static: false,
                                    kind: 'method',
                                    value: {
                                      type: 'FunctionExpression',
                                      start: 57,
                                      end: 61,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 57
                                        },
                                        end: {
                                          line: 1,
                                          column: 61
                                        }
                                      },
                                      id: null,
                                      generator: false,
                                      expression: false,
                                      async: false,
                                      params: [],
                                      body: {
                                        type: 'BlockStatement',
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
                                        body: []
                                      }
                                    }
                                  }
                                ]
                              }
                            }
                          }
                        ]
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

      pass('({ *a() { super.b = 0; } });', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: '({ *a() { super.b = 0; } });',
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
              type: 'ExpressionStatement',
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
              expression: {
                type: 'ObjectExpression',
                start: 1,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                },
                properties: [
                  {
                    type: 'Property',
                    start: 3,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    },
                    method: true,
                    shorthand: false,
                    computed: false,
                    key: {
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
                    kind: 'init',
                    value: {
                      type: 'FunctionExpression',
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
                      id: null,
                      generator: true,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        start: 8,
                        end: 24,
                        loc: {
                          start: {
                            line: 1,
                            column: 8
                          },
                          end: {
                            line: 1,
                            column: 24
                          }
                        },
                        body: [
                          {
                            type: 'ExpressionStatement',
                            start: 10,
                            end: 22,
                            loc: {
                              start: {
                                line: 1,
                                column: 10
                              },
                              end: {
                                line: 1,
                                column: 22
                              }
                            },
                            expression: {
                              type: 'AssignmentExpression',
                              start: 10,
                              end: 21,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 10
                                },
                                end: {
                                  line: 1,
                                  column: 21
                                }
                              },
                              operator: '=',
                              left: {
                                type: 'MemberExpression',
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
                                object: {
                                  type: 'Super',
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
                                  }
                                },
                                property: {
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
                                  name: 'b'
                                },
                                computed: false
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
                                value: 0,
                                raw: '0'
                              }
                            }
                          }
                        ]
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

      pass('class A extends B { constructor() { () => { super(); } } }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: 'class A extends B { constructor() { () => { super(); } } }',
        expected: {
          type: 'Program',
          start: 0,
          end: 58,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 58
            }
          },
          body: [
            {
              type: 'ClassDeclaration',
              start: 0,
              end: 58,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 58
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
                name: 'A'
              },
              superClass: {
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
                name: 'B'
              },
              body: {
                type: 'ClassBody',
                start: 18,
                end: 58,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 58
                  }
                },
                body: [
                  {
                    type: 'MethodDefinition',
                    start: 20,
                    end: 56,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 56
                      }
                    },
                    computed: false,
                    key: {
                      type: 'Identifier',
                      start: 20,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      },
                      name: 'constructor'
                    },
                    static: false,
                    kind: 'constructor',
                    value: {
                      type: 'FunctionExpression',
                      start: 31,
                      end: 56,
                      loc: {
                        start: {
                          line: 1,
                          column: 31
                        },
                        end: {
                          line: 1,
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
                        start: 34,
                        end: 56,
                        loc: {
                          start: {
                            line: 1,
                            column: 34
                          },
                          end: {
                            line: 1,
                            column: 56
                          }
                        },
                        body: [
                          {
                            type: 'ExpressionStatement',
                            start: 36,
                            end: 54,
                            loc: {
                              start: {
                                line: 1,
                                column: 36
                              },
                              end: {
                                line: 1,
                                column: 54
                              }
                            },
                            expression: {
                              type: 'ArrowFunctionExpression',
                              start: 36,
                              end: 54,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 36
                                },
                                end: {
                                  line: 1,
                                  column: 54
                                }
                              },
                              id: null,
                              generator: false,
                              expression: false,
                              async: false,
                              params: [],
                              body: {
                                type: 'BlockStatement',
                                start: 42,
                                end: 54,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 42
                                  },
                                  end: {
                                    line: 1,
                                    column: 54
                                  }
                                },
                                body: [
                                  {
                                    type: 'ExpressionStatement',
                                    start: 44,
                                    end: 52,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 44
                                      },
                                      end: {
                                        line: 1,
                                        column: 52
                                      }
                                    },
                                    expression: {
                                      type: 'CallExpression',
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
                                      callee: {
                                        type: 'Super',
                                        start: 44,
                                        end: 49,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 44
                                          },
                                          end: {
                                            line: 1,
                                            column: 49
                                          }
                                        }
                                      },
                                      arguments: []
                                    }
                                  }
                                ]
                              }
                            }
                          }
                        ]
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

      pass('({ *f() { yield super.f(); } })', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: '({ *f() { yield super.f(); } })',
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
              type: 'ExpressionStatement',
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
              expression: {
                type: 'ObjectExpression',
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
                properties: [
                  {
                    type: 'Property',
                    start: 3,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 28
                      }
                    },
                    method: true,
                    shorthand: false,
                    computed: false,
                    key: {
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
                      name: 'f'
                    },
                    kind: 'init',
                    value: {
                      type: 'FunctionExpression',
                      start: 5,
                      end: 28,
                      loc: {
                        start: {
                          line: 1,
                          column: 5
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
                        start: 8,
                        end: 28,
                        loc: {
                          start: {
                            line: 1,
                            column: 8
                          },
                          end: {
                            line: 1,
                            column: 28
                          }
                        },
                        body: [
                          {
                            type: 'ExpressionStatement',
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
                            expression: {
                              type: 'YieldExpression',
                              start: 10,
                              end: 25,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 10
                                },
                                end: {
                                  line: 1,
                                  column: 25
                                }
                              },
                              delegate: false,
                              argument: {
                                type: 'CallExpression',
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
                                callee: {
                                  type: 'MemberExpression',
                                  start: 16,
                                  end: 23,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 16
                                    },
                                    end: {
                                      line: 1,
                                      column: 23
                                    }
                                  },
                                  object: {
                                    type: 'Super',
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
                                    }
                                  },
                                  property: {
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
                                    name: 'f'
                                  },
                                  computed: false
                                },
                                arguments: []
                              }
                            }
                          }
                        ]
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

      pass('({ set a(x) { super.b[0] = 1; } });', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: '({ set a(x) { super.b[0] = 1; } });',
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
          body: [
            {
              type: 'ExpressionStatement',
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
              expression: {
                type: 'ObjectExpression',
                start: 1,
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 33
                  }
                },
                properties: [
                  {
                    type: 'Property',
                    start: 3,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    },
                    method: false,
                    shorthand: false,
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
                      name: 'a'
                    },
                    kind: 'set',
                    value: {
                      type: 'FunctionExpression',
                      start: 8,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 8
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      },
                      id: null,
                      generator: false,
                      expression: false,
                      async: false,
                      params: [
                        {
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
                      ],
                      body: {
                        type: 'BlockStatement',
                        start: 12,
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 12
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        },
                        body: [
                          {
                            type: 'ExpressionStatement',
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
                            expression: {
                              type: 'AssignmentExpression',
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
                              operator: '=',
                              left: {
                                type: 'MemberExpression',
                                start: 14,
                                end: 24,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 14
                                  },
                                  end: {
                                    line: 1,
                                    column: 24
                                  }
                                },
                                object: {
                                  type: 'MemberExpression',
                                  start: 14,
                                  end: 21,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 14
                                    },
                                    end: {
                                      line: 1,
                                      column: 21
                                    }
                                  },
                                  object: {
                                    type: 'Super',
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
                                    }
                                  },
                                  property: {
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
                                  computed: false
                                },
                                property: {
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
                                  value: 0,
                                  raw: '0'
                                },
                                computed: true
                              },
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
                            }
                          }
                        ]
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

      pass('class a extends b { constructor() { () => { super(); } } }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'class a extends b { constructor() { () => { super(); } } }',
          expected: {
              type: 'Program',
              start: 0,
              end: 58,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 58
                }
              },
              body: [
                {
                  type: 'ClassDeclaration',
                  start: 0,
                  end: 58,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 58
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
                    name: 'a'
                  },
                  superClass: {
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
                    name: 'b'
                  },
                  body: {
                    type: 'ClassBody',
                    start: 18,
                    end: 58,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 58
                      }
                    },
                    body: [
                      {
                        type: 'MethodDefinition',
                        start: 20,
                        end: 56,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 56
                          }
                        },
                        computed: false,
                        key: {
                          type: 'Identifier',
                          start: 20,
                          end: 31,
                          loc: {
                            start: {
                              line: 1,
                              column: 20
                            },
                            end: {
                              line: 1,
                              column: 31
                            }
                          },
                          name: 'constructor'
                        },
                        static: false,
                        kind: 'constructor',
                        value: {
                          type: 'FunctionExpression',
                          start: 31,
                          end: 56,
                          loc: {
                            start: {
                              line: 1,
                              column: 31
                            },
                            end: {
                              line: 1,
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
                            start: 34,
                            end: 56,
                            loc: {
                              start: {
                                line: 1,
                                column: 34
                              },
                              end: {
                                line: 1,
                                column: 56
                              }
                            },
                            body: [
                              {
                                type: 'ExpressionStatement',
                                start: 36,
                                end: 54,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 36
                                  },
                                  end: {
                                    line: 1,
                                    column: 54
                                  }
                                },
                                expression: {
                                  type: 'ArrowFunctionExpression',
                                  start: 36,
                                  end: 54,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 36
                                    },
                                    end: {
                                      line: 1,
                                      column: 54
                                    }
                                  },
                                  id: null,
                                  generator: false,
                                  expression: false,
                                  async: false,
                                  params: [],
                                  body: {
                                    type: 'BlockStatement',
                                    start: 42,
                                    end: 54,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 42
                                      },
                                      end: {
                                        line: 1,
                                        column: 54
                                      }
                                    },
                                    body: [
                                      {
                                        type: 'ExpressionStatement',
                                        start: 44,
                                        end: 52,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 44
                                          },
                                          end: {
                                            line: 1,
                                            column: 52
                                          }
                                        },
                                        expression: {
                                          type: 'CallExpression',
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
                                          callee: {
                                            type: 'Super',
                                            start: 44,
                                            end: 49,
                                            loc: {
                                              start: {
                                                line: 1,
                                                column: 44
                                              },
                                              end: {
                                                line: 1,
                                                column: 49
                                              }
                                            }
                                          },
                                          arguments: []
                                        }
                                      }
                                    ]
                                  }
                                }
                              }
                            ]
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

      pass('class C { get m() { super.x; } }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'class C { get m() { super.x; } }',
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
                  type: 'ClassDeclaration',
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
                    name: 'C'
                  },
                  superClass: null,
                  body: {
                    type: 'ClassBody',
                    start: 8,
                    end: 32,
                    loc: {
                      start: {
                        line: 1,
                        column: 8
                      },
                      end: {
                        line: 1,
                        column: 32
                      }
                    },
                    body: [
                      {
                        type: 'MethodDefinition',
                        start: 10,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 10
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        },
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
                          name: 'm'
                        },
                        static: false,
                        kind: 'get',
                        value: {
                          type: 'FunctionExpression',
                          start: 15,
                          end: 30,
                          loc: {
                            start: {
                              line: 1,
                              column: 15
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
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            start: 18,
                            end: 30,
                            loc: {
                              start: {
                                line: 1,
                                column: 18
                              },
                              end: {
                                line: 1,
                                column: 30
                              }
                            },
                            body: [
                              {
                                type: 'ExpressionStatement',
                                start: 20,
                                end: 28,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 20
                                  },
                                  end: {
                                    line: 1,
                                    column: 28
                                  }
                                },
                                expression: {
                                  type: 'MemberExpression',
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
                                  object: {
                                    type: 'Super',
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
                                    }
                                  },
                                  property: {
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
                                  computed: false
                                }
                              }
                            ]
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

      pass('class C { get m() {new super[27]() } }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'class C { get m() {new super[27]() } }',
          expected: {
              type: 'Program',
              sourceType: 'script',
              body: [
                  {
                      type: 'ClassDeclaration',
                      id: {
                          type: 'Identifier',
                          name: 'C',
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
                          }
                      },
                      superClass: null,
                      body: {
                          type: 'ClassBody',
                          body: [
                              {
                                  type: 'MethodDefinition',
                                  kind: 'get',
                                  static: false,
                                  computed: false,
                                  key: {
                                      type: 'Identifier',
                                      name: 'm',
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
                                  },
                                  value: {
                                      type: 'FunctionExpression',
                                      params: [],
                                      body: {
                                          type: 'BlockStatement',
                                          body: [
                                              {
                                                  type: 'ExpressionStatement',
                                                  expression: {
                                                      type: 'NewExpression',
                                                      callee: {
                                                          type: 'MemberExpression',
                                                          object: {
                                                              type: 'Super',
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
                                                              }
                                                          },
                                                          computed: true,
                                                          property: {
                                                              type: 'Literal',
                                                              value: 27,
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
                                                              raw: '27'
                                                          },
                                                          start: 19,
                                                          end: 32,
                                                          loc: {
                                                              start: {
                                                                  line: 1,
                                                                  column: 19
                                                              },
                                                              end: {
                                                                  line: 1,
                                                                  column: 32
                                                              }
                                                          }
                                                      },
                                                      arguments: [],
                                                      start: 19,
                                                      end: 34,
                                                      loc: {
                                                          start: {
                                                              line: 1,
                                                              column: 19
                                                          },
                                                          end: {
                                                              line: 1,
                                                              column: 34
                                                          }
                                                      }
                                                  },
                                                  start: 19,
                                                  end: 34,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 19
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 34
                                                      }
                                                  }
                                              }
                                          ],
                                          start: 18,
                                          end: 36,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 18
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 36
                                              }
                                          }
                                      },
                                      async: false,
                                      generator: false,
                                      expression: false,
                                      id: null,
                                      start: 15,
                                      end: 36,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 15
                                          },
                                          end: {
                                              line: 1,
                                              column: 36
                                          }
                                      }
                                  },
                                  start: 10,
                                  end: 36,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 10
                                      },
                                      end: {
                                          line: 1,
                                          column: 36
                                      }
                                  }
                              }
                          ],
                          start: 8,
                          end: 38,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 38
                              }
                          }
                      },
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
                      }
                  }
              ],
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
              }
          }
      });

      pass('class C { set m(a) { () => z.super ; } }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'class C { set m(a) { () => z.super ; } }',
          expected: {
              type: 'Program',
              start: 0,
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 40
                }
              },
              body: [
                {
                  type: 'ClassDeclaration',
                  start: 0,
                  end: 40,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 40
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
                    name: 'C'
                  },
                  superClass: null,
                  body: {
                    type: 'ClassBody',
                    start: 8,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 8
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    },
                    body: [
                      {
                        type: 'MethodDefinition',
                        start: 10,
                        end: 38,
                        loc: {
                          start: {
                            line: 1,
                            column: 10
                          },
                          end: {
                            line: 1,
                            column: 38
                          }
                        },
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
                          name: 'm'
                        },
                        static: false,
                        kind: 'set',
                        value: {
                          type: 'FunctionExpression',
                          start: 15,
                          end: 38,
                          loc: {
                            start: {
                              line: 1,
                              column: 15
                            },
                            end: {
                              line: 1,
                              column: 38
                            }
                          },
                          id: null,
                          generator: false,
                          expression: false,
                          async: false,
                          params: [
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
                              name: 'a'
                            }
                          ],
                          body: {
                            type: 'BlockStatement',
                            start: 19,
                            end: 38,
                            loc: {
                              start: {
                                line: 1,
                                column: 19
                              },
                              end: {
                                line: 1,
                                column: 38
                              }
                            },
                            body: [
                              {
                                type: 'ExpressionStatement',
                                start: 21,
                                end: 36,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 21
                                  },
                                  end: {
                                    line: 1,
                                    column: 36
                                  }
                                },
                                expression: {
                                  type: 'ArrowFunctionExpression',
                                  start: 21,
                                  end: 34,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 21
                                    },
                                    end: {
                                      line: 1,
                                      column: 34
                                    }
                                  },
                                  id: null,
                                  generator: false,
                                  expression: true,
                                  async: false,
                                  params: [],
                                  body: {
                                    type: 'MemberExpression',
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
                                    object: {
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
                                      name: 'z'
                                    },
                                    property: {
                                      type: 'Identifier',
                                      start: 29,
                                      end: 34,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 29
                                        },
                                        end: {
                                          line: 1,
                                          column: 34
                                        }
                                      },
                                      name: 'super'
                                    },
                                    computed: false
                                  }
                                }
                              }
                            ]
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

      pass('class A extends B { "constructor"() { super() } }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'class A extends B { "constructor"() { super() } }',
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
              body: [
                {
                  type: 'ClassDeclaration',
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
                    name: 'A'
                  },
                  superClass: {
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
                    name: 'B'
                  },
                  body: {
                    type: 'ClassBody',
                    start: 18,
                    end: 49,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 49
                      }
                    },
                    body: [
                      {
                        type: 'MethodDefinition',
                        start: 20,
                        end: 47,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 47
                          }
                        },
                        computed: false,
                        key: {
                          type: 'Literal',
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
                          value: 'constructor',
                          raw: '"constructor"'
                        },
                        static: false,
                        kind: 'constructor',
                        value: {
                          type: 'FunctionExpression',
                          start: 33,
                          end: 47,
                          loc: {
                            start: {
                              line: 1,
                              column: 33
                            },
                            end: {
                              line: 1,
                              column: 47
                            }
                          },
                          id: null,
                          generator: false,
                          expression: false,
                          async: false,
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            start: 36,
                            end: 47,
                            loc: {
                              start: {
                                line: 1,
                                column: 36
                              },
                              end: {
                                line: 1,
                                column: 47
                              }
                            },
                            body: [
                              {
                                type: 'ExpressionStatement',
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
                                expression: {
                                  type: 'CallExpression',
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
                                  callee: {
                                    type: 'Super',
                                    start: 38,
                                    end: 43,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 38
                                      },
                                      end: {
                                        line: 1,
                                        column: 43
                                      }
                                    }
                                  },
                                  arguments: []
                                }
                              }
                            ]
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

      pass('class A extends B { constructor(a = super()){} }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'class A extends B { constructor(a = super()){} }',
          expected: {
              type: 'Program',
              start: 0,
              end: 48,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 48
                }
              },
              body: [
                {
                  type: 'ClassDeclaration',
                  start: 0,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 48
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
                    name: 'A'
                  },
                  superClass: {
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
                    name: 'B'
                  },
                  body: {
                    type: 'ClassBody',
                    start: 18,
                    end: 48,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 48
                      }
                    },
                    body: [
                      {
                        type: 'MethodDefinition',
                        start: 20,
                        end: 46,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 46
                          }
                        },
                        computed: false,
                        key: {
                          type: 'Identifier',
                          start: 20,
                          end: 31,
                          loc: {
                            start: {
                              line: 1,
                              column: 20
                            },
                            end: {
                              line: 1,
                              column: 31
                            }
                          },
                          name: 'constructor'
                        },
                        static: false,
                        kind: 'constructor',
                        value: {
                          type: 'FunctionExpression',
                          start: 31,
                          end: 46,
                          loc: {
                            start: {
                              line: 1,
                              column: 31
                            },
                            end: {
                              line: 1,
                              column: 46
                            }
                          },
                          id: null,
                          generator: false,
                          expression: false,
                          async: false,
                          params: [
                            {
                              type: 'AssignmentPattern',
                              start: 32,
                              end: 43,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 32
                                },
                                end: {
                                  line: 1,
                                  column: 43
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
                              right: {
                                type: 'CallExpression',
                                start: 36,
                                end: 43,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 36
                                  },
                                  end: {
                                    line: 1,
                                    column: 43
                                  }
                                },
                                callee: {
                                  type: 'Super',
                                  start: 36,
                                  end: 41,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 36
                                    },
                                    end: {
                                      line: 1,
                                      column: 41
                                    }
                                  }
                                },
                                arguments: []
                              }
                            }
                          ],
                          body: {
                            type: 'BlockStatement',
                            start: 44,
                            end: 46,
                            loc: {
                              start: {
                                line: 1,
                                column: 44
                              },
                              end: {
                                line: 1,
                                column: 46
                              }
                            },
                            body: []
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
