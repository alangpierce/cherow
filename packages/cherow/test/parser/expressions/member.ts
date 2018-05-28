import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Expressions - Member', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  pass(`a[b, c]`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `a[b, c]`,
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
          body: [{
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
                      name: 'a'
                  },
                  property: {
                      type: 'SequenceExpression',
                      start: 2,
                      end: 6,
                      loc: {
                          start: {
                              line: 1,
                              column: 2
                          },
                          end: {
                              line: 1,
                              column: 6
                          }
                      },
                      expressions: [{
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
                          {
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
                              name: 'c'
                          }
                      ]
                  },
                  computed: true
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`(a[b]||(c[d]=e))`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `(a[b]||(c[d]=e))`,
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
                  type: 'LogicalExpression',
                  start: 1,
                  end: 15,
                  loc: {
                      start: {
                          line: 1,
                          column: 1
                      },
                      end: {
                          line: 1,
                          column: 15
                      }
                  },
                  left: {
                      type: 'MemberExpression',
                      start: 1,
                      end: 5,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 5
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
                      computed: true
                  },
                  operator: '||',
                  right: {
                      type: 'AssignmentExpression',
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
                      operator: '=',
                      left: {
                          type: 'MemberExpression',
                          start: 8,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          object: {
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
                              name: 'c'
                          },
                          property: {
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
                              name: 'd'
                          },
                          computed: true
                      },
                      right: {
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
                          name: 'e'
                      }
                  }
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`a&&(b=c)&&(d=e)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `a&&(b=c)&&(d=e)`,
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
                  type: 'LogicalExpression',
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
                  left: {
                      type: 'LogicalExpression',
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
                          name: 'a'
                      },
                      operator: '&&',
                      right: {
                          type: 'AssignmentExpression',
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
                          operator: '=',
                          left: {
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
                          },
                          right: {
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
                              name: 'c'
                          }
                      }
                  },
                  operator: '&&',
                  right: {
                      type: 'AssignmentExpression',
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
                      operator: '=',
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
                          name: 'd'
                      },
                      right: {
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
                          name: 'e'
                      }
                  }
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`a.$._.B0`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `a.$._.B0`,
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
          body: [{
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
                  type: 'MemberExpression',
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
                  object: {
                      type: 'MemberExpression',
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
                      object: {
                          type: 'MemberExpression',
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
                          object: {
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
                              name: 'a'
                          },
                          property: {
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
                              name: '$'
                          },
                          computed: false
                      },
                      property: {
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
                          name: '_'
                      },
                      computed: false
                  },
                  property: {
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
                      name: 'B0'
                  },
                  computed: false
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`a.if`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `a.if`,
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
          body: [{
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
                  type: 'MemberExpression',
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
                  object: {
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
                      name: 'a'
                  },
                  property: {
                      type: 'Identifier',
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
                      },
                      name: 'if'
                  },
                  computed: false
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`a.false`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `a.false`,
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
          body: [{
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
                      name: 'a'
                  },
                  property: {
                      type: 'Identifier',
                      start: 2,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 2
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      name: 'false'
                  },
                  computed: false
              }
          }],
          sourceType: 'script'
      }
  });
});
