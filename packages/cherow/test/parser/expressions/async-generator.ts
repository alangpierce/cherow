import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Async Generator', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidPrograms = [
            '(async function *foo() { var await; });',
            '(async function *foo() { void await; });',
            '(async function *foo() { await: ; });',
            '(async function *foo(x = 1) {"use strict"})',
            '(async function *foo(foo) { super() })',
            '(async function *foo(foo) { super.prop });',
            '(async function *foo(foo = super()) { var bar; });',
            '(async function*([...x, y]) {})',
            '(async function*([...x, y] = [1, 2, 3]) {})',
            '(async function* h([...{ x } = []]) {})',
            '(async function* h([...{ x } = []] = []) {})',
            '(async function*(x = await 1) { });',
            '(async function*() { await: 1; });',
            '(async function *foo(...a,) {})',
            '(async function *foo([...[ x ] = []])',
            '(async function *foo([...{ x } = []]) {})',
            '(async function *foo([...{ x } = []] = []) {})',
            '(async function *foo([...x, y]) {})',
            '(async function *foo([...x = []] = []) {})',
            '(async function *foo(...a,) {})',
            '(async function *foo([...[x], y] = [1, 2, 3]) {})',
            '(async function *foo([...{ x }, y] = [1, 2, 3])',
            '(async function *foo([...{ x }, y])',
            '(async function *foo([...{ x } = []] = [])',
            '(async function *foo([...{ x } = []])',
        ];

        for (const arg of invalidPrograms) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        fail('"use strict"; (async function* arguments() { });', Context.Empty, {
            source: '"use strict"; (async function* arguments() { });',
        });

        fail('(async function*(a = super()) { });', Context.Empty, {
           source: '(async function*(a = super()) { });',
        });

        fail('0, async function* g(...a,) {};', Context.Empty, {
            source: '0, async function* g(...a,) {};',
        });

        fail('(async function*() { } = 1);', Context.Empty, {
            source: '(async function*() { } = 1);',
        });

        fail('(async function* yield() { });', Context.Empty, {
            source: '(async function* yield() { });',
        });

        fail('(async function* g() { var await; });', Context.Empty, {
            source: '(async function* g() { var await; });',
        });

        fail('(async function* g() { var await; });', Context.Module, {
            source: '(async function* g() { var await; });',
        });

        fail('(async function* g() { var yield; });', Context.Empty, {
            source: '(async function* g() { var yield; });',
        });

        fail('(async function* g() {  void await; });', Context.Module, {
            source: '(async function* g() { void await; });',
        });

        fail('(async function* g() { var yield; });', Context.Module, {
            source: '(async function* g() { var yield; });',
        });

        fail('(async function* g() {  void yield; });', Context.Module, {
            source: '(async function* g() { void yield; });',
        });

        fail('(async function* g() { yield: ;  });', Context.Module, {
            source: '(async function* g() { yield: ; });',
        });

        fail('0, async function* g(...x = []) {}', Context.Module, {
            source: '0, async function* g(...x = []) {}',
        });

        fail(`"use strict";
            async function *g() {
            return {
                 ...(function() {
                    var yield;

                 }()),
              }
          };`, Context.Empty, {
            source: `
            "use strict";
            async function *g() {
                return {
                     ...(function() {
                        var yield;
                     }()),
                  }
              };`,
        });

        fail('"use strict"; (async function arguments () {  })', Context.Empty, {
            source: '"use strict"; (async function arguments () {  })',
        });

        fail('"use strict"; (async function eval () { })', Context.Empty, {
            source: '"use strict"; (async function eval () { })',
        });

        fail('"use strict"; (async function foo (eval) {  })', Context.Empty, {
            source: '"use strict"; (async function foo (eval) {  })',
        });

        fail('"use strict"; (async function arguments () {  })', Context.Empty, {
            source: '"use strict"; (async function arguments () {  })',
        });

        fail('"use strict"; (async function arguments () {  })', Context.Empty, {
            source: '"use strict"; (async function arguments () {  })',
        });

        fail('"use strict"; (async function arguments () {  })', Context.Empty, {
            source: '"use strict"; (async function arguments () {  })',
        });

        fail('"use strict"; (async function arguments () {  })', Context.Empty, {
            source: '"use strict"; (async function arguments () {  })',
        });
    });

    describe('Pass', () => {

        const validFormalparams = [
            '(async function *foo() { }.prototype)',
            '(async function *foo(x, y = x, z = y) { })',
            '(async function *foo(x = y, y) { })',
            '(async function *foo(a, b = 39,) { })',
            '(async function *foo(a, b,) { })',
            '(async function *foo(_ = (function() {}())) { })',
            '(async function *([x = 23]) { })',
            '(async function *([{ x }]) { })',
            '(async function *(x = x) { })',
            '(async function*([...[...x]]) { })',
            '(async function *foo([...x] = 123) { })',
            '(async function *foo({ cls = class {}, xCls = class X {}, xCls2 = class { static name() {} } } = {}) {})',
            '(async function*({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) { })',
            '(async function*({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: undefined }) { })',
            '(async function* h([[,] = g()]) { })',
            '(async function* g([[x]]) { })',
            '(async function* h([cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }]) { })',
            '(async function* h([fn = function () {}, xFn = function x() {}]) { })',
            '(async function* h([{ x, y, z } = { x: 44, y: 55, z: 66 }]) { })',
            '(async function* h([]) { })',
            '(async function* h([...[,]]) { })',
            '(async function* g([...x]) { })',
            '(async function* h([fn = function () {}, xFn = function x() {}] = []) { })',
            '(async function* h([x] = []) { })',
            '(async function* h({} = null) { })',
            '(async function* h({a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3}) { })',
            '(async function* h({ x, }) { })',
            '(async function* h({ w: [x, y, z] = [4, 5, 6] }) { })',
            '(async function*({}) { })',
            '(async function*({ x, }) { })',
            '(async function*({ x: y = 33 }) { })',
            `var gen = async function *g() {
                yield [...yield];
              };`,
            `var gen = async function *() {
                yield {
                     ...yield yield,
                     ...(function(arg) {
                        var yield = arg;
                        return {...yield};
                     }(yield)),
                     ...yield,
                  }
              };`,
            `var gen = async function *g() {
                return (function(arg) {
                    var yield = arg + 1;
                    return yield;
                  }(yield))
              };
              `,
        ];

        for (const arg of validFormalparams) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        pass('(async function*([...[...x]]) {})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(async function*([...[...x]]) {})',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [{
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'RestElement',
                                argument: {
                                    type: 'ArrayPattern',
                                    elements: [{
                                        type: 'RestElement',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'x',
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
                                            }
                                        },
                                        start: 22,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        }
                                    }],
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
                                    }
                                },
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
                                }
                            }],
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
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
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
                    }
                }],
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
                }
            }
        });

        pass('(async function*([{ x }]) {})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(async function*([{ x }]) {})',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [{
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        }
                                    },
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        }
                                    },
                                    method: false,
                                    shorthand: true,
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
                                    }
                                }],
                                start: 18,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                }
                            }],
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
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        }
                    },
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
                    }
                }],
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
                }
            }
        });

        pass('(async function*([...{ 0: v, 1: w, 2: x, 3: y, length: z }]) {})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(async function*([...{ 0: v, 1: w, 2: x, 3: y, length: z }]) {})',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [{
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'RestElement',
                                argument: {
                                    type: 'ObjectPattern',
                                    properties: [{
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 0,
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
                                                raw: '0'
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'v',
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
                                                }
                                            },
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
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 1,
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
                                                raw: '1'
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'w',
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
                                                }
                                            },
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
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 2,
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
                                                raw: '2'
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'x',
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
                                                }
                                            },
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
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 3,
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
                                                raw: '3'
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'y',
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
                                                }
                                            },
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
                                        },
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Identifier',
                                                name: 'length',
                                                start: 47,
                                                end: 53,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 47
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 53
                                                    }
                                                }
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'z',
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
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            start: 47,
                                            end: 56,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 47
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 56
                                                }
                                            }
                                        }
                                    ],
                                    start: 21,
                                    end: 58,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 58
                                        }
                                    }
                                },
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
                                }
                            }],
                            start: 17,
                            end: 59,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 59
                                }
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 63,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 63
                            }
                        }
                    },
                    start: 0,
                    end: 64,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 64
                        }
                    }
                }],
                start: 0,
                end: 64,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 64
                    }
                }
            }
        });

        pass('(async function*([...[...x]]) {})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(async function*([...[...x]]) {})',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [{
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'RestElement',
                                argument: {
                                    type: 'ArrayPattern',
                                    elements: [{
                                        type: 'RestElement',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'x',
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
                                            }
                                        },
                                        start: 22,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        }
                                    }],
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
                                    }
                                },
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
                                }
                            }],
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
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
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
                    }
                }],
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
                }
            }
        });

        pass('(async function *icefapper([_, x] = []]) {})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(async function *icefapper([_, x] = []) {})',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [{
                            type: 'AssignmentPattern',
                            left: {
                                type: 'ArrayPattern',
                                elements: [{
                                        type: 'Identifier',
                                        name: '_',
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
                                        }
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        }
                                    }
                                ],
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
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                                }
                            },
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
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'icefapper',
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
                            }
                        },
                        start: 1,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 42
                            }
                        }
                    },
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
                    }
                }],
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
                }
            }
        });

        pass('(async function*([{ x }] = []) {})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(async function*([{ x }] = []) {})',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [{
                            type: 'AssignmentPattern',
                            left: {
                                type: 'ArrayPattern',
                                elements: [{
                                    type: 'ObjectPattern',
                                    properties: [{
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'x',
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
                                            }
                                        },
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'x',
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
                                            }
                                        },
                                        method: false,
                                        shorthand: true,
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
                                        }
                                    }],
                                    start: 18,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                }],
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
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                                }
                            },
                            start: 17,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: null,
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
                        }
                    },
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
                    }
                }],
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
                }
            }
        });

        pass('(async function*({} = null) {})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(async function*({} = null) {})',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [{
                            type: 'AssignmentPattern',
                            left: {
                                type: 'ObjectPattern',
                                properties: [],
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
                                }
                            },
                            right: {
                                type: 'Literal',
                                value: null,
                                start: 22,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                },
                                raw: 'null'
                            },
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
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: null,
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
                        }
                    },
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
                    }
                }],
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
                }
            }
        });

        pass('(async function*({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } }) {})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(async function*({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } }) {})',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [{
                            type: 'AssignmentPattern',
                            left: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'w',
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
                                    },
                                    computed: false,
                                    value: {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'ObjectPattern',
                                            properties: [{
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'x',
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
                                                        }
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'x',
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
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: true,
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
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'y',
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
                                                        }
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'y',
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
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: true,
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
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'z',
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
                                                        }
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'z',
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
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: true,
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
                                                    }
                                                }
                                            ],
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
                                            }
                                        },
                                        right: {
                                            type: 'ObjectExpression',
                                            properties: [{
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'x',
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
                                                        }
                                                    },
                                                    value: {
                                                        type: 'Literal',
                                                        value: 4,
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
                                                        raw: '4'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 38,
                                                    end: 42,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 38
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 42
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'y',
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
                                                        }
                                                    },
                                                    value: {
                                                        type: 'Literal',
                                                        value: 5,
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
                                                        raw: '5'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
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
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'z',
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
                                                        }
                                                    },
                                                    value: {
                                                        type: 'Literal',
                                                        value: 6,
                                                        start: 53,
                                                        end: 54,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 53
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 54
                                                            }
                                                        },
                                                        raw: '6'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 50,
                                                    end: 54,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 50
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 54
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 36,
                                            end: 56,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 36
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 56
                                                }
                                            }
                                        },
                                        start: 22,
                                        end: 56,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 56
                                            }
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    start: 19,
                                    end: 56,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 56
                                        }
                                    }
                                }],
                                start: 17,
                                end: 58,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 58
                                    }
                                }
                            },
                            right: {
                                type: 'ObjectExpression',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'w',
                                        start: 63,
                                        end: 64,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 63
                                            },
                                            end: {
                                                line: 1,
                                                column: 64
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'ObjectExpression',
                                        properties: [{
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    start: 68,
                                                    end: 69,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 68
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 69
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'Identifier',
                                                    name: 'undefined',
                                                    start: 71,
                                                    end: 80,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 71
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 80
                                                        }
                                                    }
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: false,
                                                start: 68,
                                                end: 80,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 68
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 80
                                                    }
                                                }
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'z',
                                                    start: 82,
                                                    end: 83,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 82
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 83
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 7,
                                                    start: 85,
                                                    end: 86,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 85
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 86
                                                        }
                                                    },
                                                    raw: '7'
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: false,
                                                start: 82,
                                                end: 86,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 82
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 86
                                                    }
                                                }
                                            }
                                        ],
                                        start: 66,
                                        end: 88,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 66
                                            },
                                            end: {
                                                line: 1,
                                                column: 88
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 63,
                                    end: 88,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 63
                                        },
                                        end: {
                                            line: 1,
                                            column: 88
                                        }
                                    }
                                }],
                                start: 61,
                                end: 90,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 61
                                    },
                                    end: {
                                        line: 1,
                                        column: 90
                                    }
                                }
                            },
                            start: 17,
                            end: 90,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 90
                                }
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 92,
                            end: 94,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 92
                                },
                                end: {
                                    line: 1,
                                    column: 94
                                }
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 94,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 94
                            }
                        }
                    },
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
                    }
                }],
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
                }
            }
        });

        pass('(async function*([[...x] = [a, b, c]]) {})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(async function*([[...x] = [a, b, c]]) {})',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        params: [{
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'ArrayPattern',
                                    elements: [{
                                        type: 'RestElement',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'x',
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
                                            }
                                        },
                                        start: 19,
                                        end: 23,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 23
                                            }
                                        }
                                    }],
                                    start: 18,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                },
                                right: {
                                    type: 'ArrayExpression',
                                    elements: [{
                                            type: 'Identifier',
                                            name: 'a',
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
                                            }
                                        },
                                        {
                                            type: 'Identifier',
                                            name: 'b',
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
                                            }
                                        },
                                        {
                                            type: 'Identifier',
                                            name: 'c',
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
                                            }
                                        }
                                    ],
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
                                    }
                                },
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
                            }],
                            start: 17,
                            end: 37,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 37
                                }
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    },
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
                    }
                }],
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
                }
            }
        });
    });
});
