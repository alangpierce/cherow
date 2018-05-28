import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Statements - With', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

    // Esprima issue: https://github.com/jquery/esprima/issues/1877
    fail('with(1) b: function a(){}', Context.Empty, {
      source: 'with(1) b: function a(){}',
    });

    fail('with ({}) async function f() {}', Context.Empty, {
          source: 'with ({}) async function f() {}',
      });

    fail('with ({}) class C {}', Context.Empty, {
        source: 'with ({}) class C {}',
    });

    fail('with ({}) function f() {}', Context.Empty, {
        source: 'with ({}) function f() {}',
    });

    fail('with ({}) label1: label2: function test262() {}', Context.Empty, {
        source: 'with ({}) label1: label2: function test262() {}',
    });

    fail('with ({}) let x;', Context.Empty, {
        source: 'with ({}) let x;',
    });

    fail(`if (false) {
      with ({}) let
      [a] = 0;
  }`, Context.Empty, {
      source: `if (false) {
        with ({}) let
        [a] = 0;
    }`
  });

  });

  describe('Pass', () => {

    const validSyntax = [
      `with({}){ p1 = 'x1'; }`,
      `if (false) {
        with ({}) let // ASI
        {}
    }`
  ];

    for (const arg of validSyntax) {
      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parseSource(`${arg}`, undefined, Context.Empty);
          });
      });
  }

    pass(`with ({}) ;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `with ({}) ;`,
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
        body: [
          {
            type: 'WithStatement',
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
            object: {
              type: 'ObjectExpression',
              start: 6,
              end: 8,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 8
                }
              },
              properties: []
            },
            body: {
              type: 'EmptyStatement',
              start: 10,
              end: 11,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 11
                }
              }
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`with ({}) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `with ({}) {}`,
      expected: {
        type: 'Program',
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
        body: [
          {
            type: 'WithStatement',
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
            object: {
              type: 'ObjectExpression',
              start: 6,
              end: 8,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 8
                }
              },
              properties: []
            },
            body: {
              type: 'BlockStatement',
              start: 10,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 12
                }
              },
              body: []
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`with ({}) 12`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `with ({}) 12`,
      expected: {
        type: 'Program',
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
        body: [
          {
            type: 'WithStatement',
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
            object: {
              type: 'ObjectExpression',
              start: 6,
              end: 8,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 8
                }
              },
              properties: []
            },
            body: {
              type: 'ExpressionStatement',
              start: 10,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 12
                }
              },
              expression: {
                type: 'Literal',
                start: 10,
                end: 12,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                },
                value: 12,
                raw: '12'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`with (x) foo;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `with (x) foo;`,
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
            body: [
              {
                type: 'WithStatement',
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
                object: {
                  type: 'Identifier',
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
                  name: 'x'
                },
                body: {
                  type: 'ExpressionStatement',
                  start: 9,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 13
                    }
                  },
                  expression: {
                    type: 'Identifier',
                    start: 9,
                    end: 12,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 12
                      }
                    },
                    name: 'foo'
                  }
                }
              }
            ],
            sourceType: 'script'
          }
      });

    pass(`with (x) { foo }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `with (x) { foo }`,
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
                type: 'WithStatement',
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
                object: {
                  type: 'Identifier',
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
                  name: 'x'
                },
                body: {
                  type: 'BlockStatement',
                  start: 9,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 16
                    }
                  },
                  body: [
                    {
                      type: 'ExpressionStatement',
                      start: 11,
                      end: 14,
                      loc: {
                        start: {
                          line: 1,
                          column: 11
                        },
                        end: {
                          line: 1,
                          column: 14
                        }
                      },
                      expression: {
                        type: 'Identifier',
                        start: 11,
                        end: 14,
                        loc: {
                          start: {
                            line: 1,
                            column: 11
                          },
                          end: {
                            line: 1,
                            column: 14
                          }
                        },
                        name: 'foo'
                      }
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
    });
  });

});
