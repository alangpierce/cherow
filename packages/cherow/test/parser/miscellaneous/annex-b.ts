import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Annex B', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [

            `"use strict"; label: function f(){}`,
            `"use strict"; if (0) function f(){}`,
            `"use strict";  if (0) function f(){} else;`,
            `"use strict"; if (0); else function f(){}`,
            `"use strict"; label foo: function f(){}`,
            `while(true) function a(){}`,
            `with(true) function a(){}`,
            'for (let a = 0 in {});',
            '"use strict"; for (var a = 0 in {});',
            'for (var {a} = 0 in {});',
            'for (a = 0 in {});',
            'for (var [a] = 0 in {});',
            'for (const a = 0 in {});',
            // Esprima issue>  https://github.com/jquery/esprima/issues/1719
            `if (false) L: async function l() {}`
        ];

        for (const arg of invalidSyntax) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

        const programs = [

            `/}?/u;`,
            `/{*/u;`,
            `/.{.}/;`,
            `/[\\w-\\s]/;`,
            `/[\\s-\\w]/;`,
            `/(?!.){0,}?/;`,
            `/(?!.){0,}?/u;`,
            `/{/;`,
            `004`,
            `076`,
            `02`,
            `/*
                    */--> foo`,
            `var foo = [23]
                    -->[0];`,
            `var x = 0;
                    x = -1 <!--x;`,
            '-->the comment extends to these characters',
            'try {  throw null; } catch (f) { if (true) function f() { return 123; } else function _f() {} }',
            'switch (0) { default:  let f;  if (true) function f() {  } else ;  }',
            'var init = f;  if (true) function f() {  } else ;',
            'if (true) function f() { initialBV = f; f = 123; currentBV = f; return "decl"; }',
            'try {  throw {};  } catch ({ f }) {  if (true) function f() {  } else ;  }',
            'switch (0) { default:  let f; if (true) function f() {  }  }',
            '  try {  throw {};  } catch ({ f }) {  if (true) function f() {  }  }',
            '{  let f = 123;  if (false) ; else function f() {  }  }',
            'switch (0) { default:  let f; switch (1) {  case 1:   function f() {  }  }  }',
            'try {  throw {};  } catch ({ f }) {  switch (1) {  case 1:  function f() {  }  }  }',
            'try { throw null;} catch (f) {switch (1) { default: function f() { return 123; } } }',
            'let f = 123; switch (1) { default: function f() {  } }',
            'var init = f;  switch (1) { default:   function f() {  }  }',
            'var init = f; if (false) function _f() {} else function f() {  }',
            '{  let f = 123; if (false) function _f() {} else function f() {  }  }',
            'function arguments() {}',
            'try {  throw null;  } catch (f) {  {   function f() { return 123; }  }  }',
            'var outer = (function*() { yield* iter; })();',
            `try {
                throw 'exception';
              } catch (err) {
                before = err;
                for (var err = 'loop initializer'; err !== 'increment'; err = 'increment') {
                  during = err;
                }
                after = err;
              }`,
            `try {
                throw 'exception';
              } catch (err) {
                before = err;
                for (var err in { propertyName: null }) {
                  during = err;
                }
                after = err;
              }`,
            ` try {
                throw new Error();
              }
              catch (foo) {
                var foo = "initializer in catch";
              }`,
            `try {
                throw 'exception';
                } catch (err) {
    before = err;
    for (var err = 'loop initializer'; err !== 'increment'; err = 'increment') {
      during = err;
    }
    after = err;
  }`,
            // `({  __proto__: null,  other: null,  '__proto__': null });`,
            'o = { __proto__: undefined };',
            'o = { __proto__: 1 };',
            'o = {  __proto__: proto };',
            'o = { __proto__: null };',
            `label: function g() {}`,
            `label1: label2: function f() {}`,
            '000',
            '073',
            '004',
            '074',
            '004',
            '004',
            '004',
            '077',
            '00',
            '00',
            '05',
            '078',
            '0708',
            '019',
            '0719',
            '0782',
            '0790',
            '"\\0"',
            '"\\x05"',
            '"\\x06"',
            '"\\18"',
            '"\\00"',
            '"\\218"',
            '"\\66"',
            '"\\210"',
            `'\\48'`,
            `'\\07'`,
            `'\\168'`,
            `'\\318'`,
            `'\\500'`,
            `'\\160'`,
            `'\\301'`,
            `'\\377'`,
            'if (x) function f() { return 23; } else function f() { return 42; }',
            'if (x) function f() {}',
            `var foo = [23]
                    -->[0];`,
            'x = -1 <!--x;',
            'if (true) function f() {  } else function _f() {}',
            'if (true) function f() { return "foo"; } else function _f() {}',
            'for (let f of [0]) {}',
            'for (let f; ; ) {}',
            'for (let f; ; ) {}',
            'for (let f in { key: 0 }) {}',
            `(function(f) {
                        init = f;

                        switch (1) {
                          case 1:
                            function f() {  }
                        }

                        after = f;
                      }(123));`,
            ` try {
                        throw {};
                      } catch ({ f }) {

                      switch (1) {
                        default:
                          function f() {  }
                      }

                      }
                    `,
            `{
                        function f() {
                          return 'first declaration';
                        }
                      }`,
            `{
                        function f() { return 'declaration'; }
                      }`,
            'if (true) function f() {} else function _f() {}',
            'if (false) function _f() {} else function f() { }',
            `for (let f; ; ) {

                        if (false) ; else function f() {  }

                          break;
                        }`,
            `try {
  throw {};
} catch ({ f }) {

switch (1) {
  case 1:
    function f() {  }
}

}`,
            'if (true) function f() {  } else function _f() {}',
            'if (true) function f() {  } else function _f() {}',
            `switch (1) {
                        default:
                          function f() {  }
                      }`,
            `try {
                        throw {};
                      } catch ({ f }) {

                      switch (1) {
                        case 1:
                          function f() {  }
                      }

                      }`,
            `{
                        let f = 123;

                        switch (1) {
                          case 1:
                            function f() {  }
                        }

                        }`,
            `
                        for (let f in { key: 0 }) {

                        switch (1) {
                          case 1:
                            function f() {  }
                        }

                        }`
        ];

        for (const arg of programs) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Numeric (B1.1)', () => {

        pass(`/}?/u;`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: `/}?/u;`,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: null,
                            regex: {
                                pattern: '}?',
                                flags: 'u'
                            },
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
                            raw: '/}?/u'
                        },
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

        pass(`/{*/u;`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: `/{*/u;`,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: null,
                            regex: {
                                pattern: '{*',
                                flags: 'u'
                            },
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
                            raw: '/{*/u'
                        },
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

        pass(`/[\\s-\\w]/;`, Context.OptionsRaw, {
            source: `/[\\s-\\w]/;`,
            expected: {
                  body: [
                    {
                     expression: {
                        raw: '/[\\s-\\w]/',
                        regex: {
                          flags: '',
                          pattern: '[\\s-\\w]'
                        },
                       type: 'Literal',
                        value: /[\s-\w]/,
                      },
                      type: 'ExpressionStatement'
                    }
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });
    });

    describe('Numeric (B1.1)', () => {

        pass(`004`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: `004`,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 4,
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
                            raw: '004'
                        },
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
                        }
                    }
                ],
                sourceType: 'script',
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
                }
            }
        });

        pass(`076`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: `076`,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 62,
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
                            raw: '076'
                        },
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
                        }
                    }
                ],
                sourceType: 'script',
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
                }
            }
        });
    });

    describe('Function code', () => {

        const programs = [

            'switch (0) { default:  let f; if (true) function f() {  }  }',
            'try {  throw {};  } catch ({ f }) {  if (true) function f() {  }  }',
            '{  let f = 123;  if (false) ; else function f() {  }  }',
            'switch (0) { default:  let f; switch (1) {  case 1:   function f() {  }  }  }',
            'try {  throw {};  } catch ({ f }) {  switch (1) {  case 1:  function f() {  }  }  }',
            'try { throw null;} catch (f) {switch (1) { default: function f() { return 123; } } }',
            'let f = 123; switch (1) { default: function f() {  } }',
            'var init = f;  switch (1) { default:   function f() {  }  }',
            'var init = f; if (false) function _f() {} else function f() {  }',
            '{  let f = 123; if (false) function _f() {} else function f() {  }  }',
            'function arguments() {}',
            'try {  throw null;  } catch (f) {  {   function f() { return 123; }  }  }',
            'var outer = (function*() { yield* iter; })();',
        ];

        for (const arg of programs) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        pass(`var init = f;  if (true) function f() {  } else ;`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: 'var init = f;  if (true) function f() {  } else ;',
            expected: {
                type: 'Program',
                body: [{
                        type: 'VariableDeclaration',
                        declarations: [{
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Identifier',
                                name: 'f',
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
                            },
                            id: {
                                type: 'Identifier',
                                name: 'init',
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
                                }
                            },
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
                            }
                        }],
                        kind: 'var',
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
                        }
                    },
                    {
                        type: 'IfStatement',
                        test: {
                            type: 'Literal',
                            value: true,
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
                            },
                            raw: 'true'
                        },
                        alternate: {
                            type: 'EmptyStatement',
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
                            }
                        },
                        consequent: {
                            type: 'FunctionDeclaration',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: {
                                type: 'Identifier',
                                name: 'f',
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
                            },
                            start: 25,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 25
                                },
                                end: {
                                    line: 1,
                                    column: 42
                                }
                            }
                        },
                        start: 15,
                        end: 49,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 49
                            }
                        }
                    }
                ],
                sourceType: 'script',
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
                }
            }
        });

        pass(`if (true) function f() { initialBV = f; f = 123; currentBV = f; return 'decl'; }`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: 'if (true) function f() { initialBV = f; f = 123; currentBV = f; return "decl"; }',
            expected: {
                type: 'Program',
                body: [{
                    type: 'IfStatement',
                    test: {
                        type: 'Literal',
                        value: true,
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
                        raw: 'true'
                    },
                    alternate: null,
                    consequent: {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'initialBV',
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
                                            }
                                        },
                                        operator: '=',
                                        right: {
                                            type: 'Identifier',
                                            name: 'f',
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
                                            }
                                        },
                                        start: 25,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 38
                                            }
                                        }
                                    },
                                    start: 25,
                                    end: 39,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 39
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'f',
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
                                            }
                                        },
                                        operator: '=',
                                        right: {
                                            type: 'Literal',
                                            value: 123,
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
                                            raw: '123'
                                        },
                                        start: 40,
                                        end: 47,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 40
                                            },
                                            end: {
                                                line: 1,
                                                column: 47
                                            }
                                        }
                                    },
                                    start: 40,
                                    end: 48,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 40
                                        },
                                        end: {
                                            line: 1,
                                            column: 48
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'currentBV',
                                            start: 49,
                                            end: 58,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 49
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 58
                                                }
                                            }
                                        },
                                        operator: '=',
                                        right: {
                                            type: 'Identifier',
                                            name: 'f',
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
                                            }
                                        },
                                        start: 49,
                                        end: 62,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 49
                                            },
                                            end: {
                                                line: 1,
                                                column: 62
                                            }
                                        }
                                    },
                                    start: 49,
                                    end: 63,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 49
                                        },
                                        end: {
                                            line: 1,
                                            column: 63
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Literal',
                                        value: 'decl',
                                        start: 71,
                                        end: 77,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 71
                                            },
                                            end: {
                                                line: 1,
                                                column: 77
                                            }
                                        },
                                        raw: '"decl"'
                                    },
                                    start: 64,
                                    end: 78,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 64
                                        },
                                        end: {
                                            line: 1,
                                            column: 78
                                        }
                                    }
                                }
                            ],
                            start: 23,
                            end: 80,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23
                                },
                                end: {
                                    line: 1,
                                    column: 80
                                }
                            }
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                        start: 10,
                        end: 80,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 80
                            }
                        }
                    },
                    start: 0,
                    end: 80,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 80
                        }
                    }
                }],
                sourceType: 'script',
                start: 0,
                end: 80,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 80
                    }
                }
            }
        });

        pass(`try {  throw null; } catch (f) { if (true) function f() { return 123; } else function _f() {} }`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: 'try {  throw null; } catch (f) { if (true) function f() { return 123; } else function _f() {} }',
            expected: {
                type: 'Program',
                body: [{
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ThrowStatement',
                            argument: {
                                type: 'Literal',
                                value: null,
                                start: 13,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                },
                                raw: 'null'
                            },
                            start: 7,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        }],
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
                        }
                    },
                    handler: {
                        type: 'CatchClause',
                        param: {
                            type: 'Identifier',
                            name: 'f',
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
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'IfStatement',
                                test: {
                                    type: 'Literal',
                                    value: true,
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
                                    raw: 'true'
                                },
                                alternate: {
                                    type: 'FunctionDeclaration',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 91,
                                        end: 93,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 91
                                            },
                                            end: {
                                                line: 1,
                                                column: 93
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: 'Identifier',
                                        name: '_f',
                                        start: 86,
                                        end: 88,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 86
                                            },
                                            end: {
                                                line: 1,
                                                column: 88
                                            }
                                        }
                                    },
                                    start: 77,
                                    end: 93,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 77
                                        },
                                        end: {
                                            line: 1,
                                            column: 93
                                        }
                                    }
                                },
                                consequent: {
                                    type: 'FunctionDeclaration',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [{
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'Literal',
                                                value: 123,
                                                start: 65,
                                                end: 68,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 65
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 68
                                                    }
                                                },
                                                raw: '123'
                                            },
                                            start: 58,
                                            end: 69,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 58
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 69
                                                }
                                            }
                                        }],
                                        start: 56,
                                        end: 71,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 56
                                            },
                                            end: {
                                                line: 1,
                                                column: 71
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: 'Identifier',
                                        name: 'f',
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
                                        }
                                    },
                                    start: 43,
                                    end: 71,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 43
                                        },
                                        end: {
                                            line: 1,
                                            column: 71
                                        }
                                    }
                                },
                                start: 33,
                                end: 93,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 33
                                    },
                                    end: {
                                        line: 1,
                                        column: 93
                                    }
                                }
                            }],
                            start: 31,
                            end: 95,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 31
                                },
                                end: {
                                    line: 1,
                                    column: 95
                                }
                            }
                        },
                        start: 21,
                        end: 95,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 95
                            }
                        }
                    },
                    finalizer: null,
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
                sourceType: 'script',
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

        pass(` switch (0) { default:  let f;  if (true) function f() {  } else ;  }`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: 'switch (0) { default:  let f;  if (true) function f() {  } else ;  }',
            expected: {
                type: 'Program',
                body: [{
                    type: 'SwitchStatement',
                    discriminant: {
                        type: 'Literal',
                        value: 0,
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
                        raw: '0'
                    },
                    cases: [{
                        type: 'SwitchCase',
                        test: null,
                        consequent: [{
                                type: 'VariableDeclaration',
                                declarations: [{
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'Identifier',
                                        name: 'f',
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
                                }],
                                kind: 'let',
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
                                }
                            },
                            {
                                type: 'IfStatement',
                                test: {
                                    type: 'Literal',
                                    value: true,
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
                                    },
                                    raw: 'true'
                                },
                                alternate: {
                                    type: 'EmptyStatement',
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
                                    }
                                },
                                consequent: {
                                    type: 'FunctionDeclaration',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
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
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: 'Identifier',
                                        name: 'f',
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
                                    start: 41,
                                    end: 58,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 41
                                        },
                                        end: {
                                            line: 1,
                                            column: 58
                                        }
                                    }
                                },
                                start: 31,
                                end: 65,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 31
                                    },
                                    end: {
                                        line: 1,
                                        column: 65
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 65,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 65
                            }
                        }
                    }],
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
                    }
                }],
                sourceType: 'script',
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
                }
            }
        });
    });

    describe('Comments (B3.1)', () => {
        fail (`var foo = [23] -->[0];`, Context.Empty, {
            source: `var foo = [23] -->[0];`,
        });

        pass(`multiline HTML close`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: `/*
            */--> foo`,
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
                    line: 2,
                    column: 21
                  }
                },
                body: [],
                sourceType: 'script'
              }
        });

        pass(`multiline HTML close ASI`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: `var foo = [23]
            -->[0];`,
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
                    column: 19
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
                          name: 'foo'
                        },
                        init: {
                          type: 'ArrayExpression',
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
                          elements: [
                            {
                              type: 'Literal',
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
                              value: 23,
                              raw: '23'
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

        pass(`simgle line HTML close`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: '-->the comment extends to these characters',
            expected: {
                  body: [],
                  end: 42,
                  loc: {
                    end: {
                      column: 42,
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

        pass(`single line HTML open`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: `var x = 0;
            x = -1 <!--x;`,
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
                    line: 2,
                    column: 25
                  }
                },
                body: [
                  {
                    type: 'VariableDeclaration',
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
                    declarations: [
                      {
                        type: 'VariableDeclarator',
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
                    ],
                    kind: 'var'
                  },
                  {
                    type: 'ExpressionStatement',
                    start: 23,
                    end: 29,
                    loc: {
                      start: {
                        line: 2,
                        column: 12
                      },
                      end: {
                        line: 2,
                        column: 18
                      }
                    },
                    expression: {
                      type: 'AssignmentExpression',
                      start: 23,
                      end: 29,
                      loc: {
                        start: {
                          line: 2,
                          column: 12
                        },
                        end: {
                          line: 2,
                          column: 18
                        }
                      },
                      operator: '=',
                      left: {
                        type: 'Identifier',
                        start: 23,
                        end: 24,
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
                        name: 'x'
                      },
                      right: {
                        type: 'UnaryExpression',
                        start: 27,
                        end: 29,
                        loc: {
                          start: {
                            line: 2,
                            column: 16
                          },
                          end: {
                            line: 2,
                            column: 18
                          }
                        },
                        operator: '-',
                        prefix: true,
                        argument: {
                          type: 'Literal',
                          start: 28,
                          end: 29,
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
                          value: 1,
                          raw: '1'
                        }
                      }
                    }
                  }
                ],
                sourceType: 'script'
              }
        });
    });
});
