import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Expressions - Binary expression', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failures', () => {

      fail('-x ** y', Context.Module, {
          source: '-x ** y',
      });
  });

  describe('Pass', () => {
      pass('-(x ** y)', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '-(x ** y)',
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
                      type: 'UnaryExpression',
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
                      operator: '-',
                      prefix: true,
                      argument: {
                          type: 'BinaryExpression',
                          start: 2,
                          end: 8,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 2
                              },
                              end: {
                                  line: 1,
                                  column: 8
                              }
                          },
                          left: {
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
                              name: 'x'
                          },
                          operator: '**',
                          right: {
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
                              name: 'y'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('1+2;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '1+2;',
          expected: {
              type: 'Program',
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
              body: [{
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'BinaryExpression',
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
                      left: {
                          type: 'Literal',
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
                          value: 1,
                          raw: '1'
                      },
                      operator: '+',
                      right: {
                          type: 'Literal',
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
                          value: 2,
                          raw: '2'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x & y', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x & y',
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
                      type: 'BinaryExpression',
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
                      operator: '&',
                      right: {
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
                          name: 'y'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x - y + z', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x - y + z',
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
                      type: 'BinaryExpression',
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
                      left: {
                          type: 'BinaryExpression',
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
                          operator: '-',
                          right: {
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
                              name: 'y'
                          }
                      },
                      operator: '+',
                      right: {
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
                          name: 'z'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x + y * z', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x + y * z',
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
                      type: 'BinaryExpression',
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
                      operator: '+',
                      right: {
                          type: 'BinaryExpression',
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
                          left: {
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
                              name: 'y'
                          },
                          operator: '*',
                          right: {
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
                              name: 'z'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x + y / z', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x + y / z',
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
                      type: 'BinaryExpression',
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
                      operator: '+',
                      right: {
                          type: 'BinaryExpression',
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
                          left: {
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
                              name: 'y'
                          },
                          operator: '/',
                          right: {
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
                              name: 'z'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x - y % z', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x - y % z',
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
                      type: 'BinaryExpression',
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
                      operator: '-',
                      right: {
                          type: 'BinaryExpression',
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
                          left: {
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
                              name: 'y'
                          },
                          operator: '%',
                          right: {
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
                              name: 'z'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x * y % z', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x * y % z',
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
                      type: 'BinaryExpression',
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
                      left: {
                          type: 'BinaryExpression',
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
                          operator: '*',
                          right: {
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
                              name: 'y'
                          }
                      },
                      operator: '%',
                      right: {
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
                          name: 'z'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x | y | z', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x | y | z',
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
                      type: 'BinaryExpression',
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
                      left: {
                          type: 'BinaryExpression',
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
                          operator: '|',
                          right: {
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
                              name: 'y'
                          }
                      },
                      operator: '|',
                      right: {
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
                          name: 'z'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x || y && z', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x || y && z',
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
              body: [{
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'LogicalExpression',
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
                      operator: '||',
                      right: {
                          type: 'LogicalExpression',
                          start: 5,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          left: {
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
                          },
                          operator: '&&',
                          right: {
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
                              name: 'z'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x / y', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x / y',
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
                      type: 'BinaryExpression',
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
                      operator: '/',
                      right: {
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
                          name: 'y'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('++x ** y', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '++x ** y',
          expected: {
              type: 'Program',
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
              body: [{
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'BinaryExpression',
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
                      left: {
                          type: 'UpdateExpression',
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
                          operator: '++',
                          prefix: true,
                          argument: {
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
                              name: 'x'
                          }
                      },
                      operator: '**',
                      right: {
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
                          name: 'y'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('(-x) ** y', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '(-x) ** y',
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
                      type: 'BinaryExpression',
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
                      left: {
                          type: 'UnaryExpression',
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
                          },
                          operator: '-',
                          prefix: true,
                          argument: {
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
                              name: 'x'
                          }
                      },
                      operator: '**',
                      right: {
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
                          name: 'y'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('-(x ** y)', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '-(x ** y)',
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
                      type: 'UnaryExpression',
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
                      operator: '-',
                      prefix: true,
                      argument: {
                          type: 'BinaryExpression',
                          start: 2,
                          end: 8,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 2
                              },
                              end: {
                                  line: 1,
                                  column: 8
                              }
                          },
                          left: {
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
                              name: 'x'
                          },
                          operator: '**',
                          right: {
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
                              name: 'y'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x << y', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x << y',
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
                      type: 'BinaryExpression',
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
                      operator: '<<',
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
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x <= y', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x <= y',
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
                      type: 'BinaryExpression',
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
                      operator: '<=',
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
                  }
              }],
              sourceType: 'script'
          }
      });
      /*
          pass('x in y', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: 'x in y',
              expected: {}
          });**/

      pass('x instanceof y', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x instanceof y',
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
                      type: 'BinaryExpression',
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
                      operator: 'instanceof',
                      right: {
                          type: 'Identifier',
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
                          name: 'y'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x < y < z', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x < y < z',
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
                      type: 'BinaryExpression',
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
                      left: {
                          type: 'BinaryExpression',
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
                          operator: '<',
                          right: {
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
                              name: 'y'
                          }
                      },
                      operator: '<',
                      right: {
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
                          name: 'z'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x != y', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x != y',
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
                      type: 'BinaryExpression',
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
                      operator: '!=',
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
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('x === y', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x === y',
          expected: {
              type: 'Program',
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
              body: [{
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'BinaryExpression',
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
                      operator: '===',
                      right: {
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
                          name: 'y'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });
  });
});
