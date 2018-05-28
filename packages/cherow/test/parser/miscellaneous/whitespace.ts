import { pass } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Whitespace', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

      const invalidSyntax = [
        'var\\u0009x;',
        'var\\u000Bx;',
        'var\\u000Bx;',
        'var\\u00A0x;',
        '\\u000Bstr\\u000Bing\\u000B',
        '\\u00A0var\\u00A0x\\u00A0=\\u00A01\\u00A0; result = x;',
        'var᠎foo;',
        'throw /* \n */ e',
        'throw /* \u2028 */ e',
        'throw /* \u2029 */ e',
        'new\u180Ea',
        'new\u0020\u0009\u000B\u000C\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\uFEFFa',
        'var\u180Efoo;',
        'var\\u180Efoo;',
        '\\u2002Проверка\\r\\n\\u00a0',
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
        '\t\t\t\t\t\t\t\t',
        '\v\v\v\v\v\v\v\v',
        ' \t\f\v\r\n',
        '\r\n',
        '    \t \r\n \n\r \v\f\t ',
        `  \t // foo bar\f  `,
        `  \t // foo bar\t  `,
        `  \t // foo bar\v  `,
        '{0\n1\r2\u20283\u20294}',
        '//singlelinecommentx = icefapper;',
        '//\\u000C single line \\u000C comment \\u000C',
        `//\\u0020 single line \\u0020 comment \\u0020`,
        '\u0020var x\u0020= 1\u0020; result = x;',
        '\'\u0009str\u0009ing\u0009\'',
        '{ x\n++y }',
        '\u0009var\u0009x\u0009=\u00091\u0009; result = x;',
        '\u0009' + 'var' + '\u0009' + 'x' + '\u0009' + '=' + '\u0009' + '2' + '\u0009; result = x;',
        '\u0009' + 'var' + '\t' + 'x' + '\u0009' + '=' + '\t' + '5' + '\u0009; result = x;',
        '\'\\u0009str\\u0009ing\\u0009\'',
        '/*\u0009 multi line \u0009 comment \u0009 x = 1;*/',
        '/*\u0009 multi line \u0009 comment \u0009*/',
        `// single line comment`,
        `/*multilinecommenta = b;*/`,
        `MAX_VALUE\u000Ain\u000ANumber`,
        `MAX_VALUE\u2028in\u2028Number`,
        `MAX_VALUE\u2029in\u2029Number`,
        `MAX_VALUE\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029in\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029Number`,
        '{0\n1\r2\u20283\u20294}',
        'throw /* \u202a */ e',
        '{ var x = 14, y = 3\nz; }',

    ];
      for (const arg of validSyntax) {

        it(`${arg}`, () => {
            t.doesNotThrow(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
    }

      pass(`spaces`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
            source: '        ',
            expected: {
                  body: [],
                  end: 8,
                 loc: {
                    end: {
                      column: 8,
                      line: 1,
                    },
                    start: {
                      column: 0,
                      line: 1,
                    },
                  },
                 sourceType: 'script',
                  start: 0,
                  type: 'Program'
                }
        });

      pass(`tabs`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
            source: '\t\t\t\t\t\t\t\t',
            expected: {
                  body: [],
                  end: 8,
                 loc: {
                    end: {
                      column: 8,
                      line: 1,
                    },
                    start: {
                      column: 0,
                      line: 1,
                    },
                  },
                 sourceType: 'script',
                  start: 0,
                  type: 'Program'
                }
        });
    });

    pass(`vertical tabs`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
        source: '\v\v\v\v\v\v\v\v',
        expected: {
              body: [],
              end: 8,
             loc: {
                end: {
                  column: 8,
                  line: 1,
                },
                start: {
                  column: 0,
                  line: 1,
                },
              },
             sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

    pass(`line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
        source: '\n\n\n\n\n\n\n\n',
        expected: {
              body: [],
              end: 8,
             loc: {
                end: {
                  column: 0,
                  line: 9,
                },
                start: {
                  column: 0,
                  line: 1,
                },
              },
             sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

    pass(`keep locations correct after CRLF`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
      source: 'a\r\nb',
      expected: {
        type: 'Program',
        body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'a',
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
                    }
                },
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
                }
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'b',
                    start: 3,
                    end: 4,
                    loc: {
                        start: {
                            line: 2,
                            column: 0
                        },
                        end: {
                            line: 2,
                            column: 1
                        }
                    }
                },
                start: 3,
                end: 4,
                loc: {
                    start: {
                        line: 2,
                        column: 0
                    },
                    end: {
                        line: 2,
                        column: 1
                    }
                }
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 4,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 1
            }
        }
    }
  });

    pass(`line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '\n\n\n\n\n\n\n\n',
    expected: {
          body: [],
          end: 8,
         loc: {
            end: {
              column: 0,
              line: 9,
            },
            start: {
              column: 0,
              line: 1,
            },
          },
         sourceType: 'script',
          start: 0,
          type: 'Program'
        }
});

    pass(`single-line block on line of HTML close after line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: `  \t /*\n*/ /* optional SingleLineDelimitedCommentSequence */  \n
    --> the comment extends to these characters\n `,
    expected: {
          body: [],
          end: 112,
          loc: {
            end: {
              column: 1,
              line: 5,
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

    pass(`multiple HTML single line comments with \n`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '  \t <!-- foo bar\n <!-- baz \n <!--',
    expected: {
          body: [],
          end: 33,
          loc: {
            end: {
              column: 5,
              line: 3,
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

    pass(`single HTML close comment after line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '  \t \n--> ',
    expected: {
          body: [],
         end: 9,
          loc: {
            end: {
              column: 4,
              line: 2,
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

    pass(`line of single HTML close comment after line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '   \t \r--> the comment extends to these characters\r  ',
    expected: {
          body: [],
         end: 52,
          loc: {
            end: {
              column: 2,
              line: 3,
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

    pass(`multiline comments with carriage return`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '  \t /* foo * /* bar \r */  ',
    expected: {
          body: [],
          end: 26,
          loc: {
           end: {
              column: 5,
              line: 2,
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

    pass(`multiline comments with line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '  \t /* foo * /* bar \n */  ',
    expected: {
          body: [],
          end: 26,
          loc: {
           end: {
              column: 5,
              line: 2,
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

    pass(`multiple single line comments with line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '  \t // foo bar${lt} // baz \n // ',
    expected: {
          body: [],
          end: 32,
          loc: {
            end: {
              column: 4,
              line: 2,
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

    pass(`multiple multiline comments with line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '  \t /* foo bar${lt} *//* baz*/ \n /**/',
    expected: {
          body: [],
          end: 37,
          loc: {
            end: {
              column: 5,
              line: 2,
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

    pass(`line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '\r\r\r\r\r\r\r\r',
    expected: {
          body: [],
          end: 8,
         loc: {
            end: {
              column: 0,
              line: 9,
            },
            start: {
              column: 0,
              line: 1,
            },
          },
         sourceType: 'script',
          start: 0,
          type: 'Program'
        }
});

    pass(`line separators`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '\u2028\u2028\u2028\u2028\u2028\u2028\u2028\u2028',
    expected: {
          body: [],
          end: 8,
         loc: {
            end: {
              column: 0,
              line: 9,
            },
            start: {
              column: 0,
              line: 1,
            },
          },
         sourceType: 'script',
          start: 0,
          type: 'Program'
        }
});

    pass(`paragraph separators`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '\u2029\u2029\u2029\u2029\u2029\u2029\u2029\u2029',
    expected: {
          body: [],
          end: 8,
         loc: {
            end: {
              column: 0,
              line: 9,
            },
            start: {
              column: 0,
              line: 1,
            },
          },
         sourceType: 'script',
          start: 0,
          type: 'Program'
        }
});

});
