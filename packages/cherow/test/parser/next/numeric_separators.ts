import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Next - Numeric separator', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {
        const invalidSyntax = [
            '1_0_0_0_',
            '1_0_0__0_',
            '1__0_0_0_',
            '1e_1',
            '1e+_1',
            '._123',
            '1_e+1',
            '1__0',
            '0x_1',
            '0x1__1',
            '0x1_',
            '0_x1',
            '0_x_1',

            '0b11_',
            '0b1__1',
            '0_b1',
            '0_b_1',
            '0o777_',
            '0o7__77',
            '0.0_2_1_',
            '0.0__21',
            '0_.01',
            '0._01',
            '00_122',
            '00122_',
            '0_012',
            '07_7_7',
            '0_7_7_7',
            '0_777',
            '07_7_7_',
            '07__77',
            '0__777',
            '0o0_',
            '0x0__0',
            '._e1',
            '10._e1',
            '0b0_',
            '0x0_',
            '0__0123456789',
            `"let a\\u{12_34} = 5"`,
            `5_______2;`,
            '0x_52',
            `3_.1415F;`,
            '0x_52',
            `0b0__0`,
            `1__0123456789`,
            '(1__1)',
            `(1_1.1_E1)`,
            `(1_1_.1_1)`,
            '(1__1)',
            `0xa_1_`,
            `0x0_`,
            '10__0123456789',
            '0o0__0',
            '0x0__0',
            '0\\u005F0123456789',
            '1._43',
            `1e+_1;`,
            'i = 4_1_ice_fapper_is_not_a_numeric_separator'

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
            '1_0_0_0',
            '1_0',
            '1_1',
            '2_2',
            '3_3',
            '4_5',
            '99_99',
            `0b0_1_0_1_0`,
            '0o7_7_7',
            '.3_2_1',
            '1_0.0_1',
            '0X0_11_0101;',
            '0x1_1',
            '0b_0101',
            '1.0e+1_0',
            '1.0e-10_0',
            '1.0e-1_0',
            '0b1_1',
            '0o_777',
            '0o7_77',
            '0.0_2_1',
            '0.0_21',
            '1_0_0_0',
            '1_0e+1',
            '1_0e+1_0',
            '0xF_F_FF',
            '0o7_7_7',
            '1_6',
            '0b0_1',
            '0b01_0',
            '0b0_1_0_1_0',
            '.3_2_1',
            '0o0_0',
            '0o7_7',
            '0.0_2_1',
            '1_0123456789',
            '1_0.0_1',
            '.0_1_2',
            '0o0_10',
            '.00_01e2',
            '0x01_00',
            '+123456789_0',
            '+123456789_4',
            '-123456789_4',
            //'for (let i = 10; i < 1_4_5;++i) {}',
            `i + 0o12_1`,
            '((i = 1_1) => {})',
            '0b1010_1001',
            '0o1100_0011;',
            `1_2.3_4e5_6`,
            `0xA0_B0_C0`,
            '10.00_01e2',
            '.10_1e2',
            '1_1',
            '0x01_00',
            '1.1_0_1e1',
            '3.14_15;',
        ];

        for (const arg of validSyntax) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.OptionsNext);
                });
                t.doesNotThrow(() => {
                    parseSource(`var foo = ${arg};`, undefined, Context.OptionsNext);
                });
            });
            it(`var foo = ${arg};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var foo = ${arg};`, undefined, Context.OptionsNext);
                });
            });
        }
/*
        pass(`((i = 1_1) => {})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `((i = 1_1) => {})`,
            expected: {
                "type": "Program",
                "sourceType": "script",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 14,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "i",
                                        "start": 2,
                                        "end": 3,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 2
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 3
                                            }
                                        }
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": "11",
                                        "start": 6,
                                        "end": 9,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 6
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 9
                                            }
                                        },
                                        "raw": "1_1"
                                    },
                                    "start": 2,
                                    "end": 9,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 2
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 9
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 1,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            }
                        },
                        "start": 0,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        }
                    }
                ],
                "start": 0,
                "end": 17,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 17
                    }
                }
            }
        });**/

        pass(`1.1_4`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `1.1_4`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 1.14,
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
                            raw: '1.1_4'
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`3.14_15;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `3.14_15;`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 3.1415,
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
                            raw: '3.14_15'
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
                    }
                ],
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
        pass(`0x01_00`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `0x01_00`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 256,
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
                            raw: '0x01_00'
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
                    }
                ],
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

        pass(`0b01_00`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `0b01_00`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 4,
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
                            raw: '0b01_00'
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
                    }
                ],
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

        pass(`0b0_1`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `0b0_1`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 1,
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
                            raw: '0b0_1'
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`0009.5_4`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `0009.5_4`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 9.54,
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
                            raw: '0009.5_4'
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
                    }
                ],
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

        pass(`.10_1e2`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `.10_1e2`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 10.1,
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
                            raw: '.10_1e2'
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
                    }
                ],
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

        pass(`1.0e-1_0`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `1.0e-1_0`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 1e-10,
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
                            raw: '1.0e-1_0'
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
                    }
                ],
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

        pass(`1.1_4`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module | Context.Strict, {
            source: `1.1_4`,
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 1.14,
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
                            raw: '1.1_4'
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
                        }
                    }
                ],
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
                }
            }
        });
    });
});
