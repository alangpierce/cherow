import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Statements - Return', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

      fail('return;', Context.Empty, {
          source: 'return;',
      });

      fail('{ return; }', Context.Empty, {
        source: '{ return; }',
    });

      fail('if (false) { return; }', Context.Empty, {
        source: 'if (false) { return; }',
    });

      fail('do { return; } while(0);', Context.Empty, {
        source: 'do { return; } while(0);',
    });

  });

  describe('Pass', () => {

      pass(`(function(){ return })`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `(function(){ return })`,
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
            body: [
              {
                type: 'ExpressionStatement',
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
                expression: {
                  type: 'FunctionExpression',
                  start: 1,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 21
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
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 21
                      }
                    },
                    body: [
                      {
                        type: 'ReturnStatement',
                        start: 13,
                        end: 19,
                        loc: {
                          start: {
                            line: 1,
                            column: 13
                          },
                          end: {
                            line: 1,
                            column: 19
                          }
                        },
                        argument: null
                      }
                    ]
                  }
                }
              }
            ],
            sourceType: 'script'
          }

      });

      pass(`(function(){ return; })`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `(function(){ return; })`,
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
                type: 'ExpressionStatement',
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
                expression: {
                  type: 'FunctionExpression',
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
                  id: null,
                  generator: false,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
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
                    body: [
                      {
                        type: 'ReturnStatement',
                        start: 13,
                        end: 20,
                        loc: {
                          start: {
                            line: 1,
                            column: 13
                          },
                          end: {
                            line: 1,
                            column: 20
                          }
                        },
                        argument: null
                      }
                    ]
                  }
                }
              }
            ],
            sourceType: 'script'
          }

    });

      pass(`(function(){ return x; })`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `(function(){ return x; })`,
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
                type: 'ExpressionStatement',
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
                expression: {
                  type: 'FunctionExpression',
                  start: 1,
                  end: 24,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
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
                    body: [
                      {
                        type: 'ReturnStatement',
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
                        argument: {
                          type: 'Identifier',
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
                          name: 'x'
                        }
                      }
                    ]
                  }
                }
              }
            ],
            sourceType: 'script'
          }

    });

      pass(`(function(){ return x * y })`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `(function(){ return x * y })`,
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
                type: 'ExpressionStatement',
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
                expression: {
                  type: 'FunctionExpression',
                  start: 1,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 27
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
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    },
                    body: [
                      {
                        type: 'ReturnStatement',
                        start: 13,
                        end: 25,
                        loc: {
                          start: {
                            line: 1,
                            column: 13
                          },
                          end: {
                            line: 1,
                            column: 25
                          }
                        },
                        argument: {
                          type: 'BinaryExpression',
                          start: 20,
                          end: 25,
                          loc: {
                            start: {
                              line: 1,
                              column: 20
                            },
                            end: {
                              line: 1,
                              column: 25
                            }
                          },
                          left: {
                            type: 'Identifier',
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
                            name: 'x'
                          },
                          operator: '*',
                          right: {
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
                            name: 'y'
                          }
                        }
                      }
                    ]
                  }
                }
              }
            ],
            sourceType: 'script'
          }

    });

      pass(`_ => { return 0; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `_ => { return 0; }`,
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
                type: 'ExpressionStatement',
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
                expression: {
                  type: 'ArrowFunctionExpression',
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
                  id: null,
                  generator: false,
                  expression: false,
                  async: false,
                  params: [
                    {
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
                      name: '_'
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    start: 5,
                    end: 18,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 18
                      }
                    },
                    body: [
                      {
                        type: 'ReturnStatement',
                        start: 7,
                        end: 16,
                        loc: {
                          start: {
                            line: 1,
                            column: 7
                          },
                          end: {
                            line: 1,
                            column: 16
                          }
                        },
                        argument: {
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
                          value: 0,
                          raw: '0'
                        }
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

});
