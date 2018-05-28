import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Literals - numbers', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [
            '0\\u006f0;',
            '0o8;',
            '00o0;',
            '0o;',
            '1eTYU+1',
            '0\\u00620;',
            '0b;',
            '0b2;',
            '0o_777',
            '0b0_1',
            // "+123456789_0",
            '+123456789easy_to_forget_0',
            '123a',
            '123&/(I',
            '0X',
            '0xg',
            '0X',
            '0xG'
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

        fail('"use strict"; 009', Context.Empty, {
          source: '"use strict"; 000',
      });

        fail('"use strict"; 009', Context.Empty, {
          source: '"use strict"; 009',
      });

        fail('"use strict"; 001', Context.Empty, {
        source: '"use strict"; 001',
    });

        fail('"use strict"; 01', Context.Empty, {
      source: '"use strict"; 01',
  });

        fail('"use strict"; 08', Context.Empty, {
        source: '"use strict"; 08',
    });

    });

    describe('Pass', () => {

        const validSyntax = [
            '1',
            '123',
            '123456789',
            '1234567890324567890',
            '12345678912345678912345678123456789258721349812657123641237846',
            '12345678912345678912345678123456789258721349812657123641237846123456789123456789123456781',
            '-41',
            '(-41)',
            '-(+41)',
            '.1E0',
            '.3E0',
            '0.8',
            '.9E0',
            '0.E1',
            '10',
            '7.E1',
            '0x3F3a',
            '0X3F3a',
            '0o3705',
            '0O3705',
            '0b0101011',
            '0B0101011',
            '123',
            '023',
            '34.',
            '.3435',
            '345.767',
            '.34e-1',
            '.34E-1',
            '.65e+3',
            '.6E+3',
            '.86e4',
            '.34E4',
            '4545.4545e+5',
            '4545.4545E+5',
            '4545.4545e5',
            '4545.4545E5',
            '4545.4545e-5',
            '4545.4545E-5',
            '34e+5',
            '34E+5',
            '34e5',
            '34E5',
            '34e-5',
            '34E-5',
            '2.2e+1',
            '7.7e+1',
            '88',
            '3e01',
            '0x10',
            '0x100',
            '0x1000',
            '0x10000000',
            '0o7',
            '0o10',
            '0O010',
            '0O10',
            '0o011',
            '0O77',
            '268435456',
            '0b10',
            '0B010',
            '0O00',
            '0B011',
            '0O077',
        ];

        for (const arg of validSyntax) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.OptionsNext);
                });
                t.doesNotThrow(() => {
                    parseSource(`var foo = ${arg};`, undefined, Context.OptionsNext);
                });
            });
            it(`var foo = ${arg};`, () => {
                  t.doesNotThrow(() => {
                    parseSource(`var foo = ${arg};`, undefined, Context.OptionsNext);
                });
            });
        }

        pass(`0x10000000`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0x10000000`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 268435456,
                            start: 0,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            raw: '0x10000000'
                        },
                        start: 0,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    }
                ],
                start: 0,
                end: 10,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 10
                    }
                }
            }
        });

        pass(`0`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0`,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                      type: 'Literal',
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
                      },
                      value: 0,
                      raw: '0'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`0;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0;`,
            expected: {
                type: 'Program',
                start: 0,
                end: 2,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 2
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 2,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 2
                      }
                    },
                    expression: {
                      type: 'Literal',
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
                      },
                      value: 0,
                      raw: '0'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`\n    0\n\n`, Context.Empty, {
            source: `\n    0\n\n`,
            expected: {
                  body: [
                    {
                      expression: {
                        type: 'Literal',
                        value: 0,
                      },
                      type: 'ExpressionStatement'
                    }
                 ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

        pass(`1.14`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `1.14`,
            expected: {
                type: 'Program',
                start: 0,
                end: 4,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 4
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 4,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 4
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      },
                      value: 1.14,
                      raw: '1.14'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`6.`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `6.`,
            expected: {
                type: 'Program',
                start: 0,
                end: 2,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 2
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 2,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 2
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 2,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 2
                        }
                      },
                      value: 6,
                      raw: '6.'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`.14`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `.14`,
            expected: {
                type: 'Program',
                start: 0,
                end: 3,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 3
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 3,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 3
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 3,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 3
                        }
                      },
                      value: 0.14,
                      raw: '.14'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`3.14159`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `3.14159`,
            expected: {
                type: 'Program',
                start: 0,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 7,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 7
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 7,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 7
                        }
                      },
                      value: 3.14159,
                      raw: '3.14159'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`6.02214179e+23`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `6.02214179e+23`,
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
                      value: 6.02214179e+23,
                      raw: '6.02214179e+23'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`1.492417830e-10`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `1.492417830e-10`,
            expected: {
                type: 'Program',
                start: 0,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 15,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 15
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 15,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 15
                        }
                      },
                      value: 1.49241783e-10,
                      raw: '1.492417830e-10'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`0e+100 `, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0e+100 `,
            expected: {
                type: 'Program',
                start: 0,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                },
                body: [
                  {
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
                      value: 0,
                      raw: '0e+100'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`0e+100`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0e+100`,
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
                body: [
                  {
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
                      value: 0,
                      raw: '0e+100'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`0x0`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0X04`,
            expected: {
                type: 'Program',
                start: 0,
                end: 4,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 4
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 4,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 4
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      },
                      value: 4,
                      raw: '0X04'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`0012`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0;`,
            expected: {
                type: 'Program',
                start: 0,
                end: 2,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 2
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 2,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 2
                      }
                    },
                    expression: {
                      type: 'Literal',
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
                      },
                      value: 0,
                      raw: '0'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`0.`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0.`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 0,
                            start: 0,
                            end: 2,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 2
                                }
                            },
                            raw: '0.'
                        },
                        start: 0,
                        end: 2,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 2
                            }
                        }
                    }
                ],
                start: 0,
                end: 2,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 2
                    }
                }
            }
        });

        pass(`09.0`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `09.0`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 9,
                            start: 0,
                            end: 4,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 4
                                }
                            },
                            raw: '09.0'
                        },
                        start: 0,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        }
                    }
                ],
                start: 0,
                end: 4,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 4
                    }
                }
            }
        });

        pass(`0o0`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0o0`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 0,
                            start: 0,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 3
                                }
                            },
                            raw: '0o0'
                        },
                        start: 0,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    }
                ],
                start: 0,
                end: 3,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 3
                    }
                }
            }
        });

        pass(`0008`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0008`,
            expected: {
                type: 'Program',
                start: 0,
                end: 4,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 4
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 4,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 4
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      },
                      value: 8,
                      raw: '0008'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`018`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `018`,
            expected: {
                type: 'Program',
                start: 0,
                end: 3,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 3
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 3,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 3
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 3,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 3
                        }
                      },
                      value: 18,
                      raw: '018'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`0x100`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0x100`,
            expected: {
                type: 'Program',
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
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    expression: {
                      type: 'Literal',
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
                      value: 256,
                      raw: '0x100'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`0X04`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0X04`,
            expected: {
                type: 'Program',
                start: 0,
                end: 4,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 4
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 4,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 4
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      },
                      value: 4,
                      raw: '0X04'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`0xdef`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0xdef`,
            expected: {
                type: 'Program',
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
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    expression: {
                      type: 'Literal',
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
                      value: 3567,
                      raw: '0xdef'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`0123`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0123`,
            expected: {
                type: 'Program',
                start: 0,
                end: 4,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 4
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 4,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 4
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      },
                      value: 83,
                      raw: '0123'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`00`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `00`,
            expected: {
                type: 'Program',
                start: 0,
                end: 2,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 2
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 2,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 2
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 2,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 2
                        }
                      },
                      value: 0,
                      raw: '00'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`019`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `019`,
            expected: {
                type: 'Program',
                start: 0,
                end: 3,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 3
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 3,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 3
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 3,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 3
                        }
                      },
                      value: 19,
                      raw: '019'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`08`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `08`,
            expected: {
                type: 'Program',
                start: 0,
                end: 2,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 2
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 2,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 2
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 2,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 2
                        }
                      },
                      value: 8,
                      raw: '08'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`0b10`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0b10`,
            expected: {
                type: 'Program',
                start: 0,
                end: 4,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 4
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 4,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 4
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      },
                      value: 2,
                      raw: '0b10'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`0b1`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0b1`,
            expected: {
                type: 'Program',
                start: 0,
                end: 3,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 3
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 3,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 3
                      }
                    },
                    expression: {
                      type: 'Literal',
                      start: 0,
                      end: 3,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 3
                        }
                      },
                      value: 1,
                      raw: '0b1'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`(0o0)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(0o0)`,
            expected: {
                type: 'Program',
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
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    expression: {
                      type: 'Literal',
                      start: 1,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      },
                      value: 0,
                      raw: '0o0'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`0x100`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `0x100`,
            expected: {
                type: 'Program',
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
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    expression: {
                      type: 'Literal',
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
                      value: 256,
                      raw: '0x100'
                    }
                  }
                ],
                sourceType: 'script'
              }
        });
      });
});
