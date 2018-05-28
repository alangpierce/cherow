import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Statements - Try', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

      fail('y={x;};', Context.Empty, {
          source: 'y={x;};',
      });

      fail('do{};while()', Context.Empty, {
          source: 'do{};while()',
      });

      fail('if{};else{}', Context.Empty, {
          source: 'if{};else{}',
      });

      fail('try{};catch{};finally{}', Context.Empty, {
          source: 'try{};catch{};finally{}',
      });

      fail('try{};catch(){}', Context.Empty, {
          source: 'try{};catch(){}',
      });
  });

  describe('Pass', () => {

      pass(`{ a(); bt(); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `{ a(); bt(); }`,
          expected: {
              type: 'Program',
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
              body: [{
                  type: 'BlockStatement',
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
                  body: [{
                          type: 'ExpressionStatement',
                          start: 2,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 2
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          },
                          expression: {
                              type: 'CallExpression',
                              start: 2,
                              end: 5,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 5
                                  }
                              },
                              callee: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'a'
                              },
                              arguments: []
                          }
                      },
                      {
                          type: 'ExpressionStatement',
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
                          expression: {
                              type: 'CallExpression',
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
                              callee: {
                                  type: 'Identifier',
                                  start: 7,
                                  end: 9,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 7
                                      },
                                      end: {
                                          line: 1,
                                          column: 9
                                      }
                                  },
                                  name: 'bt'
                              },
                              arguments: []
                          }
                      }
                  ]
              }],
              sourceType: 'script'
          }
      });
  });

  pass(`{ var {foo=3} = {}; };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `{ var {foo=3} = {}; };`,
    expected: {
        type: 'Program',
        start: 0,
        end: 22,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 22
          }
        },
        body: [
          {
            type: 'BlockStatement',
            start: 0,
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 21
              }
            },
            body: [
              {
                type: 'VariableDeclaration',
                start: 2,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 18,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 18
                      }
                    },
                    id: {
                      type: 'ObjectPattern',
                      start: 6,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 13
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
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
                          method: false,
                          shorthand: true,
                          computed: false,
                          key: {
                            type: 'Identifier',
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
                            name: 'foo'
                          },
                          kind: 'init',
                          value: {
                            type: 'AssignmentPattern',
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
                              type: 'Identifier',
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
                              name: 'foo'
                            },
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
                              value: 3,
                              raw: '3'
                            }
                          }
                        }
                      ]
                    },
                    init: {
                      type: 'ObjectExpression',
                      start: 16,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      },
                      properties: []
                    }
                  }
                ],
                kind: 'var'
              }
            ]
          },
          {
            type: 'EmptyStatement',
            start: 21,
            end: 22,
            loc: {
              start: {
                line: 1,
                column: 21
              },
              end: {
                line: 1,
                column: 22
              }
            }
          }
        ],
        sourceType: 'script'
      }
  });

  pass(`{ var foo = 0; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `{ var foo = 0; }`,
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
            type: 'BlockStatement',
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
                type: 'VariableDeclaration',
                start: 2,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 13,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 13
                      }
                    },
                    id: {
                      type: 'Identifier',
                      start: 6,
                      end: 9,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 9
                        }
                      },
                      name: 'foo'
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
              }
            ]
          }
        ],
        sourceType: 'script'
      }
  });

  pass(`{ function foo() {}; };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `{ function foo() {}; };`,
    expected: {
        type: 'Program',
        start: 0,
        end: 23,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 23
          }
        },
        body: [
          {
            type: 'BlockStatement',
            start: 0,
            end: 22,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 22
              }
            },
            body: [
              {
                type: 'FunctionDeclaration',
                start: 2,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                },
                id: {
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
                },
                generator: false,
                expression: false,
                async: false,
                params: [],
                body: {
                  type: 'BlockStatement',
                  start: 17,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  },
                  body: []
                }
              },
              {
                type: 'EmptyStatement',
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
              }
            ]
          },
          {
            type: 'EmptyStatement',
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
            }
          }
        ],
        sourceType: 'script'
      }
  });

  pass(`{ async function foo() {}; };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `{ async function foo() {}; };`,
    expected: {
        type: 'Program',
        start: 0,
        end: 29,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 29
          }
        },
        body: [
          {
            type: 'BlockStatement',
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
            body: [
              {
                type: 'FunctionDeclaration',
                start: 2,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                },
                id: {
                  type: 'Identifier',
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
                  name: 'foo'
                },
                generator: false,
                expression: false,
                async: true,
                params: [],
                body: {
                  type: 'BlockStatement',
                  start: 23,
                  end: 25,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 25
                    }
                  },
                  body: []
                }
              },
              {
                type: 'EmptyStatement',
                start: 25,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 25
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                }
              }
            ]
          },
          {
            type: 'EmptyStatement',
            start: 28,
            end: 29,
            loc: {
              start: {
                line: 1,
                column: 28
              },
              end: {
                line: 1,
                column: 29
              }
            }
          }
        ],
        sourceType: 'script'
      }
  });
});
