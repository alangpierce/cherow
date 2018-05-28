import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Rest', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

    const invalidCombos = [
      'function foo(...a, ...b) {}',
      'function foo(a, ...b, c) => {}',
      'var obj = class { method(a, b = 1, ...c = [2,3]) {} };',
      'function f(...a) { \'use strict\'; }',
      'function f(a, ...b) { \'use strict\'; }',
      // Arrow function
      '(a = ...NaN, b = [...[1,2,3]], ...rest) => {};',
      '(a = (...NaN), ...b = [...[1,2,3]], rest) => {};',
      '(a = [...NaN], ...b = [...[1,2,3]], rest) => {};',
      '(a, ...b, ...rest) => {};',
      '(...rest = ...NaN) => {};',
      'var x = { set setter(...x) {} }',
      'var x = class { set setter(...x) {} }'

  ];
    for (const arg of invalidCombos) {

      it(`${arg}`, () => {
          t.throws(() => {
              parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
          });
      });
  }

    const invalidSyntax = [
      'a, ...args, b',
      '...args,   b',
      'a, ...args,   b',
      '...args,\tb',
      'a,...args\t,b',
      '...args\r\n, b',
      'a, ... args,\r\nb',
      '...args\r,b',
      'a, ... args,\rb',
      '...args\t\n\t\t\n,  b',
      'a, ... args,  \n  \n  b',

  ];
    for (const arg of invalidSyntax) {

      it(`function foo(${arg}){ return args;}(1, [], /regexp/, 'str', function(){});`, () => {
          t.throws(() => {
              parseSource(`function foo(${arg}){ return args;}`, undefined, Context.OptionsNext | Context.Module);
          });
      });
  }

    fail('var obj = class { method(a, b = 1, ...c = [2,3]) {} };', Context.Empty, {
          source: 'var obj = class { method(a, b = 1, ...c = [2,3]) {} };',
      });

    fail('function f(...a) { "use strict"; }', Context.Empty, {
          source: 'function f(...a) { "use strict"; }',
      });

    fail('x = { set f(...y) {} }', Context.Empty, {
          source: `x = { set f(...y) {} }`,
      });

    fail(`function f(a, ...b, c);`, Context.Empty, {
          source: 'function f(a, ...b, c);',
      });

    fail(`function f(a, ...b = 0);`, Context.Empty, {
          source: 'function f(a, ...b = 0);',
      });

    fail(`0, function(...a,) { };`, Context.Empty, {
          source: '0, function(...a,) { };',
      });

      // Esprima issue: https://github.com/jquery/esprima/issues/1800
    fail('[a, ...(b = c)] = 0', Context.Empty, {
        source: '[a, ...(b = c)] = 0',
      });

    fail('function f(a, ...b, c) {}', Context.Empty, {
        source: 'function f(a, ...b, c) {}',
      });
  });

  describe('Pass', () => {

      const validSyntax = [
          'a, ...args',
          '...   args',
          'a, ...   args',
          '...\targs',
          'a, ...\targs',
          '...\r\nargs',
          'a, ...\r\nargs',
          '...\rargs',
          'a, ...\rargs',
          '...\t\n\t\t\n  args',
          'a, ...  \n  \n  args',
          '...{ length, 0: a, 1: b}',
          '...{}',
          '...[a, b]',
          '...[]',
          '...[...[a, b, ...c]]',
          '...eval',
          'eval, ...args',
          '...arguments',
           'arguments, ...args',
      ];
      for (const arg of validSyntax) {

          it(`function foo(${arg}){ return args;}(1, [], /regexp/, 'str', function(){});`, () => {
              t.doesNotThrow(() => {
                  parseSource(`function foo(${arg}){ return args;}`, undefined, Context.OptionsNext | Context.Module);
              });
          });
      }

      pass('function f(...b) {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'function f(...b) {};',
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
                  type: 'FunctionDeclaration',
                  start: 0,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  },
                  id: {
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
                    name: 'f'
                  },
                  generator: false,
                  expression: false,
                  async: false,
                  params: [
                    {
                      type: 'RestElement',
                      start: 11,
                      end: 15,
                      loc: {
                        start: {
                          line: 1,
                          column: 11
                        },
                        end: {
                          line: 1,
                          column: 15
                        }
                      },
                      argument: {
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
                        name: 'b'
                      }
                    }
                  ],
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
              ],
              sourceType: 'script'
            }
      });

      pass('var x = function(a, ...b) {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'var x = function(a, ...b) {};',
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
                  type: 'VariableDeclaration',
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
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 28,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 28
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
                        type: 'FunctionExpression',
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
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [
                          {
                            type: 'Identifier',
                            start: 17,
                            end: 18,
                            loc: {
                              start: {
                                line: 1,
                                column: 17
                              },
                              end: {
                                line: 1,
                                column: 18
                              }
                            },
                            name: 'a'
                          },
                          {
                            type: 'RestElement',
                            start: 20,
                            end: 24,
                            loc: {
                              start: {
                                line: 1,
                                column: 20
                              },
                              end: {
                                line: 1,
                                column: 24
                              }
                            },
                            argument: {
                              type: 'Identifier',
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
                              name: 'b'
                            }
                          }
                        ],
                        body: {
                          type: 'BlockStatement',
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
                          body: []
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

      pass('function f(a, ...b) {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'function f(a, ...b) {};',
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
                  type: 'FunctionDeclaration',
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
                  id: {
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
                    name: 'f'
                  },
                  generator: false,
                  expression: false,
                  async: false,
                  params: [
                    {
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
                    {
                      type: 'RestElement',
                      start: 14,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      },
                      argument: {
                        type: 'Identifier',
                        start: 17,
                        end: 18,
                        loc: {
                          start: {
                            line: 1,
                            column: 17
                          },
                          end: {
                            line: 1,
                            column: 18
                          }
                        },
                        name: 'b'
                      }
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    start: 20,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    },
                    body: []
                  }
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

      pass('var fn = (a, b, ...c) => c;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'var fn = (a, b, ...c) => c;',
          expected: {
              type: 'Program',
              start: 0,
              end: 27,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 27
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
                  start: 0,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 27
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 26,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 26
                        }
                      },
                      id: {
                        type: 'Identifier',
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
                        name: 'fn'
                      },
                      init: {
                        type: 'ArrowFunctionExpression',
                        start: 9,
                        end: 26,
                        loc: {
                          start: {
                            line: 1,
                            column: 9
                          },
                          end: {
                            line: 1,
                            column: 26
                          }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [
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
                          },
                          {
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
                            name: 'b'
                          },
                          {
                            type: 'RestElement',
                            start: 16,
                            end: 20,
                            loc: {
                              start: {
                                line: 1,
                                column: 16
                              },
                              end: {
                                line: 1,
                                column: 20
                              }
                            },
                            argument: {
                              type: 'Identifier',
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
                              name: 'c'
                            }
                          }
                        ],
                        body: {
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
                          name: 'c'
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

      pass('function empty(...{}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'function empty(...{}) {}',
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
              body: [
                {
                  type: 'FunctionDeclaration',
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
                  id: {
                    type: 'Identifier',
                    start: 9,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    },
                    name: 'empty'
                  },
                  generator: false,
                  expression: false,
                  async: false,
                  params: [
                    {
                      type: 'RestElement',
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
                      argument: {
                        type: 'ObjectPattern',
                        start: 18,
                        end: 20,
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 20
                          }
                        },
                        properties: []
                      }
                    }
                  ],
                  body: {
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
                }
              ],
              sourceType: 'script'
            }
      });

      pass('function emptyWithArray(...{p: []}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'function emptyWithArray(...{p: []}) {}',
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
              body: [
                {
                  type: 'FunctionDeclaration',
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
                  id: {
                    type: 'Identifier',
                    start: 9,
                    end: 23,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 23
                      }
                    },
                    name: 'emptyWithArray'
                  },
                  generator: false,
                  expression: false,
                  async: false,
                  params: [
                    {
                      type: 'RestElement',
                      start: 24,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      },
                      argument: {
                        type: 'ObjectPattern',
                        start: 27,
                        end: 34,
                        loc: {
                          start: {
                            line: 1,
                            column: 27
                          },
                          end: {
                            line: 1,
                            column: 34
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 28,
                            end: 33,
                            loc: {
                              start: {
                                line: 1,
                                column: 28
                              },
                              end: {
                                line: 1,
                                column: 33
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
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
                              },
                              name: 'p'
                            },
                            value: {
                              type: 'ArrayPattern',
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
                              elements: []
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    start: 36,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 36
                      },
                      end: {
                        line: 1,
                        column: 38
                      }
                    },
                    body: []
                  }
                }
              ],
              sourceType: 'script'
            }
      });

      pass('function emptyWithObject(...{p: {}}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'function emptyWithObject(...{p: {}}) {}',
          expected: {
              type: 'Program',
              start: 0,
              end: 39,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 39
                }
              },
              body: [
                {
                  type: 'FunctionDeclaration',
                  start: 0,
                  end: 39,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 39
                    }
                  },
                  id: {
                    type: 'Identifier',
                    start: 9,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    },
                    name: 'emptyWithObject'
                  },
                  generator: false,
                  expression: false,
                  async: false,
                  params: [
                    {
                      type: 'RestElement',
                      start: 25,
                      end: 35,
                      loc: {
                        start: {
                          line: 1,
                          column: 25
                        },
                        end: {
                          line: 1,
                          column: 35
                        }
                      },
                      argument: {
                        type: 'ObjectPattern',
                        start: 28,
                        end: 35,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 35
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 29,
                            end: 34,
                            loc: {
                              start: {
                                line: 1,
                                column: 29
                              },
                              end: {
                                line: 1,
                                column: 34
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
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
                              name: 'p'
                            },
                            value: {
                              type: 'ObjectPattern',
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
                              properties: []
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    start: 37,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 37
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    },
                    body: []
                  }
                }
              ],
              sourceType: 'script'
            }
      });

      pass('function multiElementWithLeading(x, y, ...{a: r, b: s, c: t}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'function multiElementWithLeading(x, y, ...{a: r, b: s, c: t}) {}',
          expected: {
              type: 'Program',
              start: 0,
              end: 64,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 64
                }
              },
              body: [
                {
                  type: 'FunctionDeclaration',
                  start: 0,
                  end: 64,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 64
                    }
                  },
                  id: {
                    type: 'Identifier',
                    start: 9,
                    end: 32,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 32
                      }
                    },
                    name: 'multiElementWithLeading'
                  },
                  generator: false,
                  expression: false,
                  async: false,
                  params: [
                    {
                      type: 'Identifier',
                      start: 33,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      },
                      name: 'x'
                    },
                    {
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
                      name: 'y'
                    },
                    {
                      type: 'RestElement',
                      start: 39,
                      end: 60,
                      loc: {
                        start: {
                          line: 1,
                          column: 39
                        },
                        end: {
                          line: 1,
                          column: 60
                        }
                      },
                      argument: {
                        type: 'ObjectPattern',
                        start: 42,
                        end: 60,
                        loc: {
                          start: {
                            line: 1,
                            column: 42
                          },
                          end: {
                            line: 1,
                            column: 60
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 43,
                            end: 47,
                            loc: {
                              start: {
                                line: 1,
                                column: 43
                              },
                              end: {
                                line: 1,
                                column: 47
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 43,
                              end: 44,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 43
                                },
                                end: {
                                  line: 1,
                                  column: 44
                                }
                              },
                              name: 'a'
                            },
                            value: {
                              type: 'Identifier',
                              start: 46,
                              end: 47,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 46
                                },
                                end: {
                                  line: 1,
                                  column: 47
                                }
                              },
                              name: 'r'
                            },
                            kind: 'init'
                          },
                          {
                            type: 'Property',
                            start: 49,
                            end: 53,
                            loc: {
                              start: {
                                line: 1,
                                column: 49
                              },
                              end: {
                                line: 1,
                                column: 53
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 49,
                              end: 50,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 49
                                },
                                end: {
                                  line: 1,
                                  column: 50
                                }
                              },
                              name: 'b'
                            },
                            value: {
                              type: 'Identifier',
                              start: 52,
                              end: 53,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 52
                                },
                                end: {
                                  line: 1,
                                  column: 53
                                }
                              },
                              name: 's'
                            },
                            kind: 'init'
                          },
                          {
                            type: 'Property',
                            start: 55,
                            end: 59,
                            loc: {
                              start: {
                                line: 1,
                                column: 55
                              },
                              end: {
                                line: 1,
                                column: 59
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 55,
                              end: 56,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 55
                                },
                                end: {
                                  line: 1,
                                  column: 56
                                }
                              },
                              name: 'c'
                            },
                            value: {
                              type: 'Identifier',
                              start: 58,
                              end: 59,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 58
                                },
                                end: {
                                  line: 1,
                                  column: 59
                                }
                              },
                              name: 't'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    start: 62,
                    end: 64,
                    loc: {
                      start: {
                        line: 1,
                        column: 62
                      },
                      end: {
                        line: 1,
                        column: 64
                      }
                    },
                    body: []
                  }
                }
              ],
              sourceType: 'script'
            }
      });

      pass('function emptyWithRest(...[...[]]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'function emptyWithRest(...[...[]]) {}',
          expected: {
              type: 'Program',
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
              body: [
                {
                  type: 'FunctionDeclaration',
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
                  id: {
                    type: 'Identifier',
                    start: 9,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    },
                    name: 'emptyWithRest'
                  },
                  generator: false,
                  expression: false,
                  async: false,
                  params: [
                    {
                      type: 'RestElement',
                      start: 23,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 23
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      },
                      argument: {
                        type: 'ArrayPattern',
                        start: 26,
                        end: 33,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 33
                          }
                        },
                        elements: [
                          {
                            type: 'RestElement',
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
                            argument: {
                              type: 'ArrayPattern',
                              start: 30,
                              end: 32,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 30
                                },
                                end: {
                                  line: 1,
                                  column: 32
                                }
                              },
                              elements: []
                            }
                          }
                        ]
                      }
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    start: 35,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 35
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    },
                    body: []
                  }
                }
              ],
              sourceType: 'script'
            }
      });
  });
});
