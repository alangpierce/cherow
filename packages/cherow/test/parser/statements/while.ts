import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Statements - While', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

    const invalidSyntax = [
        `while 1 break;`,
        'while 0 break;',
        `while 'hood' break;`,
        `while (false) async function* g() {}`,
        `while (false) label1: label2: function f() {}`,
        `while({1}){
            break ;
         };`,
    ];

    for (const arg of invalidSyntax) {
        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
    }

    fail('while (false) function f() {}', Context.Empty, {
            source: 'while (false) function f() {}',
        });

    fail('while (false) function* g() {}', Context.Empty, {
            source: 'while (false) function* g() {}',
        });

    fail('while (false) class C {}', Context.Empty, {
            source: 'while (false) class C {}',
        });

    fail('while (false) let x = 1;', Context.Empty, {
            source: 'while (false) let x = 1;',
        });

    fail('while (false) async function f() {}', Context.Empty, {
            source: 'while (false) async function f() {}',
        });

    fail('while 0 break;', Context.Empty, {
            source: 'while 0 break;',
        });

    fail('while true break;', Context.Empty, {
            source: 'while true break;',
        });

    fail('while "hood" break;', Context.Empty, {
            source: 'while "hood" break;',
        });

    fail('while ( false ) Label: continue Label;', Context.OptionsNext, {
            source: 'while ( false ) Label: continue Label;',
        });

    fail(`while({1}){
            break ;
         };`, Context.Empty, {
            source: `while({1}){
                break ;
             };`,
        });

    fail(`while '' break;`, Context.Empty, {
            source: `while '' break;`,
        });

    fail(`while() {}`, Context.Empty, {
            source: `while() {}`,
        });
    });

    describe('Pass', () => {

    const validSyntax = [
        `while(function a(){return 1;}()){ break }`,
        'while(function __func(){return 1;}()){ break }',
        'while (true) { continue\nthere; }',
        'while (true) { continue // Comment\nthere; }',
        'while (true) { continue /* Multiline\nComment */there; }',
        'while (true) { break\nthere; }',
        'while (i-->0) {}',
        'while (true) { break /* Multiline\nComment */there; }',
        `while (false) let // ASI
        x = 1;`,
        `while (false) let // ASI
        {}`,
    ];

    for (const arg of validSyntax) {
        it(`${arg}`, () => {
            t.doesNotThrow(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
    }

    pass('while (i-->0) {}',  Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: 'while (i-->0) {}',
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
            body: [
              {
                type: 'WhileStatement',
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
                test: {
                  type: 'BinaryExpression',
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
                    type: 'UpdateExpression',
                    start: 7,
                    end: 10,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 10
                      }
                    },
                    operator: '--',
                    prefix: false,
                    argument: {
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
                      name: 'i'
                    }
                  },
                  operator: '>',
                  right: {
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
                  }
                },
                body: {
                  type: 'BlockStatement',
                  start: 14,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 16
                    }
                  },
                  body: []
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`while (x < 10) { x++; y--; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `while (x < 10) { x++; y--; }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 28,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 28
                    }
                },
                body: [{
                    type: 'WhileStatement',
                    start: 0,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 28
                        }
                    },
                    test: {
                        type: 'BinaryExpression',
                        start: 7,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 13
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
                        operator: '<',
                        right: {
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
                            value: 10,
                            raw: '10'
                        }
                    },
                    body: {
                        type: 'BlockStatement',
                        start: 15,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        },
                        body: [{
                                type: 'ExpressionStatement',
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
                                expression: {
                                    type: 'UpdateExpression',
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
                                    operator: '++',
                                    prefix: false,
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
                                }
                            },
                            {
                                type: 'ExpressionStatement',
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
                                expression: {
                                    type: 'UpdateExpression',
                                    start: 22,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    },
                                    operator: '--',
                                    prefix: false,
                                    argument: {
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
                                        name: 'y'
                                    }
                                }
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }

        });

    pass(`while(1);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `while(1);`,
            expected: {
                type: 'Program',
                start: 0,
                end: 9,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                },
                body: [{
                    type: 'WhileStatement',
                    start: 0,
                    end: 9,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    },
                    test: {
                        type: 'Literal',
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
                        value: 1,
                        raw: '1'
                    },
                    body: {
                        type: 'EmptyStatement',
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
                        }
                    }
                }],
                sourceType: 'script'
            }
        });
    });
});
