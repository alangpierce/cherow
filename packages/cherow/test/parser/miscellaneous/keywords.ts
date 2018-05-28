import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Keywords', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const programs = [
            'break = 1;',
            'case = 1;',
            'continue = 1;',
            'default = 1;',
            'function = 1;',
            'this = 1;',
            'var = 1;',
            'void = 1;',
            'with = 1;',
            'in = 1;',
            'var = 1;',
            'class',
            'if',
            'continue',
            'for',
            'switch',
            'while = 1;',
            'try = 1;'
        ];

        for (const arg of programs) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`var ${arg}`, () => {
                t.throws(() => {
                    parseSource(`var ${arg}`, undefined, Context.Empty);
                });
            });

            it(`function () { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`function () { ${arg} }`, undefined, Context.Empty);
                });
            });
        }

        fail('do = 1;', Context.Empty, {
            source: 'do = 1;'
        });

        fail('else = 1;', Context.Empty, {
            source: 'do = 1;'
        });
    });

    describe('Pass', () => {

        pass(`var foo = {}; foo.if;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var foo = {}; foo.if;',
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
                body: [
                  {
                    type: 'VariableDeclaration',
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
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 12,
                        loc: {
                          start: {
                            line: 1,
                            column: 4
                          },
                          end: {
                            line: 1,
                            column: 12
                          }
                        },
                        id: {
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
                          name: 'foo'
                        },
                        init: {
                          type: 'ObjectExpression',
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
                          properties: []
                        }
                      }
                    ],
                    kind: 'var'
                  },
                  {
                    type: 'ExpressionStatement',
                    start: 14,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 21
                      }
                    },
                    expression: {
                      type: 'MemberExpression',
                      start: 14,
                      end: 20,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 20
                        }
                      },
                      object: {
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
                      },
                      property: {
                        type: 'Identifier',
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
                        name: 'if'
                      },
                      computed: false
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`var foo = {}; foo.super;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var foo = {}; foo.super;',
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
                    type: 'VariableDeclaration',
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
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 12,
                        loc: {
                          start: {
                            line: 1,
                            column: 4
                          },
                          end: {
                            line: 1,
                            column: 12
                          }
                        },
                        id: {
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
                          name: 'foo'
                        },
                        init: {
                          type: 'ObjectExpression',
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
                          properties: []
                        }
                      }
                    ],
                    kind: 'var'
                  },
                  {
                    type: 'ExpressionStatement',
                    start: 14,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    },
                    expression: {
                      type: 'MemberExpression',
                      start: 14,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      },
                      object: {
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
                      },
                      property: {
                        type: 'Identifier',
                        start: 18,
                        end: 23,
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 23
                          }
                        },
                        name: 'super'
                      },
                      computed: false
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`var foo = {}; foo.arguments;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var foo = {}; foo.arguments;',
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
                body: [
                  {
                    type: 'VariableDeclaration',
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
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 12,
                        loc: {
                          start: {
                            line: 1,
                            column: 4
                          },
                          end: {
                            line: 1,
                            column: 12
                          }
                        },
                        id: {
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
                          name: 'foo'
                        },
                        init: {
                          type: 'ObjectExpression',
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
                          properties: []
                        }
                      }
                    ],
                    kind: 'var'
                  },
                  {
                    type: 'ExpressionStatement',
                    start: 14,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 28
                      }
                    },
                    expression: {
                      type: 'MemberExpression',
                      start: 14,
                      end: 27,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 27
                        }
                      },
                      object: {
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
                      },
                      property: {
                        type: 'Identifier',
                        start: 18,
                        end: 27,
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 27
                          }
                        },
                        name: 'arguments'
                      },
                      computed: false
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`var foo = {}; foo.interface;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var foo = {}; foo.interface;',
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
                body: [
                  {
                    type: 'VariableDeclaration',
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
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 12,
                        loc: {
                          start: {
                            line: 1,
                            column: 4
                          },
                          end: {
                            line: 1,
                            column: 12
                          }
                        },
                        id: {
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
                          name: 'foo'
                        },
                        init: {
                          type: 'ObjectExpression',
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
                          properties: []
                        }
                      }
                    ],
                    kind: 'var'
                  },
                  {
                    type: 'ExpressionStatement',
                    start: 14,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 28
                      }
                    },
                    expression: {
                      type: 'MemberExpression',
                      start: 14,
                      end: 27,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 27
                        }
                      },
                      object: {
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
                      },
                      property: {
                        type: 'Identifier',
                        start: 18,
                        end: 27,
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 27
                          }
                        },
                        name: 'interface'
                      },
                      computed: false
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`function *a(){({yi\\u0065ld: 0})}`, Context.OptionsRanges | Context.OptionsNext, {
            source: 'function *a(){({yi\\u0065ld: 0})}',
            expected: {
                body: [{
                    async: false,
                    body: {
                        body: [{
                            end: 31,
                            expression: {
                                end: 30,
                                properties: [{
                                    computed: false,
                                    end: 29,
                                    key: {
                                        end: 26,
                                        name: 'yield',
                                        start: 16,
                                        type: 'Identifier',
                                    },
                                    kind: 'init',
                                    method: false,
                                    shorthand: false,
                                    start: 16,
                                    type: 'Property',
                                    value: {
                                        end: 29,
                                        start: 28,
                                        type: 'Literal',
                                        value: 0,
                                    }
                                }],
                                start: 15,
                                type: 'ObjectExpression',
                            },
                            start: 14,
                            type: 'ExpressionStatement'
                        }, ],
                        end: 32,
                        start: 13,
                        type: 'BlockStatement'
                    },
                    end: 32,
                    expression: false,
                    generator: true,
                    id: {
                        end: 11,
                        name: 'a',
                        start: 10,
                        type: 'Identifier'
                    },
                    params: [],
                    start: 0,
                    type: 'FunctionDeclaration'
                }],
                end: 32,
                sourceType: 'script',
                start: 0,
                type: 'Program'
            }
        });
    });
});
