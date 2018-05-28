import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Next - Optional catch binding', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {
        fail('try { throw undefined; } catch (err = "foo") { err }', Context.OptionsNext, {
            source: 'try { throw undefined; } catch (err = "foo") { err }',
         });
    });

    describe('Pass', () => {

      pass('try { } catch { }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
        source: 'try { } catch { }',
        expected: {
          type: 'Program',
          sourceType: 'script',
          body: [
              {
                  type: 'TryStatement',
                  block: {
                      type: 'BlockStatement',
                      body: [],
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
                      }
                  },
                  handler: {
                      type: 'CatchClause',
                      param: null,
                      body: {
                          type: 'BlockStatement',
                          body: [],
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
                          }
                      },
                      start: 8,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      }
                  },
                  finalizer: null,
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
                  }
              }
          ],
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
          }
      }
      });

      pass('try { } catch { } finally { }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
        source: 'try { } catch { } finally { }',
        expected: {
          type: 'Program',
          sourceType: 'script',
          body: [
              {
                  type: 'TryStatement',
                  block: {
                      type: 'BlockStatement',
                      body: [],
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
                      }
                  },
                  handler: {
                      type: 'CatchClause',
                      param: null,
                      body: {
                          type: 'BlockStatement',
                          body: [],
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
                          }
                      },
                      start: 8,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      }
                  },
                  finalizer: {
                      type: 'BlockStatement',
                      body: [],
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
                      }
                  },
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
                  }
              }
          ],
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
          }
      }
      });

      pass('try { let e; } catch { let e; }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
        source: 'try { let e; } catch { let e; }',
        expected: {
          type: 'Program',
          sourceType: 'script',
          body: [
              {
                  type: 'TryStatement',
                  block: {
                      type: 'BlockStatement',
                      body: [
                          {
                              type: 'VariableDeclaration',
                              declarations: [
                                  {
                                      type: 'VariableDeclarator',
                                      init: null,
                                      id: {
                                          type: 'Identifier',
                                          name: 'e',
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
                                          }
                                      },
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
                                      }
                                  }
                              ],
                              kind: 'let',
                              start: 6,
                              end: 12,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 6
                                  },
                                  end: {
                                      line: 1,
                                      column: 12
                                  }
                              }
                          }
                      ],
                      start: 4,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      }
                  },
                  handler: {
                      type: 'CatchClause',
                      param: null,
                      body: {
                          type: 'BlockStatement',
                          body: [
                              {
                                  type: 'VariableDeclaration',
                                  declarations: [
                                      {
                                          type: 'VariableDeclarator',
                                          init: null,
                                          id: {
                                              type: 'Identifier',
                                              name: 'e',
                                              start: 27,
                                              end: 28,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 27
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 28
                                                  }
                                              }
                                          },
                                          start: 27,
                                          end: 28,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 27
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 28
                                              }
                                          }
                                      }
                                  ],
                                  kind: 'let',
                                  start: 23,
                                  end: 29,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 23
                                      },
                                      end: {
                                          line: 1,
                                          column: 29
                                      }
                                  }
                              }
                          ],
                          start: 21,
                          end: 31,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 21
                              },
                              end: {
                                  line: 1,
                                  column: 31
                              }
                          }
                      },
                      start: 15,
                      end: 31,
                      loc: {
                          start: {
                              line: 1,
                              column: 15
                          },
                          end: {
                              line: 1,
                              column: 31
                          }
                      }
                  },
                  finalizer: null,
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
                  }
              }
          ],
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
          }
      }
      });

      pass('try { let e; } catch { let e; } finally { let e; }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
        source: 'try { let e; } catch { let e; } finally { let e; }',
        expected: {
          type: 'Program',
          sourceType: 'script',
          body: [
              {
                  type: 'TryStatement',
                  block: {
                      type: 'BlockStatement',
                      body: [
                          {
                              type: 'VariableDeclaration',
                              declarations: [
                                  {
                                      type: 'VariableDeclarator',
                                      init: null,
                                      id: {
                                          type: 'Identifier',
                                          name: 'e',
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
                                          }
                                      },
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
                                      }
                                  }
                              ],
                              kind: 'let',
                              start: 6,
                              end: 12,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 6
                                  },
                                  end: {
                                      line: 1,
                                      column: 12
                                  }
                              }
                          }
                      ],
                      start: 4,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      }
                  },
                  handler: {
                      type: 'CatchClause',
                      param: null,
                      body: {
                          type: 'BlockStatement',
                          body: [
                              {
                                  type: 'VariableDeclaration',
                                  declarations: [
                                      {
                                          type: 'VariableDeclarator',
                                          init: null,
                                          id: {
                                              type: 'Identifier',
                                              name: 'e',
                                              start: 27,
                                              end: 28,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 27
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 28
                                                  }
                                              }
                                          },
                                          start: 27,
                                          end: 28,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 27
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 28
                                              }
                                          }
                                      }
                                  ],
                                  kind: 'let',
                                  start: 23,
                                  end: 29,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 23
                                      },
                                      end: {
                                          line: 1,
                                          column: 29
                                      }
                                  }
                              }
                          ],
                          start: 21,
                          end: 31,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 21
                              },
                              end: {
                                  line: 1,
                                  column: 31
                              }
                          }
                      },
                      start: 15,
                      end: 31,
                      loc: {
                          start: {
                              line: 1,
                              column: 15
                          },
                          end: {
                              line: 1,
                              column: 31
                          }
                      }
                  },
                  finalizer: {
                      type: 'BlockStatement',
                      body: [
                          {
                              type: 'VariableDeclaration',
                              declarations: [
                                  {
                                      type: 'VariableDeclarator',
                                      init: null,
                                      id: {
                                          type: 'Identifier',
                                          name: 'e',
                                          start: 46,
                                          end: 47,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 46
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 47
                                              }
                                          }
                                      },
                                      start: 46,
                                      end: 47,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 46
                                          },
                                          end: {
                                              line: 1,
                                              column: 47
                                          }
                                      }
                                  }
                              ],
                              kind: 'let',
                              start: 42,
                              end: 48,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 42
                                  },
                                  end: {
                                      line: 1,
                                      column: 48
                                  }
                              }
                          }
                      ],
                      start: 40,
                      end: 50,
                      loc: {
                          start: {
                              line: 1,
                              column: 40
                          },
                          end: {
                              line: 1,
                              column: 50
                          }
                      }
                  },
                  start: 0,
                  end: 50,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 50
                      }
                  }
              }
          ],
          start: 0,
          end: 50,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 50
              }
          }
      }
      });
    });
});
