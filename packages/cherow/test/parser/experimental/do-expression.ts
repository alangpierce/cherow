import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Experimental - Do expressions', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {});

    describe('Pass', () => {

      pass(`let x = do {
        if (foo()) { f() }
        else if (bar()) { g() }
        else { h() }
      }; `, Context.OptionsExperimental | Context.OptionsNext, {
        source: `let x = do {
            if (foo()) { f() }
            else if (bar()) { g() }
            else { h() }
          }; `,
        expected: {
            "body": [
              {
                "declarations": [
                  {
                    "id": {
                      "name": "x",
                      "type": "Identifier",
                    },
                    "init": {
                      "body": {
                        "body": [
                          {
                            "alternate": {
                              "alternate": {
                                "body": [
                                  {
                                  "expression": {
                                      "arguments": [],
                                      "callee": {
                                       "name": "h",
                                        "type": "Identifier",
                                      },
                                      "type": "CallExpression"
                                    },
                                    "type": "ExpressionStatement"
                                  },
                                ],
                                "type": "BlockStatement"
                              },
                              "consequent": {
                                "body": [
                                  {
                                    "expression": {
                                      "arguments": [],
                                      "callee": {
                                        "name": "g",
                                        "type": "Identifier",
                                      },
                                      "type": "CallExpression"
                                    },
                                    "type": "ExpressionStatement"
                                  },
                                ],
                                "type": "BlockStatement"
                              },
                              "test": {
                                "arguments": [],
                                "callee": {
                                  "name": "bar",
                                  "type": "Identifier",
                                },
                                "type": "CallExpression",
                              },
                              "type": "IfStatement",
                            },
                            "consequent": {
                              "body": [
                               {
                                  "expression": {
                                    "arguments": [],
                                    "callee": {
                                      "name": "f",
                                      "type": "Identifier",
                                    },
                                    "type": "CallExpression",
                                  },
                                  "type": "ExpressionStatement"
                               }
                              ],
                              "type": "BlockStatement",
                            },
                            "test": {
                              "arguments": [],
                              "callee": {
                                "name": "foo",
                                "type": "Identifier",
                              },
                              "type": "CallExpression"
                            },
                            "type": "IfStatement"
                          }
                        ],
                        "type": "BlockStatement"
                      },
                      "type": "DoExpression"
                    },
                    "type": "VariableDeclarator"
                  }
                ],
                "kind": "let",
                "type": "VariableDeclaration"
              }
            ],
           "sourceType": "script",
            "type": "Program"
          }
    });

    pass(`let x = do {
        let tmp = f();
        tmp * tmp + 1
      }; `, Context.OptionsExperimental | Context.OptionsNext, {
      source: `let x = do {
        let tmp = f();
        tmp * tmp + 1
      };`,
      expected: {
          "body": [
            {
              "declarations": [
                {
                  "id": {
                    "name": "x",
                   "type": "Identifier"
                  },
                  "init": {
                    "body": {
                      "body": [
                        {
                          "declarations": [
                           {
                              "id": {
                               "name": "tmp",
                                "type": "Identifier"
                              },
                              "init": {
                                "arguments": [],
                                "callee": {
                                  "name": "f",
                                  "type": "Identifier"
                                },
                               "type": "CallExpression"
                              },
                              "type": "VariableDeclarator"
                            },
                          ],
                         "kind": "let",
                          "type": "VariableDeclaration"
                        },
                       {
                          "expression": {
                            "left": {
                              "left": {
                                "name": "tmp",
                                "type": "Identifier"
                              },
                              "operator": "*",
                              "right": {
                                "name": "tmp",
                                "type": "Identifier",
                              },
                              "type": "BinaryExpression"
                            },
                            "operator": "+",
                            "right": {
                              "type": "Literal",
                              "value": 1,
                            },
                            "type": "BinaryExpression"
                          },
                          "type": "ExpressionStatement"
                        },
                      ],
                      "type": "BlockStatement"
                    },
                    "type": "DoExpression"
                  },
                  "type": "VariableDeclarator"
                }
              ],
              "kind": "let",
              "type": "VariableDeclaration"
            }
          ],
          "sourceType": "script",
          "type": "Program"
        }
  });

  pass(`function foo() {
    return (
      <nav>
        <Home />
        {
          do {
            if (loggedIn) {
              <LogoutButton />
            } else {
              <LoginButton />
            }
          }
        }
      </nav>
    );
  }`, Context.OptionsExperimental | Context.OptionsNext | Context.OptionsJSX, {
  source: `function foo() {
      return (
        <nav>
          <Home />
          {
            do {
              if (loggedIn) {
                <LogoutButton />
              } else {
                <LoginButton />
              }
            }
          }
        </nav>
      );
    }`,
  expected: {
      "body": [
        {
          "async": false,
          "body": {
            "body": [
              {
                "argument": {
                  "children": [
                    {
                      "type": "JSXText",
                      "value": "\n          ",
                    },
                    {
                      "children": [],
                      "closingElement": null,
                      "openingElement": {
                        "attributes": [],
                        "name": {
                          "name": "Home",
                          "type": "JSXIdentifier",
                        },
                        "selfClosing": true,
                        "type": "JSXOpeningElement",
                      },
                      "type": "JSXElement",
                    },
                    {
                      "type": "JSXText",
                      "value": "\n          ",
                    },
                    {
                      "expression": {
                        "body": {
                          "body": [
                            {
                              "alternate": {
                                "body": [
                                  {
                                    "expression": {
                                      "children": [],
                                      "closingElement": null,
                                      "openingElement": {
                                        "attributes": [],
                                        "name": {
                                          "name": "LoginButton",
                                          "type": "JSXIdentifier",
                                        },
                                        "selfClosing": true,
                                        "type": "JSXOpeningElement",
                                      },
                                      "type": "JSXElement",
                                    },
                                    "type": "ExpressionStatement"
                                  }
                                ],
                                "type": "BlockStatement"
                              },
                              "consequent": {
                                "body": [
                                  {
                                   "expression": {
                                      "children": [],
                                     "closingElement": null,
                                      "openingElement": {
                                        "attributes": [],
                                        "name": {
                                          "name": "LogoutButton",
                                          "type": "JSXIdentifier",
                                        },
                                        "selfClosing": true,
                                        "type": "JSXOpeningElement",
                                      },
                                      "type": "JSXElement",
                                    },
                                    "type": "ExpressionStatement",
                                  },
                               ],
                                "type": "BlockStatement",
                              },
                              "test": {
                                "name": "loggedIn",
                                "type": "Identifier",
                              },
                              "type": "IfStatement"
                            }
                          ],
                          "type": "BlockStatement",
                        },
                        "type": "DoExpression",
                      },
                      "type": "JSXExpressionContainer"
                    },
                    {
                      "type": "JSXText",
                      "value": "\n        ",
                    }
                  ],
                  "closingElement": {
                   "name": {
                      "name": "nav",
                      "type": "JSXIdentifier",
                    },
                    "type": "JSXClosingElement",
                  },
                  "openingElement": {
                    "attributes": [],
                    "name": {
                     "name": "nav",
                      "type": "JSXIdentifier",
                    },
                    "selfClosing": false,
                    "type": "JSXOpeningElement",
                  },
                  "type": "JSXElement",
                },
                "type": "ReturnStatement",
              },
            ],
            "type": "BlockStatement",
          },
          "expression": false,
          "generator": false,
          "id": {
            "name": "foo",
            "type": "Identifier",
          },
          "params": [],
          "type": "FunctionDeclaration"
        }
      ],
      "sourceType": "script",
      "type": "Program"
    }
});

  });
});
