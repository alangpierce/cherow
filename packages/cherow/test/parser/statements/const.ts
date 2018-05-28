import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Statements - Const', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

    const invalidSyntax = [
      `do const x = 1; while (false)`,
      'while (false) const x = 1;',
      'label: const x;',
      'while (false) const x;',
      'const [...x = []] = [];',
      'const [...{ x }, y] = [1, 2, 3];',
      'const [...x, y] = [1, 2, 3];',
      // Babylon PR: https://github.com/babel/babylon/pull/195
      'const { foo: enum } = bar();',
      'function foo({ bar: enum }) {}',
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

    fail('const x', Context.Empty, {
        source: 'const x',
    });

    fail('const [...[ x ] = []] = [];', Context.Empty, {
          source: 'const [...[ x ] = []] = [];',
      });

    fail('const [...[x], y] = [1, 2, 3];', Context.Empty, {
          source: 'const [...[x], y] = [1, 2, 3];',
      });

    fail('const [...{ x }, y] = [1, 2, 3];', Context.Empty, {
          source: 'const [...{ x }, y] = [1, 2, 3];',
      });

    fail('if (true) {} else const x;', Context.Empty, {
          source: 'if (true) {} else const x;',
      });

    fail('const { foo: protected } = bar();', Context.Strict, {
        source: 'const { foo: protected } = bar();',
    });

    fail('for (;false;) const x = 1;', Context.Empty, {
        source: 'for (;false;) const x = 1;',
    });

    fail('if (true) {} else const x = 1;', Context.Empty, {
        source: 'if (true) {} else const x = 1;',
    });

    fail('const x, y = 1;', Context.Empty, {
        source: 'const x, y = 1;',
    });

    fail('do const x = 1; while (false)', Context.Empty, {
        source: 'do const x = 1; while (false)',
    });
  });

  describe('Pass', () => {

    const validSyntax = [
      'const a = Infinity;',
      'const b = -Infinity;',
      'const c = +Infinity;',
      'const d = /abc/;',
      'const e = /abc/g;',
      'const f = /abc/gi;'
  ];

    for (const arg of validSyntax) {
      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parseSource(`${arg}`, undefined, Context.Empty);
          });
      });

      it(`${arg}`, () => {
        t.doesNotThrow(() => {
            parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
        });
    });
  }

    // Babylon issue: https://github.com/babel/babel/issues/6687
    pass(`const await = foo;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `const await = foo;`,
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
            declarations: [
              {
                type: 'VariableDeclarator',
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
                id: {
                  type: 'Identifier',
                  start: 6,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 11
                    }
                  },
                  name: 'await'
                },
                init: {
                  type: 'Identifier',
                  start: 14,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  },
                  name: 'foo'
                }
              }
            ],
            kind: 'const'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`const { async: foo } = bar;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `const { async: foo } = bar;`,
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
                start: 6,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                },
                id: {
                  type: 'ObjectPattern',
                  start: 6,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 8,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 8
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      },
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 8,
                        end: 13,
                        loc: {
                          start: {
                            line: 1,
                            column: 8
                          },
                          end: {
                            line: 1,
                            column: 13
                          }
                        },
                        name: 'async'
                      },
                      value: {
                        type: 'Identifier',
                        start: 15,
                        end: 18,
                        loc: {
                          start: {
                            line: 1,
                            column: 15
                          },
                          end: {
                            line: 1,
                            column: 18
                          }
                        },
                        name: 'foo'
                      },
                      kind: 'init'
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  start: 23,
                  end: 26,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 26
                    }
                  },
                  name: 'bar'
                }
              }
            ],
            kind: 'const'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`const foo = function({ async = true }) {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `const foo = function({ async = true }) {};`,
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
        body: [
          {
            type: 'VariableDeclaration',
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
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 6,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 41
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
                  type: 'FunctionExpression',
                  start: 12,
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 1,
                      column: 41
                    }
                  },
                  id: null,
                  generator: false,
                  expression: false,
                  async: false,
                  params: [
                    {
                      type: 'ObjectPattern',
                      start: 21,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 23,
                          end: 35,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
                            },
                            end: {
                              line: 1,
                              column: 35
                            }
                          },
                          method: false,
                          shorthand: true,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 23,
                            end: 28,
                            loc: {
                              start: {
                                line: 1,
                                column: 23
                              },
                              end: {
                                line: 1,
                                column: 28
                              }
                            },
                            name: 'async'
                          },
                          kind: 'init',
                          value: {
                            type: 'AssignmentPattern',
                            start: 23,
                            end: 35,
                            loc: {
                              start: {
                                line: 1,
                                column: 23
                              },
                              end: {
                                line: 1,
                                column: 35
                              }
                            },
                            left: {
                              type: 'Identifier',
                              start: 23,
                              end: 28,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 23
                                },
                                end: {
                                  line: 1,
                                  column: 28
                                }
                              },
                              name: 'async'
                            },
                            right: {
                              type: 'Literal',
                              start: 31,
                              end: 35,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 31
                                },
                                end: {
                                  line: 1,
                                  column: 35
                                }
                              },
                              value: true,
                              raw: 'true'
                            }
                          }
                        }
                      ]
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    start: 39,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 39
                      },
                      end: {
                        line: 1,
                        column: 41
                      }
                    },
                    body: []
                  }
                }
              }
            ],
            kind: 'const'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`const await = 10;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `const await = 10;`,
        expected: {
            type: 'Program',
            start: 0,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 17
              }
            },
            body: [
              {
                type: 'VariableDeclaration',
                start: 0,
                end: 17,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 17
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 16,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 16
                      }
                    },
                    id: {
                      type: 'Identifier',
                      start: 6,
                      end: 11,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 11
                        }
                      },
                      name: 'await'
                    },
                    init: {
                      type: 'Literal',
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
                      value: 10,
                      raw: '10'
                    }
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];`,
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
                line: 1,
                column: 74
              }
            },
            body: [
              {
                type: 'VariableDeclaration',
                start: 0,
                end: 74,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 74
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 73,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 73
                      }
                    },
                    id: {
                      type: 'ArrayPattern',
                      start: 6,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      },
                      elements: [
                        {
                          type: 'AssignmentPattern',
                          start: 7,
                          end: 44,
                          loc: {
                            start: {
                              line: 1,
                              column: 7
                            },
                            end: {
                              line: 1,
                              column: 44
                            }
                          },
                          left: {
                            type: 'ObjectPattern',
                            start: 7,
                            end: 18,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 18
                              }
                            },
                            properties: [
                              {
                                type: 'Property',
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
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
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
                                kind: 'init',
                                value: {
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
                                }
                              },
                              {
                                type: 'Property',
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
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
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
                                  name: 'y'
                                },
                                kind: 'init',
                                value: {
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
                                  name: 'y'
                                }
                              },
                              {
                                type: 'Property',
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
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
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
                                  name: 'z'
                                },
                                kind: 'init',
                                value: {
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
                                  name: 'z'
                                }
                              }
                            ]
                          },
                          right: {
                            type: 'ObjectExpression',
                            start: 21,
                            end: 44,
                            loc: {
                              start: {
                                line: 1,
                                column: 21
                              },
                              end: {
                                line: 1,
                                column: 44
                              }
                            },
                            properties: [
                              {
                                type: 'Property',
                                start: 23,
                                end: 28,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 23
                                  },
                                  end: {
                                    line: 1,
                                    column: 28
                                  }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
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
                                  name: 'x'
                                },
                                value: {
                                  type: 'Literal',
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
                                  value: 44,
                                  raw: '44'
                                },
                                kind: 'init'
                              },
                              {
                                type: 'Property',
                                start: 30,
                                end: 35,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 30
                                  },
                                  end: {
                                    line: 1,
                                    column: 35
                                  }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
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
                                  name: 'y'
                                },
                                value: {
                                  type: 'Literal',
                                  start: 33,
                                  end: 35,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 33
                                    },
                                    end: {
                                      line: 1,
                                      column: 35
                                    }
                                  },
                                  value: 55,
                                  raw: '55'
                                },
                                kind: 'init'
                              },
                              {
                                type: 'Property',
                                start: 37,
                                end: 42,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 37
                                  },
                                  end: {
                                    line: 1,
                                    column: 42
                                  }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                  type: 'Identifier',
                                  start: 37,
                                  end: 38,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 37
                                    },
                                    end: {
                                      line: 1,
                                      column: 38
                                    }
                                  },
                                  name: 'z'
                                },
                                value: {
                                  type: 'Literal',
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
                                  value: 66,
                                  raw: '66'
                                },
                                kind: 'init'
                              }
                            ]
                          }
                        }
                      ]
                    },
                    init: {
                      type: 'ArrayExpression',
                      start: 48,
                      end: 73,
                      loc: {
                        start: {
                          line: 1,
                          column: 48
                        },
                        end: {
                          line: 1,
                          column: 73
                        }
                      },
                      elements: [
                        {
                          type: 'ObjectExpression',
                          start: 49,
                          end: 72,
                          loc: {
                            start: {
                              line: 1,
                              column: 49
                            },
                            end: {
                              line: 1,
                              column: 72
                            }
                          },
                          properties: [
                            {
                              type: 'Property',
                              start: 51,
                              end: 56,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 51
                                },
                                end: {
                                  line: 1,
                                  column: 56
                                }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 51,
                                end: 52,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 51
                                  },
                                  end: {
                                    line: 1,
                                    column: 52
                                  }
                                },
                                name: 'x'
                              },
                              value: {
                                type: 'Literal',
                                start: 54,
                                end: 56,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 54
                                  },
                                  end: {
                                    line: 1,
                                    column: 56
                                  }
                                },
                                value: 11,
                                raw: '11'
                              },
                              kind: 'init'
                            },
                            {
                              type: 'Property',
                              start: 58,
                              end: 63,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 58
                                },
                                end: {
                                  line: 1,
                                  column: 63
                                }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
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
                                name: 'y'
                              },
                              value: {
                                type: 'Literal',
                                start: 61,
                                end: 63,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 61
                                  },
                                  end: {
                                    line: 1,
                                    column: 63
                                  }
                                },
                                value: 22,
                                raw: '22'
                              },
                              kind: 'init'
                            },
                            {
                              type: 'Property',
                              start: 65,
                              end: 70,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 65
                                },
                                end: {
                                  line: 1,
                                  column: 70
                                }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 65,
                                end: 66,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 65
                                  },
                                  end: {
                                    line: 1,
                                    column: 66
                                  }
                                },
                                name: 'z'
                              },
                              value: {
                                type: 'Literal',
                                start: 68,
                                end: 70,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 68
                                  },
                                  end: {
                                    line: 1,
                                    column: 70
                                  }
                                },
                                value: 33,
                                raw: '33'
                              },
                              kind: 'init'
                            }
                          ]
                        }
                      ]
                    }
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`const a = a, b = 4, fapper = 8;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `const a = a, b = 4, fapper = 8;`,
        expected: {
            type: 'Program',
            start: 0,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 31
              }
            },
            body: [
              {
                type: 'VariableDeclaration',
                start: 0,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 11
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
                      name: 'a'
                    },
                    init: {
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
                  },
                  {
                    type: 'VariableDeclarator',
                    start: 13,
                    end: 18,
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 18
                      }
                    },
                    id: {
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
                    init: {
                      type: 'Literal',
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
                      value: 4,
                      raw: '4'
                    }
                  },
                  {
                    type: 'VariableDeclarator',
                    start: 20,
                    end: 30,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 30
                      }
                    },
                    id: {
                      type: 'Identifier',
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
                      name: 'fapper'
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
                      value: 8,
                      raw: '8'
                    }
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`{ const x = 42 }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `{ const x = 42 }`,
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
                        id: {
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
                          name: 'x'
                        },
                        init: {
                          type: 'Literal',
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
                          value: 42,
                          raw: '42'
                        }
                      }
                    ],
                    kind: 'const'
                  }
                ]
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`{ const x = 14, y = 3, z = 1977 }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `{ const x = 14, y = 3, z = 1977 }`,
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
                type: 'BlockStatement',
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
                    type: 'VariableDeclaration',
                    start: 2,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 2
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
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
                        id: {
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
                          name: 'x'
                        },
                        init: {
                          type: 'Literal',
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
                          value: 14,
                          raw: '14'
                        }
                      },
                      {
                        type: 'VariableDeclarator',
                        start: 16,
                        end: 21,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 21
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
                          name: 'y'
                        },
                        init: {
                          type: 'Literal',
                          start: 20,
                          end: 21,
                          loc: {
                            start: {
                              line: 1,
                              column: 20
                            },
                            end: {
                              line: 1,
                              column: 21
                            }
                          },
                          value: 3,
                          raw: '3'
                        }
                      },
                      {
                        type: 'VariableDeclarator',
                        start: 23,
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        },
                        id: {
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
                          name: 'z'
                        },
                        init: {
                          type: 'Literal',
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
                          value: 1977,
                          raw: '1977'
                        }
                      }
                    ],
                    kind: 'const'
                  }
                ]
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`const z = 4; { const z = 5; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `const z = 4; { const z = 5; }`,
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
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 11
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
                      name: 'z'
                    },
                    init: {
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
                      value: 4,
                      raw: '4'
                    }
                  }
                ],
                kind: 'const'
              },
              {
                type: 'BlockStatement',
                start: 13,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                },
                body: [
                  {
                    type: 'VariableDeclaration',
                    start: 15,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 21,
                        end: 26,
                        loc: {
                          start: {
                            line: 1,
                            column: 21
                          },
                          end: {
                            line: 1,
                            column: 26
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
                          name: 'z'
                        },
                        init: {
                          type: 'Literal',
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
                          value: 5,
                          raw: '5'
                        }
                      }
                    ],
                    kind: 'const'
                  }
                ]
              }
            ],
            sourceType: 'script'
          }
      });

    pass(`const [gen = function* () {}, foo = function* x() {}] = [];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `const [gen = function* () {}, foo = function* x() {}] = [];`,
          expected: {
            type: 'Program',
            start: 0,
            end: 59,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 59
              }
            },
            body: [
              {
                type: 'VariableDeclaration',
                start: 0,
                end: 59,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 59
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 58,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 58
                      }
                    },
                    id: {
                      type: 'ArrayPattern',
                      start: 6,
                      end: 53,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 53
                        }
                      },
                      elements: [
                        {
                          type: 'AssignmentPattern',
                          start: 7,
                          end: 28,
                          loc: {
                            start: {
                              line: 1,
                              column: 7
                            },
                            end: {
                              line: 1,
                              column: 28
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
                            name: 'gen'
                          },
                          right: {
                            type: 'FunctionExpression',
                            start: 13,
                            end: 28,
                            loc: {
                              start: {
                                line: 1,
                                column: 13
                              },
                              end: {
                                line: 1,
                                column: 28
                              }
                            },
                            id: null,
                            generator: true,
                            expression: false,
                            async: false,
                            params: [],
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
                        },
                        {
                          type: 'AssignmentPattern',
                          start: 30,
                          end: 52,
                          loc: {
                            start: {
                              line: 1,
                              column: 30
                            },
                            end: {
                              line: 1,
                              column: 52
                            }
                          },
                          left: {
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
                            name: 'foo'
                          },
                          right: {
                            type: 'FunctionExpression',
                            start: 36,
                            end: 52,
                            loc: {
                              start: {
                                line: 1,
                                column: 36
                              },
                              end: {
                                line: 1,
                                column: 52
                              }
                            },
                            id: {
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
                              name: 'x'
                            },
                            generator: true,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 50,
                              end: 52,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 50
                                },
                                end: {
                                  line: 1,
                                  column: 52
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    },
                    init: {
                      type: 'ArrayExpression',
                      start: 56,
                      end: 58,
                      loc: {
                        start: {
                          line: 1,
                          column: 56
                        },
                        end: {
                          line: 1,
                          column: 58
                        }
                      },
                      elements: []
                    }
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
      });

    pass(`const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [];`,
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
                line: 1,
                column: 51
              }
            },
            body: [
              {
                type: 'VariableDeclaration',
                start: 0,
                end: 51,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 51
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 50,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 50
                      }
                    },
                    id: {
                      type: 'ArrayPattern',
                      start: 6,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      },
                      elements: [
                        {
                          type: 'AssignmentPattern',
                          start: 7,
                          end: 44,
                          loc: {
                            start: {
                              line: 1,
                              column: 7
                            },
                            end: {
                              line: 1,
                              column: 44
                            }
                          },
                          left: {
                            type: 'ObjectPattern',
                            start: 7,
                            end: 18,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 18
                              }
                            },
                            properties: [
                              {
                                type: 'Property',
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
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
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
                                kind: 'init',
                                value: {
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
                                }
                              },
                              {
                                type: 'Property',
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
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
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
                                  name: 'y'
                                },
                                kind: 'init',
                                value: {
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
                                  name: 'y'
                                }
                              },
                              {
                                type: 'Property',
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
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
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
                                  name: 'z'
                                },
                                kind: 'init',
                                value: {
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
                                  name: 'z'
                                }
                              }
                            ]
                          },
                          right: {
                            type: 'ObjectExpression',
                            start: 21,
                            end: 44,
                            loc: {
                              start: {
                                line: 1,
                                column: 21
                              },
                              end: {
                                line: 1,
                                column: 44
                              }
                            },
                            properties: [
                              {
                                type: 'Property',
                                start: 23,
                                end: 28,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 23
                                  },
                                  end: {
                                    line: 1,
                                    column: 28
                                  }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
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
                                  name: 'x'
                                },
                                value: {
                                  type: 'Literal',
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
                                  value: 44,
                                  raw: '44'
                                },
                                kind: 'init'
                              },
                              {
                                type: 'Property',
                                start: 30,
                                end: 35,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 30
                                  },
                                  end: {
                                    line: 1,
                                    column: 35
                                  }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
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
                                  name: 'y'
                                },
                                value: {
                                  type: 'Literal',
                                  start: 33,
                                  end: 35,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 33
                                    },
                                    end: {
                                      line: 1,
                                      column: 35
                                    }
                                  },
                                  value: 55,
                                  raw: '55'
                                },
                                kind: 'init'
                              },
                              {
                                type: 'Property',
                                start: 37,
                                end: 42,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 37
                                  },
                                  end: {
                                    line: 1,
                                    column: 42
                                  }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                  type: 'Identifier',
                                  start: 37,
                                  end: 38,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 37
                                    },
                                    end: {
                                      line: 1,
                                      column: 38
                                    }
                                  },
                                  name: 'z'
                                },
                                value: {
                                  type: 'Literal',
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
                                  value: 66,
                                  raw: '66'
                                },
                                kind: 'init'
                              }
                            ]
                          }
                        }
                      ]
                    },
                    init: {
                      type: 'ArrayExpression',
                      start: 48,
                      end: 50,
                      loc: {
                        start: {
                          line: 1,
                          column: 48
                        },
                        end: {
                          line: 1,
                          column: 50
                        }
                      },
                      elements: []
                    }
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
      });

    pass(` const [{ x }] = [null];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `const [{ x }] = [null];`,
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
                type: 'VariableDeclaration',
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
                declarations: [
                  {
                    type: 'VariableDeclarator',
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
                    id: {
                      type: 'ArrayPattern',
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
                      elements: [
                        {
                          type: 'ObjectPattern',
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
                          properties: [
                            {
                              type: 'Property',
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
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
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
                              kind: 'init',
                              value: {
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
                              }
                            }
                          ]
                        }
                      ]
                    },
                    init: {
                      type: 'ArrayExpression',
                      start: 16,
                      end: 22,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 22
                        }
                      },
                      elements: [
                        {
                          type: 'Literal',
                          start: 17,
                          end: 21,
                          loc: {
                            start: {
                              line: 1,
                              column: 17
                            },
                            end: {
                              line: 1,
                              column: 21
                            }
                          },
                          value: null,
                          raw: 'null'
                        }
                      ]
                    }
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
      });

    pass(`const [...x] = [1, 2, 3];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `const [...x] = [1, 2, 3];`,
          expected: {
            type: 'Program',
            start: 0,
            end: 25,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 25
              }
            },
            body: [
              {
                type: 'VariableDeclaration',
                start: 0,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    },
                    id: {
                      type: 'ArrayPattern',
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
                      elements: [
                        {
                          type: 'RestElement',
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
                            name: 'x'
                          }
                        }
                      ]
                    },
                    init: {
                      type: 'ArrayExpression',
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
                      elements: [
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
                          value: 1,
                          raw: '1'
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
                          value: 2,
                          raw: '2'
                        },
                        {
                          type: 'Literal',
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
                          },
                          value: 3,
                          raw: '3'
                        }
                      ]
                    }
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
      });

    pass(`const {} = obj;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `const {} = obj;`,
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
            body: [
              {
                type: 'VariableDeclaration',
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
                declarations: [
                  {
                    type: 'VariableDeclarator',
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
                    id: {
                      type: 'ObjectPattern',
                      start: 6,
                      end: 8,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 8
                        }
                      },
                      properties: []
                    },
                    init: {
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
                      name: 'obj'
                    }
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
      });

    pass(`const { x: y = 33 } = { };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `const { x: y = 33 } = { };`,
          expected: {
            type: 'Program',
            start: 0,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 26
              }
            },
            body: [
              {
                type: 'VariableDeclaration',
                start: 0,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 25,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 25
                      }
                    },
                    id: {
                      type: 'ObjectPattern',
                      start: 6,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 19
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 8,
                          end: 17,
                          loc: {
                            start: {
                              line: 1,
                              column: 8
                            },
                            end: {
                              line: 1,
                              column: 17
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
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
                            name: 'x'
                          },
                          value: {
                            type: 'AssignmentPattern',
                            start: 11,
                            end: 17,
                            loc: {
                              start: {
                                line: 1,
                                column: 11
                              },
                              end: {
                                line: 1,
                                column: 17
                              }
                            },
                            left: {
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
                              name: 'y'
                            },
                            right: {
                              type: 'Literal',
                              start: 15,
                              end: 17,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 15
                                },
                                end: {
                                  line: 1,
                                  column: 17
                                }
                              },
                              value: 33,
                              raw: '33'
                            }
                          },
                          kind: 'init'
                        }
                      ]
                    },
                    init: {
                      type: 'ObjectExpression',
                      start: 22,
                      end: 25,
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 25
                        }
                      },
                      properties: []
                    }
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
      });

    pass(`const fn = function() {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `const fn = function() {};`,
          expected: {
            type: 'Program',
            start: 0,
            end: 25,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 25
              }
            },
            body: [
              {
                type: 'VariableDeclaration',
                start: 0,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    },
                    id: {
                      type: 'Identifier',
                      start: 6,
                      end: 8,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 8
                        }
                      },
                      name: 'fn'
                    },
                    init: {
                      type: 'FunctionExpression',
                      start: 11,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 11
                        },
                        end: {
                          line: 1,
                          column: 24
                        }
                      },
                      id: null,
                      generator: false,
                      expression: false,
                      async: false,
                      params: [],
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
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
      });

    pass(`const x = x + 1;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `const x = x + 1;`,
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
                type: 'VariableDeclaration',
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
                declarations: [
                  {
                    type: 'VariableDeclarator',
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
                      type: 'BinaryExpression',
                      start: 10,
                      end: 15,
                      loc: {
                        start: {
                          line: 1,
                          column: 10
                        },
                        end: {
                          line: 1,
                          column: 15
                        }
                      },
                      left: {
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
                        name: 'x'
                      },
                      operator: '+',
                      right: {
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
                        value: 1,
                        raw: '1'
                      }
                    }
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
      });

    pass(`const { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `const { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };`,
          expected: {
            type: 'Program',
            start: 0,
            end: 80,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 80
              }
            },
            body: [
              {
                type: 'VariableDeclaration',
                start: 0,
                end: 80,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 80
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 79,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 79
                      }
                    },
                    id: {
                      type: 'ObjectPattern',
                      start: 6,
                      end: 47,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 47
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 8,
                          end: 45,
                          loc: {
                            start: {
                              line: 1,
                              column: 8
                            },
                            end: {
                              line: 1,
                              column: 45
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
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
                            name: 'w'
                          },
                          value: {
                            type: 'AssignmentPattern',
                            start: 11,
                            end: 45,
                            loc: {
                              start: {
                                line: 1,
                                column: 11
                              },
                              end: {
                                line: 1,
                                column: 45
                              }
                            },
                            left: {
                              type: 'ObjectPattern',
                              start: 11,
                              end: 22,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 11
                                },
                                end: {
                                  line: 1,
                                  column: 22
                                }
                              },
                              properties: [
                                {
                                  type: 'Property',
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
                                  method: false,
                                  shorthand: true,
                                  computed: false,
                                  key: {
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
                                    name: 'x'
                                  },
                                  kind: 'init',
                                  value: {
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
                                    name: 'x'
                                  }
                                },
                                {
                                  type: 'Property',
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
                                  method: false,
                                  shorthand: true,
                                  computed: false,
                                  key: {
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
                                    name: 'y'
                                  },
                                  kind: 'init',
                                  value: {
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
                                    name: 'y'
                                  }
                                },
                                {
                                  type: 'Property',
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
                                  method: false,
                                  shorthand: true,
                                  computed: false,
                                  key: {
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
                                    name: 'z'
                                  },
                                  kind: 'init',
                                  value: {
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
                                    name: 'z'
                                  }
                                }
                              ]
                            },
                            right: {
                              type: 'ObjectExpression',
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
                              properties: [
                                {
                                  type: 'Property',
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
                                  method: false,
                                  shorthand: false,
                                  computed: false,
                                  key: {
                                    type: 'Identifier',
                                    start: 27,
                                    end: 28,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 27
                                      },
                                      end: {
                                        line: 1,
                                        column: 28
                                      }
                                    },
                                    name: 'x'
                                  },
                                  value: {
                                    type: 'Literal',
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
                                    value: 4,
                                    raw: '4'
                                  },
                                  kind: 'init'
                                },
                                {
                                  type: 'Property',
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
                                  method: false,
                                  shorthand: false,
                                  computed: false,
                                  key: {
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
                                    name: 'y'
                                  },
                                  value: {
                                    type: 'Literal',
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
                                    value: 5,
                                    raw: '5'
                                  },
                                  kind: 'init'
                                },
                                {
                                  type: 'Property',
                                  start: 39,
                                  end: 43,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 39
                                    },
                                    end: {
                                      line: 1,
                                      column: 43
                                    }
                                  },
                                  method: false,
                                  shorthand: false,
                                  computed: false,
                                  key: {
                                    type: 'Identifier',
                                    start: 39,
                                    end: 40,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 39
                                      },
                                      end: {
                                        line: 1,
                                        column: 40
                                      }
                                    },
                                    name: 'z'
                                  },
                                  value: {
                                    type: 'Literal',
                                    start: 42,
                                    end: 43,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 42
                                      },
                                      end: {
                                        line: 1,
                                        column: 43
                                      }
                                    },
                                    value: 6,
                                    raw: '6'
                                  },
                                  kind: 'init'
                                }
                              ]
                            }
                          },
                          kind: 'init'
                        }
                      ]
                    },
                    init: {
                      type: 'ObjectExpression',
                      start: 50,
                      end: 79,
                      loc: {
                        start: {
                          line: 1,
                          column: 50
                        },
                        end: {
                          line: 1,
                          column: 79
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 52,
                          end: 77,
                          loc: {
                            start: {
                              line: 1,
                              column: 52
                            },
                            end: {
                              line: 1,
                              column: 77
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
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
                            name: 'w'
                          },
                          value: {
                            type: 'ObjectExpression',
                            start: 55,
                            end: 77,
                            loc: {
                              start: {
                                line: 1,
                                column: 55
                              },
                              end: {
                                line: 1,
                                column: 77
                              }
                            },
                            properties: [
                              {
                                type: 'Property',
                                start: 57,
                                end: 69,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 57
                                  },
                                  end: {
                                    line: 1,
                                    column: 69
                                  }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                  type: 'Identifier',
                                  start: 57,
                                  end: 58,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 57
                                    },
                                    end: {
                                      line: 1,
                                      column: 58
                                    }
                                  },
                                  name: 'x'
                                },
                                value: {
                                  type: 'Identifier',
                                  start: 60,
                                  end: 69,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 60
                                    },
                                    end: {
                                      line: 1,
                                      column: 69
                                    }
                                  },
                                  name: 'undefined'
                                },
                                kind: 'init'
                              },
                              {
                                type: 'Property',
                                start: 71,
                                end: 75,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 71
                                  },
                                  end: {
                                    line: 1,
                                    column: 75
                                  }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                  type: 'Identifier',
                                  start: 71,
                                  end: 72,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 71
                                    },
                                    end: {
                                      line: 1,
                                      column: 72
                                    }
                                  },
                                  name: 'z'
                                },
                                value: {
                                  type: 'Literal',
                                  start: 74,
                                  end: 75,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 74
                                    },
                                    end: {
                                      line: 1,
                                      column: 75
                                    }
                                  },
                                  value: 7,
                                  raw: '7'
                                },
                                kind: 'init'
                              }
                            ]
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
      });
});

});
