import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Statements - Empty', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Pass', () => {

    pass(`3;;;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `3;;;`,
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
                  value: 3,
                  raw: '3'
                }
              },
              {
                type: 'EmptyStatement',
                start: 2,
                end: 3,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 3
                  }
                }
              },
              {
                type: 'EmptyStatement',
                start: 3,
                end: 4,
                loc: {
                  start: {
                    line: 1,
                    column: 3
                  },
                  end: {
                    line: 1,
                    column: 4
                  }
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `;`,
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
                type: 'EmptyStatement',
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
              }
            ],
            sourceType: 'script'
          }
      });
  });

  // Source: https://github.com/tc39/test262/blob/master/test/language/statements/empty/S12.3_A1.js
  pass(`;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  ;;;;;   ;;;;;;  ;;      ;;  ;;;;;;   ;;;;;;;;  ;;    ;;     ;;;;;
  ;;;;;   ;;      ;;;;  ;;;;  ;;   ;;     ;;      ;;  ;;      ;;;;;
  ;;;;;   ;;;;    ;; ;;;; ;;  ;;;;;;      ;;       ;;;;       ;;;;;
  ;;;;;   ;;      ;;  ;;  ;;  ;;          ;;        ;;        ;;;;;
  ;;;;;   ;;;;;;  ;;      ;;  ;;          ;;        ;;        ;;;;;
  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    ;;;;;   ;;;;;;  ;;      ;;  ;;;;;;   ;;;;;;;;  ;;    ;;     ;;;;;
    ;;;;;   ;;      ;;;;  ;;;;  ;;   ;;     ;;      ;;  ;;      ;;;;;
    ;;;;;   ;;;;    ;; ;;;; ;;  ;;;;;;      ;;       ;;;;       ;;;;;
    ;;;;;   ;;      ;;  ;;  ;;  ;;          ;;        ;;        ;;;;;
    ;;;;;   ;;;;;;  ;;      ;;  ;;          ;;        ;;        ;;;;;
    ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;`,
    expected: {
        type: 'Program',
        start: 0,
        end: 485,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 7,
            column: 69
          }
        },
        body: [
          {
            type: 'EmptyStatement',
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
            type: 'EmptyStatement',
            start: 1,
            end: 2,
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 2
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 2,
            end: 3,
            loc: {
              start: {
                line: 1,
                column: 2
              },
              end: {
                line: 1,
                column: 3
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 3,
            end: 4,
            loc: {
              start: {
                line: 1,
                column: 3
              },
              end: {
                line: 1,
                column: 4
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 4,
            end: 5,
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
            start: 8,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 9
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 9,
            end: 10,
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 10
              }
            }
          },
          {
            type: 'EmptyStatement',
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
          {
            type: 'EmptyStatement',
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
            }
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
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
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
            }
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
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
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
            }
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
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
            start: 23,
            end: 24,
            loc: {
              start: {
                line: 1,
                column: 23
              },
              end: {
                line: 1,
                column: 24
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 24,
            end: 25,
            loc: {
              start: {
                line: 1,
                column: 24
              },
              end: {
                line: 1,
                column: 25
              }
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
          },
          {
            type: 'EmptyStatement',
            start: 26,
            end: 27,
            loc: {
              start: {
                line: 1,
                column: 26
              },
              end: {
                line: 1,
                column: 27
              }
            }
          },
          {
            type: 'EmptyStatement',
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
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
            start: 29,
            end: 30,
            loc: {
              start: {
                line: 1,
                column: 29
              },
              end: {
                line: 1,
                column: 30
              }
            }
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
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
            start: 33,
            end: 34,
            loc: {
              start: {
                line: 1,
                column: 33
              },
              end: {
                line: 1,
                column: 34
              }
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
            start: 36,
            end: 37,
            loc: {
              start: {
                line: 1,
                column: 36
              },
              end: {
                line: 1,
                column: 37
              }
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
            start: 38,
            end: 39,
            loc: {
              start: {
                line: 1,
                column: 38
              },
              end: {
                line: 1,
                column: 39
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 39,
            end: 40,
            loc: {
              start: {
                line: 1,
                column: 39
              },
              end: {
                line: 1,
                column: 40
              }
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
            start: 42,
            end: 43,
            loc: {
              start: {
                line: 1,
                column: 42
              },
              end: {
                line: 1,
                column: 43
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 43,
            end: 44,
            loc: {
              start: {
                line: 1,
                column: 43
              },
              end: {
                line: 1,
                column: 44
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 44,
            end: 45,
            loc: {
              start: {
                line: 1,
                column: 44
              },
              end: {
                line: 1,
                column: 45
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 45,
            end: 46,
            loc: {
              start: {
                line: 1,
                column: 45
              },
              end: {
                line: 1,
                column: 46
              }
            }
          },
          {
            type: 'EmptyStatement',
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
          {
            type: 'EmptyStatement',
            start: 47,
            end: 48,
            loc: {
              start: {
                line: 1,
                column: 47
              },
              end: {
                line: 1,
                column: 48
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 48,
            end: 49,
            loc: {
              start: {
                line: 1,
                column: 48
              },
              end: {
                line: 1,
                column: 49
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 49,
            end: 50,
            loc: {
              start: {
                line: 1,
                column: 49
              },
              end: {
                line: 1,
                column: 50
              }
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
            start: 51,
            end: 52,
            loc: {
              start: {
                line: 1,
                column: 51
              },
              end: {
                line: 1,
                column: 52
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 52,
            end: 53,
            loc: {
              start: {
                line: 1,
                column: 52
              },
              end: {
                line: 1,
                column: 53
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 53,
            end: 54,
            loc: {
              start: {
                line: 1,
                column: 53
              },
              end: {
                line: 1,
                column: 54
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 54,
            end: 55,
            loc: {
              start: {
                line: 1,
                column: 54
              },
              end: {
                line: 1,
                column: 55
              }
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          },
          {
            type: 'EmptyStatement',
            start: 56,
            end: 57,
            loc: {
              start: {
                line: 1,
                column: 56
              },
              end: {
                line: 1,
                column: 57
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 57,
            end: 58,
            loc: {
              start: {
                line: 1,
                column: 57
              },
              end: {
                line: 1,
                column: 58
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 58,
            end: 59,
            loc: {
              start: {
                line: 1,
                column: 58
              },
              end: {
                line: 1,
                column: 59
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 59,
            end: 60,
            loc: {
              start: {
                line: 1,
                column: 59
              },
              end: {
                line: 1,
                column: 60
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 60,
            end: 61,
            loc: {
              start: {
                line: 1,
                column: 60
              },
              end: {
                line: 1,
                column: 61
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 61,
            end: 62,
            loc: {
              start: {
                line: 1,
                column: 61
              },
              end: {
                line: 1,
                column: 62
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 62,
            end: 63,
            loc: {
              start: {
                line: 1,
                column: 62
              },
              end: {
                line: 1,
                column: 63
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 63,
            end: 64,
            loc: {
              start: {
                line: 1,
                column: 63
              },
              end: {
                line: 1,
                column: 64
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 64,
            end: 65,
            loc: {
              start: {
                line: 1,
                column: 64
              },
              end: {
                line: 1,
                column: 65
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 70,
            end: 71,
            loc: {
              start: {
                line: 2,
                column: 4
              },
              end: {
                line: 2,
                column: 5
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 71,
            end: 72,
            loc: {
              start: {
                line: 2,
                column: 5
              },
              end: {
                line: 2,
                column: 6
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 72,
            end: 73,
            loc: {
              start: {
                line: 2,
                column: 6
              },
              end: {
                line: 2,
                column: 7
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 73,
            end: 74,
            loc: {
              start: {
                line: 2,
                column: 7
              },
              end: {
                line: 2,
                column: 8
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 74,
            end: 75,
            loc: {
              start: {
                line: 2,
                column: 8
              },
              end: {
                line: 2,
                column: 9
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 78,
            end: 79,
            loc: {
              start: {
                line: 2,
                column: 12
              },
              end: {
                line: 2,
                column: 13
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 79,
            end: 80,
            loc: {
              start: {
                line: 2,
                column: 13
              },
              end: {
                line: 2,
                column: 14
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 80,
            end: 81,
            loc: {
              start: {
                line: 2,
                column: 14
              },
              end: {
                line: 2,
                column: 15
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 81,
            end: 82,
            loc: {
              start: {
                line: 2,
                column: 15
              },
              end: {
                line: 2,
                column: 16
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 82,
            end: 83,
            loc: {
              start: {
                line: 2,
                column: 16
              },
              end: {
                line: 2,
                column: 17
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 83,
            end: 84,
            loc: {
              start: {
                line: 2,
                column: 17
              },
              end: {
                line: 2,
                column: 18
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 86,
            end: 87,
            loc: {
              start: {
                line: 2,
                column: 20
              },
              end: {
                line: 2,
                column: 21
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 87,
            end: 88,
            loc: {
              start: {
                line: 2,
                column: 21
              },
              end: {
                line: 2,
                column: 22
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 94,
            end: 95,
            loc: {
              start: {
                line: 2,
                column: 28
              },
              end: {
                line: 2,
                column: 29
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 95,
            end: 96,
            loc: {
              start: {
                line: 2,
                column: 29
              },
              end: {
                line: 2,
                column: 30
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 98,
            end: 99,
            loc: {
              start: {
                line: 2,
                column: 32
              },
              end: {
                line: 2,
                column: 33
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 99,
            end: 100,
            loc: {
              start: {
                line: 2,
                column: 33
              },
              end: {
                line: 2,
                column: 34
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 100,
            end: 101,
            loc: {
              start: {
                line: 2,
                column: 34
              },
              end: {
                line: 2,
                column: 35
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 101,
            end: 102,
            loc: {
              start: {
                line: 2,
                column: 35
              },
              end: {
                line: 2,
                column: 36
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 102,
            end: 103,
            loc: {
              start: {
                line: 2,
                column: 36
              },
              end: {
                line: 2,
                column: 37
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 103,
            end: 104,
            loc: {
              start: {
                line: 2,
                column: 37
              },
              end: {
                line: 2,
                column: 38
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 107,
            end: 108,
            loc: {
              start: {
                line: 2,
                column: 41
              },
              end: {
                line: 2,
                column: 42
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 108,
            end: 109,
            loc: {
              start: {
                line: 2,
                column: 42
              },
              end: {
                line: 2,
                column: 43
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 109,
            end: 110,
            loc: {
              start: {
                line: 2,
                column: 43
              },
              end: {
                line: 2,
                column: 44
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 110,
            end: 111,
            loc: {
              start: {
                line: 2,
                column: 44
              },
              end: {
                line: 2,
                column: 45
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 111,
            end: 112,
            loc: {
              start: {
                line: 2,
                column: 45
              },
              end: {
                line: 2,
                column: 46
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 112,
            end: 113,
            loc: {
              start: {
                line: 2,
                column: 46
              },
              end: {
                line: 2,
                column: 47
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 113,
            end: 114,
            loc: {
              start: {
                line: 2,
                column: 47
              },
              end: {
                line: 2,
                column: 48
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 114,
            end: 115,
            loc: {
              start: {
                line: 2,
                column: 48
              },
              end: {
                line: 2,
                column: 49
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 117,
            end: 118,
            loc: {
              start: {
                line: 2,
                column: 51
              },
              end: {
                line: 2,
                column: 52
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 118,
            end: 119,
            loc: {
              start: {
                line: 2,
                column: 52
              },
              end: {
                line: 2,
                column: 53
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 123,
            end: 124,
            loc: {
              start: {
                line: 2,
                column: 57
              },
              end: {
                line: 2,
                column: 58
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 124,
            end: 125,
            loc: {
              start: {
                line: 2,
                column: 58
              },
              end: {
                line: 2,
                column: 59
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 130,
            end: 131,
            loc: {
              start: {
                line: 2,
                column: 64
              },
              end: {
                line: 2,
                column: 65
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 131,
            end: 132,
            loc: {
              start: {
                line: 2,
                column: 65
              },
              end: {
                line: 2,
                column: 66
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 132,
            end: 133,
            loc: {
              start: {
                line: 2,
                column: 66
              },
              end: {
                line: 2,
                column: 67
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 133,
            end: 134,
            loc: {
              start: {
                line: 2,
                column: 67
              },
              end: {
                line: 2,
                column: 68
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 134,
            end: 135,
            loc: {
              start: {
                line: 2,
                column: 68
              },
              end: {
                line: 2,
                column: 69
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 140,
            end: 141,
            loc: {
              start: {
                line: 3,
                column: 4
              },
              end: {
                line: 3,
                column: 5
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 141,
            end: 142,
            loc: {
              start: {
                line: 3,
                column: 5
              },
              end: {
                line: 3,
                column: 6
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 142,
            end: 143,
            loc: {
              start: {
                line: 3,
                column: 6
              },
              end: {
                line: 3,
                column: 7
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 143,
            end: 144,
            loc: {
              start: {
                line: 3,
                column: 7
              },
              end: {
                line: 3,
                column: 8
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 144,
            end: 145,
            loc: {
              start: {
                line: 3,
                column: 8
              },
              end: {
                line: 3,
                column: 9
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 148,
            end: 149,
            loc: {
              start: {
                line: 3,
                column: 12
              },
              end: {
                line: 3,
                column: 13
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 149,
            end: 150,
            loc: {
              start: {
                line: 3,
                column: 13
              },
              end: {
                line: 3,
                column: 14
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 156,
            end: 157,
            loc: {
              start: {
                line: 3,
                column: 20
              },
              end: {
                line: 3,
                column: 21
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 157,
            end: 158,
            loc: {
              start: {
                line: 3,
                column: 21
              },
              end: {
                line: 3,
                column: 22
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 158,
            end: 159,
            loc: {
              start: {
                line: 3,
                column: 22
              },
              end: {
                line: 3,
                column: 23
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 159,
            end: 160,
            loc: {
              start: {
                line: 3,
                column: 23
              },
              end: {
                line: 3,
                column: 24
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 162,
            end: 163,
            loc: {
              start: {
                line: 3,
                column: 26
              },
              end: {
                line: 3,
                column: 27
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 163,
            end: 164,
            loc: {
              start: {
                line: 3,
                column: 27
              },
              end: {
                line: 3,
                column: 28
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 164,
            end: 165,
            loc: {
              start: {
                line: 3,
                column: 28
              },
              end: {
                line: 3,
                column: 29
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 165,
            end: 166,
            loc: {
              start: {
                line: 3,
                column: 29
              },
              end: {
                line: 3,
                column: 30
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 168,
            end: 169,
            loc: {
              start: {
                line: 3,
                column: 32
              },
              end: {
                line: 3,
                column: 33
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 169,
            end: 170,
            loc: {
              start: {
                line: 3,
                column: 33
              },
              end: {
                line: 3,
                column: 34
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 173,
            end: 174,
            loc: {
              start: {
                line: 3,
                column: 37
              },
              end: {
                line: 3,
                column: 38
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 174,
            end: 175,
            loc: {
              start: {
                line: 3,
                column: 38
              },
              end: {
                line: 3,
                column: 39
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 180,
            end: 181,
            loc: {
              start: {
                line: 3,
                column: 44
              },
              end: {
                line: 3,
                column: 45
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 181,
            end: 182,
            loc: {
              start: {
                line: 3,
                column: 45
              },
              end: {
                line: 3,
                column: 46
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 188,
            end: 189,
            loc: {
              start: {
                line: 3,
                column: 52
              },
              end: {
                line: 3,
                column: 53
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 189,
            end: 190,
            loc: {
              start: {
                line: 3,
                column: 53
              },
              end: {
                line: 3,
                column: 54
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 192,
            end: 193,
            loc: {
              start: {
                line: 3,
                column: 56
              },
              end: {
                line: 3,
                column: 57
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 193,
            end: 194,
            loc: {
              start: {
                line: 3,
                column: 57
              },
              end: {
                line: 3,
                column: 58
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 200,
            end: 201,
            loc: {
              start: {
                line: 3,
                column: 64
              },
              end: {
                line: 3,
                column: 65
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 201,
            end: 202,
            loc: {
              start: {
                line: 3,
                column: 65
              },
              end: {
                line: 3,
                column: 66
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 202,
            end: 203,
            loc: {
              start: {
                line: 3,
                column: 66
              },
              end: {
                line: 3,
                column: 67
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 203,
            end: 204,
            loc: {
              start: {
                line: 3,
                column: 67
              },
              end: {
                line: 3,
                column: 68
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 204,
            end: 205,
            loc: {
              start: {
                line: 3,
                column: 68
              },
              end: {
                line: 3,
                column: 69
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 210,
            end: 211,
            loc: {
              start: {
                line: 4,
                column: 4
              },
              end: {
                line: 4,
                column: 5
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 211,
            end: 212,
            loc: {
              start: {
                line: 4,
                column: 5
              },
              end: {
                line: 4,
                column: 6
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 212,
            end: 213,
            loc: {
              start: {
                line: 4,
                column: 6
              },
              end: {
                line: 4,
                column: 7
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 213,
            end: 214,
            loc: {
              start: {
                line: 4,
                column: 7
              },
              end: {
                line: 4,
                column: 8
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 214,
            end: 215,
            loc: {
              start: {
                line: 4,
                column: 8
              },
              end: {
                line: 4,
                column: 9
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 218,
            end: 219,
            loc: {
              start: {
                line: 4,
                column: 12
              },
              end: {
                line: 4,
                column: 13
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 219,
            end: 220,
            loc: {
              start: {
                line: 4,
                column: 13
              },
              end: {
                line: 4,
                column: 14
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 220,
            end: 221,
            loc: {
              start: {
                line: 4,
                column: 14
              },
              end: {
                line: 4,
                column: 15
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 221,
            end: 222,
            loc: {
              start: {
                line: 4,
                column: 15
              },
              end: {
                line: 4,
                column: 16
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 226,
            end: 227,
            loc: {
              start: {
                line: 4,
                column: 20
              },
              end: {
                line: 4,
                column: 21
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 227,
            end: 228,
            loc: {
              start: {
                line: 4,
                column: 21
              },
              end: {
                line: 4,
                column: 22
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 229,
            end: 230,
            loc: {
              start: {
                line: 4,
                column: 23
              },
              end: {
                line: 4,
                column: 24
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 230,
            end: 231,
            loc: {
              start: {
                line: 4,
                column: 24
              },
              end: {
                line: 4,
                column: 25
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 231,
            end: 232,
            loc: {
              start: {
                line: 4,
                column: 25
              },
              end: {
                line: 4,
                column: 26
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 232,
            end: 233,
            loc: {
              start: {
                line: 4,
                column: 26
              },
              end: {
                line: 4,
                column: 27
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 234,
            end: 235,
            loc: {
              start: {
                line: 4,
                column: 28
              },
              end: {
                line: 4,
                column: 29
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 235,
            end: 236,
            loc: {
              start: {
                line: 4,
                column: 29
              },
              end: {
                line: 4,
                column: 30
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 238,
            end: 239,
            loc: {
              start: {
                line: 4,
                column: 32
              },
              end: {
                line: 4,
                column: 33
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 239,
            end: 240,
            loc: {
              start: {
                line: 4,
                column: 33
              },
              end: {
                line: 4,
                column: 34
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 240,
            end: 241,
            loc: {
              start: {
                line: 4,
                column: 34
              },
              end: {
                line: 4,
                column: 35
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 241,
            end: 242,
            loc: {
              start: {
                line: 4,
                column: 35
              },
              end: {
                line: 4,
                column: 36
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 242,
            end: 243,
            loc: {
              start: {
                line: 4,
                column: 36
              },
              end: {
                line: 4,
                column: 37
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 243,
            end: 244,
            loc: {
              start: {
                line: 4,
                column: 37
              },
              end: {
                line: 4,
                column: 38
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 250,
            end: 251,
            loc: {
              start: {
                line: 4,
                column: 44
              },
              end: {
                line: 4,
                column: 45
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 251,
            end: 252,
            loc: {
              start: {
                line: 4,
                column: 45
              },
              end: {
                line: 4,
                column: 46
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 259,
            end: 260,
            loc: {
              start: {
                line: 4,
                column: 53
              },
              end: {
                line: 4,
                column: 54
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 260,
            end: 261,
            loc: {
              start: {
                line: 4,
                column: 54
              },
              end: {
                line: 4,
                column: 55
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 261,
            end: 262,
            loc: {
              start: {
                line: 4,
                column: 55
              },
              end: {
                line: 4,
                column: 56
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 262,
            end: 263,
            loc: {
              start: {
                line: 4,
                column: 56
              },
              end: {
                line: 4,
                column: 57
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 270,
            end: 271,
            loc: {
              start: {
                line: 4,
                column: 64
              },
              end: {
                line: 4,
                column: 65
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 271,
            end: 272,
            loc: {
              start: {
                line: 4,
                column: 65
              },
              end: {
                line: 4,
                column: 66
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 272,
            end: 273,
            loc: {
              start: {
                line: 4,
                column: 66
              },
              end: {
                line: 4,
                column: 67
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 273,
            end: 274,
            loc: {
              start: {
                line: 4,
                column: 67
              },
              end: {
                line: 4,
                column: 68
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 274,
            end: 275,
            loc: {
              start: {
                line: 4,
                column: 68
              },
              end: {
                line: 4,
                column: 69
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 280,
            end: 281,
            loc: {
              start: {
                line: 5,
                column: 4
              },
              end: {
                line: 5,
                column: 5
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 281,
            end: 282,
            loc: {
              start: {
                line: 5,
                column: 5
              },
              end: {
                line: 5,
                column: 6
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 282,
            end: 283,
            loc: {
              start: {
                line: 5,
                column: 6
              },
              end: {
                line: 5,
                column: 7
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 283,
            end: 284,
            loc: {
              start: {
                line: 5,
                column: 7
              },
              end: {
                line: 5,
                column: 8
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 284,
            end: 285,
            loc: {
              start: {
                line: 5,
                column: 8
              },
              end: {
                line: 5,
                column: 9
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 288,
            end: 289,
            loc: {
              start: {
                line: 5,
                column: 12
              },
              end: {
                line: 5,
                column: 13
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 289,
            end: 290,
            loc: {
              start: {
                line: 5,
                column: 13
              },
              end: {
                line: 5,
                column: 14
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 296,
            end: 297,
            loc: {
              start: {
                line: 5,
                column: 20
              },
              end: {
                line: 5,
                column: 21
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 297,
            end: 298,
            loc: {
              start: {
                line: 5,
                column: 21
              },
              end: {
                line: 5,
                column: 22
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 300,
            end: 301,
            loc: {
              start: {
                line: 5,
                column: 24
              },
              end: {
                line: 5,
                column: 25
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 301,
            end: 302,
            loc: {
              start: {
                line: 5,
                column: 25
              },
              end: {
                line: 5,
                column: 26
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 304,
            end: 305,
            loc: {
              start: {
                line: 5,
                column: 28
              },
              end: {
                line: 5,
                column: 29
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 305,
            end: 306,
            loc: {
              start: {
                line: 5,
                column: 29
              },
              end: {
                line: 5,
                column: 30
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 308,
            end: 309,
            loc: {
              start: {
                line: 5,
                column: 32
              },
              end: {
                line: 5,
                column: 33
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 309,
            end: 310,
            loc: {
              start: {
                line: 5,
                column: 33
              },
              end: {
                line: 5,
                column: 34
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 320,
            end: 321,
            loc: {
              start: {
                line: 5,
                column: 44
              },
              end: {
                line: 5,
                column: 45
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 321,
            end: 322,
            loc: {
              start: {
                line: 5,
                column: 45
              },
              end: {
                line: 5,
                column: 46
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 330,
            end: 331,
            loc: {
              start: {
                line: 5,
                column: 54
              },
              end: {
                line: 5,
                column: 55
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 331,
            end: 332,
            loc: {
              start: {
                line: 5,
                column: 55
              },
              end: {
                line: 5,
                column: 56
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 340,
            end: 341,
            loc: {
              start: {
                line: 5,
                column: 64
              },
              end: {
                line: 5,
                column: 65
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 341,
            end: 342,
            loc: {
              start: {
                line: 5,
                column: 65
              },
              end: {
                line: 5,
                column: 66
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 342,
            end: 343,
            loc: {
              start: {
                line: 5,
                column: 66
              },
              end: {
                line: 5,
                column: 67
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 343,
            end: 344,
            loc: {
              start: {
                line: 5,
                column: 67
              },
              end: {
                line: 5,
                column: 68
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 344,
            end: 345,
            loc: {
              start: {
                line: 5,
                column: 68
              },
              end: {
                line: 5,
                column: 69
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 350,
            end: 351,
            loc: {
              start: {
                line: 6,
                column: 4
              },
              end: {
                line: 6,
                column: 5
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 351,
            end: 352,
            loc: {
              start: {
                line: 6,
                column: 5
              },
              end: {
                line: 6,
                column: 6
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 352,
            end: 353,
            loc: {
              start: {
                line: 6,
                column: 6
              },
              end: {
                line: 6,
                column: 7
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 353,
            end: 354,
            loc: {
              start: {
                line: 6,
                column: 7
              },
              end: {
                line: 6,
                column: 8
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 354,
            end: 355,
            loc: {
              start: {
                line: 6,
                column: 8
              },
              end: {
                line: 6,
                column: 9
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 358,
            end: 359,
            loc: {
              start: {
                line: 6,
                column: 12
              },
              end: {
                line: 6,
                column: 13
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 359,
            end: 360,
            loc: {
              start: {
                line: 6,
                column: 13
              },
              end: {
                line: 6,
                column: 14
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 360,
            end: 361,
            loc: {
              start: {
                line: 6,
                column: 14
              },
              end: {
                line: 6,
                column: 15
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 361,
            end: 362,
            loc: {
              start: {
                line: 6,
                column: 15
              },
              end: {
                line: 6,
                column: 16
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 362,
            end: 363,
            loc: {
              start: {
                line: 6,
                column: 16
              },
              end: {
                line: 6,
                column: 17
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 363,
            end: 364,
            loc: {
              start: {
                line: 6,
                column: 17
              },
              end: {
                line: 6,
                column: 18
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 366,
            end: 367,
            loc: {
              start: {
                line: 6,
                column: 20
              },
              end: {
                line: 6,
                column: 21
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 367,
            end: 368,
            loc: {
              start: {
                line: 6,
                column: 21
              },
              end: {
                line: 6,
                column: 22
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 374,
            end: 375,
            loc: {
              start: {
                line: 6,
                column: 28
              },
              end: {
                line: 6,
                column: 29
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 375,
            end: 376,
            loc: {
              start: {
                line: 6,
                column: 29
              },
              end: {
                line: 6,
                column: 30
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 378,
            end: 379,
            loc: {
              start: {
                line: 6,
                column: 32
              },
              end: {
                line: 6,
                column: 33
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 379,
            end: 380,
            loc: {
              start: {
                line: 6,
                column: 33
              },
              end: {
                line: 6,
                column: 34
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 390,
            end: 391,
            loc: {
              start: {
                line: 6,
                column: 44
              },
              end: {
                line: 6,
                column: 45
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 391,
            end: 392,
            loc: {
              start: {
                line: 6,
                column: 45
              },
              end: {
                line: 6,
                column: 46
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 400,
            end: 401,
            loc: {
              start: {
                line: 6,
                column: 54
              },
              end: {
                line: 6,
                column: 55
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 401,
            end: 402,
            loc: {
              start: {
                line: 6,
                column: 55
              },
              end: {
                line: 6,
                column: 56
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 410,
            end: 411,
            loc: {
              start: {
                line: 6,
                column: 64
              },
              end: {
                line: 6,
                column: 65
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 411,
            end: 412,
            loc: {
              start: {
                line: 6,
                column: 65
              },
              end: {
                line: 6,
                column: 66
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 412,
            end: 413,
            loc: {
              start: {
                line: 6,
                column: 66
              },
              end: {
                line: 6,
                column: 67
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 413,
            end: 414,
            loc: {
              start: {
                line: 6,
                column: 67
              },
              end: {
                line: 6,
                column: 68
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 414,
            end: 415,
            loc: {
              start: {
                line: 6,
                column: 68
              },
              end: {
                line: 6,
                column: 69
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 420,
            end: 421,
            loc: {
              start: {
                line: 7,
                column: 4
              },
              end: {
                line: 7,
                column: 5
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 421,
            end: 422,
            loc: {
              start: {
                line: 7,
                column: 5
              },
              end: {
                line: 7,
                column: 6
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 422,
            end: 423,
            loc: {
              start: {
                line: 7,
                column: 6
              },
              end: {
                line: 7,
                column: 7
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 423,
            end: 424,
            loc: {
              start: {
                line: 7,
                column: 7
              },
              end: {
                line: 7,
                column: 8
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 424,
            end: 425,
            loc: {
              start: {
                line: 7,
                column: 8
              },
              end: {
                line: 7,
                column: 9
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 425,
            end: 426,
            loc: {
              start: {
                line: 7,
                column: 9
              },
              end: {
                line: 7,
                column: 10
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 426,
            end: 427,
            loc: {
              start: {
                line: 7,
                column: 10
              },
              end: {
                line: 7,
                column: 11
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 427,
            end: 428,
            loc: {
              start: {
                line: 7,
                column: 11
              },
              end: {
                line: 7,
                column: 12
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 428,
            end: 429,
            loc: {
              start: {
                line: 7,
                column: 12
              },
              end: {
                line: 7,
                column: 13
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 429,
            end: 430,
            loc: {
              start: {
                line: 7,
                column: 13
              },
              end: {
                line: 7,
                column: 14
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 430,
            end: 431,
            loc: {
              start: {
                line: 7,
                column: 14
              },
              end: {
                line: 7,
                column: 15
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 431,
            end: 432,
            loc: {
              start: {
                line: 7,
                column: 15
              },
              end: {
                line: 7,
                column: 16
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 432,
            end: 433,
            loc: {
              start: {
                line: 7,
                column: 16
              },
              end: {
                line: 7,
                column: 17
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 433,
            end: 434,
            loc: {
              start: {
                line: 7,
                column: 17
              },
              end: {
                line: 7,
                column: 18
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 434,
            end: 435,
            loc: {
              start: {
                line: 7,
                column: 18
              },
              end: {
                line: 7,
                column: 19
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 435,
            end: 436,
            loc: {
              start: {
                line: 7,
                column: 19
              },
              end: {
                line: 7,
                column: 20
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 436,
            end: 437,
            loc: {
              start: {
                line: 7,
                column: 20
              },
              end: {
                line: 7,
                column: 21
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 437,
            end: 438,
            loc: {
              start: {
                line: 7,
                column: 21
              },
              end: {
                line: 7,
                column: 22
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 438,
            end: 439,
            loc: {
              start: {
                line: 7,
                column: 22
              },
              end: {
                line: 7,
                column: 23
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 439,
            end: 440,
            loc: {
              start: {
                line: 7,
                column: 23
              },
              end: {
                line: 7,
                column: 24
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 440,
            end: 441,
            loc: {
              start: {
                line: 7,
                column: 24
              },
              end: {
                line: 7,
                column: 25
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 441,
            end: 442,
            loc: {
              start: {
                line: 7,
                column: 25
              },
              end: {
                line: 7,
                column: 26
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 442,
            end: 443,
            loc: {
              start: {
                line: 7,
                column: 26
              },
              end: {
                line: 7,
                column: 27
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 443,
            end: 444,
            loc: {
              start: {
                line: 7,
                column: 27
              },
              end: {
                line: 7,
                column: 28
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 444,
            end: 445,
            loc: {
              start: {
                line: 7,
                column: 28
              },
              end: {
                line: 7,
                column: 29
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 445,
            end: 446,
            loc: {
              start: {
                line: 7,
                column: 29
              },
              end: {
                line: 7,
                column: 30
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 446,
            end: 447,
            loc: {
              start: {
                line: 7,
                column: 30
              },
              end: {
                line: 7,
                column: 31
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 447,
            end: 448,
            loc: {
              start: {
                line: 7,
                column: 31
              },
              end: {
                line: 7,
                column: 32
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 448,
            end: 449,
            loc: {
              start: {
                line: 7,
                column: 32
              },
              end: {
                line: 7,
                column: 33
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 449,
            end: 450,
            loc: {
              start: {
                line: 7,
                column: 33
              },
              end: {
                line: 7,
                column: 34
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 450,
            end: 451,
            loc: {
              start: {
                line: 7,
                column: 34
              },
              end: {
                line: 7,
                column: 35
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 451,
            end: 452,
            loc: {
              start: {
                line: 7,
                column: 35
              },
              end: {
                line: 7,
                column: 36
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 452,
            end: 453,
            loc: {
              start: {
                line: 7,
                column: 36
              },
              end: {
                line: 7,
                column: 37
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 453,
            end: 454,
            loc: {
              start: {
                line: 7,
                column: 37
              },
              end: {
                line: 7,
                column: 38
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 454,
            end: 455,
            loc: {
              start: {
                line: 7,
                column: 38
              },
              end: {
                line: 7,
                column: 39
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 455,
            end: 456,
            loc: {
              start: {
                line: 7,
                column: 39
              },
              end: {
                line: 7,
                column: 40
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 456,
            end: 457,
            loc: {
              start: {
                line: 7,
                column: 40
              },
              end: {
                line: 7,
                column: 41
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 457,
            end: 458,
            loc: {
              start: {
                line: 7,
                column: 41
              },
              end: {
                line: 7,
                column: 42
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 458,
            end: 459,
            loc: {
              start: {
                line: 7,
                column: 42
              },
              end: {
                line: 7,
                column: 43
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 459,
            end: 460,
            loc: {
              start: {
                line: 7,
                column: 43
              },
              end: {
                line: 7,
                column: 44
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 460,
            end: 461,
            loc: {
              start: {
                line: 7,
                column: 44
              },
              end: {
                line: 7,
                column: 45
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 461,
            end: 462,
            loc: {
              start: {
                line: 7,
                column: 45
              },
              end: {
                line: 7,
                column: 46
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 462,
            end: 463,
            loc: {
              start: {
                line: 7,
                column: 46
              },
              end: {
                line: 7,
                column: 47
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 463,
            end: 464,
            loc: {
              start: {
                line: 7,
                column: 47
              },
              end: {
                line: 7,
                column: 48
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 464,
            end: 465,
            loc: {
              start: {
                line: 7,
                column: 48
              },
              end: {
                line: 7,
                column: 49
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 465,
            end: 466,
            loc: {
              start: {
                line: 7,
                column: 49
              },
              end: {
                line: 7,
                column: 50
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 466,
            end: 467,
            loc: {
              start: {
                line: 7,
                column: 50
              },
              end: {
                line: 7,
                column: 51
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 467,
            end: 468,
            loc: {
              start: {
                line: 7,
                column: 51
              },
              end: {
                line: 7,
                column: 52
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 468,
            end: 469,
            loc: {
              start: {
                line: 7,
                column: 52
              },
              end: {
                line: 7,
                column: 53
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 469,
            end: 470,
            loc: {
              start: {
                line: 7,
                column: 53
              },
              end: {
                line: 7,
                column: 54
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 470,
            end: 471,
            loc: {
              start: {
                line: 7,
                column: 54
              },
              end: {
                line: 7,
                column: 55
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 471,
            end: 472,
            loc: {
              start: {
                line: 7,
                column: 55
              },
              end: {
                line: 7,
                column: 56
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 472,
            end: 473,
            loc: {
              start: {
                line: 7,
                column: 56
              },
              end: {
                line: 7,
                column: 57
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 473,
            end: 474,
            loc: {
              start: {
                line: 7,
                column: 57
              },
              end: {
                line: 7,
                column: 58
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 474,
            end: 475,
            loc: {
              start: {
                line: 7,
                column: 58
              },
              end: {
                line: 7,
                column: 59
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 475,
            end: 476,
            loc: {
              start: {
                line: 7,
                column: 59
              },
              end: {
                line: 7,
                column: 60
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 476,
            end: 477,
            loc: {
              start: {
                line: 7,
                column: 60
              },
              end: {
                line: 7,
                column: 61
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 477,
            end: 478,
            loc: {
              start: {
                line: 7,
                column: 61
              },
              end: {
                line: 7,
                column: 62
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 478,
            end: 479,
            loc: {
              start: {
                line: 7,
                column: 62
              },
              end: {
                line: 7,
                column: 63
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 479,
            end: 480,
            loc: {
              start: {
                line: 7,
                column: 63
              },
              end: {
                line: 7,
                column: 64
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 480,
            end: 481,
            loc: {
              start: {
                line: 7,
                column: 64
              },
              end: {
                line: 7,
                column: 65
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 481,
            end: 482,
            loc: {
              start: {
                line: 7,
                column: 65
              },
              end: {
                line: 7,
                column: 66
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 482,
            end: 483,
            loc: {
              start: {
                line: 7,
                column: 66
              },
              end: {
                line: 7,
                column: 67
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 483,
            end: 484,
            loc: {
              start: {
                line: 7,
                column: 67
              },
              end: {
                line: 7,
                column: 68
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 484,
            end: 485,
            loc: {
              start: {
                line: 7,
                column: 68
              },
              end: {
                line: 7,
                column: 69
              }
            }
          }
        ],
        sourceType: 'script'
      }
  });
});
