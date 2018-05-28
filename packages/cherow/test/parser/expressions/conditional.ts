import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import { parseSource } from '../../../src/parser/parser';
import * as t from 'assert';

describe('Expressions - Conditional expression', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

      fail('-x ** y', Context.Module, {
          source: '-x ** y',
      });
  });

  describe('Pass', () => {

    const validSyntax = [
      '(y ? y : true)',
      'true ? y : false',
      '"1" ? "" : "1"',
      '"1" ? y : ""',
      'y ? y : "1"',
      'true ? y : z',
      '(false ? true : undefined)',
      '("1" ? "" : "1")',
      '("1" ? y : "")',
      'Symbol() ? 1 : 2, 1',
      '(false ? false : true)',
  ];

  for (const arg of validSyntax) {

      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parseSource(`${arg}`, undefined, Context.Empty);
          });
      });

      it(`${arg}`, () => {
        t.doesNotThrow(() => {
            parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
        });
    });
  }

      pass('x = (0) ? 1 : 2', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x = (0) ? 1 : 2',
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
                      type: 'AssignmentExpression',
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
                      operator: '=',
                      left: {
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
                          name: 'x'
                      },
                      right: {
                          type: 'ConditionalExpression',
                          start: 4,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          test: {
                              type: 'Literal',
                              start: 5,
                              end: 6,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 5
                                  },
                                  end: {
                                      line: 1,
                                      column: 6
                                  }
                              },
                              value: 0,
                              raw: '0'
                          },
                          consequent: {
                              type: 'Literal',
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
                              value: 1,
                              raw: '1'
                          },
                          alternate: {
                              type: 'Literal',
                              start: 14,
                              end: 15,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 14
                                  },
                                  end: {
                                      line: 1,
                                      column: 15
                                  }
                              },
                              value: 2,
                              raw: '2'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('a ? b : c', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'a ? b : c',
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
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'ConditionalExpression',
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
                      },
                      consequent: {
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
                          name: 'b'
                      },
                      alternate: {
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
                          name: 'c'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('y ? 1 : 2', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'y ? 1 : 2',
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
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'ConditionalExpression',
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
                          name: 'y'
                      },
                      consequent: {
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
                          value: 1,
                          raw: '1'
                      },
                      alternate: {
                          type: 'Literal',
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
                          value: 2,
                          raw: '2'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x && y ? 1 : 2', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x && y ? 1 : 2',
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
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'ConditionalExpression',
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
                      test: {
                          type: 'LogicalExpression',
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
                          left: {
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
                              name: 'x'
                          },
                          operator: '&&',
                          right: {
                              type: 'Identifier',
                              start: 5,
                              end: 6,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 5
                                  },
                                  end: {
                                      line: 1,
                                      column: 6
                                  }
                              },
                              name: 'y'
                          }
                      },
                      consequent: {
                          type: 'Literal',
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
                          value: 1,
                          raw: '1'
                      },
                      alternate: {
                          type: 'Literal',
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
                          value: 2,
                          raw: '2'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('a ? !b : !c;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'a ? !b : !c;',
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
              body: [{
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'ConditionalExpression',
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
                      test: {
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
                      },
                      consequent: {
                          type: 'UnaryExpression',
                          start: 4,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          },
                          operator: '!',
                          prefix: true,
                          argument: {
                              type: 'Identifier',
                              start: 5,
                              end: 6,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 5
                                  },
                                  end: {
                                      line: 1,
                                      column: 6
                                  }
                              },
                              name: 'b'
                          }
                      },
                      alternate: {
                          type: 'UnaryExpression',
                          start: 9,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          operator: '!',
                          prefix: true,
                          argument: {
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
                              name: 'c'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });
  });

});
