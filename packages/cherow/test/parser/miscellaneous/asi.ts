import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - ASI', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failures', () => {

    // Added this tests so we can check for both 'sloppy mode' and 'strict mode' and 'module code. It's
    // not needed, just did it to make sure, because Test262 was complaining we didn't fail on this
    const invalidSyntax = [
      '{ 1 2 } 3',
      '{} * 1',
      '({};) * 1',
      'if (false) x = 1 else x = -1',
      `var x = 0;
      if (false) {x = 1};
      else x = -1`,
      `var a=1,b=2,c=3,d;
      if(a>b)
      else c=d`,
      `{} * 1`,
      `for(

        ;) {
          break;
        }`,
        `for(
          false
      ) {
        break;
      }`,
        `for(
          false
          false
          false
      ) {
        break;
      }`,
        `do
        while (false)`,
        `do {};
        while (false)`,
        `
        var x=0, y=0;
        var z=
        x
        ++
        ++
        y`,
        `var x = 0;
        if (false) x = 1 else x = -1`,
    ];

    for (const arg of invalidSyntax) {

      it(`${arg}`, () => {
          t.throws(() => {
              parseSource(`${arg}`, undefined, Context.Empty);
          });
      });

      it(`${arg}`, () => {
        t.throws(() => {
            parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
        });
    });
    }
    fail(`Variable1 \n ++ \n ++ \n Variable2 construction`, Context.Empty, {
        source: `var x=0, y=0;
        var z=
        x
        ++
        ++
        y`,
    });

    fail(`for header is (\n false \n)`, Context.Empty, {
      source: `for(
        false
    ) {
      break;
    }`
    });

    fail(`for header is (\n semicolon false)`, Context.Empty, {
      source: `for(
        ;false) {
          break;
        }`,
    });

    fail(`for(false;false;;false) { break; }`, Context.Empty, {
            source: `for(false;false;;false) {
                break;
              }`,
        });

    fail(`\n while(false)`, Context.Empty, {
            source: `\n while(false)`,
        });

    fail(`invalid Do-While Statement ASI`, Context.Empty, {
        source: `do {}; \n while(false)`,
      });

    fail(`for header is (false \n false \n)`, Context.Empty, {
        source: `for(false
          false
      ) {
        break;
      }`,
      });

    fail(`var a=1,b=2,c=3,d;
        if(a>b)
        else c=d`, Context.Empty, {
            source: `var a=1,b=2,c=3,d;
            if(a>b)
            else c=d`,
        });

    fail('{} * 1', Context.Empty, {
            source: '{} * 1',
        });

    fail('{} * 1', Context.Empty, {
            source: '{} * 1',
        });

    fail('{} * 1', Context.Empty, {
            source: '{} * 1',
        });

    fail('{} * 1', Context.Empty, {
            source: '{} * 1',
        });

    fail('{} * 1', Context.Empty, {
            source: '{} * 1',
        });

    fail('{} * 1', Context.Empty, {
            source: '{} * 1',
        });

    fail('{} * 1', Context.Empty, {
            source: '{} * 1',
        });

    fail('{} * 1', Context.Empty, {
            source: '{} * 1',
        });

    fail('{} * 1', Context.Empty, {
            source: '{} * 1',
        });

    fail('({};) * 1', Context.Empty, {
            source: '({};) * 1',
        });

    fail(`{}
        * 1`, Context.Empty, {
            source: `{}
            * 1`,
        });

    fail('{1 2} 3', Context.Empty, {
            source: '{1 2} 3',
        });

    fail('if (false) x = 1 else x = -1', Context.Empty, {
            source: 'if (false) x = 1 else x = -1',
        });

    fail(`try {
            throw
            1;
          } catch(e) {
          }`, Context.Empty, {
            source: `try {
                throw
                1;
              } catch(e) {
              }`,
        });

    fail(`var x = 0;
        x
        ++;`, Context.Empty, {
            source: `var x = 0;
            x
            ++;`,
        });

    fail(`var x = 1;
        x
        --;`, Context.Empty, {
            source: `var x = 1;
            x
            --;`,
        });

    fail(`for(;
        ) {
          break;
        }`, Context.Empty, {
            source: `for(;
        ) {
          break;
        }`,
        });

    fail(`for(
            false
        ;) {
          break;
        }`, Context.Empty, {
            source: `for(
                false
            ;) {
              break;
            }`,
        });

    fail(`for(
            ;
        ) {
          break;
        }`, Context.Empty, {
            source: `for(
                ;
            ) {
              break;
            }`,
        });

    fail(`for(

        ) {
          break;
        }`, Context.Empty, {
            source: `for(

            ) {
              break;
            }`,
        });

    fail(`for(
            false
        ) {
          break;
        }`, Context.Empty, {
            source: `for(
                false
            ) {
              break;
            }`,
        });

    fail(`for(false
            false
        ) {
          break;
        }`, Context.Empty, {
            source: `for(false
                false
            ) {
              break;
            }`,
        });

    fail(`for(false;false;;false) {
            break;
          }`, Context.Empty, {
            source: `for(false;false;;false) {
                break;
              }`,
        });

    fail(`do
        while (false)`, Context.Empty, {
            source: `do
            while (false)`,
        });

    fail(`do

        while (false)`, Context.Empty, {
            source: `do

            while (false)`,
        });

    fail(`do {};
        while (false)`, Context.Empty, {
            source: `do {};
            while (false)`,
        });

    });

    describe('Pass', () => {

      pass(`x: while(true) { continue x\n; }`, Context.OptionsRaw, {
        source: `    \t \f\v 'abc'  \t `,
        expected: {
            body: [
              {
                expression: {
                  raw: '\'abc\'',
                  type: 'Literal',
                  value: 'abc'
                },
               type: 'ExpressionStatement',
               directive: 'abc',
              },

            ],
            sourceType: 'script',
            type: 'Program'
          }
      });

      pass(`    \t \f\v\n 'abc'  \t `, Context.OptionsRaw, {
        source: `    \t \f\v\n 'abc'  \t `,
        expected: {
            body: [
              {
                expression: {
                  raw: '\'abc\'',
                  type: 'Literal',
                  value: 'abc',
                },
                type: 'ExpressionStatement',
                directive: 'abc'
              },
            ],
            sourceType: 'script',
            type: 'Program'
          }
      });

      pass(`    \t \f\v\n`, Context.OptionsRaw, {
        source: `    \t \f\v\n`,
        expected: {
            body: [],
            sourceType: 'script',
            type: 'Program'
          }
      });

      pass(`;;1;;1;;1`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `;;1;;1;;1`,
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'EmptyStatement',
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
              {
                  type: 'EmptyStatement',
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
                  }
              },
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'Literal',
                      value: 1,
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
                      raw: '1'
                  },
                  start: 2,
                  end: 4,
                  loc: {
                      start: {
                          line: 1,
                          column: 2
                      },
                      end: {
                          line: 1,
                          column: 4
                      }
                  }
              },
              {
                  type: 'EmptyStatement',
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
                  }
              },
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'Literal',
                      value: 1,
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
                      raw: '1'
                  },
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
              {
                  type: 'EmptyStatement',
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
                  }
              },
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'Literal',
                      value: 1,
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
                      raw: '1'
                  },
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
          ],
          sourceType: 'script',
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
          }
      }
      });

      pass(`;;;;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `;;;;`,
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'EmptyStatement',
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
              {
                  type: 'EmptyStatement',
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
                  }
              },
              {
                  type: 'EmptyStatement',
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
                  }
              },
              {
                  type: 'EmptyStatement',
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
                  }
              }
          ],
          sourceType: 'script',
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
          }
      }
      });

      pass(`{ var x = 14, y = 3
            z; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `{ var x = 14, y = 3
                z; }`,
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
                    line: 2,
                    column: 20
                  }
                },
                body: [
                  {
                    type: 'BlockStatement',
                    start: 0,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 2,
                        column: 20
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
                            end: 12,
                            loc: {
                              start: {
                                line: 1,
                                column: 6
                              },
                              end: {
                                line: 1,
                                column: 12
                              }
                            },
                            id: {
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
                            init: {
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
                              value: 14,
                              raw: '14'
                            }
                          },
                          {
                            type: 'VariableDeclarator',
                            start: 14,
                            end: 19,
                            loc: {
                              start: {
                                line: 1,
                                column: 14
                              },
                              end: {
                                line: 1,
                                column: 19
                              }
                            },
                            id: {
                              type: 'Identifier',
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
                              name: 'y'
                            },
                            init: {
                              type: 'Literal',
                              start: 18,
                              end: 19,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 18
                                },
                                end: {
                                  line: 1,
                                  column: 19
                                }
                              },
                              value: 3,
                              raw: '3'
                            }
                          }
                        ],
                        kind: 'var'
                      },
                      {
                        type: 'ExpressionStatement',
                        start: 36,
                        end: 38,
                        loc: {
                          start: {
                            line: 2,
                            column: 16
                          },
                          end: {
                            line: 2,
                            column: 18
                          }
                        },
                        expression: {
                          type: 'Identifier',
                          start: 36,
                          end: 37,
                          loc: {
                            start: {
                              line: 2,
                              column: 16
                            },
                            end: {
                              line: 2,
                              column: 17
                            }
                          },
                          name: 'z'
                        }
                      }
                    ]
                  }
                ],
                sourceType: 'script'
              }
        });

      pass(';;;;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: ';;;;',
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
                body: [
                  {
                    type: 'EmptyStatement',
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
                  {
                    type: 'EmptyStatement',
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
                    }
                  },
                  {
                    type: 'EmptyStatement',
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
                    }
                  },
                  {
                    type: 'EmptyStatement',
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
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

      pass(`do {
        } while (false)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `do {
            } while (false)`,
            expected: {
                type: 'Program',
                start: 0,
                end: 32,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 2,
                    column: 27
                  }
                },
                body: [
                  {
                    type: 'DoWhileStatement',
                    start: 0,
                    end: 32,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 2,
                        column: 27
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      start: 3,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 3
                        },
                        end: {
                          line: 2,
                          column: 13
                        }
                      },
                      body: []
                    },
                    test: {
                      type: 'Literal',
                      start: 26,
                      end: 31,
                      loc: {
                        start: {
                          line: 2,
                          column: 21
                        },
                        end: {
                          line: 2,
                          column: 26
                        }
                      },
                      value: false,
                      raw: 'false'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

      pass(`var
        x
        =
        1`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `var
            x
            =
            1`,
            expected: {
                type: 'Program',
                start: 0,
                end: 45,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 4,
                    column: 13
                  }
                },
                body: [
                  {
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 4,
                        column: 13
                      }
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 16,
                        end: 45,
                        loc: {
                          start: {
                            line: 2,
                            column: 12
                          },
                          end: {
                            line: 4,
                            column: 13
                          }
                        },
                        id: {
                          type: 'Identifier',
                          start: 16,
                          end: 17,
                          loc: {
                            start: {
                              line: 2,
                              column: 12
                            },
                            end: {
                              line: 2,
                              column: 13
                            }
                          },
                          name: 'x'
                        },
                        init: {
                          type: 'Literal',
                          start: 44,
                          end: 45,
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
                          value: 1,
                          raw: '1'
                        }
                      }
                    ],
                    kind: 'var'
                  }
                ],
                sourceType: 'script'
              }
        });

      pass(`var
        x
        ,y = 1`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `var
            x
            ,y = 1`,
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
                    line: 3,
                    column: 18
                  }
                },
                body: [
                  {
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 3,
                        column: 18
                      }
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 16,
                        end: 17,
                        loc: {
                          start: {
                            line: 2,
                            column: 12
                          },
                          end: {
                            line: 2,
                            column: 13
                          }
                        },
                        id: {
                          type: 'Identifier',
                          start: 16,
                          end: 17,
                          loc: {
                            start: {
                              line: 2,
                              column: 12
                            },
                            end: {
                              line: 2,
                              column: 13
                            }
                          },
                          name: 'x'
                        },
                        init: null
                      },
                      {
                        type: 'VariableDeclarator',
                        start: 31,
                        end: 36,
                        loc: {
                          start: {
                            line: 3,
                            column: 13
                          },
                          end: {
                            line: 3,
                            column: 18
                          }
                        },
                        id: {
                          type: 'Identifier',
                          start: 31,
                          end: 32,
                          loc: {
                            start: {
                              line: 3,
                              column: 13
                            },
                            end: {
                              line: 3,
                              column: 14
                            }
                          },
                          name: 'y'
                        },
                        init: {
                          type: 'Literal',
                          start: 35,
                          end: 36,
                          loc: {
                            start: {
                              line: 3,
                              column: 17
                            },
                            end: {
                              line: 3,
                              column: 18
                            }
                          },
                          value: 1,
                          raw: '1'
                        }
                      }
                    ],
                    kind: 'var'
                  }
                ],
                sourceType: 'script'
              }
        });

      pass(`var x =
        1`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `var x =
            1`,
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
                    line: 2,
                    column: 13
                  }
                },
                body: [
                  {
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 2,
                        column: 13
                      }
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 21,
                        loc: {
                          start: {
                            line: 1,
                            column: 4
                          },
                          end: {
                            line: 2,
                            column: 13
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
                          name: 'x'
                        },
                        init: {
                          type: 'Literal',
                          start: 20,
                          end: 21,
                          loc: {
                            start: {
                              line: 2,
                              column: 12
                            },
                            end: {
                              line: 2,
                              column: 13
                            }
                          },
                          value: 1,
                          raw: '1'
                        }
                      }
                    ],
                    kind: 'var'
                  }
                ],
                sourceType: 'script'
              }
        });

      pass(`while (true) { break
            there; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `while (true) { break
                there; }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 45,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 2,
                    column: 24
                  }
                },
                body: [
                  {
                    type: 'WhileStatement',
                    start: 0,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 2,
                        column: 24
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
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 13
                        },
                        end: {
                          line: 2,
                          column: 24
                        }
                      },
                      body: [
                        {
                          type: 'BreakStatement',
                          start: 15,
                          end: 20,
                          loc: {
                            start: {
                              line: 1,
                              column: 15
                            },
                            end: {
                              line: 1,
                              column: 20
                            }
                          },
                          label: null
                        },
                        {
                          type: 'ExpressionStatement',
                          start: 37,
                          end: 43,
                          loc: {
                            start: {
                              line: 2,
                              column: 16
                            },
                            end: {
                              line: 2,
                              column: 22
                            }
                          },
                          expression: {
                            type: 'Identifier',
                            start: 37,
                            end: 42,
                            loc: {
                              start: {
                                line: 2,
                                column: 16
                              },
                              end: {
                                line: 2,
                                column: 21
                              }
                            },
                            name: 'there'
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

      pass(`var x /* comment */;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `var x /* comment */;`,
            expected: {
                type: 'Program',
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
                body: [
                  {
                    type: 'VariableDeclaration',
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
                    declarations: [
                      {
                        type: 'VariableDeclarator',
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
                          name: 'x'
                        },
                        init: null
                      }
                    ],
                    kind: 'var'
                  }
                ],
                sourceType: 'script'
              }
        });

      pass(`{ var x = 14, y = 3
            z; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `{ var x = 14, y = 3
                z; }`,
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
                    line: 2,
                    column: 20
                  }
                },
                body: [
                  {
                    type: 'BlockStatement',
                    start: 0,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 2,
                        column: 20
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
                            end: 12,
                            loc: {
                              start: {
                                line: 1,
                                column: 6
                              },
                              end: {
                                line: 1,
                                column: 12
                              }
                            },
                            id: {
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
                            init: {
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
                              value: 14,
                              raw: '14'
                            }
                          },
                          {
                            type: 'VariableDeclarator',
                            start: 14,
                            end: 19,
                            loc: {
                              start: {
                                line: 1,
                                column: 14
                              },
                              end: {
                                line: 1,
                                column: 19
                              }
                            },
                            id: {
                              type: 'Identifier',
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
                              name: 'y'
                            },
                            init: {
                              type: 'Literal',
                              start: 18,
                              end: 19,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 18
                                },
                                end: {
                                  line: 1,
                                  column: 19
                                }
                              },
                              value: 3,
                              raw: '3'
                            }
                          }
                        ],
                        kind: 'var'
                      },
                      {
                        type: 'ExpressionStatement',
                        start: 36,
                        end: 38,
                        loc: {
                          start: {
                            line: 2,
                            column: 16
                          },
                          end: {
                            line: 2,
                            column: 18
                          }
                        },
                        expression: {
                          type: 'Identifier',
                          start: 36,
                          end: 37,
                          loc: {
                            start: {
                              line: 2,
                              column: 16
                            },
                            end: {
                              line: 2,
                              column: 17
                            }
                          },
                          name: 'z'
                        }
                      }
                    ]
                  }
                ],
                sourceType: 'script'
              }
        });

      pass('0\n;', Context.Empty, {
            source: '0\n;',
            expected: {
                  body: [
                    {
                      expression: {
                        type: 'Literal',
                        value: 0,
                      },
                      type: 'ExpressionStatement',
                    },
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

      pass(`for(
            ;;
        ) {
          break;
        }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `for(
                ;;
            ) {
              break;
            }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 74,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 5,
                    column: 13
                  }
                },
                body: [
                  {
                    type: 'ForStatement',
                    start: 0,
                    end: 74,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 5,
                        column: 13
                      }
                    },
                    init: null,
                    test: null,
                    update: null,
                    body: {
                      type: 'BlockStatement',
                      start: 38,
                      end: 74,
                      loc: {
                        start: {
                          line: 3,
                          column: 14
                        },
                        end: {
                          line: 5,
                          column: 13
                        }
                      },
                      body: [
                        {
                          type: 'BreakStatement',
                          start: 54,
                          end: 60,
                          loc: {
                            start: {
                              line: 4,
                              column: 14
                            },
                            end: {
                              line: 4,
                              column: 20
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

      pass(`for(false
            ;false
            ;false
        ) {
          break;
        }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `for(false
                ;false
                ;false
            ) {
              break;
            }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 106,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 6,
                    column: 13
                  }
                },
                body: [
                  {
                    type: 'ForStatement',
                    start: 0,
                    end: 106,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 6,
                        column: 13
                      }
                    },
                    init: {
                      type: 'Literal',
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
                      value: false,
                      raw: 'false'
                    },
                    test: {
                      type: 'Literal',
                      start: 27,
                      end: 32,
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
                      value: false,
                      raw: 'false'
                    },
                    update: {
                      type: 'Literal',
                      start: 50,
                      end: 55,
                      loc: {
                        start: {
                          line: 3,
                          column: 17
                        },
                        end: {
                          line: 3,
                          column: 22
                        }
                      },
                      value: false,
                      raw: 'false'
                    },
                    body: {
                      type: 'BlockStatement',
                      start: 70,
                      end: 106,
                      loc: {
                        start: {
                          line: 4,
                          column: 14
                        },
                        end: {
                          line: 6,
                          column: 13
                        }
                      },
                      body: [
                        {
                          type: 'BreakStatement',
                          start: 86,
                          end: 92,
                          loc: {
                            start: {
                              line: 5,
                              column: 14
                            },
                            end: {
                              line: 5,
                              column: 20
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

      pass(`for(;;
        ) {
          break;
        }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `for(;;
            ) {
              break;
            }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 57,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 4,
                    column: 13
                  }
                },
                body: [
                  {
                    type: 'ForStatement',
                    start: 0,
                    end: 57,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 4,
                        column: 13
                      }
                    },
                    init: null,
                    test: null,
                    update: null,
                    body: {
                      type: 'BlockStatement',
                      start: 21,
                      end: 57,
                      loc: {
                        start: {
                          line: 2,
                          column: 14
                        },
                        end: {
                          line: 4,
                          column: 13
                        }
                      },
                      body: [
                        {
                          type: 'BreakStatement',
                          start: 37,
                          end: 43,
                          loc: {
                            start: {
                              line: 3,
                              column: 14
                            },
                            end: {
                              line: 3,
                              column: 20
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

      pass(`var x = 0;
        if (false)
        x = 1`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `var x = 0;
            if (false)
            x = 1`,
            expected: {
                type: 'Program',
                start: 0,
                end: 51,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 3,
                    column: 17
                  }
                },
                body: [
                  {
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 10,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 10
                      }
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
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
                          name: 'x'
                        },
                        init: {
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
                          value: 0,
                          raw: '0'
                        }
                      }
                    ],
                    kind: 'var'
                  },
                  {
                    type: 'IfStatement',
                    start: 23,
                    end: 51,
                    loc: {
                      start: {
                        line: 2,
                        column: 12
                      },
                      end: {
                        line: 3,
                        column: 17
                      }
                    },
                    test: {
                      type: 'Literal',
                      start: 27,
                      end: 32,
                      loc: {
                        start: {
                          line: 2,
                          column: 16
                        },
                        end: {
                          line: 2,
                          column: 21
                        }
                      },
                      value: false,
                      raw: 'false'
                    },
                    consequent: {
                      type: 'ExpressionStatement',
                      start: 46,
                      end: 51,
                      loc: {
                        start: {
                          line: 3,
                          column: 12
                        },
                        end: {
                          line: 3,
                          column: 17
                        }
                      },
                      expression: {
                        type: 'AssignmentExpression',
                        start: 46,
                        end: 51,
                        loc: {
                          start: {
                            line: 3,
                            column: 12
                          },
                          end: {
                            line: 3,
                            column: 17
                          }
                        },
                        operator: '=',
                        left: {
                          type: 'Identifier',
                          start: 46,
                          end: 47,
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
                          name: 'x'
                        },
                        right: {
                          type: 'Literal',
                          start: 50,
                          end: 51,
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
                          value: 1,
                          raw: '1'
                        }
                      }
                    },
                    alternate: null
                  }
                ],
                sourceType: 'script'
              }
        });

      pass(`(0)\n;`, Context.Empty, {
            source: '(0)\n;',
            expected: {
                  body: [
                    {
                      expression: {
                       type: 'Literal',
                        value: 0,
                      },
                      type: 'ExpressionStatement',
                    }
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

      pass(`debugger\n;`, Context.Empty, {
            source: 'debugger\n;',
            expected: {
                  body: [
                    {
                      type: 'DebuggerStatement',
                    }
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

      pass(`throw 0\n;`, Context.Empty, {
            source: 'throw 0\n;',
            expected: {
                  body: [
                    {
                      argument: {
                        type: 'Literal',
                        value: 0,
                      },
                      type: 'ThrowStatement'
                    }
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

      pass(`x: while(true) { continue x\n; }`, Context.Empty, {
            source: 'x: while(true) { continue x\n; }',
            expected: {
                  body: [
                    {
                      body: {
                        body: {
                          body: [
                            {
                              label: {
                                name: 'x',
                                type: 'Identifier'
                              },
                              type: 'ContinueStatement'
                            }
                          ],
                          type: 'BlockStatement'
                        },
                        test: {
                          type: 'Literal',
                          value: true,
                        },
                        type: 'WhileStatement'
                      },
                      label: {
                        name: 'x',
                        type: 'Identifier'
                      },
                     type: 'LabeledStatement'
                    }
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

      pass(`function f() { return\n; }`, Context.Empty, {
            source: 'function f() { return\n; }',
            expected: {
                  body: [
                    {
                      async: false,
                      body: {
                        body: [
                          {
                            argument: null,
                            type: 'ReturnStatement'
                          }
                        ],
                        type: 'BlockStatement'
                      },
                      expression: false,
                      generator: false,
                      id: {
                        name: 'f',
                        type: 'Identifier',
                      },
                      params: [],
                      type: 'FunctionDeclaration'
                   }
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

      pass(`function* f() { yield\n; }`, Context.Empty, {
            source: 'function* f() { yield\n; }',
            expected: {
                body: [
                  {
                    async: false,
                    body: {
                      body: [
                        {
                          expression: {
                            argument: null,
                            delegate: false,
                            type: 'YieldExpression'
                          },
                          type: 'ExpressionStatement',
                        }
                      ],
                      type: 'BlockStatement',
                    },
                    expression: false,
                    generator: true,
                    id: {
                      name: 'f',
                      type: 'Identifier',
                    },
                    params: [],
                    type: 'FunctionDeclaration'
                  }
                ],
                sourceType: 'script',
                type: 'Program'
              }
        });

      pass(`{1} 2`, Context.Empty, {
            source: '{1} 2',
            expected: {
                  body: [
                    {
                      body: [
                        {
                          expression: {
                            type: 'Literal',
                            value: 1,
                          },
                          type: 'ExpressionStatement'
                        }
                      ],
                      type: 'BlockStatement'
                    },
                    {
                      expression: {
                        type: 'Literal',
                        value: 2,
                      },
                     type: 'ExpressionStatement'
                    }
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

      pass(`{1
            2} 3`, Context.Empty, {
            source: `{1
                2} 3`,
            expected: {
                  body: [
                    {
                      body: [
                        {
                          expression: {
                            type: 'Literal',
                            value: 1
                          },
                          type: 'ExpressionStatement'
                        },
                        {
                          expression: {
                            type: 'Literal',
                            value: 2
                          },
                          type: 'ExpressionStatement'
                        }
                      ],
                      type: 'BlockStatement'
                    },
                    {
                      expression: {
                        type: 'Literal',
                        value: 3,
                      },
                     type: 'ExpressionStatement'
                    },
                  ],
                  sourceType: 'script',
                 type: 'Program'
                }
        });
    });

    pass(`var x = 1 + f
    (2 + 3)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `var x = 1 + f
        (2 + 3)`,
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
                line: 2,
                column: 15
              }
            },
            body: [
              {
                type: 'VariableDeclaration',
                start: 0,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 2,
                    column: 15
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 4,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 4
                      },
                      end: {
                        line: 2,
                        column: 15
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
                      name: 'x'
                    },
                    init: {
                      type: 'BinaryExpression',
                      start: 8,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 8
                        },
                        end: {
                          line: 2,
                          column: 15
                        }
                      },
                      left: {
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
                        value: 1,
                        raw: '1'
                      },
                      operator: '+',
                      right: {
                        type: 'CallExpression',
                        start: 12,
                        end: 29,
                        loc: {
                          start: {
                            line: 1,
                            column: 12
                          },
                          end: {
                            line: 2,
                            column: 15
                          }
                        },
                        callee: {
                          type: 'Identifier',
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
                          name: 'f'
                        },
                        arguments: [
                          {
                            type: 'BinaryExpression',
                            start: 23,
                            end: 28,
                            loc: {
                              start: {
                                line: 2,
                                column: 9
                              },
                              end: {
                                line: 2,
                                column: 14
                              }
                            },
                            left: {
                              type: 'Literal',
                              start: 23,
                              end: 24,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 9
                                },
                                end: {
                                  line: 2,
                                  column: 10
                                }
                              },
                              value: 2,
                              raw: '2'
                            },
                            operator: '+',
                            right: {
                              type: 'Literal',
                              start: 27,
                              end: 28,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 13
                                },
                                end: {
                                  line: 2,
                                  column: 14
                                }
                              },
                              value: 3,
                              raw: '3'
                            }
                          }
                        ]
                      }
                    }
                  }
                ],
                kind: 'var'
              }
            ],
            sourceType: 'script'
          }
        });

    pass(`while (true) { break /* Multiline
            Comment */there; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `while (true) { break /* Multiline
                Comment */there; }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 68,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 2,
                    column: 34
                  }
                },
                body: [
                  {
                    type: 'WhileStatement',
                    start: 0,
                    end: 68,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 2,
                        column: 34
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
                      end: 68,
                      loc: {
                        start: {
                          line: 1,
                          column: 13
                        },
                        end: {
                          line: 2,
                          column: 34
                        }
                      },
                      body: [
                        {
                          type: 'BreakStatement',
                          start: 15,
                          end: 20,
                          loc: {
                            start: {
                              line: 1,
                              column: 15
                            },
                            end: {
                              line: 1,
                              column: 20
                            }
                          },
                          label: null
                        },
                        {
                          type: 'ExpressionStatement',
                          start: 60,
                          end: 66,
                          loc: {
                            start: {
                              line: 2,
                              column: 26
                            },
                            end: {
                              line: 2,
                              column: 32
                            }
                          },
                          expression: {
                            type: 'Identifier',
                            start: 60,
                            end: 65,
                            loc: {
                              start: {
                                line: 2,
                                column: 26
                              },
                              end: {
                                line: 2,
                                column: 31
                              }
                            },
                            name: 'there'
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`while (true) { break // Comment
            there; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `while (true) { break // Comment
                there; }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 56,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 2,
                    column: 24
                  }
                },
                body: [
                  {
                    type: 'WhileStatement',
                    start: 0,
                    end: 56,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 2,
                        column: 24
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
                      end: 56,
                      loc: {
                        start: {
                          line: 1,
                          column: 13
                        },
                        end: {
                          line: 2,
                          column: 24
                        }
                      },
                      body: [
                        {
                          type: 'BreakStatement',
                          start: 15,
                          end: 20,
                          loc: {
                            start: {
                              line: 1,
                              column: 15
                            },
                            end: {
                              line: 1,
                              column: 20
                            }
                          },
                          label: null
                        },
                        {
                          type: 'ExpressionStatement',
                          start: 48,
                          end: 54,
                          loc: {
                            start: {
                              line: 2,
                              column: 16
                            },
                            end: {
                              line: 2,
                              column: 22
                            }
                          },
                          expression: {
                            type: 'Identifier',
                            start: 48,
                            end: 53,
                            loc: {
                              start: {
                                line: 2,
                                column: 16
                              },
                              end: {
                                line: 2,
                                column: 21
                              }
                            },
                            name: 'there'
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
