import { pass } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Miscellaneous - Punctuators', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    pass(`interpretation of all punctuators`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `({});[];
        this.nan;
        1 < 2 > 3 <= 4 >= 5 == 6 != 7 === 8 !== 9;
        1 + 2 - 3 * 4 % 5 / 6 << 7 >> 8 >>> 9;
        this.nan++; ++this.nan; this.nan--; --this.nan;
        1 & 2 | 3 ^ 4 && !5 || ~6;
        1 ? 2 : 3;
        this.nan = 1; this.nan += 2; this.nan -= 3; this.nan *= 4; this.nan /= 5;
        this.nan %= 6; this.nan <<= 7; this.nan >>= 8; this.nan >>>= 9;
        this.nan &= 1; this.nan |= 2; this.nan ^= 3;`,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [],
                        start: 1,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
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
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [],
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
                        }
                    },
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
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'MemberExpression',
                        object: {
                            type: 'ThisExpression',
                            start: 17,
                            end: 21,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 8
                                },
                                end: {
                                    line: 2,
                                    column: 12
                                }
                            }
                        },
                        computed: false,
                        property: {
                            type: 'Identifier',
                            name: 'nan',
                            start: 22,
                            end: 25,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 13
                                },
                                end: {
                                    line: 2,
                                    column: 16
                                }
                            }
                        },
                        start: 17,
                        end: 25,
                        loc: {
                            start: {
                                line: 2,
                                column: 8
                            },
                            end: {
                                line: 2,
                                column: 16
                            }
                        }
                    },
                    start: 17,
                    end: 26,
                    loc: {
                        start: {
                            line: 2,
                            column: 8
                        },
                        end: {
                            line: 2,
                            column: 17
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'BinaryExpression',
                            left: {
                                type: 'BinaryExpression',
                                left: {
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'BinaryExpression',
                                                left: {
                                                    type: 'BinaryExpression',
                                                    left: {
                                                        type: 'Literal',
                                                        value: 1,
                                                        start: 35,
                                                        end: 36,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 8
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 9
                                                            }
                                                        },
                                                        raw: '1'
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 2,
                                                        start: 39,
                                                        end: 40,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 12
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 13
                                                            }
                                                        },
                                                        raw: '2'
                                                    },
                                                    operator: '<',
                                                    start: 35,
                                                    end: 40,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 8
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 13
                                                        }
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 3,
                                                    start: 43,
                                                    end: 44,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 16
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 17
                                                        }
                                                    },
                                                    raw: '3'
                                                },
                                                operator: '>',
                                                start: 35,
                                                end: 44,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 8
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 17
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 4,
                                                start: 48,
                                                end: 49,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 21
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 22
                                                    }
                                                },
                                                raw: '4'
                                            },
                                            operator: '<=',
                                            start: 35,
                                            end: 49,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 8
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 22
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 5,
                                            start: 53,
                                            end: 54,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 26
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 27
                                                }
                                            },
                                            raw: '5'
                                        },
                                        operator: '>=',
                                        start: 35,
                                        end: 54,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 8
                                            },
                                            end: {
                                                line: 3,
                                                column: 27
                                            }
                                        }
                                    },
                                    right: {
                                        type: 'Literal',
                                        value: 6,
                                        start: 58,
                                        end: 59,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 31
                                            },
                                            end: {
                                                line: 3,
                                                column: 32
                                            }
                                        },
                                        raw: '6'
                                    },
                                    operator: '==',
                                    start: 35,
                                    end: 59,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 8
                                        },
                                        end: {
                                            line: 3,
                                            column: 32
                                        }
                                    }
                                },
                                right: {
                                    type: 'Literal',
                                    value: 7,
                                    start: 63,
                                    end: 64,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 36
                                        },
                                        end: {
                                            line: 3,
                                            column: 37
                                        }
                                    },
                                    raw: '7'
                                },
                                operator: '!=',
                                start: 35,
                                end: 64,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 8
                                    },
                                    end: {
                                        line: 3,
                                        column: 37
                                    }
                                }
                            },
                            right: {
                                type: 'Literal',
                                value: 8,
                                start: 69,
                                end: 70,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 42
                                    },
                                    end: {
                                        line: 3,
                                        column: 43
                                    }
                                },
                                raw: '8'
                            },
                            operator: '===',
                            start: 35,
                            end: 70,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 8
                                },
                                end: {
                                    line: 3,
                                    column: 43
                                }
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 9,
                            start: 75,
                            end: 76,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 48
                                },
                                end: {
                                    line: 3,
                                    column: 49
                                }
                            },
                            raw: '9'
                        },
                        operator: '!==',
                        start: 35,
                        end: 76,
                        loc: {
                            start: {
                                line: 3,
                                column: 8
                            },
                            end: {
                                line: 3,
                                column: 49
                            }
                        }
                    },
                    start: 35,
                    end: 77,
                    loc: {
                        start: {
                            line: 3,
                            column: 8
                        },
                        end: {
                            line: 3,
                            column: 50
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'BinaryExpression',
                            left: {
                                type: 'BinaryExpression',
                                left: {
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 86,
                                            end: 87,
                                            loc: {
                                                start: {
                                                    line: 4,
                                                    column: 8
                                                },
                                                end: {
                                                    line: 4,
                                                    column: 9
                                                }
                                            },
                                            raw: '1'
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 2,
                                            start: 90,
                                            end: 91,
                                            loc: {
                                                start: {
                                                    line: 4,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 4,
                                                    column: 13
                                                }
                                            },
                                            raw: '2'
                                        },
                                        operator: '+',
                                        start: 86,
                                        end: 91,
                                        loc: {
                                            start: {
                                                line: 4,
                                                column: 8
                                            },
                                            end: {
                                                line: 4,
                                                column: 13
                                            }
                                        }
                                    },
                                    right: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'BinaryExpression',
                                                left: {
                                                    type: 'Literal',
                                                    value: 3,
                                                    start: 94,
                                                    end: 95,
                                                    loc: {
                                                        start: {
                                                            line: 4,
                                                            column: 16
                                                        },
                                                        end: {
                                                            line: 4,
                                                            column: 17
                                                        }
                                                    },
                                                    raw: '3'
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 4,
                                                    start: 98,
                                                    end: 99,
                                                    loc: {
                                                        start: {
                                                            line: 4,
                                                            column: 20
                                                        },
                                                        end: {
                                                            line: 4,
                                                            column: 21
                                                        }
                                                    },
                                                    raw: '4'
                                                },
                                                operator: '*',
                                                start: 94,
                                                end: 99,
                                                loc: {
                                                    start: {
                                                        line: 4,
                                                        column: 16
                                                    },
                                                    end: {
                                                        line: 4,
                                                        column: 21
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 5,
                                                start: 102,
                                                end: 103,
                                                loc: {
                                                    start: {
                                                        line: 4,
                                                        column: 24
                                                    },
                                                    end: {
                                                        line: 4,
                                                        column: 25
                                                    }
                                                },
                                                raw: '5'
                                            },
                                            operator: '%',
                                            start: 94,
                                            end: 103,
                                            loc: {
                                                start: {
                                                    line: 4,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 4,
                                                    column: 25
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 6,
                                            start: 106,
                                            end: 107,
                                            loc: {
                                                start: {
                                                    line: 4,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 4,
                                                    column: 29
                                                }
                                            },
                                            raw: '6'
                                        },
                                        operator: '/',
                                        start: 94,
                                        end: 107,
                                        loc: {
                                            start: {
                                                line: 4,
                                                column: 16
                                            },
                                            end: {
                                                line: 4,
                                                column: 29
                                            }
                                        }
                                    },
                                    operator: '-',
                                    start: 86,
                                    end: 107,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 8
                                        },
                                        end: {
                                            line: 4,
                                            column: 29
                                        }
                                    }
                                },
                                right: {
                                    type: 'Literal',
                                    value: 7,
                                    start: 111,
                                    end: 112,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 33
                                        },
                                        end: {
                                            line: 4,
                                            column: 34
                                        }
                                    },
                                    raw: '7'
                                },
                                operator: '<<',
                                start: 86,
                                end: 112,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 8
                                    },
                                    end: {
                                        line: 4,
                                        column: 34
                                    }
                                }
                            },
                            right: {
                                type: 'Literal',
                                value: 8,
                                start: 116,
                                end: 117,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 38
                                    },
                                    end: {
                                        line: 4,
                                        column: 39
                                    }
                                },
                                raw: '8'
                            },
                            operator: '>>',
                            start: 86,
                            end: 117,
                            loc: {
                                start: {
                                    line: 4,
                                    column: 8
                                },
                                end: {
                                    line: 4,
                                    column: 39
                                }
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 9,
                            start: 122,
                            end: 123,
                            loc: {
                                start: {
                                    line: 4,
                                    column: 44
                                },
                                end: {
                                    line: 4,
                                    column: 45
                                }
                            },
                            raw: '9'
                        },
                        operator: '>>>',
                        start: 86,
                        end: 123,
                        loc: {
                            start: {
                                line: 4,
                                column: 8
                            },
                            end: {
                                line: 4,
                                column: 45
                            }
                        }
                    },
                    start: 86,
                    end: 124,
                    loc: {
                        start: {
                            line: 4,
                            column: 8
                        },
                        end: {
                            line: 4,
                            column: 46
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 133,
                                end: 137,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 8
                                    },
                                    end: {
                                        line: 5,
                                        column: 12
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 138,
                                end: 141,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 13
                                    },
                                    end: {
                                        line: 5,
                                        column: 16
                                    }
                                }
                            },
                            start: 133,
                            end: 141,
                            loc: {
                                start: {
                                    line: 5,
                                    column: 8
                                },
                                end: {
                                    line: 5,
                                    column: 16
                                }
                            }
                        },
                        operator: '++',
                        prefix: false,
                        start: 133,
                        end: 143,
                        loc: {
                            start: {
                                line: 5,
                                column: 8
                            },
                            end: {
                                line: 5,
                                column: 18
                            }
                        }
                    },
                    start: 133,
                    end: 144,
                    loc: {
                        start: {
                            line: 5,
                            column: 8
                        },
                        end: {
                            line: 5,
                            column: 19
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        operator: '++',
                        prefix: true,
                        argument: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 147,
                                end: 151,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 22
                                    },
                                    end: {
                                        line: 5,
                                        column: 26
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 152,
                                end: 155,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 27
                                    },
                                    end: {
                                        line: 5,
                                        column: 30
                                    }
                                }
                            },
                            start: 145,
                            end: 155,
                            loc: {
                                start: {
                                    line: 5,
                                    column: 20
                                },
                                end: {
                                    line: 5,
                                    column: 30
                                }
                            }
                        },
                        start: 145,
                        end: 155,
                        loc: {
                            start: {
                                line: 5,
                                column: 20
                            },
                            end: {
                                line: 5,
                                column: 30
                            }
                        }
                    },
                    start: 145,
                    end: 156,
                    loc: {
                        start: {
                            line: 5,
                            column: 20
                        },
                        end: {
                            line: 5,
                            column: 31
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 157,
                                end: 161,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 32
                                    },
                                    end: {
                                        line: 5,
                                        column: 36
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 162,
                                end: 165,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 37
                                    },
                                    end: {
                                        line: 5,
                                        column: 40
                                    }
                                }
                            },
                            start: 157,
                            end: 165,
                            loc: {
                                start: {
                                    line: 5,
                                    column: 32
                                },
                                end: {
                                    line: 5,
                                    column: 40
                                }
                            }
                        },
                        operator: '--',
                        prefix: false,
                        start: 157,
                        end: 167,
                        loc: {
                            start: {
                                line: 5,
                                column: 32
                            },
                            end: {
                                line: 5,
                                column: 42
                            }
                        }
                    },
                    start: 157,
                    end: 168,
                    loc: {
                        start: {
                            line: 5,
                            column: 32
                        },
                        end: {
                            line: 5,
                            column: 43
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        operator: '--',
                        prefix: true,
                        argument: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 171,
                                end: 175,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 46
                                    },
                                    end: {
                                        line: 5,
                                        column: 50
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 176,
                                end: 179,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 51
                                    },
                                    end: {
                                        line: 5,
                                        column: 54
                                    }
                                }
                            },
                            start: 169,
                            end: 179,
                            loc: {
                                start: {
                                    line: 5,
                                    column: 44
                                },
                                end: {
                                    line: 5,
                                    column: 54
                                }
                            }
                        },
                        start: 169,
                        end: 179,
                        loc: {
                            start: {
                                line: 5,
                                column: 44
                            },
                            end: {
                                line: 5,
                                column: 54
                            }
                        }
                    },
                    start: 169,
                    end: 180,
                    loc: {
                        start: {
                            line: 5,
                            column: 44
                        },
                        end: {
                            line: 5,
                            column: 55
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'LogicalExpression',
                        left: {
                            type: 'LogicalExpression',
                            left: {
                                type: 'BinaryExpression',
                                left: {
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'Literal',
                                        value: 1,
                                        start: 189,
                                        end: 190,
                                        loc: {
                                            start: {
                                                line: 6,
                                                column: 8
                                            },
                                            end: {
                                                line: 6,
                                                column: 9
                                            }
                                        },
                                        raw: '1'
                                    },
                                    right: {
                                        type: 'Literal',
                                        value: 2,
                                        start: 193,
                                        end: 194,
                                        loc: {
                                            start: {
                                                line: 6,
                                                column: 12
                                            },
                                            end: {
                                                line: 6,
                                                column: 13
                                            }
                                        },
                                        raw: '2'
                                    },
                                    operator: '&',
                                    start: 189,
                                    end: 194,
                                    loc: {
                                        start: {
                                            line: 6,
                                            column: 8
                                        },
                                        end: {
                                            line: 6,
                                            column: 13
                                        }
                                    }
                                },
                                right: {
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'Literal',
                                        value: 3,
                                        start: 197,
                                        end: 198,
                                        loc: {
                                            start: {
                                                line: 6,
                                                column: 16
                                            },
                                            end: {
                                                line: 6,
                                                column: 17
                                            }
                                        },
                                        raw: '3'
                                    },
                                    right: {
                                        type: 'Literal',
                                        value: 4,
                                        start: 201,
                                        end: 202,
                                        loc: {
                                            start: {
                                                line: 6,
                                                column: 20
                                            },
                                            end: {
                                                line: 6,
                                                column: 21
                                            }
                                        },
                                        raw: '4'
                                    },
                                    operator: '^',
                                    start: 197,
                                    end: 202,
                                    loc: {
                                        start: {
                                            line: 6,
                                            column: 16
                                        },
                                        end: {
                                            line: 6,
                                            column: 21
                                        }
                                    }
                                },
                                operator: '|',
                                start: 189,
                                end: 202,
                                loc: {
                                    start: {
                                        line: 6,
                                        column: 8
                                    },
                                    end: {
                                        line: 6,
                                        column: 21
                                    }
                                }
                            },
                            right: {
                                type: 'UnaryExpression',
                                operator: '!',
                                argument: {
                                    type: 'Literal',
                                    value: 5,
                                    start: 207,
                                    end: 208,
                                    loc: {
                                        start: {
                                            line: 6,
                                            column: 26
                                        },
                                        end: {
                                            line: 6,
                                            column: 27
                                        }
                                    },
                                    raw: '5'
                                },
                                prefix: true,
                                start: 206,
                                end: 208,
                                loc: {
                                    start: {
                                        line: 6,
                                        column: 25
                                    },
                                    end: {
                                        line: 6,
                                        column: 27
                                    }
                                }
                            },
                            operator: '&&',
                            start: 189,
                            end: 208,
                            loc: {
                                start: {
                                    line: 6,
                                    column: 8
                                },
                                end: {
                                    line: 6,
                                    column: 27
                                }
                            }
                        },
                        right: {
                            type: 'UnaryExpression',
                            operator: '~',
                            argument: {
                                type: 'Literal',
                                value: 6,
                                start: 213,
                                end: 214,
                                loc: {
                                    start: {
                                        line: 6,
                                        column: 32
                                    },
                                    end: {
                                        line: 6,
                                        column: 33
                                    }
                                },
                                raw: '6'
                            },
                            prefix: true,
                            start: 212,
                            end: 214,
                            loc: {
                                start: {
                                    line: 6,
                                    column: 31
                                },
                                end: {
                                    line: 6,
                                    column: 33
                                }
                            }
                        },
                        operator: '||',
                        start: 189,
                        end: 214,
                        loc: {
                            start: {
                                line: 6,
                                column: 8
                            },
                            end: {
                                line: 6,
                                column: 33
                            }
                        }
                    },
                    start: 189,
                    end: 215,
                    loc: {
                        start: {
                            line: 6,
                            column: 8
                        },
                        end: {
                            line: 6,
                            column: 34
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'Literal',
                            value: 1,
                            start: 224,
                            end: 225,
                            loc: {
                                start: {
                                    line: 7,
                                    column: 8
                                },
                                end: {
                                    line: 7,
                                    column: 9
                                }
                            },
                            raw: '1'
                        },
                        consequent: {
                            type: 'Literal',
                            value: 2,
                            start: 228,
                            end: 229,
                            loc: {
                                start: {
                                    line: 7,
                                    column: 12
                                },
                                end: {
                                    line: 7,
                                    column: 13
                                }
                            },
                            raw: '2'
                        },
                        alternate: {
                            type: 'Literal',
                            value: 3,
                            start: 232,
                            end: 233,
                            loc: {
                                start: {
                                    line: 7,
                                    column: 16
                                },
                                end: {
                                    line: 7,
                                    column: 17
                                }
                            },
                            raw: '3'
                        },
                        start: 224,
                        end: 233,
                        loc: {
                            start: {
                                line: 7,
                                column: 8
                            },
                            end: {
                                line: 7,
                                column: 17
                            }
                        }
                    },
                    start: 224,
                    end: 234,
                    loc: {
                        start: {
                            line: 7,
                            column: 8
                        },
                        end: {
                            line: 7,
                            column: 18
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 243,
                                end: 247,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 8
                                    },
                                    end: {
                                        line: 8,
                                        column: 12
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 248,
                                end: 251,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 13
                                    },
                                    end: {
                                        line: 8,
                                        column: 16
                                    }
                                }
                            },
                            start: 243,
                            end: 251,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 8
                                },
                                end: {
                                    line: 8,
                                    column: 16
                                }
                            }
                        },
                        operator: '=',
                        right: {
                            type: 'Literal',
                            value: 1,
                            start: 254,
                            end: 255,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 19
                                },
                                end: {
                                    line: 8,
                                    column: 20
                                }
                            },
                            raw: '1'
                        },
                        start: 243,
                        end: 255,
                        loc: {
                            start: {
                                line: 8,
                                column: 8
                            },
                            end: {
                                line: 8,
                                column: 20
                            }
                        }
                    },
                    start: 243,
                    end: 256,
                    loc: {
                        start: {
                            line: 8,
                            column: 8
                        },
                        end: {
                            line: 8,
                            column: 21
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 257,
                                end: 261,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 22
                                    },
                                    end: {
                                        line: 8,
                                        column: 26
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 262,
                                end: 265,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 27
                                    },
                                    end: {
                                        line: 8,
                                        column: 30
                                    }
                                }
                            },
                            start: 257,
                            end: 265,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 22
                                },
                                end: {
                                    line: 8,
                                    column: 30
                                }
                            }
                        },
                        operator: '+=',
                        right: {
                            type: 'Literal',
                            value: 2,
                            start: 269,
                            end: 270,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 34
                                },
                                end: {
                                    line: 8,
                                    column: 35
                                }
                            },
                            raw: '2'
                        },
                        start: 257,
                        end: 270,
                        loc: {
                            start: {
                                line: 8,
                                column: 22
                            },
                            end: {
                                line: 8,
                                column: 35
                            }
                        }
                    },
                    start: 257,
                    end: 271,
                    loc: {
                        start: {
                            line: 8,
                            column: 22
                        },
                        end: {
                            line: 8,
                            column: 36
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 272,
                                end: 276,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 37
                                    },
                                    end: {
                                        line: 8,
                                        column: 41
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 277,
                                end: 280,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 42
                                    },
                                    end: {
                                        line: 8,
                                        column: 45
                                    }
                                }
                            },
                            start: 272,
                            end: 280,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 37
                                },
                                end: {
                                    line: 8,
                                    column: 45
                                }
                            }
                        },
                        operator: '-=',
                        right: {
                            type: 'Literal',
                            value: 3,
                            start: 284,
                            end: 285,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 49
                                },
                                end: {
                                    line: 8,
                                    column: 50
                                }
                            },
                            raw: '3'
                        },
                        start: 272,
                        end: 285,
                        loc: {
                            start: {
                                line: 8,
                                column: 37
                            },
                            end: {
                                line: 8,
                                column: 50
                            }
                        }
                    },
                    start: 272,
                    end: 286,
                    loc: {
                        start: {
                            line: 8,
                            column: 37
                        },
                        end: {
                            line: 8,
                            column: 51
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 287,
                                end: 291,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 52
                                    },
                                    end: {
                                        line: 8,
                                        column: 56
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 292,
                                end: 295,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 57
                                    },
                                    end: {
                                        line: 8,
                                        column: 60
                                    }
                                }
                            },
                            start: 287,
                            end: 295,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 52
                                },
                                end: {
                                    line: 8,
                                    column: 60
                                }
                            }
                        },
                        operator: '*=',
                        right: {
                            type: 'Literal',
                            value: 4,
                            start: 299,
                            end: 300,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 64
                                },
                                end: {
                                    line: 8,
                                    column: 65
                                }
                            },
                            raw: '4'
                        },
                        start: 287,
                        end: 300,
                        loc: {
                            start: {
                                line: 8,
                                column: 52
                            },
                            end: {
                                line: 8,
                                column: 65
                            }
                        }
                    },
                    start: 287,
                    end: 301,
                    loc: {
                        start: {
                            line: 8,
                            column: 52
                        },
                        end: {
                            line: 8,
                            column: 66
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 302,
                                end: 306,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 67
                                    },
                                    end: {
                                        line: 8,
                                        column: 71
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 307,
                                end: 310,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 72
                                    },
                                    end: {
                                        line: 8,
                                        column: 75
                                    }
                                }
                            },
                            start: 302,
                            end: 310,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 67
                                },
                                end: {
                                    line: 8,
                                    column: 75
                                }
                            }
                        },
                        operator: '/=',
                        right: {
                            type: 'Literal',
                            value: 5,
                            start: 314,
                            end: 315,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 79
                                },
                                end: {
                                    line: 8,
                                    column: 80
                                }
                            },
                            raw: '5'
                        },
                        start: 302,
                        end: 315,
                        loc: {
                            start: {
                                line: 8,
                                column: 67
                            },
                            end: {
                                line: 8,
                                column: 80
                            }
                        }
                    },
                    start: 302,
                    end: 316,
                    loc: {
                        start: {
                            line: 8,
                            column: 67
                        },
                        end: {
                            line: 8,
                            column: 81
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 325,
                                end: 329,
                                loc: {
                                    start: {
                                        line: 9,
                                        column: 8
                                    },
                                    end: {
                                        line: 9,
                                        column: 12
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 330,
                                end: 333,
                                loc: {
                                    start: {
                                        line: 9,
                                        column: 13
                                    },
                                    end: {
                                        line: 9,
                                        column: 16
                                    }
                                }
                            },
                            start: 325,
                            end: 333,
                            loc: {
                                start: {
                                    line: 9,
                                    column: 8
                                },
                                end: {
                                    line: 9,
                                    column: 16
                                }
                            }
                        },
                        operator: '%=',
                        right: {
                            type: 'Literal',
                            value: 6,
                            start: 337,
                            end: 338,
                            loc: {
                                start: {
                                    line: 9,
                                    column: 20
                                },
                                end: {
                                    line: 9,
                                    column: 21
                                }
                            },
                            raw: '6'
                        },
                        start: 325,
                        end: 338,
                        loc: {
                            start: {
                                line: 9,
                                column: 8
                            },
                            end: {
                                line: 9,
                                column: 21
                            }
                        }
                    },
                    start: 325,
                    end: 339,
                    loc: {
                        start: {
                            line: 9,
                            column: 8
                        },
                        end: {
                            line: 9,
                            column: 22
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 340,
                                end: 344,
                                loc: {
                                    start: {
                                        line: 9,
                                        column: 23
                                    },
                                    end: {
                                        line: 9,
                                        column: 27
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 345,
                                end: 348,
                                loc: {
                                    start: {
                                        line: 9,
                                        column: 28
                                    },
                                    end: {
                                        line: 9,
                                        column: 31
                                    }
                                }
                            },
                            start: 340,
                            end: 348,
                            loc: {
                                start: {
                                    line: 9,
                                    column: 23
                                },
                                end: {
                                    line: 9,
                                    column: 31
                                }
                            }
                        },
                        operator: '<<=',
                        right: {
                            type: 'Literal',
                            value: 7,
                            start: 353,
                            end: 354,
                            loc: {
                                start: {
                                    line: 9,
                                    column: 36
                                },
                                end: {
                                    line: 9,
                                    column: 37
                                }
                            },
                            raw: '7'
                        },
                        start: 340,
                        end: 354,
                        loc: {
                            start: {
                                line: 9,
                                column: 23
                            },
                            end: {
                                line: 9,
                                column: 37
                            }
                        }
                    },
                    start: 340,
                    end: 355,
                    loc: {
                        start: {
                            line: 9,
                            column: 23
                        },
                        end: {
                            line: 9,
                            column: 38
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 356,
                                end: 360,
                                loc: {
                                    start: {
                                        line: 9,
                                        column: 39
                                    },
                                    end: {
                                        line: 9,
                                        column: 43
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 361,
                                end: 364,
                                loc: {
                                    start: {
                                        line: 9,
                                        column: 44
                                    },
                                    end: {
                                        line: 9,
                                        column: 47
                                    }
                                }
                            },
                            start: 356,
                            end: 364,
                            loc: {
                                start: {
                                    line: 9,
                                    column: 39
                                },
                                end: {
                                    line: 9,
                                    column: 47
                                }
                            }
                        },
                        operator: '>>=',
                        right: {
                            type: 'Literal',
                            value: 8,
                            start: 369,
                            end: 370,
                            loc: {
                                start: {
                                    line: 9,
                                    column: 52
                                },
                                end: {
                                    line: 9,
                                    column: 53
                                }
                            },
                            raw: '8'
                        },
                        start: 356,
                        end: 370,
                        loc: {
                            start: {
                                line: 9,
                                column: 39
                            },
                            end: {
                                line: 9,
                                column: 53
                            }
                        }
                    },
                    start: 356,
                    end: 371,
                    loc: {
                        start: {
                            line: 9,
                            column: 39
                        },
                        end: {
                            line: 9,
                            column: 54
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 372,
                                end: 376,
                                loc: {
                                    start: {
                                        line: 9,
                                        column: 55
                                    },
                                    end: {
                                        line: 9,
                                        column: 59
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 377,
                                end: 380,
                                loc: {
                                    start: {
                                        line: 9,
                                        column: 60
                                    },
                                    end: {
                                        line: 9,
                                        column: 63
                                    }
                                }
                            },
                            start: 372,
                            end: 380,
                            loc: {
                                start: {
                                    line: 9,
                                    column: 55
                                },
                                end: {
                                    line: 9,
                                    column: 63
                                }
                            }
                        },
                        operator: '>>>=',
                        right: {
                            type: 'Literal',
                            value: 9,
                            start: 386,
                            end: 387,
                            loc: {
                                start: {
                                    line: 9,
                                    column: 69
                                },
                                end: {
                                    line: 9,
                                    column: 70
                                }
                            },
                            raw: '9'
                        },
                        start: 372,
                        end: 387,
                        loc: {
                            start: {
                                line: 9,
                                column: 55
                            },
                            end: {
                                line: 9,
                                column: 70
                            }
                        }
                    },
                    start: 372,
                    end: 388,
                    loc: {
                        start: {
                            line: 9,
                            column: 55
                        },
                        end: {
                            line: 9,
                            column: 71
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 397,
                                end: 401,
                                loc: {
                                    start: {
                                        line: 10,
                                        column: 8
                                    },
                                    end: {
                                        line: 10,
                                        column: 12
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 402,
                                end: 405,
                                loc: {
                                    start: {
                                        line: 10,
                                        column: 13
                                    },
                                    end: {
                                        line: 10,
                                        column: 16
                                    }
                                }
                            },
                            start: 397,
                            end: 405,
                            loc: {
                                start: {
                                    line: 10,
                                    column: 8
                                },
                                end: {
                                    line: 10,
                                    column: 16
                                }
                            }
                        },
                        operator: '&=',
                        right: {
                            type: 'Literal',
                            value: 1,
                            start: 409,
                            end: 410,
                            loc: {
                                start: {
                                    line: 10,
                                    column: 20
                                },
                                end: {
                                    line: 10,
                                    column: 21
                                }
                            },
                            raw: '1'
                        },
                        start: 397,
                        end: 410,
                        loc: {
                            start: {
                                line: 10,
                                column: 8
                            },
                            end: {
                                line: 10,
                                column: 21
                            }
                        }
                    },
                    start: 397,
                    end: 411,
                    loc: {
                        start: {
                            line: 10,
                            column: 8
                        },
                        end: {
                            line: 10,
                            column: 22
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 412,
                                end: 416,
                                loc: {
                                    start: {
                                        line: 10,
                                        column: 23
                                    },
                                    end: {
                                        line: 10,
                                        column: 27
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 417,
                                end: 420,
                                loc: {
                                    start: {
                                        line: 10,
                                        column: 28
                                    },
                                    end: {
                                        line: 10,
                                        column: 31
                                    }
                                }
                            },
                            start: 412,
                            end: 420,
                            loc: {
                                start: {
                                    line: 10,
                                    column: 23
                                },
                                end: {
                                    line: 10,
                                    column: 31
                                }
                            }
                        },
                        operator: '|=',
                        right: {
                            type: 'Literal',
                            value: 2,
                            start: 424,
                            end: 425,
                            loc: {
                                start: {
                                    line: 10,
                                    column: 35
                                },
                                end: {
                                    line: 10,
                                    column: 36
                                }
                            },
                            raw: '2'
                        },
                        start: 412,
                        end: 425,
                        loc: {
                            start: {
                                line: 10,
                                column: 23
                            },
                            end: {
                                line: 10,
                                column: 36
                            }
                        }
                    },
                    start: 412,
                    end: 426,
                    loc: {
                        start: {
                            line: 10,
                            column: 23
                        },
                        end: {
                            line: 10,
                            column: 37
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ThisExpression',
                                start: 427,
                                end: 431,
                                loc: {
                                    start: {
                                        line: 10,
                                        column: 38
                                    },
                                    end: {
                                        line: 10,
                                        column: 42
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'nan',
                                start: 432,
                                end: 435,
                                loc: {
                                    start: {
                                        line: 10,
                                        column: 43
                                    },
                                    end: {
                                        line: 10,
                                        column: 46
                                    }
                                }
                            },
                            start: 427,
                            end: 435,
                            loc: {
                                start: {
                                    line: 10,
                                    column: 38
                                },
                                end: {
                                    line: 10,
                                    column: 46
                                }
                            }
                        },
                        operator: '^=',
                        right: {
                            type: 'Literal',
                            value: 3,
                            start: 439,
                            end: 440,
                            loc: {
                                start: {
                                    line: 10,
                                    column: 50
                                },
                                end: {
                                    line: 10,
                                    column: 51
                                }
                            },
                            raw: '3'
                        },
                        start: 427,
                        end: 440,
                        loc: {
                            start: {
                                line: 10,
                                column: 38
                            },
                            end: {
                                line: 10,
                                column: 51
                            }
                        }
                    },
                    start: 427,
                    end: 441,
                    loc: {
                        start: {
                            line: 10,
                            column: 38
                        },
                        end: {
                            line: 10,
                            column: 52
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 441,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 10,
                    column: 52
                }
            }
        }
    });
});
