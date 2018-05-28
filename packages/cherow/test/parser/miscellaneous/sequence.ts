import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Sequence', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  pass(`let a = (x => (x, x * 2), 3);
  let b = ((x, y) => (x, x * y), 1);
  let c = (x => x * x)(2);
  let d = (1, 2, 3);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `let a = (x => (x, x * 2), 3);
    let b = ((x, y) => (x, x * y), 1);
    let c = (x => x * x)(2);
    let d = (1, 2, 3);`,
    expected: {
      "type": "Program",
      "sourceType": "script",
      "body": [
          {
              "type": "VariableDeclaration",
              "kind": "let",
              "declarations": [
                  {
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "SequenceExpression",
                          "expressions": [
                              {
                                  "type": "ArrowFunctionExpression",
                                  "body": {
                                      "type": "SequenceExpression",
                                      "expressions": [
                                          {
                                              "type": "Identifier",
                                              "name": "x",
                                              "start": 15,
                                              "end": 16,
                                              "loc": {
                                                  "start": {
                                                      "line": 1,
                                                      "column": 15
                                                  },
                                                  "end": {
                                                      "line": 1,
                                                      "column": 16
                                                  }
                                              }
                                          },
                                          {
                                              "type": "BinaryExpression",
                                              "left": {
                                                  "type": "Identifier",
                                                  "name": "x",
                                                  "start": 18,
                                                  "end": 19,
                                                  "loc": {
                                                      "start": {
                                                          "line": 1,
                                                          "column": 18
                                                      },
                                                      "end": {
                                                          "line": 1,
                                                          "column": 19
                                                      }
                                                  }
                                              },
                                              "right": {
                                                  "type": "Literal",
                                                  "value": 2,
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
                                                  },
                                                  "raw": "2"
                                              },
                                              "operator": "*",
                                              "start": 18,
                                              "end": 23,
                                              "loc": {
                                                  "start": {
                                                      "line": 1,
                                                      "column": 18
                                                  },
                                                  "end": {
                                                      "line": 1,
                                                      "column": 23
                                                  }
                                              }
                                          }
                                      ],
                                      "start": 15,
                                      "end": 23,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 15
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 23
                                          }
                                      }
                                  },
                                  "params": [
                                      {
                                          "type": "Identifier",
                                          "name": "x",
                                          "start": 9,
                                          "end": 10,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 9
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 10
                                              }
                                          }
                                      }
                                  ],
                                  "id": null,
                                  "async": false,
                                  "generator": false,
                                  "expression": true,
                                  "start": 9,
                                  "end": 24,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 9
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 24
                                      }
                                  }
                              },
                              {
                                  "type": "Literal",
                                  "value": 3,
                                  "start": 26,
                                  "end": 27,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 26
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 27
                                      }
                                  },
                                  "raw": "3"
                              }
                          ],
                          "start": 9,
                          "end": 27,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 9
                              },
                              "end": {
                                  "line": 1,
                                  "column": 27
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
                      "end": 28,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 28
                          }
                      }
                  }
              ],
              "start": 0,
              "end": 29,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 29
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
                          "type": "SequenceExpression",
                          "expressions": [
                              {
                                  "type": "ArrowFunctionExpression",
                                  "body": {
                                      "type": "SequenceExpression",
                                      "expressions": [
                                          {
                                              "type": "Identifier",
                                              "name": "x",
                                              "start": 54,
                                              "end": 55,
                                              "loc": {
                                                  "start": {
                                                      "line": 2,
                                                      "column": 24
                                                  },
                                                  "end": {
                                                      "line": 2,
                                                      "column": 25
                                                  }
                                              }
                                          },
                                          {
                                              "type": "BinaryExpression",
                                              "left": {
                                                  "type": "Identifier",
                                                  "name": "x",
                                                  "start": 57,
                                                  "end": 58,
                                                  "loc": {
                                                      "start": {
                                                          "line": 2,
                                                          "column": 27
                                                      },
                                                      "end": {
                                                          "line": 2,
                                                          "column": 28
                                                      }
                                                  }
                                              },
                                              "right": {
                                                  "type": "Identifier",
                                                  "name": "y",
                                                  "start": 61,
                                                  "end": 62,
                                                  "loc": {
                                                      "start": {
                                                          "line": 2,
                                                          "column": 31
                                                      },
                                                      "end": {
                                                          "line": 2,
                                                          "column": 32
                                                      }
                                                  }
                                              },
                                              "operator": "*",
                                              "start": 57,
                                              "end": 62,
                                              "loc": {
                                                  "start": {
                                                      "line": 2,
                                                      "column": 27
                                                  },
                                                  "end": {
                                                      "line": 2,
                                                      "column": 32
                                                  }
                                              }
                                          }
                                      ],
                                      "start": 54,
                                      "end": 62,
                                      "loc": {
                                          "start": {
                                              "line": 2,
                                              "column": 24
                                          },
                                          "end": {
                                              "line": 2,
                                              "column": 32
                                          }
                                      }
                                  },
                                  "params": [
                                      {
                                          "type": "Identifier",
                                          "name": "x",
                                          "start": 44,
                                          "end": 45,
                                          "loc": {
                                              "start": {
                                                  "line": 2,
                                                  "column": 14
                                              },
                                              "end": {
                                                  "line": 2,
                                                  "column": 15
                                              }
                                          }
                                      },
                                      {
                                          "type": "Identifier",
                                          "name": "y",
                                          "start": 47,
                                          "end": 48,
                                          "loc": {
                                              "start": {
                                                  "line": 2,
                                                  "column": 17
                                              },
                                              "end": {
                                                  "line": 2,
                                                  "column": 18
                                              }
                                          }
                                      }
                                  ],
                                  "id": null,
                                  "async": false,
                                  "generator": false,
                                  "expression": true,
                                  "start": 43,
                                  "end": 63,
                                  "loc": {
                                      "start": {
                                          "line": 2,
                                          "column": 13
                                      },
                                      "end": {
                                          "line": 2,
                                          "column": 33
                                      }
                                  }
                              },
                              {
                                  "type": "Literal",
                                  "value": 1,
                                  "start": 65,
                                  "end": 66,
                                  "loc": {
                                      "start": {
                                          "line": 2,
                                          "column": 35
                                      },
                                      "end": {
                                          "line": 2,
                                          "column": 36
                                      }
                                  },
                                  "raw": "1"
                              }
                          ],
                          "start": 43,
                          "end": 66,
                          "loc": {
                              "start": {
                                  "line": 2,
                                  "column": 13
                              },
                              "end": {
                                  "line": 2,
                                  "column": 36
                              }
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "name": "b",
                          "start": 38,
                          "end": 39,
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
                      "start": 38,
                      "end": 67,
                      "loc": {
                          "start": {
                              "line": 2,
                              "column": 8
                          },
                          "end": {
                              "line": 2,
                              "column": 37
                          }
                      }
                  }
              ],
              "start": 34,
              "end": 68,
              "loc": {
                  "start": {
                      "line": 2,
                      "column": 4
                  },
                  "end": {
                      "line": 2,
                      "column": 38
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
                          "type": "CallExpression",
                          "callee": {
                              "type": "ArrowFunctionExpression",
                              "body": {
                                  "type": "BinaryExpression",
                                  "left": {
                                      "type": "Identifier",
                                      "name": "x",
                                      "start": 87,
                                      "end": 88,
                                      "loc": {
                                          "start": {
                                              "line": 3,
                                              "column": 18
                                          },
                                          "end": {
                                              "line": 3,
                                              "column": 19
                                          }
                                      }
                                  },
                                  "right": {
                                      "type": "Identifier",
                                      "name": "x",
                                      "start": 91,
                                      "end": 92,
                                      "loc": {
                                          "start": {
                                              "line": 3,
                                              "column": 22
                                          },
                                          "end": {
                                              "line": 3,
                                              "column": 23
                                          }
                                      }
                                  },
                                  "operator": "*",
                                  "start": 87,
                                  "end": 92,
                                  "loc": {
                                      "start": {
                                          "line": 3,
                                          "column": 18
                                      },
                                      "end": {
                                          "line": 3,
                                          "column": 23
                                      }
                                  }
                              },
                              "params": [
                                  {
                                      "type": "Identifier",
                                      "name": "x",
                                      "start": 82,
                                      "end": 83,
                                      "loc": {
                                          "start": {
                                              "line": 3,
                                              "column": 13
                                          },
                                          "end": {
                                              "line": 3,
                                              "column": 14
                                          }
                                      }
                                  }
                              ],
                              "id": null,
                              "async": false,
                              "generator": false,
                              "expression": true,
                              "start": 82,
                              "end": 92,
                              "loc": {
                                  "start": {
                                      "line": 3,
                                      "column": 13
                                  },
                                  "end": {
                                      "line": 3,
                                      "column": 23
                                  }
                              }
                          },
                          "arguments": [
                              {
                                  "type": "Literal",
                                  "value": 2,
                                  "start": 94,
                                  "end": 95,
                                  "loc": {
                                      "start": {
                                          "line": 3,
                                          "column": 25
                                      },
                                      "end": {
                                          "line": 3,
                                          "column": 26
                                      }
                                  },
                                  "raw": "2"
                              }
                          ],
                          "start": 81,
                          "end": 96,
                          "loc": {
                              "start": {
                                  "line": 3,
                                  "column": 12
                              },
                              "end": {
                                  "line": 3,
                                  "column": 27
                              }
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "name": "c",
                          "start": 77,
                          "end": 78,
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
                      "start": 77,
                      "end": 96,
                      "loc": {
                          "start": {
                              "line": 3,
                              "column": 8
                          },
                          "end": {
                              "line": 3,
                              "column": 27
                          }
                      }
                  }
              ],
              "start": 73,
              "end": 97,
              "loc": {
                  "start": {
                      "line": 3,
                      "column": 4
                  },
                  "end": {
                      "line": 3,
                      "column": 28
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
                          "type": "SequenceExpression",
                          "expressions": [
                              {
                                  "type": "Literal",
                                  "value": 1,
                                  "start": 111,
                                  "end": 112,
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
                                  "raw": "1"
                              },
                              {
                                  "type": "Literal",
                                  "value": 2,
                                  "start": 114,
                                  "end": 115,
                                  "loc": {
                                      "start": {
                                          "line": 4,
                                          "column": 16
                                      },
                                      "end": {
                                          "line": 4,
                                          "column": 17
                                      }
                                  },
                                  "raw": "2"
                              },
                              {
                                  "type": "Literal",
                                  "value": 3,
                                  "start": 117,
                                  "end": 118,
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
                              }
                          ],
                          "start": 111,
                          "end": 118,
                          "loc": {
                              "start": {
                                  "line": 4,
                                  "column": 13
                              },
                              "end": {
                                  "line": 4,
                                  "column": 20
                              }
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "name": "d",
                          "start": 106,
                          "end": 107,
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
                      "start": 106,
                      "end": 119,
                      "loc": {
                          "start": {
                              "line": 4,
                              "column": 8
                          },
                          "end": {
                              "line": 4,
                              "column": 21
                          }
                      }
                  }
              ],
              "start": 102,
              "end": 120,
              "loc": {
                  "start": {
                      "line": 4,
                      "column": 4
                  },
                  "end": {
                      "line": 4,
                      "column": 22
                  }
              }
          }
      ],
      "start": 0,
      "end": 120,
      "loc": {
          "start": {
              "line": 1,
              "column": 0
          },
          "end": {
              "line": 4,
              "column": 22
          }
      }
  }
  });
});
