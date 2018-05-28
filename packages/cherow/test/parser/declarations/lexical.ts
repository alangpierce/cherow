import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Declarations - Lexical', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

    fail('let {a: a} of []', Context.Empty, {
        source: 'let {a: a} of []',
    });

    fail('let {[Symbol.iterator]: a} of []', Context.Empty, {
        source: 'let {[Symbol.iterator]: a} of []',
    });

    fail('let {0: a} of []', Context.Empty, {
        source: 'let {0: a} of []',
    });

    fail('(let {"a": a = 1} of [])', Context.Empty, {
        source: '(let {"a": a = 1} of [])',
    });

    fail('let {0: a = 1} of []', Context.Empty, {
        source: 'let {0: a = 1} of []',
    });

    fail('const [a] of []', Context.Empty, {
        source: 'const [a] of []',
    });

    fail('const {0: a} of []', Context.Empty, {
        source: 'const {0: a} of []',
    });

    fail('const {a: a = 1} of []', Context.Empty, {
        source: 'const {a: a = 1} of []',
    });

    // fail('while(true) let[a] = 0', Context.Empty, {
       //  source: 'while(true) let[a] = 0',
    // });

    fail('a: let a', Context.Empty, {
        source: 'a: let a',
    });

    fail('with(true) class a {}', Context.Empty, {
        source: 'with(true) class a {}',
    });

    fail('const const;', Context.Empty, {
        source: 'const const;',
    });

    fail('for (const let = 1;;;) {}', Context.Empty, {
        source: 'for (const let = 1;;;) {}',
    });

    fail('for (let let;;;) {}', Context.Empty, {
        source: 'for (let let;;;) {}',
    });

    fail('for (let [let];;;) {}', Context.Empty, {
        source: 'for (let [let];;;) {}',
    });

    fail('for (let x, y, z, let = 1;;;) {}', Context.Empty, {
        source: 'for (let x, y, z, let = 1;;;) {}',
    });

    fail('for (let [let];;;) {}', Context.Empty, {
        source: 'for (let [let];;;) {}',
    });

    fail('for (let x = 0 in y){}', Context.Empty, {
        source: 'for (let x = 0 in y){}',
    });

    fail('"use strict"; const const = 1;', Context.Empty, {
        source: '"use strict"; const const = 1;',
    });

    fail('let x,;', Context.Empty, {
        source: 'let x,;',
    });

    fail('"use strict"; const let = 1;', Context.Empty, {
        source: '"use strict"; const let = 1;',
    });

    fail(`let x,
    y = 3,`, Context.Empty, {
        source: `let x,
        y = 3,`,
    });

    fail('const x = 0,', Context.Empty, {
        source: 'const x = 0,',
    });

    fail('const x = 0, y = 1,;', Context.Empty, {
        source: 'const x = 0, y = 1,;',
    });

    fail(`const x = 0,
    y = 1,`, Context.Empty, {
        source: `const x = 0,
        y = 1,`,
    });
  });

  describe('Pass', () => {

    pass(`let a`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `let a`,
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
            body: [
              {
                type: 'VariableDeclaration',
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
                      name: 'a'
                    },
                    init: null
                  }
                ],
                kind: 'let'
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`{ let a; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `{ let a; }`,
        expected: {
            type: 'Program',
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
            body: [
              {
                type: 'BlockStatement',
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
                body: [
                  {
                    type: 'VariableDeclaration',
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
                    declarations: [
                      {
                        type: 'VariableDeclarator',
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
                        init: null
                      }
                    ],
                    kind: 'let'
                  }
                ]
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`while(true) var a`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `while(true) var a`,
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
                type: 'WhileStatement',
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
                test: {
                  type: 'Literal',
                  start: 6,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 10
                    }
                  },
                  value: true,
                  raw: 'true'
                },
                body: {
                  type: 'VariableDeclaration',
                  start: 12,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
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
                        name: 'a'
                      },
                      init: null
                    }
                  ],
                  kind: 'var'
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`let a = 123`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `let a = 123`,
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
            body: [
              {
                type: 'VariableDeclaration',
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
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 4,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 4
                      },
                      end: {
                        line: 1,
                        column: 11
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
                      name: 'a'
                    },
                    init: {
                      type: 'Literal',
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
                      value: 123,
                      raw: '123'
                    }
                  }
                ],
                kind: 'let'
              }
            ],
            sourceType: 'script'
          }
      });

    pass(`let;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `let;`,
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
              type: 'Identifier',
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
              name: 'let'
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`let.let = foo`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `let.let = foo`,
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
        body: [
          {
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
              type: 'AssignmentExpression',
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
              operator: '=',
              left: {
                type: 'MemberExpression',
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
                object: {
                  type: 'Identifier',
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
                  name: 'let'
                },
                property: {
                  type: 'Identifier',
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
                  name: 'let'
                },
                computed: false
              },
              right: {
                type: 'Identifier',
                start: 10,
                end: 13,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 13
                  }
                },
                name: 'foo'
              }
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`function foo() { for (let in x) {} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `function foo() { for (let in x) {} }`,
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
          line: 1,
          column: 36
        }
      },
      body: [
        {
          type: 'FunctionDeclaration',
          start: 0,
          end: 36,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 36
            }
          },
          id: {
            type: 'Identifier',
            start: 9,
            end: 12,
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 12
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
            start: 15,
            end: 36,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 36
              }
            },
            body: [
              {
                type: 'ForInStatement',
                start: 17,
                end: 34,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 34
                  }
                },
                left: {
                  type: 'Identifier',
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
                  name: 'let'
                },
                right: {
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
                  name: 'x'
                },
                body: {
                  type: 'BlockStatement',
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
                  body: []
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  });

    pass(`for (let in x) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `for (let in x) {}`,
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
            type: 'ForInStatement',
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
            left: {
              type: 'Identifier',
              start: 5,
              end: 8,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 8
                }
              },
              name: 'let'
            },
            right: {
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
              name: 'x'
            },
            body: {
              type: 'BlockStatement',
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
              body: []
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`switch (answer) { case 42: let t = 42; break; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `switch (answer) { case 42: let t = 42; break; }`,
    expected: {
        type: 'Program',
        start: 0,
        end: 47,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 47
          }
        },
        body: [
          {
            type: 'SwitchStatement',
            start: 0,
            end: 47,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 47
              }
            },
            discriminant: {
              type: 'Identifier',
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
              name: 'answer'
            },
            cases: [
              {
                type: 'SwitchCase',
                start: 18,
                end: 45,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 45
                  }
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    start: 27,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 27
                      },
                      end: {
                        line: 1,
                        column: 38
                      }
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 31,
                        end: 37,
                        loc: {
                          start: {
                            line: 1,
                            column: 31
                          },
                          end: {
                            line: 1,
                            column: 37
                          }
                        },
                        id: {
                          type: 'Identifier',
                          start: 31,
                          end: 32,
                          loc: {
                            start: {
                              line: 1,
                              column: 31
                            },
                            end: {
                              line: 1,
                              column: 32
                            }
                          },
                          name: 't'
                        },
                        init: {
                          type: 'Literal',
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
                          value: 42,
                          raw: '42'
                        }
                      }
                    ],
                    kind: 'let'
                  },
                  {
                    type: 'BreakStatement',
                    start: 39,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 39
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    },
                    label: null
                  }
                ],
                test: {
                  type: 'Literal',
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
                  value: 42,
                  raw: '42'
                }
              }
            ]
          }
        ],
        sourceType: 'script'
      }
  });
  });
});
