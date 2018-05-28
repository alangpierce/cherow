import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Expressions - Grouped expression', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

      fail('(0, {a = 0}) = 0', Context.Module, {
          source: '(0, {a = 0}) = 0',
      });

      fail('(0, {a = 0}) => 0', Context.Module, {
          source: '(0, {a = 0}) => 0',
      });

      fail('({a = 0}, {a = 0}, 0) => 0', Context.Module, {
          source: '({a = 0}, {a = 0}, 0) => 0',
      });

  });

  describe('Pass', () => {

      pass('(0, a)', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '(0, a)',
          expected: {
              type: 'Program',
              start: 0,
              end: 6,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 6
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 6,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 6
                      }
                  },
                  expression: {
                      type: 'SequenceExpression',
                      start: 1,
                      end: 5,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 5
                          }
                      },
                      expressions: [{
                              type: 'Literal',
                              start: 1,
                              end: 2,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 2
                                  }
                              },
                              value: 0,
                              raw: '0'
                          },
                          {
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
                          }
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('(a, 0)', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '(a, 0)',
          expected: {
              type: 'Program',
              start: 0,
              end: 6,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 6
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 6,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 6
                      }
                  },
                  expression: {
                      type: 'SequenceExpression',
                      start: 1,
                      end: 5,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 5
                          }
                      },
                      expressions: [{
                              type: 'Identifier',
                              start: 1,
                              end: 2,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 2
                                  }
                              },
                              name: 'a'
                          },
                          {
                              type: 'Literal',
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
                              value: 0,
                              raw: '0'
                          }
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('(a,a)', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '(a,a)',
          expected: {
              type: 'Program',
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
              body: [{
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'SequenceExpression',
                      start: 1,
                      end: 4,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 4
                          }
                      },
                      expressions: [{
                              type: 'Identifier',
                              start: 1,
                              end: 2,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 2
                                  }
                              },
                              name: 'a'
                          },
                          {
                              type: 'Identifier',
                              start: 3,
                              end: 4,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 3
                                  },
                                  end: {
                                      line: 1,
                                      column: 4
                                  }
                              },
                              name: 'a'
                          }
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('((a,a),(a,a))', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '((a,a),(a,a))',
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
                      type: 'SequenceExpression',
                      start: 1,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      expressions: [{
                              type: 'SequenceExpression',
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
                              expressions: [{
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
                                  {
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
                                  }
                              ]
                          },
                          {
                              type: 'SequenceExpression',
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
                              expressions: [{
                                      type: 'Identifier',
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
                                      },
                                      name: 'a'
                                  },
                                  {
                                      type: 'Identifier',
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
                                      },
                                      name: 'a'
                                  }
                              ]
                          }
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('((((((((((((((((((((((((((((((((((((((((a))))))))))))))))))))))))))))))))))))))))', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '((((((((((((((((((((((((((((((((((((((((a))))))))))))))))))))))))))))))))))))))))',
          expected: {
              type: 'Program',
              start: 0,
              end: 81,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 81
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 81,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 81
                      }
                  },
                  expression: {
                      type: 'Identifier',
                      start: 40,
                      end: 41,
                      loc: {
                          start: {
                              line: 1,
                              column: 40
                          },
                          end: {
                              line: 1,
                              column: 41
                          }
                      },
                      name: 'a'
                  }
              }],
              sourceType: 'script'
          }
      });
  });

});
