import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Statements - For of', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

      const invalidDestructuring = [
          'for(var [] = 0 of {});',
          'for(var [,] = 0 of {});',
          'for(var [a] = 0 of {});',
          'for(var [a = 0] = 0 of {});',
          'for(var [...a] = 0 of {});',
          'for(var [...[]] = 0 of {});',
          'for(var [...[a]] = 0 of {});',
          'for(var {} = 0 of {});',
          'for(var {p: x} = 0 of {});',
          'for(var {p: x = 0} = 0 of {});',
          'for(var {x} = 0 of {});',
          'for(var {x = 0} = 0 of {});',
          'for(let x = 0 of {});',
          'for(let [] = 0 of {});',
          'for(let [,] = 0 of {});',
          'for(let [a] = 0 of {});',
          'for(let [a = 0] = 0 of {});',
          'for(let [...a] = 0 of {});',
          'for(let [...[]] = 0 of {});',
          'for(let [...[a]] = 0 of {});',
          'for(let {} = 0 of {});',
          'for(let {p: x} = 0 of {});',
          'for(let {p: x = 0} = 0 of {});',
          'for(let {x} = 0 of {});',
          'for(let {x = 0} = 0 of {});',
          'for(const x = 0 of {});',
          'for(const [] = 0 of {});',
          'for(const [,] = 0 of {});',
          'for(const [a] = 0 of {});',
          'for(const [a = 0] = 0 of {});',
          'for(const [...a] = 0 of {});',
          'for(const [...[]] = 0 of {});',
          'for(const [...[a]] = 0 of {});',
          'for(const {} = 0 of {});',
          'for(const {p: x} = 0 of {});',
          'for(const {p: x = 0} = 0 of {});',
          'for(const {x} = 0 of {});',
          'for(const {x = 0} = 0 of {});',
          'for(x = 0 of {});',
          'for([] = 0 of {});',
          'for([,] = 0 of {});',
          'for([a] = 0 of {});',
          'for([a = 0] = 0 of {});',
          'for([...a] = 0 of {});',
          'for([...[]] = 0 of {});',
          'for([...[a]] = 0 of {});',
          'for({} = 0 of {});',
          'for({p: x} = 0 of {});',
          'for({p: x = 0} = 0 of {});',
          'for({x} = 0 of {});',
          'for({x = 0} = 0 of {});',
          'for(o.p = 0 of {});',
          'for(o[0] = 0 of {});',
          'for(f() = 0 of {});',
          'for(({a}) of 0);',
          'for(([a]) of 0);',
      ];

      for (const arg of invalidDestructuring) {
          it(`${arg}`, () => {
              t.throws(() => {
                  parseSource(`${arg}`, undefined, Context.Empty);
              });
          });
      }

      const invalidSyntax = [
          'for (var {a: []} = 2 of []) { }',
          'for (var [x] = x of y) var x;',
          'function () { for (let x of bar) { } }',
          'function () { for (let x of { }) { } }',
          'function () { for (let x of 0) { } }',
          'for (var i, j of {}) {}',
          'for (var i, j of [1, 2, 3]) {}',
          'for (var i, j = 1 of {}) {}',
          'for (var i, j = void 0 of [1, 2, 3]) {}',
          'for(([a]) of 0);',
          'for(({a}) of 0);',
          'for(var a of b, c);',
          'for (let i, j of {}) {}',
          'for (let i, j of [1, 2, 3]) {}',
          'for (let i, j = 1 of {}) {}',
          'for (let i, j = void 0 of [1, 2, 3]) {}',

          'for (const i, j of {}) {}',
          'for (const i, j of [1, 2, 3]) {}',
          'for (const i, j = 1 of {}) {}',
          'for (const i, j = void 0 of [1, 2, 3]) {}'
      ];

      for (const arg of invalidSyntax) {

          it(`${arg}`, () => {
              t.throws(() => {
                  parseSource(`${arg}`, undefined, Context.Empty);
              });
          });

          it(`"use strict"; ${arg}`, () => {
              t.throws(() => {
                  parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
              });
          });
      }

      fail('function foo(){ "use strict"; for (let i = void 0 of [1, 2, 3]) {}}', Context.Empty, {
           source: 'function foo(){ "use strict"; for (let i = void 0 of [1, 2, 3]) {}',
          });

      fail('function foo(){ "use strict"; for (let i = 1 of {}) {}}', Context.Empty, {
           source: 'function foo(){ "use strict"; for (let i = 1 of {}) {}}',
          });

      fail('function foo(){ "use strict"; for (const i = void 0 in [1, 2, 3]) {}}', Context.Empty, {
            source: 'function foo(){ "use strict"; for (const i = void 0 in [1, 2, 3]) {}}',
          });

      fail('function foo(){ var yield = 0;  for (let i = 1 of {}) {}}', Context.Empty, {
            source: 'function foo(){ var yield = 0;  for (let i = 1 of {}) {}}',
          });

      fail('for(const x = 4, y of [1,2,3]) {}', Context.Empty, {
          source: 'for(const x = 4, y of [1,2,3]) {}',
        });

      fail('for(const x = 4, y of [1,2,3]) {}', Context.Empty, {
              source: 'for(const x = 4, y of [1,2,3]) {}',
          });

      fail('for(const x,y of []) {}', Context.Empty, {
              source: 'for(const x,y of []) {}',
          });

      fail('for (const i = void 0 of [1, 2, 3]) {}', Context.Empty, {
              source: 'for (const i = void 0 of [1, 2, 3]) {}',
          });

      fail('for (var i = void 0 of [1, 2, 3]) {}', Context.Empty, {
              source: 'for (var i = void 0 of [1, 2, 3]) {}',
          });

      fail('for (var i = 1 of {}) {}', Context.Empty, {
              source: 'for (var i = 1 of {}) {}',
          });

      fail('for (const x = 0 of {});', Context.Empty, {
              source: 'for (const x = 0 of {});',
          });

      fail('for (let x = 0 of {});', Context.Empty, {
              source: 'for (let x = 0 of {});',
          });

      fail('for (var x = 0 of {});', Context.Empty, {
              source: 'for (var x = 0 of {});',
          });

      fail('for (let x = 0 of {});', Context.Empty, {
              source: 'for (let x = 0 of {});',
          });

      fail('for (x=0 of y);', Context.Empty, {
              source: 'for (x=0 of y);',
          });

      fail('for (const x = 1 of y);', Context.Empty, {
              source: 'for (const x = 1 of y);',
          });

      fail('for (var [p]=q of r);', Context.Empty, {
              source: 'for (var [p]=q of r);',
          });

      fail('"for (var i = void 0 of [1, 2, 3]) {}', Context.Empty, {
              source: '"for (var i = void 0 of [1, 2, 3]) {}',
          });

      fail('for (var i = 1 of {}) {}', Context.Empty, {
              source: 'for (var i = 1 of {}) {}',
          });

      fail('for (var i = yield of [1, 2, 3]) {}', Context.Empty, {
              source: 'for (var i = yield of [1, 2, 3]) {}',
          });

      fail('function foo() { for (let i, j = 1 of {}) {} }', Context.Empty, {
              source: 'function foo() { for (let i, j = 1 of {}) {} }',
          });

      fail('function foo() { for (const i, j = void 0 of [1, 2, 3]) {} }', Context.Empty, {
              source: 'function foo() { for (const i, j = void 0 of [1, 2, 3]) {} }',
          });

      fail('for (const x = 1 of y);', Context.Empty, {
              source: 'for (const x = 1 of y);',
          });

      fail('for (var x = 1 of y);', Context.Empty, {
              source: 'for (var x = 1 of y);',
          });

      fail('for (const let of y);', Context.Empty, {
              source: 'for (const let of y);',
          });

      fail('for (const let of y);', Context.Empty, {
              source: 'for (const let of y);',
          });

      fail('for (var {x} = y of z);', Context.Empty, {
              source: 'for (var {x} = y of z);',
          });

      fail('for (var [p]=q of r);', Context.Empty, {
              source: 'for (var [p]=q of r);',
          });

      fail('for (let x = 1 of y);', Context.Empty, {
              source: 'for (let x = 1 of y);',
          });

      fail('for (this of that);', Context.Empty, {
              source: 'for (this of that);',
          });

      fail(`"use strict"; for (x of let) {}`, Context.Empty, {
              source: `"use strict"; for (x of let) {}`,
          });

      fail('for (let let of x);', Context.Empty, {
              source: 'for (let let of x);',
          });

      fail('for (const of 42);', Context.Empty, {
              source: 'for (const of 42);',
          });

      fail('for (var i, j of {}) {}', Context.Empty, {
              source: 'for (var i, j of {}) {}',
          });

      fail('for(x of [], []) {}', Context.Empty, {
              source: 'for(x of [], []) {}',
          });

      fail('for(x of [], []) {}', Context.Empty, {
              source: 'for(x of [], []) {}',
          });

      fail('for(x of [], []) {}', Context.Empty, {
              source: 'for(x of [], []) {}',
          });

      fail('for(var a of b, c);', Context.Empty, {
              source: 'for(var a of b, c);',
          });

      fail('for(a of b, c);', Context.Empty, {
              source: 'for(a of b, c);',
          });

      fail('for (var x of []) async function f() {}', Context.Empty, {
              source: 'for (var x of []) async function f() {}',
          });

      fail('for (var x of []) async function* g() {}', Context.Empty, {
              source: 'for (var x of []) async function* g() {}',
          });

      fail('for (var x of []) class C {}', Context.Empty, {
              source: 'for (var x of []) class C {}',
          });

      fail('for (var x of []) const y = null;', Context.Empty, {
              source: 'for (var x of []) const y = null;',
          });

      fail('for (var x of []) function f() {}', Context.Empty, {
              source: 'for (var x of []) function f() {}',
          });

      fail('for (var x of []) function* g() {}', Context.Empty, {
              source: 'for (var x of []) function* g() {}',
          });

      fail('for (var x of []) let y;', Context.Empty, {
              source: 'for (var x of []) let y;',
          });

      fail('"use strict"; for ([ x = yield ] of [[]]) ;', Context.Empty, {
              source: '"use strict"; for ([ x = yield ] of [[]]) ;',
          });

      fail('for ([[(x, y)]] of [[[]]]) ;', Context.Empty, {
              source: 'for ([[(x, y)]] of [[[]]]) ;',
          });

      fail('"use strict"; for ([[x[yield]]] of [[[]]]) ;', Context.Empty, {
              source: '"use strict"; for ([[x[yield]]] of [[[]]]) ;',
          });

      fail('for ([{ get x() {} }] of [[{}]]) ;', Context.Empty, {
              source: 'for ([{ get x() {} }] of [[{}]]) ;',
          });

      fail('"use strict"; for ([{ x = yield }] of [[{}]]) ;', Context.Empty, {
              source: '"use strict"; for ([{ x = yield }] of [[{}]]) ;',
      });

      fail('"use strict"; for ([ x[yield] ] of [[]]) ;', Context.Empty, {
              source: '"use strict"; for ([ x[yield] ] of [[]]) ;',
          });

      fail('for ([...x, y] of [[]]) ;', Context.Empty, {
              source: 'for ([...x, y] of [[]]) ;',
          });

      fail('for ([...x,] of [[]]) ;', Context.Empty, {
              source: 'for ([...x,] of [[]]) ;',
          });

      fail('for ([...x,] of [[]]) ;', Context.Empty, {
              source: 'for ([...x,] of [[]]) ;',
          });

      fail('for ([...[(x, y)]] of [[[]]]) ;', Context.Empty, {
              source: 'for ([...[(x, y)]] of [[[]]]) ;',
          });

      fail('"use strict"; for ([...[x[yield]]] of [[]]) ;', Context.Empty, {
              source: '"use strict"; for ([...[x[yield]]] of [[]]) ;',
          });

      fail('for ([...{ get x() {} }] of [[[]]]) ;', Context.Empty, {
              source: 'for ([...{ get x() {} }] of [[[]]]) ;',
          });

      fail('"use strict"; for ([...{ x = yield }] of [[{}]]) ;', Context.Empty, {
              source: '"use strict"; for ([...{ x = yield }] of [[{}]]) ;',
          });

      fail('"use strict"; for ([...x[yield]] of [[]]) ;', Context.Empty, {
              source: '"use strict"; for ([...x[yield]] of [[]]) ;',
          });

      fail('for (const [...[ x ] = []] of [[]]) {}', Context.Empty, {
              source: 'for (const [...[ x ] = []] of [[]]) {}',
          });

      fail('for (const [...x = []] of [[]]) {}', Context.Empty, {
              source: 'for (const [...x = []] of [[]]) {}',
          });

      fail('for (const [...{ x } = []] of [[]]) {}', Context.Empty, {
              source: 'for (const [...{ x } = []] of [[]]) {}',
          });

      fail('for (const [...[x], y] of [[1, 2, 3]]) {}', Context.Empty, {
              source: 'for (const [...[x], y] of [[1, 2, 3]]) {}',
          });

      fail('for (const [...x, y] of [[1, 2, 3]]) {}', Context.Empty, {
              source: 'for (const [...x, y] of [[1, 2, 3]]) {}',
          });

      fail('for (const [...{ x }, y] of [[1, 2, 3]]) {}', Context.Empty, {
              source: 'for (const [...{ x }, y] of [[1, 2, 3]]) {}',
          });

      fail('for (let [...[ x ] = []] of [[]]) {}', Context.Empty, {
              source: 'for (let [...[ x ] = []] of [[]]) {}',
          });

      fail('for (let [...x = []] of [[]]) {}', Context.Empty, {
              source: 'for (let [...x = []] of [[]]) {}',
          });

      fail('for (let [...{ x } = []] of [[]]) {}', Context.Empty, {
              source: 'for (let [...{ x } = []] of [[]]) {}',
          });

      fail('"use strict"; for ({ x = yield } of [{}]) ;', Context.Empty, {
              source: '"use strict"; for ({ x = yield } of [{}]) ;',
          });

      fail('"use strict"; for(const x of yield) {}', Context.Empty, {
              source: '"use strict"; for(const x of yield) {}',
          });

      fail('"use strict"; for ({ x: x = yield } of [{}]) ;', Context.Empty, {
              source: '"use strict"; for ({ x: x = yield } of [{}]) ;',
          });

      fail('for ({ x: [(x, y)] } of [{ x: [] }]) ;', Context.Empty, {
              source: 'for ({ x: [(x, y)] } of [{ x: [] }]) ;',
          });

      fail('for ({ x: { get x() {} } } of [{ x: {} }]) ;', Context.Empty, {
              source: 'for ({ x: { get x() {} } } of [{ x: {} }]) ;',
          });

      fail('for (var [...[ x ] = []] of [[]]) {}', Context.Empty, {
              source: 'for (var [...[ x ] = []] of [[]]) {}',
          });

      fail('for (var [...x = []] of [[]]) {}', Context.Empty, {
              source: 'for (var [...x = []] of [[]]) {}',
          });

      fail('for (var [...{ x } = []] of [[]]) {}', Context.Empty, {
              source: 'for (var [...{ x } = []] of [[]]) {}',
          });

      fail('for (var [...[x], y] of [[1, 2, 3]]) {}', Context.Empty, {
              source: 'for (var [...[x], y] of [[1, 2, 3]]) {}',
          });

      fail('for (let x of [], []) {}', Context.Empty, {
              source: 'for (let x of [], []) {}',
          });

      });

    describe('Pass', () => {

          const programs = [
              'for({a=0} of b);',
              'for (let of of ([0])) { }',
              'for (let of of [0]) { }',
              'for (let of; false; ) { }',
              'for (let of, bar; false; ) { }',
              'for (let of = 10; false; ) { }',
              'for (j of x) { foo = j }',
              'for (j of x) { [foo] = [j] }',
              'for (j of x) { var foo = j }',
              'for (j of x) { var [foo] = [j] }',
              'for (j of x) { const [foo] = [j] }',
              'for (j of x) { function foo() {return j} }',
              'for ({j} of x) { foo = j }',
              'for ({j} of x) { let foo = j }',
              'for ({j} of x) { function foo() {return j} }',
              'for (var {j} of x) { foo = j }',
              'for (var {j} of x) { let foo = j }',
              'for (let j of x) { const [foo] = [j] }',
              'for (let j of x) { [foo] = [j] }',
              'for (let {j} of x) { [foo] = [j] }',
              'for ( let x of y ) {}',
              `var x, y;
              for ({x, y} of [{x: 1, y: 2}]) {}`,
              `var x, y;
              for ([x, y] of [[1, 2]]) {
                console.log(x, y);
              }`,
              `function foo () {
				          for ( let x of y ) {
					      bar( function () {
						      call( x ); // call expression
					    });
					      if ( x > 10 ) return;
				        }
			        }`,
              'for (let {j} of x) { foo = j }',
              `for ( var i = 0, list = items; i < list.length; i += 1 ) {
				        var item = list[i];
				          if ( item.foo ) { continue; }
			        }`,
              `for ( x of y ) {}`,
              `for ( let member of [ 'a', 'b', 'c' ] ) {
				        setTimeout( function () {
					      doSomething( member );
				        });
			         }`,
              `for ( let member of array ) { doSomething( member ); }`,
              'for (const {j} of x) { const [foo] = [j] }',
              'for (const {j} of x) { var [foo] = [j] }',
          ];

          for (const arg of programs) {
              it(`${arg}`, () => {
                  t.doesNotThrow(() => {
                      parseSource(`${arg}`, undefined, Context.Empty);
                  });
              });
          }

          pass(`for ([] of [{ next: function() {return { done: true }; },return: function() {return {}; }}]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for ([] of [{ next: function() {return { done: true }; },return: function() {return {}; }}]) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 95,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 95
                }
              },
              body: [
                {
                  type: 'ForOfStatement',
                  await: false,
                  start: 0,
                  end: 95,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 95
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
                    type: 'ArrayExpression',
                    start: 11,
                    end: 91,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 91
                      }
                    },
                    elements: [
                      {
                        type: 'ObjectExpression',
                        start: 12,
                        end: 90,
                        loc: {
                          start: {
                            line: 1,
                            column: 12
                          },
                          end: {
                            line: 1,
                            column: 90
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 14,
                            end: 56,
                            loc: {
                              start: {
                                line: 1,
                                column: 14
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
                              },
                              name: 'next'
                            },
                            value: {
                              type: 'FunctionExpression',
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
                              id: null,
                              generator: false,
                              expression: false,
                              async: false,
                              params: [],
                              body: {
                                type: 'BlockStatement',
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
                                body: [
                                  {
                                    type: 'ReturnStatement',
                                    start: 32,
                                    end: 54,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 32
                                      },
                                      end: {
                                        line: 1,
                                        column: 54
                                      }
                                    },
                                    argument: {
                                      type: 'ObjectExpression',
                                      start: 39,
                                      end: 53,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 39
                                        },
                                        end: {
                                          line: 1,
                                          column: 53
                                        }
                                      },
                                      properties: [
                                        {
                                          type: 'Property',
                                          start: 41,
                                          end: 51,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 41
                                            },
                                            end: {
                                              line: 1,
                                              column: 51
                                            }
                                          },
                                          method: false,
                                          shorthand: false,
                                          computed: false,
                                          key: {
                                            type: 'Identifier',
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
                                            name: 'done'
                                          },
                                          value: {
                                            type: 'Literal',
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
                                            value: true,
                                            raw: 'true'
                                          },
                                          kind: 'init'
                                        }
                                      ]
                                    }
                                  }
                                ]
                              }
                            },
                            kind: 'init'
                          },
                          {
                            type: 'Property',
                            start: 57,
                            end: 89,
                            loc: {
                              start: {
                                line: 1,
                                column: 57
                              },
                              end: {
                                line: 1,
                                column: 89
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 57,
                              end: 63,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 57
                                },
                                end: {
                                  line: 1,
                                  column: 63
                                }
                              },
                              name: 'return'
                            },
                            value: {
                              type: 'FunctionExpression',
                              start: 65,
                              end: 89,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 65
                                },
                                end: {
                                  line: 1,
                                  column: 89
                                }
                              },
                              id: null,
                              generator: false,
                              expression: false,
                              async: false,
                              params: [],
                              body: {
                                type: 'BlockStatement',
                                start: 76,
                                end: 89,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 76
                                  },
                                  end: {
                                    line: 1,
                                    column: 89
                                  }
                                },
                                body: [
                                  {
                                    type: 'ReturnStatement',
                                    start: 77,
                                    end: 87,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 77
                                      },
                                      end: {
                                        line: 1,
                                        column: 87
                                      }
                                    },
                                    argument: {
                                      type: 'ObjectExpression',
                                      start: 84,
                                      end: 86,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 84
                                        },
                                        end: {
                                          line: 1,
                                          column: 86
                                        }
                                      },
                                      properties: []
                                    }
                                  }
                                ]
                              }
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    ]
                  },
                  body: {
                    type: 'BlockStatement',
                    start: 93,
                    end: 95,
                    loc: {
                      start: {
                        line: 1,
                        column: 93
                      },
                      end: {
                        line: 1,
                        column: 95
                      }
                    },
                    body: []
                  }
                }
              ],
              sourceType: 'script'
            }
         });

          pass(`for(x of yield) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(x of yield) {}`,
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
                type: 'ForOfStatement',
                await: false,
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
                  type: 'Identifier',
                  start: 9,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  },
                  name: 'yield'
                },
                body: {
                  type: 'BlockStatement',
                  start: 16,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  },
                  body: []
                }
              }
            ],
            sourceType: 'script'
          }
        });

          pass(`for(let x of yield) {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(let x of yield) {}`,
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
                type: 'ForOfStatement',
                await: false,
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
                left: {
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
                  declarations: [
                    {
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
                        name: 'x'
                      },
                      init: null
                    }
                  ],
                  kind: 'let'
                },
                right: {
                  type: 'Identifier',
                  start: 13,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 13
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  },
                  name: 'yield'
                },
                body: {
                  type: 'BlockStatement',
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
                  body: []
                }
              }
            ],
            sourceType: 'script'
          }
        });

          pass(`function* g() { for(x of yield) {} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function* g() { for(x of yield) {} }`,
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
                  name: 'g'
                },
                generator: true,
                expression: false,
                async: false,
                params: [],
                body: {
                  type: 'BlockStatement',
                  start: 14,
                  end: 36,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
                  },
                  body: [
                    {
                      type: 'ForOfStatement',
                      await: false,
                      start: 16,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 34
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
                        type: 'YieldExpression',
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
                        delegate: false,
                        argument: null
                      },
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
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
        });

          pass(`"for (var x of list) process(x);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (var x of list) process(x);`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'VariableDeclaration',
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
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
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
                              },
                              init: null
                          }],
                          kind: 'var'
                      },
                      right: {
                          type: 'Identifier',
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
                          },
                          name: 'list'
                      },
                      body: {
                          type: 'ExpressionStatement',
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
                          expression: {
                              type: 'CallExpression',
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
                              callee: {
                                  type: 'Identifier',
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
                                  name: 'process'
                              },
                              arguments: [{
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
                              }]
                          }
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`function* g() { for(var x of yield) {} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `function* g() { for(var x of yield) {} }`,
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
                  body: [{
                      type: 'FunctionDeclaration',
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
                          name: 'g'
                      },
                      generator: true,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                          type: 'BlockStatement',
                          start: 14,
                          end: 40,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 14
                              },
                              end: {
                                  line: 1,
                                  column: 40
                              }
                          },
                          body: [{
                              type: 'ForOfStatement',
                              await: false,
                              start: 16,
                              end: 38,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 16
                                  },
                                  end: {
                                      line: 1,
                                      column: 38
                                  }
                              },
                              left: {
                                  type: 'VariableDeclaration',
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
                                  declarations: [{
                                      type: 'VariableDeclarator',
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
                                      id: {
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
                                          name: 'x'
                                      },
                                      init: null
                                  }],
                                  kind: 'var'
                              },
                              right: {
                                  type: 'YieldExpression',
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
                                  delegate: false,
                                  argument: null
                              },
                              body: {
                                  type: 'BlockStatement',
                                  start: 36,
                                  end: 38,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 36
                                      },
                                      end: {
                                          line: 1,
                                          column: 38
                                      }
                                  },
                                  body: []
                              }
                          }]
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`function* g() { for(const x of yield) {} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `function* g() { for(const x of yield) {} }`,
              expected: {
                  type: 'Program',
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
                  body: [{
                      type: 'FunctionDeclaration',
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
                      id: {
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
                          name: 'g'
                      },
                      generator: true,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                          type: 'BlockStatement',
                          start: 14,
                          end: 42,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 14
                              },
                              end: {
                                  line: 1,
                                  column: 42
                              }
                          },
                          body: [{
                              type: 'ForOfStatement',
                              await: false,
                              start: 16,
                              end: 40,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 16
                                  },
                                  end: {
                                      line: 1,
                                      column: 40
                                  }
                              },
                              left: {
                                  type: 'VariableDeclaration',
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
                                  declarations: [{
                                      type: 'VariableDeclarator',
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
                                      id: {
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
                                      init: null
                                  }],
                                  kind: 'const'
                              },
                              right: {
                                  type: 'YieldExpression',
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
                                  delegate: false,
                                  argument: null
                              },
                              body: {
                                  type: 'BlockStatement',
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
                                  body: []
                              }
                          }]
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for(var a of b);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for(var a of b);`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
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
                      right: {
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
                          name: 'b'
                      },
                      body: {
                          type: 'EmptyStatement',
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
                          }
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for(let [a] of b);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for(let [a] of b);`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                          type: 'VariableDeclaration',
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
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
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
                                  elements: [{
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
                                      name: 'a'
                                  }]
                              },
                              init: null
                          }],
                          kind: 'let'
                      },
                      right: {
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
                          name: 'b'
                      },
                      body: {
                          type: 'EmptyStatement',
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
                          }
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for(let of of b);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for(let of of b);`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'VariableDeclaration',
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
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
                                  type: 'Identifier',
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
                                  name: 'of'
                              },
                              init: null
                          }],
                          kind: 'let'
                      },
                      right: {
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

          pass(`for(const a of b);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for(const a of b);`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                          type: 'VariableDeclaration',
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
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
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
                                  name: 'a'
                              },
                              init: null
                          }],
                          kind: 'const'
                      },
                      right: {
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
                          name: 'b'
                      },
                      body: {
                          type: 'EmptyStatement',
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
                          }
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for({a=0} of b);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for({a=0} of b);`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
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
                          properties: [{
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
                              kind: 'init',
                              value: {
                                  type: 'AssignmentPattern',
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
                                      name: 'a'
                                  },
                                  right: {
                                      type: 'Literal',
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
                                      value: 0,
                                      raw: '0'
                                  }
                              }
                          }]
                      },
                      right: {
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
                          name: 'b'
                      },
                      body: {
                          type: 'EmptyStatement',
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
                          }
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for([{a=0}] of b);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for([{a=0}] of b);`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                              type: 'ObjectPattern',
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
                              properties: [{
                                  type: 'Property',
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
                                  }
                              }]
                          }]
                      },
                      right: {
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
                          name: 'b'
                      },
                      body: {
                          type: 'EmptyStatement',
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
                          }
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for (var x of set) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (var x of set) {}`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'VariableDeclaration',
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
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
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
                              },
                              init: null
                          }],
                          kind: 'var'
                      },
                      right: {
                          type: 'Identifier',
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
                          name: 'set'
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 19,
                          end: 21,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 19
                              },
                              end: {
                                  line: 1,
                                  column: 21
                              }
                          },
                          body: []
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for (x.y of [23]) {}
    for (x.y of [23]) {}
    for (x.y of [23]) {}
    for (x.y of [23]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (x.y of [23]) {}
        for (x.y of [23]) {}
        for (x.y of [23]) {}
        for (x.y of [23]) {}`,
              expected: {
                type: 'Program',
                start: 0,
                end: 107,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 4,
                    column: 28
                  }
                },
                body: [
                  {
                    type: 'ForOfStatement',
                    await: false,
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
                    left: {
                      type: 'MemberExpression',
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
                      object: {
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
                      property: {
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
                      },
                      computed: false
                    },
                    right: {
                      type: 'ArrayExpression',
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
                      elements: [
                        {
                          type: 'Literal',
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
                          value: 23,
                          raw: '23'
                        }
                      ]
                    },
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
                  },
                  {
                    type: 'ForOfStatement',
                    await: false,
                    start: 29,
                    end: 49,
                    loc: {
                      start: {
                        line: 2,
                        column: 8
                      },
                      end: {
                        line: 2,
                        column: 28
                      }
                    },
                    left: {
                      type: 'MemberExpression',
                      start: 34,
                      end: 37,
                      loc: {
                        start: {
                          line: 2,
                          column: 13
                        },
                        end: {
                          line: 2,
                          column: 16
                        }
                      },
                      object: {
                        type: 'Identifier',
                        start: 34,
                        end: 35,
                        loc: {
                          start: {
                            line: 2,
                            column: 13
                          },
                          end: {
                            line: 2,
                            column: 14
                          }
                        },
                        name: 'x'
                      },
                      property: {
                        type: 'Identifier',
                        start: 36,
                        end: 37,
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
                        name: 'y'
                      },
                      computed: false
                    },
                    right: {
                      type: 'ArrayExpression',
                      start: 41,
                      end: 45,
                      loc: {
                        start: {
                          line: 2,
                          column: 20
                        },
                        end: {
                          line: 2,
                          column: 24
                        }
                      },
                      elements: [
                        {
                          type: 'Literal',
                          start: 42,
                          end: 44,
                          loc: {
                            start: {
                              line: 2,
                              column: 21
                            },
                            end: {
                              line: 2,
                              column: 23
                            }
                          },
                          value: 23,
                          raw: '23'
                        }
                      ]
                    },
                    body: {
                      type: 'BlockStatement',
                      start: 47,
                      end: 49,
                      loc: {
                        start: {
                          line: 2,
                          column: 26
                        },
                        end: {
                          line: 2,
                          column: 28
                        }
                      },
                      body: []
                    }
                  },
                  {
                    type: 'ForOfStatement',
                    await: false,
                    start: 58,
                    end: 78,
                    loc: {
                      start: {
                        line: 3,
                        column: 8
                      },
                      end: {
                        line: 3,
                        column: 28
                      }
                    },
                    left: {
                      type: 'MemberExpression',
                      start: 63,
                      end: 66,
                      loc: {
                        start: {
                          line: 3,
                          column: 13
                        },
                        end: {
                          line: 3,
                          column: 16
                        }
                      },
                      object: {
                        type: 'Identifier',
                        start: 63,
                        end: 64,
                        loc: {
                          start: {
                            line: 3,
                            column: 13
                          },
                          end: {
                            line: 3,
                            column: 14
                          }
                        },
                        name: 'x'
                      },
                      property: {
                        type: 'Identifier',
                        start: 65,
                        end: 66,
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
                        name: 'y'
                      },
                      computed: false
                    },
                    right: {
                      type: 'ArrayExpression',
                      start: 70,
                      end: 74,
                      loc: {
                        start: {
                          line: 3,
                          column: 20
                        },
                        end: {
                          line: 3,
                          column: 24
                        }
                      },
                      elements: [
                        {
                          type: 'Literal',
                          start: 71,
                          end: 73,
                          loc: {
                            start: {
                              line: 3,
                              column: 21
                            },
                            end: {
                              line: 3,
                              column: 23
                            }
                          },
                          value: 23,
                          raw: '23'
                        }
                      ]
                    },
                    body: {
                      type: 'BlockStatement',
                      start: 76,
                      end: 78,
                      loc: {
                        start: {
                          line: 3,
                          column: 26
                        },
                        end: {
                          line: 3,
                          column: 28
                        }
                      },
                      body: []
                    }
                  },
                  {
                    type: 'ForOfStatement',
                    await: false,
                    start: 87,
                    end: 107,
                    loc: {
                      start: {
                        line: 4,
                        column: 8
                      },
                      end: {
                        line: 4,
                        column: 28
                      }
                    },
                    left: {
                      type: 'MemberExpression',
                      start: 92,
                      end: 95,
                      loc: {
                        start: {
                          line: 4,
                          column: 13
                        },
                        end: {
                          line: 4,
                          column: 16
                        }
                      },
                      object: {
                        type: 'Identifier',
                        start: 92,
                        end: 93,
                        loc: {
                          start: {
                            line: 4,
                            column: 13
                          },
                          end: {
                            line: 4,
                            column: 14
                          }
                        },
                        name: 'x'
                      },
                      property: {
                        type: 'Identifier',
                        start: 94,
                        end: 95,
                        loc: {
                          start: {
                            line: 4,
                            column: 15
                          },
                          end: {
                            line: 4,
                            column: 16
                          }
                        },
                        name: 'y'
                      },
                      computed: false
                    },
                    right: {
                      type: 'ArrayExpression',
                      start: 99,
                      end: 103,
                      loc: {
                        start: {
                          line: 4,
                          column: 20
                        },
                        end: {
                          line: 4,
                          column: 24
                        }
                      },
                      elements: [
                        {
                          type: 'Literal',
                          start: 100,
                          end: 102,
                          loc: {
                            start: {
                              line: 4,
                              column: 21
                            },
                            end: {
                              line: 4,
                              column: 23
                            }
                          },
                          value: 23,
                          raw: '23'
                        }
                      ]
                    },
                    body: {
                      type: 'BlockStatement',
                      start: 105,
                      end: 107,
                      loc: {
                        start: {
                          line: 4,
                          column: 26
                        },
                        end: {
                          line: 4,
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

          pass(`for ( let[x] of [[34]] ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for ( let[x] of [[34]] ) {}`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'VariableDeclaration',
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
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              init: null
                          }],
                          kind: 'let'
                      },
                      right: {
                          type: 'ArrayExpression',
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
                          elements: [{
                              type: 'ArrayExpression',
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
                              elements: [{
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
                                  value: 34,
                                  raw: '34'
                              }]
                          }]
                      },
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
                  }],
                  sourceType: 'script'
              }
          });
          pass(`for (var { x, } of [{ x: 23 }]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (var { x, } of [{ x: 23 }]) {}`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'VariableDeclaration',
                          start: 5,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
                                  type: 'ObjectPattern',
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
                                  }]
                              },
                              init: null
                          }],
                          kind: 'var'
                      },
                      right: {
                          type: 'ArrayExpression',
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
                          elements: [{
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
                          }]
                      },
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

          pass(`for (var { cover = (function () {}), a = (0, function() {})  } of [{}]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (var { cover = (function () {}), a = (0, function() {})  } of [{}]) {}`,
              expected: {
                  type: 'Program',
                  start: 0,
                  end: 74,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 74
                      }
                  },
                  body: [{
                      type: 'ForOfStatement',
                      await: false,
                      start: 0,
                      end: 74,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 74
                          }
                      },
                      left: {
                          type: 'VariableDeclaration',
                          start: 5,
                          end: 62,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 62
                              }
                          },
                          declarations: [{
                              type: 'VariableDeclarator',
                              start: 9,
                              end: 62,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 62
                                  }
                              },
                              id: {
                                  type: 'ObjectPattern',
                                  start: 9,
                                  end: 62,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 9
                                      },
                                      end: {
                                          line: 1,
                                          column: 62
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
                                          end: 59,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 37
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 59
                                              }
                                          },
                                          method: false,
                                          shorthand: true,
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
                                              name: 'a'
                                          },
                                          kind: 'init',
                                          value: {
                                              type: 'AssignmentPattern',
                                              start: 37,
                                              end: 59,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 37
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 59
                                                  }
                                              },
                                              left: {
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
                                                  name: 'a'
                                              },
                                              right: {
                                                  type: 'SequenceExpression',
                                                  start: 42,
                                                  end: 58,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 42
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 58
                                                      }
                                                  },
                                                  expressions: [{
                                                          type: 'Literal',
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
                                                          value: 0,
                                                          raw: '0'
                                                      },
                                                      {
                                                          type: 'FunctionExpression',
                                                          start: 45,
                                                          end: 58,
                                                          loc: {
                                                              start: {
                                                                  line: 1,
                                                                  column: 45
                                                              },
                                                              end: {
                                                                  line: 1,
                                                                  column: 58
                                                              }
                                                          },
                                                          id: null,
                                                          generator: false,
                                                          expression: false,
                                                          async: false,
                                                          params: [],
                                                          body: {
                                                              type: 'BlockStatement',
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
                                                              body: []
                                                          }
                                                      }
                                                  ]
                                              }
                                          }
                                      }
                                  ]
                              },
                              init: null
                          }],
                          kind: 'var'
                      },
                      right: {
                          type: 'ArrayExpression',
                          start: 66,
                          end: 70,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 66
                              },
                              end: {
                                  line: 1,
                                  column: 70
                              }
                          },
                          elements: [{
                              type: 'ObjectExpression',
                              start: 67,
                              end: 69,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 67
                                  },
                                  end: {
                                      line: 1,
                                      column: 69
                                  }
                              },
                              properties: []
                          }]
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 72,
                          end: 74,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 72
                              },
                              end: {
                                  line: 1,
                                  column: 74
                              }
                          },
                          body: []
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for (var [...{ length }] of [[1, 2, 3]]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (var [...{ length }] of [[1, 2, 3]]) {}`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
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
                          declarations: [{
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
                                  type: 'ArrayPattern',
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
                                  elements: [{
                                      type: 'RestElement',
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
                                      argument: {
                                          type: 'ObjectPattern',
                                          start: 13,
                                          end: 23,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 13
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 23
                                              }
                                          },
                                          properties: [{
                                              type: 'Property',
                                              start: 15,
                                              end: 21,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 15
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
                                                  start: 15,
                                                  end: 21,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 15
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 21
                                                      }
                                                  },
                                                  name: 'length'
                                              },
                                              kind: 'init',
                                              value: {
                                                  type: 'Identifier',
                                                  start: 15,
                                                  end: 21,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 15
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 21
                                                      }
                                                  },
                                                  name: 'length'
                                              }
                                          }]
                                      }
                                  }]
                              },
                              init: null
                          }],
                          kind: 'var'
                      },
                      right: {
                          type: 'ArrayExpression',
                          start: 28,
                          end: 39,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 28
                              },
                              end: {
                                  line: 1,
                                  column: 39
                              }
                          },
                          elements: [{
                              type: 'ArrayExpression',
                              start: 29,
                              end: 38,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 29
                                  },
                                  end: {
                                      line: 1,
                                      column: 38
                                  }
                              },
                              elements: [{
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
                                      value: 2,
                                      raw: '2'
                                  },
                                  {
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
                                      value: 3,
                                      raw: '3'
                                  }
                              ]
                          }]
                      },
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

          pass(`for (var [...[...x]] of [[1, 2, 3]]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (var [...[...x]] of [[1, 2, 3]]) {}`,
              expected: {
                  type: 'Program',
                  start: 0,
                  end: 39,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 39
                      }
                  },
                  body: [{
                      type: 'ForOfStatement',
                      await: false,
                      start: 0,
                      end: 39,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 39
                          }
                      },
                      left: {
                          type: 'VariableDeclaration',
                          start: 5,
                          end: 20,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 20
                              }
                          },
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
                                  type: 'ArrayPattern',
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
                                  elements: [{
                                      type: 'RestElement',
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
                                      argument: {
                                          type: 'ArrayPattern',
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
                                          elements: [{
                                              type: 'RestElement',
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
                                              },
                                              argument: {
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
                                              }
                                          }]
                                      }
                                  }]
                              },
                              init: null
                          }],
                          kind: 'var'
                      },
                      right: {
                          type: 'ArrayExpression',
                          start: 24,
                          end: 35,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 24
                              },
                              end: {
                                  line: 1,
                                  column: 35
                              }
                          },
                          elements: [{
                              type: 'ArrayExpression',
                              start: 25,
                              end: 34,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 25
                                  },
                                  end: {
                                      line: 1,
                                      column: 34
                                  }
                              },
                              elements: [{
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
                                      value: 1,
                                      raw: '1'
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
                                      value: 2,
                                      raw: '2'
                                  },
                                  {
                                      type: 'Literal',
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
                                      value: 3,
                                      raw: '3'
                                  }
                              ]
                          }]
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 37,
                          end: 39,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 37
                              },
                              end: {
                                  line: 1,
                                  column: 39
                              }
                          },
                          body: []
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for (var [x, y, z] of [[1, 2, 3]]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (var [x, y, z] of [[1, 2, 3]]) {}`,
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
                  body: [{
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
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
                              init: null
                          }],
                          kind: 'var'
                      },
                      right: {
                          type: 'ArrayExpression',
                          start: 22,
                          end: 33,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 22
                              },
                              end: {
                                  line: 1,
                                  column: 33
                              }
                          },
                          elements: [{
                              type: 'ArrayExpression',
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
                              elements: [{
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
                                  },
                                  {
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
                                      value: 2,
                                      raw: '2'
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
                                      value: 3,
                                      raw: '3'
                                  }
                              ]
                          }]
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 35,
                          end: 37,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 35
                              },
                              end: {
                                  line: 1,
                                  column: 37
                              }
                          },
                          body: []
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for ({ x: [ x ] } of [{}]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for ({ x: [ x ] } of [{}]) {}`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'ObjectPattern',
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
                          properties: [{
                              type: 'Property',
                              start: 7,
                              end: 15,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 7
                                  },
                                  end: {
                                      line: 1,
                                      column: 15
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
                                  name: 'x'
                              },
                              value: {
                                  type: 'ArrayPattern',
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
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'ArrayExpression',
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
                          elements: [{
                              type: 'ObjectExpression',
                              start: 22,
                              end: 24,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 22
                                  },
                                  end: {
                                      line: 1,
                                      column: 24
                                  }
                              },
                              properties: []
                          }]
                      },
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
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for ({ x: [x = yield] } of [{ x: [] }]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for ({ x: [x = yield] } of [{ x: [] }]) {}`,
              expected: {
                  type: 'Program',
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
                  body: [{
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'ObjectPattern',
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
                          properties: [{
                              type: 'Property',
                              start: 7,
                              end: 21,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 7
                                  },
                                  end: {
                                      line: 1,
                                      column: 21
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
                                  name: 'x'
                              },
                              value: {
                                  type: 'ArrayPattern',
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
                                  elements: [{
                                      type: 'AssignmentPattern',
                                      start: 11,
                                      end: 20,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 11
                                          },
                                          end: {
                                              line: 1,
                                              column: 20
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
                                          name: 'x'
                                      },
                                      right: {
                                          type: 'Identifier',
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
                                          name: 'yield'
                                      }
                                  }]
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'ArrayExpression',
                          start: 27,
                          end: 38,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 27
                              },
                              end: {
                                  line: 1,
                                  column: 38
                              }
                          },
                          elements: [{
                              type: 'ObjectExpression',
                              start: 28,
                              end: 37,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 28
                                  },
                                  end: {
                                      line: 1,
                                      column: 37
                                  }
                              },
                              properties: [{
                                  type: 'Property',
                                  start: 30,
                                  end: 35,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 30
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
                                      type: 'ArrayExpression',
                                      start: 33,
                                      end: 35,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 33
                                          },
                                          end: {
                                              line: 1,
                                              column: 35
                                          }
                                      },
                                      elements: []
                                  },
                                  kind: 'init'
                              }]
                          }]
                      },
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
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for ({ x: prop = 'x' in {} } of [{}]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for ({ x: prop = 'x' in {} } of [{}]) {}`,
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
                  body: [{
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'ObjectPattern',
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
                          properties: [{
                              type: 'Property',
                              start: 7,
                              end: 26,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 7
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
                              value: {
                                  type: 'AssignmentPattern',
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
                                  left: {
                                      type: 'Identifier',
                                      start: 10,
                                      end: 14,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 10
                                          },
                                          end: {
                                              line: 1,
                                              column: 14
                                          }
                                      },
                                      name: 'prop'
                                  },
                                  right: {
                                      type: 'BinaryExpression',
                                      start: 17,
                                      end: 26,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 17
                                          },
                                          end: {
                                              line: 1,
                                              column: 26
                                          }
                                      },
                                      left: {
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
                                          value: 'x',
                                          raw: '\'x\''
                                      },
                                      operator: 'in',
                                      right: {
                                          type: 'ObjectExpression',
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
                                          properties: []
                                      }
                                  }
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'ArrayExpression',
                          start: 32,
                          end: 36,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 32
                              },
                              end: {
                                  line: 1,
                                  column: 36
                              }
                          },
                          elements: [{
                              type: 'ObjectExpression',
                              start: 33,
                              end: 35,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 33
                                  },
                                  end: {
                                      line: 1,
                                      column: 35
                                  }
                              },
                              properties: []
                          }]
                      },
                      body: {
                          type: 'BlockStatement',
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
                          body: []
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for ({ x: xGen = function* x() {}, x: gen = function*() {} } of [{}]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for ({ x: xGen = function* x() {}, x: gen = function*() {} } of [{}]) {}`,
              expected: {
                  type: 'Program',
                  start: 0,
                  end: 72,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 72
                      }
                  },
                  body: [{
                      type: 'ForOfStatement',
                      await: false,
                      start: 0,
                      end: 72,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 72
                          }
                      },
                      left: {
                          type: 'ObjectPattern',
                          start: 5,
                          end: 60,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 60
                              }
                          },
                          properties: [{
                                  type: 'Property',
                                  start: 7,
                                  end: 33,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 7
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
                                  value: {
                                      type: 'AssignmentPattern',
                                      start: 10,
                                      end: 33,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 10
                                          },
                                          end: {
                                              line: 1,
                                              column: 33
                                          }
                                      },
                                      left: {
                                          type: 'Identifier',
                                          start: 10,
                                          end: 14,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 10
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 14
                                              }
                                          },
                                          name: 'xGen'
                                      },
                                      right: {
                                          type: 'FunctionExpression',
                                          start: 17,
                                          end: 33,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 17
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 33
                                              }
                                          },
                                          id: {
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
                                          },
                                          generator: true,
                                          expression: false,
                                          async: false,
                                          params: [],
                                          body: {
                                              type: 'BlockStatement',
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
                                              body: []
                                          }
                                      }
                                  },
                                  kind: 'init'
                              },
                              {
                                  type: 'Property',
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
                                      name: 'x'
                                  },
                                  value: {
                                      type: 'AssignmentPattern',
                                      start: 38,
                                      end: 58,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 38
                                          },
                                          end: {
                                              line: 1,
                                              column: 58
                                          }
                                      },
                                      left: {
                                          type: 'Identifier',
                                          start: 38,
                                          end: 41,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 38
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 41
                                              }
                                          },
                                          name: 'gen'
                                      },
                                      right: {
                                          type: 'FunctionExpression',
                                          start: 44,
                                          end: 58,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 44
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 58
                                              }
                                          },
                                          id: null,
                                          generator: true,
                                          expression: false,
                                          async: false,
                                          params: [],
                                          body: {
                                              type: 'BlockStatement',
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
                                              body: []
                                          }
                                      }
                                  },
                                  kind: 'init'
                              }
                          ]
                      },
                      right: {
                          type: 'ArrayExpression',
                          start: 64,
                          end: 68,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 64
                              },
                              end: {
                                  line: 1,
                                  column: 68
                              }
                          },
                          elements: [{
                              type: 'ObjectExpression',
                              start: 65,
                              end: 67,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 65
                                  },
                                  end: {
                                      line: 1,
                                      column: 67
                                  }
                              },
                              properties: []
                          }]
                      },
                      body: {
                          type: 'BlockStatement',
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
                          body: []
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for ({ y: x = 1 } of [{ y: undefined }]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for ({ y: x = 1 } of [{ y: undefined }]) {}`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'ObjectPattern',
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
                          properties: [{
                              type: 'Property',
                              start: 7,
                              end: 15,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 7
                                  },
                                  end: {
                                      line: 1,
                                      column: 15
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
                                  name: 'y'
                              },
                              value: {
                                  type: 'AssignmentPattern',
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
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'ArrayExpression',
                          start: 21,
                          end: 39,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 21
                              },
                              end: {
                                  line: 1,
                                  column: 39
                              }
                          },
                          elements: [{
                              type: 'ObjectExpression',
                              start: 22,
                              end: 38,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 22
                                  },
                                  end: {
                                      line: 1,
                                      column: 38
                                  }
                              },
                              properties: [{
                                  type: 'Property',
                                  start: 24,
                                  end: 36,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 24
                                      },
                                      end: {
                                          line: 1,
                                          column: 36
                                      }
                                  },
                                  method: false,
                                  shorthand: false,
                                  computed: false,
                                  key: {
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
                                      name: 'y'
                                  },
                                  value: {
                                      type: 'Identifier',
                                      start: 27,
                                      end: 36,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 27
                                          },
                                          end: {
                                              line: 1,
                                              column: 36
                                          }
                                      },
                                      name: 'undefined'
                                  },
                                  kind: 'init'
                              }]
                          }]
                      },
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

          pass(`for ({ x = y } of [{}]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for ({ x = y } of [{}]) {}`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'ObjectPattern',
                          start: 5,
                          end: 14,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 14
                              }
                          },
                          properties: [{
                              type: 'Property',
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
                                  type: 'AssignmentPattern',
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
                                      name: 'y'
                                  }
                              }
                          }]
                      },
                      right: {
                          type: 'ArrayExpression',
                          start: 18,
                          end: 22,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 18
                              },
                              end: {
                                  line: 1,
                                  column: 22
                              }
                          },
                          elements: [{
                              type: 'ObjectExpression',
                              start: 19,
                              end: 21,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 19
                                  },
                                  end: {
                                      line: 1,
                                      column: 21
                                  }
                              },
                              properties: []
                          }]
                      },
                      body: {
                          type: 'BlockStatement',
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
                          body: []
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[]]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[]]) {}`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'VariableDeclaration',
                          start: 5,
                          end: 50,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 50
                              }
                          },
                          declarations: [{
                              type: 'VariableDeclarator',
                              start: 11,
                              end: 50,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 11
                                  },
                                  end: {
                                      line: 1,
                                      column: 50
                                  }
                              },
                              id: {
                                  type: 'ArrayPattern',
                                  start: 11,
                                  end: 50,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 11
                                      },
                                      end: {
                                          line: 1,
                                          column: 50
                                      }
                                  },
                                  elements: [{
                                      type: 'AssignmentPattern',
                                      start: 12,
                                      end: 49,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 12
                                          },
                                          end: {
                                              line: 1,
                                              column: 49
                                          }
                                      },
                                      left: {
                                          type: 'ObjectPattern',
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
                                          properties: [{
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
                                                      name: 'x'
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
                                                      name: 'x'
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
                                                      name: 'y'
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
                                                      name: 'y'
                                                  }
                                              },
                                              {
                                                  type: 'Property',
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
                                                      name: 'z'
                                                  },
                                                  kind: 'init',
                                                  value: {
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
                                                      name: 'z'
                                                  }
                                              }
                                          ]
                                      },
                                      right: {
                                          type: 'ObjectExpression',
                                          start: 26,
                                          end: 49,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 26
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 49
                                              }
                                          },
                                          properties: [{
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
                                                      name: 'x'
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
                                                      value: 44,
                                                      raw: '44'
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
                                                      name: 'y'
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
                                                      value: 55,
                                                      raw: '55'
                                                  },
                                                  kind: 'init'
                                              },
                                              {
                                                  type: 'Property',
                                                  start: 42,
                                                  end: 47,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 42
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 47
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
                                                      value: 66,
                                                      raw: '66'
                                                  },
                                                  kind: 'init'
                                              }
                                          ]
                                      }
                                  }]
                              },
                              init: null
                          }],
                          kind: 'const'
                      },
                      right: {
                          type: 'ArrayExpression',
                          start: 54,
                          end: 58,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 54
                              },
                              end: {
                                  line: 1,
                                  column: 58
                              }
                          },
                          elements: [{
                              type: 'ArrayExpression',
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
                              elements: []
                          }]
                      },
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

          pass(`for ([...x.y] of [[4, 3, 2]]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for ([...x.y] of [[4, 3, 2]]) {}`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'ArrayPattern',
                          start: 5,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          elements: [{
                              type: 'RestElement',
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
                              argument: {
                                  type: 'MemberExpression',
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
                                  object: {
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
                                  },
                                  property: {
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
                                      name: 'y'
                                  },
                                  computed: false
                              }
                          }]
                      },
                      right: {
                          type: 'ArrayExpression',
                          start: 17,
                          end: 28,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 17
                              },
                              end: {
                                  line: 1,
                                  column: 28
                              }
                          },
                          elements: [{
                              type: 'ArrayExpression',
                              start: 18,
                              end: 27,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 18
                                  },
                                  end: {
                                      line: 1,
                                      column: 27
                                  }
                              },
                              elements: [{
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
                                      value: 4,
                                      raw: '4'
                                  },
                                  {
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
                                      value: 3,
                                      raw: '3'
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
                                  }
                              ]
                          }]
                      },
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

          pass(`for ([...{ 0: x, length }] of [[null]]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for ([...{ 0: x, length }] of [[null]]) {}`,
              expected: {
                  type: 'Program',
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
                  body: [{
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'ArrayPattern',
                          start: 5,
                          end: 26,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 26
                              }
                          },
                          elements: [{
                              type: 'RestElement',
                              start: 6,
                              end: 25,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 6
                                  },
                                  end: {
                                      line: 1,
                                      column: 25
                                  }
                              },
                              argument: {
                                  type: 'ObjectPattern',
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
                                  properties: [{
                                          type: 'Property',
                                          start: 11,
                                          end: 15,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 11
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 15
                                              }
                                          },
                                          method: false,
                                          shorthand: false,
                                          computed: false,
                                          key: {
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
                                          },
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
                                              name: 'x'
                                          },
                                          kind: 'init'
                                      },
                                      {
                                          type: 'Property',
                                          start: 17,
                                          end: 23,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 17
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
                                              start: 17,
                                              end: 23,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 17
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 23
                                                  }
                                              },
                                              name: 'length'
                                          },
                                          kind: 'init',
                                          value: {
                                              type: 'Identifier',
                                              start: 17,
                                              end: 23,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 17
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 23
                                                  }
                                              },
                                              name: 'length'
                                          }
                                      }
                                  ]
                              }
                          }]
                      },
                      right: {
                          type: 'ArrayExpression',
                          start: 30,
                          end: 38,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 30
                              },
                              end: {
                                  line: 1,
                                  column: 38
                              }
                          },
                          elements: [{
                              type: 'ArrayExpression',
                              start: 31,
                              end: 37,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 31
                                  },
                                  end: {
                                      line: 1,
                                      column: 37
                                  }
                              },
                              elements: [{
                                  type: 'Literal',
                                  start: 32,
                                  end: 36,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 32
                                      },
                                      end: {
                                          line: 1,
                                          column: 36
                                      }
                                  },
                                  value: null,
                                  raw: 'null'
                              }]
                          }]
                      },
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
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for ([] of [[]]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for ([] of [[]]) {}`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                          type: 'ArrayExpression',
                          start: 11,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          elements: [{
                              type: 'ArrayExpression',
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
                              elements: []
                          }]
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 17,
                          end: 19,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 17
                              },
                              end: {
                                  line: 1,
                                  column: 19
                              }
                          },
                          body: []
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for (x of let) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (x of let) {}`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                          start: 10,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          name: 'let'
                      },
                      body: {
                          type: 'BlockStatement',
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
                          body: []
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for (var {x, y} of z);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (var {x, y} of z);`,
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
                  body: [{
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'VariableDeclaration',
                          start: 5,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
                                  type: 'ObjectPattern',
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
                                  properties: [{
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
                                              name: 'x'
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
                                              name: 'x'
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
                                              name: 'y'
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
                                              name: 'y'
                                          }
                                      }
                                  ]
                              },
                              init: null
                          }],
                          kind: 'var'
                      },
                      right: {
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
                          name: 'z'
                      },
                      body: {
                          type: 'EmptyStatement',
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
                          }
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for ({x, y} of z);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for ({x, y} of z);`,
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
                      type: 'ForOfStatement',
                      await: false,
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
                          type: 'ObjectPattern',
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
                              },
                              {
                                  type: 'Property',
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
                                  method: false,
                                  shorthand: true,
                                  computed: false,
                                  key: {
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
                                  kind: 'init',
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
                                  }
                              }
                          ]
                      },
                      right: {
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
                          name: 'z'
                      },
                      body: {
                          type: 'EmptyStatement',
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
                          }
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for (const y of list);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (const y of list);`,
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
                  body: [{
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'VariableDeclaration',
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
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
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
                                  name: 'y'
                              },
                              init: null
                          }],
                          kind: 'const'
                      },
                      right: {
                          type: 'Identifier',
                          start: 16,
                          end: 20,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 16
                              },
                              end: {
                                  line: 1,
                                  column: 20
                              }
                          },
                          name: 'list'
                      },
                      body: {
                          type: 'EmptyStatement',
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
                          }
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for (let of of xyz);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (let of of xyz);`,
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
                  body: [{
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'VariableDeclaration',
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
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
                                  type: 'Identifier',
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
                                  name: 'of'
                              },
                              init: null
                          }],
                          kind: 'let'
                      },
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
                          name: 'xyz'
                      },
                      body: {
                          type: 'EmptyStatement',
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
                          }
                      }
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for(const x = 1; ; ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for(const x = 1; ; ) {}`,
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
                      type: 'ForStatement',
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
                      init: {
                          type: 'VariableDeclaration',
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
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
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
                              init: {
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
                          }],
                          kind: 'const'
                      },
                      test: null,
                      update: null,
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
                  }],
                  sourceType: 'script'
              }
          });

          pass(`for (let [p, q] of r);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (let [p, q] of r);`,
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
                  body: [{
                      type: 'ForOfStatement',
                      await: false,
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
                      left: {
                          type: 'VariableDeclaration',
                          start: 5,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
                                  type: 'ArrayPattern',
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
                                          name: 'p'
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
                                          name: 'q'
                                      }
                                  ]
                              },
                              init: null
                          }],
                          kind: 'let'
                      },
                      right: {
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
                          name: 'r'
                      },
                      body: {
                          type: 'EmptyStatement',
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
                          }
                      }
                  }],
                  sourceType: 'script'
              }
          });

      });
  });
