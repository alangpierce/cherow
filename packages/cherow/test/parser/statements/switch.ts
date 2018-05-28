import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Statements - Switch', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {
    fail('switch (c) { default: default: }', Context.Empty, {
      source: 'switch (c) { default: default: }',
  });
    fail(`duplicate default`, Context.Empty, {
      source: `function SwitchTest(value){
        var result = 0;
        switch(value) {
          case 0:
            result += 2;
          default:
            result += 32;
            break;
          default:
            result += 32;
            break;
        }
        return result;
      }`
  });

    fail('()?c:d=>{}=>{}', Context.Empty, {
          source: '()?c:d=>{}=>{}',
      });
  });

  describe('Pass', () => {

      pass(`switch(a){case 1:}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `switch(a){case 1:}`,
          expected: {
            type: 'Program',
            start: 0,
            end: 18,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 18
              }
            },
            body: [
              {
                type: 'SwitchStatement',
                start: 0,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                },
                discriminant: {
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
                  name: 'a'
                },
                cases: [
                  {
                    type: 'SwitchCase',
                    start: 10,
                    end: 17,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 17
                      }
                    },
                    consequent: [],
                    test: {
                      type: 'Literal',
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
                      value: 1,
                      raw: '1'
                    }
                  }
                ]
              }
            ],
            sourceType: 'script'
          }
      });

      pass(`switch (answer) { case 0: hi(); continue; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `switch (answer) { case 0: hi(); continue; }`,
        expected: {
          "type": "Program",
          "sourceType": "script",
          "body": [
              {
                  "type": "SwitchStatement",
                  "discriminant": {
                      "type": "Identifier",
                      "name": "answer",
                      "start": 8,
                      "end": 14,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 8
                          },
                          "end": {
                              "line": 1,
                              "column": 14
                          }
                      }
                  },
                  "cases": [
                      {
                          "type": "SwitchCase",
                          "test": {
                              "type": "Literal",
                              "value": 0,
                              "start": 23,
                              "end": 24,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 23
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 24
                                  }
                              },
                              "raw": "0"
                          },
                          "consequent": [
                              {
                                  "type": "ExpressionStatement",
                                  "expression": {
                                      "type": "CallExpression",
                                      "callee": {
                                          "type": "Identifier",
                                          "name": "hi",
                                          "start": 26,
                                          "end": 28,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 26
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 28
                                              }
                                          }
                                      },
                                      "arguments": [],
                                      "start": 26,
                                      "end": 30,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 26
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 30
                                          }
                                      }
                                  },
                                  "start": 26,
                                  "end": 31,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 26
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 31
                                      }
                                  }
                              },
                              {
                                  "type": "ContinueStatement",
                                  "label": null,
                                  "start": 32,
                                  "end": 41,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 32
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 41
                                      }
                                  }
                              }
                          ],
                          "start": 18,
                          "end": 41,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 18
                              },
                              "end": {
                                  "line": 1,
                                  "column": 41
                              }
                          }
                      }
                  ],
                  "start": 0,
                  "end": 43,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 43
                      }
                  }
              }
          ],
          "start": 0,
          "end": 43,
          "loc": {
              "start": {
                  "line": 1,
                  "column": 0
              },
              "end": {
                  "line": 1,
                  "column": 43
              }
          }
      }
      });

      pass(`switch (answer) { case 0: hi(); break; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `switch (answer) { case 0: hi(); break; }`,
        expected: {
            type: 'Program',
            start: 0,
            end: 40,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 40
              }
            },
            body: [
              {
                type: 'SwitchStatement',
                start: 0,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                },
                discriminant: {
                  type: 'Identifier',
                  start: 8,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  },
                  name: 'answer'
                },
                cases: [
                  {
                    type: 'SwitchCase',
                    start: 18,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 38
                      }
                    },
                    consequent: [
                      {
                        type: 'ExpressionStatement',
                        start: 26,
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        },
                        expression: {
                          type: 'CallExpression',
                          start: 26,
                          end: 30,
                          loc: {
                            start: {
                              line: 1,
                              column: 26
                            },
                            end: {
                              line: 1,
                              column: 30
                            }
                          },
                          callee: {
                            type: 'Identifier',
                            start: 26,
                            end: 28,
                            loc: {
                              start: {
                                line: 1,
                                column: 26
                              },
                              end: {
                                line: 1,
                                column: 28
                              }
                            },
                            name: 'hi'
                          },
                          arguments: []
                        }
                      },
                      {
                        type: 'BreakStatement',
                        start: 32,
                        end: 38,
                        loc: {
                          start: {
                            line: 1,
                            column: 32
                          },
                          end: {
                            line: 1,
                            column: 38
                          }
                        },
                        label: null
                      }
                    ],
                    test: {
                      type: 'Literal',
                      start: 23,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 23
                        },
                        end: {
                          line: 1,
                          column: 24
                        }
                      },
                      value: 0,
                      raw: '0'
                    }
                  }
                ]
              }
            ],
            sourceType: 'script'
          }
    });

      pass(`switch (answer) { case 0: let a; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `switch (answer) { case 0: let a; }`,
        expected: {
            type: 'Program',
            start: 0,
            end: 34,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 34
              }
            },
            body: [
              {
                type: 'SwitchStatement',
                start: 0,
                end: 34,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 34
                  }
                },
                discriminant: {
                  type: 'Identifier',
                  start: 8,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  },
                  name: 'answer'
                },
                cases: [
                  {
                    type: 'SwitchCase',
                    start: 18,
                    end: 32,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 32
                      }
                    },
                    consequent: [
                      {
                        type: 'VariableDeclaration',
                        start: 26,
                        end: 32,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 32
                          }
                        },
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            start: 30,
                            end: 31,
                            loc: {
                              start: {
                                line: 1,
                                column: 30
                              },
                              end: {
                                line: 1,
                                column: 31
                              }
                            },
                            id: {
                              type: 'Identifier',
                              start: 30,
                              end: 31,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 30
                                },
                                end: {
                                  line: 1,
                                  column: 31
                                }
                              },
                              name: 'a'
                            },
                            init: null
                          }
                        ],
                        kind: 'let'
                      }
                    ],
                    test: {
                      type: 'Literal',
                      start: 23,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 23
                        },
                        end: {
                          line: 1,
                          column: 24
                        }
                      },
                      value: 0,
                      raw: '0'
                    }
                  }
                ]
              }
            ],
            sourceType: 'script'
          }
    });
});

});
