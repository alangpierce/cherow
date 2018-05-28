import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Statements - Try', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

    const invalidSyntax: any = [
        'try { }',
        'try { } foo();',
        'try { } catch (e) foo();',
        'try { } finally foo();',
        `try{}
        catch(){`,
        `try{}
        catch(){
        finally{}`,
        `catch(){}
            finally{}`,
        `catch`,
        `try{
        }
        finally(e){}`,
        `try
        {
        }
        catch("22")
        {
        }`,
        `try
        {
          try
          {
          }
        }
        catch(e1){}
        catch(e2){}`,
        `try{
            {
            }
            catch(e){}
            finally{}
          }`,
          `try{}
          catch(){}
          finally{}`,
          `try`,
          `try { throw []; } catch ([...[ x ] = []]) {}`,
          `try { throw []; } catch ([...x = []]) {}`,
          `try { throw [1, 2, 3]; } catch ([...{ x }, y]) {}`,
          `try { throw [1, 2, 3]; } catch ([...[x], y]) { }`
    ];

    for (const arg of invalidSyntax) {
        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });

        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
    }

    fail('try { } catch (e) foo();', Context.Empty, {
          source: 'try { } catch (e) foo();',
      });

    fail('try {} catch ((e)) {}', Context.Empty, {
          source: 'try {} catch ((e)) {}',
      });

    fail('try { } catch (e) foo();', Context.Empty, {
          source: 'try { } catch (e) foo();',
      });

    fail('try { } foo();', Context.Empty, {
          source: 'try { } foo();',
      });
  });

  describe('Pass', () => {

    pass(`try { throw null; } catch (f) {if (false) ; else function f() { return 123; }}`, Context.OptionsRanges, {
        source: `try { throw null; } catch (f) {if (false) ; else function f() { return 123; }}`,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ThrowStatement',
                                argument: {
                                    type: 'Literal',
                                    value: null,
                                    start: 12,
                                    end: 16
                                },
                                start: 6,
                                end: 17
                            }
                        ],
                        start: 4,
                        end: 19
                    },
                    handler: {
                        type: 'CatchClause',
                        param: {
                            type: 'Identifier',
                            name: 'f',
                            start: 27,
                            end: 28
                        },
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'IfStatement',
                                    test: {
                                        type: 'Literal',
                                        value: false,
                                        start: 35,
                                        end: 40
                                    },
                                    consequent: {
                                        type: 'EmptyStatement',
                                        start: 42,
                                        end: 43
                                    },
                                    alternate: {
                                        type: 'FunctionDeclaration',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'Literal',
                                                        value: 123,
                                                        start: 71,
                                                        end: 74
                                                    },
                                                    start: 64,
                                                    end: 75
                                                }
                                            ],
                                            start: 62,
                                            end: 77
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: {
                                            type: 'Identifier',
                                            name: 'f',
                                            start: 58,
                                            end: 59
                                        },
                                        start: 49,
                                        end: 77
                                    },
                                    start: 31,
                                    end: 77
                                }
                            ],
                            start: 30,
                            end: 78
                        },
                        start: 20,
                        end: 78
                    },
                    finalizer: null,
                    start: 0,
                    end: 78
                }
            ],
            start: 0,
            end: 78
        }
    });

    pass(`try { throw {}; } catch ({ arrow = () => {} }) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `try { throw {}; } catch ({ arrow = () => {} }) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 49,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 49
                  }
              },
              body: [{
                  type: 'TryStatement',
                  start: 0,
                  end: 49,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 49
                      }
                  },
                  block: {
                      type: 'BlockStatement',
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
                      body: [{
                          type: 'ThrowStatement',
                          start: 6,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 6
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          argument: {
                              type: 'ObjectExpression',
                              start: 12,
                              end: 14,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 14
                                  }
                              },
                              properties: []
                          }
                      }]
                  },
                  handler: {
                      type: 'CatchClause',
                      start: 18,
                      end: 49,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 49
                          }
                      },
                      param: {
                          type: 'ObjectPattern',
                          start: 25,
                          end: 45,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 25
                              },
                              end: {
                                  line: 1,
                                  column: 45
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 27,
                              end: 43,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 27
                                  },
                                  end: {
                                      line: 1,
                                      column: 43
                                  }
                              },
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 27,
                                  end: 32,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 27
                                      },
                                      end: {
                                          line: 1,
                                          column: 32
                                      }
                                  },
                                  name: 'arrow'
                              },
                              kind: 'init',
                              value: {
                                  type: 'AssignmentPattern',
                                  start: 27,
                                  end: 43,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 27
                                      },
                                      end: {
                                          line: 1,
                                          column: 43
                                      }
                                  },
                                  left: {
                                      type: 'Identifier',
                                      start: 27,
                                      end: 32,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 27
                                          },
                                          end: {
                                              line: 1,
                                              column: 32
                                          }
                                      },
                                      name: 'arrow'
                                  },
                                  right: {
                                      type: 'ArrowFunctionExpression',
                                      start: 35,
                                      end: 43,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 35
                                          },
                                          end: {
                                              line: 1,
                                              column: 43
                                          }
                                      },
                                      id: null,
                                      generator: false,
                                      expression: false,
                                      async: false,
                                      params: [],
                                      body: {
                                          type: 'BlockStatement',
                                          start: 41,
                                          end: 43,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 41
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 43
                                              }
                                          },
                                          body: []
                                      }
                                  }
                              }
                          }]
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 47,
                          end: 49,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 47
                              },
                              end: {
                                  line: 1,
                                  column: 49
                              }
                          },
                          body: []
                      }
                  },
                  finalizer: null
              }],
              sourceType: 'script'
          }
      });

    pass(`try { throw null; } catch ({}) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `try { throw null; } catch ({}) {}`,
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
              body: [{
                  type: 'TryStatement',
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
                  block: {
                      type: 'BlockStatement',
                      start: 4,
                      end: 19,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 19
                          }
                      },
                      body: [{
                          type: 'ThrowStatement',
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
                          argument: {
                              type: 'Literal',
                              start: 12,
                              end: 16,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 16
                                  }
                              },
                              value: null,
                              raw: 'null'
                          }
                      }]
                  },
                  handler: {
                      type: 'CatchClause',
                      start: 20,
                      end: 33,
                      loc: {
                          start: {
                              line: 1,
                              column: 20
                          },
                          end: {
                              line: 1,
                              column: 33
                          }
                      },
                      param: {
                          type: 'ObjectPattern',
                          start: 27,
                          end: 29,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 27
                              },
                              end: {
                                  line: 1,
                                  column: 29
                              }
                          },
                          properties: []
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 31,
                          end: 33,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 31
                              },
                              end: {
                                  line: 1,
                                  column: 33
                              }
                          },
                          body: []
                      }
                  },
                  finalizer: null
              }],
              sourceType: 'script'
          }
      });

    pass(`try { throw [1, 2, 3]; } catch ([...x]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `try { throw [1, 2, 3]; } catch ([...x]) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 42,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 42
                  }
              },
              body: [{
                  type: 'TryStatement',
                  start: 0,
                  end: 42,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 42
                      }
                  },
                  block: {
                      type: 'BlockStatement',
                      start: 4,
                      end: 24,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 24
                          }
                      },
                      body: [{
                          type: 'ThrowStatement',
                          start: 6,
                          end: 22,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 6
                              },
                              end: {
                                  line: 1,
                                  column: 22
                              }
                          },
                          argument: {
                              type: 'ArrayExpression',
                              start: 12,
                              end: 21,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 21
                                  }
                              },
                              elements: [{
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
                                      value: 1,
                                      raw: '1'
                                  },
                                  {
                                      type: 'Literal',
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
                                      value: 2,
                                      raw: '2'
                                  },
                                  {
                                      type: 'Literal',
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
                                      },
                                      value: 3,
                                      raw: '3'
                                  }
                              ]
                          }
                      }]
                  },
                  handler: {
                      type: 'CatchClause',
                      start: 25,
                      end: 42,
                      loc: {
                          start: {
                              line: 1,
                              column: 25
                          },
                          end: {
                              line: 1,
                              column: 42
                          }
                      },
                      param: {
                          type: 'ArrayPattern',
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
                          elements: [{
                              type: 'RestElement',
                              start: 33,
                              end: 37,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 33
                                  },
                                  end: {
                                      line: 1,
                                      column: 37
                                  }
                              },
                              argument: {
                                  type: 'Identifier',
                                  start: 36,
                                  end: 37,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 36
                                      },
                                      end: {
                                          line: 1,
                                          column: 37
                                      }
                                  },
                                  name: 'x'
                              }
                          }]
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 40,
                          end: 42,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 40
                              },
                              end: {
                                  line: 1,
                                  column: 42
                              }
                          },
                          body: []
                      }
                  },
                  finalizer: null
              }],
              sourceType: 'script'
          }
      });

    pass(`try{}catch(a){}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `try{}catch(a){}`,
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
                  type: 'TryStatement',
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
                  block: {
                      type: 'BlockStatement',
                      start: 3,
                      end: 5,
                      loc: {
                          start: {
                              line: 1,
                              column: 3
                          },
                          end: {
                              line: 1,
                              column: 5
                          }
                      },
                      body: []
                  },
                  handler: {
                      type: 'CatchClause',
                      start: 5,
                      end: 15,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 15
                          }
                      },
                      param: {
                          type: 'Identifier',
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
                          name: 'a'
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 13,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 13
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          body: []
                      }
                  },
                  finalizer: null
              }],
              sourceType: 'script'
          }
      });

    pass(`try { } catch (e) { }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `try { } catch (e) { }`,
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
                  type: 'TryStatement',
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
                  block: {
                      type: 'BlockStatement',
                      start: 4,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      body: []
                  },
                  handler: {
                      type: 'CatchClause',
                      start: 8,
                      end: 21,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 21
                          }
                      },
                      param: {
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
                          name: 'e'
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 18,
                          end: 21,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 18
                              },
                              end: {
                                  line: 1,
                                  column: 21
                              }
                          },
                          body: []
                      }
                  },
                  finalizer: null
              }],
              sourceType: 'script'
          }
      });

    pass(`try { } catch (e) { let a; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `try { } catch (e) { let a; }`,
          expected: {
              type: 'Program',
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
              body: [{
                  type: 'TryStatement',
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
                  block: {
                      type: 'BlockStatement',
                      start: 4,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      body: []
                  },
                  handler: {
                      type: 'CatchClause',
                      start: 8,
                      end: 28,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 28
                          }
                      },
                      param: {
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
                          name: 'e'
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 18,
                          end: 28,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 18
                              },
                              end: {
                                  line: 1,
                                  column: 28
                              }
                          },
                          body: [{
                              type: 'VariableDeclaration',
                              start: 20,
                              end: 26,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 20
                                  },
                                  end: {
                                      line: 1,
                                      column: 26
                                  }
                              },
                              declarations: [{
                                  type: 'VariableDeclarator',
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
                                  id: {
                                      type: 'Identifier',
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
                                      name: 'a'
                                  },
                                  init: null
                              }],
                              kind: 'let'
                          }]
                      }
                  },
                  finalizer: null
              }],
              sourceType: 'script'
          }
      });

    pass(`try { } catch (eval) { }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `try { } catch (eval) { }`,
          expected: {
              type: 'Program',
              start: 0,
              end: 24,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 24
                  }
              },
              body: [{
                  type: 'TryStatement',
                  start: 0,
                  end: 24,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 24
                      }
                  },
                  block: {
                      type: 'BlockStatement',
                      start: 4,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      body: []
                  },
                  handler: {
                      type: 'CatchClause',
                      start: 8,
                      end: 24,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 24
                          }
                      },
                      param: {
                          type: 'Identifier',
                          start: 15,
                          end: 19,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 15
                              },
                              end: {
                                  line: 1,
                                  column: 19
                              }
                          },
                          name: 'eval'
                      },
                      body: {
                          type: 'BlockStatement',
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
                          body: []
                      }
                  },
                  finalizer: null
              }],
              sourceType: 'script'
          }
      });

    pass(`try { } catch (arguments) { }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `try { } catch (arguments) { }`,
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
              body: [{
                  type: 'TryStatement',
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
                  block: {
                      type: 'BlockStatement',
                      start: 4,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      body: []
                  },
                  handler: {
                      type: 'CatchClause',
                      start: 8,
                      end: 29,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 29
                          }
                      },
                      param: {
                          type: 'Identifier',
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
                          name: 'arguments'
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 26,
                          end: 29,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 26
                              },
                              end: {
                                  line: 1,
                                  column: 29
                              }
                          },
                          body: []
                      }
                  },
                  finalizer: null
              }],
              sourceType: 'script'
          }
      });

    pass(`try { } catch (e) { say(e) }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `try { } catch (e) { say(e) }`,
          expected: {
              type: 'Program',
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
              body: [{
                  type: 'TryStatement',
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
                  block: {
                      type: 'BlockStatement',
                      start: 4,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      body: []
                  },
                  handler: {
                      type: 'CatchClause',
                      start: 8,
                      end: 28,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 28
                          }
                      },
                      param: {
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
                          name: 'e'
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 18,
                          end: 28,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 18
                              },
                              end: {
                                  line: 1,
                                  column: 28
                              }
                          },
                          body: [{
                              type: 'ExpressionStatement',
                              start: 20,
                              end: 26,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 20
                                  },
                                  end: {
                                      line: 1,
                                      column: 26
                                  }
                              },
                              expression: {
                                  type: 'CallExpression',
                                  start: 20,
                                  end: 26,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 20
                                      },
                                      end: {
                                          line: 1,
                                          column: 26
                                      }
                                  },
                                  callee: {
                                      type: 'Identifier',
                                      start: 20,
                                      end: 23,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 20
                                          },
                                          end: {
                                              line: 1,
                                              column: 23
                                          }
                                      },
                                      name: 'say'
                                  },
                                  arguments: [{
                                      type: 'Identifier',
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
                                      name: 'e'
                                  }]
                              }
                          }]
                      }
                  },
                  finalizer: null
              }],
              sourceType: 'script'
          }

      });

    pass(`try { doThat(); } catch (e) { say(e) }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `try { doThat(); } catch (e) { say(e) }`,
          expected: {
              type: 'Program',
              start: 0,
              end: 38,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 38
                  }
              },
              body: [{
                  type: 'TryStatement',
                  start: 0,
                  end: 38,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 38
                      }
                  },
                  block: {
                      type: 'BlockStatement',
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
                      body: [{
                          type: 'ExpressionStatement',
                          start: 6,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 6
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          expression: {
                              type: 'CallExpression',
                              start: 6,
                              end: 14,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 6
                                  },
                                  end: {
                                      line: 1,
                                      column: 14
                                  }
                              },
                              callee: {
                                  type: 'Identifier',
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
                                  name: 'doThat'
                              },
                              arguments: []
                          }
                      }]
                  },
                  handler: {
                      type: 'CatchClause',
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
                      param: {
                          type: 'Identifier',
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
                          },
                          name: 'e'
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 28,
                          end: 38,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 28
                              },
                              end: {
                                  line: 1,
                                  column: 38
                              }
                          },
                          body: [{
                              type: 'ExpressionStatement',
                              start: 30,
                              end: 36,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 30
                                  },
                                  end: {
                                      line: 1,
                                      column: 36
                                  }
                              },
                              expression: {
                                  type: 'CallExpression',
                                  start: 30,
                                  end: 36,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 30
                                      },
                                      end: {
                                          line: 1,
                                          column: 36
                                      }
                                  },
                                  callee: {
                                      type: 'Identifier',
                                      start: 30,
                                      end: 33,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 30
                                          },
                                          end: {
                                              line: 1,
                                              column: 33
                                          }
                                      },
                                      name: 'say'
                                  },
                                  arguments: [{
                                      type: 'Identifier',
                                      start: 34,
                                      end: 35,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 34
                                          },
                                          end: {
                                              line: 1,
                                              column: 35
                                          }
                                      },
                                      name: 'e'
                                  }]
                              }
                          }]
                      }
                  },
                  finalizer: null
              }],
              sourceType: 'script'
          }

      });

    pass(`try { } finally { cleanup(stuff) }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `try { } finally { cleanup(stuff) }`,
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
                  type: 'TryStatement',
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
                  block: {
                      type: 'BlockStatement',
                      start: 4,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      body: []
                  },
                  handler: null,
                  finalizer: {
                      type: 'BlockStatement',
                      start: 16,
                      end: 34,
                      loc: {
                          start: {
                              line: 1,
                              column: 16
                          },
                          end: {
                              line: 1,
                              column: 34
                          }
                      },
                      body: [{
                          type: 'ExpressionStatement',
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
                          expression: {
                              type: 'CallExpression',
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
                              callee: {
                                  type: 'Identifier',
                                  start: 18,
                                  end: 25,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 18
                                      },
                                      end: {
                                          line: 1,
                                          column: 25
                                      }
                                  },
                                  name: 'cleanup'
                              },
                              arguments: [{
                                  type: 'Identifier',
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
                                  name: 'stuff'
                              }]
                          }
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`try{}catch(a){}finally{}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `try{}catch(a){}finally{}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 24,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 24
                  }
              },
              body: [{
                  type: 'TryStatement',
                  start: 0,
                  end: 24,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 24
                      }
                  },
                  block: {
                      type: 'BlockStatement',
                      start: 3,
                      end: 5,
                      loc: {
                          start: {
                              line: 1,
                              column: 3
                          },
                          end: {
                              line: 1,
                              column: 5
                          }
                      },
                      body: []
                  },
                  handler: {
                      type: 'CatchClause',
                      start: 5,
                      end: 15,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 15
                          }
                      },
                      param: {
                          type: 'Identifier',
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
                          name: 'a'
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 13,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 13
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          body: []
                      }
                  },
                  finalizer: {
                      type: 'BlockStatement',
                      start: 22,
                      end: 24,
                      loc: {
                          start: {
                              line: 1,
                              column: 22
                          },
                          end: {
                              line: 1,
                              column: 24
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }

      });

    pass(`try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }`,
          expected: {
              type: 'Program',
              start: 0,
              end: 65,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 65
                  }
              },
              body: [{
                  type: 'TryStatement',
                  start: 0,
                  end: 65,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 65
                      }
                  },
                  block: {
                      type: 'BlockStatement',
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
                      body: [{
                          type: 'ExpressionStatement',
                          start: 6,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 6
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          expression: {
                              type: 'CallExpression',
                              start: 6,
                              end: 14,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 6
                                  },
                                  end: {
                                      line: 1,
                                      column: 14
                                  }
                              },
                              callee: {
                                  type: 'Identifier',
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
                                  name: 'doThat'
                              },
                              arguments: []
                          }
                      }]
                  },
                  handler: {
                      type: 'CatchClause',
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
                      param: {
                          type: 'Identifier',
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
                          },
                          name: 'e'
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 28,
                          end: 38,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 28
                              },
                              end: {
                                  line: 1,
                                  column: 38
                              }
                          },
                          body: [{
                              type: 'ExpressionStatement',
                              start: 30,
                              end: 36,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 30
                                  },
                                  end: {
                                      line: 1,
                                      column: 36
                                  }
                              },
                              expression: {
                                  type: 'CallExpression',
                                  start: 30,
                                  end: 36,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 30
                                      },
                                      end: {
                                          line: 1,
                                          column: 36
                                      }
                                  },
                                  callee: {
                                      type: 'Identifier',
                                      start: 30,
                                      end: 33,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 30
                                          },
                                          end: {
                                              line: 1,
                                              column: 33
                                          }
                                      },
                                      name: 'say'
                                  },
                                  arguments: [{
                                      type: 'Identifier',
                                      start: 34,
                                      end: 35,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 34
                                          },
                                          end: {
                                              line: 1,
                                              column: 35
                                          }
                                      },
                                      name: 'e'
                                  }]
                              }
                          }]
                      }
                  },
                  finalizer: {
                      type: 'BlockStatement',
                      start: 47,
                      end: 65,
                      loc: {
                          start: {
                              line: 1,
                              column: 47
                          },
                          end: {
                              line: 1,
                              column: 65
                          }
                      },
                      body: [{
                          type: 'ExpressionStatement',
                          start: 49,
                          end: 63,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 49
                              },
                              end: {
                                  line: 1,
                                  column: 63
                              }
                          },
                          expression: {
                              type: 'CallExpression',
                              start: 49,
                              end: 63,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 49
                                  },
                                  end: {
                                      line: 1,
                                      column: 63
                                  }
                              },
                              callee: {
                                  type: 'Identifier',
                                  start: 49,
                                  end: 56,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 49
                                      },
                                      end: {
                                          line: 1,
                                          column: 56
                                      }
                                  },
                                  name: 'cleanup'
                              },
                              arguments: [{
                                  type: 'Identifier',
                                  start: 57,
                                  end: 62,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 57
                                      },
                                      end: {
                                          line: 1,
                                          column: 62
                                      }
                                  },
                                  name: 'stuff'
                              }]
                          }
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });
  });
});
