import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - New', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [
            'new foo bar',
            'new ) foo',
            'new ++foo',
            'new foo ++',
        ];

        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });

            it(` var f = ${arg}`, () => {
                t.throws(() => {
                    parseSource(` var f = ${arg}`, undefined, Context.Strict);
                });
            });
        }
        fail('new.target', Context.Empty, {
            source: 'new.target',
        });

        fail('{ new.target }', Context.Empty, {
            source: '{ new.target }',
        });

        fail('() => new.target', Context.Empty, {
            source: '() => new.target',
        });

        fail('for (var import.meta of [1]) {}', Context.Empty, {
            source: 'for (var import.meta of [1]) {}',
        });

        fail(`new Type[]`, Context.Empty, {
            source: 'new Type[]',
            line: 1
        });
    });

    describe('Pass', () => {

        const validSyntax = [
            'new foo',
            'new foo();',
            'new foo(1);',
            'new foo(1, 2);',
            'new foo()();',
            'new new foo()();',
            'new foo.bar;',
            'new foo.bar();',
            'new foo.bar.baz;',
            'new foo.bar().baz;',
            'new foo[bar];',
            'new foo[bar]();',
            'new foo[bar][baz];',
            'new foo[bar]()[baz];',
            'new foo[bar].baz(baz)()[bar].baz;',
            'new "foo"',
            'new 1',
            'new a(b,c)',
            'new Button',
            'new Button(a)',
            '(new new Function("this.x = 1")).x;',
            'new function() {}(...[3, 4, 5]);',
            'new function() {}(...[]);',
            'new function() {}(...target = [2, 3, 4]);',
            'new function() {}({...{c: 3, d: 4}});',
            'new function() {}({...null});',
            'new function() {}({...{a: 2, b: 3}, get c() { icefapper = false; }});',
            'new function() {}({...{get a() {}}, c: 4, d: 5, a: 42, ...{get a() {}}});',
            'new function() {}({a: 1, b: 2, ...undefined});',
            'new function() {}({a: 1, b: 2, ...null});',
            'new function() {}(1, 2, 3, ...[]);',
            `new f(...a)`,
            `new f(...a, ...b)`,
            'new(a in b)',
            'new f(...a, b, ...c)',
            'function f(a = new.target){}',
            '(function f(a = new.target){})',
            'function f() { new new.target; }',
            'function f() { new.target(); }',
            'function f() { new["target"]; }',
        ];


        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });

            it(` var f = ${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(` var f = ${arg}`, undefined, Context.Strict | Context.Module);
                });
            });
        }

        pass('new(a in b)', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'new(a in b)',
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
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'NewExpression',
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
                        callee: {
                            type: 'BinaryExpression',
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
                                name: 'a'
                            },
                            operator: 'in',
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
                                name: 'b'
                            }
                        },
                        arguments: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('new Button(a)', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'new Button(a)',
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
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'NewExpression',
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
                        callee: {
                            type: 'Identifier',
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
                            name: 'Button'
                        },
                        arguments: [{
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
                            name: 'a'
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('new new foo', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'new new foo',
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
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'NewExpression',
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
                        callee: {
                            type: 'NewExpression',
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
                            callee: {
                                type: 'Identifier',
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
                                name: 'foo'
                            },
                            arguments: []
                        },
                        arguments: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('new new foo()', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'new new foo()',
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
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'NewExpression',
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
                        callee: {
                            type: 'NewExpression',
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
                            callee: {
                                type: 'Identifier',
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
                                name: 'foo'
                            },
                            arguments: []
                        },
                        arguments: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('new f(...a = b)', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'new f(...a = b)',
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
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'NewExpression',
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
                        callee: {
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
                        arguments: [{
                            type: 'SpreadElement',
                            start: 6,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            },
                            argument: {
                                type: 'AssignmentExpression',
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
                                operator: '=',
                                left: {
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
                                }
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });
    });
});
