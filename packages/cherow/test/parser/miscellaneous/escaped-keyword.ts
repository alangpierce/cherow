import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Escaped keywords', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidModuleCode = [
            'export { X \\u0061s Y }',
            'import X fro\\u006d "foo"',
            'export default \\u0061sync function () { await x }',
            'export \\u0061sync function y() { await x }',
            // https://github.com/shapesecurity/shift-parser-js/issues/376
            'export {a \\u0061s b} from "";',
            'export {} fr\\u006fm "";',
            'import* \\u0061s foo from "./icefapper.js";'
        ];

        for (const arg of invalidModuleCode) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
                });
            });
        }

        const invalidSyntax = [
            // https://github.com/shapesecurity/shift-parser-js/issues/376
           '({ g\\u0065t x(){} });',
            'for (a o\\u0066 b);',
            '\\u0061sync function* f(){}',
            'void \\u0061sync function* f(){};',
            '({ \\u0061sync m(){} });',
            '"use strict"; var \\u0079ield = 123;',
            'for (var i = 0; i < 100; ++i) { br\\u0065ak; }',
            'cl\\u0061ss Foo {}',
            '\\u0063onst foo = 1;',
            '[th\\u{69}s] = []',
            'th\\u{69}s',
            '[f\\u0061lse] = []',
            'f\\u0061lse',
            'function *gen() { var yi\\u0065ld; }',
            'function *gen() { void yi\\u0065ld; }',
            'class C { static async method() { void \u0061wait; }}',
            // Babylon issue: https://github.com/babel/babel/issues/6717
            'while(n --> 0) { \\u0062\\u0072\\u0065\\u0061\\u{006B}; }',
            'while (i < 10) { if (i++ & 1) c\\u006fntinue; this.x++; }',
            `(function a({ hello: {var:v\\u{0061}r}}) { })`,
            `(function a({ hello: [v\\u{0061}r]}) { })`,
            `(function a({ 0: {var:v\\u{0061}r}}) { })`,
            `(function a({ 0: [v\\u{0061}r]}) { })`,
            `var v\u{0061}r`,
            `'use strict'; impleme\u{006E}ts`,
            `[v\\u{0061}r] = obj`,
            `var v\\u{0061}r = 2000000`,
            'var obj = { async method() { \\u0061wait: ; }};',
            'd\\u0065bugger;',
            'd\\u0065lete this.a;',
            '\\u0063o { } while(0)',
            'if (false) { this.a = 1; } \\u0065lse { this.b = 1; }',
            'e\\u0078port var foo;',
            'try { } catch (e) {} f\\u0069nally { }',
            'n\\u0065w function f() {}',
            'class C extends function() {} { constructor() { sup\\u0065r() } }',
            't\\u0072y { true } catch (e) {}',
            'var x = typ\\u0065of "blah"',
            'v\\u0061r a = true',
            'var { n\\u0075ll } = { 1 };',
            'n\\u0075ll = 1;',
            'try { } c\\u0061tch (e) {}',
            'var \\u{6e}ull = 123;',
            'thi\\u0073 = 123;',
            'f\\u0061lse = 0;',
            'tru\\u0065 = 0;',
            'async() => { \\u0061wait: ;  };',
            '"use strict"; var \\u0079ield = 123;',
            'i\\u0066 (false) {}',
            'var i\\u0066;',
            'i\\u006E',
            'f\\u0061lse: ;',
            'tru\\u0065: ;',
            'var i\\u0066',
            'function *a(){yi\\u0065ld 0}',
            'le\\u0074 a',
            '\\u{74}rue',
            'le\\u0074 x = 5',
            'function* () { y\\u0069eld 10 })',
            '(async function() { aw\\u0061it x })',
            '\\u0061sync x => { await x }',
            'for (var i = 0; i < 100; ++i) { br\\u0065ak; }',
            'cl\\u0061ss Foo {}',
            'var x = cl\\u0061ss {}',
            '\\u0063onst foo = 1;',
            'while (i < 10) { if (i++ & 1) c\\u006fntinue; this.x++; }',
            'd\\u0065bugger;',
            'd\\u0065lete this.a;',
            '\\u0063o { } while(0)',
            'if (d\\u006f { true }) {}',
            'if (false) { this.a = 1; } \\u0065lse { this.b = 1; }',
            'e\\u0078port var foo;',
            'try { } catch (e) {} f\\u0069nally { }',
            'f\\u006fr (var i = 0; i < 10; ++i);',
            'f\\u0075nction fn() {}',
            'var f = f\\u0075nction() {}',
            '\\u0069f (true) { }',
            'n\\u0065w function f() {}',
            '(function() { r\\u0065turn; })()',
            'class C extends function() {} { constructor() { sup\\u0065r() } }',
            'class C extends function() {} { constructor() { sup\\u0065r.a = 1 } }',
            'sw\\u0069tch (this.a) {}',
            'var x = th\\u0069s;',
            'th\\u0069s.a = 1;',
            'thr\\u006fw \'boo\';',
            't\\u0072y { true } catch (e) {}',
            'var x = typ\\u0065of \'blah\'',
            'v\\u0061r a = true',
            'var v\\u0061r = true',
            '(function() { return v\\u006fid 0; })()',
            'wh\\u0069le (true) { }',
            'w\\u0069th (this.scope) { }',
            '(function*() { y\\u0069eld 1; })()',
            '(function*() { var y\\u0069eld = 1; })()',
            'var \\u0065num = 1;',
            'var { \\u0065num } = {}',
            '(\\u0065num = 1);',
            '(x === n\\u0075ll);',
            'var x = n\\u0075ll;',
            'var n\\u0075ll = 1;',
            'var { n\\u0075ll } = { 1 };',
            'n\\u0075ll = 1;',
            '(x === tr\\u0075e);',
            'var x = tr\\u0075e;',
            'var tr\\u0075e = 1;',
            'var { tr\\u0075e } = {};',
            'tr\\u0075e = 1;',
            '(x === f\\u0061lse);',
            'var x = f\\u0061lse;',
            'var f\\u0061lse = 1;',
            'var { f\\u0061lse } = {};',
            'f\\u0061lse = 1;',
            'switch (this.a) { c\\u0061se 6: break; }',
            'try { } c\\u0061tch (e) {}',
            'switch (this.a) { d\\u0065fault: break; }',
            'class C \\u0065xtends function B() {} {}',
            'for (var a i\\u006e this) {}',
            'if (\'foo\' \\u0069n this) {}',
            'if (this \\u0069nstanceof Array) {}',
            '(typ\\u0065of 123)',
            '(v\\u006fid 0)',
            'do { ; } wh\\u0069le (true) { }',
            '(function*() { return (n++, y\\u0069eld 1); })()',
            'class X { st\\u0061tic y() {} }',
            'class C { st\\u0061tic bar() {} }',
            'class C { st\\u0061tic *bar() {} }',
            'class C { st\\u0061tic get bar() {} }',
            'class C { st\\u0061tic set bar() {} }',
        ];

        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Strict);
                });
            });
        }
    });

    describe('Pass', () => {

        const validSyntax = [
            '({le\u0074: 0})',
            '({i\\u0066: 0})',
            'var le\\u0074',
            'var l\\u0065t = 1;',
            'var le\u0074;',
            '(l\\u0065t === 1);',
            'function *a(){({yi\\u0065ld: 0})}',
            '(y\\u0069eld);',
            'var y\\u0069eld = 1;',
            'var { y\\u0069eld } = {};',
            'var le\\u0074',
            '(\\u0061sync ())',
            '(\\u0069mplements = 1);',
            'var impl\\u0065ments = 1;',
            'var { impl\\u0065ments  } = {};',
            '(\\u0069nterface = 1);',
            'var int\\u0065rface = 1;',
            'var { int\\u0065rface  } = {};',
            '(p\\u0061ckage = 1);',
            'var packa\\u0067e = 1;',
            'var { packa\\u0067e  } = {};',
            '(p\\u0072ivate = 1);',
            'var p\\u0072ivate;',
            'var { p\\u0072ivate } = {};',
            '(prot\\u0065cted);',
            'var prot\\u0065cted = 1;',
            'var { prot\\u0065cted  } = {};',
            '(publ\\u0069c);',
            'var publ\\u0069c = 1;',
            'var { publ\\u0069c } = {};',
            '(st\\u0061tic);',
            'var st\\u0061tic = 1;',
            'var { st\\u0061tic } = {};',
        ];

        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        pass(`var { y\\u0069eld } = {};`, Context.OptionsRaw, {
            source: 'var { y\\u0069eld } = {};',
            expected: {
                body: [{
                    declarations: [{
                        id: {
                            properties: [{
                                computed: false,
                                key: {
                                    name: 'yield',
                                    type: 'Identifier'
                                },
                                kind: 'init',
                                method: false,
                                shorthand: true,
                                type: 'Property',
                                value: {
                                    name: 'yield',
                                    type: 'Identifier'
                                }
                            }],
                            type: 'ObjectPattern'
                        },
                        init: {
                            properties: [],
                            type: 'ObjectExpression'
                        },
                        type: 'VariableDeclarator'
                    }],
                    kind: 'var',
                    type: 'VariableDeclaration'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`(y\\u0069eld);`, Context.OptionsRaw, {
            source: '(y\\u0069eld);',
            expected: {
                body: [{
                    expression: {
                        name: 'yield',
                        type: 'Identifier'
                    },
                    type: 'ExpressionStatement'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`(\\u0069mplements = 1);`, Context.OptionsRaw, {
            source: '(\\u0069mplements = 1);',
            expected: {
                body: [{
                    expression: {
                        left: {
                            name: 'implements',
                            type: 'Identifier',
                        },
                        operator: '=',
                        right: {
                            raw: '1',
                            type: 'Literal',
                            value: 1
                        },
                        type: 'AssignmentExpression'
                    },
                    type: 'ExpressionStatement'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`var { p\\u0072ivate } = {};`, Context.OptionsRaw, {
            source: 'var { p\\u0072ivate } = {};',
            expected: {
                body: [{
                    declarations: [{
                        id: {
                            properties: [{
                                computed: false,
                                key: {
                                    name: 'private',
                                    type: 'Identifier'
                                },
                                kind: 'init',
                                method: false,
                                shorthand: true,
                                type: 'Property',
                                value: {
                                    name: 'private',
                                    type: 'Identifier'
                                }
                            }],
                            type: 'ObjectPattern'
                        },
                        init: {
                            properties: [],
                            type: 'ObjectExpression'
                        },
                        type: 'VariableDeclarator'
                    }],
                    kind: 'var',
                    type: 'VariableDeclaration'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`(p\\u0072ivate = 1);`, Context.OptionsRaw, {
            source: '(p\\u0072ivate = 1);',
            expected: {
                body: [{
                    expression: {
                        left: {
                            name: 'private',
                            type: 'Identifier'
                        },
                        operator: '=',
                        right: {
                            raw: '1',
                            type: 'Literal',
                            value: 1
                        },
                        type: 'AssignmentExpression'
                    },
                    type: 'ExpressionStatement'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`var prot\\u0065cted = 1;`, Context.OptionsRaw, {
            source: 'var prot\\u0065cted = 1;',
            expected: {
                body: [{
                    declarations: [{
                        id: {
                            name: 'protected',
                            type: 'Identifier',
                        },
                        init: {
                            raw: '1',
                            type: 'Literal',
                            value: 1,
                        },
                        type: 'VariableDeclarator',
                    }, ],
                    kind: 'var',
                    type: 'VariableDeclaration'
                }, ],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`var { st\\u0061tic } = {};`, Context.OptionsRaw, {
            source: 'var { st\\u0061tic } = {};',
            expected: {
                body: [{
                    declarations: [{
                        id: {
                            properties: [{
                                computed: false,
                                key: {
                                    name: 'static',
                                    type: 'Identifier'
                                },
                                kind: 'init',
                                method: false,
                                shorthand: true,
                                type: 'Property',
                                value: {
                                    name: 'static',
                                    type: 'Identifier'
                                }
                            }],
                            type: 'ObjectPattern'
                        },
                        init: {
                            properties: [],
                            type: 'ObjectExpression'
                        },
                        type: 'VariableDeclarator'
                    }],
                    kind: 'var',
                    type: 'VariableDeclaration'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`(st\\u0061tic);`, Context.OptionsRaw, {
            source: '(st\\u0061tic);',
            expected: {
                body: [{
                    expression: {
                        name: 'static',
                        type: 'Identifier'
                    },
                    type: 'ExpressionStatement'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`({i\\u0066: 0})`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: '({i\\u0066: 0})',
            expected: {
                body: [{
                    end: 14,
                    expression: {
                        end: 13,
                        loc: {
                            end: {
                                column: 13,
                                line: 1,
                            },
                            start: {
                                column: 1,
                                line: 1,
                            }
                        },
                        properties: [{
                            computed: false,
                            end: 12,
                            key: {
                                end: 9,
                                loc: {
                                    end: {
                                        column: 9,
                                        line: 1,
                                    },
                                    start: {
                                        column: 2,
                                        line: 1,
                                    }
                                },
                                name: 'if',
                                start: 2,
                                type: 'Identifier',
                            },
                            kind: 'init',
                            loc: {
                                end: {
                                    column: 12,
                                    line: 1,
                                },
                                start: {
                                    column: 2,
                                    line: 1,
                                }
                            },
                            method: false,
                            shorthand: false,
                            start: 2,
                            type: 'Property',
                            value: {
                                end: 12,
                                loc: {
                                    end: {
                                        column: 12,
                                        line: 1,
                                    },
                                    start: {
                                        column: 11,
                                        line: 1,
                                    },
                                },
                                raw: '0',
                                start: 11,
                                type: 'Literal',
                                value: 0,
                            }
                        }],
                        start: 1,
                        type: 'ObjectExpression',
                    },
                    loc: {
                        end: {
                            column: 14,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        },
                    },
                    start: 0,
                    type: 'ExpressionStatement'
                }, ],
                end: 14,
                loc: {
                    end: {
                        column: 14,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    },
                },
                sourceType: 'script',
                start: 0,
                type: 'Program'
            }
        });

        pass(`var le\\u0074`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: 'var le\\u0074',
            expected: {
                type: 'Program',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                            type: 'Identifier',
                            name: 'let',
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

        pass(`(\\u0061sync ())`, Context.OptionsLoc | Context.OptionsRanges | Context.OptionsRaw, {
            source: '(\\u0061sync ())',
            expected: {
                body: [{
                    end: 15,
                    expression: {
                        arguments: [],
                        callee: {
                            end: 11,
                            loc: {
                                end: {
                                    column: 11,
                                    line: 1,
                                },
                                start: {
                                    column: 1,
                                    line: 1,
                                }
                            },
                            name: 'async',
                            start: 1,
                            type: 'Identifier'
                        },
                        end: 14,
                        loc: {
                            end: {
                                column: 14,
                                line: 1,
                            },
                            start: {
                                column: 1,
                                line: 1,
                            },
                        },
                        start: 1,
                        type: 'CallExpression',
                    },
                    loc: {
                        end: {
                            column: 15,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        },
                    },
                    start: 0,
                    type: 'ExpressionStatement',
                }, ],
                end: 15,
                loc: {
                    end: {
                        column: 15,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    },
                },
                sourceType: 'script',
                start: 0,
                type: 'Program',
            }
        });
    });
});
