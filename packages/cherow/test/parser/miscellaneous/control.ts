import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Control', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  pass(`if (a > b) {} else {}
  if (c != d) {}
  var a = b > c ? d : e;
  let b = (c = 1) ? d : e;
  switch (a) {
    case b:
      break;
    case "c":
      break;
    case 42:
      break;
    case d:
      if (a < b) {}
      break;
    default:
      break;
  }
  while (a > b) {
    if (c == d) {
      break;
    }
  }
  do {
    if (e === f) {
      continue;
    }
  } while (g < h);
  label: if (a === b) {
    if (b = c) {
      break label;
    }
  }
  if (a != b) {}
  endingLabel: {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `if (a > b) {} else {}
    if (c != d) {}
    var a = b > c ? d : e;
    let b = (c = 1) ? d : e;
    switch (a) {
      case b:
        break;
      case "c":
        break;
      case 42:
        break;
      case d:
        if (a < b) {}
        break;
      default:
        break;
    }
    while (a > b) {
      if (c == d) {
        break;
      }
    }
    do {
      if (e === f) {
        continue;
      }
    } while (g < h);
    label: if (a === b) {
      if (b = c) {
        break label;
      }
    }
    if (a != b) {}
    endingLabel: {}`,
    expected: {
      "type": "Program",
      "sourceType": "script",
      "body": [
          {
              "type": "IfStatement",
              "test": {
                  "type": "BinaryExpression",
                  "left": {
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
                  "right": {
                      "type": "Identifier",
                      "name": "b",
                      "start": 8,
                      "end": 9,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 8
                          },
                          "end": {
                              "line": 1,
                              "column": 9
                          }
                      }
                  },
                  "operator": ">",
                  "start": 4,
                  "end": 9,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 4
                      },
                      "end": {
                          "line": 1,
                          "column": 9
                      }
                  }
              },
              "consequent": {
                  "type": "BlockStatement",
                  "body": [],
                  "start": 11,
                  "end": 13,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 11
                      },
                      "end": {
                          "line": 1,
                          "column": 13
                      }
                  }
              },
              "alternate": {
                  "type": "BlockStatement",
                  "body": [],
                  "start": 19,
                  "end": 21,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 19
                      },
                      "end": {
                          "line": 1,
                          "column": 21
                      }
                  }
              },
              "start": 0,
              "end": 21,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 21
                  }
              }
          },
          {
              "type": "IfStatement",
              "test": {
                  "type": "BinaryExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "c",
                      "start": 30,
                      "end": 31,
                      "loc": {
                          "start": {
                              "line": 2,
                              "column": 8
                          },
                          "end": {
                              "line": 2,
                              "column": 9
                          }
                      }
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "d",
                      "start": 35,
                      "end": 36,
                      "loc": {
                          "start": {
                              "line": 2,
                              "column": 13
                          },
                          "end": {
                              "line": 2,
                              "column": 14
                          }
                      }
                  },
                  "operator": "!=",
                  "start": 30,
                  "end": 36,
                  "loc": {
                      "start": {
                          "line": 2,
                          "column": 8
                      },
                      "end": {
                          "line": 2,
                          "column": 14
                      }
                  }
              },
              "consequent": {
                  "type": "BlockStatement",
                  "body": [],
                  "start": 38,
                  "end": 40,
                  "loc": {
                      "start": {
                          "line": 2,
                          "column": 16
                      },
                      "end": {
                          "line": 2,
                          "column": 18
                      }
                  }
              },
              "alternate": null,
              "start": 26,
              "end": 40,
              "loc": {
                  "start": {
                      "line": 2,
                      "column": 4
                  },
                  "end": {
                      "line": 2,
                      "column": 18
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
                          "type": "ConditionalExpression",
                          "test": {
                              "type": "BinaryExpression",
                              "left": {
                                  "type": "Identifier",
                                  "name": "b",
                                  "start": 53,
                                  "end": 54,
                                  "loc": {
                                      "start": {
                                          "line": 3,
                                          "column": 12
                                      },
                                      "end": {
                                          "line": 3,
                                          "column": 13
                                      }
                                  }
                              },
                              "right": {
                                  "type": "Identifier",
                                  "name": "c",
                                  "start": 57,
                                  "end": 58,
                                  "loc": {
                                      "start": {
                                          "line": 3,
                                          "column": 16
                                      },
                                      "end": {
                                          "line": 3,
                                          "column": 17
                                      }
                                  }
                              },
                              "operator": ">",
                              "start": 53,
                              "end": 58,
                              "loc": {
                                  "start": {
                                      "line": 3,
                                      "column": 12
                                  },
                                  "end": {
                                      "line": 3,
                                      "column": 17
                                  }
                              }
                          },
                          "consequent": {
                              "type": "Identifier",
                              "name": "d",
                              "start": 61,
                              "end": 62,
                              "loc": {
                                  "start": {
                                      "line": 3,
                                      "column": 20
                                  },
                                  "end": {
                                      "line": 3,
                                      "column": 21
                                  }
                              }
                          },
                          "alternate": {
                              "type": "Identifier",
                              "name": "e",
                              "start": 65,
                              "end": 66,
                              "loc": {
                                  "start": {
                                      "line": 3,
                                      "column": 24
                                  },
                                  "end": {
                                      "line": 3,
                                      "column": 25
                                  }
                              }
                          },
                          "start": 53,
                          "end": 66,
                          "loc": {
                              "start": {
                                  "line": 3,
                                  "column": 12
                              },
                              "end": {
                                  "line": 3,
                                  "column": 25
                              }
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "name": "a",
                          "start": 49,
                          "end": 50,
                          "loc": {
                              "start": {
                                  "line": 3,
                                  "column": 8
                              },
                              "end": {
                                  "line": 3,
                                  "column": 9
                              }
                          }
                      },
                      "start": 49,
                      "end": 66,
                      "loc": {
                          "start": {
                              "line": 3,
                              "column": 8
                          },
                          "end": {
                              "line": 3,
                              "column": 25
                          }
                      }
                  }
              ],
              "start": 45,
              "end": 67,
              "loc": {
                  "start": {
                      "line": 3,
                      "column": 4
                  },
                  "end": {
                      "line": 3,
                      "column": 26
                  }
              }
          },
          {
              "type": "VariableDeclaration",
              "kind": "let",
              "declarations": [
                  {
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "ConditionalExpression",
                          "test": {
                              "type": "AssignmentExpression",
                              "left": {
                                  "type": "Identifier",
                                  "name": "c",
                                  "start": 81,
                                  "end": 82,
                                  "loc": {
                                      "start": {
                                          "line": 4,
                                          "column": 13
                                      },
                                      "end": {
                                          "line": 4,
                                          "column": 14
                                      }
                                  }
                              },
                              "operator": "=",
                              "right": {
                                  "type": "Literal",
                                  "value": 1,
                                  "start": 85,
                                  "end": 86,
                                  "loc": {
                                      "start": {
                                          "line": 4,
                                          "column": 17
                                      },
                                      "end": {
                                          "line": 4,
                                          "column": 18
                                      }
                                  },
                                  "raw": "1"
                              },
                              "start": 81,
                              "end": 86,
                              "loc": {
                                  "start": {
                                      "line": 4,
                                      "column": 13
                                  },
                                  "end": {
                                      "line": 4,
                                      "column": 18
                                  }
                              }
                          },
                          "consequent": {
                              "type": "Identifier",
                              "name": "d",
                              "start": 90,
                              "end": 91,
                              "loc": {
                                  "start": {
                                      "line": 4,
                                      "column": 22
                                  },
                                  "end": {
                                      "line": 4,
                                      "column": 23
                                  }
                              }
                          },
                          "alternate": {
                              "type": "Identifier",
                              "name": "e",
                              "start": 94,
                              "end": 95,
                              "loc": {
                                  "start": {
                                      "line": 4,
                                      "column": 26
                                  },
                                  "end": {
                                      "line": 4,
                                      "column": 27
                                  }
                              }
                          },
                          "start": 80,
                          "end": 95,
                          "loc": {
                              "start": {
                                  "line": 4,
                                  "column": 12
                              },
                              "end": {
                                  "line": 4,
                                  "column": 27
                              }
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "name": "b",
                          "start": 76,
                          "end": 77,
                          "loc": {
                              "start": {
                                  "line": 4,
                                  "column": 8
                              },
                              "end": {
                                  "line": 4,
                                  "column": 9
                              }
                          }
                      },
                      "start": 76,
                      "end": 95,
                      "loc": {
                          "start": {
                              "line": 4,
                              "column": 8
                          },
                          "end": {
                              "line": 4,
                              "column": 27
                          }
                      }
                  }
              ],
              "start": 72,
              "end": 96,
              "loc": {
                  "start": {
                      "line": 4,
                      "column": 4
                  },
                  "end": {
                      "line": 4,
                      "column": 28
                  }
              }
          },
          {
              "type": "SwitchStatement",
              "discriminant": {
                  "type": "Identifier",
                  "name": "a",
                  "start": 109,
                  "end": 110,
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
              "cases": [
                  {
                      "type": "SwitchCase",
                      "test": {
                          "type": "Identifier",
                          "name": "b",
                          "start": 125,
                          "end": 126,
                          "loc": {
                              "start": {
                                  "line": 6,
                                  "column": 11
                              },
                              "end": {
                                  "line": 6,
                                  "column": 12
                              }
                          }
                      },
                      "consequent": [
                          {
                              "type": "BreakStatement",
                              "label": null,
                              "start": 136,
                              "end": 142,
                              "loc": {
                                  "start": {
                                      "line": 7,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 7,
                                      "column": 14
                                  }
                              }
                          }
                      ],
                      "start": 120,
                      "end": 142,
                      "loc": {
                          "start": {
                              "line": 6,
                              "column": 6
                          },
                          "end": {
                              "line": 7,
                              "column": 14
                          }
                      }
                  },
                  {
                      "type": "SwitchCase",
                      "test": {
                          "type": "Literal",
                          "value": "c",
                          "start": 154,
                          "end": 157,
                          "loc": {
                              "start": {
                                  "line": 8,
                                  "column": 11
                              },
                              "end": {
                                  "line": 8,
                                  "column": 14
                              }
                          },
                          "raw": "\"c\""
                      },
                      "consequent": [
                          {
                              "type": "BreakStatement",
                              "label": null,
                              "start": 167,
                              "end": 173,
                              "loc": {
                                  "start": {
                                      "line": 9,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 9,
                                      "column": 14
                                  }
                              }
                          }
                      ],
                      "start": 149,
                      "end": 173,
                      "loc": {
                          "start": {
                              "line": 8,
                              "column": 6
                          },
                          "end": {
                              "line": 9,
                              "column": 14
                          }
                      }
                  },
                  {
                      "type": "SwitchCase",
                      "test": {
                          "type": "Literal",
                          "value": 42,
                          "start": 185,
                          "end": 187,
                          "loc": {
                              "start": {
                                  "line": 10,
                                  "column": 11
                              },
                              "end": {
                                  "line": 10,
                                  "column": 13
                              }
                          },
                          "raw": "42"
                      },
                      "consequent": [
                          {
                              "type": "BreakStatement",
                              "label": null,
                              "start": 197,
                              "end": 203,
                              "loc": {
                                  "start": {
                                      "line": 11,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 11,
                                      "column": 14
                                  }
                              }
                          }
                      ],
                      "start": 180,
                      "end": 203,
                      "loc": {
                          "start": {
                              "line": 10,
                              "column": 6
                          },
                          "end": {
                              "line": 11,
                              "column": 14
                          }
                      }
                  },
                  {
                      "type": "SwitchCase",
                      "test": {
                          "type": "Identifier",
                          "name": "d",
                          "start": 215,
                          "end": 216,
                          "loc": {
                              "start": {
                                  "line": 12,
                                  "column": 11
                              },
                              "end": {
                                  "line": 12,
                                  "column": 12
                              }
                          }
                      },
                      "consequent": [
                          {
                              "type": "IfStatement",
                              "test": {
                                  "type": "BinaryExpression",
                                  "left": {
                                      "type": "Identifier",
                                      "name": "a",
                                      "start": 230,
                                      "end": 231,
                                      "loc": {
                                          "start": {
                                              "line": 13,
                                              "column": 12
                                          },
                                          "end": {
                                              "line": 13,
                                              "column": 13
                                          }
                                      }
                                  },
                                  "right": {
                                      "type": "Identifier",
                                      "name": "b",
                                      "start": 234,
                                      "end": 235,
                                      "loc": {
                                          "start": {
                                              "line": 13,
                                              "column": 16
                                          },
                                          "end": {
                                              "line": 13,
                                              "column": 17
                                          }
                                      }
                                  },
                                  "operator": "<",
                                  "start": 230,
                                  "end": 235,
                                  "loc": {
                                      "start": {
                                          "line": 13,
                                          "column": 12
                                      },
                                      "end": {
                                          "line": 13,
                                          "column": 17
                                      }
                                  }
                              },
                              "consequent": {
                                  "type": "BlockStatement",
                                  "body": [],
                                  "start": 237,
                                  "end": 239,
                                  "loc": {
                                      "start": {
                                          "line": 13,
                                          "column": 19
                                      },
                                      "end": {
                                          "line": 13,
                                          "column": 21
                                      }
                                  }
                              },
                              "alternate": null,
                              "start": 226,
                              "end": 239,
                              "loc": {
                                  "start": {
                                      "line": 13,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 13,
                                      "column": 21
                                  }
                              }
                          },
                          {
                              "type": "BreakStatement",
                              "label": null,
                              "start": 248,
                              "end": 254,
                              "loc": {
                                  "start": {
                                      "line": 14,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 14,
                                      "column": 14
                                  }
                              }
                          }
                      ],
                      "start": 210,
                      "end": 254,
                      "loc": {
                          "start": {
                              "line": 12,
                              "column": 6
                          },
                          "end": {
                              "line": 14,
                              "column": 14
                          }
                      }
                  },
                  {
                      "type": "SwitchCase",
                      "test": null,
                      "consequent": [
                          {
                              "type": "BreakStatement",
                              "label": null,
                              "start": 278,
                              "end": 284,
                              "loc": {
                                  "start": {
                                      "line": 16,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 16,
                                      "column": 14
                                  }
                              }
                          }
                      ],
                      "start": 261,
                      "end": 284,
                      "loc": {
                          "start": {
                              "line": 15,
                              "column": 6
                          },
                          "end": {
                              "line": 16,
                              "column": 14
                          }
                      }
                  }
              ],
              "start": 101,
              "end": 290,
              "loc": {
                  "start": {
                      "line": 5,
                      "column": 4
                  },
                  "end": {
                      "line": 17,
                      "column": 5
                  }
              }
          },
          {
              "type": "WhileStatement",
              "test": {
                  "type": "BinaryExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "a",
                      "start": 302,
                      "end": 303,
                      "loc": {
                          "start": {
                              "line": 18,
                              "column": 11
                          },
                          "end": {
                              "line": 18,
                              "column": 12
                          }
                      }
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "b",
                      "start": 306,
                      "end": 307,
                      "loc": {
                          "start": {
                              "line": 18,
                              "column": 15
                          },
                          "end": {
                              "line": 18,
                              "column": 16
                          }
                      }
                  },
                  "operator": ">",
                  "start": 302,
                  "end": 307,
                  "loc": {
                      "start": {
                          "line": 18,
                          "column": 11
                      },
                      "end": {
                          "line": 18,
                          "column": 16
                      }
                  }
              },
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "IfStatement",
                          "test": {
                              "type": "BinaryExpression",
                              "left": {
                                  "type": "Identifier",
                                  "name": "c",
                                  "start": 321,
                                  "end": 322,
                                  "loc": {
                                      "start": {
                                          "line": 19,
                                          "column": 10
                                      },
                                      "end": {
                                          "line": 19,
                                          "column": 11
                                      }
                                  }
                              },
                              "right": {
                                  "type": "Identifier",
                                  "name": "d",
                                  "start": 326,
                                  "end": 327,
                                  "loc": {
                                      "start": {
                                          "line": 19,
                                          "column": 15
                                      },
                                      "end": {
                                          "line": 19,
                                          "column": 16
                                      }
                                  }
                              },
                              "operator": "==",
                              "start": 321,
                              "end": 327,
                              "loc": {
                                  "start": {
                                      "line": 19,
                                      "column": 10
                                  },
                                  "end": {
                                      "line": 19,
                                      "column": 16
                                  }
                              }
                          },
                          "consequent": {
                              "type": "BlockStatement",
                              "body": [
                                  {
                                      "type": "BreakStatement",
                                      "label": null,
                                      "start": 339,
                                      "end": 345,
                                      "loc": {
                                          "start": {
                                              "line": 20,
                                              "column": 8
                                          },
                                          "end": {
                                              "line": 20,
                                              "column": 14
                                          }
                                      }
                                  }
                              ],
                              "start": 329,
                              "end": 353,
                              "loc": {
                                  "start": {
                                      "line": 19,
                                      "column": 18
                                  },
                                  "end": {
                                      "line": 21,
                                      "column": 7
                                  }
                              }
                          },
                          "alternate": null,
                          "start": 317,
                          "end": 353,
                          "loc": {
                              "start": {
                                  "line": 19,
                                  "column": 6
                              },
                              "end": {
                                  "line": 21,
                                  "column": 7
                              }
                          }
                      }
                  ],
                  "start": 309,
                  "end": 359,
                  "loc": {
                      "start": {
                          "line": 18,
                          "column": 18
                      },
                      "end": {
                          "line": 22,
                          "column": 5
                      }
                  }
              },
              "start": 295,
              "end": 359,
              "loc": {
                  "start": {
                      "line": 18,
                      "column": 4
                  },
                  "end": {
                      "line": 22,
                      "column": 5
                  }
              }
          },
          {
              "type": "DoWhileStatement",
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "IfStatement",
                          "test": {
                              "type": "BinaryExpression",
                              "left": {
                                  "type": "Identifier",
                                  "name": "e",
                                  "start": 379,
                                  "end": 380,
                                  "loc": {
                                      "start": {
                                          "line": 24,
                                          "column": 10
                                      },
                                      "end": {
                                          "line": 24,
                                          "column": 11
                                      }
                                  }
                              },
                              "right": {
                                  "type": "Identifier",
                                  "name": "f",
                                  "start": 385,
                                  "end": 386,
                                  "loc": {
                                      "start": {
                                          "line": 24,
                                          "column": 16
                                      },
                                      "end": {
                                          "line": 24,
                                          "column": 17
                                      }
                                  }
                              },
                              "operator": "===",
                              "start": 379,
                              "end": 386,
                              "loc": {
                                  "start": {
                                      "line": 24,
                                      "column": 10
                                  },
                                  "end": {
                                      "line": 24,
                                      "column": 17
                                  }
                              }
                          },
                          "consequent": {
                              "type": "BlockStatement",
                              "body": [
                                  {
                                      "type": "ContinueStatement",
                                      "label": null,
                                      "start": 398,
                                      "end": 407,
                                      "loc": {
                                          "start": {
                                              "line": 25,
                                              "column": 8
                                          },
                                          "end": {
                                              "line": 25,
                                              "column": 17
                                          }
                                      }
                                  }
                              ],
                              "start": 388,
                              "end": 415,
                              "loc": {
                                  "start": {
                                      "line": 24,
                                      "column": 19
                                  },
                                  "end": {
                                      "line": 26,
                                      "column": 7
                                  }
                              }
                          },
                          "alternate": null,
                          "start": 375,
                          "end": 415,
                          "loc": {
                              "start": {
                                  "line": 24,
                                  "column": 6
                              },
                              "end": {
                                  "line": 26,
                                  "column": 7
                              }
                          }
                      }
                  ],
                  "start": 367,
                  "end": 421,
                  "loc": {
                      "start": {
                          "line": 23,
                          "column": 7
                      },
                      "end": {
                          "line": 27,
                          "column": 5
                      }
                  }
              },
              "test": {
                  "type": "BinaryExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "g",
                      "start": 429,
                      "end": 430,
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
                  "right": {
                      "type": "Identifier",
                      "name": "h",
                      "start": 433,
                      "end": 434,
                      "loc": {
                          "start": {
                              "line": 27,
                              "column": 17
                          },
                          "end": {
                              "line": 27,
                              "column": 18
                          }
                      }
                  },
                  "operator": "<",
                  "start": 429,
                  "end": 434,
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
              "start": 364,
              "end": 436,
              "loc": {
                  "start": {
                      "line": 23,
                      "column": 4
                  },
                  "end": {
                      "line": 27,
                      "column": 20
                  }
              }
          },
          {
              "type": "LabeledStatement",
              "label": {
                  "type": "Identifier",
                  "name": "label",
                  "start": 441,
                  "end": 446,
                  "loc": {
                      "start": {
                          "line": 28,
                          "column": 4
                      },
                      "end": {
                          "line": 28,
                          "column": 9
                      }
                  }
              },
              "body": {
                  "type": "IfStatement",
                  "test": {
                      "type": "BinaryExpression",
                      "left": {
                          "type": "Identifier",
                          "name": "a",
                          "start": 452,
                          "end": 453,
                          "loc": {
                              "start": {
                                  "line": 28,
                                  "column": 15
                              },
                              "end": {
                                  "line": 28,
                                  "column": 16
                              }
                          }
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "b",
                          "start": 458,
                          "end": 459,
                          "loc": {
                              "start": {
                                  "line": 28,
                                  "column": 21
                              },
                              "end": {
                                  "line": 28,
                                  "column": 22
                              }
                          }
                      },
                      "operator": "===",
                      "start": 452,
                      "end": 459,
                      "loc": {
                          "start": {
                              "line": 28,
                              "column": 15
                          },
                          "end": {
                              "line": 28,
                              "column": 22
                          }
                      }
                  },
                  "consequent": {
                      "type": "BlockStatement",
                      "body": [
                          {
                              "type": "IfStatement",
                              "test": {
                                  "type": "AssignmentExpression",
                                  "left": {
                                      "type": "Identifier",
                                      "name": "b",
                                      "start": 473,
                                      "end": 474,
                                      "loc": {
                                          "start": {
                                              "line": 29,
                                              "column": 10
                                          },
                                          "end": {
                                              "line": 29,
                                              "column": 11
                                          }
                                      }
                                  },
                                  "operator": "=",
                                  "right": {
                                      "type": "Identifier",
                                      "name": "c",
                                      "start": 477,
                                      "end": 478,
                                      "loc": {
                                          "start": {
                                              "line": 29,
                                              "column": 14
                                          },
                                          "end": {
                                              "line": 29,
                                              "column": 15
                                          }
                                      }
                                  },
                                  "start": 473,
                                  "end": 478,
                                  "loc": {
                                      "start": {
                                          "line": 29,
                                          "column": 10
                                      },
                                      "end": {
                                          "line": 29,
                                          "column": 15
                                      }
                                  }
                              },
                              "consequent": {
                                  "type": "BlockStatement",
                                  "body": [
                                      {
                                          "type": "BreakStatement",
                                          "label": {
                                              "type": "Identifier",
                                              "name": "label",
                                              "start": 496,
                                              "end": 501,
                                              "loc": {
                                                  "start": {
                                                      "line": 30,
                                                      "column": 14
                                                  },
                                                  "end": {
                                                      "line": 30,
                                                      "column": 19
                                                  }
                                              }
                                          },
                                          "start": 490,
                                          "end": 502,
                                          "loc": {
                                              "start": {
                                                  "line": 30,
                                                  "column": 8
                                              },
                                              "end": {
                                                  "line": 30,
                                                  "column": 20
                                              }
                                          }
                                      }
                                  ],
                                  "start": 480,
                                  "end": 510,
                                  "loc": {
                                      "start": {
                                          "line": 29,
                                          "column": 17
                                      },
                                      "end": {
                                          "line": 31,
                                          "column": 7
                                      }
                                  }
                              },
                              "alternate": null,
                              "start": 469,
                              "end": 510,
                              "loc": {
                                  "start": {
                                      "line": 29,
                                      "column": 6
                                  },
                                  "end": {
                                      "line": 31,
                                      "column": 7
                                  }
                              }
                          }
                      ],
                      "start": 461,
                      "end": 516,
                      "loc": {
                          "start": {
                              "line": 28,
                              "column": 24
                          },
                          "end": {
                              "line": 32,
                              "column": 5
                          }
                      }
                  },
                  "alternate": null,
                  "start": 448,
                  "end": 516,
                  "loc": {
                      "start": {
                          "line": 28,
                          "column": 11
                      },
                      "end": {
                          "line": 32,
                          "column": 5
                      }
                  }
              },
              "start": 441,
              "end": 516,
              "loc": {
                  "start": {
                      "line": 28,
                      "column": 4
                  },
                  "end": {
                      "line": 32,
                      "column": 5
                  }
              }
          },
          {
              "type": "IfStatement",
              "test": {
                  "type": "BinaryExpression",
                  "left": {
                      "type": "Identifier",
                      "name": "a",
                      "start": 525,
                      "end": 526,
                      "loc": {
                          "start": {
                              "line": 33,
                              "column": 8
                          },
                          "end": {
                              "line": 33,
                              "column": 9
                          }
                      }
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "b",
                      "start": 530,
                      "end": 531,
                      "loc": {
                          "start": {
                              "line": 33,
                              "column": 13
                          },
                          "end": {
                              "line": 33,
                              "column": 14
                          }
                      }
                  },
                  "operator": "!=",
                  "start": 525,
                  "end": 531,
                  "loc": {
                      "start": {
                          "line": 33,
                          "column": 8
                      },
                      "end": {
                          "line": 33,
                          "column": 14
                      }
                  }
              },
              "consequent": {
                  "type": "BlockStatement",
                  "body": [],
                  "start": 533,
                  "end": 535,
                  "loc": {
                      "start": {
                          "line": 33,
                          "column": 16
                      },
                      "end": {
                          "line": 33,
                          "column": 18
                      }
                  }
              },
              "alternate": null,
              "start": 521,
              "end": 535,
              "loc": {
                  "start": {
                      "line": 33,
                      "column": 4
                  },
                  "end": {
                      "line": 33,
                      "column": 18
                  }
              }
          },
          {
              "type": "LabeledStatement",
              "label": {
                  "type": "Identifier",
                  "name": "endingLabel",
                  "start": 540,
                  "end": 551,
                  "loc": {
                      "start": {
                          "line": 34,
                          "column": 4
                      },
                      "end": {
                          "line": 34,
                          "column": 15
                      }
                  }
              },
              "body": {
                  "type": "BlockStatement",
                  "body": [],
                  "start": 553,
                  "end": 555,
                  "loc": {
                      "start": {
                          "line": 34,
                          "column": 17
                      },
                      "end": {
                          "line": 34,
                          "column": 19
                      }
                  }
              },
              "start": 540,
              "end": 555,
              "loc": {
                  "start": {
                      "line": 34,
                      "column": 4
                  },
                  "end": {
                      "line": 34,
                      "column": 19
                  }
              }
          }
      ],
      "start": 0,
      "end": 555,
      "loc": {
          "start": {
              "line": 1,
              "column": 0
          },
          "end": {
              "line": 34,
              "column": 19
          }
      }
  }
  });
});
