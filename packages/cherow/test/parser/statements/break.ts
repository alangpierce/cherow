import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Statements - Break', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        fail(`break`, Context.Empty, {
            source: `break`,
        });

        fail(`loop1: function a() {}  while (true) { continue loop1; }`, Context.Empty, {
            source: `loop1: function a() {} while (true) { continue loop1; }`,
        });

        fail(`{  break foo; var y=2; }`, Context.Empty, {
            source: `{ break foo; var y=2; }`,
        });

        fail(`loop1: while (true) { loop2: function a() { break loop1; } }`, Context.Empty, {
            source: `loop1: while (true) { loop2: function a() { break loop1; } }`,
        });

        fail(`loop1: while (true) { loop2: function a() { break loop2; } }`, Context.Empty, {
            source: `loop1: while (true) { loop2: function a() { break loop2; } }`,
        });

        fail('ice: while(true) { break fapper; }', Context.Empty, {
            source: 'ice: while(true) { break fapper; }',
        });

        // Test262 tests

        fail(`(function(){
    OuterLabel : var x=0, y=0;
    LABEL_DO_LOOP : do {
        LABEL_IN : x++;
        if(x===10)
            return;
        break LABEL_ANOTHER_LOOP;
        LABEL_IN_2 : y++;
        function IN_DO_FUNC(){}
    } while(0);

    LABEL_ANOTHER_LOOP : do {
        ;
    } while(0);

    function OUT_FUNC(){}
})();`, Context.Empty, {
            source: `(function(){
      OuterLabel : var x=0, y=0;
      LABEL_DO_LOOP : do {
          LABEL_IN : x++;
          if(x===10)
              return;
          break LABEL_ANOTHER_LOOP;
          LABEL_IN_2 : y++;
          function IN_DO_FUNC(){}
      } while(0);

      LABEL_ANOTHER_LOOP : do {
          ;
      } while(0);

      function OUT_FUNC(){}
  })();`,
        });

        fail(`LABEL1 : do {
        x++;
        (function(){break LABEL1;})();
        y++;
    } while(0);`, Context.Empty, {
            source: `LABEL1 : do {
                x++;
                (function(){break LABEL1;})();
                y++;
            } while(0);`,
        });

        fail(`(function(){
        OuterLabel : var x=0, y=0;
        LABEL_DO_LOOP : do {
            LABEL_IN : x++;
            if(x===10)
                return;
            break IN_DO_FUNC;
            LABEL_IN_2 : y++;
            function IN_DO_FUNC(){}
        } while(0);

        LABEL_ANOTHER_LOOP : do {
            ;
        } while(0);

        function OUT_FUNC(){}
    })();`, Context.Empty, {
            source: `(function(){
                OuterLabel : var x=0, y=0;
                LABEL_DO_LOOP : do {
                    LABEL_IN : x++;
                    if(x===10)
                        return;
                    break IN_DO_FUNC;
                    LABEL_IN_2 : y++;
                    function IN_DO_FUNC(){}
                } while(0);

                LABEL_ANOTHER_LOOP : do {
                    ;
                } while(0);

                function OUT_FUNC(){}
            })();`,
        });

        fail(`(function(){
            OuterLabel : var x=0, y=0;
            LABEL_DO_LOOP : do {
                LABEL_IN : x++;
                if(x===10)
                    return;
                break LABEL_IN;
                LABEL_IN_2 : y++;

                function IN_DO_FUNC(){}

            } while(0);

            LABEL_ANOTHER_LOOP : do {
                ;
            } while(0);

            function OUT_FUNC(){}

        })();`, Context.Empty, {
            source: `(function(){
                    OuterLabel : var x=0, y=0;
                    LABEL_DO_LOOP : do {
                        LABEL_IN : x++;
                        if(x===10)
                            return;
                        break LABEL_IN;
                        LABEL_IN_2 : y++;

                        function IN_DO_FUNC(){}

                    } while(0);

                    LABEL_ANOTHER_LOOP : do {
                        ;
                    } while(0);

                    function OUT_FUNC(){}

                })();`,
        });

        fail(`(function(){
    OuterLabel : var x=0, y=0;
    LABEL_DO_LOOP : do {
        LABEL_IN : x++;
        if(x===10)
            return;
        break IN_DO_FUNC;
        LABEL_IN_2 : y++;
        function IN_DO_FUNC(){}
    } while(0);

    LABEL_ANOTHER_LOOP : do {
        ;
    } while(0);

    function OUT_FUNC(){}
})();`, Context.Empty, {
            source: `(function(){
      OuterLabel : var x=0, y=0;
      LABEL_DO_LOOP : do {
          LABEL_IN : x++;
          if(x===10)
              return;
          break IN_DO_FUNC;
          LABEL_IN_2 : y++;
          function IN_DO_FUNC(){}
      } while(0);

      LABEL_ANOTHER_LOOP : do {
          ;
      } while(0);

      function OUT_FUNC(){}
  })();`,
        });

        fail(`(function(){
    OuterLabel : var x=0, y=0;
    LABEL_DO_LOOP : do {
        LABEL_IN : x++;
        if(x===10)
            return;
        break LABEL_IN;
        LABEL_IN_2 : y++;

        function IN_DO_FUNC(){}

    } while(0);

    LABEL_ANOTHER_LOOP : do {
        ;
    } while(0);

    function OUT_FUNC(){}

})();`, Context.Empty, {
            source: `(function(){
      OuterLabel : var x=0, y=0;
      LABEL_DO_LOOP : do {
          LABEL_IN : x++;
          if(x===10)
              return;
          break LABEL_IN;
          LABEL_IN_2 : y++;

          function IN_DO_FUNC(){}

      } while(0);

      LABEL_ANOTHER_LOOP : do {
          ;
      } while(0);

      function OUT_FUNC(){}

  })();`,
        });

        fail(`var x=0,y=0;

  try{
    LABEL1 : do {
      x++;
      throw "gonna leave it";
      y++;
    } while(0);
    $ERROR('#1: throw "gonna leave it" lead to throwing exception');
  } catch(e){
    break;
    LABEL2 : do {
      x++;
      y++;
    } while(0);
  }`, Context.Empty, {
            source: `var x=0,y=0;

    try{
      LABEL1 : do {
        x++;
        throw "gonna leave it";
        y++;
      } while(0);
      $ERROR('#1: throw "gonna leave it" lead to throwing exception');
    } catch(e){
      break;
      LABEL2 : do {
        x++;
        y++;
      } while(0);
    }`,
        });

    });

    describe('Pass', () => {

        /*pass(`loop; while (true) { break loop1; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `

    loop1: while (true) { loop2: function a() { continue loop2; } }`,
    expected: {}
  });
*/
        /*
          pass(`try{
        	LABEL1 : do {
                x++;
                eval("break LABEL1");
                y++;
            } while(0);
        	$ERROR('#1: eval("break LABEL1") does not lead to throwing exception');
        } catch(e){
        	if(!(e instanceof SyntaxError)){
        		$ERROR("1.1: Appearing of break within eval statement inside of IterationStatement yields SyntaxError");
        	}
        }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `try{
                LABEL1 : do {
                    x++;
                    eval("break LABEL1");
                    y++;
                } while(0);
                $ERROR('#1: eval("break LABEL1") does not lead to throwing exception');
            } catch(e){
                if(!(e instanceof SyntaxError)){
                    $ERROR("1.1: Appearing of break within eval statement inside of IterationStatement yields SyntaxError");
                }
            }`,
            expected: {}
          });*/

        pass(`(function(){
    FOR : for(;;){
        try{
            x++;
            if(x===10)return;
            throw 1;
        } catch(e){
            break FOR;
        }
    }
    })();`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(function(){
        FOR : for(;;){
            try{
                x++;
                if(x===10)return;
                throw 1;
            } catch(e){
                break FOR;
            }
        }
        })();`,
            expected: {
                type: 'Program',
                start: 0,
                end: 221,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 11,
                    column: 13
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 221,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 11,
                        column: 13
                      }
                    },
                    expression: {
                      type: 'CallExpression',
                      start: 0,
                      end: 220,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 11,
                          column: 12
                        }
                      },
                      callee: {
                        type: 'FunctionExpression',
                        start: 1,
                        end: 217,
                        loc: {
                          start: {
                            line: 1,
                            column: 1
                          },
                          end: {
                            line: 11,
                            column: 9
                          }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          start: 11,
                          end: 217,
                          loc: {
                            start: {
                              line: 1,
                              column: 11
                            },
                            end: {
                              line: 11,
                              column: 9
                            }
                          },
                          body: [
                            {
                              type: 'LabeledStatement',
                              start: 21,
                              end: 207,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 8
                                },
                                end: {
                                  line: 10,
                                  column: 9
                                }
                              },
                              body: {
                                type: 'ForStatement',
                                start: 27,
                                end: 207,
                                loc: {
                                  start: {
                                    line: 2,
                                    column: 14
                                  },
                                  end: {
                                    line: 10,
                                    column: 9
                                  }
                                },
                                init: null,
                                test: null,
                                update: null,
                                body: {
                                  type: 'BlockStatement',
                                  start: 34,
                                  end: 207,
                                  loc: {
                                    start: {
                                      line: 2,
                                      column: 21
                                    },
                                    end: {
                                      line: 10,
                                      column: 9
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'TryStatement',
                                      start: 48,
                                      end: 197,
                                      loc: {
                                        start: {
                                          line: 3,
                                          column: 12
                                        },
                                        end: {
                                          line: 9,
                                          column: 13
                                        }
                                      },
                                      block: {
                                        type: 'BlockStatement',
                                        start: 51,
                                        end: 146,
                                        loc: {
                                          start: {
                                            line: 3,
                                            column: 15
                                          },
                                          end: {
                                            line: 7,
                                            column: 13
                                          }
                                        },
                                        body: [
                                          {
                                            type: 'ExpressionStatement',
                                            start: 69,
                                            end: 73,
                                            loc: {
                                              start: {
                                                line: 4,
                                                column: 16
                                              },
                                              end: {
                                                line: 4,
                                                column: 20
                                              }
                                            },
                                            expression: {
                                              type: 'UpdateExpression',
                                              start: 69,
                                              end: 72,
                                              loc: {
                                                start: {
                                                  line: 4,
                                                  column: 16
                                                },
                                                end: {
                                                  line: 4,
                                                  column: 19
                                                }
                                              },
                                              operator: '++',
                                              prefix: false,
                                              argument: {
                                                type: 'Identifier',
                                                start: 69,
                                                end: 70,
                                                loc: {
                                                  start: {
                                                    line: 4,
                                                    column: 16
                                                  },
                                                  end: {
                                                    line: 4,
                                                    column: 17
                                                  }
                                                },
                                                name: 'x'
                                              }
                                            }
                                          },
                                          {
                                            type: 'IfStatement',
                                            start: 90,
                                            end: 107,
                                            loc: {
                                              start: {
                                                line: 5,
                                                column: 16
                                              },
                                              end: {
                                                line: 5,
                                                column: 33
                                              }
                                            },
                                            test: {
                                              type: 'BinaryExpression',
                                              start: 93,
                                              end: 99,
                                              loc: {
                                                start: {
                                                  line: 5,
                                                  column: 19
                                                },
                                                end: {
                                                  line: 5,
                                                  column: 25
                                                }
                                              },
                                              left: {
                                                type: 'Identifier',
                                                start: 93,
                                                end: 94,
                                                loc: {
                                                  start: {
                                                    line: 5,
                                                    column: 19
                                                  },
                                                  end: {
                                                    line: 5,
                                                    column: 20
                                                  }
                                                },
                                                name: 'x'
                                              },
                                              operator: '===',
                                              right: {
                                                type: 'Literal',
                                                start: 97,
                                                end: 99,
                                                loc: {
                                                  start: {
                                                    line: 5,
                                                    column: 23
                                                  },
                                                  end: {
                                                    line: 5,
                                                    column: 25
                                                  }
                                                },
                                                value: 10,
                                                raw: '10'
                                              }
                                            },
                                            consequent: {
                                              type: 'ReturnStatement',
                                              start: 100,
                                              end: 107,
                                              loc: {
                                                start: {
                                                  line: 5,
                                                  column: 26
                                                },
                                                end: {
                                                  line: 5,
                                                  column: 33
                                                }
                                              },
                                              argument: null
                                            },
                                            alternate: null
                                          },
                                          {
                                            type: 'ThrowStatement',
                                            start: 124,
                                            end: 132,
                                            loc: {
                                              start: {
                                                line: 6,
                                                column: 16
                                              },
                                              end: {
                                                line: 6,
                                                column: 24
                                              }
                                            },
                                            argument: {
                                              type: 'Literal',
                                              start: 130,
                                              end: 131,
                                              loc: {
                                                start: {
                                                  line: 6,
                                                  column: 22
                                                },
                                                end: {
                                                  line: 6,
                                                  column: 23
                                                }
                                              },
                                              value: 1,
                                              raw: '1'
                                            }
                                          }
                                        ]
                                      },
                                      handler: {
                                        type: 'CatchClause',
                                        start: 147,
                                        end: 197,
                                        loc: {
                                          start: {
                                            line: 7,
                                            column: 14
                                          },
                                          end: {
                                            line: 9,
                                            column: 13
                                          }
                                        },
                                        param: {
                                          type: 'Identifier',
                                          start: 153,
                                          end: 154,
                                          loc: {
                                            start: {
                                              line: 7,
                                              column: 20
                                            },
                                            end: {
                                              line: 7,
                                              column: 21
                                            }
                                          },
                                          name: 'e'
                                        },
                                        body: {
                                          type: 'BlockStatement',
                                          start: 155,
                                          end: 197,
                                          loc: {
                                            start: {
                                              line: 7,
                                              column: 22
                                            },
                                            end: {
                                              line: 9,
                                              column: 13
                                            }
                                          },
                                          body: [
                                            {
                                              type: 'BreakStatement',
                                              start: 173,
                                              end: 183,
                                              loc: {
                                                start: {
                                                  line: 8,
                                                  column: 16
                                                },
                                                end: {
                                                  line: 8,
                                                  column: 26
                                                }
                                              },
                                              label: {
                                                type: 'Identifier',
                                                start: 179,
                                                end: 182,
                                                loc: {
                                                  start: {
                                                    line: 8,
                                                    column: 22
                                                  },
                                                  end: {
                                                    line: 8,
                                                    column: 25
                                                  }
                                                },
                                                name: 'FOR'
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      finalizer: null
                                    }
                                  ]
                                }
                              },
                              label: {
                                type: 'Identifier',
                                start: 21,
                                end: 24,
                                loc: {
                                  start: {
                                    line: 2,
                                    column: 8
                                  },
                                  end: {
                                    line: 2,
                                    column: 11
                                  }
                                },
                                name: 'FOR'
                              }
                            }
                          ]
                        }
                      },
                      arguments: []
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`LABEL_OUT : var x=0, y=0, xx=0, yy=0;
(function(){
LABEL_DO_LOOP : do {
    LABEL_IN : x++;
    if(x===10)return;
    LABEL_NESTED_LOOP : do {
        LABEL_IN_NESTED : xx++;
        if(xx===10)return;
        break LABEL_DO_LOOP;
        LABEL_IN_NESTED_2 : yy++;
    } while (0);

    LABEL_IN_2 : y++;

    function IN_DO_FUNC(){}
} while(0);

LABEL_ANOTHER_LOOP : do {
    ;
} while(0);

function OUT_FUNC(){}
})();`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `LABEL_OUT : var x=0, y=0, xx=0, yy=0;
        (function(){
        LABEL_DO_LOOP : do {
            LABEL_IN : x++;
            if(x===10)return;
            LABEL_NESTED_LOOP : do {
                LABEL_IN_NESTED : xx++;
                if(xx===10)return;
                break LABEL_DO_LOOP;
                LABEL_IN_NESTED_2 : yy++;
            } while (0);

            LABEL_IN_2 : y++;

            function IN_DO_FUNC(){}
        } while(0);

        LABEL_ANOTHER_LOOP : do {
            ;
        } while(0);

        function OUT_FUNC(){}
        })();`,
            expected: {
                type: 'Program',
                start: 0,
                end: 563,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 23,
                    column: 13
                  }
                },
                body: [
                  {
                    type: 'LabeledStatement',
                    start: 0,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    },
                    body: {
                      type: 'VariableDeclaration',
                      start: 12,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      },
                      declarations: [
                        {
                          type: 'VariableDeclarator',
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
                          id: {
                            type: 'Identifier',
                            start: 16,
                            end: 17,
                            loc: {
                              start: {
                                line: 1,
                                column: 16
                              },
                              end: {
                                line: 1,
                                column: 17
                              }
                            },
                            name: 'x'
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
                            value: 0,
                            raw: '0'
                          }
                        },
                        {
                          type: 'VariableDeclarator',
                          start: 21,
                          end: 24,
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 24
                            }
                          },
                          id: {
                            type: 'Identifier',
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
                            },
                            name: 'y'
                          },
                          init: {
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
                        },
                        {
                          type: 'VariableDeclarator',
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
                          id: {
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
                            name: 'xx'
                          },
                          init: {
                            type: 'Literal',
                            start: 29,
                            end: 30,
                            loc: {
                              start: {
                                line: 1,
                                column: 29
                              },
                              end: {
                                line: 1,
                                column: 30
                              }
                            },
                            value: 0,
                            raw: '0'
                          }
                        },
                        {
                          type: 'VariableDeclarator',
                          start: 32,
                          end: 36,
                          loc: {
                            start: {
                              line: 1,
                              column: 32
                            },
                            end: {
                              line: 1,
                              column: 36
                            }
                          },
                          id: {
                            type: 'Identifier',
                            start: 32,
                            end: 34,
                            loc: {
                              start: {
                                line: 1,
                                column: 32
                              },
                              end: {
                                line: 1,
                                column: 34
                              }
                            },
                            name: 'yy'
                          },
                          init: {
                            type: 'Literal',
                            start: 35,
                            end: 36,
                            loc: {
                              start: {
                                line: 1,
                                column: 35
                              },
                              end: {
                                line: 1,
                                column: 36
                              }
                            },
                            value: 0,
                            raw: '0'
                          }
                        }
                      ],
                      kind: 'var'
                    },
                    label: {
                      type: 'Identifier',
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
                      name: 'LABEL_OUT'
                    }
                  },
                  {
                    type: 'ExpressionStatement',
                    start: 46,
                    end: 563,
                    loc: {
                      start: {
                        line: 2,
                        column: 8
                      },
                      end: {
                        line: 23,
                        column: 13
                      }
                    },
                    expression: {
                      type: 'CallExpression',
                      start: 46,
                      end: 562,
                      loc: {
                        start: {
                          line: 2,
                          column: 8
                        },
                        end: {
                          line: 23,
                          column: 12
                        }
                      },
                      callee: {
                        type: 'FunctionExpression',
                        start: 47,
                        end: 559,
                        loc: {
                          start: {
                            line: 2,
                            column: 9
                          },
                          end: {
                            line: 23,
                            column: 9
                          }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          start: 57,
                          end: 559,
                          loc: {
                            start: {
                              line: 2,
                              column: 19
                            },
                            end: {
                              line: 23,
                              column: 9
                            }
                          },
                          body: [
                            {
                              type: 'LabeledStatement',
                              start: 67,
                              end: 449,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 8
                                },
                                end: {
                                  line: 16,
                                  column: 19
                                }
                              },
                              body: {
                                type: 'DoWhileStatement',
                                start: 83,
                                end: 449,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 24
                                  },
                                  end: {
                                    line: 16,
                                    column: 19
                                  }
                                },
                                body: {
                                  type: 'BlockStatement',
                                  start: 86,
                                  end: 439,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 27
                                    },
                                    end: {
                                      line: 16,
                                      column: 9
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'LabeledStatement',
                                      start: 100,
                                      end: 115,
                                      loc: {
                                        start: {
                                          line: 4,
                                          column: 12
                                        },
                                        end: {
                                          line: 4,
                                          column: 27
                                        }
                                      },
                                      body: {
                                        type: 'ExpressionStatement',
                                        start: 111,
                                        end: 115,
                                        loc: {
                                          start: {
                                            line: 4,
                                            column: 23
                                          },
                                          end: {
                                            line: 4,
                                            column: 27
                                          }
                                        },
                                        expression: {
                                          type: 'UpdateExpression',
                                          start: 111,
                                          end: 114,
                                          loc: {
                                            start: {
                                              line: 4,
                                              column: 23
                                            },
                                            end: {
                                              line: 4,
                                              column: 26
                                            }
                                          },
                                          operator: '++',
                                          prefix: false,
                                          argument: {
                                            type: 'Identifier',
                                            start: 111,
                                            end: 112,
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
                                            name: 'x'
                                          }
                                        }
                                      },
                                      label: {
                                        type: 'Identifier',
                                        start: 100,
                                        end: 108,
                                        loc: {
                                          start: {
                                            line: 4,
                                            column: 12
                                          },
                                          end: {
                                            line: 4,
                                            column: 20
                                          }
                                        },
                                        name: 'LABEL_IN'
                                      }
                                    },
                                    {
                                      type: 'IfStatement',
                                      start: 128,
                                      end: 145,
                                      loc: {
                                        start: {
                                          line: 5,
                                          column: 12
                                        },
                                        end: {
                                          line: 5,
                                          column: 29
                                        }
                                      },
                                      test: {
                                        type: 'BinaryExpression',
                                        start: 131,
                                        end: 137,
                                        loc: {
                                          start: {
                                            line: 5,
                                            column: 15
                                          },
                                          end: {
                                            line: 5,
                                            column: 21
                                          }
                                        },
                                        left: {
                                          type: 'Identifier',
                                          start: 131,
                                          end: 132,
                                          loc: {
                                            start: {
                                              line: 5,
                                              column: 15
                                            },
                                            end: {
                                              line: 5,
                                              column: 16
                                            }
                                          },
                                          name: 'x'
                                        },
                                        operator: '===',
                                        right: {
                                          type: 'Literal',
                                          start: 135,
                                          end: 137,
                                          loc: {
                                            start: {
                                              line: 5,
                                              column: 19
                                            },
                                            end: {
                                              line: 5,
                                              column: 21
                                            }
                                          },
                                          value: 10,
                                          raw: '10'
                                        }
                                      },
                                      consequent: {
                                        type: 'ReturnStatement',
                                        start: 138,
                                        end: 145,
                                        loc: {
                                          start: {
                                            line: 5,
                                            column: 22
                                          },
                                          end: {
                                            line: 5,
                                            column: 29
                                          }
                                        },
                                        argument: null
                                      },
                                      alternate: null
                                    },
                                    {
                                      type: 'LabeledStatement',
                                      start: 158,
                                      end: 361,
                                      loc: {
                                        start: {
                                          line: 6,
                                          column: 12
                                        },
                                        end: {
                                          line: 11,
                                          column: 24
                                        }
                                      },
                                      body: {
                                        type: 'DoWhileStatement',
                                        start: 178,
                                        end: 361,
                                        loc: {
                                          start: {
                                            line: 6,
                                            column: 32
                                          },
                                          end: {
                                            line: 11,
                                            column: 24
                                          }
                                        },
                                        body: {
                                          type: 'BlockStatement',
                                          start: 181,
                                          end: 350,
                                          loc: {
                                            start: {
                                              line: 6,
                                              column: 35
                                            },
                                            end: {
                                              line: 11,
                                              column: 13
                                            }
                                          },
                                          body: [
                                            {
                                              type: 'LabeledStatement',
                                              start: 199,
                                              end: 222,
                                              loc: {
                                                start: {
                                                  line: 7,
                                                  column: 16
                                                },
                                                end: {
                                                  line: 7,
                                                  column: 39
                                                }
                                              },
                                              body: {
                                                type: 'ExpressionStatement',
                                                start: 217,
                                                end: 222,
                                                loc: {
                                                  start: {
                                                    line: 7,
                                                    column: 34
                                                  },
                                                  end: {
                                                    line: 7,
                                                    column: 39
                                                  }
                                                },
                                                expression: {
                                                  type: 'UpdateExpression',
                                                  start: 217,
                                                  end: 221,
                                                  loc: {
                                                    start: {
                                                      line: 7,
                                                      column: 34
                                                    },
                                                    end: {
                                                      line: 7,
                                                      column: 38
                                                    }
                                                  },
                                                  operator: '++',
                                                  prefix: false,
                                                  argument: {
                                                    type: 'Identifier',
                                                    start: 217,
                                                    end: 219,
                                                    loc: {
                                                      start: {
                                                        line: 7,
                                                        column: 34
                                                      },
                                                      end: {
                                                        line: 7,
                                                        column: 36
                                                      }
                                                    },
                                                    name: 'xx'
                                                  }
                                                }
                                              },
                                              label: {
                                                type: 'Identifier',
                                                start: 199,
                                                end: 214,
                                                loc: {
                                                  start: {
                                                    line: 7,
                                                    column: 16
                                                  },
                                                  end: {
                                                    line: 7,
                                                    column: 31
                                                  }
                                                },
                                                name: 'LABEL_IN_NESTED'
                                              }
                                            },
                                            {
                                              type: 'IfStatement',
                                              start: 239,
                                              end: 257,
                                              loc: {
                                                start: {
                                                  line: 8,
                                                  column: 16
                                                },
                                                end: {
                                                  line: 8,
                                                  column: 34
                                                }
                                              },
                                              test: {
                                                type: 'BinaryExpression',
                                                start: 242,
                                                end: 249,
                                                loc: {
                                                  start: {
                                                    line: 8,
                                                    column: 19
                                                  },
                                                  end: {
                                                    line: 8,
                                                    column: 26
                                                  }
                                                },
                                                left: {
                                                  type: 'Identifier',
                                                  start: 242,
                                                  end: 244,
                                                  loc: {
                                                    start: {
                                                      line: 8,
                                                      column: 19
                                                    },
                                                    end: {
                                                      line: 8,
                                                      column: 21
                                                    }
                                                  },
                                                  name: 'xx'
                                                },
                                                operator: '===',
                                                right: {
                                                  type: 'Literal',
                                                  start: 247,
                                                  end: 249,
                                                  loc: {
                                                    start: {
                                                      line: 8,
                                                      column: 24
                                                    },
                                                    end: {
                                                      line: 8,
                                                      column: 26
                                                    }
                                                  },
                                                  value: 10,
                                                  raw: '10'
                                                }
                                              },
                                              consequent: {
                                                type: 'ReturnStatement',
                                                start: 250,
                                                end: 257,
                                                loc: {
                                                  start: {
                                                    line: 8,
                                                    column: 27
                                                  },
                                                  end: {
                                                    line: 8,
                                                    column: 34
                                                  }
                                                },
                                                argument: null
                                              },
                                              alternate: null
                                            },
                                            {
                                              type: 'BreakStatement',
                                              start: 274,
                                              end: 294,
                                              loc: {
                                                start: {
                                                  line: 9,
                                                  column: 16
                                                },
                                                end: {
                                                  line: 9,
                                                  column: 36
                                                }
                                              },
                                              label: {
                                                type: 'Identifier',
                                                start: 280,
                                                end: 293,
                                                loc: {
                                                  start: {
                                                    line: 9,
                                                    column: 22
                                                  },
                                                  end: {
                                                    line: 9,
                                                    column: 35
                                                  }
                                                },
                                                name: 'LABEL_DO_LOOP'
                                              }
                                            },
                                            {
                                              type: 'LabeledStatement',
                                              start: 311,
                                              end: 336,
                                              loc: {
                                                start: {
                                                  line: 10,
                                                  column: 16
                                                },
                                                end: {
                                                  line: 10,
                                                  column: 41
                                                }
                                              },
                                              body: {
                                                type: 'ExpressionStatement',
                                                start: 331,
                                                end: 336,
                                                loc: {
                                                  start: {
                                                    line: 10,
                                                    column: 36
                                                  },
                                                  end: {
                                                    line: 10,
                                                    column: 41
                                                  }
                                                },
                                                expression: {
                                                  type: 'UpdateExpression',
                                                  start: 331,
                                                  end: 335,
                                                  loc: {
                                                    start: {
                                                      line: 10,
                                                      column: 36
                                                    },
                                                    end: {
                                                      line: 10,
                                                      column: 40
                                                    }
                                                  },
                                                  operator: '++',
                                                  prefix: false,
                                                  argument: {
                                                    type: 'Identifier',
                                                    start: 331,
                                                    end: 333,
                                                    loc: {
                                                      start: {
                                                        line: 10,
                                                        column: 36
                                                      },
                                                      end: {
                                                        line: 10,
                                                        column: 38
                                                      }
                                                    },
                                                    name: 'yy'
                                                  }
                                                }
                                              },
                                              label: {
                                                type: 'Identifier',
                                                start: 311,
                                                end: 328,
                                                loc: {
                                                  start: {
                                                    line: 10,
                                                    column: 16
                                                  },
                                                  end: {
                                                    line: 10,
                                                    column: 33
                                                  }
                                                },
                                                name: 'LABEL_IN_NESTED_2'
                                              }
                                            }
                                          ]
                                        },
                                        test: {
                                          type: 'Literal',
                                          start: 358,
                                          end: 359,
                                          loc: {
                                            start: {
                                              line: 11,
                                              column: 21
                                            },
                                            end: {
                                              line: 11,
                                              column: 22
                                            }
                                          },
                                          value: 0,
                                          raw: '0'
                                        }
                                      },
                                      label: {
                                        type: 'Identifier',
                                        start: 158,
                                        end: 175,
                                        loc: {
                                          start: {
                                            line: 6,
                                            column: 12
                                          },
                                          end: {
                                            line: 6,
                                            column: 29
                                          }
                                        },
                                        name: 'LABEL_NESTED_LOOP'
                                      }
                                    },
                                    {
                                      type: 'LabeledStatement',
                                      start: 375,
                                      end: 392,
                                      loc: {
                                        start: {
                                          line: 13,
                                          column: 12
                                        },
                                        end: {
                                          line: 13,
                                          column: 29
                                        }
                                      },
                                      body: {
                                        type: 'ExpressionStatement',
                                        start: 388,
                                        end: 392,
                                        loc: {
                                          start: {
                                            line: 13,
                                            column: 25
                                          },
                                          end: {
                                            line: 13,
                                            column: 29
                                          }
                                        },
                                        expression: {
                                          type: 'UpdateExpression',
                                          start: 388,
                                          end: 391,
                                          loc: {
                                            start: {
                                              line: 13,
                                              column: 25
                                            },
                                            end: {
                                              line: 13,
                                              column: 28
                                            }
                                          },
                                          operator: '++',
                                          prefix: false,
                                          argument: {
                                            type: 'Identifier',
                                            start: 388,
                                            end: 389,
                                            loc: {
                                              start: {
                                                line: 13,
                                                column: 25
                                              },
                                              end: {
                                                line: 13,
                                                column: 26
                                              }
                                            },
                                            name: 'y'
                                          }
                                        }
                                      },
                                      label: {
                                        type: 'Identifier',
                                        start: 375,
                                        end: 385,
                                        loc: {
                                          start: {
                                            line: 13,
                                            column: 12
                                          },
                                          end: {
                                            line: 13,
                                            column: 22
                                          }
                                        },
                                        name: 'LABEL_IN_2'
                                      }
                                    },
                                    {
                                      type: 'FunctionDeclaration',
                                      start: 406,
                                      end: 429,
                                      loc: {
                                        start: {
                                          line: 15,
                                          column: 12
                                        },
                                        end: {
                                          line: 15,
                                          column: 35
                                        }
                                      },
                                      id: {
                                        type: 'Identifier',
                                        start: 415,
                                        end: 425,
                                        loc: {
                                          start: {
                                            line: 15,
                                            column: 21
                                          },
                                          end: {
                                            line: 15,
                                            column: 31
                                          }
                                        },
                                        name: 'IN_DO_FUNC'
                                      },
                                      generator: false,
                                      expression: false,
                                      async: false,
                                      params: [],
                                      body: {
                                        type: 'BlockStatement',
                                        start: 427,
                                        end: 429,
                                        loc: {
                                          start: {
                                            line: 15,
                                            column: 33
                                          },
                                          end: {
                                            line: 15,
                                            column: 35
                                          }
                                        },
                                        body: []
                                      }
                                    }
                                  ]
                                },
                                test: {
                                  type: 'Literal',
                                  start: 446,
                                  end: 447,
                                  loc: {
                                    start: {
                                      line: 16,
                                      column: 16
                                    },
                                    end: {
                                      line: 16,
                                      column: 17
                                    }
                                  },
                                  value: 0,
                                  raw: '0'
                                }
                              },
                              label: {
                                type: 'Identifier',
                                start: 67,
                                end: 80,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 8
                                  },
                                  end: {
                                    line: 3,
                                    column: 21
                                  }
                                },
                                name: 'LABEL_DO_LOOP'
                              }
                            },
                            {
                              type: 'LabeledStatement',
                              start: 459,
                              end: 518,
                              loc: {
                                start: {
                                  line: 18,
                                  column: 8
                                },
                                end: {
                                  line: 20,
                                  column: 19
                                }
                              },
                              body: {
                                type: 'DoWhileStatement',
                                start: 480,
                                end: 518,
                                loc: {
                                  start: {
                                    line: 18,
                                    column: 29
                                  },
                                  end: {
                                    line: 20,
                                    column: 19
                                  }
                                },
                                body: {
                                  type: 'BlockStatement',
                                  start: 483,
                                  end: 508,
                                  loc: {
                                    start: {
                                      line: 18,
                                      column: 32
                                    },
                                    end: {
                                      line: 20,
                                      column: 9
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'EmptyStatement',
                                      start: 497,
                                      end: 498,
                                      loc: {
                                        start: {
                                          line: 19,
                                          column: 12
                                        },
                                        end: {
                                          line: 19,
                                          column: 13
                                        }
                                      }
                                    }
                                  ]
                                },
                                test: {
                                  type: 'Literal',
                                  start: 515,
                                  end: 516,
                                  loc: {
                                    start: {
                                      line: 20,
                                      column: 16
                                    },
                                    end: {
                                      line: 20,
                                      column: 17
                                    }
                                  },
                                  value: 0,
                                  raw: '0'
                                }
                              },
                              label: {
                                type: 'Identifier',
                                start: 459,
                                end: 477,
                                loc: {
                                  start: {
                                    line: 18,
                                    column: 8
                                  },
                                  end: {
                                    line: 18,
                                    column: 26
                                  }
                                },
                                name: 'LABEL_ANOTHER_LOOP'
                              }
                            },
                            {
                              type: 'FunctionDeclaration',
                              start: 528,
                              end: 549,
                              loc: {
                                start: {
                                  line: 22,
                                  column: 8
                                },
                                end: {
                                  line: 22,
                                  column: 29
                                }
                              },
                              id: {
                                type: 'Identifier',
                                start: 537,
                                end: 545,
                                loc: {
                                  start: {
                                    line: 22,
                                    column: 17
                                  },
                                  end: {
                                    line: 22,
                                    column: 25
                                  }
                                },
                                name: 'OUT_FUNC'
                              },
                              generator: false,
                              expression: false,
                              async: false,
                              params: [],
                              body: {
                                type: 'BlockStatement',
                                start: 547,
                                end: 549,
                                loc: {
                                  start: {
                                    line: 22,
                                    column: 27
                                  },
                                  end: {
                                    line: 22,
                                    column: 29
                                  }
                                },
                                body: []
                              }
                            }
                          ]
                        }
                      },
                      arguments: []
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`LABEL_OUT : var x=0, y=0, xx=0, yy=0;
(function(){
LABEL_DO_LOOP : do {
    LABEL_IN : x++;
    if(x===10)return;
    LABEL_NESTED_LOOP : do {
        LABEL_IN_NESTED : xx++;
        if(xx===10)return;
        break LABEL_NESTED_LOOP;
        LABEL_IN_NESTED_2 : yy++;
    } while (0);

    LABEL_IN_2 : y++;

    function IN_DO_FUNC(){}
} while(0);

LABEL_ANOTHER_LOOP : do {
    ;
} while(0);

function OUT_FUNC(){}
})();`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `LABEL_OUT : var x=0, y=0, xx=0, yy=0;
        (function(){
        LABEL_DO_LOOP : do {
            LABEL_IN : x++;
            if(x===10)return;
            LABEL_NESTED_LOOP : do {
                LABEL_IN_NESTED : xx++;
                if(xx===10)return;
                break LABEL_NESTED_LOOP;
                LABEL_IN_NESTED_2 : yy++;
            } while (0);

            LABEL_IN_2 : y++;

            function IN_DO_FUNC(){}
        } while(0);

        LABEL_ANOTHER_LOOP : do {
            ;
        } while(0);

        function OUT_FUNC(){}
        })();`,
            expected: {
                type: 'Program',
                start: 0,
                end: 567,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 23,
                    column: 13
                  }
                },
                body: [
                  {
                    type: 'LabeledStatement',
                    start: 0,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    },
                    body: {
                      type: 'VariableDeclaration',
                      start: 12,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      },
                      declarations: [
                        {
                          type: 'VariableDeclarator',
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
                          id: {
                            type: 'Identifier',
                            start: 16,
                            end: 17,
                            loc: {
                              start: {
                                line: 1,
                                column: 16
                              },
                              end: {
                                line: 1,
                                column: 17
                              }
                            },
                            name: 'x'
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
                            value: 0,
                            raw: '0'
                          }
                        },
                        {
                          type: 'VariableDeclarator',
                          start: 21,
                          end: 24,
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 24
                            }
                          },
                          id: {
                            type: 'Identifier',
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
                            },
                            name: 'y'
                          },
                          init: {
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
                        },
                        {
                          type: 'VariableDeclarator',
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
                          id: {
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
                            name: 'xx'
                          },
                          init: {
                            type: 'Literal',
                            start: 29,
                            end: 30,
                            loc: {
                              start: {
                                line: 1,
                                column: 29
                              },
                              end: {
                                line: 1,
                                column: 30
                              }
                            },
                            value: 0,
                            raw: '0'
                          }
                        },
                        {
                          type: 'VariableDeclarator',
                          start: 32,
                          end: 36,
                          loc: {
                            start: {
                              line: 1,
                              column: 32
                            },
                            end: {
                              line: 1,
                              column: 36
                            }
                          },
                          id: {
                            type: 'Identifier',
                            start: 32,
                            end: 34,
                            loc: {
                              start: {
                                line: 1,
                                column: 32
                              },
                              end: {
                                line: 1,
                                column: 34
                              }
                            },
                            name: 'yy'
                          },
                          init: {
                            type: 'Literal',
                            start: 35,
                            end: 36,
                            loc: {
                              start: {
                                line: 1,
                                column: 35
                              },
                              end: {
                                line: 1,
                                column: 36
                              }
                            },
                            value: 0,
                            raw: '0'
                          }
                        }
                      ],
                      kind: 'var'
                    },
                    label: {
                      type: 'Identifier',
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
                      name: 'LABEL_OUT'
                    }
                  },
                  {
                    type: 'ExpressionStatement',
                    start: 46,
                    end: 567,
                    loc: {
                      start: {
                        line: 2,
                        column: 8
                      },
                      end: {
                        line: 23,
                        column: 13
                      }
                    },
                    expression: {
                      type: 'CallExpression',
                      start: 46,
                      end: 566,
                      loc: {
                        start: {
                          line: 2,
                          column: 8
                        },
                        end: {
                          line: 23,
                          column: 12
                        }
                      },
                      callee: {
                        type: 'FunctionExpression',
                        start: 47,
                        end: 563,
                        loc: {
                          start: {
                            line: 2,
                            column: 9
                          },
                          end: {
                            line: 23,
                            column: 9
                          }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          start: 57,
                          end: 563,
                          loc: {
                            start: {
                              line: 2,
                              column: 19
                            },
                            end: {
                              line: 23,
                              column: 9
                            }
                          },
                          body: [
                            {
                              type: 'LabeledStatement',
                              start: 67,
                              end: 453,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 8
                                },
                                end: {
                                  line: 16,
                                  column: 19
                                }
                              },
                              body: {
                                type: 'DoWhileStatement',
                                start: 83,
                                end: 453,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 24
                                  },
                                  end: {
                                    line: 16,
                                    column: 19
                                  }
                                },
                                body: {
                                  type: 'BlockStatement',
                                  start: 86,
                                  end: 443,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 27
                                    },
                                    end: {
                                      line: 16,
                                      column: 9
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'LabeledStatement',
                                      start: 100,
                                      end: 115,
                                      loc: {
                                        start: {
                                          line: 4,
                                          column: 12
                                        },
                                        end: {
                                          line: 4,
                                          column: 27
                                        }
                                      },
                                      body: {
                                        type: 'ExpressionStatement',
                                        start: 111,
                                        end: 115,
                                        loc: {
                                          start: {
                                            line: 4,
                                            column: 23
                                          },
                                          end: {
                                            line: 4,
                                            column: 27
                                          }
                                        },
                                        expression: {
                                          type: 'UpdateExpression',
                                          start: 111,
                                          end: 114,
                                          loc: {
                                            start: {
                                              line: 4,
                                              column: 23
                                            },
                                            end: {
                                              line: 4,
                                              column: 26
                                            }
                                          },
                                          operator: '++',
                                          prefix: false,
                                          argument: {
                                            type: 'Identifier',
                                            start: 111,
                                            end: 112,
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
                                            name: 'x'
                                          }
                                        }
                                      },
                                      label: {
                                        type: 'Identifier',
                                        start: 100,
                                        end: 108,
                                        loc: {
                                          start: {
                                            line: 4,
                                            column: 12
                                          },
                                          end: {
                                            line: 4,
                                            column: 20
                                          }
                                        },
                                        name: 'LABEL_IN'
                                      }
                                    },
                                    {
                                      type: 'IfStatement',
                                      start: 128,
                                      end: 145,
                                      loc: {
                                        start: {
                                          line: 5,
                                          column: 12
                                        },
                                        end: {
                                          line: 5,
                                          column: 29
                                        }
                                      },
                                      test: {
                                        type: 'BinaryExpression',
                                        start: 131,
                                        end: 137,
                                        loc: {
                                          start: {
                                            line: 5,
                                            column: 15
                                          },
                                          end: {
                                            line: 5,
                                            column: 21
                                          }
                                        },
                                        left: {
                                          type: 'Identifier',
                                          start: 131,
                                          end: 132,
                                          loc: {
                                            start: {
                                              line: 5,
                                              column: 15
                                            },
                                            end: {
                                              line: 5,
                                              column: 16
                                            }
                                          },
                                          name: 'x'
                                        },
                                        operator: '===',
                                        right: {
                                          type: 'Literal',
                                          start: 135,
                                          end: 137,
                                          loc: {
                                            start: {
                                              line: 5,
                                              column: 19
                                            },
                                            end: {
                                              line: 5,
                                              column: 21
                                            }
                                          },
                                          value: 10,
                                          raw: '10'
                                        }
                                      },
                                      consequent: {
                                        type: 'ReturnStatement',
                                        start: 138,
                                        end: 145,
                                        loc: {
                                          start: {
                                            line: 5,
                                            column: 22
                                          },
                                          end: {
                                            line: 5,
                                            column: 29
                                          }
                                        },
                                        argument: null
                                      },
                                      alternate: null
                                    },
                                    {
                                      type: 'LabeledStatement',
                                      start: 158,
                                      end: 365,
                                      loc: {
                                        start: {
                                          line: 6,
                                          column: 12
                                        },
                                        end: {
                                          line: 11,
                                          column: 24
                                        }
                                      },
                                      body: {
                                        type: 'DoWhileStatement',
                                        start: 178,
                                        end: 365,
                                        loc: {
                                          start: {
                                            line: 6,
                                            column: 32
                                          },
                                          end: {
                                            line: 11,
                                            column: 24
                                          }
                                        },
                                        body: {
                                          type: 'BlockStatement',
                                          start: 181,
                                          end: 354,
                                          loc: {
                                            start: {
                                              line: 6,
                                              column: 35
                                            },
                                            end: {
                                              line: 11,
                                              column: 13
                                            }
                                          },
                                          body: [
                                            {
                                              type: 'LabeledStatement',
                                              start: 199,
                                              end: 222,
                                              loc: {
                                                start: {
                                                  line: 7,
                                                  column: 16
                                                },
                                                end: {
                                                  line: 7,
                                                  column: 39
                                                }
                                              },
                                              body: {
                                                type: 'ExpressionStatement',
                                                start: 217,
                                                end: 222,
                                                loc: {
                                                  start: {
                                                    line: 7,
                                                    column: 34
                                                  },
                                                  end: {
                                                    line: 7,
                                                    column: 39
                                                  }
                                                },
                                                expression: {
                                                  type: 'UpdateExpression',
                                                  start: 217,
                                                  end: 221,
                                                  loc: {
                                                    start: {
                                                      line: 7,
                                                      column: 34
                                                    },
                                                    end: {
                                                      line: 7,
                                                      column: 38
                                                    }
                                                  },
                                                  operator: '++',
                                                  prefix: false,
                                                  argument: {
                                                    type: 'Identifier',
                                                    start: 217,
                                                    end: 219,
                                                    loc: {
                                                      start: {
                                                        line: 7,
                                                        column: 34
                                                      },
                                                      end: {
                                                        line: 7,
                                                        column: 36
                                                      }
                                                    },
                                                    name: 'xx'
                                                  }
                                                }
                                              },
                                              label: {
                                                type: 'Identifier',
                                                start: 199,
                                                end: 214,
                                                loc: {
                                                  start: {
                                                    line: 7,
                                                    column: 16
                                                  },
                                                  end: {
                                                    line: 7,
                                                    column: 31
                                                  }
                                                },
                                                name: 'LABEL_IN_NESTED'
                                              }
                                            },
                                            {
                                              type: 'IfStatement',
                                              start: 239,
                                              end: 257,
                                              loc: {
                                                start: {
                                                  line: 8,
                                                  column: 16
                                                },
                                                end: {
                                                  line: 8,
                                                  column: 34
                                                }
                                              },
                                              test: {
                                                type: 'BinaryExpression',
                                                start: 242,
                                                end: 249,
                                                loc: {
                                                  start: {
                                                    line: 8,
                                                    column: 19
                                                  },
                                                  end: {
                                                    line: 8,
                                                    column: 26
                                                  }
                                                },
                                                left: {
                                                  type: 'Identifier',
                                                  start: 242,
                                                  end: 244,
                                                  loc: {
                                                    start: {
                                                      line: 8,
                                                      column: 19
                                                    },
                                                    end: {
                                                      line: 8,
                                                      column: 21
                                                    }
                                                  },
                                                  name: 'xx'
                                                },
                                                operator: '===',
                                                right: {
                                                  type: 'Literal',
                                                  start: 247,
                                                  end: 249,
                                                  loc: {
                                                    start: {
                                                      line: 8,
                                                      column: 24
                                                    },
                                                    end: {
                                                      line: 8,
                                                      column: 26
                                                    }
                                                  },
                                                  value: 10,
                                                  raw: '10'
                                                }
                                              },
                                              consequent: {
                                                type: 'ReturnStatement',
                                                start: 250,
                                                end: 257,
                                                loc: {
                                                  start: {
                                                    line: 8,
                                                    column: 27
                                                  },
                                                  end: {
                                                    line: 8,
                                                    column: 34
                                                  }
                                                },
                                                argument: null
                                              },
                                              alternate: null
                                            },
                                            {
                                              type: 'BreakStatement',
                                              start: 274,
                                              end: 298,
                                              loc: {
                                                start: {
                                                  line: 9,
                                                  column: 16
                                                },
                                                end: {
                                                  line: 9,
                                                  column: 40
                                                }
                                              },
                                              label: {
                                                type: 'Identifier',
                                                start: 280,
                                                end: 297,
                                                loc: {
                                                  start: {
                                                    line: 9,
                                                    column: 22
                                                  },
                                                  end: {
                                                    line: 9,
                                                    column: 39
                                                  }
                                                },
                                                name: 'LABEL_NESTED_LOOP'
                                              }
                                            },
                                            {
                                              type: 'LabeledStatement',
                                              start: 315,
                                              end: 340,
                                              loc: {
                                                start: {
                                                  line: 10,
                                                  column: 16
                                                },
                                                end: {
                                                  line: 10,
                                                  column: 41
                                                }
                                              },
                                              body: {
                                                type: 'ExpressionStatement',
                                                start: 335,
                                                end: 340,
                                                loc: {
                                                  start: {
                                                    line: 10,
                                                    column: 36
                                                  },
                                                  end: {
                                                    line: 10,
                                                    column: 41
                                                  }
                                                },
                                                expression: {
                                                  type: 'UpdateExpression',
                                                  start: 335,
                                                  end: 339,
                                                  loc: {
                                                    start: {
                                                      line: 10,
                                                      column: 36
                                                    },
                                                    end: {
                                                      line: 10,
                                                      column: 40
                                                    }
                                                  },
                                                  operator: '++',
                                                  prefix: false,
                                                  argument: {
                                                    type: 'Identifier',
                                                    start: 335,
                                                    end: 337,
                                                    loc: {
                                                      start: {
                                                        line: 10,
                                                        column: 36
                                                      },
                                                      end: {
                                                        line: 10,
                                                        column: 38
                                                      }
                                                    },
                                                    name: 'yy'
                                                  }
                                                }
                                              },
                                              label: {
                                                type: 'Identifier',
                                                start: 315,
                                                end: 332,
                                                loc: {
                                                  start: {
                                                    line: 10,
                                                    column: 16
                                                  },
                                                  end: {
                                                    line: 10,
                                                    column: 33
                                                  }
                                                },
                                                name: 'LABEL_IN_NESTED_2'
                                              }
                                            }
                                          ]
                                        },
                                        test: {
                                          type: 'Literal',
                                          start: 362,
                                          end: 363,
                                          loc: {
                                            start: {
                                              line: 11,
                                              column: 21
                                            },
                                            end: {
                                              line: 11,
                                              column: 22
                                            }
                                          },
                                          value: 0,
                                          raw: '0'
                                        }
                                      },
                                      label: {
                                        type: 'Identifier',
                                        start: 158,
                                        end: 175,
                                        loc: {
                                          start: {
                                            line: 6,
                                            column: 12
                                          },
                                          end: {
                                            line: 6,
                                            column: 29
                                          }
                                        },
                                        name: 'LABEL_NESTED_LOOP'
                                      }
                                    },
                                    {
                                      type: 'LabeledStatement',
                                      start: 379,
                                      end: 396,
                                      loc: {
                                        start: {
                                          line: 13,
                                          column: 12
                                        },
                                        end: {
                                          line: 13,
                                          column: 29
                                        }
                                      },
                                      body: {
                                        type: 'ExpressionStatement',
                                        start: 392,
                                        end: 396,
                                        loc: {
                                          start: {
                                            line: 13,
                                            column: 25
                                          },
                                          end: {
                                            line: 13,
                                            column: 29
                                          }
                                        },
                                        expression: {
                                          type: 'UpdateExpression',
                                          start: 392,
                                          end: 395,
                                          loc: {
                                            start: {
                                              line: 13,
                                              column: 25
                                            },
                                            end: {
                                              line: 13,
                                              column: 28
                                            }
                                          },
                                          operator: '++',
                                          prefix: false,
                                          argument: {
                                            type: 'Identifier',
                                            start: 392,
                                            end: 393,
                                            loc: {
                                              start: {
                                                line: 13,
                                                column: 25
                                              },
                                              end: {
                                                line: 13,
                                                column: 26
                                              }
                                            },
                                            name: 'y'
                                          }
                                        }
                                      },
                                      label: {
                                        type: 'Identifier',
                                        start: 379,
                                        end: 389,
                                        loc: {
                                          start: {
                                            line: 13,
                                            column: 12
                                          },
                                          end: {
                                            line: 13,
                                            column: 22
                                          }
                                        },
                                        name: 'LABEL_IN_2'
                                      }
                                    },
                                    {
                                      type: 'FunctionDeclaration',
                                      start: 410,
                                      end: 433,
                                      loc: {
                                        start: {
                                          line: 15,
                                          column: 12
                                        },
                                        end: {
                                          line: 15,
                                          column: 35
                                        }
                                      },
                                      id: {
                                        type: 'Identifier',
                                        start: 419,
                                        end: 429,
                                        loc: {
                                          start: {
                                            line: 15,
                                            column: 21
                                          },
                                          end: {
                                            line: 15,
                                            column: 31
                                          }
                                        },
                                        name: 'IN_DO_FUNC'
                                      },
                                      generator: false,
                                      expression: false,
                                      async: false,
                                      params: [],
                                      body: {
                                        type: 'BlockStatement',
                                        start: 431,
                                        end: 433,
                                        loc: {
                                          start: {
                                            line: 15,
                                            column: 33
                                          },
                                          end: {
                                            line: 15,
                                            column: 35
                                          }
                                        },
                                        body: []
                                      }
                                    }
                                  ]
                                },
                                test: {
                                  type: 'Literal',
                                  start: 450,
                                  end: 451,
                                  loc: {
                                    start: {
                                      line: 16,
                                      column: 16
                                    },
                                    end: {
                                      line: 16,
                                      column: 17
                                    }
                                  },
                                  value: 0,
                                  raw: '0'
                                }
                              },
                              label: {
                                type: 'Identifier',
                                start: 67,
                                end: 80,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 8
                                  },
                                  end: {
                                    line: 3,
                                    column: 21
                                  }
                                },
                                name: 'LABEL_DO_LOOP'
                              }
                            },
                            {
                              type: 'LabeledStatement',
                              start: 463,
                              end: 522,
                              loc: {
                                start: {
                                  line: 18,
                                  column: 8
                                },
                                end: {
                                  line: 20,
                                  column: 19
                                }
                              },
                              body: {
                                type: 'DoWhileStatement',
                                start: 484,
                                end: 522,
                                loc: {
                                  start: {
                                    line: 18,
                                    column: 29
                                  },
                                  end: {
                                    line: 20,
                                    column: 19
                                  }
                                },
                                body: {
                                  type: 'BlockStatement',
                                  start: 487,
                                  end: 512,
                                  loc: {
                                    start: {
                                      line: 18,
                                      column: 32
                                    },
                                    end: {
                                      line: 20,
                                      column: 9
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'EmptyStatement',
                                      start: 501,
                                      end: 502,
                                      loc: {
                                        start: {
                                          line: 19,
                                          column: 12
                                        },
                                        end: {
                                          line: 19,
                                          column: 13
                                        }
                                      }
                                    }
                                  ]
                                },
                                test: {
                                  type: 'Literal',
                                  start: 519,
                                  end: 520,
                                  loc: {
                                    start: {
                                      line: 20,
                                      column: 16
                                    },
                                    end: {
                                      line: 20,
                                      column: 17
                                    }
                                  },
                                  value: 0,
                                  raw: '0'
                                }
                              },
                              label: {
                                type: 'Identifier',
                                start: 463,
                                end: 481,
                                loc: {
                                  start: {
                                    line: 18,
                                    column: 8
                                  },
                                  end: {
                                    line: 18,
                                    column: 26
                                  }
                                },
                                name: 'LABEL_ANOTHER_LOOP'
                              }
                            },
                            {
                              type: 'FunctionDeclaration',
                              start: 532,
                              end: 553,
                              loc: {
                                start: {
                                  line: 22,
                                  column: 8
                                },
                                end: {
                                  line: 22,
                                  column: 29
                                }
                              },
                              id: {
                                type: 'Identifier',
                                start: 541,
                                end: 549,
                                loc: {
                                  start: {
                                    line: 22,
                                    column: 17
                                  },
                                  end: {
                                    line: 22,
                                    column: 25
                                  }
                                },
                                name: 'OUT_FUNC'
                              },
                              generator: false,
                              expression: false,
                              async: false,
                              params: [],
                              body: {
                                type: 'BlockStatement',
                                start: 551,
                                end: 553,
                                loc: {
                                  start: {
                                    line: 22,
                                    column: 27
                                  },
                                  end: {
                                    line: 22,
                                    column: 29
                                  }
                                },
                                body: []
                              }
                            }
                          ]
                        }
                      },
                      arguments: []
                    }
                  }
                ],
                sourceType: 'script'
              }
        });
        pass(`
  loop:
  while (true) {
    switch (1) {
      case janie: continue;
      default:
        break loop;
    }
  }
`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `loop:
    while (true) {
      switch (1) {
        case janie: continue;
        default:
          break loop;
      }
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
                    line: 8,
                    column: 5
                  }
                },
                body: [
                  {
                    type: 'LabeledStatement',
                    start: 0,
                    end: 126,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 8,
                        column: 5
                      }
                    },
                    body: {
                      type: 'WhileStatement',
                      start: 10,
                      end: 126,
                      loc: {
                        start: {
                          line: 2,
                          column: 4
                        },
                        end: {
                          line: 8,
                          column: 5
                        }
                      },
                      test: {
                        type: 'Literal',
                        start: 17,
                        end: 21,
                        loc: {
                          start: {
                            line: 2,
                            column: 11
                          },
                          end: {
                            line: 2,
                            column: 15
                          }
                        },
                        value: true,
                        raw: 'true'
                      },
                      body: {
                        type: 'BlockStatement',
                        start: 23,
                        end: 126,
                        loc: {
                          start: {
                            line: 2,
                            column: 17
                          },
                          end: {
                            line: 8,
                            column: 5
                          }
                        },
                        body: [
                          {
                            type: 'SwitchStatement',
                            start: 31,
                            end: 120,
                            loc: {
                              start: {
                                line: 3,
                                column: 6
                              },
                              end: {
                                line: 7,
                                column: 7
                              }
                            },
                            discriminant: {
                              type: 'Literal',
                              start: 39,
                              end: 40,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 14
                                },
                                end: {
                                  line: 3,
                                  column: 15
                                }
                              },
                              value: 1,
                              raw: '1'
                            },
                            cases: [
                              {
                                type: 'SwitchCase',
                                start: 52,
                                end: 73,
                                loc: {
                                  start: {
                                    line: 4,
                                    column: 8
                                  },
                                  end: {
                                    line: 4,
                                    column: 29
                                  }
                                },
                                consequent: [
                                  {
                                    type: 'ContinueStatement',
                                    start: 64,
                                    end: 73,
                                    loc: {
                                      start: {
                                        line: 4,
                                        column: 20
                                      },
                                      end: {
                                        line: 4,
                                        column: 29
                                      }
                                    },
                                    label: null
                                  }
                                ],
                                test: {
                                  type: 'Identifier',
                                  start: 57,
                                  end: 62,
                                  loc: {
                                    start: {
                                      line: 4,
                                      column: 13
                                    },
                                    end: {
                                      line: 4,
                                      column: 18
                                    }
                                  },
                                  name: 'janie'
                                }
                              },
                              {
                                type: 'SwitchCase',
                                start: 82,
                                end: 112,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 8
                                  },
                                  end: {
                                    line: 6,
                                    column: 21
                                  }
                                },
                                consequent: [
                                  {
                                    type: 'BreakStatement',
                                    start: 101,
                                    end: 112,
                                    loc: {
                                      start: {
                                        line: 6,
                                        column: 10
                                      },
                                      end: {
                                        line: 6,
                                        column: 21
                                      }
                                    },
                                    label: {
                                      type: 'Identifier',
                                      start: 107,
                                      end: 111,
                                      loc: {
                                        start: {
                                          line: 6,
                                          column: 16
                                        },
                                        end: {
                                          line: 6,
                                          column: 20
                                        }
                                      },
                                      name: 'loop'
                                    }
                                  }
                                ],
                                test: null
                              }
                            ]
                          }
                        ]
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
                      name: 'loop'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`while (true) { break }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `while (true) { break }`,
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
                body: [{
                    type: 'WhileStatement',
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
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        },
                        body: [{
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
                        }]
                    }
                }],
                sourceType: 'script'
            }

        });

        pass(`done: while (true) { break done }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `done: while (true) { break done }`,
      expected: {
        type: 'Program',
        start: 0,
        end: 33,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 33
          }
        },
        body: [
          {
            type: 'LabeledStatement',
            start: 0,
            end: 33,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 33
              }
            },
            body: {
              type: 'WhileStatement',
              start: 6,
              end: 33,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 33
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
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 33
                  }
                },
                body: [
                  {
                    type: 'BreakStatement',
                    start: 21,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    },
                    label: {
                      type: 'Identifier',
                      start: 27,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      },
                      name: 'done'
                    }
                  }
                ]
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
          }
        ],
        sourceType: 'script'
      }

  });

        pass(`__proto__: while (true) { break __proto__; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `__proto__: while (true) { break __proto__; }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 44,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 44
                    }
                },
                body: [{
                    type: 'LabeledStatement',
                    start: 0,
                    end: 44,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 44
                        }
                    },
                    body: {
                        type: 'WhileStatement',
                        start: 11,
                        end: 44,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 44
                            }
                        },
                        test: {
                            type: 'Literal',
                            start: 18,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            },
                            value: true,
                            raw: 'true'
                        },
                        body: {
                            type: 'BlockStatement',
                            start: 24,
                            end: 44,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 24
                                },
                                end: {
                                    line: 1,
                                    column: 44
                                }
                            },
                            body: [{
                                type: 'BreakStatement',
                                start: 26,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 26
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                },
                                label: {
                                    type: 'Identifier',
                                    start: 32,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 32
                                        },
                                        end: {
                                            line: 1,
                                            column: 41
                                        }
                                    },
                                    name: '__proto__'
                                }
                            }]
                        }
                    },
                    label: {
                        type: 'Identifier',
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
                        name: '__proto__'
                    }
                }],
                sourceType: 'script'
            }

        });

        pass(`done: while (true) { break done; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `done: while (true) { break done; }`,
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
                body: [{
                    type: 'LabeledStatement',
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
                    body: {
                        type: 'WhileStatement',
                        start: 6,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 34
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
                            end: 34,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 34
                                }
                            },
                            body: [{
                                type: 'BreakStatement',
                                start: 21,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                },
                                label: {
                                    type: 'Identifier',
                                    start: 27,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
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
    });
});
