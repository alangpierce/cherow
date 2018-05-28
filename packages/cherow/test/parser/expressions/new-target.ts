import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - New target', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const inValidSyntax = [
            'new.target',
            '{ new.target }',
            '() => new.target',
            'if (1) { new.target }',
            'if (1) {} else { new.target }',
            'while (0) { new.target }',
            'do { new.target } while (0)',
        ];
        for (const arg of inValidSyntax) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        fail('for (var import.meta of [1]) {}', Context.Empty, {
            source: 'for (var import.meta of [1]) {}',
        });

        //  fail(`() => { new.target; };`, Context.Empty, {
        //    source: '() => { new.target; };',
        //});

        fail(`function f() { new.anythingElse; }`, Context.Empty, {
            source: 'function f() { new.anythingElse; }',
        });

        fail(`new Type[]`, Context.Empty, {
            source: 'new Type[]',
        });

        fail(`function f() { new.t\\u0061rget; }`, Context.Empty, {
          source: 'function f() { new.t\\u0061rget; }',
        });

        fail(`new.prop`, Context.Empty, {
            source: 'new.prop',
        });

        fail(`"new.target`, Context.Empty, {
            source: 'new.target',
        });

        fail(`function() { return new['target']; }`, Context.Empty, {
            source: 'function() { return new["target"]; }',
        });

        fail(`var f = function() { new.unknown_property; }`, Context.Empty, {
            source: 'var f = function() { new.unknown_property; }',
        });

        fail(`function f() { new..target; }`, Context.Empty, {
            source: 'function f() { new..target; }',
        });

        fail(`function() { return new['target']; }`, Context.Empty, {
            source: 'function() { return new["target"]; }',
        });
    });

    describe('Pass', () => {

        const validCombos = [
            'function foo(){with({}) {new.target;}}',
            'function foo(){{if(true){new.target;}}}',
            'function foo(){ var x = function() {new.target;}; x();}',
            'function foo(){ var o = { "foo" : function () { new.target}}; o.foo();}',
        ];
        for (const arg of validCombos) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
                });
            });
        }

        const validSyntax = [
            'new.target',
            '{ new.target }',
            '() => { new.target }',
            '() => new.target',
            'if (1) { new.target }',
            'if (1) {} else { new.target }',
            'while (0) { new.target }',
            'do { new.target } while (0)',
            'function a(b = new.target){}',
            'class C {get x() { { new.target } }}',
            'class C {get x() { () => new.target }}',
            'class C {get x() { do { new.target } while (0) }}',
            'function f() { new.target }',
            'function f() { () => new.target }',
            'function f() { if (1) { new.target } }',
            'function f() { while (0) { new.target } }',
            'function f() { do { new.target } while (0) }',
            `function a(){{if(true){new.target;}}}`,
            `function abc(){ var a = b = c = 1; try {} catch([a,b,c]) { new.target;}}`,
            `function a(){ var o = { "foo" : function () { new.target}}; o.foo();}`,
            '({ set a(b = new.target){} })',
            '(function a(b = new.target){})',
            'function f() { let x = new.target; }',
            'function f() { new new.target()(); }',
            'function f() { new.target(); }',
        ];
        for (const arg of validSyntax) {

            it(`function f() {${arg}}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`function f() {${arg}}`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`'use strict'; function f() {${arg}}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'use strict'; function f() {${arg}}`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`var f = function() {${arg}}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var f = function() {${arg}}`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`({m: function() {${arg}}})`, () => {
                t.doesNotThrow(() => {
                    parseSource(`({m: function() {${arg}}})`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`({set x(_) {${arg}}})`, () => {
                t.doesNotThrow(() => {
                    parseSource(`({set x(_) {${arg}}})`, undefined, Context.OptionsNext);
                });
            });

            it(`'use strict'; ({get x() {${arg}}})`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'use strict'; ({get x() {${arg}}})`, undefined, Context.Empty);
                });
            });

            it(`({m: function() {${arg}}})`, () => {
                t.doesNotThrow(() => {
                    parseSource(`({m: function() {${arg}}})`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`'use strict'; ({m: function() {${arg}}})`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'use strict'; ({m: function() {${arg}}})`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`class C {m() {${arg}}}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C {m() {${arg}}}`, undefined, Context.Empty);
                });
            });

            it(`class C {set x(_) {${arg}}}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C {set x(_) {${arg}}}`, undefined, Context.OptionsNext | Context.Module);
                });
            });
        }

        pass('class C {set x(_) {do { new.target } while (0)}}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module, {
            source: 'class C {set x(_) {do { new.target } while (0)}}',
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [{
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
                        body: [{
                            type: 'MethodDefinition',
                            kind: 'set',
                            static: false,
                            computed: false,
                            key: {
                                type: 'Identifier',
                                name: 'x',
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
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [{
                                    type: 'Identifier',
                                    name: '_',
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
                                }],
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                        type: 'DoWhileStatement',
                                        body: {
                                            type: 'BlockStatement',
                                            body: [{
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    meta: {
                                                        type: 'Identifier',
                                                        name: 'new',
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
                                                        }
                                                    },
                                                    type: 'MetaProperty',
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'target',
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
                                                        }
                                                    },
                                                    start: 24,
                                                    end: 34,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 24
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 34
                                                        }
                                                    }
                                                },
                                                start: 24,
                                                end: 34,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 24
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 34
                                                    }
                                                }
                                            }],
                                            start: 22,
                                            end: 36,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 36
                                                }
                                            }
                                        },
                                        test: {
                                            type: 'Literal',
                                            value: 0,
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
                                            raw: '0'
                                        },
                                        start: 19,
                                        end: 46,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 46
                                            }
                                        }
                                    }],
                                    start: 18,
                                    end: 47,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 47
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 14,
                                end: 47,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 47
                                    }
                                }
                            },
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
                            }
                        }],
                        start: 8,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        }
                    },
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
                    }
                }],
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
                }
            }
        });
    });
});
