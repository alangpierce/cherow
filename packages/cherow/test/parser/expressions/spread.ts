import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Spread', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

    const invalidSyntax = [
      '(...[1, 2, 3])',
      'return ...[1,2,3];',
      'var ...x = [1,2,3];',
      'var [...x,] = [1,2,3];',
      'var [...x, y] = [1,2,3];',
      'var { x } = {x: ...[1,2,3]}',
      '[...]',
      '[a, ...]',
      '[..., ]',
      '[..., ...]',
      '[ (...a)]',
      // Two spreads combined is a syntax error
      'var a = []; [......a];',
      'function foo(){};var a = []; foo(......a);'
  ];
    for (const arg of invalidSyntax) {

      it(`function fn() { 'use strict';} fn(${arg});`, () => {
          t.throws(() => {
              parseSource(`function fn() { 'use strict';} fn(${arg});`, undefined, Context.OptionsNext | Context.Module);
          });
      });

      it(`function fn() {} fn(${arg});`, () => {
        t.throws(() => {
            parseSource(`function fn() { 'use strict';} fn(${arg});`, undefined, Context.OptionsNext | Context.Module);
        });
    });
    }

    fail('0, [...x, y] = [];', Context.Empty, {
          source: '0, [...x, y] = [];',
      });

    fail('[...]', Context.Empty, {
          source: '[...]',
      });

    fail('[a, ...]', Context.Empty, {
          source: '[a, ...]',
      });

    fail('[..., ]', Context.Empty, {
          source: '[..., ]',
      });

    fail('[..., ...]', Context.Empty, {
          source: '[..., ...]',
      });

    fail('[ (...a)]', Context.Empty, {
          source: '[ (...a)]',
      });

  });

  describe('Pass', () => {

    const validSyntax = [
      '[...a]',
      '[a, ...b]',
      '[...a,]',
      '[...a, ,]',
      '[, ...a]',
      '[...a, ...b]',
      '[...a, , ...b]',
      '[...[...a]]',
      '[, ...a]',
      '[, , ...a]',
      '[...[1, 2], ...b, ...[], ...[...d]]',
      '[...[], ...icefapper[2], ...[], ...c]',
      '[...a, ...b, ...c, 4, 5, 6]',
      '...[...a, ...b, ...c], 4',
      '[..."string"]',
      '[...[...[,,1,,2,3], ...[1, 2, 3], 3]]',
      '...([1, 2, 3])',
      '...[]',
      '...[], ...[]',
      '...[], ...[], ...[]',
      '...[], ...[], ...[], ...[]',
      '...[], ...["123123"]',
      '...[], ...["123123"], ...[]',
      '...[], ...[], ...[], ...[], ...["123123"]',
      '...["123123"], ...[], ...[], ...[], ...[]',
      '...[], ...["123123"]',
      '...[]',
      '...[]',
      '...[]',
      '...\'123\', ...\'456\'',
                      '...new Set([1, 2, 3]), 4',
                      '1, ...[2, 3], 4',
                      '...Array(...[1,2,3,4])',
                      '...NaN',
                      '0, 1, ...[2, 3, 4], 5, 6, 7, ...\'89\'',
                      '0, 1, ...[2, 3, 4], 5, 6, 7, ...\'89\', 10',
                      '...[0, 1, 2], 3, 4, 5, 6, ...\'7\', 8, 9',
                      '...[0, 1, 2], 3, 4, 5, 6, ...\'7\', 8, 9, ...[10]',
  ];
    for (const arg of validSyntax) {

      it(`function fn() { 'use strict';} fn(${arg});`, () => {
          t.doesNotThrow(() => {
              parseSource(`function fn() { 'use strict';} fn(${arg});`, undefined, Context.OptionsNext | Context.Module);
          });
      });

      it(`function fn() {} fn(${arg});`, () => {
        t.doesNotThrow(() => {
            parseSource(`function fn() { 'use strict';} fn(${arg});`, undefined, Context.OptionsNext | Context.Module);
        });
    });
    }

    pass(`[...a]`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `[...a]`,
          expected: {
              type: 'Program',
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
              body: [
                {
                  type: 'ExpressionStatement',
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
                  expression: {
                    type: 'ArrayExpression',
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
                        type: 'SpreadElement',
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
                        argument: {
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
                        }
                      }
                    ]
                  }
                }
              ],
              sourceType: 'script'
            }
      });

    pass('[...a, , ...b]', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '[...a, , ...b]',
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
                    type: 'ArrayExpression',
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
                    elements: [
                      {
                        type: 'SpreadElement',
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
                        argument: {
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
                        }
                      },
                      null,
                      {
                        type: 'SpreadElement',
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
                        argument: {
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
                          name: 'b'
                        }
                      }
                    ]
                  }
                }
              ],
              sourceType: 'script'
            }
      });

    pass('[...[...a]]', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '[...[...a]]',
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
                  type: 'ExpressionStatement',
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
                  expression: {
                    type: 'ArrayExpression',
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
                    elements: [
                      {
                        type: 'SpreadElement',
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
                        argument: {
                          type: 'ArrayExpression',
                          start: 4,
                          end: 10,
                          loc: {
                            start: {
                              line: 1,
                              column: 4
                            },
                            end: {
                              line: 1,
                              column: 10
                            }
                          },
                          elements: [
                            {
                              type: 'SpreadElement',
                              start: 5,
                              end: 9,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 9
                                }
                              },
                              argument: {
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
                                name: 'a'
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ],
              sourceType: 'script'
            }
      });
  });

  pass('[, , ...a]', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: '[, , ...a]',
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
                type: 'ArrayExpression',
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
                elements: [
                  null,
                  null,
                  {
                    type: 'SpreadElement',
                    start: 5,
                    end: 9,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 9
                      }
                    },
                    argument: {
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
                      name: 'a'
                    }
                  }
                ]
              }
            }
          ],
          sourceType: 'script'
        }
  });
});
