import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Variable', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {

    const invalidSyntax = [
      'var x += 1;',
      'var x | true;',
      'var x && 1;',
      'var --x;',
      'var x>>1;',
      `var x in [];`,
      `var var`,
      `var var = 2000000;`,
      `var [var] = obj`,
      `[var] = obj`,
      // Cannot use abbreviated destructuring syntax for keyword 'var'
      `function var() { }`,
      `function a({var}) { }`,
      `(function a(var) { })`,
      `(function a([{var}]) { })`,
      `(function a({ hello: {var}}) { })`,
      `(function a({ 0: [var]}) { })`,
      `class var { }`,
      `var [...[ x ] = []] = [];`,
      `var [...{ x } = []] = [];`,
      `var [...x, y] = [1, 2, 3];`,
      `var [...{ x }, y] = [1, 2, 3];`,
  ];

    for (const arg of invalidSyntax) {
      it(`${arg}`, () => {
          t.throws(() => {
              parseSource(`${arg}`, undefined, Context.Empty);
          });
      });

      it(`${arg}`, () => {
        t.throws(() => {
            parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
        });
    });

  }

    fail('var x && 1;', Context.Empty, {
      source: 'var x && 1;',
  });

    fail('var {a:a};', Context.Empty, {
    source: 'var {a:a};',
});

    fail('var {a};', Context.Empty, {
  source: 'var {a};',
});

    fail('var (a)=0;', Context.Empty, {
  source: 'var (a)=0;',
});

    fail('var a[0]=0;', Context.Empty, {
  source: 'var a[0]=0;',
});

    fail('var a.b;', Context.Empty, {
  source: 'var a.b;',
});

    fail(`var x=0, y=0;
var z=
x
++
++
y`, Context.Empty, {
  source: `var x=0, y=0;
  var z=
  x
  ++
  ++
  y`,
});

    fail('var x | true;', Context.Empty, {
source: 'var x | true;',
});

    fail('var [...[x], y] = [1, 2, 3];', Context.Empty, {
  source: 'var [...[x], y] = [1, 2, 3];',
});

    fail('var [...{ x }, y] = [1, 2, 3];', Context.Empty, {
  source: 'var [...{ x }, y] = [1, 2, 3];',
});

    fail('"use strict"; for (var eval in arrObj) { }', Context.Empty, {
  source: '"use strict"; for (var eval in arrObj) { }',
});

// Esprima issue: https://github.com/jquery/esprima/issues/1871
    fail('var obj = { *g(yield) {} };', Context.Empty, {
  source: 'var obj = { *g(yield) {} };',
});

  });

  describe('Pass', () => {

    const validSyntax = [
      `var {x, y} = o`,
      'var {x: x, y: y} = o',
      'var {x=1, y=2} = o',
      'var a;',
      'let b = 42;',
      'const c = 21 * 2;',
      'let {e} = d;',
      'var f, g = 42, h = false;',
      'let {i, j: k} = l;',
      'let [m, n] = c;',
      'var {a: [o, {p}]} = d;',
      'let {q = 42} = f;',
      'const {g: r = 42} = i;',
  ];

    for (const arg of validSyntax) {
      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parseSource(`${arg}`, undefined, Context.Empty);
          });
      });
  }
  pass(`var a = [ , 1 ], b = [ 1, ], c = [ 1, , 2 ], d = [ 1, , , ];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `var a = [ , 1 ], b = [ 1, ], c = [ 1, , 2 ], d = [ 1, , , ];`,
    expected: {
      "type": "Program",
      "sourceType": "script",
      "body": [
          {
              "type": "VariableDeclaration",
              "kind": "var",
              "declarations": [
                  {
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "ArrayExpression",
                          "elements": [
                              null,
                              {
                                  "type": "Literal",
                                  "value": 1,
                                  "start": 12,
                                  "end": 13,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 12
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 13
                                      }
                                  },
                                  "raw": "1"
                              }
                          ],
                          "start": 8,
                          "end": 15,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 8
                              },
                              "end": {
                                  "line": 1,
                                  "column": 15
                              }
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "name": "a",
                          "start": 4,
                          "end": 5,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 4
                              },
                              "end": {
                                  "line": 1,
                                  "column": 5
                              }
                          }
                      },
                      "start": 4,
                      "end": 15,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 15
                          }
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "ArrayExpression",
                          "elements": [
                              {
                                  "type": "Literal",
                                  "value": 1,
                                  "start": 23,
                                  "end": 24,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 23
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 24
                                      }
                                  },
                                  "raw": "1"
                              }
                          ],
                          "start": 21,
                          "end": 27,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 21
                              },
                              "end": {
                                  "line": 1,
                                  "column": 27
                              }
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "name": "b",
                          "start": 17,
                          "end": 18,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 17
                              },
                              "end": {
                                  "line": 1,
                                  "column": 18
                              }
                          }
                      },
                      "start": 17,
                      "end": 27,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 17
                          },
                          "end": {
                              "line": 1,
                              "column": 27
                          }
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "ArrayExpression",
                          "elements": [
                              {
                                  "type": "Literal",
                                  "value": 1,
                                  "start": 35,
                                  "end": 36,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 35
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 36
                                      }
                                  },
                                  "raw": "1"
                              },
                              null,
                              {
                                  "type": "Literal",
                                  "value": 2,
                                  "start": 40,
                                  "end": 41,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 40
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 41
                                      }
                                  },
                                  "raw": "2"
                              }
                          ],
                          "start": 33,
                          "end": 43,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 33
                              },
                              "end": {
                                  "line": 1,
                                  "column": 43
                              }
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "name": "c",
                          "start": 29,
                          "end": 30,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 29
                              },
                              "end": {
                                  "line": 1,
                                  "column": 30
                              }
                          }
                      },
                      "start": 29,
                      "end": 43,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 29
                          },
                          "end": {
                              "line": 1,
                              "column": 43
                          }
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "ArrayExpression",
                          "elements": [
                              {
                                  "type": "Literal",
                                  "value": 1,
                                  "start": 51,
                                  "end": 52,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 51
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 52
                                      }
                                  },
                                  "raw": "1"
                              },
                              null,
                              null
                          ],
                          "start": 49,
                          "end": 59,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 49
                              },
                              "end": {
                                  "line": 1,
                                  "column": 59
                              }
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "name": "d",
                          "start": 45,
                          "end": 46,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 45
                              },
                              "end": {
                                  "line": 1,
                                  "column": 46
                              }
                          }
                      },
                      "start": 45,
                      "end": 59,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 45
                          },
                          "end": {
                              "line": 1,
                              "column": 59
                          }
                      }
                  }
              ],
              "start": 0,
              "end": 60,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 60
                  }
              }
          }
      ],
      "start": 0,
      "end": 60,
      "loc": {
          "start": {
              "line": 1,
              "column": 0
          },
          "end": {
              "line": 1,
              "column": 60
          }
      }
  }
  });

    pass(`"use strict"; var foo = { }; foo.eval = {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `"use strict"; var foo = { }; foo.eval = {};`,
      expected: {
        type: 'Program',
        start: 0,
        end: 43,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 43
          }
        },
        body: [
          {
            type: 'ExpressionStatement',
            directive: 'use strict',
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
              type: 'Literal',
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
              value: 'use strict',
              raw: '"use strict"'
            },
          },
          {
            type: 'VariableDeclaration',
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
            declarations: [
              {
                type: 'VariableDeclarator',
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
                id: {
                  type: 'Identifier',
                  start: 18,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  },
                  name: 'foo'
                },
                init: {
                  type: 'ObjectExpression',
                  start: 24,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 27
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
            start: 29,
            end: 43,
            loc: {
              start: {
                line: 1,
                column: 29
              },
              end: {
                line: 1,
                column: 43
              }
            },
            expression: {
              type: 'AssignmentExpression',
              start: 29,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 29
                },
                end: {
                  line: 1,
                  column: 42
                }
              },
              operator: '=',
              left: {
                type: 'MemberExpression',
                start: 29,
                end: 37,
                loc: {
                  start: {
                    line: 1,
                    column: 29
                  },
                  end: {
                    line: 1,
                    column: 37
                  }
                },
                object: {
                  type: 'Identifier',
                  start: 29,
                  end: 32,
                  loc: {
                    start: {
                      line: 1,
                      column: 29
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  },
                  name: 'foo'
                },
                property: {
                  type: 'Identifier',
                  start: 33,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 33
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  },
                  name: 'eval'
                },
                computed: false
              },
              right: {
                type: 'ObjectExpression',
                start: 40,
                end: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 40
                  },
                  end: {
                    line: 1,
                    column: 42
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

    pass(`var TRIM = 'trim' in String.prototype;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var TRIM = 'trim' in String.prototype;`,
      expected: {
        type: 'Program',
        start: 0,
        end: 38,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 38
          }
        },
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 38,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 38
              }
            },
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 37,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 37
                  }
                },
                id: {
                  type: 'Identifier',
                  start: 4,
                  end: 8,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 8
                    }
                  },
                  name: 'TRIM'
                },
                init: {
                  type: 'BinaryExpression',
                  start: 11,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  },
                  left: {
                    type: 'Literal',
                    start: 11,
                    end: 17,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 17
                      }
                    },
                    value: 'trim',
                    raw: '\'trim\''
                  },
                  operator: 'in',
                  right: {
                    type: 'MemberExpression',
                    start: 21,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    },
                    object: {
                      type: 'Identifier',
                      start: 21,
                      end: 27,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 27
                        }
                      },
                      name: 'String'
                    },
                    property: {
                      type: 'Identifier',
                      start: 28,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 28
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      },
                      name: 'prototype'
                    },
                    computed: false
                  }
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var foo = { eval: 1 };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var foo = { eval: 1 };`,
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
            type: 'VariableDeclaration',
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
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 21
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
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 12,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 19
                        }
                      },
                      method: false,
                      shorthand: false,
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
                        name: 'eval'
                      },
                      value: {
                        type: 'Literal',
                        start: 18,
                        end: 19,
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 19
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
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var foo = { }; foo.eval = {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var foo = { }; foo.eval = {};`,
      expected: {
        type: 'Program',
        start: 0,
        end: 29,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 29
          }
        },
        body: [
          {
            type: 'VariableDeclaration',
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
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 13,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 13
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
                  properties: []
                }
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExpressionStatement',
            start: 15,
            end: 29,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 29
              }
            },
            expression: {
              type: 'AssignmentExpression',
              start: 15,
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 28
                }
              },
              operator: '=',
              left: {
                type: 'MemberExpression',
                start: 15,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                },
                object: {
                  type: 'Identifier',
                  start: 15,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  },
                  name: 'foo'
                },
                property: {
                  type: 'Identifier',
                  start: 19,
                  end: 23,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 23
                    }
                  },
                  name: 'eval'
                },
                computed: false
              },
              right: {
                type: 'ObjectExpression',
                start: 26,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 26
                  },
                  end: {
                    line: 1,
                    column: 28
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

    pass(`var foo, let;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var foo, let;`,
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
                init: null
              },
              {
                type: 'VariableDeclarator',
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
                  name: 'let'
                },
                init: null
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var foo = let = 1;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var foo = let = 1;`,
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
            type: 'VariableDeclaration',
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
            declarations: [
              {
                type: 'VariableDeclarator',
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
                  type: 'AssignmentExpression',
                  start: 10,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  },
                  operator: '=',
                  left: {
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
                    name: 'let'
                  },
                  right: {
                    type: 'Literal',
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
                    value: 1,
                    raw: '1'
                  }
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var foo = {}; foo.if;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var foo = {}; foo.if;`,
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

    pass(`var {} = null;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var {} = null;`,
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
            type: 'VariableDeclaration',
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
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 13,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 13
                  }
                },
                id: {
                  type: 'ObjectPattern',
                  start: 4,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 6
                    }
                  },
                  properties: []
                },
                init: {
                  type: 'Literal',
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
                  value: null,
                  raw: 'null'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var static;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var static;`,
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
                  name: 'static'
                },
                init: null
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`{ var foo; };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `{ var foo; };`,
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
            type: 'BlockStatement',
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
            body: [
              {
                type: 'VariableDeclaration',
                start: 2,
                end: 10,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 9,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 9
                      }
                    },
                    id: {
                      type: 'Identifier',
                      start: 6,
                      end: 9,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 9
                        }
                      },
                      name: 'foo'
                    },
                    init: null
                  }
                ],
                kind: 'var'
              }
            ]
          },
          {
            type: 'EmptyStatement',
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
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var foo; { var foo; };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var foo; { var foo; };`,
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
            type: 'VariableDeclaration',
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
            declarations: [
              {
                type: 'VariableDeclarator',
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
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'BlockStatement',
            start: 9,
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 21
              }
            },
            body: [
              {
                type: 'VariableDeclaration',
                start: 11,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 15,
                    end: 18,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 18
                      }
                    },
                    id: {
                      type: 'Identifier',
                      start: 15,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 15
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      },
                      name: 'foo'
                    },
                    init: null
                  }
                ],
                kind: 'var'
              }
            ]
          },
          {
            type: 'EmptyStatement',
            start: 21,
            end: 22,
            loc: {
              start: {
                line: 1,
                column: 21
              },
              end: {
                line: 1,
                column: 22
              }
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var foo; { var foo; function foo() {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var foo; { function foo() {} };`,
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
        body: [
          {
            type: 'VariableDeclaration',
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
            declarations: [
              {
                type: 'VariableDeclarator',
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
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'BlockStatement',
            start: 9,
            end: 30,
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 30
              }
            },
            body: [
              {
                type: 'FunctionDeclaration',
                start: 11,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 28
                  }
                },
                id: {
                  type: 'Identifier',
                  start: 20,
                  end: 23,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 23
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
                  start: 26,
                  end: 28,
                  loc: {
                    start: {
                      line: 1,
                      column: 26
                    },
                    end: {
                      line: 1,
                      column: 28
                    }
                  },
                  body: []
                }
              }
            ]
          },
          {
            type: 'EmptyStatement',
            start: 30,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 30
              },
              end: {
                line: 1,
                column: 31
              }
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`{ var {foo=a} = {}; };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `{ var {foo=a} = {}; };`,
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
            type: 'BlockStatement',
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
                start: 2,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 18,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 18
                      }
                    },
                    id: {
                      type: 'ObjectPattern',
                      start: 6,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 13
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 7,
                          end: 12,
                          loc: {
                            start: {
                              line: 1,
                              column: 7
                            },
                            end: {
                              line: 1,
                              column: 12
                            }
                          },
                          method: false,
                          shorthand: true,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 7,
                            end: 10,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 10
                              }
                            },
                            name: 'foo'
                          },
                          kind: 'init',
                          value: {
                            type: 'AssignmentPattern',
                            start: 7,
                            end: 12,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 12
                              }
                            },
                            left: {
                              type: 'Identifier',
                              start: 7,
                              end: 10,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 7
                                },
                                end: {
                                  line: 1,
                                  column: 10
                                }
                              },
                              name: 'foo'
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
                              name: 'a'
                            }
                          }
                        }
                      ]
                    },
                    init: {
                      type: 'ObjectExpression',
                      start: 16,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      },
                      properties: []
                    }
                  }
                ],
                kind: 'var'
              }
            ]
          },
          {
            type: 'EmptyStatement',
            start: 21,
            end: 22,
            loc: {
              start: {
                line: 1,
                column: 21
              },
              end: {
                line: 1,
                column: 22
              }
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`{ var foo = a; };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `{ var foo = a; };`,
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
            type: 'BlockStatement',
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
            body: [
              {
                type: 'VariableDeclaration',
                start: 2,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 13,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 13
                      }
                    },
                    id: {
                      type: 'Identifier',
                      start: 6,
                      end: 9,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 9
                        }
                      },
                      name: 'foo'
                    },
                    init: {
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
                      name: 'a'
                    }
                  }
                ],
                kind: 'var'
              }
            ]
          },
          {
            type: 'EmptyStatement',
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
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`{ var {foo} = {foo: a}; };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `{ var {foo} = {foo: a}; };`,
      expected: {
        type: 'Program',
        start: 0,
        end: 26,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 26
          }
        },
        body: [
          {
            type: 'BlockStatement',
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
                start: 2,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    },
                    id: {
                      type: 'ObjectPattern',
                      start: 6,
                      end: 11,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 11
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 7,
                          end: 10,
                          loc: {
                            start: {
                              line: 1,
                              column: 7
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
                            start: 7,
                            end: 10,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 10
                              }
                            },
                            name: 'foo'
                          },
                          kind: 'init',
                          value: {
                            type: 'Identifier',
                            start: 7,
                            end: 10,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 10
                              }
                            },
                            name: 'foo'
                          }
                        }
                      ]
                    },
                    init: {
                      type: 'ObjectExpression',
                      start: 14,
                      end: 22,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 22
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 15,
                          end: 21,
                          loc: {
                            start: {
                              line: 1,
                              column: 15
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
                            start: 15,
                            end: 18,
                            loc: {
                              start: {
                                line: 1,
                                column: 15
                              },
                              end: {
                                line: 1,
                                column: 18
                              }
                            },
                            name: 'foo'
                          },
                          value: {
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
                            name: 'a'
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                ],
                kind: 'var'
              }
            ]
          },
          {
            type: 'EmptyStatement',
            start: 25,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 25
              },
              end: {
                line: 1,
                column: 26
              }
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`{ var {foo=a} = {}; };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `{ var {foo=a} = {}; };`,
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
            type: 'BlockStatement',
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
                start: 2,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 18,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 18
                      }
                    },
                    id: {
                      type: 'ObjectPattern',
                      start: 6,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 13
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 7,
                          end: 12,
                          loc: {
                            start: {
                              line: 1,
                              column: 7
                            },
                            end: {
                              line: 1,
                              column: 12
                            }
                          },
                          method: false,
                          shorthand: true,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 7,
                            end: 10,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 10
                              }
                            },
                            name: 'foo'
                          },
                          kind: 'init',
                          value: {
                            type: 'AssignmentPattern',
                            start: 7,
                            end: 12,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 12
                              }
                            },
                            left: {
                              type: 'Identifier',
                              start: 7,
                              end: 10,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 7
                                },
                                end: {
                                  line: 1,
                                  column: 10
                                }
                              },
                              name: 'foo'
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
                              name: 'a'
                            }
                          }
                        }
                      ]
                    },
                    init: {
                      type: 'ObjectExpression',
                      start: 16,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      },
                      properties: []
                    }
                  }
                ],
                kind: 'var'
              }
            ]
          },
          {
            type: 'EmptyStatement',
            start: 21,
            end: 22,
            loc: {
              start: {
                line: 1,
                column: 21
              },
              end: {
                line: 1,
                column: 22
              }
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var arguments;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var arguments;`,
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
            type: 'VariableDeclaration',
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
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 13,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 13
                  }
                },
                id: {
                  type: 'Identifier',
                  start: 4,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 13
                    }
                  },
                  name: 'arguments'
                },
                init: null
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`function foo() { var eval = 42, a;}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `function foo() { var eval = 42, a;}`,
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
            type: 'FunctionDeclaration',
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
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 35
                }
              },
              body: [
                {
                  type: 'VariableDeclaration',
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
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 21,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      },
                      id: {
                        type: 'Identifier',
                        start: 21,
                        end: 25,
                        loc: {
                          start: {
                            line: 1,
                            column: 21
                          },
                          end: {
                            line: 1,
                            column: 25
                          }
                        },
                        name: 'eval'
                      },
                      init: {
                        type: 'Literal',
                        start: 28,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        },
                        value: 42,
                        raw: '42'
                      }
                    },
                    {
                      type: 'VariableDeclarator',
                      start: 32,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 32
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      },
                      id: {
                        type: 'Identifier',
                        start: 32,
                        end: 33,
                        loc: {
                          start: {
                            line: 1,
                            column: 32
                          },
                          end: {
                            line: 1,
                            column: 33
                          }
                        },
                        name: 'a'
                      },
                      init: null
                    }
                  ],
                  kind: 'var'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`for (var eval in null) {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `for (var eval in null) {};`,
      expected: {
        type: 'Program',
        start: 0,
        end: 26,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 26
          }
        },
        body: [
          {
            type: 'ForInStatement',
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
            left: {
              type: 'VariableDeclaration',
              start: 5,
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 13
                }
              },
              declarations: [
                {
                  type: 'VariableDeclarator',
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
                  id: {
                    type: 'Identifier',
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
                    name: 'eval'
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            right: {
              type: 'Literal',
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
              value: null,
              raw: 'null'
            },
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
          {
            type: 'EmptyStatement',
            start: 25,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 25
              },
              end: {
                line: 1,
                column: 26
              }
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`try{
      try {
        var intry__intry__var;
      } catch (e) {
        var intry__incatch__var;
      }
  }catch(e){
      try {
        var incatch__intry__var;
      } catch (e) {
          var incatch__incatch__var;
      }

  };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `try{
        try {
          var intry__intry__var;
        } catch (e) {
          var intry__incatch__var;
        }
    }catch(e){
        try {
          var incatch__intry__var;
        } catch (e) {
            var incatch__incatch__var;
        }

    };`,
      expected: {
        type: 'Program',
        start: 0,
        end: 261,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 14,
            column: 6
          }
        },
        body: [
          {
            type: 'TryStatement',
            start: 0,
            end: 260,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 14,
                column: 5
              }
            },
            block: {
              type: 'BlockStatement',
              start: 3,
              end: 124,
              loc: {
                start: {
                  line: 1,
                  column: 3
                },
                end: {
                  line: 7,
                  column: 5
                }
              },
              body: [
                {
                  type: 'TryStatement',
                  start: 13,
                  end: 118,
                  loc: {
                    start: {
                      line: 2,
                      column: 8
                    },
                    end: {
                      line: 6,
                      column: 9
                    }
                  },
                  block: {
                    type: 'BlockStatement',
                    start: 17,
                    end: 61,
                    loc: {
                      start: {
                        line: 2,
                        column: 12
                      },
                      end: {
                        line: 4,
                        column: 9
                      }
                    },
                    body: [
                      {
                        type: 'VariableDeclaration',
                        start: 29,
                        end: 51,
                        loc: {
                          start: {
                            line: 3,
                            column: 10
                          },
                          end: {
                            line: 3,
                            column: 32
                          }
                        },
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            start: 33,
                            end: 50,
                            loc: {
                              start: {
                                line: 3,
                                column: 14
                              },
                              end: {
                                line: 3,
                                column: 31
                              }
                            },
                            id: {
                              type: 'Identifier',
                              start: 33,
                              end: 50,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 14
                                },
                                end: {
                                  line: 3,
                                  column: 31
                                }
                              },
                              name: 'intry__intry__var'
                            },
                            init: null
                          }
                        ],
                        kind: 'var'
                      }
                    ]
                  },
                  handler: {
                    type: 'CatchClause',
                    start: 62,
                    end: 118,
                    loc: {
                      start: {
                        line: 4,
                        column: 10
                      },
                      end: {
                        line: 6,
                        column: 9
                      }
                    },
                    param: {
                      type: 'Identifier',
                      start: 69,
                      end: 70,
                      loc: {
                        start: {
                          line: 4,
                          column: 17
                        },
                        end: {
                          line: 4,
                          column: 18
                        }
                      },
                      name: 'e'
                    },
                    body: {
                      type: 'BlockStatement',
                      start: 72,
                      end: 118,
                      loc: {
                        start: {
                          line: 4,
                          column: 20
                        },
                        end: {
                          line: 6,
                          column: 9
                        }
                      },
                      body: [
                        {
                          type: 'VariableDeclaration',
                          start: 84,
                          end: 108,
                          loc: {
                            start: {
                              line: 5,
                              column: 10
                            },
                            end: {
                              line: 5,
                              column: 34
                            }
                          },
                          declarations: [
                            {
                              type: 'VariableDeclarator',
                              start: 88,
                              end: 107,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 14
                                },
                                end: {
                                  line: 5,
                                  column: 33
                                }
                              },
                              id: {
                                type: 'Identifier',
                                start: 88,
                                end: 107,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 14
                                  },
                                  end: {
                                    line: 5,
                                    column: 33
                                  }
                                },
                                name: 'intry__incatch__var'
                              },
                              init: null
                            }
                          ],
                          kind: 'var'
                        }
                      ]
                    }
                  },
                  finalizer: null
                }
              ]
            },
            handler: {
              type: 'CatchClause',
              start: 124,
              end: 260,
              loc: {
                start: {
                  line: 7,
                  column: 5
                },
                end: {
                  line: 14,
                  column: 5
                }
              },
              param: {
                type: 'Identifier',
                start: 130,
                end: 131,
                loc: {
                  start: {
                    line: 7,
                    column: 11
                  },
                  end: {
                    line: 7,
                    column: 12
                  }
                },
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                start: 132,
                end: 260,
                loc: {
                  start: {
                    line: 7,
                    column: 13
                  },
                  end: {
                    line: 14,
                    column: 5
                  }
                },
                body: [
                  {
                    type: 'TryStatement',
                    start: 142,
                    end: 253,
                    loc: {
                      start: {
                        line: 8,
                        column: 8
                      },
                      end: {
                        line: 12,
                        column: 9
                      }
                    },
                    block: {
                      type: 'BlockStatement',
                      start: 146,
                      end: 192,
                      loc: {
                        start: {
                          line: 8,
                          column: 12
                        },
                        end: {
                          line: 10,
                          column: 9
                        }
                      },
                      body: [
                        {
                          type: 'VariableDeclaration',
                          start: 158,
                          end: 182,
                          loc: {
                            start: {
                              line: 9,
                              column: 10
                            },
                            end: {
                              line: 9,
                              column: 34
                            }
                          },
                          declarations: [
                            {
                              type: 'VariableDeclarator',
                              start: 162,
                              end: 181,
                              loc: {
                                start: {
                                  line: 9,
                                  column: 14
                                },
                                end: {
                                  line: 9,
                                  column: 33
                                }
                              },
                              id: {
                                type: 'Identifier',
                                start: 162,
                                end: 181,
                                loc: {
                                  start: {
                                    line: 9,
                                    column: 14
                                  },
                                  end: {
                                    line: 9,
                                    column: 33
                                  }
                                },
                                name: 'incatch__intry__var'
                              },
                              init: null
                            }
                          ],
                          kind: 'var'
                        }
                      ]
                    },
                    handler: {
                      type: 'CatchClause',
                      start: 193,
                      end: 253,
                      loc: {
                        start: {
                          line: 10,
                          column: 10
                        },
                        end: {
                          line: 12,
                          column: 9
                        }
                      },
                      param: {
                        type: 'Identifier',
                        start: 200,
                        end: 201,
                        loc: {
                          start: {
                            line: 10,
                            column: 17
                          },
                          end: {
                            line: 10,
                            column: 18
                          }
                        },
                        name: 'e'
                      },
                      body: {
                        type: 'BlockStatement',
                        start: 203,
                        end: 253,
                        loc: {
                          start: {
                            line: 10,
                            column: 20
                          },
                          end: {
                            line: 12,
                            column: 9
                          }
                        },
                        body: [
                          {
                            type: 'VariableDeclaration',
                            start: 217,
                            end: 243,
                            loc: {
                              start: {
                                line: 11,
                                column: 12
                              },
                              end: {
                                line: 11,
                                column: 38
                              }
                            },
                            declarations: [
                              {
                                type: 'VariableDeclarator',
                                start: 221,
                                end: 242,
                                loc: {
                                  start: {
                                    line: 11,
                                    column: 16
                                  },
                                  end: {
                                    line: 11,
                                    column: 37
                                  }
                                },
                                id: {
                                  type: 'Identifier',
                                  start: 221,
                                  end: 242,
                                  loc: {
                                    start: {
                                      line: 11,
                                      column: 16
                                    },
                                    end: {
                                      line: 11,
                                      column: 37
                                    }
                                  },
                                  name: 'incatch__incatch__var'
                                },
                                init: null
                              }
                            ],
                            kind: 'var'
                          }
                        ]
                      }
                    },
                    finalizer: null
                  }
                ]
              }
            },
            finalizer: null
          },
          {
            type: 'EmptyStatement',
            start: 260,
            end: 261,
            loc: {
              start: {
                line: 14,
                column: 5
              },
              end: {
                line: 14,
                column: 6
              }
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var [x] = 123;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var [x] = 123;`,
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
            type: 'VariableDeclaration',
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
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 13,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 13
                  }
                },
                id: {
                  type: 'ArrayPattern',
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
                  elements: [
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
                      name: 'x'
                    }
                  ]
                },
                init: {
                  type: 'Literal',
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
                  value: 123,
                  raw: '123'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var [[x]] = [null];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var [[x]] = [null];`,
      expected: {
        type: 'Program',
        start: 0,
        end: 19,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 19
          }
        },
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 19,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 19
              }
            },
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                },
                id: {
                  type: 'ArrayPattern',
                  start: 4,
                  end: 9,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 9
                    }
                  },
                  elements: [
                    {
                      type: 'ArrayPattern',
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
                      elements: [
                        {
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
                          name: 'x'
                        }
                      ]
                    }
                  ]
                },
                init: {
                  type: 'ArrayExpression',
                  start: 12,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  },
                  elements: [
                    {
                      type: 'Literal',
                      start: 13,
                      end: 17,
                      loc: {
                        start: {
                          line: 1,
                          column: 13
                        },
                        end: {
                          line: 1,
                          column: 17
                        }
                      },
                      value: null,
                      raw: 'null'
                    }
                  ]
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var [fn = function () {}, xFn = function x() {}] = [];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var [fn = function () {}, xFn = function x() {}] = [];`,
      expected: {
        type: 'Program',
        start: 0,
        end: 54,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 54
          }
        },
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 54,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 54
              }
            },
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 53,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 53
                  }
                },
                id: {
                  type: 'ArrayPattern',
                  start: 4,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 48
                    }
                  },
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      start: 5,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 5
                        },
                        end: {
                          line: 1,
                          column: 24
                        }
                      },
                      left: {
                        type: 'Identifier',
                        start: 5,
                        end: 7,
                        loc: {
                          start: {
                            line: 1,
                            column: 5
                          },
                          end: {
                            line: 1,
                            column: 7
                          }
                        },
                        name: 'fn'
                      },
                      right: {
                        type: 'FunctionExpression',
                        start: 10,
                        end: 24,
                        loc: {
                          start: {
                            line: 1,
                            column: 10
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
                          start: 22,
                          end: 24,
                          loc: {
                            start: {
                              line: 1,
                              column: 22
                            },
                            end: {
                              line: 1,
                              column: 24
                            }
                          },
                          body: []
                        }
                      }
                    },
                    {
                      type: 'AssignmentPattern',
                      start: 26,
                      end: 47,
                      loc: {
                        start: {
                          line: 1,
                          column: 26
                        },
                        end: {
                          line: 1,
                          column: 47
                        }
                      },
                      left: {
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
                        name: 'xFn'
                      },
                      right: {
                        type: 'FunctionExpression',
                        start: 32,
                        end: 47,
                        loc: {
                          start: {
                            line: 1,
                            column: 32
                          },
                          end: {
                            line: 1,
                            column: 47
                          }
                        },
                        id: {
                          type: 'Identifier',
                          start: 41,
                          end: 42,
                          loc: {
                            start: {
                              line: 1,
                              column: 41
                            },
                            end: {
                              line: 1,
                              column: 42
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
                          start: 45,
                          end: 47,
                          loc: {
                            start: {
                              line: 1,
                              column: 45
                            },
                            end: {
                              line: 1,
                              column: 47
                            }
                          },
                          body: []
                        }
                      }
                    }
                  ]
                },
                init: {
                  type: 'ArrayExpression',
                  start: 51,
                  end: 53,
                  loc: {
                    start: {
                      line: 1,
                      column: 51
                    },
                    end: {
                      line: 1,
                      column: 53
                    }
                  },
                  elements: []
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var [x] = [];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var [x] = [];`,
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
                  type: 'ArrayPattern',
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
                  elements: [
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
                      name: 'x'
                    }
                  ]
                },
                init: {
                  type: 'ArrayExpression',
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
                  elements: []
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [];`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [];`,
      expected: {
        type: 'Program',
        start: 0,
        end: 49,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 49
          }
        },
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 49,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 49
              }
            },
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 48,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 48
                  }
                },
                id: {
                  type: 'ArrayPattern',
                  start: 4,
                  end: 43,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 43
                    }
                  },
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      start: 5,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 5
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      },
                      left: {
                        type: 'ObjectPattern',
                        start: 5,
                        end: 16,
                        loc: {
                          start: {
                            line: 1,
                            column: 5
                          },
                          end: {
                            line: 1,
                            column: 16
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
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
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
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
                              name: 'x'
                            },
                            kind: 'init',
                            value: {
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
                              name: 'x'
                            }
                          },
                          {
                            type: 'Property',
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
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
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
                              name: 'y'
                            },
                            kind: 'init',
                            value: {
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
                              name: 'y'
                            }
                          },
                          {
                            type: 'Property',
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
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
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
                              name: 'z'
                            },
                            kind: 'init',
                            value: {
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
                              name: 'z'
                            }
                          }
                        ]
                      },
                      right: {
                        type: 'ObjectExpression',
                        start: 19,
                        end: 42,
                        loc: {
                          start: {
                            line: 1,
                            column: 19
                          },
                          end: {
                            line: 1,
                            column: 42
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 21,
                            end: 26,
                            loc: {
                              start: {
                                line: 1,
                                column: 21
                              },
                              end: {
                                line: 1,
                                column: 26
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 21,
                              end: 22,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 21
                                },
                                end: {
                                  line: 1,
                                  column: 22
                                }
                              },
                              name: 'x'
                            },
                            value: {
                              type: 'Literal',
                              start: 24,
                              end: 26,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 24
                                },
                                end: {
                                  line: 1,
                                  column: 26
                                }
                              },
                              value: 44,
                              raw: '44'
                            },
                            kind: 'init'
                          },
                          {
                            type: 'Property',
                            start: 28,
                            end: 33,
                            loc: {
                              start: {
                                line: 1,
                                column: 28
                              },
                              end: {
                                line: 1,
                                column: 33
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 28,
                              end: 29,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 28
                                },
                                end: {
                                  line: 1,
                                  column: 29
                                }
                              },
                              name: 'y'
                            },
                            value: {
                              type: 'Literal',
                              start: 31,
                              end: 33,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 31
                                },
                                end: {
                                  line: 1,
                                  column: 33
                                }
                              },
                              value: 55,
                              raw: '55'
                            },
                            kind: 'init'
                          },
                          {
                            type: 'Property',
                            start: 35,
                            end: 40,
                            loc: {
                              start: {
                                line: 1,
                                column: 35
                              },
                              end: {
                                line: 1,
                                column: 40
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 35,
                              end: 36,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 35
                                },
                                end: {
                                  line: 1,
                                  column: 36
                                }
                              },
                              name: 'z'
                            },
                            value: {
                              type: 'Literal',
                              start: 38,
                              end: 40,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 38
                                },
                                end: {
                                  line: 1,
                                  column: 40
                                }
                              },
                              value: 66,
                              raw: '66'
                            },
                            kind: 'init'
                          }
                        ]
                      }
                    }
                  ]
                },
                init: {
                  type: 'ArrayExpression',
                  start: 46,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 46
                    },
                    end: {
                      line: 1,
                      column: 48
                    }
                  },
                  elements: []
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var [...[,]] = g();`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var [...[,]] = g();`,
      expected: {
        type: 'Program',
        start: 0,
        end: 19,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 19
          }
        },
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 19,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 19
              }
            },
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                },
                id: {
                  type: 'ArrayPattern',
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
                  elements: [
                    {
                      type: 'RestElement',
                      start: 5,
                      end: 11,
                      loc: {
                        start: {
                          line: 1,
                          column: 5
                        },
                        end: {
                          line: 1,
                          column: 11
                        }
                      },
                      argument: {
                        type: 'ArrayPattern',
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
                        elements: [
                          null
                        ]
                      }
                    }
                  ]
                },
                init: {
                  type: 'CallExpression',
                  start: 15,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  },
                  callee: {
                    type: 'Identifier',
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
                    name: 'g'
                  },
                  arguments: []
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var {} = obj;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var {} = obj;`,
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
                  type: 'ObjectPattern',
                  start: 4,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 6
                    }
                  },
                  properties: []
                },
                init: {
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
                  name: 'obj'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };`,
      expected: {
        type: 'Program',
        start: 0,
        end: 78,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 78
          }
        },
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 78,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 78
              }
            },
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 77,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 77
                  }
                },
                id: {
                  type: 'ObjectPattern',
                  start: 4,
                  end: 45,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 45
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 6,
                      end: 43,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 43
                        }
                      },
                      method: false,
                      shorthand: false,
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
                        name: 'w'
                      },
                      value: {
                        type: 'AssignmentPattern',
                        start: 9,
                        end: 43,
                        loc: {
                          start: {
                            line: 1,
                            column: 9
                          },
                          end: {
                            line: 1,
                            column: 43
                          }
                        },
                        left: {
                          type: 'ObjectPattern',
                          start: 9,
                          end: 20,
                          loc: {
                            start: {
                              line: 1,
                              column: 9
                            },
                            end: {
                              line: 1,
                              column: 20
                            }
                          },
                          properties: [
                            {
                              type: 'Property',
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
                              method: false,
                              shorthand: true,
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
                                name: 'x'
                              },
                              kind: 'init',
                              value: {
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
                                name: 'x'
                              }
                            },
                            {
                              type: 'Property',
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
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
                                type: 'Identifier',
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
                                name: 'y'
                              },
                              kind: 'init',
                              value: {
                                type: 'Identifier',
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
                                name: 'y'
                              }
                            },
                            {
                              type: 'Property',
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
                              method: false,
                              shorthand: true,
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
                                name: 'z'
                              },
                              kind: 'init',
                              value: {
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
                                name: 'z'
                              }
                            }
                          ]
                        },
                        right: {
                          type: 'ObjectExpression',
                          start: 23,
                          end: 43,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
                            },
                            end: {
                              line: 1,
                              column: 43
                            }
                          },
                          properties: [
                            {
                              type: 'Property',
                              start: 25,
                              end: 29,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 25
                                },
                                end: {
                                  line: 1,
                                  column: 29
                                }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 25,
                                end: 26,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 25
                                  },
                                  end: {
                                    line: 1,
                                    column: 26
                                  }
                                },
                                name: 'x'
                              },
                              value: {
                                type: 'Literal',
                                start: 28,
                                end: 29,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 28
                                  },
                                  end: {
                                    line: 1,
                                    column: 29
                                  }
                                },
                                value: 4,
                                raw: '4'
                              },
                              kind: 'init'
                            },
                            {
                              type: 'Property',
                              start: 31,
                              end: 35,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 31
                                },
                                end: {
                                  line: 1,
                                  column: 35
                                }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
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
                                name: 'y'
                              },
                              value: {
                                type: 'Literal',
                                start: 34,
                                end: 35,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 34
                                  },
                                  end: {
                                    line: 1,
                                    column: 35
                                  }
                                },
                                value: 5,
                                raw: '5'
                              },
                              kind: 'init'
                            },
                            {
                              type: 'Property',
                              start: 37,
                              end: 41,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 37
                                },
                                end: {
                                  line: 1,
                                  column: 41
                                }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 37,
                                end: 38,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 37
                                  },
                                  end: {
                                    line: 1,
                                    column: 38
                                  }
                                },
                                name: 'z'
                              },
                              value: {
                                type: 'Literal',
                                start: 40,
                                end: 41,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 40
                                  },
                                  end: {
                                    line: 1,
                                    column: 41
                                  }
                                },
                                value: 6,
                                raw: '6'
                              },
                              kind: 'init'
                            }
                          ]
                        }
                      },
                      kind: 'init'
                    }
                  ]
                },
                init: {
                  type: 'ObjectExpression',
                  start: 48,
                  end: 77,
                  loc: {
                    start: {
                      line: 1,
                      column: 48
                    },
                    end: {
                      line: 1,
                      column: 77
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 50,
                      end: 75,
                      loc: {
                        start: {
                          line: 1,
                          column: 50
                        },
                        end: {
                          line: 1,
                          column: 75
                        }
                      },
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 50,
                        end: 51,
                        loc: {
                          start: {
                            line: 1,
                            column: 50
                          },
                          end: {
                            line: 1,
                            column: 51
                          }
                        },
                        name: 'w'
                      },
                      value: {
                        type: 'ObjectExpression',
                        start: 53,
                        end: 75,
                        loc: {
                          start: {
                            line: 1,
                            column: 53
                          },
                          end: {
                            line: 1,
                            column: 75
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 55,
                            end: 67,
                            loc: {
                              start: {
                                line: 1,
                                column: 55
                              },
                              end: {
                                line: 1,
                                column: 67
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 55,
                              end: 56,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 55
                                },
                                end: {
                                  line: 1,
                                  column: 56
                                }
                              },
                              name: 'x'
                            },
                            value: {
                              type: 'Identifier',
                              start: 58,
                              end: 67,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 58
                                },
                                end: {
                                  line: 1,
                                  column: 67
                                }
                              },
                              name: 'undefined'
                            },
                            kind: 'init'
                          },
                          {
                            type: 'Property',
                            start: 69,
                            end: 73,
                            loc: {
                              start: {
                                line: 1,
                                column: 69
                              },
                              end: {
                                line: 1,
                                column: 73
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 69,
                              end: 70,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 69
                                },
                                end: {
                                  line: 1,
                                  column: 70
                                }
                              },
                              name: 'z'
                            },
                            value: {
                              type: 'Literal',
                              start: 72,
                              end: 73,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 72
                                },
                                end: {
                                  line: 1,
                                  column: 73
                                }
                              },
                              value: 7,
                              raw: '7'
                            },
                            kind: 'init'
                          }
                        ]
                      },
                      kind: 'init'
                    }
                  ]
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var arrow = () => {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var arrow = () => {};`,
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
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 20,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 20
                  }
                },
                id: {
                  type: 'Identifier',
                  start: 4,
                  end: 9,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 9
                    }
                  },
                  name: 'arrow'
                },
                init: {
                  type: 'ArrowFunctionExpression',
                  start: 12,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  },
                  id: null,
                  generator: false,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
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
                    body: []
                  }
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });
  });

});
