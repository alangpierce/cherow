import { pass } from '../../test-utils';
import { Context } from '../../../src/utilities';

// A number of slash-disambiguation corner cases
describe('Miscellaneous - Slash', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

      pass(`+{} / 2`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '+{} / 2',
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
            body: [
              {
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
                    type: 'UnaryExpression',
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
                    operator: '+',
                    prefix: true,
                    argument: {
                      type: 'ObjectExpression',
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
                      properties: []
                    }
                  },
                  operator: '/',
                  right: {
                    type: 'Literal',
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
                    value: 2,
                    raw: '2'
                  }
                }
              }
            ],
            sourceType: 'script'
          }
      });
/*
      pass(`while (1) /foo/`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'while (1) /foo/',
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
                type: 'WhileStatement',
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
                test: {
                  type: 'Literal',
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
                  value: 1,
                  raw: '1'
                },
                body: {
                  type: 'ExpressionStatement',
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
                  expression: {
                    type: 'Literal',
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
                    value: {},
                    raw: '/foo/',
                    regex: {
                      pattern: 'foo',
                      flags: ''
                    }
                  }
                }
              }
            ],
            sourceType: 'script'
          }
      });
*/
      pass(`(1) / 2`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '(1) / 2',
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
            body: [
              {
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
                    type: 'Literal',
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
                    value: 1,
                    raw: '1'
                  },
                  operator: '/',
                  right: {
                    type: 'Literal',
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
                    value: 2,
                    raw: '2'
                  }
                }
              }
            ],
            sourceType: 'script'
          }
      });

      pass(`+x++ / 2`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '+x++ / 2',
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
                    type: 'UnaryExpression',
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
                    operator: '+',
                    prefix: true,
                    argument: {
                      type: 'UpdateExpression',
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
                      operator: '++',
                      prefix: false,
                      argument: {
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
                        name: 'x'
                      }
                    }
                  },
                  operator: '/',
                  right: {
                    type: 'Literal',
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
                    value: 2,
                    raw: '2'
                  }
                }
              }
            ],
            sourceType: 'script'
          }
      });

      pass(`x = {foo: function x() {} / divide}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'x = {foo: function x() {} / divide}',
          expected: {
            type: 'Program',
            start: 0,
            end: 35,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 35
              }
            },
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                },
                expression: {
                  type: 'AssignmentExpression',
                  start: 0,
                  end: 35,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 35
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
                    name: 'x'
                  },
                  right: {
                    type: 'ObjectExpression',
                    start: 4,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 4
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    },
                    properties: [
                      {
                        type: 'Property',
                        start: 5,
                        end: 34,
                        loc: {
                          start: {
                            line: 1,
                            column: 5
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
                          name: 'foo'
                        },
                        value: {
                          type: 'BinaryExpression',
                          start: 10,
                          end: 34,
                          loc: {
                            start: {
                              line: 1,
                              column: 10
                            },
                            end: {
                              line: 1,
                              column: 34
                            }
                          },
                          left: {
                            type: 'FunctionExpression',
                            start: 10,
                            end: 25,
                            loc: {
                              start: {
                                line: 1,
                                column: 10
                              },
                              end: {
                                line: 1,
                                column: 25
                              }
                            },
                            id: {
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
                              name: 'x'
                            },
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
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
                              body: []
                            }
                          },
                          operator: '/',
                          right: {
                            type: 'Identifier',
                            start: 28,
                            end: 34,
                            loc: {
                              start: {
                                line: 1,
                                column: 28
                              },
                              end: {
                                line: 1,
                                column: 34
                              }
                            },
                            name: 'divide'
                          }
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
    });
