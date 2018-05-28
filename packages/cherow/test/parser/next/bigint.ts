import { pass } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Next - Bignt', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {
        const invalidSyntax = [
            '1_0_0_0_n',
            '2a5555016n',
            '87ifcgin',
            '0e0n',
            '0xgn',
            '0o9n;',
            '0b2n;',
            '0o9n;',
            '0b2n',
            // invalid float
            '1.0n',
            // invalid noctal
            // "016432n",
            // Invalid left-hand side in assignment
            '0n = foo[0];',
            '(0n = foo[0]);',
        ];

        for (const arg of invalidSyntax) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.OptionsNext);
                });
            });
        }
    });

    describe('Pass', () => {

        const validSyntax = [
            '3n',
            '-1n',
            '(1, 3n), -1n',
            '(1, 3), -1',
            '2**53n',
            '9007199254740991n',
            '0xfn',
            '1001001100101100000001011010010n',
            '322301024030n',
            'try { let {} = 0n } catch (e) {}',
            'const foo = (x) => x + 1001001100101100000001011010010n',
            '1n',
            '(() => 1n / 0n)',
            '0n != true',
            'false != 1n',
            '1n == true',
            '0n ** 0n',
            '1n >= 0',
            'n ^ -1n',
            '0xffffffffffffffffn ^ -1n',
            '-0xbf2ed51ff75d380fd3be813ec6185780n ^ 0x4aabef2324cedff5387f1f65n',
            '1 >= 1n',
            '1n <= 1',
            '() => 1n % 0n',
            '[3n, 20n, 100n]',
            '42n',
            'foo[0] = 0n;',
            '[42n]',
            '([1], -1.00001);',
            '1_0_0_0n',
            '1_0n',
            '1_1n',
            '2_2n',
            '0b1_1n',
            '0o_777n',
            '0o7_77n',
            '1_6n',
            '(0b101n) << 1n',
            `0x123456789abcdef0fedcba9876543212345678n << 32n`,
            `5n << 2n`,
            `0b101011101n`,
            `0xFFF123n`,
            `100n`,
            '9223372036854775807n',
            `- - 1n`,
            `0o0_11n`,
            `123456789_8n`,
            'for (let i = 2n; ; i++) {}',
            '0b1 <= 1n',
            '0b0_1n',
            '0b01_0n',
            '0b0_1_0_1_0n',
            '0o0_0n',
            '0o7_7n',
            '1_0123456789n',
            '0x01_00n',
            '+123456789_0',
            '+123456789_4',
            '-123456789_4n'
        ];

        for (const arg of validSyntax) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.OptionsNext);
                });

            });
        }

        pass(`14n`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module | Context.Strict, {
            source: `14n`,
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 14,
                        bigint: '14n',
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
                        raw: '14n'
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
                }],
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

        pass(`for (let i = 2n; ; i++) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `for (let i = 2n; ; i++) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                        }
                    },
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [{
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 2,
                                bigint: '2n',
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
                                raw: '2n'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'i',
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
                            },
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
                            }
                        }],
                        kind: 'let',
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
                        }
                    },
                    test: null,
                    update: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'i',
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
                        operator: '++',
                        prefix: false,
                        start: 19,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        }
                    },
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
                    }
                }],
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
                }
            }
        });

        pass(`1n <= 1`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `1n <= 1`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Literal',
                            value: 1,
                            bigint: '1n',
                            start: 0,
                            end: 2,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 2
                                }
                            },
                            raw: '1n'
                        },
                        right: {
                            type: 'Literal',
                            value: 1,
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
                            raw: '1'
                        },
                        operator: '<=',
                        start: 0,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    start: 0,
                    end: 7,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                }],
                start: 0,
                end: 7,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            }
        });

        pass(`0b101011101n`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `0b101011101n`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 349,
                        bigint: '0b101011101n',
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
                        raw: '0b101011101n'
                    },
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

        pass(`0x01_00n`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `0x01_00n`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 256,
                        bigint: '0x01_00n',
                        start: 0,
                        end: 8,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        },
                        raw: '0x01_00n'
                    },
                    start: 0,
                    end: 8,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                }],
                start: 0,
                end: 8,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                }
            }
        });

        pass(`0o_777n`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `0o_777n`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 511,
                        bigint: '0o_777n',
                        start: 0,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        },
                        raw: '0o_777n'
                    },
                    start: 0,
                    end: 7,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                }],
                start: 0,
                end: 7,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            }
        });
    });
});
