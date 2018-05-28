import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Exponentiation', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const inValidSyntax = [
            'delete O.p ** 10',
            'delete x ** 10',
            '~O.p ** 10',
            '~x ** 10',
            '!O.p ** 10',
            '!x ** 10',
            '+O.p ** 10',
            '+x ** 10',
            '-O.p ** 10',
            '-x ** 10',
            '!1 ** 2',
            'void 1 ** 2;',
            'typeof O.p ** 10',
            'typeof x ** 10',
            'void ** 10',
            'void O.p ** 10',
            'void x ** 10',
            '-x ** y',
            '++delete O.p ** 10',
            '--delete O.p ** 10',
            '++~O.p ** 10',
            '++~x ** 10',
            '--!O.p ** 10',
            '--!x ** 10',
            '++-O.p ** 10',
            '++-x ** 10',
            '--+O.p ** 10',
            '--+x ** 10',
            '[ x ] **= [ 2 ]',
            '[ x **= 2 ] = [ 2 ]',
            '{ x } **= { x: 2 }',
            '{ x: x **= 2 ] = { x: 2 }',
        ];
        for (const arg of inValidSyntax) {

            it(`var O = { p: 1 }, x = 10; ; if (${arg}) { foo(); }`, () => {
                t.throws(() => {
                    parseSource(`var O = { p: 1 }, x = 10; ; if (${arg}) { foo(); }`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`var O = { p: 1 }, x = 10; ; (${arg})`, () => {
                t.throws(() => {
                    parseSource(`var O = { p: 1 }, x = 10; ; (${arg})`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`var O = { p: 1 }, x = 10; foo(${arg})`, () => {
                t.throws(() => {
                    parseSource(`var O = { p: 1 }, x = 10; foo(${arg})`, undefined, Context.OptionsNext | Context.Module);
                });
            });
        }

        fail('for (var import.meta of [1]) {}', Context.Empty, {
            source: 'for (var import.meta of [1]) {}',
        });
    });

    describe('Pass', () => {

        const validSyntax = [
            '(delete O.p) ** 10',
            '(delete x) ** 10',
            '(~O.p) ** 10',
            '(~x) ** 10',
            '(!O.p) ** 10',
            '(!x) ** 10',
            '(+O.p) ** 10',
            '(+x) ** 10',
            '(-O.p) ** 10',
            'x ** y ** z',
            '++x ** y',
            '(-x) ** y',
            '-(x ** y)',
            '(-x) ** 10',
            '(typeof O.p) ** 10',
            '(typeof x) ** 10',
            '(void 0) ** 10',
            '(void O.p) ** 10',
            '(void x) ** 10',
            '++O.p ** 10',
            '++x ** 10',
            '--O.p ** 10',
            '--x ** 10',
            'O.p++ ** 10',
            'x++ ** 10',
            'O.p-- ** 10',
            'x-- ** 10',
        ];
        for (const arg of validSyntax) {

            it(`var O = { p: 1 }, x = 10; ; if (${arg}) { foo(); }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var O = { p: 1 }, x = 10; ; if (${arg}) { foo(); }`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`var O = { p: 1 }, x = 10; ; (${arg})`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var O = { p: 1 }, x = 10; ; (${arg})`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`var O = { p: 1 }, x = 10; foo(${arg})`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var O = { p: 1 }, x = 10; foo(${arg})`, undefined, Context.OptionsNext | Context.Module);
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
