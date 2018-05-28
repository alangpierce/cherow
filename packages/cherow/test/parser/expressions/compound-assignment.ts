import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Compound assignment', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

      const invalidSyntax = [
          '({a: (b = 0)} = {})',
          '([(a = b)] = []',
          '({a: b += 0} = {})',
          '[a += b] = []',
          '0.toString',
          '0.toString',
      ];

      for (const arg of invalidSyntax) {

          it(`${arg}`, () => {
              t.throws(() => {
                  parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
              });
          });
      }

      fail(`1 >>>= 1;`, Context.Empty, {
          source: '1 >>>= 1;'
      });

      fail(`1 -= 1;`, Context.Empty, {
          source: '1 -= 1;',
      });

      fail(`1 *= 1;`, Context.Empty, {
          source: '1 *= 1;',
      });

      fail(`1 &= 1;`, Context.Empty, {
          source: '1 &= 1;',
      });

      fail(`1 |= 1;`, Context.Empty, {
          source: '1 |= 1;',
      });

  });

  describe('Pass', () => {

      const validSyntax = [
          'null && (x += null)',
          'y1 = (y %= 2);',
          'var x1 = (x <<= 1);',
          'y1 = (y <<= 1);',
          'x ^= "1";',
          'x ^= null;',
          'x ^= new String("1");',
          'x |= 1;',
          'x *= "1";',
          'x *= undefined;',
          'x *= 1;',
          'x /= true;',
          'x /= undefined;',
          'x %= undefined;',
          'x = null',
          'x %= null;',
          'x %= undefined;',
          'obj.prop >>= 20;',
          'obj.len <<= 10',
          'obj.len &= 10;',
          'arguments &= 20;',
          'var z = (x *= -1);',
          'var z = (x %= 2);',
          'var z = (x %= y);',
          'var z = (x %= y);',
          'var z = (x %= 1);',
          'x -= 1; ',
          'var x1 = (x %= 2);',
          'x ^= new Number(1);',
          'x *= undefined;',
          'var z = (x *= -1);',
          'var z = (x %= y);',
          'var z = (x |= 1);',
          'var z = (x >>= 1);',
          'a[b](b,c)',
          '(new foo).bar()',
          'a.b.c(2014)',
          'a(0).b(14, 3, 77).c',
          'x >>= 1;',
          'var x = 4;',
      ];

      for (const arg of validSyntax) {

          it(`${arg}`, () => {
              t.doesNotThrow(() => {
                  parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
              });
          });
      }

      pass(`x >>= 1;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `x >>= 1;`,
          expected: {
              type: 'Program',
              sourceType: 'script',
              body: [{
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'AssignmentExpression',
                      left: {
                          type: 'Identifier',
                          name: 'x',
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
                          }
                      },
                      operator: '>>=',
                      right: {
                          type: 'Literal',
                          value: 1,
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
                          raw: '1'
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
              }],
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

      pass(`var z = (x *= -1);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `var z = (x *= -1);`,
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
              body: [{
                  type: 'VariableDeclaration',
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
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      },
                      id: {
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
                          name: 'z'
                      },
                      init: {
                          type: 'AssignmentExpression',
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
                          operator: '*=',
                          left: {
                              type: 'Identifier',
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
                              name: 'x'
                          },
                          right: {
                              type: 'UnaryExpression',
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
                              operator: '-',
                              prefix: true,
                              argument: {
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
                      }
                  }],
                  kind: 'var'
              }],
              sourceType: 'script'
          }
      });

      pass(`y1 = (y <<= 1);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `y1 = (y <<= 1);`,
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
                      operator: '=',
                      left: {
                          type: 'Identifier',
                          start: 0,
                          end: 2,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 2
                              }
                          },
                          name: 'y1'
                      },
                      right: {
                          type: 'AssignmentExpression',
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
                          operator: '<<=',
                          left: {
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
                          },
                          right: {
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
                              value: 1,
                              raw: '1'
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`x ^= new String("1");`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `x ^= new String("1");`,
          expected: {
              type: 'Program',
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
              body: [{
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 20,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 20
                          }
                      },
                      operator: '^=',
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
                          type: 'NewExpression',
                          start: 5,
                          end: 20,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 20
                              }
                          },
                          callee: {
                              type: 'Identifier',
                              start: 9,
                              end: 15,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 15
                                  }
                              },
                              name: 'String'
                          },
                          arguments: [{
                              type: 'Literal',
                              start: 16,
                              end: 19,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 16
                                  },
                                  end: {
                                      line: 1,
                                      column: 19
                                  }
                              },
                              value: '1',
                              raw: '"1"'
                          }]
                      }
                  }
              }],
              sourceType: 'script'
          }
      });
  });

});
