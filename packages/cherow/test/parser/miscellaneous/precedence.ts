import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Precedence', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  pass(`var a, b, c, d, e, f, g, x, y, z;
  a = 1 + 2 * 3 / 5;
  b = (1 + 2) * 3 / 5;
  c = (1 + 2) * (3 - 5);
  d = x | y ^ z;
  e = (x | y) ^ z;
  f = "a" + (1 + 2) + "b";
  g = "a" + (1 - 2) + "b";
  a = true || false && null;
  b = c == d || e != f;
  c = x instanceof y || x instanceof z;
  d = x == y && y != z;
  a = !false;
  b = !x instanceof Number;
  c = !(x instanceof Number);
  d = typeof a === 'boolean';
  e = !typeof a === 'boolean';
  f = !(typeof a === 'boolean');
  a = (1.1).toString();
  b = new A().toString();
  c = new x.A().toString();
  d = new x.y().z();
  var r = (/ab+c/i).exec('abc');
  a = b ** 2 * 3;
  c = (d ** 2) ** 3;
  e = f ** 2 ** 3;
  f = a + (b = 3);
  g = 1 && (() => {});
  g = (() => {}) && 1;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `var a, b, c, d, e, f, g, x, y, z;
    a = 1 + 2 * 3 / 5;
    b = (1 + 2) * 3 / 5;
    c = (1 + 2) * (3 - 5);
    d = x | y ^ z;
    e = (x | y) ^ z;
    f = "a" + (1 + 2) + "b";
    g = "a" + (1 - 2) + "b";
    a = true || false && null;
    b = c == d || e != f;
    c = x instanceof y || x instanceof z;
    d = x == y && y != z;
    a = !false;
    b = !x instanceof Number;
    c = !(x instanceof Number);
    d = typeof a === 'boolean';
    e = !typeof a === 'boolean';
    f = !(typeof a === 'boolean');
    a = (1.1).toString();
    b = new A().toString();
    c = new x.A().toString();
    d = new x.y().z();
    var r = (/ab+c/i).exec('abc');
    a = b ** 2 * 3;
    c = (d ** 2) ** 3;
    e = f ** 2 ** 3;
    f = a + (b = 3);
    g = 1 && (() => {});
    g = (() => {}) && 1;`,
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
                      "init": null,
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
                  {
                      "type": "VariableDeclarator",
                      "init": null,
                      "id": {
                          "type": "Identifier",
                          "name": "b",
                          "start": 7,
                          "end": 8,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 7
                              },
                              "end": {
                                  "line": 1,
                                  "column": 8
                              }
                          }
                      },
                      "start": 7,
                      "end": 8,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 7
                          },
                          "end": {
                              "line": 1,
                              "column": 8
                          }
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "init": null,
                      "id": {
                          "type": "Identifier",
                          "name": "c",
                          "start": 10,
                          "end": 11,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 10
                              },
                              "end": {
                                  "line": 1,
                                  "column": 11
                              }
                          }
                      },
                      "start": 10,
                      "end": 11,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 10
                          },
                          "end": {
                              "line": 1,
                              "column": 11
                          }
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "init": null,
                      "id": {
                          "type": "Identifier",
                          "name": "d",
                          "start": 13,
                          "end": 14,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 13
                              },
                              "end": {
                                  "line": 1,
                                  "column": 14
                              }
                          }
                      },
                      "start": 13,
                      "end": 14,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 14
                          }
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "init": null,
                      "id": {
                          "type": "Identifier",
                          "name": "e",
                          "start": 16,
                          "end": 17,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 16
                              },
                              "end": {
                                  "line": 1,
                                  "column": 17
                              }
                          }
                      },
                      "start": 16,
                      "end": 17,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 16
                          },
                          "end": {
                              "line": 1,
                              "column": 17
                          }
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "init": null,
                      "id": {
                          "type": "Identifier",
                          "name": "f",
                          "start": 19,
                          "end": 20,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 19
                              },
                              "end": {
                                  "line": 1,
                                  "column": 20
                              }
                          }
                      },
                      "start": 19,
                      "end": 20,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 19
                          },
                          "end": {
                              "line": 1,
                              "column": 20
                          }
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "init": null,
                      "id": {
                          "type": "Identifier",
                          "name": "g",
                          "start": 22,
                          "end": 23,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 22
                              },
                              "end": {
                                  "line": 1,
                                  "column": 23
                              }
                          }
                      },
                      "start": 22,
                      "end": 23,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 22
                          },
                          "end": {
                              "line": 1,
                              "column": 23
                          }
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "init": null,
                      "id": {
                          "type": "Identifier",
                          "name": "x",
                          "start": 25,
                          "end": 26,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 25
                              },
                              "end": {
                                  "line": 1,
                                  "column": 26
                              }
                          }
                      },
                      "start": 25,
                      "end": 26,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 25
                          },
                          "end": {
                              "line": 1,
                              "column": 26
                          }
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "init": null,
                      "id": {
                          "type": "Identifier",
                          "name": "y",
                          "start": 28,
                          "end": 29,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 28
                              },
                              "end": {
                                  "line": 1,
                                  "column": 29
                              }
                          }
                      },
                      "start": 28,
                      "end": 29,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 28
                          },
                          "end": {
                              "line": 1,
                              "column": 29
                          }
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "init": null,
                      "id": {
                          "type": "Identifier",
                          "name": "z",
                          "start": 31,
                          "end": 32,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 31
                              },
                              "end": {
                                  "line": 1,
                                  "column": 32
                              }
                          }
                      },
                      "start": 31,
                      "end": 32,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 31
                          },
                          "end": {
                              "line": 1,
                              "column": 32
                          }
                      }
                  }
              ],
              "start": 0,
              "end": 33,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 33
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "a",
                      "start": 38,
                      "end": 39,
                      "loc": {
                          "start": {
                              "line": 2,
                              "column": 4
                          },
                          "end": {
                              "line": 2,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "Literal",
                          "value": 1,
                          "start": 42,
                          "end": 43,
                          "loc": {
                              "start": {
                                  "line": 2,
                                  "column": 8
                              },
                              "end": {
                                  "line": 2,
                                  "column": 9
                              }
                          },
                          "raw": "1"
                      },
                      "right": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "BinaryExpression",
                              "left": {
                                  "type": "Literal",
                                  "value": 2,
                                  "start": 46,
                                  "end": 47,
                                  "loc": {
                                      "start": {
                                          "line": 2,
                                          "column": 12
                                      },
                                      "end": {
                                          "line": 2,
                                          "column": 13
                                      }
                                  },
                                  "raw": "2"
                              },
                              "right": {
                                  "type": "Literal",
                                  "value": 3,
                                  "start": 50,
                                  "end": 51,
                                  "loc": {
                                      "start": {
                                          "line": 2,
                                          "column": 16
                                      },
                                      "end": {
                                          "line": 2,
                                          "column": 17
                                      }
                                  },
                                  "raw": "3"
                              },
                              "operator": "*",
                              "start": 46,
                              "end": 51,
                              "loc": {
                                  "start": {
                                      "line": 2,
                                      "column": 12
                                  },
                                  "end": {
                                      "line": 2,
                                      "column": 17
                                  }
                              }
                          },
                          "right": {
                              "type": "Literal",
                              "value": 5,
                              "start": 54,
                              "end": 55,
                              "loc": {
                                  "start": {
                                      "line": 2,
                                      "column": 20
                                  },
                                  "end": {
                                      "line": 2,
                                      "column": 21
                                  }
                              },
                              "raw": "5"
                          },
                          "operator": "/",
                          "start": 46,
                          "end": 55,
                          "loc": {
                              "start": {
                                  "line": 2,
                                  "column": 12
                              },
                              "end": {
                                  "line": 2,
                                  "column": 21
                              }
                          }
                      },
                      "operator": "+",
                      "start": 42,
                      "end": 55,
                      "loc": {
                          "start": {
                              "line": 2,
                              "column": 8
                          },
                          "end": {
                              "line": 2,
                              "column": 21
                          }
                      }
                  },
                  "start": 38,
                  "end": 55,
                  "loc": {
                      "start": {
                          "line": 2,
                          "column": 4
                      },
                      "end": {
                          "line": 2,
                          "column": 21
                      }
                  }
              },
              "start": 38,
              "end": 56,
              "loc": {
                  "start": {
                      "line": 2,
                      "column": 4
                  },
                  "end": {
                      "line": 2,
                      "column": 22
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "b",
                      "start": 61,
                      "end": 62,
                      "loc": {
                          "start": {
                              "line": 3,
                              "column": 4
                          },
                          "end": {
                              "line": 3,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "BinaryExpression",
                              "left": {
                                  "type": "Literal",
                                  "value": 1,
                                  "start": 66,
                                  "end": 67,
                                  "loc": {
                                      "start": {
                                          "line": 3,
                                          "column": 9
                                      },
                                      "end": {
                                          "line": 3,
                                          "column": 10
                                      }
                                  },
                                  "raw": "1"
                              },
                              "right": {
                                  "type": "Literal",
                                  "value": 2,
                                  "start": 70,
                                  "end": 71,
                                  "loc": {
                                      "start": {
                                          "line": 3,
                                          "column": 13
                                      },
                                      "end": {
                                          "line": 3,
                                          "column": 14
                                      }
                                  },
                                  "raw": "2"
                              },
                              "operator": "+",
                              "start": 66,
                              "end": 71,
                              "loc": {
                                  "start": {
                                      "line": 3,
                                      "column": 9
                                  },
                                  "end": {
                                      "line": 3,
                                      "column": 14
                                  }
                              }
                          },
                          "right": {
                              "type": "Literal",
                              "value": 3,
                              "start": 75,
                              "end": 76,
                              "loc": {
                                  "start": {
                                      "line": 3,
                                      "column": 18
                                  },
                                  "end": {
                                      "line": 3,
                                      "column": 19
                                  }
                              },
                              "raw": "3"
                          },
                          "operator": "*",
                          "start": 65,
                          "end": 76,
                          "loc": {
                              "start": {
                                  "line": 3,
                                  "column": 8
                              },
                              "end": {
                                  "line": 3,
                                  "column": 19
                              }
                          }
                      },
                      "right": {
                          "type": "Literal",
                          "value": 5,
                          "start": 79,
                          "end": 80,
                          "loc": {
                              "start": {
                                  "line": 3,
                                  "column": 22
                              },
                              "end": {
                                  "line": 3,
                                  "column": 23
                              }
                          },
                          "raw": "5"
                      },
                      "operator": "/",
                      "start": 65,
                      "end": 80,
                      "loc": {
                          "start": {
                              "line": 3,
                              "column": 8
                          },
                          "end": {
                              "line": 3,
                              "column": 23
                          }
                      }
                  },
                  "start": 61,
                  "end": 80,
                  "loc": {
                      "start": {
                          "line": 3,
                          "column": 4
                      },
                      "end": {
                          "line": 3,
                          "column": 23
                      }
                  }
              },
              "start": 61,
              "end": 81,
              "loc": {
                  "start": {
                      "line": 3,
                      "column": 4
                  },
                  "end": {
                      "line": 3,
                      "column": 24
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "c",
                      "start": 86,
                      "end": 87,
                      "loc": {
                          "start": {
                              "line": 4,
                              "column": 4
                          },
                          "end": {
                              "line": 4,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Literal",
                              "value": 1,
                              "start": 91,
                              "end": 92,
                              "loc": {
                                  "start": {
                                      "line": 4,
                                      "column": 9
                                  },
                                  "end": {
                                      "line": 4,
                                      "column": 10
                                  }
                              },
                              "raw": "1"
                          },
                          "right": {
                              "type": "Literal",
                              "value": 2,
                              "start": 95,
                              "end": 96,
                              "loc": {
                                  "start": {
                                      "line": 4,
                                      "column": 13
                                  },
                                  "end": {
                                      "line": 4,
                                      "column": 14
                                  }
                              },
                              "raw": "2"
                          },
                          "operator": "+",
                          "start": 91,
                          "end": 96,
                          "loc": {
                              "start": {
                                  "line": 4,
                                  "column": 9
                              },
                              "end": {
                                  "line": 4,
                                  "column": 14
                              }
                          }
                      },
                      "right": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Literal",
                              "value": 3,
                              "start": 101,
                              "end": 102,
                              "loc": {
                                  "start": {
                                      "line": 4,
                                      "column": 19
                                  },
                                  "end": {
                                      "line": 4,
                                      "column": 20
                                  }
                              },
                              "raw": "3"
                          },
                          "right": {
                              "type": "Literal",
                              "value": 5,
                              "start": 105,
                              "end": 106,
                              "loc": {
                                  "start": {
                                      "line": 4,
                                      "column": 23
                                  },
                                  "end": {
                                      "line": 4,
                                      "column": 24
                                  }
                              },
                              "raw": "5"
                          },
                          "operator": "-",
                          "start": 101,
                          "end": 106,
                          "loc": {
                              "start": {
                                  "line": 4,
                                  "column": 19
                              },
                              "end": {
                                  "line": 4,
                                  "column": 24
                              }
                          }
                      },
                      "operator": "*",
                      "start": 90,
                      "end": 107,
                      "loc": {
                          "start": {
                              "line": 4,
                              "column": 8
                          },
                          "end": {
                              "line": 4,
                              "column": 25
                          }
                      }
                  },
                  "start": 86,
                  "end": 107,
                  "loc": {
                      "start": {
                          "line": 4,
                          "column": 4
                      },
                      "end": {
                          "line": 4,
                          "column": 25
                      }
                  }
              },
              "start": 86,
              "end": 108,
              "loc": {
                  "start": {
                      "line": 4,
                      "column": 4
                  },
                  "end": {
                      "line": 4,
                      "column": 26
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "d",
                      "start": 113,
                      "end": 114,
                      "loc": {
                          "start": {
                              "line": 5,
                              "column": 4
                          },
                          "end": {
                              "line": 5,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "Identifier",
                          "name": "x",
                          "start": 117,
                          "end": 118,
                          "loc": {
                              "start": {
                                  "line": 5,
                                  "column": 8
                              },
                              "end": {
                                  "line": 5,
                                  "column": 9
                              }
                          }
                      },
                      "right": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Identifier",
                              "name": "y",
                              "start": 121,
                              "end": 122,
                              "loc": {
                                  "start": {
                                      "line": 5,
                                      "column": 12
                                  },
                                  "end": {
                                      "line": 5,
                                      "column": 13
                                  }
                              }
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "z",
                              "start": 125,
                              "end": 126,
                              "loc": {
                                  "start": {
                                      "line": 5,
                                      "column": 16
                                  },
                                  "end": {
                                      "line": 5,
                                      "column": 17
                                  }
                              }
                          },
                          "operator": "^",
                          "start": 121,
                          "end": 126,
                          "loc": {
                              "start": {
                                  "line": 5,
                                  "column": 12
                              },
                              "end": {
                                  "line": 5,
                                  "column": 17
                              }
                          }
                      },
                      "operator": "|",
                      "start": 117,
                      "end": 126,
                      "loc": {
                          "start": {
                              "line": 5,
                              "column": 8
                          },
                          "end": {
                              "line": 5,
                              "column": 17
                          }
                      }
                  },
                  "start": 113,
                  "end": 126,
                  "loc": {
                      "start": {
                          "line": 5,
                          "column": 4
                      },
                      "end": {
                          "line": 5,
                          "column": 17
                      }
                  }
              },
              "start": 113,
              "end": 127,
              "loc": {
                  "start": {
                      "line": 5,
                      "column": 4
                  },
                  "end": {
                      "line": 5,
                      "column": 18
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "e",
                      "start": 132,
                      "end": 133,
                      "loc": {
                          "start": {
                              "line": 6,
                              "column": 4
                          },
                          "end": {
                              "line": 6,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Identifier",
                              "name": "x",
                              "start": 137,
                              "end": 138,
                              "loc": {
                                  "start": {
                                      "line": 6,
                                      "column": 9
                                  },
                                  "end": {
                                      "line": 6,
                                      "column": 10
                                  }
                              }
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "y",
                              "start": 141,
                              "end": 142,
                              "loc": {
                                  "start": {
                                      "line": 6,
                                      "column": 13
                                  },
                                  "end": {
                                      "line": 6,
                                      "column": 14
                                  }
                              }
                          },
                          "operator": "|",
                          "start": 137,
                          "end": 142,
                          "loc": {
                              "start": {
                                  "line": 6,
                                  "column": 9
                              },
                              "end": {
                                  "line": 6,
                                  "column": 14
                              }
                          }
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "z",
                          "start": 146,
                          "end": 147,
                          "loc": {
                              "start": {
                                  "line": 6,
                                  "column": 18
                              },
                              "end": {
                                  "line": 6,
                                  "column": 19
                              }
                          }
                      },
                      "operator": "^",
                      "start": 136,
                      "end": 147,
                      "loc": {
                          "start": {
                              "line": 6,
                              "column": 8
                          },
                          "end": {
                              "line": 6,
                              "column": 19
                          }
                      }
                  },
                  "start": 132,
                  "end": 147,
                  "loc": {
                      "start": {
                          "line": 6,
                          "column": 4
                      },
                      "end": {
                          "line": 6,
                          "column": 19
                      }
                  }
              },
              "start": 132,
              "end": 148,
              "loc": {
                  "start": {
                      "line": 6,
                      "column": 4
                  },
                  "end": {
                      "line": 6,
                      "column": 20
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "f",
                      "start": 153,
                      "end": 154,
                      "loc": {
                          "start": {
                              "line": 7,
                              "column": 4
                          },
                          "end": {
                              "line": 7,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Literal",
                              "value": "a",
                              "start": 157,
                              "end": 160,
                              "loc": {
                                  "start": {
                                      "line": 7,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 7,
                                      "column": 11
                                  }
                              },
                              "raw": "\"a\""
                          },
                          "right": {
                              "type": "BinaryExpression",
                              "left": {
                                  "type": "Literal",
                                  "value": 1,
                                  "start": 164,
                                  "end": 165,
                                  "loc": {
                                      "start": {
                                          "line": 7,
                                          "column": 15
                                      },
                                      "end": {
                                          "line": 7,
                                          "column": 16
                                      }
                                  },
                                  "raw": "1"
                              },
                              "right": {
                                  "type": "Literal",
                                  "value": 2,
                                  "start": 168,
                                  "end": 169,
                                  "loc": {
                                      "start": {
                                          "line": 7,
                                          "column": 19
                                      },
                                      "end": {
                                          "line": 7,
                                          "column": 20
                                      }
                                  },
                                  "raw": "2"
                              },
                              "operator": "+",
                              "start": 164,
                              "end": 169,
                              "loc": {
                                  "start": {
                                      "line": 7,
                                      "column": 15
                                  },
                                  "end": {
                                      "line": 7,
                                      "column": 20
                                  }
                              }
                          },
                          "operator": "+",
                          "start": 157,
                          "end": 170,
                          "loc": {
                              "start": {
                                  "line": 7,
                                  "column": 8
                              },
                              "end": {
                                  "line": 7,
                                  "column": 21
                              }
                          }
                      },
                      "right": {
                          "type": "Literal",
                          "value": "b",
                          "start": 173,
                          "end": 176,
                          "loc": {
                              "start": {
                                  "line": 7,
                                  "column": 24
                              },
                              "end": {
                                  "line": 7,
                                  "column": 27
                              }
                          },
                          "raw": "\"b\""
                      },
                      "operator": "+",
                      "start": 157,
                      "end": 176,
                      "loc": {
                          "start": {
                              "line": 7,
                              "column": 8
                          },
                          "end": {
                              "line": 7,
                              "column": 27
                          }
                      }
                  },
                  "start": 153,
                  "end": 176,
                  "loc": {
                      "start": {
                          "line": 7,
                          "column": 4
                      },
                      "end": {
                          "line": 7,
                          "column": 27
                      }
                  }
              },
              "start": 153,
              "end": 177,
              "loc": {
                  "start": {
                      "line": 7,
                      "column": 4
                  },
                  "end": {
                      "line": 7,
                      "column": 28
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "g",
                      "start": 182,
                      "end": 183,
                      "loc": {
                          "start": {
                              "line": 8,
                              "column": 4
                          },
                          "end": {
                              "line": 8,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Literal",
                              "value": "a",
                              "start": 186,
                              "end": 189,
                              "loc": {
                                  "start": {
                                      "line": 8,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 8,
                                      "column": 11
                                  }
                              },
                              "raw": "\"a\""
                          },
                          "right": {
                              "type": "BinaryExpression",
                              "left": {
                                  "type": "Literal",
                                  "value": 1,
                                  "start": 193,
                                  "end": 194,
                                  "loc": {
                                      "start": {
                                          "line": 8,
                                          "column": 15
                                      },
                                      "end": {
                                          "line": 8,
                                          "column": 16
                                      }
                                  },
                                  "raw": "1"
                              },
                              "right": {
                                  "type": "Literal",
                                  "value": 2,
                                  "start": 197,
                                  "end": 198,
                                  "loc": {
                                      "start": {
                                          "line": 8,
                                          "column": 19
                                      },
                                      "end": {
                                          "line": 8,
                                          "column": 20
                                      }
                                  },
                                  "raw": "2"
                              },
                              "operator": "-",
                              "start": 193,
                              "end": 198,
                              "loc": {
                                  "start": {
                                      "line": 8,
                                      "column": 15
                                  },
                                  "end": {
                                      "line": 8,
                                      "column": 20
                                  }
                              }
                          },
                          "operator": "+",
                          "start": 186,
                          "end": 199,
                          "loc": {
                              "start": {
                                  "line": 8,
                                  "column": 8
                              },
                              "end": {
                                  "line": 8,
                                  "column": 21
                              }
                          }
                      },
                      "right": {
                          "type": "Literal",
                          "value": "b",
                          "start": 202,
                          "end": 205,
                          "loc": {
                              "start": {
                                  "line": 8,
                                  "column": 24
                              },
                              "end": {
                                  "line": 8,
                                  "column": 27
                              }
                          },
                          "raw": "\"b\""
                      },
                      "operator": "+",
                      "start": 186,
                      "end": 205,
                      "loc": {
                          "start": {
                              "line": 8,
                              "column": 8
                          },
                          "end": {
                              "line": 8,
                              "column": 27
                          }
                      }
                  },
                  "start": 182,
                  "end": 205,
                  "loc": {
                      "start": {
                          "line": 8,
                          "column": 4
                      },
                      "end": {
                          "line": 8,
                          "column": 27
                      }
                  }
              },
              "start": 182,
              "end": 206,
              "loc": {
                  "start": {
                      "line": 8,
                      "column": 4
                  },
                  "end": {
                      "line": 8,
                      "column": 28
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "a",
                      "start": 211,
                      "end": 212,
                      "loc": {
                          "start": {
                              "line": 9,
                              "column": 4
                          },
                          "end": {
                              "line": 9,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "LogicalExpression",
                      "left": {
                          "type": "Literal",
                          "value": true,
                          "start": 215,
                          "end": 219,
                          "loc": {
                              "start": {
                                  "line": 9,
                                  "column": 8
                              },
                              "end": {
                                  "line": 9,
                                  "column": 12
                              }
                          },
                          "raw": "true"
                      },
                      "right": {
                          "type": "LogicalExpression",
                          "left": {
                              "type": "Literal",
                              "value": false,
                              "start": 223,
                              "end": 228,
                              "loc": {
                                  "start": {
                                      "line": 9,
                                      "column": 16
                                  },
                                  "end": {
                                      "line": 9,
                                      "column": 21
                                  }
                              },
                              "raw": "false"
                          },
                          "right": {
                              "type": "Literal",
                              "value": null,
                              "start": 232,
                              "end": 236,
                              "loc": {
                                  "start": {
                                      "line": 9,
                                      "column": 25
                                  },
                                  "end": {
                                      "line": 9,
                                      "column": 29
                                  }
                              },
                              "raw": "null"
                          },
                          "operator": "&&",
                          "start": 223,
                          "end": 236,
                          "loc": {
                              "start": {
                                  "line": 9,
                                  "column": 16
                              },
                              "end": {
                                  "line": 9,
                                  "column": 29
                              }
                          }
                      },
                      "operator": "||",
                      "start": 215,
                      "end": 236,
                      "loc": {
                          "start": {
                              "line": 9,
                              "column": 8
                          },
                          "end": {
                              "line": 9,
                              "column": 29
                          }
                      }
                  },
                  "start": 211,
                  "end": 236,
                  "loc": {
                      "start": {
                          "line": 9,
                          "column": 4
                      },
                      "end": {
                          "line": 9,
                          "column": 29
                      }
                  }
              },
              "start": 211,
              "end": 237,
              "loc": {
                  "start": {
                      "line": 9,
                      "column": 4
                  },
                  "end": {
                      "line": 9,
                      "column": 30
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "b",
                      "start": 242,
                      "end": 243,
                      "loc": {
                          "start": {
                              "line": 10,
                              "column": 4
                          },
                          "end": {
                              "line": 10,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "LogicalExpression",
                      "left": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Identifier",
                              "name": "c",
                              "start": 246,
                              "end": 247,
                              "loc": {
                                  "start": {
                                      "line": 10,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 10,
                                      "column": 9
                                  }
                              }
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "d",
                              "start": 251,
                              "end": 252,
                              "loc": {
                                  "start": {
                                      "line": 10,
                                      "column": 13
                                  },
                                  "end": {
                                      "line": 10,
                                      "column": 14
                                  }
                              }
                          },
                          "operator": "==",
                          "start": 246,
                          "end": 252,
                          "loc": {
                              "start": {
                                  "line": 10,
                                  "column": 8
                              },
                              "end": {
                                  "line": 10,
                                  "column": 14
                              }
                          }
                      },
                      "right": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Identifier",
                              "name": "e",
                              "start": 256,
                              "end": 257,
                              "loc": {
                                  "start": {
                                      "line": 10,
                                      "column": 18
                                  },
                                  "end": {
                                      "line": 10,
                                      "column": 19
                                  }
                              }
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "f",
                              "start": 261,
                              "end": 262,
                              "loc": {
                                  "start": {
                                      "line": 10,
                                      "column": 23
                                  },
                                  "end": {
                                      "line": 10,
                                      "column": 24
                                  }
                              }
                          },
                          "operator": "!=",
                          "start": 256,
                          "end": 262,
                          "loc": {
                              "start": {
                                  "line": 10,
                                  "column": 18
                              },
                              "end": {
                                  "line": 10,
                                  "column": 24
                              }
                          }
                      },
                      "operator": "||",
                      "start": 246,
                      "end": 262,
                      "loc": {
                          "start": {
                              "line": 10,
                              "column": 8
                          },
                          "end": {
                              "line": 10,
                              "column": 24
                          }
                      }
                  },
                  "start": 242,
                  "end": 262,
                  "loc": {
                      "start": {
                          "line": 10,
                          "column": 4
                      },
                      "end": {
                          "line": 10,
                          "column": 24
                      }
                  }
              },
              "start": 242,
              "end": 263,
              "loc": {
                  "start": {
                      "line": 10,
                      "column": 4
                  },
                  "end": {
                      "line": 10,
                      "column": 25
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "c",
                      "start": 268,
                      "end": 269,
                      "loc": {
                          "start": {
                              "line": 11,
                              "column": 4
                          },
                          "end": {
                              "line": 11,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "LogicalExpression",
                      "left": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Identifier",
                              "name": "x",
                              "start": 272,
                              "end": 273,
                              "loc": {
                                  "start": {
                                      "line": 11,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 11,
                                      "column": 9
                                  }
                              }
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "y",
                              "start": 285,
                              "end": 286,
                              "loc": {
                                  "start": {
                                      "line": 11,
                                      "column": 21
                                  },
                                  "end": {
                                      "line": 11,
                                      "column": 22
                                  }
                              }
                          },
                          "operator": "instanceof",
                          "start": 272,
                          "end": 286,
                          "loc": {
                              "start": {
                                  "line": 11,
                                  "column": 8
                              },
                              "end": {
                                  "line": 11,
                                  "column": 22
                              }
                          }
                      },
                      "right": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Identifier",
                              "name": "x",
                              "start": 290,
                              "end": 291,
                              "loc": {
                                  "start": {
                                      "line": 11,
                                      "column": 26
                                  },
                                  "end": {
                                      "line": 11,
                                      "column": 27
                                  }
                              }
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "z",
                              "start": 303,
                              "end": 304,
                              "loc": {
                                  "start": {
                                      "line": 11,
                                      "column": 39
                                  },
                                  "end": {
                                      "line": 11,
                                      "column": 40
                                  }
                              }
                          },
                          "operator": "instanceof",
                          "start": 290,
                          "end": 304,
                          "loc": {
                              "start": {
                                  "line": 11,
                                  "column": 26
                              },
                              "end": {
                                  "line": 11,
                                  "column": 40
                              }
                          }
                      },
                      "operator": "||",
                      "start": 272,
                      "end": 304,
                      "loc": {
                          "start": {
                              "line": 11,
                              "column": 8
                          },
                          "end": {
                              "line": 11,
                              "column": 40
                          }
                      }
                  },
                  "start": 268,
                  "end": 304,
                  "loc": {
                      "start": {
                          "line": 11,
                          "column": 4
                      },
                      "end": {
                          "line": 11,
                          "column": 40
                      }
                  }
              },
              "start": 268,
              "end": 305,
              "loc": {
                  "start": {
                      "line": 11,
                      "column": 4
                  },
                  "end": {
                      "line": 11,
                      "column": 41
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "d",
                      "start": 310,
                      "end": 311,
                      "loc": {
                          "start": {
                              "line": 12,
                              "column": 4
                          },
                          "end": {
                              "line": 12,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "LogicalExpression",
                      "left": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Identifier",
                              "name": "x",
                              "start": 314,
                              "end": 315,
                              "loc": {
                                  "start": {
                                      "line": 12,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 12,
                                      "column": 9
                                  }
                              }
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "y",
                              "start": 319,
                              "end": 320,
                              "loc": {
                                  "start": {
                                      "line": 12,
                                      "column": 13
                                  },
                                  "end": {
                                      "line": 12,
                                      "column": 14
                                  }
                              }
                          },
                          "operator": "==",
                          "start": 314,
                          "end": 320,
                          "loc": {
                              "start": {
                                  "line": 12,
                                  "column": 8
                              },
                              "end": {
                                  "line": 12,
                                  "column": 14
                              }
                          }
                      },
                      "right": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Identifier",
                              "name": "y",
                              "start": 324,
                              "end": 325,
                              "loc": {
                                  "start": {
                                      "line": 12,
                                      "column": 18
                                  },
                                  "end": {
                                      "line": 12,
                                      "column": 19
                                  }
                              }
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "z",
                              "start": 329,
                              "end": 330,
                              "loc": {
                                  "start": {
                                      "line": 12,
                                      "column": 23
                                  },
                                  "end": {
                                      "line": 12,
                                      "column": 24
                                  }
                              }
                          },
                          "operator": "!=",
                          "start": 324,
                          "end": 330,
                          "loc": {
                              "start": {
                                  "line": 12,
                                  "column": 18
                              },
                              "end": {
                                  "line": 12,
                                  "column": 24
                              }
                          }
                      },
                      "operator": "&&",
                      "start": 314,
                      "end": 330,
                      "loc": {
                          "start": {
                              "line": 12,
                              "column": 8
                          },
                          "end": {
                              "line": 12,
                              "column": 24
                          }
                      }
                  },
                  "start": 310,
                  "end": 330,
                  "loc": {
                      "start": {
                          "line": 12,
                          "column": 4
                      },
                      "end": {
                          "line": 12,
                          "column": 24
                      }
                  }
              },
              "start": 310,
              "end": 331,
              "loc": {
                  "start": {
                      "line": 12,
                      "column": 4
                  },
                  "end": {
                      "line": 12,
                      "column": 25
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "a",
                      "start": 336,
                      "end": 337,
                      "loc": {
                          "start": {
                              "line": 13,
                              "column": 4
                          },
                          "end": {
                              "line": 13,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "UnaryExpression",
                      "operator": "!",
                      "argument": {
                          "type": "Literal",
                          "value": false,
                          "start": 341,
                          "end": 346,
                          "loc": {
                              "start": {
                                  "line": 13,
                                  "column": 9
                              },
                              "end": {
                                  "line": 13,
                                  "column": 14
                              }
                          },
                          "raw": "false"
                      },
                      "prefix": true,
                      "start": 340,
                      "end": 346,
                      "loc": {
                          "start": {
                              "line": 13,
                              "column": 8
                          },
                          "end": {
                              "line": 13,
                              "column": 14
                          }
                      }
                  },
                  "start": 336,
                  "end": 346,
                  "loc": {
                      "start": {
                          "line": 13,
                          "column": 4
                      },
                      "end": {
                          "line": 13,
                          "column": 14
                      }
                  }
              },
              "start": 336,
              "end": 347,
              "loc": {
                  "start": {
                      "line": 13,
                      "column": 4
                  },
                  "end": {
                      "line": 13,
                      "column": 15
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "b",
                      "start": 352,
                      "end": 353,
                      "loc": {
                          "start": {
                              "line": 14,
                              "column": 4
                          },
                          "end": {
                              "line": 14,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "UnaryExpression",
                          "operator": "!",
                          "argument": {
                              "type": "Identifier",
                              "name": "x",
                              "start": 357,
                              "end": 358,
                              "loc": {
                                  "start": {
                                      "line": 14,
                                      "column": 9
                                  },
                                  "end": {
                                      "line": 14,
                                      "column": 10
                                  }
                              }
                          },
                          "prefix": true,
                          "start": 356,
                          "end": 358,
                          "loc": {
                              "start": {
                                  "line": 14,
                                  "column": 8
                              },
                              "end": {
                                  "line": 14,
                                  "column": 10
                              }
                          }
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "Number",
                          "start": 370,
                          "end": 376,
                          "loc": {
                              "start": {
                                  "line": 14,
                                  "column": 22
                              },
                              "end": {
                                  "line": 14,
                                  "column": 28
                              }
                          }
                      },
                      "operator": "instanceof",
                      "start": 356,
                      "end": 376,
                      "loc": {
                          "start": {
                              "line": 14,
                              "column": 8
                          },
                          "end": {
                              "line": 14,
                              "column": 28
                          }
                      }
                  },
                  "start": 352,
                  "end": 376,
                  "loc": {
                      "start": {
                          "line": 14,
                          "column": 4
                      },
                      "end": {
                          "line": 14,
                          "column": 28
                      }
                  }
              },
              "start": 352,
              "end": 377,
              "loc": {
                  "start": {
                      "line": 14,
                      "column": 4
                  },
                  "end": {
                      "line": 14,
                      "column": 29
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "c",
                      "start": 382,
                      "end": 383,
                      "loc": {
                          "start": {
                              "line": 15,
                              "column": 4
                          },
                          "end": {
                              "line": 15,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "UnaryExpression",
                      "operator": "!",
                      "argument": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Identifier",
                              "name": "x",
                              "start": 388,
                              "end": 389,
                              "loc": {
                                  "start": {
                                      "line": 15,
                                      "column": 10
                                  },
                                  "end": {
                                      "line": 15,
                                      "column": 11
                                  }
                              }
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "Number",
                              "start": 401,
                              "end": 407,
                              "loc": {
                                  "start": {
                                      "line": 15,
                                      "column": 23
                                  },
                                  "end": {
                                      "line": 15,
                                      "column": 29
                                  }
                              }
                          },
                          "operator": "instanceof",
                          "start": 388,
                          "end": 407,
                          "loc": {
                              "start": {
                                  "line": 15,
                                  "column": 10
                              },
                              "end": {
                                  "line": 15,
                                  "column": 29
                              }
                          }
                      },
                      "prefix": true,
                      "start": 386,
                      "end": 408,
                      "loc": {
                          "start": {
                              "line": 15,
                              "column": 8
                          },
                          "end": {
                              "line": 15,
                              "column": 30
                          }
                      }
                  },
                  "start": 382,
                  "end": 408,
                  "loc": {
                      "start": {
                          "line": 15,
                          "column": 4
                      },
                      "end": {
                          "line": 15,
                          "column": 30
                      }
                  }
              },
              "start": 382,
              "end": 409,
              "loc": {
                  "start": {
                      "line": 15,
                      "column": 4
                  },
                  "end": {
                      "line": 15,
                      "column": 31
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "d",
                      "start": 414,
                      "end": 415,
                      "loc": {
                          "start": {
                              "line": 16,
                              "column": 4
                          },
                          "end": {
                              "line": 16,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "UnaryExpression",
                          "operator": "typeof",
                          "argument": {
                              "type": "Identifier",
                              "name": "a",
                              "start": 425,
                              "end": 426,
                              "loc": {
                                  "start": {
                                      "line": 16,
                                      "column": 15
                                  },
                                  "end": {
                                      "line": 16,
                                      "column": 16
                                  }
                              }
                          },
                          "prefix": true,
                          "start": 418,
                          "end": 426,
                          "loc": {
                              "start": {
                                  "line": 16,
                                  "column": 8
                              },
                              "end": {
                                  "line": 16,
                                  "column": 16
                              }
                          }
                      },
                      "right": {
                          "type": "Literal",
                          "value": "boolean",
                          "start": 431,
                          "end": 440,
                          "loc": {
                              "start": {
                                  "line": 16,
                                  "column": 21
                              },
                              "end": {
                                  "line": 16,
                                  "column": 30
                              }
                          },
                          "raw": "'boolean'"
                      },
                      "operator": "===",
                      "start": 418,
                      "end": 440,
                      "loc": {
                          "start": {
                              "line": 16,
                              "column": 8
                          },
                          "end": {
                              "line": 16,
                              "column": 30
                          }
                      }
                  },
                  "start": 414,
                  "end": 440,
                  "loc": {
                      "start": {
                          "line": 16,
                          "column": 4
                      },
                      "end": {
                          "line": 16,
                          "column": 30
                      }
                  }
              },
              "start": 414,
              "end": 441,
              "loc": {
                  "start": {
                      "line": 16,
                      "column": 4
                  },
                  "end": {
                      "line": 16,
                      "column": 31
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "e",
                      "start": 446,
                      "end": 447,
                      "loc": {
                          "start": {
                              "line": 17,
                              "column": 4
                          },
                          "end": {
                              "line": 17,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "UnaryExpression",
                          "operator": "!",
                          "argument": {
                              "type": "UnaryExpression",
                              "operator": "typeof",
                              "argument": {
                                  "type": "Identifier",
                                  "name": "a",
                                  "start": 458,
                                  "end": 459,
                                  "loc": {
                                      "start": {
                                          "line": 17,
                                          "column": 16
                                      },
                                      "end": {
                                          "line": 17,
                                          "column": 17
                                      }
                                  }
                              },
                              "prefix": true,
                              "start": 451,
                              "end": 459,
                              "loc": {
                                  "start": {
                                      "line": 17,
                                      "column": 9
                                  },
                                  "end": {
                                      "line": 17,
                                      "column": 17
                                  }
                              }
                          },
                          "prefix": true,
                          "start": 450,
                          "end": 459,
                          "loc": {
                              "start": {
                                  "line": 17,
                                  "column": 8
                              },
                              "end": {
                                  "line": 17,
                                  "column": 17
                              }
                          }
                      },
                      "right": {
                          "type": "Literal",
                          "value": "boolean",
                          "start": 464,
                          "end": 473,
                          "loc": {
                              "start": {
                                  "line": 17,
                                  "column": 22
                              },
                              "end": {
                                  "line": 17,
                                  "column": 31
                              }
                          },
                          "raw": "'boolean'"
                      },
                      "operator": "===",
                      "start": 450,
                      "end": 473,
                      "loc": {
                          "start": {
                              "line": 17,
                              "column": 8
                          },
                          "end": {
                              "line": 17,
                              "column": 31
                          }
                      }
                  },
                  "start": 446,
                  "end": 473,
                  "loc": {
                      "start": {
                          "line": 17,
                          "column": 4
                      },
                      "end": {
                          "line": 17,
                          "column": 31
                      }
                  }
              },
              "start": 446,
              "end": 474,
              "loc": {
                  "start": {
                      "line": 17,
                      "column": 4
                  },
                  "end": {
                      "line": 17,
                      "column": 32
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "f",
                      "start": 479,
                      "end": 480,
                      "loc": {
                          "start": {
                              "line": 18,
                              "column": 4
                          },
                          "end": {
                              "line": 18,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "UnaryExpression",
                      "operator": "!",
                      "argument": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "UnaryExpression",
                              "operator": "typeof",
                              "argument": {
                                  "type": "Identifier",
                                  "name": "a",
                                  "start": 492,
                                  "end": 493,
                                  "loc": {
                                      "start": {
                                          "line": 18,
                                          "column": 17
                                      },
                                      "end": {
                                          "line": 18,
                                          "column": 18
                                      }
                                  }
                              },
                              "prefix": true,
                              "start": 485,
                              "end": 493,
                              "loc": {
                                  "start": {
                                      "line": 18,
                                      "column": 10
                                  },
                                  "end": {
                                      "line": 18,
                                      "column": 18
                                  }
                              }
                          },
                          "right": {
                              "type": "Literal",
                              "value": "boolean",
                              "start": 498,
                              "end": 507,
                              "loc": {
                                  "start": {
                                      "line": 18,
                                      "column": 23
                                  },
                                  "end": {
                                      "line": 18,
                                      "column": 32
                                  }
                              },
                              "raw": "'boolean'"
                          },
                          "operator": "===",
                          "start": 485,
                          "end": 507,
                          "loc": {
                              "start": {
                                  "line": 18,
                                  "column": 10
                              },
                              "end": {
                                  "line": 18,
                                  "column": 32
                              }
                          }
                      },
                      "prefix": true,
                      "start": 483,
                      "end": 508,
                      "loc": {
                          "start": {
                              "line": 18,
                              "column": 8
                          },
                          "end": {
                              "line": 18,
                              "column": 33
                          }
                      }
                  },
                  "start": 479,
                  "end": 508,
                  "loc": {
                      "start": {
                          "line": 18,
                          "column": 4
                      },
                      "end": {
                          "line": 18,
                          "column": 33
                      }
                  }
              },
              "start": 479,
              "end": 509,
              "loc": {
                  "start": {
                      "line": 18,
                      "column": 4
                  },
                  "end": {
                      "line": 18,
                      "column": 34
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "a",
                      "start": 514,
                      "end": 515,
                      "loc": {
                          "start": {
                              "line": 19,
                              "column": 4
                          },
                          "end": {
                              "line": 19,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "CallExpression",
                      "callee": {
                          "type": "MemberExpression",
                          "object": {
                              "type": "Literal",
                              "value": 1.1,
                              "start": 519,
                              "end": 522,
                              "loc": {
                                  "start": {
                                      "line": 19,
                                      "column": 9
                                  },
                                  "end": {
                                      "line": 19,
                                      "column": 12
                                  }
                              },
                              "raw": "1.1"
                          },
                          "computed": false,
                          "property": {
                              "type": "Identifier",
                              "name": "toString",
                              "start": 524,
                              "end": 532,
                              "loc": {
                                  "start": {
                                      "line": 19,
                                      "column": 14
                                  },
                                  "end": {
                                      "line": 19,
                                      "column": 22
                                  }
                              }
                          },
                          "start": 518,
                          "end": 532,
                          "loc": {
                              "start": {
                                  "line": 19,
                                  "column": 8
                              },
                              "end": {
                                  "line": 19,
                                  "column": 22
                              }
                          }
                      },
                      "arguments": [],
                      "start": 518,
                      "end": 534,
                      "loc": {
                          "start": {
                              "line": 19,
                              "column": 8
                          },
                          "end": {
                              "line": 19,
                              "column": 24
                          }
                      }
                  },
                  "start": 514,
                  "end": 534,
                  "loc": {
                      "start": {
                          "line": 19,
                          "column": 4
                      },
                      "end": {
                          "line": 19,
                          "column": 24
                      }
                  }
              },
              "start": 514,
              "end": 535,
              "loc": {
                  "start": {
                      "line": 19,
                      "column": 4
                  },
                  "end": {
                      "line": 19,
                      "column": 25
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "b",
                      "start": 540,
                      "end": 541,
                      "loc": {
                          "start": {
                              "line": 20,
                              "column": 4
                          },
                          "end": {
                              "line": 20,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "CallExpression",
                      "callee": {
                          "type": "MemberExpression",
                          "object": {
                              "type": "NewExpression",
                              "callee": {
                                  "type": "Identifier",
                                  "name": "A",
                                  "start": 548,
                                  "end": 549,
                                  "loc": {
                                      "start": {
                                          "line": 20,
                                          "column": 12
                                      },
                                      "end": {
                                          "line": 20,
                                          "column": 13
                                      }
                                  }
                              },
                              "arguments": [],
                              "start": 544,
                              "end": 551,
                              "loc": {
                                  "start": {
                                      "line": 20,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 20,
                                      "column": 15
                                  }
                              }
                          },
                          "computed": false,
                          "property": {
                              "type": "Identifier",
                              "name": "toString",
                              "start": 552,
                              "end": 560,
                              "loc": {
                                  "start": {
                                      "line": 20,
                                      "column": 16
                                  },
                                  "end": {
                                      "line": 20,
                                      "column": 24
                                  }
                              }
                          },
                          "start": 544,
                          "end": 560,
                          "loc": {
                              "start": {
                                  "line": 20,
                                  "column": 8
                              },
                              "end": {
                                  "line": 20,
                                  "column": 24
                              }
                          }
                      },
                      "arguments": [],
                      "start": 544,
                      "end": 562,
                      "loc": {
                          "start": {
                              "line": 20,
                              "column": 8
                          },
                          "end": {
                              "line": 20,
                              "column": 26
                          }
                      }
                  },
                  "start": 540,
                  "end": 562,
                  "loc": {
                      "start": {
                          "line": 20,
                          "column": 4
                      },
                      "end": {
                          "line": 20,
                          "column": 26
                      }
                  }
              },
              "start": 540,
              "end": 563,
              "loc": {
                  "start": {
                      "line": 20,
                      "column": 4
                  },
                  "end": {
                      "line": 20,
                      "column": 27
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "c",
                      "start": 568,
                      "end": 569,
                      "loc": {
                          "start": {
                              "line": 21,
                              "column": 4
                          },
                          "end": {
                              "line": 21,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "CallExpression",
                      "callee": {
                          "type": "MemberExpression",
                          "object": {
                              "type": "NewExpression",
                              "callee": {
                                  "type": "MemberExpression",
                                  "object": {
                                      "type": "Identifier",
                                      "name": "x",
                                      "start": 576,
                                      "end": 577,
                                      "loc": {
                                          "start": {
                                              "line": 21,
                                              "column": 12
                                          },
                                          "end": {
                                              "line": 21,
                                              "column": 13
                                          }
                                      }
                                  },
                                  "computed": false,
                                  "property": {
                                      "type": "Identifier",
                                      "name": "A",
                                      "start": 578,
                                      "end": 579,
                                      "loc": {
                                          "start": {
                                              "line": 21,
                                              "column": 14
                                          },
                                          "end": {
                                              "line": 21,
                                              "column": 15
                                          }
                                      }
                                  },
                                  "start": 572,
                                  "end": 579,
                                  "loc": {
                                      "start": {
                                          "line": 21,
                                          "column": 8
                                      },
                                      "end": {
                                          "line": 21,
                                          "column": 15
                                      }
                                  }
                              },
                              "arguments": [],
                              "start": 572,
                              "end": 581,
                              "loc": {
                                  "start": {
                                      "line": 21,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 21,
                                      "column": 17
                                  }
                              }
                          },
                          "computed": false,
                          "property": {
                              "type": "Identifier",
                              "name": "toString",
                              "start": 582,
                              "end": 590,
                              "loc": {
                                  "start": {
                                      "line": 21,
                                      "column": 18
                                  },
                                  "end": {
                                      "line": 21,
                                      "column": 26
                                  }
                              }
                          },
                          "start": 572,
                          "end": 590,
                          "loc": {
                              "start": {
                                  "line": 21,
                                  "column": 8
                              },
                              "end": {
                                  "line": 21,
                                  "column": 26
                              }
                          }
                      },
                      "arguments": [],
                      "start": 572,
                      "end": 592,
                      "loc": {
                          "start": {
                              "line": 21,
                              "column": 8
                          },
                          "end": {
                              "line": 21,
                              "column": 28
                          }
                      }
                  },
                  "start": 568,
                  "end": 592,
                  "loc": {
                      "start": {
                          "line": 21,
                          "column": 4
                      },
                      "end": {
                          "line": 21,
                          "column": 28
                      }
                  }
              },
              "start": 568,
              "end": 593,
              "loc": {
                  "start": {
                      "line": 21,
                      "column": 4
                  },
                  "end": {
                      "line": 21,
                      "column": 29
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "d",
                      "start": 598,
                      "end": 599,
                      "loc": {
                          "start": {
                              "line": 22,
                              "column": 4
                          },
                          "end": {
                              "line": 22,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "CallExpression",
                      "callee": {
                          "type": "MemberExpression",
                          "object": {
                              "type": "NewExpression",
                              "callee": {
                                  "type": "MemberExpression",
                                  "object": {
                                      "type": "Identifier",
                                      "name": "x",
                                      "start": 606,
                                      "end": 607,
                                      "loc": {
                                          "start": {
                                              "line": 22,
                                              "column": 12
                                          },
                                          "end": {
                                              "line": 22,
                                              "column": 13
                                          }
                                      }
                                  },
                                  "computed": false,
                                  "property": {
                                      "type": "Identifier",
                                      "name": "y",
                                      "start": 608,
                                      "end": 609,
                                      "loc": {
                                          "start": {
                                              "line": 22,
                                              "column": 14
                                          },
                                          "end": {
                                              "line": 22,
                                              "column": 15
                                          }
                                      }
                                  },
                                  "start": 602,
                                  "end": 609,
                                  "loc": {
                                      "start": {
                                          "line": 22,
                                          "column": 8
                                      },
                                      "end": {
                                          "line": 22,
                                          "column": 15
                                      }
                                  }
                              },
                              "arguments": [],
                              "start": 602,
                              "end": 611,
                              "loc": {
                                  "start": {
                                      "line": 22,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 22,
                                      "column": 17
                                  }
                              }
                          },
                          "computed": false,
                          "property": {
                              "type": "Identifier",
                              "name": "z",
                              "start": 612,
                              "end": 613,
                              "loc": {
                                  "start": {
                                      "line": 22,
                                      "column": 18
                                  },
                                  "end": {
                                      "line": 22,
                                      "column": 19
                                  }
                              }
                          },
                          "start": 602,
                          "end": 613,
                          "loc": {
                              "start": {
                                  "line": 22,
                                  "column": 8
                              },
                              "end": {
                                  "line": 22,
                                  "column": 19
                              }
                          }
                      },
                      "arguments": [],
                      "start": 602,
                      "end": 615,
                      "loc": {
                          "start": {
                              "line": 22,
                              "column": 8
                          },
                          "end": {
                              "line": 22,
                              "column": 21
                          }
                      }
                  },
                  "start": 598,
                  "end": 615,
                  "loc": {
                      "start": {
                          "line": 22,
                          "column": 4
                      },
                      "end": {
                          "line": 22,
                          "column": 21
                      }
                  }
              },
              "start": 598,
              "end": 616,
              "loc": {
                  "start": {
                      "line": 22,
                      "column": 4
                  },
                  "end": {
                      "line": 22,
                      "column": 22
                  }
              }
          },
          {
              "type": "VariableDeclaration",
              "kind": "var",
              "declarations": [
                  {
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "CallExpression",
                          "callee": {
                              "type": "MemberExpression",
                              "object": {
                                  "type": "Literal",
                                  "value": {},
                                  "regex": {
                                      "pattern": "ab+c",
                                      "flags": "i"
                                  },
                                  "start": 630,
                                  "end": 637,
                                  "loc": {
                                      "start": {
                                          "line": 23,
                                          "column": 13
                                      },
                                      "end": {
                                          "line": 23,
                                          "column": 20
                                      }
                                  },
                                  "raw": "/ab+c/i"
                              },
                              "computed": false,
                              "property": {
                                  "type": "Identifier",
                                  "name": "exec",
                                  "start": 639,
                                  "end": 643,
                                  "loc": {
                                      "start": {
                                          "line": 23,
                                          "column": 22
                                      },
                                      "end": {
                                          "line": 23,
                                          "column": 26
                                      }
                                  }
                              },
                              "start": 629,
                              "end": 643,
                              "loc": {
                                  "start": {
                                      "line": 23,
                                      "column": 12
                                  },
                                  "end": {
                                      "line": 23,
                                      "column": 26
                                  }
                              }
                          },
                          "arguments": [
                              {
                                  "type": "Literal",
                                  "value": "abc",
                                  "start": 644,
                                  "end": 649,
                                  "loc": {
                                      "start": {
                                          "line": 23,
                                          "column": 27
                                      },
                                      "end": {
                                          "line": 23,
                                          "column": 32
                                      }
                                  },
                                  "raw": "'abc'"
                              }
                          ],
                          "start": 629,
                          "end": 650,
                          "loc": {
                              "start": {
                                  "line": 23,
                                  "column": 12
                              },
                              "end": {
                                  "line": 23,
                                  "column": 33
                              }
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "name": "r",
                          "start": 625,
                          "end": 626,
                          "loc": {
                              "start": {
                                  "line": 23,
                                  "column": 8
                              },
                              "end": {
                                  "line": 23,
                                  "column": 9
                              }
                          }
                      },
                      "start": 625,
                      "end": 650,
                      "loc": {
                          "start": {
                              "line": 23,
                              "column": 8
                          },
                          "end": {
                              "line": 23,
                              "column": 33
                          }
                      }
                  }
              ],
              "start": 621,
              "end": 651,
              "loc": {
                  "start": {
                      "line": 23,
                      "column": 4
                  },
                  "end": {
                      "line": 23,
                      "column": 34
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "a",
                      "start": 656,
                      "end": 657,
                      "loc": {
                          "start": {
                              "line": 24,
                              "column": 4
                          },
                          "end": {
                              "line": 24,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Identifier",
                              "name": "b",
                              "start": 660,
                              "end": 661,
                              "loc": {
                                  "start": {
                                      "line": 24,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 24,
                                      "column": 9
                                  }
                              }
                          },
                          "right": {
                              "type": "Literal",
                              "value": 2,
                              "start": 665,
                              "end": 666,
                              "loc": {
                                  "start": {
                                      "line": 24,
                                      "column": 13
                                  },
                                  "end": {
                                      "line": 24,
                                      "column": 14
                                  }
                              },
                              "raw": "2"
                          },
                          "operator": "**",
                          "start": 660,
                          "end": 666,
                          "loc": {
                              "start": {
                                  "line": 24,
                                  "column": 8
                              },
                              "end": {
                                  "line": 24,
                                  "column": 14
                              }
                          }
                      },
                      "right": {
                          "type": "Literal",
                          "value": 3,
                          "start": 669,
                          "end": 670,
                          "loc": {
                              "start": {
                                  "line": 24,
                                  "column": 17
                              },
                              "end": {
                                  "line": 24,
                                  "column": 18
                              }
                          },
                          "raw": "3"
                      },
                      "operator": "*",
                      "start": 660,
                      "end": 670,
                      "loc": {
                          "start": {
                              "line": 24,
                              "column": 8
                          },
                          "end": {
                              "line": 24,
                              "column": 18
                          }
                      }
                  },
                  "start": 656,
                  "end": 670,
                  "loc": {
                      "start": {
                          "line": 24,
                          "column": 4
                      },
                      "end": {
                          "line": 24,
                          "column": 18
                      }
                  }
              },
              "start": 656,
              "end": 671,
              "loc": {
                  "start": {
                      "line": 24,
                      "column": 4
                  },
                  "end": {
                      "line": 24,
                      "column": 19
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "c",
                      "start": 676,
                      "end": 677,
                      "loc": {
                          "start": {
                              "line": 25,
                              "column": 4
                          },
                          "end": {
                              "line": 25,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Identifier",
                              "name": "d",
                              "start": 681,
                              "end": 682,
                              "loc": {
                                  "start": {
                                      "line": 25,
                                      "column": 9
                                  },
                                  "end": {
                                      "line": 25,
                                      "column": 10
                                  }
                              }
                          },
                          "right": {
                              "type": "Literal",
                              "value": 2,
                              "start": 686,
                              "end": 687,
                              "loc": {
                                  "start": {
                                      "line": 25,
                                      "column": 14
                                  },
                                  "end": {
                                      "line": 25,
                                      "column": 15
                                  }
                              },
                              "raw": "2"
                          },
                          "operator": "**",
                          "start": 681,
                          "end": 687,
                          "loc": {
                              "start": {
                                  "line": 25,
                                  "column": 9
                              },
                              "end": {
                                  "line": 25,
                                  "column": 15
                              }
                          }
                      },
                      "right": {
                          "type": "Literal",
                          "value": 3,
                          "start": 692,
                          "end": 693,
                          "loc": {
                              "start": {
                                  "line": 25,
                                  "column": 20
                              },
                              "end": {
                                  "line": 25,
                                  "column": 21
                              }
                          },
                          "raw": "3"
                      },
                      "operator": "**",
                      "start": 680,
                      "end": 693,
                      "loc": {
                          "start": {
                              "line": 25,
                              "column": 8
                          },
                          "end": {
                              "line": 25,
                              "column": 21
                          }
                      }
                  },
                  "start": 676,
                  "end": 693,
                  "loc": {
                      "start": {
                          "line": 25,
                          "column": 4
                      },
                      "end": {
                          "line": 25,
                          "column": 21
                      }
                  }
              },
              "start": 676,
              "end": 694,
              "loc": {
                  "start": {
                      "line": 25,
                      "column": 4
                  },
                  "end": {
                      "line": 25,
                      "column": 22
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "e",
                      "start": 699,
                      "end": 700,
                      "loc": {
                          "start": {
                              "line": 26,
                              "column": 4
                          },
                          "end": {
                              "line": 26,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "Identifier",
                          "name": "f",
                          "start": 703,
                          "end": 704,
                          "loc": {
                              "start": {
                                  "line": 26,
                                  "column": 8
                              },
                              "end": {
                                  "line": 26,
                                  "column": 9
                              }
                          }
                      },
                      "right": {
                          "type": "BinaryExpression",
                          "left": {
                              "type": "Literal",
                              "value": 2,
                              "start": 708,
                              "end": 709,
                              "loc": {
                                  "start": {
                                      "line": 26,
                                      "column": 13
                                  },
                                  "end": {
                                      "line": 26,
                                      "column": 14
                                  }
                              },
                              "raw": "2"
                          },
                          "right": {
                              "type": "Literal",
                              "value": 3,
                              "start": 713,
                              "end": 714,
                              "loc": {
                                  "start": {
                                      "line": 26,
                                      "column": 18
                                  },
                                  "end": {
                                      "line": 26,
                                      "column": 19
                                  }
                              },
                              "raw": "3"
                          },
                          "operator": "**",
                          "start": 708,
                          "end": 714,
                          "loc": {
                              "start": {
                                  "line": 26,
                                  "column": 13
                              },
                              "end": {
                                  "line": 26,
                                  "column": 19
                              }
                          }
                      },
                      "operator": "**",
                      "start": 703,
                      "end": 714,
                      "loc": {
                          "start": {
                              "line": 26,
                              "column": 8
                          },
                          "end": {
                              "line": 26,
                              "column": 19
                          }
                      }
                  },
                  "start": 699,
                  "end": 714,
                  "loc": {
                      "start": {
                          "line": 26,
                          "column": 4
                      },
                      "end": {
                          "line": 26,
                          "column": 19
                      }
                  }
              },
              "start": 699,
              "end": 715,
              "loc": {
                  "start": {
                      "line": 26,
                      "column": 4
                  },
                  "end": {
                      "line": 26,
                      "column": 20
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "f",
                      "start": 720,
                      "end": 721,
                      "loc": {
                          "start": {
                              "line": 27,
                              "column": 4
                          },
                          "end": {
                              "line": 27,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "Identifier",
                          "name": "a",
                          "start": 724,
                          "end": 725,
                          "loc": {
                              "start": {
                                  "line": 27,
                                  "column": 8
                              },
                              "end": {
                                  "line": 27,
                                  "column": 9
                              }
                          }
                      },
                      "right": {
                          "type": "AssignmentExpression",
                          "left": {
                              "type": "Identifier",
                              "name": "b",
                              "start": 729,
                              "end": 730,
                              "loc": {
                                  "start": {
                                      "line": 27,
                                      "column": 13
                                  },
                                  "end": {
                                      "line": 27,
                                      "column": 14
                                  }
                              }
                          },
                          "operator": "=",
                          "right": {
                              "type": "Literal",
                              "value": 3,
                              "start": 733,
                              "end": 734,
                              "loc": {
                                  "start": {
                                      "line": 27,
                                      "column": 17
                                  },
                                  "end": {
                                      "line": 27,
                                      "column": 18
                                  }
                              },
                              "raw": "3"
                          },
                          "start": 729,
                          "end": 734,
                          "loc": {
                              "start": {
                                  "line": 27,
                                  "column": 13
                              },
                              "end": {
                                  "line": 27,
                                  "column": 18
                              }
                          }
                      },
                      "operator": "+",
                      "start": 724,
                      "end": 735,
                      "loc": {
                          "start": {
                              "line": 27,
                              "column": 8
                          },
                          "end": {
                              "line": 27,
                              "column": 19
                          }
                      }
                  },
                  "start": 720,
                  "end": 735,
                  "loc": {
                      "start": {
                          "line": 27,
                          "column": 4
                      },
                      "end": {
                          "line": 27,
                          "column": 19
                      }
                  }
              },
              "start": 720,
              "end": 736,
              "loc": {
                  "start": {
                      "line": 27,
                      "column": 4
                  },
                  "end": {
                      "line": 27,
                      "column": 20
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "g",
                      "start": 741,
                      "end": 742,
                      "loc": {
                          "start": {
                              "line": 28,
                              "column": 4
                          },
                          "end": {
                              "line": 28,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "LogicalExpression",
                      "left": {
                          "type": "Literal",
                          "value": 1,
                          "start": 745,
                          "end": 746,
                          "loc": {
                              "start": {
                                  "line": 28,
                                  "column": 8
                              },
                              "end": {
                                  "line": 28,
                                  "column": 9
                              }
                          },
                          "raw": "1"
                      },
                      "right": {
                          "type": "ArrowFunctionExpression",
                          "body": {
                              "type": "BlockStatement",
                              "body": [],
                              "start": 757,
                              "end": 759,
                              "loc": {
                                  "start": {
                                      "line": 28,
                                      "column": 20
                                  },
                                  "end": {
                                      "line": 28,
                                      "column": 22
                                  }
                              }
                          },
                          "params": [],
                          "id": null,
                          "async": false,
                          "generator": false,
                          "expression": false,
                          "start": 751,
                          "end": 759,
                          "loc": {
                              "start": {
                                  "line": 28,
                                  "column": 14
                              },
                              "end": {
                                  "line": 28,
                                  "column": 22
                              }
                          }
                      },
                      "operator": "&&",
                      "start": 745,
                      "end": 760,
                      "loc": {
                          "start": {
                              "line": 28,
                              "column": 8
                          },
                          "end": {
                              "line": 28,
                              "column": 23
                          }
                      }
                  },
                  "start": 741,
                  "end": 760,
                  "loc": {
                      "start": {
                          "line": 28,
                          "column": 4
                      },
                      "end": {
                          "line": 28,
                          "column": 23
                      }
                  }
              },
              "start": 741,
              "end": 761,
              "loc": {
                  "start": {
                      "line": 28,
                      "column": 4
                  },
                  "end": {
                      "line": 28,
                      "column": 24
                  }
              }
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "g",
                      "start": 766,
                      "end": 767,
                      "loc": {
                          "start": {
                              "line": 29,
                              "column": 4
                          },
                          "end": {
                              "line": 29,
                              "column": 5
                          }
                      }
                  },
                  "operator": "=",
                  "right": {
                      "type": "LogicalExpression",
                      "left": {
                          "type": "ArrowFunctionExpression",
                          "body": {
                              "type": "BlockStatement",
                              "body": [],
                              "start": 777,
                              "end": 779,
                              "loc": {
                                  "start": {
                                      "line": 29,
                                      "column": 15
                                  },
                                  "end": {
                                      "line": 29,
                                      "column": 17
                                  }
                              }
                          },
                          "params": [],
                          "id": null,
                          "async": false,
                          "generator": false,
                          "expression": false,
                          "start": 771,
                          "end": 779,
                          "loc": {
                              "start": {
                                  "line": 29,
                                  "column": 9
                              },
                              "end": {
                                  "line": 29,
                                  "column": 17
                              }
                          }
                      },
                      "right": {
                          "type": "Literal",
                          "value": 1,
                          "start": 784,
                          "end": 785,
                          "loc": {
                              "start": {
                                  "line": 29,
                                  "column": 22
                              },
                              "end": {
                                  "line": 29,
                                  "column": 23
                              }
                          },
                          "raw": "1"
                      },
                      "operator": "&&",
                      "start": 770,
                      "end": 785,
                      "loc": {
                          "start": {
                              "line": 29,
                              "column": 8
                          },
                          "end": {
                              "line": 29,
                              "column": 23
                          }
                      }
                  },
                  "start": 766,
                  "end": 785,
                  "loc": {
                      "start": {
                          "line": 29,
                          "column": 4
                      },
                      "end": {
                          "line": 29,
                          "column": 23
                      }
                  }
              },
              "start": 766,
              "end": 786,
              "loc": {
                  "start": {
                      "line": 29,
                      "column": 4
                  },
                  "end": {
                      "line": 29,
                      "column": 24
                  }
              }
          }
      ],
      "start": 0,
      "end": 786,
      "loc": {
          "start": {
              "line": 1,
              "column": 0
          },
          "end": {
              "line": 29,
              "column": 24
          }
      }
  }
  });
});
