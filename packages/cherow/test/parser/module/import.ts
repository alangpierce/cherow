import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Module - Import', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failures', () => {

      const failures = [
          'import',
          'import;',
          'import {}',
          'import {};',
          'import {} from;',
          'import {,} from \'a\';',
          'import {b,,} from \'a\';',
          'import from;',
          'import {b as,} from \'a\';',
          'import {function} from \'a\';',
          'import {a as function} from \'a\';',
          'import {b,,c} from \'a\';',
          'import {b,c,,} from \'a\';',
          'import * As a from \'a\'',
          'import / as a from \'a\'',
          'import * as b, a from \'a\'',
          'import a as b from \'a\'',
          'import a, b from \'a\'',
          'import from \'foo\';',
          'import \'a\',',
          'import { };',
          'import {;',
          'import };',
          'import { , };',
          'import { , } from \'foo\';',
          'import { a } from;',
          'import { a } \'foo\';',
          'import , from \'foo\';',
          'import a , from \'foo\';',
          'import a { b, c } from \'foo\';',
          'import arguments from \'foo\';',
          'import eval from \'foo\';',
          'import { arguments } from \'foo\';',
          'import { null } from "null',
          'import foo, from "bar";',
          'import default from "foo"',
          'import {bar}, {foo} from "foo";',
          'import {bar}, foo from "foo"',
          '{import a from \'b\';}',
          'import { {} } from \'foo\';',
          'import { !d } from \'foo\';',
          'import { 123 } from \'foo\';',
          'import { [123] } from \'foo\';',
          'import { foo as {a: b = 2} } from \'foo\';',
          'import { foo as !d } from \'foo\';',
          'import { foo as 123 } from \'foo\';',
          'import { foo as [123] } from \'foo\';',
          'import { foo as {a: b = 2} } from \'foo\';',
          'import { eval } from \'foo\';',
          'import { a as arguments } from \'foo\';',
          'import { for } from \'foo\';',
          'import { y as yield } from \'foo\'',
          'import { s as static } from \'foo\'',
          'import { l as let } from \'foo\'',
          'while (false) import v from \'foo\'',
          'try { } finally { import v from \'foo\'; }',
          '({ set m(x) { import v from \'foo\'; } });',
          'class C { method() { import v from \'foo\'; } }',
          'import { arguments } from \'foo\';',
          'import { a as await } from \'foo\';',
          'import { a as enum } from \'foo\';',
          'import { x }, def from \'foo\';',
          'import def, def2 from \'foo\';',
          'import * as x, def from \'foo\';',
          'import * as x, * as y from \'foo\';',
          'import {x}, {y} from \'foo\';',
          'import * as x, {y} from \'foo\';',
          'import default from "foo"',
          'import { class } from "foo"',
          'iimport { class, var } from "foo"',
          'import { a as class } from "foo"',
          'import * as class from "foo"',
          'import { enum } from "foo"',
          'import { foo, bar }',
          'import foo from bar',
          'import * 12',
          'import a, 12 from \'foo\'',
          'import {a as 12} from "foo"',
          'import * as a from 12',
          'import {a as b, e as l 12',
          'import icefapper from ;',
          'import icefapper from {}',
          'import icefapper from 12',
          'import icefapper from /',
          'import icefapper from []',
          'function foo() { import foo from "icefapper.js"; }',
          'import foo, bar from "foo.js";',
          'import { foo }, * as ns1 from "foo.js";',
          'import { foo }',
          'import [ foo ] from "foo.js";',
          '{ import in_block from ""; }',
          'import {',
          'import { foo',
          'import { foo as ',
          'import { foo as bar ',
          'import { foo as bar, ',
          'import { foo as switch } from "module";',
          'import { foo, , } from "module";',
          `for (const y in [])
          import v from './foo`
      ];

      for (const arg of failures) {
          it(`${arg}`, () => {
              t.throws(() => {
                  parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
              });
          });
      }

      fail('import "foo"', Context.Empty, {
          source: 'import "foo"',
      });

      fail('import icefapper from 12', Context.Strict | Context.Module, {
          source: 'import icefapper from 12',
      });

      fail('import { x }, def from "foo";', Context.Strict | Context.Module, {
          source: 'import { x }, def from "foo";',
      });

      fail('import default from "foo"', Context.Strict | Context.Module, {
          source: 'import default from "foo"',
      });

      fail('import { for } from "foo";', Context.Strict | Context.Module, {
          source: 'import { for } from "foo";',
      });

      fail('import };', Context.Strict | Context.Module, {
          source: 'import };',
      });
  });

  describe('Pass', () => {
      const programs = [
          'import \'foo\';',
          'import { a } from \'foo\';',
          'import { a, b as d, c, } from \'baz\';',
          'import * as thing from \'baz\';',
          'import thing from \'foo\';',
          'import thing, * as rest from \'foo\';',
          'import thing, { a, b, c } from \'foo\';',
          'import { arguments as a } from \'baz\';',
          'import { for as f } from \'foo\';',
          'import { yield as y } from \'foo\';',
          'import { static as s } from \'foo\';',
          'import { let as l } from \'foo\';',
          'import { q as z } from \'foo\';',
          'import { null as nil } from "bar"',
          'import {bar, baz} from "foo";',
          'import {bar as baz, xyz} from "foo";',
          'import foo, {bar} from "foo";',
          'import a, { b, c as d } from "foo"',
          'import foo, * as bar from \'baz\';',
          'import $ from "foo"',
          'import {} from "foo";',
          'import n from \'n.js\';',
          'import a from "module";',
          'import b, * as c from "module";',
          'import * as d from "module";',
          'import e, {f as g, h as i, j} from "module";',
          'import {k as l, m} from "module";',
          'import {n, o as p} from "module";',
          'import \'q.js\';',
          'import a, {b,c,} from \'d\'',
          'import a, {b,} from \'foo\'',
          'import {as as as} from \'as\'',
          'import a, {as} from \'foo\'',
          'import a, {function as c} from \'baz\'',
          'import a, {b as c} from \'foo\'',
          'import a, * as b from \'a\'',
          'import a, {} from \'foo\'',
          'import a from \'foo\'',
          'import * as a from \'a\'',
          'import {m as mm} from \'foo\';',
          'import {aa} from \'foo\';',
          'import * as foob from \'bar.js\';',
          'import { as, get, set, from } from "baz"',
          'import icefapper from "await"',
      ];

      for (const arg of programs) {

          it(`${arg}`, () => {
              t.doesNotThrow(() => {
                  parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
              });
          });
      }

      pass(`import * as loo from 'bar.js';`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Module, {
          source: `import * as loo from 'bar.js';`,
          expected: {
              type: 'Program',
              start: 0,
              end: 30,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 30
                }
              },
              body: [
                {
                  type: 'ImportDeclaration',
                  start: 0,
                  end: 30,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 30
                    }
                  },
                  specifiers: [
                    {
                      type: 'ImportNamespaceSpecifier',
                      start: 7,
                      end: 15,
                      loc: {
                        start: {
                          line: 1,
                          column: 7
                        },
                        end: {
                          line: 1,
                          column: 15
                        }
                      },
                      local: {
                        type: 'Identifier',
                        start: 12,
                        end: 15,
                        loc: {
                          start: {
                            line: 1,
                            column: 12
                          },
                          end: {
                            line: 1,
                            column: 15
                          }
                        },
                        name: 'loo'
                      }
                    }
                  ],
                  source: {
                    type: 'Literal',
                    start: 21,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    },
                    value: 'bar.js',
                    raw: '\'bar.js\''
                  }
                }
              ],
              sourceType: 'module'
            }
      });

      pass(`import 'foo';`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Module, {
          source: `import 'foo';`,
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
                  type: 'ImportDeclaration',
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
                  specifiers: [],
                  source: {
                    type: 'Literal',
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
                    value: 'foo',
                    raw: '\'foo\''
                  }
                }
              ],
              sourceType: 'module'
            }
      });

      pass(`import * as foob from 'bar.js';`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Module, {
          source: `import * as foob from 'bar.js';`,
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
                  type: 'ImportDeclaration',
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
                  specifiers: [
                    {
                      type: 'ImportNamespaceSpecifier',
                      start: 7,
                      end: 16,
                      loc: {
                        start: {
                          line: 1,
                          column: 7
                        },
                        end: {
                          line: 1,
                          column: 16
                        }
                      },
                      local: {
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
                        name: 'foob'
                      }
                    }
                  ],
                  source: {
                    type: 'Literal',
                    start: 22,
                    end: 30,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 30
                      }
                    },
                    value: 'bar.js',
                    raw: '\'bar.js\''
                  }
                }
              ],
              sourceType: 'module'
            }
      });

      pass(`'import {} from "foo";'`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Module, {
          source: `import {} from "foo";`,
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
                  type: 'ImportDeclaration',
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
                  specifiers: [],
                  source: {
                    type: 'Literal',
                    start: 15,
                    end: 20,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 20
                      }
                    },
                    value: 'foo',
                    raw: '"foo"'
                  }
                }
              ],
              sourceType: 'module'
            }
      });

      pass(`import thing, { a, b, c } from 'foo';`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Module, {
          source: `import thing, { a, b, c } from 'foo';`,
          expected: {
              type: 'Program',
              start: 0,
              end: 37,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 37
                }
              },
              body: [
                {
                  type: 'ImportDeclaration',
                  start: 0,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  },
                  specifiers: [
                    {
                      type: 'ImportDefaultSpecifier',
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
                      local: {
                        type: 'Identifier',
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
                        name: 'thing'
                      }
                    },
                    {
                      type: 'ImportSpecifier',
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
                      imported: {
                        type: 'Identifier',
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
                        name: 'a'
                      },
                      local: {
                        type: 'Identifier',
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
                        name: 'a'
                      }
                    },
                    {
                      type: 'ImportSpecifier',
                      start: 19,
                      end: 20,
                      loc: {
                        start: {
                          line: 1,
                          column: 19
                        },
                        end: {
                          line: 1,
                          column: 20
                        }
                      },
                      imported: {
                        type: 'Identifier',
                        start: 19,
                        end: 20,
                        loc: {
                          start: {
                            line: 1,
                            column: 19
                          },
                          end: {
                            line: 1,
                            column: 20
                          }
                        },
                        name: 'b'
                      },
                      local: {
                        type: 'Identifier',
                        start: 19,
                        end: 20,
                        loc: {
                          start: {
                            line: 1,
                            column: 19
                          },
                          end: {
                            line: 1,
                            column: 20
                          }
                        },
                        name: 'b'
                      }
                    },
                    {
                      type: 'ImportSpecifier',
                      start: 22,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      },
                      imported: {
                        type: 'Identifier',
                        start: 22,
                        end: 23,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 23
                          }
                        },
                        name: 'c'
                      },
                      local: {
                        type: 'Identifier',
                        start: 22,
                        end: 23,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 23
                          }
                        },
                        name: 'c'
                      }
                    }
                  ],
                  source: {
                    type: 'Literal',
                    start: 31,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    },
                    value: 'foo',
                    raw: '\'foo\''
                  }
                }
              ],
              sourceType: 'module'
            }
      });

      pass(`import { for as f } from 'foo';`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Module, {
          source: `import { for as f } from 'foo';`,
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
                  type: 'ImportDeclaration',
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
                  specifiers: [
                    {
                      type: 'ImportSpecifier',
                      start: 9,
                      end: 17,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 17
                        }
                      },
                      imported: {
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
                        name: 'for'
                      },
                      local: {
                        type: 'Identifier',
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
                        name: 'f'
                      }
                    }
                  ],
                  source: {
                    type: 'Literal',
                    start: 25,
                    end: 30,
                    loc: {
                      start: {
                        line: 1,
                        column: 25
                      },
                      end: {
                        line: 1,
                        column: 30
                      }
                    },
                    value: 'foo',
                    raw: '\'foo\''
                  }
                }
              ],
              sourceType: 'module'
            }
      });

      pass(`import { arguments as a } from 'baz';`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Module, {
          source: `import { arguments as a } from 'baz';`,
          expected: {
              type: 'Program',
              start: 0,
              end: 37,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 37
                }
              },
              body: [
                {
                  type: 'ImportDeclaration',
                  start: 0,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  },
                  specifiers: [
                    {
                      type: 'ImportSpecifier',
                      start: 9,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      },
                      imported: {
                        type: 'Identifier',
                        start: 9,
                        end: 18,
                        loc: {
                          start: {
                            line: 1,
                            column: 9
                          },
                          end: {
                            line: 1,
                            column: 18
                          }
                        },
                        name: 'arguments'
                      },
                      local: {
                        type: 'Identifier',
                        start: 22,
                        end: 23,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 23
                          }
                        },
                        name: 'a'
                      }
                    }
                  ],
                  source: {
                    type: 'Literal',
                    start: 31,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    },
                    value: 'baz',
                    raw: '\'baz\''
                  }
                }
              ],
              sourceType: 'module'
            }
      });
  });
});
