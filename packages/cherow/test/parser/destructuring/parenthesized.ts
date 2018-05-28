import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Destructuring - Parenthesized', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

    const invalidSyntax = [
      'var {(a)} = 0',
      'var {a:(b)} = 0',
      '({(a)} = 0)',
      '({a:(b = 0)} = 1)',
      '(new.target) = 1',
      '([a += a] = a)',
      'for (`a` of b);',
      '(`a`) => b;',
      '({ x }) = { x: 5 };',
      '({a}) = 1;',
      '(var {a:b} = {})',
      '({start, stop}) = othernode;',
      '{a, b} = {a: 1, b: 2}',
      '({a, b}) = {a: 1, b:2};',
      '({b}) = b;',
      '([b]) = b;',
      '({a}) = 2;',
      '([b]) = b;',
      'var [(a)] = 0',
      '[(a = 0)] = 1',
      '([{constructor(){}}] = b);',
      // doesn't fail in Acorn / Esprima / Espree and Babylon
      '({ src: ([dest]) } = obj)',
  ];

    for (const arg of invalidSyntax) {

      it(`${arg}`, () => {
          t.throws(() => {
              parseSource(`${arg}`, undefined, Context.Empty);
          });
      });
    }
  });

  describe('Pass', () => {

    const validSyntax = [
      '[(a)] = 0',
      '[(a) = 0] = 1',
      '[(a.b)] = 0',
      '({a:(b)} = 0)',
      '({a:(b) = 0} = 1)',
      '({a:(b.c)} = 0)',
      '({a:(b = 0)})',
  ];

    for (const arg of validSyntax) {

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
          parseSource(`${arg}`, undefined, Context.Empty);
      });
  });

    }

    pass('c = ({b} = b);', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'c = ({b} = b);',
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
              body: [
                {
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
                      name: 'c'
                    },
                    right: {
                      type: 'AssignmentExpression',
                      start: 5,
                      end: 12,
                      loc: {
                        start: {
                          line: 1,
                          column: 5
                        },
                        end: {
                          line: 1,
                          column: 12
                        }
                      },
                      operator: '=',
                      left: {
                        type: 'ObjectPattern',
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
                        properties: [
                          {
                            type: 'Property',
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
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
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
                              name: 'b'
                            },
                            kind: 'init',
                            value: {
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
                              name: 'b'
                            }
                          }
                        ]
                      },
                      right: {
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
                        name: 'b'
                      }
                    }
                  }
                }
              ],
              sourceType: 'script'
            }
      });

    pass('({b} = b);', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({b} = b);',
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
                  type: 'ExpressionStatement',
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
                  expression: {
                    type: 'AssignmentExpression',
                    start: 1,
                    end: 8,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 8
                      }
                    },
                    operator: '=',
                    left: {
                      type: 'ObjectPattern',
                      start: 1,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
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
                          method: false,
                          shorthand: true,
                          computed: false,
                          key: {
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
                            name: 'b'
                          },
                          kind: 'init',
                          value: {
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
                            name: 'b'
                          }
                        }
                      ]
                    },
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
                      name: 'b'
                    }
                  }
                }
              ],
              sourceType: 'script'
            }
      });

    pass('([b] = b);', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '([b] = b);',
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
                  type: 'ExpressionStatement',
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
                  expression: {
                    type: 'AssignmentExpression',
                    start: 1,
                    end: 8,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 8
                      }
                    },
                    operator: '=',
                    left: {
                      type: 'ArrayPattern',
                      start: 1,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      },
                      elements: [
                        {
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
                          name: 'b'
                        }
                      ]
                    },
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
                      name: 'b'
                    }
                  }
                }
              ],
              sourceType: 'script'
            }
      });

    pass('({a, b} = {a: 1, b: 2});', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({a, b} = {a: 1, b: 2});',
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
                  type: 'ExpressionStatement',
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
                  expression: {
                    type: 'AssignmentExpression',
                    start: 1,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    },
                    operator: '=',
                    left: {
                      type: 'ObjectPattern',
                      start: 1,
                      end: 7,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 7
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
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
                          method: false,
                          shorthand: true,
                          computed: false,
                          key: {
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
                            name: 'a'
                          },
                          kind: 'init',
                          value: {
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
                            name: 'a'
                          }
                        },
                        {
                          type: 'Property',
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
                          method: false,
                          shorthand: true,
                          computed: false,
                          key: {
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
                          },
                          kind: 'init',
                          value: {
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
                        }
                      ]
                    },
                    right: {
                      type: 'ObjectExpression',
                      start: 10,
                      end: 22,
                      loc: {
                        start: {
                          line: 1,
                          column: 10
                        },
                        end: {
                          line: 1,
                          column: 22
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
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
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
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
                          value: {
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
                          },
                          kind: 'init'
                        },
                        {
                          type: 'Property',
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
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
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
                          },
                          value: {
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
                            value: 2,
                            raw: '2'
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                }
              ],
              sourceType: 'script'
            }
      });

    pass('[a, b] = [1, 2]', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '[a, b] = [1, 2]',
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
                      type: 'ArrayPattern',
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
                      elements: [
                        {
                          type: 'Identifier',
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
                          },
                          name: 'a'
                        },
                        {
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
                        }
                      ]
                    },
                    right: {
                      type: 'ArrayExpression',
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
                      elements: [
                        {
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
                        {
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
                      ]
                    }
                  }
                }
              ],
              sourceType: 'script'
            }
      });

    pass('let {start, stop} = node;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'let {start, stop} = node;',
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
                      id: {
                        type: 'ObjectPattern',
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
                        properties: [
                          {
                            type: 'Property',
                            start: 5,
                            end: 10,
                            loc: {
                              start: {
                                line: 1,
                                column: 5
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
                              start: 5,
                              end: 10,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 10
                                }
                              },
                              name: 'start'
                            },
                            kind: 'init',
                            value: {
                              type: 'Identifier',
                              start: 5,
                              end: 10,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 10
                                }
                              },
                              name: 'start'
                            }
                          },
                          {
                            type: 'Property',
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
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
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
                              name: 'stop'
                            },
                            kind: 'init',
                            value: {
                              type: 'Identifier',
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
                              name: 'stop'
                            }
                          }
                        ]
                      },
                      init: {
                        type: 'Identifier',
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
                        name: 'node'
                      }
                    }
                  ],
                  kind: 'let'
                }
              ],
              sourceType: 'script'
            }
      });

    pass('({ responseText: text } = res)', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({ responseText: text } = res)',
          expected: {
              type: 'Program',
              start: 0,
              end: 30,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 30
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 30,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 30
                    }
                  },
                  expression: {
                    type: 'AssignmentExpression',
                    start: 1,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    },
                    operator: '=',
                    left: {
                      type: 'ObjectPattern',
                      start: 1,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 3,
                          end: 21,
                          loc: {
                            start: {
                              line: 1,
                              column: 3
                            },
                            end: {
                              line: 1,
                              column: 21
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 3,
                            end: 15,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 15
                              }
                            },
                            name: 'responseText'
                          },
                          value: {
                            type: 'Identifier',
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
                            name: 'text'
                          },
                          kind: 'init'
                        }
                      ]
                    },
                    right: {
                      type: 'Identifier',
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
                      name: 'res'
                    }
                  }
                }
              ],
              sourceType: 'script'
            }
      });

    pass('(a) = {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '(a) = {}',
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
              body: [
                {
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
                    type: 'AssignmentExpression',
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
                    operator: '=',
                    left: {
                      type: 'Identifier',
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
                      },
                      name: 'a'
                    },
                    right: {
                      type: 'ObjectExpression',
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
                    }
                  }
                }
              ],
              sourceType: 'script'
            }
      });

    pass('(a["b"]) = {} ', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '(a["b"]) = {}',
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
                      start: 1,
                      end: 7,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 7
                        }
                      },
                      object: {
                        type: 'Identifier',
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
                        },
                        name: 'a'
                      },
                      property: {
                        type: 'Literal',
                        start: 3,
                        end: 6,
                        loc: {
                          start: {
                            line: 1,
                            column: 3
                          },
                          end: {
                            line: 1,
                            column: 6
                          }
                        },
                        value: 'b',
                        raw: '"b"'
                      },
                      computed: true
                    },
                    right: {
                      type: 'ObjectExpression',
                      start: 11,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 11
                        },
                        end: {
                          line: 1,
                          column: 13
                        }
                      },
                      properties: []
                    }
                  }
                }
              ],
              sourceType: 'script'
            }
      });

    pass('(a.b) = {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '(a.b) = {}',
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
                  type: 'ExpressionStatement',
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
                  expression: {
                    type: 'AssignmentExpression',
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
                    operator: '=',
                    left: {
                      type: 'MemberExpression',
                      start: 1,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      },
                      object: {
                        type: 'Identifier',
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
                        },
                        name: 'a'
                      },
                      property: {
                        type: 'Identifier',
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
                        },
                        name: 'b'
                      },
                      computed: false
                    },
                    right: {
                      type: 'ObjectExpression',
                      start: 8,
                      end: 10,
                      loc: {
                        start: {
                          line: 1,
                          column: 8
                        },
                        end: {
                          line: 1,
                          column: 10
                        }
                      },
                      properties: []
                    }
                  }
                }
              ],
              sourceType: 'script'
            }
      });

    pass('test = { a: 1 }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'test = { a: 1 }',
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
                      name: 'test'
                    },
                    right: {
                      type: 'ObjectExpression',
                      start: 7,
                      end: 15,
                      loc: {
                        start: {
                          line: 1,
                          column: 7
                        },
                        end: {
                          line: 1,
                          column: 15
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 9,
                          end: 13,
                          loc: {
                            start: {
                              line: 1,
                              column: 9
                            },
                            end: {
                              line: 1,
                              column: 13
                            }
                          },
                          method: false,
                          shorthand: false,
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
                            name: 'a'
                          },
                          value: {
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
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                }
              ],
              sourceType: 'script'
            }
      });

    pass('(new f()[0]) = 1;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '(new f()[0]) = 1;',
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
              body: [{
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'AssignmentExpression',
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
                      operator: '=',
                      left: {
                          type: 'MemberExpression',
                          start: 1,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          object: {
                              type: 'NewExpression',
                              start: 1,
                              end: 8,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 8
                                  }
                              },
                              callee: {
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
                                  name: 'f'
                              },
                              arguments: []
                          },
                          property: {
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
                              value: 0,
                              raw: '0'
                          },
                          computed: true
                      },
                      right: {
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
              }],
              sourceType: 'script'
          }
      });

    pass('(new f().a) = 1;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '(new f().a) = 1;',
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
              body: [{
                  type: 'ExpressionStatement',
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
                          type: 'MemberExpression',
                          start: 1,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          },
                          object: {
                              type: 'NewExpression',
                              start: 1,
                              end: 8,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 8
                                  }
                              },
                              callee: {
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
                                  name: 'f'
                              },
                              arguments: []
                          },
                          property: {
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
                              name: 'a'
                          },
                          computed: false
                      },
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
              }],
              sourceType: 'script'
          }
      });

    pass('(f().a) = 1;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '(f().a) = 1;',
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
                      type: 'AssignmentExpression',
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
                      operator: '=',
                      left: {
                          type: 'MemberExpression',
                          start: 1,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          },
                          object: {
                              type: 'CallExpression',
                              start: 1,
                              end: 4,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 4
                                  }
                              },
                              callee: {
                                  type: 'Identifier',
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
                                  },
                                  name: 'f'
                              },
                              arguments: []
                          },
                          property: {
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
                              name: 'a'
                          },
                          computed: false
                      },
                      right: {
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
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('(obj[0]) = 1;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '(obj[0]) = 1;',
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
              body: [{
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
                      operator: '=',
                      left: {
                          type: 'MemberExpression',
                          start: 1,
                          end: 7,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 7
                              }
                          },
                          object: {
                              type: 'Identifier',
                              start: 1,
                              end: 4,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 4
                                  }
                              },
                              name: 'obj'
                          },
                          property: {
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
                          computed: true
                      },
                      right: {
                          type: 'Literal',
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
                          value: 1,
                          raw: '1'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('(obj.a) = 1;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '(obj.a) = 1;',
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
                      type: 'AssignmentExpression',
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
                      operator: '=',
                      left: {
                          type: 'MemberExpression',
                          start: 1,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          },
                          object: {
                              type: 'Identifier',
                              start: 1,
                              end: 4,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 4
                                  }
                              },
                              name: 'obj'
                          },
                          property: {
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
                              name: 'a'
                          },
                          computed: false
                      },
                      right: {
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
                      }
                  }
              }],
              sourceType: 'script'
          }
      });
  });
});
