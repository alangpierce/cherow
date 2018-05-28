import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Statements - Continue', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        fail('while ( false ) Label: continue Label;', Context.Empty, {
            source: 'while ( false ) Label: continue Label;',
        });

        fail('do {  test262: {  continue test262; } } while (a)', Context.Empty, {
            source: 'do {  test262: {  continue test262; } } while (a)',
        });

        fail('do {  test262: {  continue test262; } } while (a)', Context.Empty, {
            source: 'do {  test262: {  continue test262; } } while (a)',
        });

        fail('do {  test262: {  continue test262; } } while (a)', Context.Empty, {
            source: 'do {  test262: {  continue test262; } } while (a)',
        });

        fail('do {  test262: {  continue test262; } } while (a)', Context.Empty, {
            source: 'do {  test262: {  continue test262; } } while (a)',
        });

        fail('do {  test262: {  continue test262; } } while (a)', Context.Empty, {
            source: 'do {  test262: {  continue test262; } } while (a)',
        });

        fail('ice: while(true) { continue fapper; }', Context.Empty, {
            source: 'ice: while(true) { continue fapper; }',
        });

        fail(`loop1: while (true) { loop2: function a() { continue loop2; } }`, Context.Empty, {
            source: `loop1: while (true) { loop2: function a() { continue loop2; } }`,
        });

        fail(`loop1: while (true) { loop2: function a() { continue loop1; } }`, Context.Empty, {
            source: `loop1: while (true) { loop2: function a() { continue loop1; } }`,
        });

        fail(`loop1: while (true) { loop1: function a() { continue loop1; } }`, Context.Empty, {
            source: `loop1: while (true) { loop1: function a() { continue loop1; } }`,
        });

        // Test262 tests

        fail(`LABEL1 : do {
x++;
(function(){continue LABEL1;})();
y++;
} while(0);`, Context.Empty, {
            source: `LABEL1 : do {
  x++;
  (function(){continue LABEL1;})();
  y++;
} while(0);`,
        });

        fail(`try{
LABEL1 : do {
  x++;
  throw "gonna leave it";
  y++;
} while(0);
$ERROR('#1: throw "gonna leave it" lead to throwing exception');
} catch(e){
continue LABEL2;
LABEL2 : do {
  x++;
  y++;
} while(0);
};`, Context.Empty, {
            source: `try{
  LABEL1 : do {
    x++;
    throw "gonna leave it";
    y++;
  } while(0);
  $ERROR('#1: throw "gonna leave it" lead to throwing exception');
} catch(e){
  continue LABEL2;
  LABEL2 : do {
    x++;
    y++;
  } while(0);
};`,
        });

        fail(`try{
LABEL1 : do {
  x++;
  throw "gonna leave it";
  y++;
} while(0);
$ERROR('#1: throw "gonna leave it" lead to throwing exception');
} catch(e){
continue;
LABEL2 : do {
  x++;
  y++;
} while(0);
};`, Context.Empty, {
            source: `try{
  LABEL1 : do {
    x++;
    throw "gonna leave it";
    y++;
  } while(0);
  $ERROR('#1: throw "gonna leave it" lead to throwing exception');
} catch(e){
  continue;
  LABEL2 : do {
    x++;
    y++;
  } while(0);
};`,
        });
    });

    describe('Pass', () => {

        pass(`while (true) { continue; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `while (true) { continue; }`,
            expected: {
                type: 'Program',
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
                },
                body: [{
                    type: 'WhileStatement',
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
                    },
                    test: {
                        type: 'Literal',
                        start: 7,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        },
                        value: true,
                        raw: 'true'
                    },
                    body: {
                        type: 'BlockStatement',
                        start: 13,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        },
                        body: [{
                            type: 'ContinueStatement',
                            start: 15,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            },
                            label: null
                        }]
                    }
                }],
                sourceType: 'script'
            }

        });

        pass(`while (true) { continue }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `while (true) { continue }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 25,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 25
                    }
                },
                body: [{
                    type: 'WhileStatement',
                    start: 0,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    },
                    test: {
                        type: 'Literal',
                        start: 7,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        },
                        value: true,
                        raw: 'true'
                    },
                    body: {
                        type: 'BlockStatement',
                        start: 13,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        },
                        body: [{
                            type: 'ContinueStatement',
                            start: 15,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            },
                            label: null
                        }]
                    }
                }],
                sourceType: 'script'
            }

        });

        pass(`done: while (true) { continue done }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `done: while (true) { continue done }`,
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
                        line: 1,
                        column: 36
                    }
                },
                body: [{
                    type: 'LabeledStatement',
                    start: 0,
                    end: 36,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 36
                        }
                    },
                    body: {
                        type: 'WhileStatement',
                        start: 6,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        },
                        test: {
                            type: 'Literal',
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
                            value: true,
                            raw: 'true'
                        },
                        body: {
                            type: 'BlockStatement',
                            start: 19,
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            },
                            body: [{
                                type: 'ContinueStatement',
                                start: 21,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                },
                                label: {
                                    type: 'Identifier',
                                    start: 30,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 34
                                        }
                                    },
                                    name: 'done'
                                }
                            }]
                        }
                    },
                    label: {
                        type: 'Identifier',
                        start: 0,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        },
                        name: 'done'
                    }
                }],
                sourceType: 'script'
            }

        });

        pass(`a: do continue a; while(1);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `a: do continue a; while(1);`,
            expected: {
                type: 'Program',
                start: 0,
                end: 27,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 27
                    }
                },
                body: [{
                    type: 'LabeledStatement',
                    start: 0,
                    end: 27,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 27
                        }
                    },
                    body: {
                        type: 'DoWhileStatement',
                        start: 3,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        },
                        body: {
                            type: 'ContinueStatement',
                            start: 6,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            },
                            label: {
                                type: 'Identifier',
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
                                },
                                name: 'a'
                            }
                        },
                        test: {
                            type: 'Literal',
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
                            },
                            value: 1,
                            raw: '1'
                        }
                    },
                    label: {
                        type: 'Identifier',
                        start: 0,
                        end: 1,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        },
                        name: 'a'
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`a: while (0) { continue \n b; }`, Context.Empty, {
            source: `a: while (0) { continue \n b; }`,
            expected: {
                body: [{
                    body: {
                        body: {
                            body: [{
                                    label: null,
                                    type: 'ContinueStatement'
                                },
                                {
                                    expression: {
                                        name: 'b',
                                        type: 'Identifier',
                                    },
                                    type: 'ExpressionStatement'
                                }
                            ],
                            type: 'BlockStatement',
                        },
                        test: {
                            type: 'Literal',
                            value: 0,
                        },
                        type: 'WhileStatement'
                    },
                    label: {
                        name: 'a',
                        type: 'Identifier',
                    },
                    type: 'LabeledStatement'
                }, ],
                sourceType: 'script',
                type: 'Program'
            }

        });

        pass(`a: while (0) { continue \r\n b; }`, Context.Empty, {
            source: `a: while (0) { continue \r\n b; }`,
            expected: {
                body: [{
                    body: {
                        body: {
                            body: [{
                                    label: null,
                                    type: 'ContinueStatement'
                                },
                                {
                                    expression: {
                                        name: 'b',
                                        type: 'Identifier',
                                    },
                                    type: 'ExpressionStatement'
                                }
                            ],
                            type: 'BlockStatement',
                        },
                        test: {
                            type: 'Literal',
                            value: 0,
                        },
                        type: 'WhileStatement'
                    },
                    label: {
                        name: 'a',
                        type: 'Identifier',
                    },
                    type: 'LabeledStatement'
                }, ],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`a: while (0) { continue /*\r*/ b; }`, Context.Empty, {
            source: `a: while (0) { continue /*\r*/ b; }`,
            expected: {
                body: [{
                    body: {
                        body: {
                            body: [{
                                    label: null,
                                    type: 'ContinueStatement'
                                },
                                {
                                    expression: {
                                        name: 'b',
                                        type: 'Identifier'
                                    },
                                    type: 'ExpressionStatement'
                                },
                            ],
                            type: 'BlockStatement'
                        },
                        test: {
                            type: 'Literal',
                            value: 0,
                        },
                        type: 'WhileStatement'
                    },
                    label: {
                        name: 'a',
                        type: 'Identifier'
                    },
                    type: 'LabeledStatement'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`a: while (0) { continue /*\u2028*/ b; }`, Context.Empty, {
            source: `a: while (0) { continue /*\u2028*/ b; }`,
            expected: {
                body: [{
                    body: {
                        body: {
                            body: [{
                                    label: null,
                                    type: 'ContinueStatement'
                                },
                                {
                                    expression: {
                                        name: 'b',
                                        type: 'Identifier',
                                    },
                                    type: 'ExpressionStatement'
                                }
                            ],
                            type: 'BlockStatement',
                        },
                        test: {
                            type: 'Literal',
                            value: 0,
                        },
                        type: 'WhileStatement',
                    },
                    label: {
                        name: 'a',
                        type: 'Identifier',
                    },
                    type: 'LabeledStatement'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });
    });

    pass(`var count = 0;
    for (let x = 0; x < 10;) {
      x++;
      for (let y = 0; y < 2;) {
        y++;
        count++;
      }
      continue;
    }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `var count = 0;
        for (let x = 0; x < 10;) {
          x++;
          for (let y = 0; y < 2;) {
            y++;
            count++;
          }
          continue;
        }`,
        expected: {
            type: 'Program',
            start: 0,
            end: 180,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 9,
                column: 9
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
                    id: {
                      type: 'Identifier',
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
                      name: 'count'
                    },
                    init: {
                      type: 'Literal',
                      start: 12,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 13
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
                type: 'ForStatement',
                start: 23,
                end: 180,
                loc: {
                  start: {
                    line: 2,
                    column: 8
                  },
                  end: {
                    line: 9,
                    column: 9
                  }
                },
                init: {
                  type: 'VariableDeclaration',
                  start: 28,
                  end: 37,
                  loc: {
                    start: {
                      line: 2,
                      column: 13
                    },
                    end: {
                      line: 2,
                      column: 22
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 32,
                      end: 37,
                      loc: {
                        start: {
                          line: 2,
                          column: 17
                        },
                        end: {
                          line: 2,
                          column: 22
                        }
                      },
                      id: {
                        type: 'Identifier',
                        start: 32,
                        end: 33,
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
                        name: 'x'
                      },
                      init: {
                        type: 'Literal',
                        start: 36,
                        end: 37,
                        loc: {
                          start: {
                            line: 2,
                            column: 21
                          },
                          end: {
                            line: 2,
                            column: 22
                          }
                        },
                        value: 0,
                        raw: '0'
                      }
                    }
                  ],
                  kind: 'let'
                },
                test: {
                  type: 'BinaryExpression',
                  start: 39,
                  end: 45,
                  loc: {
                    start: {
                      line: 2,
                      column: 24
                    },
                    end: {
                      line: 2,
                      column: 30
                    }
                  },
                  left: {
                    type: 'Identifier',
                    start: 39,
                    end: 40,
                    loc: {
                      start: {
                        line: 2,
                        column: 24
                      },
                      end: {
                        line: 2,
                        column: 25
                      }
                    },
                    name: 'x'
                  },
                  operator: '<',
                  right: {
                    type: 'Literal',
                    start: 43,
                    end: 45,
                    loc: {
                      start: {
                        line: 2,
                        column: 28
                      },
                      end: {
                        line: 2,
                        column: 30
                      }
                    },
                    value: 10,
                    raw: '10'
                  }
                },
                update: null,
                body: {
                  type: 'BlockStatement',
                  start: 48,
                  end: 180,
                  loc: {
                    start: {
                      line: 2,
                      column: 33
                    },
                    end: {
                      line: 9,
                      column: 9
                    }
                  },
                  body: [
                    {
                      type: 'ExpressionStatement',
                      start: 60,
                      end: 64,
                      loc: {
                        start: {
                          line: 3,
                          column: 10
                        },
                        end: {
                          line: 3,
                          column: 14
                        }
                      },
                      expression: {
                        type: 'UpdateExpression',
                        start: 60,
                        end: 63,
                        loc: {
                          start: {
                            line: 3,
                            column: 10
                          },
                          end: {
                            line: 3,
                            column: 13
                          }
                        },
                        operator: '++',
                        prefix: false,
                        argument: {
                          type: 'Identifier',
                          start: 60,
                          end: 61,
                          loc: {
                            start: {
                              line: 3,
                              column: 10
                            },
                            end: {
                              line: 3,
                              column: 11
                            }
                          },
                          name: 'x'
                        }
                      }
                    },
                    {
                      type: 'ForStatement',
                      start: 75,
                      end: 150,
                      loc: {
                        start: {
                          line: 4,
                          column: 10
                        },
                        end: {
                          line: 7,
                          column: 11
                        }
                      },
                      init: {
                        type: 'VariableDeclaration',
                        start: 80,
                        end: 89,
                        loc: {
                          start: {
                            line: 4,
                            column: 15
                          },
                          end: {
                            line: 4,
                            column: 24
                          }
                        },
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            start: 84,
                            end: 89,
                            loc: {
                              start: {
                                line: 4,
                                column: 19
                              },
                              end: {
                                line: 4,
                                column: 24
                              }
                            },
                            id: {
                              type: 'Identifier',
                              start: 84,
                              end: 85,
                              loc: {
                                start: {
                                  line: 4,
                                  column: 19
                                },
                                end: {
                                  line: 4,
                                  column: 20
                                }
                              },
                              name: 'y'
                            },
                            init: {
                              type: 'Literal',
                              start: 88,
                              end: 89,
                              loc: {
                                start: {
                                  line: 4,
                                  column: 23
                                },
                                end: {
                                  line: 4,
                                  column: 24
                                }
                              },
                              value: 0,
                              raw: '0'
                            }
                          }
                        ],
                        kind: 'let'
                      },
                      test: {
                        type: 'BinaryExpression',
                        start: 91,
                        end: 96,
                        loc: {
                          start: {
                            line: 4,
                            column: 26
                          },
                          end: {
                            line: 4,
                            column: 31
                          }
                        },
                        left: {
                          type: 'Identifier',
                          start: 91,
                          end: 92,
                          loc: {
                            start: {
                              line: 4,
                              column: 26
                            },
                            end: {
                              line: 4,
                              column: 27
                            }
                          },
                          name: 'y'
                        },
                        operator: '<',
                        right: {
                          type: 'Literal',
                          start: 95,
                          end: 96,
                          loc: {
                            start: {
                              line: 4,
                              column: 30
                            },
                            end: {
                              line: 4,
                              column: 31
                            }
                          },
                          value: 2,
                          raw: '2'
                        }
                      },
                      update: null,
                      body: {
                        type: 'BlockStatement',
                        start: 99,
                        end: 150,
                        loc: {
                          start: {
                            line: 4,
                            column: 34
                          },
                          end: {
                            line: 7,
                            column: 11
                          }
                        },
                        body: [
                          {
                            type: 'ExpressionStatement',
                            start: 113,
                            end: 117,
                            loc: {
                              start: {
                                line: 5,
                                column: 12
                              },
                              end: {
                                line: 5,
                                column: 16
                              }
                            },
                            expression: {
                              type: 'UpdateExpression',
                              start: 113,
                              end: 116,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 12
                                },
                                end: {
                                  line: 5,
                                  column: 15
                                }
                              },
                              operator: '++',
                              prefix: false,
                              argument: {
                                type: 'Identifier',
                                start: 113,
                                end: 114,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 12
                                  },
                                  end: {
                                    line: 5,
                                    column: 13
                                  }
                                },
                                name: 'y'
                              }
                            }
                          },
                          {
                            type: 'ExpressionStatement',
                            start: 130,
                            end: 138,
                            loc: {
                              start: {
                                line: 6,
                                column: 12
                              },
                              end: {
                                line: 6,
                                column: 20
                              }
                            },
                            expression: {
                              type: 'UpdateExpression',
                              start: 130,
                              end: 137,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 12
                                },
                                end: {
                                  line: 6,
                                  column: 19
                                }
                              },
                              operator: '++',
                              prefix: false,
                              argument: {
                                type: 'Identifier',
                                start: 130,
                                end: 135,
                                loc: {
                                  start: {
                                    line: 6,
                                    column: 12
                                  },
                                  end: {
                                    line: 6,
                                    column: 17
                                  }
                                },
                                name: 'count'
                              }
                            }
                          }
                        ]
                      }
                    },
                    {
                      type: 'ContinueStatement',
                      start: 161,
                      end: 170,
                      loc: {
                        start: {
                          line: 8,
                          column: 10
                        },
                        end: {
                          line: 8,
                          column: 19
                        }
                      },
                      label: null
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`var count = 0;
    label: for (let x = 0; x < 10;) {
      while (true) {
        x++;
        count++;
        continue label;
      }
    }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `var count = 0;
        label: for (let x = 0; x < 10;) {
          while (true) {
            x++;
            count++;
            continue label;
          }
        }`,
        expected: {
            type: 'Program',
            start: 0,
            end: 169,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 8,
                column: 9
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
                    id: {
                      type: 'Identifier',
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
                      name: 'count'
                    },
                    init: {
                      type: 'Literal',
                      start: 12,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 13
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
                type: 'LabeledStatement',
                start: 23,
                end: 169,
                loc: {
                  start: {
                    line: 2,
                    column: 8
                  },
                  end: {
                    line: 8,
                    column: 9
                  }
                },
                body: {
                  type: 'ForStatement',
                  start: 30,
                  end: 169,
                  loc: {
                    start: {
                      line: 2,
                      column: 15
                    },
                    end: {
                      line: 8,
                      column: 9
                    }
                  },
                  init: {
                    type: 'VariableDeclaration',
                    start: 35,
                    end: 44,
                    loc: {
                      start: {
                        line: 2,
                        column: 20
                      },
                      end: {
                        line: 2,
                        column: 29
                      }
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 39,
                        end: 44,
                        loc: {
                          start: {
                            line: 2,
                            column: 24
                          },
                          end: {
                            line: 2,
                            column: 29
                          }
                        },
                        id: {
                          type: 'Identifier',
                          start: 39,
                          end: 40,
                          loc: {
                            start: {
                              line: 2,
                              column: 24
                            },
                            end: {
                              line: 2,
                              column: 25
                            }
                          },
                          name: 'x'
                        },
                        init: {
                          type: 'Literal',
                          start: 43,
                          end: 44,
                          loc: {
                            start: {
                              line: 2,
                              column: 28
                            },
                            end: {
                              line: 2,
                              column: 29
                            }
                          },
                          value: 0,
                          raw: '0'
                        }
                      }
                    ],
                    kind: 'let'
                  },
                  test: {
                    type: 'BinaryExpression',
                    start: 46,
                    end: 52,
                    loc: {
                      start: {
                        line: 2,
                        column: 31
                      },
                      end: {
                        line: 2,
                        column: 37
                      }
                    },
                    left: {
                      type: 'Identifier',
                      start: 46,
                      end: 47,
                      loc: {
                        start: {
                          line: 2,
                          column: 31
                        },
                        end: {
                          line: 2,
                          column: 32
                        }
                      },
                      name: 'x'
                    },
                    operator: '<',
                    right: {
                      type: 'Literal',
                      start: 50,
                      end: 52,
                      loc: {
                        start: {
                          line: 2,
                          column: 35
                        },
                        end: {
                          line: 2,
                          column: 37
                        }
                      },
                      value: 10,
                      raw: '10'
                    }
                  },
                  update: null,
                  body: {
                    type: 'BlockStatement',
                    start: 55,
                    end: 169,
                    loc: {
                      start: {
                        line: 2,
                        column: 40
                      },
                      end: {
                        line: 8,
                        column: 9
                      }
                    },
                    body: [
                      {
                        type: 'WhileStatement',
                        start: 67,
                        end: 159,
                        loc: {
                          start: {
                            line: 3,
                            column: 10
                          },
                          end: {
                            line: 7,
                            column: 11
                          }
                        },
                        test: {
                          type: 'Literal',
                          start: 74,
                          end: 78,
                          loc: {
                            start: {
                              line: 3,
                              column: 17
                            },
                            end: {
                              line: 3,
                              column: 21
                            }
                          },
                          value: true,
                          raw: 'true'
                        },
                        body: {
                          type: 'BlockStatement',
                          start: 80,
                          end: 159,
                          loc: {
                            start: {
                              line: 3,
                              column: 23
                            },
                            end: {
                              line: 7,
                              column: 11
                            }
                          },
                          body: [
                            {
                              type: 'ExpressionStatement',
                              start: 94,
                              end: 98,
                              loc: {
                                start: {
                                  line: 4,
                                  column: 12
                                },
                                end: {
                                  line: 4,
                                  column: 16
                                }
                              },
                              expression: {
                                type: 'UpdateExpression',
                                start: 94,
                                end: 97,
                                loc: {
                                  start: {
                                    line: 4,
                                    column: 12
                                  },
                                  end: {
                                    line: 4,
                                    column: 15
                                  }
                                },
                                operator: '++',
                                prefix: false,
                                argument: {
                                  type: 'Identifier',
                                  start: 94,
                                  end: 95,
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
                                  name: 'x'
                                }
                              }
                            },
                            {
                              type: 'ExpressionStatement',
                              start: 111,
                              end: 119,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 12
                                },
                                end: {
                                  line: 5,
                                  column: 20
                                }
                              },
                              expression: {
                                type: 'UpdateExpression',
                                start: 111,
                                end: 118,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 12
                                  },
                                  end: {
                                    line: 5,
                                    column: 19
                                  }
                                },
                                operator: '++',
                                prefix: false,
                                argument: {
                                  type: 'Identifier',
                                  start: 111,
                                  end: 116,
                                  loc: {
                                    start: {
                                      line: 5,
                                      column: 12
                                    },
                                    end: {
                                      line: 5,
                                      column: 17
                                    }
                                  },
                                  name: 'count'
                                }
                              }
                            },
                            {
                              type: 'ContinueStatement',
                              start: 132,
                              end: 147,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 12
                                },
                                end: {
                                  line: 6,
                                  column: 27
                                }
                              },
                              label: {
                                type: 'Identifier',
                                start: 141,
                                end: 146,
                                loc: {
                                  start: {
                                    line: 6,
                                    column: 21
                                  },
                                  end: {
                                    line: 6,
                                    column: 26
                                  }
                                },
                                name: 'label'
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                label: {
                  type: 'Identifier',
                  start: 23,
                  end: 28,
                  loc: {
                    start: {
                      line: 2,
                      column: 8
                    },
                    end: {
                      line: 2,
                      column: 13
                    }
                  },
                  name: 'label'
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`var count = 0;
    for (let x = 0; x < 10;) {
      x++;
      count++;
      continue;
    }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `var count = 0;
        for (let x = 0; x < 10;) {
          x++;
          count++;
          continue;
        }`,
        expected: {
            type: 'Program',
            start: 0,
            end: 113,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 6,
                column: 9
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
                    id: {
                      type: 'Identifier',
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
                      name: 'count'
                    },
                    init: {
                      type: 'Literal',
                      start: 12,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 13
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
                type: 'ForStatement',
                start: 23,
                end: 113,
                loc: {
                  start: {
                    line: 2,
                    column: 8
                  },
                  end: {
                    line: 6,
                    column: 9
                  }
                },
                init: {
                  type: 'VariableDeclaration',
                  start: 28,
                  end: 37,
                  loc: {
                    start: {
                      line: 2,
                      column: 13
                    },
                    end: {
                      line: 2,
                      column: 22
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 32,
                      end: 37,
                      loc: {
                        start: {
                          line: 2,
                          column: 17
                        },
                        end: {
                          line: 2,
                          column: 22
                        }
                      },
                      id: {
                        type: 'Identifier',
                        start: 32,
                        end: 33,
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
                        name: 'x'
                      },
                      init: {
                        type: 'Literal',
                        start: 36,
                        end: 37,
                        loc: {
                          start: {
                            line: 2,
                            column: 21
                          },
                          end: {
                            line: 2,
                            column: 22
                          }
                        },
                        value: 0,
                        raw: '0'
                      }
                    }
                  ],
                  kind: 'let'
                },
                test: {
                  type: 'BinaryExpression',
                  start: 39,
                  end: 45,
                  loc: {
                    start: {
                      line: 2,
                      column: 24
                    },
                    end: {
                      line: 2,
                      column: 30
                    }
                  },
                  left: {
                    type: 'Identifier',
                    start: 39,
                    end: 40,
                    loc: {
                      start: {
                        line: 2,
                        column: 24
                      },
                      end: {
                        line: 2,
                        column: 25
                      }
                    },
                    name: 'x'
                  },
                  operator: '<',
                  right: {
                    type: 'Literal',
                    start: 43,
                    end: 45,
                    loc: {
                      start: {
                        line: 2,
                        column: 28
                      },
                      end: {
                        line: 2,
                        column: 30
                      }
                    },
                    value: 10,
                    raw: '10'
                  }
                },
                update: null,
                body: {
                  type: 'BlockStatement',
                  start: 48,
                  end: 113,
                  loc: {
                    start: {
                      line: 2,
                      column: 33
                    },
                    end: {
                      line: 6,
                      column: 9
                    }
                  },
                  body: [
                    {
                      type: 'ExpressionStatement',
                      start: 60,
                      end: 64,
                      loc: {
                        start: {
                          line: 3,
                          column: 10
                        },
                        end: {
                          line: 3,
                          column: 14
                        }
                      },
                      expression: {
                        type: 'UpdateExpression',
                        start: 60,
                        end: 63,
                        loc: {
                          start: {
                            line: 3,
                            column: 10
                          },
                          end: {
                            line: 3,
                            column: 13
                          }
                        },
                        operator: '++',
                        prefix: false,
                        argument: {
                          type: 'Identifier',
                          start: 60,
                          end: 61,
                          loc: {
                            start: {
                              line: 3,
                              column: 10
                            },
                            end: {
                              line: 3,
                              column: 11
                            }
                          },
                          name: 'x'
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      start: 75,
                      end: 83,
                      loc: {
                        start: {
                          line: 4,
                          column: 10
                        },
                        end: {
                          line: 4,
                          column: 18
                        }
                      },
                      expression: {
                        type: 'UpdateExpression',
                        start: 75,
                        end: 82,
                        loc: {
                          start: {
                            line: 4,
                            column: 10
                          },
                          end: {
                            line: 4,
                            column: 17
                          }
                        },
                        operator: '++',
                        prefix: false,
                        argument: {
                          type: 'Identifier',
                          start: 75,
                          end: 80,
                          loc: {
                            start: {
                              line: 4,
                              column: 10
                            },
                            end: {
                              line: 4,
                              column: 15
                            }
                          },
                          name: 'count'
                        }
                      }
                    },
                    {
                      type: 'ContinueStatement',
                      start: 94,
                      end: 103,
                      loc: {
                        start: {
                          line: 5,
                          column: 10
                        },
                        end: {
                          line: 5,
                          column: 19
                        }
                      },
                      label: null
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`var count = 0;
    label: for (let x = 0; x < 10;) {
      x++;
      count++;
      continue label;
    }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `var count = 0;
        label: for (let x = 0; x < 10;) {
          x++;
          count++;
          continue label;
        }`,
        expected: {
            type: 'Program',
            start: 0,
            end: 126,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 6,
                column: 9
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
                    id: {
                      type: 'Identifier',
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
                      name: 'count'
                    },
                    init: {
                      type: 'Literal',
                      start: 12,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 13
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
                type: 'LabeledStatement',
                start: 23,
                end: 126,
                loc: {
                  start: {
                    line: 2,
                    column: 8
                  },
                  end: {
                    line: 6,
                    column: 9
                  }
                },
                body: {
                  type: 'ForStatement',
                  start: 30,
                  end: 126,
                  loc: {
                    start: {
                      line: 2,
                      column: 15
                    },
                    end: {
                      line: 6,
                      column: 9
                    }
                  },
                  init: {
                    type: 'VariableDeclaration',
                    start: 35,
                    end: 44,
                    loc: {
                      start: {
                        line: 2,
                        column: 20
                      },
                      end: {
                        line: 2,
                        column: 29
                      }
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 39,
                        end: 44,
                        loc: {
                          start: {
                            line: 2,
                            column: 24
                          },
                          end: {
                            line: 2,
                            column: 29
                          }
                        },
                        id: {
                          type: 'Identifier',
                          start: 39,
                          end: 40,
                          loc: {
                            start: {
                              line: 2,
                              column: 24
                            },
                            end: {
                              line: 2,
                              column: 25
                            }
                          },
                          name: 'x'
                        },
                        init: {
                          type: 'Literal',
                          start: 43,
                          end: 44,
                          loc: {
                            start: {
                              line: 2,
                              column: 28
                            },
                            end: {
                              line: 2,
                              column: 29
                            }
                          },
                          value: 0,
                          raw: '0'
                        }
                      }
                    ],
                    kind: 'let'
                  },
                  test: {
                    type: 'BinaryExpression',
                    start: 46,
                    end: 52,
                    loc: {
                      start: {
                        line: 2,
                        column: 31
                      },
                      end: {
                        line: 2,
                        column: 37
                      }
                    },
                    left: {
                      type: 'Identifier',
                      start: 46,
                      end: 47,
                      loc: {
                        start: {
                          line: 2,
                          column: 31
                        },
                        end: {
                          line: 2,
                          column: 32
                        }
                      },
                      name: 'x'
                    },
                    operator: '<',
                    right: {
                      type: 'Literal',
                      start: 50,
                      end: 52,
                      loc: {
                        start: {
                          line: 2,
                          column: 35
                        },
                        end: {
                          line: 2,
                          column: 37
                        }
                      },
                      value: 10,
                      raw: '10'
                    }
                  },
                  update: null,
                  body: {
                    type: 'BlockStatement',
                    start: 55,
                    end: 126,
                    loc: {
                      start: {
                        line: 2,
                        column: 40
                      },
                      end: {
                        line: 6,
                        column: 9
                      }
                    },
                    body: [
                      {
                        type: 'ExpressionStatement',
                        start: 67,
                        end: 71,
                        loc: {
                          start: {
                            line: 3,
                            column: 10
                          },
                          end: {
                            line: 3,
                            column: 14
                          }
                        },
                        expression: {
                          type: 'UpdateExpression',
                          start: 67,
                          end: 70,
                          loc: {
                            start: {
                              line: 3,
                              column: 10
                            },
                            end: {
                              line: 3,
                              column: 13
                            }
                          },
                          operator: '++',
                          prefix: false,
                          argument: {
                            type: 'Identifier',
                            start: 67,
                            end: 68,
                            loc: {
                              start: {
                                line: 3,
                                column: 10
                              },
                              end: {
                                line: 3,
                                column: 11
                              }
                            },
                            name: 'x'
                          }
                        }
                      },
                      {
                        type: 'ExpressionStatement',
                        start: 82,
                        end: 90,
                        loc: {
                          start: {
                            line: 4,
                            column: 10
                          },
                          end: {
                            line: 4,
                            column: 18
                          }
                        },
                        expression: {
                          type: 'UpdateExpression',
                          start: 82,
                          end: 89,
                          loc: {
                            start: {
                              line: 4,
                              column: 10
                            },
                            end: {
                              line: 4,
                              column: 17
                            }
                          },
                          operator: '++',
                          prefix: false,
                          argument: {
                            type: 'Identifier',
                            start: 82,
                            end: 87,
                            loc: {
                              start: {
                                line: 4,
                                column: 10
                              },
                              end: {
                                line: 4,
                                column: 15
                              }
                            },
                            name: 'count'
                          }
                        }
                      },
                      {
                        type: 'ContinueStatement',
                        start: 101,
                        end: 116,
                        loc: {
                          start: {
                            line: 5,
                            column: 10
                          },
                          end: {
                            line: 5,
                            column: 25
                          }
                        },
                        label: {
                          type: 'Identifier',
                          start: 110,
                          end: 115,
                          loc: {
                            start: {
                              line: 5,
                              column: 19
                            },
                            end: {
                              line: 5,
                              column: 24
                            }
                          },
                          name: 'label'
                        }
                      }
                    ]
                  }
                },
                label: {
                  type: 'Identifier',
                  start: 23,
                  end: 28,
                  loc: {
                    start: {
                      line: 2,
                      column: 8
                    },
                    end: {
                      line: 2,
                      column: 13
                    }
                  },
                  name: 'label'
                }
              }
            ],
            sourceType: 'script'
          }
    });

});
