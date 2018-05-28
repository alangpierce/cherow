import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Unicode', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [
        'var foob\\u123r = 0;',
        'var \\u123roo = 0;',
        '"foob\\u123rr"',
        '/regex/\\u0069g',
        '/regex/\\u006g',
        'var foob\\u{c481r = 0;',
        'var foob\\uc481}r = 0;',
        'var \\u{0052oo = 0;',
        'var \\u0052}oo = 0;',
        '"foob\\u{c481r"',
        'var foob\\u{}ar = 0;',
        '"\\u{110000}"',
        'var foob\\v1234r = 0;',
        'var foob\\U1234r = 0;',
       'var foob\\v{1234}r = 0;',
       'var foob\\U{1234}r = 0;'
    ];

        for (const arg of invalidSyntax) {

        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });

        it(`"use strict"; ${arg}`, () => {
            t.throws(() => {
                parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
            });
        });
    }

        fail('no digits', Context.Empty, {
          source: '\\u{}',
      });

        fail('out of range', Context.Empty, {
          source: '\\u{125400}',
      });
    });

    describe('Pass', () => {

        const validSyntax = [
       'var \\u0052oo = 0;',
       'var \\u{0052}oo = 0;',
       'var \\u{52}oo = 0;',
       'var \\u{00000000052}oo = 0;',
       'var foob\\uc481r = 0;',
       'var foob\\u{c481}r = 0;',
       '"foob\\uc481r"',
       '"foob\\{uc481}r"',
       '"foo\\u{10e6d}"',
       '"\\u{10ffff}"',
        ];

        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; ${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });
        }

        pass(`"T\\u203F = []"`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '"T\\u203F = []"',
          expected: {
              body: [
                {
                  directive: 'T\\u203F = []',
                  end: 14,
                  expression: {
                    end: 14,
                    loc: {
                      end: {
                        column: 14,
                        line: 1,
                      },
                      start: {
                        column: 0,
                        line: 1,
                      }
                    },
                    raw: '"T\\u203F = []"',
                    start: 0,
                    type: 'Literal',
                    value: 'T‿ = []',
                  },
                  loc: {
                    end: {
                      column: 14,
                      line: 1,
                    },
                    start: {
                      column: 0,
                      line: 1,
                    }
                  },
                  start: 0,
                  type: 'ExpressionStatement'
                }
              ],
              end: 14,
              loc: {
                end: {
                  column: 14,
                  line: 1,
                },
                start: {
                  column: 0,
                  line: 1,
                }
              },
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
      });

        pass(`"T\\u200C";`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '"T\\u200C";',
          expected: {
              body: [
                {
                  directive: 'T\\u200C',
                  end: 10,
                  expression: {
                    end: 9,
                    loc: {
                      end: {
                        column: 9,
                        line: 1,
                      },
                      start: {
                        column: 0,
                        line: 1,
                      }
                    },
                    raw: '"T\\u200C"',
                    start: 0,
                    type: 'Literal',
                    value: 'T‌',
                  },
                  loc: {
                    end: {
                      column: 10,
                      line: 1,
                    },
                    start: {
                      column: 0,
                      line: 1,
                    }
                  },
                 start: 0,
                  type: 'ExpressionStatement'
                }
              ],
              end: 10,
              loc: {
                end: {
                  column: 10,
                  line: 1,
                },
                start: {
                  column: 0,
                  line: 1,
                }
              },
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
      });

        pass(`"\\u2163\\u2161"'`, Context.Empty, {
          source: '"\\u2163\\u2161"',
          expected: {
              body: [
                {
                 directive: '\\u2163\\u2161',
                  expression: {
                    type: 'Literal',
                    value: 'ⅣⅡ',
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
      });

        pass(`"\\u2163\\u2161\\u200A; \\u2009"`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '"\\u2163\\u2161\\u200A; \\u2009"',
          expected: {
              body: [{
                  directive: '\\u2163\\u2161\\u200A; \\u2009',
                  end: 28,
                  expression: {
                      end: 28,
                      loc: {
                          end: {
                              column: 28,
                              line: 1,
                          },
                          start: {
                              column: 0,
                              line: 1,
                          }
                      },
                      raw: '"\\u2163\\u2161\\u200A; \\u2009"',
                      start: 0,
                      type: 'Literal',
                      value: 'ⅣⅡ ;  ',
                  },
                  loc: {
                      end: {
                          column: 28,
                          line: 1,
                      },
                      start: {
                          column: 0,
                          line: 1,
                      }
                  },
                  start: 0,
                  type: 'ExpressionStatement',
              }, ],
              end: 28,
              loc: {
                  end: {
                      column: 28,
                      line: 1,
                  },
                  start: {
                      column: 0,
                      line: 1,
                  }
              },
              sourceType: 'script',
              start: 0,
              type: 'Program'
          }
      });

        pass(`var source = "\\u{00000000034}";`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: 'var source = "\\u{00000000034}";',
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
              body: [{
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
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 30,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 30
                          }
                      },
                      id: {
                          type: 'Identifier',
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
                          name: 'source'
                      },
                      init: {
                          type: 'Literal',
                          start: 13,
                          end: 30,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 13
                              },
                              end: {
                                  line: 1,
                                  column: 30
                              }
                          },
                          value: '4',
                          raw: '"\\u{00000000034}"'
                      }
                  }],
                  kind: 'var'
              }],
              sourceType: 'script'
          }
      });

        pass(`"\\u{20BB7}\\u{91CE}\\u{5BB6}"`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '"\\u{20BB7}\\u{91CE}\\u{5BB6}"',
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
              body: [{
                  type: 'ExpressionStatement',
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
                  directive: '\\u{20BB7}\\u{91CE}\\u{5BB6}',
                  expression: {
                      type: 'Literal',
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
                      value: '𠮷野家',
                      raw: '"\\u{20BB7}\\u{91CE}\\u{5BB6}"'
                  }
              }],
              sourceType: 'script'
          }
      });
    });
    });
