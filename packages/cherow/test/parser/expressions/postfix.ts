import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Expressions - Postfix', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        fail('[x]--', Context.Empty, {
            source: '[x]--',
        });

        fail('this--', Context.Empty, {
            source: 'this--',
        });

        // Esprima issue: https://github.com/jquery/esprima/issues/1912
        fail('function f() { (new.target)--; }', Context.Empty, {
            source: 'function f() { (new.target)--; }',
        });
    });

    describe('Pass', () => {

        pass('x--', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x--',
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
                body: [{
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
                        type: 'UpdateExpression',
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
                        operator: '--',
                        prefix: false,
                        argument: {
                            type: 'Identifier',
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
                            name: 'x'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('eval++', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'eval++',
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
                    expression: {
                        type: 'UpdateExpression',
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
                        operator: '++',
                        prefix: false,
                        argument: {
                            type: 'Identifier',
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
                            name: 'eval'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x++', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x++',
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
                body: [{
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
                        type: 'UpdateExpression',
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
                        operator: '++',
                        prefix: false,
                        argument: {
                            type: 'Identifier',
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
                            name: 'x'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });
    });
});
