import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Literals - String', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        fail('"', Context.Empty, {
            source: '"',
        });

        fail('"foo', Context.Empty, {
            source: '"foo',
        });

        fail('"foo\\"', Context.Empty, {
            source: '"foo\\"',
        });

        fail('"\\u{g0g}"', Context.Empty, {
          source: '"\\u{g0g}"',
      });

        fail('"\\u{g0g}"', Context.Empty, {
          source: '"\\u{g}"',
      });

        fail('"\\u{g}"', Context.Empty, {
          source: '"\\u{g}"',
      });

        fail('"\\u{g0}"', Context.Empty, {
        source: '"\\u{g0}"',
    });
        fail('"\\u{g0}"', Context.Empty, {
        source: '"\\u{g0}"',
    });

        fail('\\u{0g}', Context.Empty, {
        source: '\\u{0g}',
    });
        fail('\\u{0g0}\r\n', Context.Empty, {
        source: '\\u{0g0}\r\n',
    });
        fail('"\\u{g0g}"', Context.Empty, {
        source: '"\\u{g0g}"',
    });
        fail('"\\u{110000}"', Context.Empty, {
        source: '"\\u{110000}"',
    });

        fail('"\\u{11ffff}"', Context.Empty, {
        source: '"\\u{11ffff}"',
    });

        fail('"\\x0g"', Context.Empty, {
        source: '"\\x0g"',
    });

        fail('"\\xg0\r\n"', Context.Empty, {
        source: '"\\xg0\r\n"',
    });
        fail('"\\xgg"', Context.Empty, {
        source: '"\\xgg"',
    });

        fail('"\\xfg"', Context.Empty, {
        source: '"\\xfg"',
    });

        fail('"\\xFG"', Context.Empty, {
      source: '"\\xFG"',
    });

        fail('"\\u0g00"', Context.Empty, {
        source: '"\\u0g00"',
    });
        fail('"\\u00g0"', Context.Empty, {
        source: '"\\u00g0"',
    });
        fail('"\\uAA"', Context.Empty, {
        source: '"\\uAA"',
    });
        fail('"\\uAAA"', Context.Empty, {
        source: '"\\uAAA"',
    });
        fail('"Hello\nworld"', Context.Empty, {
        source: '"Hello\nworld"',
    });

        fail('"use strict";  "\\08"', Context.Empty, {
        source: '"use strict"; "\\08"',
    });

        fail('"use strict"; ("\\000")', Context.Empty, {
        source: '"use strict"; ("\\000")',
    });

        fail('"use strict"; ("\\000")', Context.Empty, {
        source: '"use strict"; ("\\000")',
    });

        fail('"use strict"; ("\\001")', Context.Empty, {
        source: '"use strict"; ("\\001")',
    });

        fail('"use strict"; ("\\123")', Context.Empty, {
        source: '"use strict"; ("\\123")',
    });

        fail('"use strict"; ("\\01")', Context.Empty, {
        source: '"use strict"; ("\\01")',
    });

        fail('"use strict"; ("\\41")', Context.Empty, {
        source: '"use strict"; ("\\41")',
    });

        fail('"use strict"; ("\\1")', Context.Empty, {
        source: '"use strict"; ("\\1")',
    });

        fail('"use strict"; ("\\4")', Context.Empty, {
        source: '"use strict"; ("\\4")',
    });
 /*
    fail('"use strict"; "\\16";', Context.Empty, {
        source: '"use strict"; "\\16";',
    });

    fail('"use strict"; "\\31";', Context.Empty, {
        source: '"use strict"; "\\31";',
    });

      fail('"use strict"; "\\106";', Context.Empty, {
        source: '"use strict"; "\\106";',
    });

    fail('"use strict"; "\\207";', Context.Empty, {
        source: '"use strict"; "\\207";',
    });
      fail('"use strict"; "\\10";', Context.Empty, {
        source: '"use strict"; "\\10";',
    });

      fail('"use strict"; "z\\7";', Context.Empty, {
      source: '"use strict"; "z\\7";',
  });*/
/*
  fail('"use strict"; "\\10";', Context.Empty, {
      source: '"use strict"; "\\10";',
  });*/
    });

    describe('Pass', () => {

        pass(`"abc"`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"abc"',
            expected: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    directive: 'abc',
                    expression: {
                        type: 'Literal',
                        value: 'abc',
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
                        raw: '"abc"'
                    },
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
                    }
                }],
                sourceType: 'script',
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
                }
            }
          });

        pass(`"\\б"`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"\\б"',
            expected: {
                body: [{
                    end: 4,
                    directive: '\\б',
                    expression: {
                        end: 4,
                        loc: {
                            end: {
                                column: 4,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1,
                            }
                        },
                        raw: '"\\б"',
                        start: 0,
                        type: 'Literal',
                        value: 'б',
                    },
                    loc: {
                        end: {
                            column: 4,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    start: 0,
                    type: 'ExpressionStatement'
                }],
                end: 4,
                loc: {
                    end: {
                        column: 4,
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

        pass(`"\\u0435"`, Context.Empty, {
            source: '"\\n\\r\\t\\v\\b\\f"',
            expected: {
                body: [{
                    directive: '\\n\\r\\t\\v\\b\\f',
                    expression: {
                        type: 'Literal',
                        value: '\n\r\t\u000b\b\f',
                    },
                    type: 'ExpressionStatement',
                }, ],
                sourceType: 'script',
                type: 'Program'
            }
          });

        pass(`"Hello\\nworld"`, Context.OptionsRanges | Context.OptionsRaw, {
            source: '"Hello\\nworld"',
            expected: {
                body: [{
                    directive: 'Hello\\nworld',
                    end: 14,
                    expression: {
                        end: 14,
                        raw: '"Hello\\nworld"',
                        start: 0,
                        type: 'Literal',
                        value: 'Hello\nworld',
                    },
                    start: 0,
                    type: 'ExpressionStatement',
                }],
                end: 14,
                sourceType: 'script',
                start: 0,
                type: 'Program'
            }
          });

        pass(`"\\u0435"`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"\\u0435"',
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
                    directive: '\\u0435',
                    expression: {
                        type: 'Literal',
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
                        value: 'е',
                        raw: '"\\u0435"'
                    }
                }],
                sourceType: 'script'
            }
          });

        pass(`"\\u0432"`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"\\u0432"',
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
                    directive: '\\u0432',
                    expression: {
                        type: 'Literal',
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
                        value: 'в',
                        raw: '"\\u0432"'
                    }
                }],
                sourceType: 'script'
            }
          });

        pass(`"\\u180E"`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"\\u180E"',
            expected: {
                body: [{
                    directive: '\\u180E',
                    end: 8,
                    expression: {
                        end: 8,
                        loc: {
                            end: {
                                column: 8,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1
                            }
                        },
                        raw: '"\\u180E"',
                        start: 0,
                        type: 'Literal',
                        value: '᠎',
                    },
                    loc: {
                        end: {
                            column: 8,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    start: 0,
                    type: 'ExpressionStatement',
                }],
                end: 8,
                loc: {
                    end: {
                        column: 8,
                        line: 1
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

        pass(`"\\7"`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"\\7"',
            expected: {
                body: [{
                    directive: '\\7',
                    end: 4,
                    expression: {
                        end: 4,
                        loc: {
                            end: {
                                column: 4,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1,
                            },
                        },
                        raw: '"\\7"',
                        start: 0,
                        type: 'Literal',
                        value: '\u0007',
                    },
                    loc: {
                        end: {
                            column: 4,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        },
                    },
                    start: 0,
                    type: 'ExpressionStatement',
                }],
                end: 4,
                loc: {
                    end: {
                        column: 4,
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

        pass(`"Hello\\012World"`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"Hello\\012World"',
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
                    directive: 'Hello\\012World',
                    expression: {
                        type: 'Literal',
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
                        value: 'Hello\nWorld',
                        raw: '"Hello\\012World"'
                    }
                }],
                sourceType: 'script'
            }
          });

        pass(`"Hello\\412World"`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"Hello\\412World"',
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
                    directive: 'Hello\\412World',
                    expression: {
                        type: 'Literal',
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
                        value: 'Hello!2World',
                        raw: '"Hello\\412World"'
                    }
                }],
                sourceType: 'script'
            }
          });

        pass('"Hello\\712World"', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"Hello\\712World"',
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
                    directive: 'Hello\\712World',
                    expression: {
                        type: 'Literal',
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
                        value: 'Hello92World',
                        raw: '"Hello\\712World"'
                    }
                }],
                sourceType: 'script'
            }
          });

        pass('"Hello\\1World"', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"Hello\\1World"',
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
                body: [{
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
                    directive: 'Hello\\1World',
                    expression: {
                        type: 'Literal',
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
                        value: 'Hello\u0001World',
                        raw: '"Hello\\1World"'
                    }
                }],
                sourceType: 'script'
            }
          });

        pass(`"\\xff"`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `"\\xff"`,
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
                body: [{
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
                    directive: '\\xff',
                    expression: {
                        type: 'Literal',
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
                        value: 'ÿ',
                        raw: '"\\xff"'
                    }
                }],
                sourceType: 'script'
            }
          });

        pass('"\\u{11000}"', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"\\u{11000}"',
            expected: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    directive: '\\u{11000}',
                    expression: {
                        type: 'Literal',
                        value: '𑀀',
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
                        raw: '"\\u{11000}"'
                    },
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
                    }
                }],
                sourceType: 'script',
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
                }
            }
          });

        pass('"\\Щ"', Context.OptionsRaw, {
            source: '"\\Щ"',
            expected: {
                body: [{
                    directive: '\\Щ',
                    expression: {
                        raw: '"\\Щ"',
                        type: 'Literal',
                        value: 'Щ'
                    },
                    type: 'ExpressionStatement'
                }],
                sourceType: 'script',
                type: 'Program'
            }
          });

        pass('"\\З"', Context.OptionsRaw, {
            source: '"\\З"',
            expected: {
                body: [{
                    directive: '\\З',
                    expression: {
                        raw: '"\\З"',
                        type: 'Literal',
                        value: 'З'
                    },
                    type: 'ExpressionStatement'
                }],
                sourceType: 'script',
                type: 'Program'
            }
          });

        pass('"\\ю"', Context.OptionsRaw, {
            source: '"\\ю"',
            expected: {
                body: [{
                    directive: '\\ю',
                    expression: {
                        raw: '"\\ю"',
                        type: 'Literal',
                        value: 'ю'
                    },
                    type: 'ExpressionStatement'
                }],
                sourceType: 'script',
                type: 'Program'
            }
          });

        pass('"\\б"', Context.OptionsRaw, {
            source: '"\\б"',
            expected: {
                body: [{
                    directive: '\\б',
                    expression: {
                        raw: '"\\б"',
                        type: 'Literal',
                        value: 'б'
                    },
                    type: 'ExpressionStatement'
                }],
                sourceType: 'script',
                type: 'Program'
            }
          });

        pass('"a\\r\\nb"', Context.OptionsRaw, {
            source: '"a\\r\\nb"',
            expected: {
                body: [{
                    directive: 'a\\r\\nb',
                    expression: {
                        raw: '"a\\r\\nb"',
                        type: 'Literal',
                        value: 'a\r\nb',
                    },
                    type: 'ExpressionStatement',
                }, ],
                sourceType: 'script',
                type: 'Program'
            }
          });

        pass('"\\u0451"', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"\\u0451"',
            expected: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 'ё',
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
                        raw: '"\\u0451"'
                    },
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
                    directive: '\\u0451'
                }],
                sourceType: 'script',
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
                }
            }
          });
        pass('"\\u0006A"', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"\\u0006A"',
            expected: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: '\u0006A',
                        start: 0,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        },
                        raw: '"\\u0006A"'
                    },
                    start: 0,
                    end: 9,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    },
                    directive: '\\u0006A'
                }],
                sourceType: 'script',
                start: 0,
                end: 9,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            }
          });
    });
});
