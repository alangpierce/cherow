import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

// Note: There exist other tests covering the cases not tested here
describe('Destructuring - Binding', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [
            '({e: a.b}) => 0',
            'function a({e: a.b}) {}',
            'function* a({e: a.b}) {}',
            '(function ({e: a.b}) {})',
            '(function* ({e: a.b}) {})',
            '(function* ([a.b]) {})',
            '({a([a.b]){}})',
            '({*a([a.b]){}})',
            '({set a([a.b]){}})',
            'function a([a.b]) {}',
            '([a.b]) => 0',
            '({a({e: a.b}){}})',
            '({*a({e: a.b}){}})',
            '({set a({e: a.b}){}})',
            '({a:for} = 0)',
            '({a = 0});',
            '({a} += 0);',
            '({a,,} = 0)',
            '({,a,} = 0)',
            '({a,,a} = 0)',
            '({function} = 0)',
            '({a:function} = 0)',
            '({a:for} = 0)',
            '({\'a\'} = 0)',
            '({var} = 0)',
            '({a.b} = 0)',
            '{a = [...b, c]} = 0',
            '[a, ...b, {c=0}]',
            '({0} = 0)',
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

        fail('var { this };', Context.Empty, {
            source: 'var { this };',
        });

        fail('let [...a,] = 0', Context.Empty, {
            source: 'let [...a,] = 0',
        });

        fail('([a.b]) => 0', Context.Empty, {
            source: '([a.b]) => 0',
        });

        fail('function a([a.b]) {}', Context.Empty, {
            source: 'function a([a.b]) {}',
        });

        fail('(function ([a.b]) {})', Context.Empty, {
            source: '(function ([a.b]) {})',
        });

        fail('({a}) = 1;', Context.Empty, {
            source: '({a}) = 1;',
        });

        fail('({a([a.b]){}})', Context.Empty, {
            source: '({a([a.b]){}})',
        });

        fail('({*a([a.b]){}})', Context.Empty, {
            source: '({*a([a.b]){}})',
        });

        fail('({set a([a.b]){}})', Context.Empty, {
            source: '({set a([a.b]){}})',
        });

        fail('let [...{x} = {}] = [{}];', Context.Empty, {
            source: 'let [...{x} = {}] = [{}];',
        });

        fail('({foo() {}} = {});', Context.Empty, {
            source: '({foo() {}} = {});',
        });

        fail('let {get foo() {}} = {};', Context.Empty, {
            source: 'let {get foo() {}} = {};',
        });

        fail('let [...{x} = {}] = [{}];', Context.Empty, {
            source: 'let [...{x} = {}] = [{}];',
        });

        fail('function foo() {for (let {x} = {} of []) {}; }; foo();', Context.Empty, {
            source: 'function foo() {for (let {x} = {} of []) {}; }; foo();',
        });

        fail('for (let {x} = {} of []) {}', Context.Empty, {
            source: 'for (let {x} = {} of []) {}',
        });

        fail('var a = 1; ({x, y = 1, z = 2} = {a = 2});', Context.Empty, {
            source: 'var a = 1; ({x, y = 1, z = 2} = {a = 2});',
        });

        fail('let x; ([...{x} = {}] = [{}]);', Context.Empty, {
            source: 'let x; ([...{x} = {}] = [{}]);',
        });

        fail('let a; ([...[a] = []] = [[]]);', Context.Empty, {
            source: 'let a; ([...[a] = []] = [[]]);',
        });

    });
    describe('Pass', () => {

        const validSyntax = [
            '({x} = 0)',
            '({x,} = 0)',
            '({x,y} = 0)',
            '({x,y,} = 0)',
            '({[a]: a} = 1)',
            '({x = 0} = 1)',
            '({x = 0,} = 1)',
            '({x: y} = 0)',
            '({x: y,} = 0)',
            '({var: x} = 0)',
            '({"x": y} = 0)',
            '({\'x\': y} = 0)',
            '({0: y} = 0)',
            '({0: x, 1: x} = 0)',
            '({x: y = 0} = 1)',
            '({x: y = z = 0} = 1)',
            '({x: [y] = 0} = 1)',
            '({a:let} = 0);',
            '({let} = 0);',
            '({a:yield} = 0);',
            '({yield} = 0);',
            '({yield = 0} = 0);',
            'try {} catch ({e = 0}) {}',
            'try {} catch ({e}) {}',
            'var {let, yield} = 0;',
            'var a, {x: {y: a}} = 0;',
            '(function*() { [...{ x = yield }] = 0; })',
            'var {a, x: {y: a}} = 0;',
            'var {a} = 0;',
            'var [{x, y}, [a, b]] = f();',
            'let [{x, y}, [a, b]] = f();',
            'let a = [{x:1, y:-1}, {x:2,y:-2}, {x:3,y:-3}];',
            'var o = { __proto__:null, \'a1\':1, \'b2\':2 };',
            'var a = [{x:1, y:-1}, {x:2,y:-2}, {x:3,y:-3}];',
            'var o = { __proto__:null, \'a1\':1, \'b2\':2 };',
            'var g34 = ({x = function() { return a }}, ...a) => { return x()[0] };',
            'var { x : x0 = 0, y : { z : z1 = 1}, x : x1 = 0} = o;',
            'var { x : x, y : y = 2 } = { x : 1 };',
            'for (var {z} = { z : 3 }; z != 0; z--) {}',
            'try {} catch ([e, ...a]) {}',
            'var [a, a] = 0;',
            'var [[a]]=0;',
            'var [a]=[1];',
            'let [...[a]] = [[]];',
            'let a; [...[a]] = [[]];',
            'let a; [...{a}] = [{}];',
            'let a; [...[a = 1]] = [[]];',
            'let [...[a]] = [[]];',
            'let a; [...{a:a = 1}] = [{}];',
            'var {a:a, a:a} = {};',
            'let a; ({a:a, a:a} = {});',
            'let a; ({a:((((a1))))} = {a:20})',
            'var a; [a = class aClass {}] = []',
            'var a; for ({x:x = class aClass {}} of []) {}',
            'var {x:[...y]} = {x:[1]}',
            '({a: [b = 1, c = 2][1]} = {a:[]});',
            '({a: [b = 1, c = 2].b} = {a:[]});',
            'var a; `${({a} = {})}`',
            'let a, r1; ({a:a1 = r1 = 44} = {})',
            'var a = 1; ({x = {a = 1} = {}} = {});',
            ' let {1:x1, 0:y1} = [11, 22];',
            'let [i,j] = [0,0];',
            'let [...[,...[[x2]]]] = [[1, 2], [3, 4], 5];',
            'for (let {x, y} = {x:10, y:20}; x<y; {x:x} = {x:x+2}) {}',
            'let {0:x2} = {\'0\':33};',
            '({x, y = 1, z = 2} = {});',
            'var [,a] = 0;',
            'var [{x : [{y:{z = 1}, z1 = 2}] }, {x2 = 3}, {x3 : {y3:[{z3 = 4}]}} ] = [{x:[{y:{}}]}, {}, {x3:{y3:[{}]}}];',
            'var { x : x, y : y, get, set } = { x : 1, y : 2, get: 3, set: 4 };',
            'var z = {x:x1} = {y:y1} = {x:10, y:20};',
            '[[...x] = [2, 1, 3]]',
            '[arrow = () => {}]',
            '[{ x, y, z } = { x: 44, y: 55, z: 66 }]',
            '[{ x: 11, y: 22, z: 33 }]',
            '[...[]]',
            'f = ([x]) => {}',
            'function fn2([{} = 42]) {}',
            'function fn3([a, {b: c}]) {}',
            'function fn4([a, {b: []}]) {}',
            'function fn1([a, b]) {}',
            'function fn2([a, b,]) {}',
            'function fn3([a,, b,]) {}',
            'function fn1([,]) {}',
            'function fn2([,,]) {}',
            'function fn1([...args]) {}',
            'function fn2([,,,,,,,...args]) {}',
            'function fn3([x, {y}, ...z]) {}',
            'function fn4([,x, {y}, , ...z]) {}',
            'function fn5({x: [...y]}) {}',
            'function fna({x: y}) {}',
            'function fnb({x: y = 42}) {}',
            'function fnc({x: {}}) {}',
            'function fnd({x: {y}}) {}',
            'function fne({x: {} = 42}) {}',
            'function fnf({x: {y} = 42}) {}',
            'function fn1({x,}) {}',
            'function fn2({a: {p: q, }, }) {}',
            'function fn3({x,}) {}',
            'function fna({x}) {}',
            'function fnb({x, y}) {}',
            'function fnc({x = 42}) {}',
            'function fnd({x, y = 42}) {} ',
            'function fn1({a: {p: q}, b: {r}, c: {s = 0}, d: {}}) {}',
            'function fn2(x, {a: r, b: s, c: t}, y) {}',
            'function fn3({x: {y: {z: {} = 42}}}) {}',
            'function fn1([{}]) {}',
            'function fn2([{a: [{}]}]) {}',
            'function fn3({a: [,,,] = 42}) {}',
            'function fn4([], [[]], [[[[[[[[[x]]]]]]]]]) {}',
            'function fn4([[x, y, ...z]]) {}'
        ];

        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        pass('for (let [a = b] of [0, c = 0]);', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'for (let [a = b] of [0, c = 0]);',
            expected: {
                type: 'Program',
                start: 0,
                end: 32,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 32
                    }
                },
                body: [{
                    type: 'ForOfStatement',
                    await: false,
                    start: 0,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    },
                    left: {
                        type: 'VariableDeclaration',
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
                        declarations: [{
                            type: 'VariableDeclarator',
                            start: 9,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            },
                            id: {
                                type: 'ArrayPattern',
                                start: 9,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                },
                                elements: [{
                                    type: 'AssignmentPattern',
                                    start: 10,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    },
                                    left: {
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
                                        name: 'a'
                                    },
                                    right: {
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
                                        name: 'b'
                                    }
                                }]
                            },
                            init: null
                        }],
                        kind: 'let'
                    },
                    right: {
                        type: 'ArrayExpression',
                        start: 20,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 20
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        },
                        elements: [{
                                type: 'Literal',
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
                                value: 0,
                                raw: '0'
                            },
                            {
                                type: 'AssignmentExpression',
                                start: 24,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                },
                                operator: '=',
                                left: {
                                    type: 'Identifier',
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
                                    },
                                    name: 'c'
                                },
                                right: {
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
                                    value: 0,
                                    raw: '0'
                                }
                            }
                        ]
                    },
                    body: {
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
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('let [a,,b]=0', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'let [a,,b]=0',
            expected: {
                type: 'Program',
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
                body: [{
                    type: 'VariableDeclaration',
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
                    declarations: [{
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
                            elements: [{
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
                                    name: 'a'
                                },
                                null,
                                {
                                    type: 'Identifier',
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
                                    },
                                    name: 'b'
                                }
                            ]
                        },
                        init: {
                            type: 'Literal',
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
                            value: 0,
                            raw: '0'
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

        pass('let [[]]=0', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'let [[]]=0',
            expected: {
                type: 'Program',
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
                body: [{
                    type: 'VariableDeclaration',
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
                    declarations: [{
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
                            type: 'ArrayPattern',
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
                            elements: [{
                                type: 'ArrayPattern',
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
                                elements: []
                            }]
                        },
                        init: {
                            type: 'Literal',
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
                            },
                            value: 0,
                            raw: '0'
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

        pass('var [...{x}] = y', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var [...{x}] = y',
            expected: {
                type: 'Program',
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
                body: [{
                    type: 'VariableDeclaration',
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
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 16
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
                            elements: [{
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
                                    type: 'ObjectPattern',
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
                                    properties: [{
                                        type: 'Property',
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
                                        },
                                        method: false,
                                        shorthand: true,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
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
                                            },
                                            name: 'x'
                                        },
                                        kind: 'init',
                                        value: {
                                            type: 'Identifier',
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
                                            },
                                            name: 'x'
                                        }
                                    }]
                                }
                            }]
                        },
                        init: {
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
                            name: 'y'
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

        pass('let [...a] = 0;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'let [...a] = 0;',
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
                body: [{
                    type: 'VariableDeclaration',
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
                    declarations: [{
                        type: 'VariableDeclarator',
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
                        },
                        id: {
                            type: 'ArrayPattern',
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
                            elements: [{
                                type: 'RestElement',
                                start: 5,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                },
                                argument: {
                                    type: 'Identifier',
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
                                    },
                                    name: 'a'
                                }
                            }]
                        },
                        init: {
                            type: 'Literal',
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
                            value: 0,
                            raw: '0'
                        }
                    }],
                    kind: 'let'
                }],
                sourceType: 'script'
            }
        });

        pass('var [let] = answer;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var [let] = answer;',
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
                body: [{
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
                    declarations: [{
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
                            elements: [{
                                type: 'Identifier',
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
                                name: 'let'
                            }]
                        },
                        init: {
                            type: 'Identifier',
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
                            name: 'answer'
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

        pass('function a([a=0]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function a([a=0]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 20,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 20
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    },
                    id: {
                        type: 'Identifier',
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
                        },
                        name: 'a'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 11,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        elements: [{
                            type: 'AssignmentPattern',
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
                            left: {
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
                            },
                            right: {
                                type: 'Literal',
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
                                value: 0,
                                raw: '0'
                            }
                        }]
                    }],
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
                }],
                sourceType: 'script'
            }
        });
        pass('function fn1([a, b = 42]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn1([a, b = 42]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 28,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 28
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 28
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
                        name: 'fn1'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        },
                        elements: [{
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
                                name: 'a'
                            },
                            {
                                type: 'AssignmentPattern',
                                start: 17,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                },
                                left: {
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
                                    name: 'b'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 21,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    },
                                    value: 42,
                                    raw: '42'
                                }
                            }
                        ]
                    }],
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
                }],
                sourceType: 'script'
            }
        });

        pass('function fn2([a = 42, b,]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn2([a = 42, b,]) {}',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fn2'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        },
                        elements: [{
                                type: 'AssignmentPattern',
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
                                left: {
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
                                    name: 'a'
                                },
                                right: {
                                    type: 'Literal',
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
                                    value: 42,
                                    raw: '42'
                                }
                            },
                            {
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
                                name: 'b'
                            }
                        ]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 27,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 27
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn3([a,, b = a, c = 42]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn3([a,, b = a, c = 42]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 36,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 36
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 36,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 36
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
                        name: 'fn3'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        },
                        elements: [{
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
                                name: 'a'
                            },
                            null,
                            {
                                type: 'AssignmentPattern',
                                start: 18,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                },
                                left: {
                                    type: 'Identifier',
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
                                    name: 'b'
                                },
                                right: {
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
                            },
                            {
                                type: 'AssignmentPattern',
                                start: 25,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                },
                                left: {
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
                                    name: 'c'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 29,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    },
                                    value: 42,
                                    raw: '42'
                                }
                            }
                        ]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 34,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 34
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn1([{}]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn1([{}]) {}',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fn1'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
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
                        elements: [{
                            type: 'ObjectPattern',
                            start: 14,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            },
                            properties: []
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 19,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn2([{} = 42]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn2([{} = 42]) {}',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fn2'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        },
                        elements: [{
                            type: 'AssignmentPattern',
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
                            left: {
                                type: 'ObjectPattern',
                                start: 14,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                },
                                properties: []
                            },
                            right: {
                                type: 'Literal',
                                start: 19,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                },
                                value: 42,
                                raw: '42'
                            }
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
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
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn3([a, {b: c}]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn3([a, {b: c}]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 28,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 28
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 28
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
                        name: 'fn3'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        },
                        elements: [{
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
                                name: 'a'
                            },
                            {
                                type: 'ObjectPattern',
                                start: 17,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                },
                                properties: [{
                                    type: 'Property',
                                    start: 18,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
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
                                        name: 'b'
                                    },
                                    value: {
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
                                        name: 'c'
                                    },
                                    kind: 'init'
                                }]
                            }
                        ]
                    }],
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
                }],
                sourceType: 'script'
            }
        });

        pass('function fn4([a, {b: []}]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn4([a, {b: []}]) {}',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fn4'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        },
                        elements: [{
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
                                name: 'a'
                            },
                            {
                                type: 'ObjectPattern',
                                start: 17,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                properties: [{
                                    type: 'Property',
                                    start: 18,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
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
                                        name: 'b'
                                    },
                                    value: {
                                        type: 'ArrayPattern',
                                        start: 21,
                                        end: 23,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 23
                                            }
                                        },
                                        elements: []
                                    },
                                    kind: 'init'
                                }]
                            }
                        ]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 27,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 27
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn1([a, b]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn1([a, b]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
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
                        name: 'fn1'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        },
                        elements: [{
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
                                name: 'a'
                            },
                            {
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
                                name: 'b'
                            }
                        ]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 21,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn2([a, b,]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn2([a, b,]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 24,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 24
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 24
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
                        name: 'fn2'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        },
                        elements: [{
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
                                name: 'a'
                            },
                            {
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
                                name: 'b'
                            }
                        ]
                    }],
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
                }],
                sourceType: 'script'
            }
        });

        pass('function fn3([a,, b,]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn3([a,, b,]) {}',
            expected: {
                type: 'Program',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fn3'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        },
                        elements: [{
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
                                name: 'a'
                            },
                            null,
                            {
                                type: 'Identifier',
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
                                name: 'b'
                            }
                        ]
                    }],
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
                }],
                sourceType: 'script'
            }
        });

        pass('function fn1([,]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn1([,]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 20,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 20
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
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
                        name: 'fn1'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        elements: [
                            null
                        ]
                    }],
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
                }],
                sourceType: 'script'
            }
        });

        pass('function fn2([,,]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn2([,,]) {}',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fn2'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
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
                        elements: [
                            null,
                            null
                        ]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 19,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn([]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn([]) {}',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                    id: {
                        type: 'Identifier',
                        start: 9,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        },
                        name: 'fn'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 12,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        },
                        elements: []
                    }],
                    body: {
                        type: 'BlockStatement',
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
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn1([...args]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn1([...args]) {}',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fn1'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        },
                        elements: [{
                            type: 'RestElement',
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
                            argument: {
                                type: 'Identifier',
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
                                name: 'args'
                            }
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
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
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn2([,,,,,,,...args]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn2([,,,,,,,...args]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 33,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 33
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 33
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
                        name: 'fn2'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        },
                        elements: [
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            {
                                type: 'RestElement',
                                start: 21,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                },
                                argument: {
                                    type: 'Identifier',
                                    start: 24,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    },
                                    name: 'args'
                                }
                            }
                        ]
                    }],
                    body: {
                        type: 'BlockStatement',
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
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn3([x, {y}, ...z]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn3([x, {y}, ...z]) {}',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fn3'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        },
                        elements: [{
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
                                name: 'x'
                            },
                            {
                                type: 'ObjectPattern',
                                start: 17,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                },
                                properties: [{
                                    type: 'Property',
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
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
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
                                        name: 'y'
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'Identifier',
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
                                        name: 'y'
                                    }
                                }]
                            },
                            {
                                type: 'RestElement',
                                start: 22,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                },
                                argument: {
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
                                    name: 'z'
                                }
                            }
                        ]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 29,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 29
                            },
                            end: {
                                line: 1,
                                column: 31
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn4([,x, {y}, , ...z]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn4([,x, {y}, , ...z]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 34,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 34
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 34,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 34
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
                        name: 'fn4'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        },
                        elements: [
                            null,
                            {
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
                                name: 'x'
                            },
                            {
                                type: 'ObjectPattern',
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
                                properties: [{
                                    type: 'Property',
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
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
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
                                        name: 'y'
                                    },
                                    kind: 'init',
                                    value: {
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
                                        name: 'y'
                                    }
                                }]
                            },
                            null,
                            {
                                type: 'RestElement',
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
                                argument: {
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
                                    name: 'z'
                                }
                            }
                        ]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 32,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 32
                            },
                            end: {
                                line: 1,
                                column: 34
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn5({x: [...y]}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn5({x: [...y]}) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 28,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 28
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 28
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
                        name: 'fn5'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        },
                        properties: [{
                            type: 'Property',
                            start: 14,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            },
                            method: false,
                            shorthand: false,
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
                                name: 'x'
                            },
                            value: {
                                type: 'ArrayPattern',
                                start: 17,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                },
                                elements: [{
                                    type: 'RestElement',
                                    start: 18,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    },
                                    argument: {
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
                                        name: 'y'
                                    }
                                }]
                            },
                            kind: 'init'
                        }]
                    }],
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
                }],
                sourceType: 'script'
            }
        });

        pass('function fn({}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn({}) {}',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                    id: {
                        type: 'Identifier',
                        start: 9,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        },
                        name: 'fn'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 12,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        },
                        properties: []
                    }],
                    body: {
                        type: 'BlockStatement',
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
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fna({x: y}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fna({x: y}) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
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
                        name: 'fna'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        },
                        properties: [{
                            type: 'Property',
                            start: 14,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            },
                            method: false,
                            shorthand: false,
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
                                name: 'x'
                            },
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
                                name: 'y'
                            },
                            kind: 'init'
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 21,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fnb({x: y = 42}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fnb({x: y = 42}) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 28,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 28
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 28
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
                        name: 'fnb'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        },
                        properties: [{
                            type: 'Property',
                            start: 14,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            },
                            method: false,
                            shorthand: false,
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
                                name: 'x'
                            },
                            value: {
                                type: 'AssignmentPattern',
                                start: 17,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                },
                                left: {
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
                                    name: 'y'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 21,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    },
                                    value: 42,
                                    raw: '42'
                                }
                            },
                            kind: 'init'
                        }]
                    }],
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
                }],
                sourceType: 'script'
            }
        });

        pass('function fnc({x: {}}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fnc({x: {}}) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 24,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 24
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 24
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
                        name: 'fnc'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        },
                        properties: [{
                            type: 'Property',
                            start: 14,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
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
                                name: 'x'
                            },
                            value: {
                                type: 'ObjectPattern',
                                start: 17,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                },
                                properties: []
                            },
                            kind: 'init'
                        }]
                    }],
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
                }],
                sourceType: 'script'
            }
        });

        pass('function fnd({x: {y}}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fnd({x: {y}}) {}',
            expected: {
                type: 'Program',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fnd'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        },
                        properties: [{
                            type: 'Property',
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
                            method: false,
                            shorthand: false,
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
                                name: 'x'
                            },
                            value: {
                                type: 'ObjectPattern',
                                start: 17,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                },
                                properties: [{
                                    type: 'Property',
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
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
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
                                        name: 'y'
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'Identifier',
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
                                        name: 'y'
                                    }
                                }]
                            },
                            kind: 'init'
                        }]
                    }],
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
                }],
                sourceType: 'script'
            }
        });

        pass('function fne({x: {} = 42}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fne({x: {} = 42}) {}',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fne'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        },
                        properties: [{
                            type: 'Property',
                            start: 14,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            },
                            method: false,
                            shorthand: false,
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
                                name: 'x'
                            },
                            value: {
                                type: 'AssignmentPattern',
                                start: 17,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                left: {
                                    type: 'ObjectPattern',
                                    start: 17,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    },
                                    properties: []
                                },
                                right: {
                                    type: 'Literal',
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
                                    value: 42,
                                    raw: '42'
                                }
                            },
                            kind: 'init'
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 27,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 27
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fnf({x: {y} = 42}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fnf({x: {y} = 42}) {}',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fnf'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        },
                        properties: [{
                            type: 'Property',
                            start: 14,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            },
                            method: false,
                            shorthand: false,
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
                                name: 'x'
                            },
                            value: {
                                type: 'AssignmentPattern',
                                start: 17,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                },
                                left: {
                                    type: 'ObjectPattern',
                                    start: 17,
                                    end: 20,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 20
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
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
                                        method: false,
                                        shorthand: true,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
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
                                            name: 'y'
                                        },
                                        kind: 'init',
                                        value: {
                                            type: 'Identifier',
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
                                            name: 'y'
                                        }
                                    }]
                                },
                                right: {
                                    type: 'Literal',
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
                                    value: 42,
                                    raw: '42'
                                }
                            },
                            kind: 'init'
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
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
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn2({a: {p: q, }, }) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn2({a: {p: q, }, }) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 32,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 32
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
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
                        name: 'fn2'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        },
                        properties: [{
                            type: 'Property',
                            start: 14,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            },
                            method: false,
                            shorthand: false,
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
                                name: 'a'
                            },
                            value: {
                                type: 'ObjectPattern',
                                start: 17,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                },
                                properties: [{
                                    type: 'Property',
                                    start: 18,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
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
                                        name: 'p'
                                    },
                                    value: {
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
                                        name: 'q'
                                    },
                                    kind: 'init'
                                }]
                            },
                            kind: 'init'
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 30,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 30
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn1({x,}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn1({x,}) {}',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fn1'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
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
                        properties: [{
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
                                name: 'x'
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
                                name: 'x'
                            }
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 19,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn3({x,}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn3({x,}) {}',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fn3'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
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
                        properties: [{
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
                                name: 'x'
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
                                name: 'x'
                            }
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 19,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fna({x}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fna({x}) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 20,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 20
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
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
                        name: 'fna'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        properties: [{
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
                                name: 'x'
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
                                name: 'x'
                            }
                        }]
                    }],
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
                }],
                sourceType: 'script'
            }
        });

        pass('function fnb({x, y}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fnb({x, y}) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
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
                        name: 'fnb'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        },
                        properties: [{
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
                                    name: 'x'
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
                                    name: 'x'
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
                                    name: 'y'
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
                                    name: 'y'
                                }
                            }
                        ]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 21,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fnc({x = 42}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fnc({x = 42}) {}',
            expected: {
                type: 'Program',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fnc'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        },
                        properties: [{
                            type: 'Property',
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
                                name: 'x'
                            },
                            kind: 'init',
                            value: {
                                type: 'AssignmentPattern',
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
                                left: {
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
                                    name: 'x'
                                },
                                right: {
                                    type: 'Literal',
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
                                    value: 42,
                                    raw: '42'
                                }
                            }
                        }]
                    }],
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
                }],
                sourceType: 'script'
            }
        });

        pass('function fnd({x, y = 42}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fnd({x, y = 42}) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 28,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 28
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 28
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
                        name: 'fnd'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        },
                        properties: [{
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
                                    name: 'x'
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
                                    name: 'x'
                                }
                            },
                            {
                                type: 'Property',
                                start: 17,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
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
                                    name: 'y'
                                },
                                kind: 'init',
                                value: {
                                    type: 'AssignmentPattern',
                                    start: 17,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    },
                                    left: {
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
                                        name: 'y'
                                    },
                                    right: {
                                        type: 'Literal',
                                        start: 21,
                                        end: 23,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 23
                                            }
                                        },
                                        value: 42,
                                        raw: '42'
                                    }
                                }
                            }
                        ]
                    }],
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
                }],
                sourceType: 'script'
            }
        });

        pass('function fn1({a: {p: q}, b: {r}, c: {s = 0}, d: {}}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn1({a: {p: q}, b: {r}, c: {s = 0}, d: {}}) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 55,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 55
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 55,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 55
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
                        name: 'fn1'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 51,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 51
                            }
                        },
                        properties: [{
                                type: 'Property',
                                start: 14,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                },
                                method: false,
                                shorthand: false,
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
                                    name: 'a'
                                },
                                value: {
                                    type: 'ObjectPattern',
                                    start: 17,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
                                        start: 18,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
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
                                            name: 'p'
                                        },
                                        value: {
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
                                            name: 'q'
                                        },
                                        kind: 'init'
                                    }]
                                },
                                kind: 'init'
                            },
                            {
                                type: 'Property',
                                start: 25,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
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
                                    name: 'b'
                                },
                                value: {
                                    type: 'ObjectPattern',
                                    start: 28,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 28
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
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
                                        },
                                        method: false,
                                        shorthand: true,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
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
                                            },
                                            name: 'r'
                                        },
                                        kind: 'init',
                                        value: {
                                            type: 'Identifier',
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
                                            },
                                            name: 'r'
                                        }
                                    }]
                                },
                                kind: 'init'
                            },
                            {
                                type: 'Property',
                                start: 33,
                                end: 43,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 33
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
                                    },
                                    name: 'c'
                                },
                                value: {
                                    type: 'ObjectPattern',
                                    start: 36,
                                    end: 43,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 43
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
                                        start: 37,
                                        end: 42,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 37
                                            },
                                            end: {
                                                line: 1,
                                                column: 42
                                            }
                                        },
                                        method: false,
                                        shorthand: true,
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
                                            name: 's'
                                        },
                                        kind: 'init',
                                        value: {
                                            type: 'AssignmentPattern',
                                            start: 37,
                                            end: 42,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 37
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 42
                                                }
                                            },
                                            left: {
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
                                                name: 's'
                                            },
                                            right: {
                                                type: 'Literal',
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
                                                value: 0,
                                                raw: '0'
                                            }
                                        }
                                    }]
                                },
                                kind: 'init'
                            },
                            {
                                type: 'Property',
                                start: 45,
                                end: 50,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 45
                                    },
                                    end: {
                                        line: 1,
                                        column: 50
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
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
                                    },
                                    name: 'd'
                                },
                                value: {
                                    type: 'ObjectPattern',
                                    start: 48,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 48
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    },
                                    properties: []
                                },
                                kind: 'init'
                            }
                        ]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 53,
                        end: 55,
                        loc: {
                            start: {
                                line: 1,
                                column: 53
                            },
                            end: {
                                line: 1,
                                column: 55
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn2(x, {a: r, b: s, c: t}, y) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn2(x, {a: r, b: s, c: t}, y) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 41,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 41
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 41,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 41
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
                        name: 'fn2'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
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
                            name: 'x'
                        },
                        {
                            type: 'ObjectPattern',
                            start: 16,
                            end: 34,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 34
                                }
                            },
                            properties: [{
                                    type: 'Property',
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
                                    method: false,
                                    shorthand: false,
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
                                        name: 'a'
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
                                        name: 'r'
                                    },
                                    kind: 'init'
                                },
                                {
                                    type: 'Property',
                                    start: 23,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
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
                                        },
                                        name: 'b'
                                    },
                                    value: {
                                        type: 'Identifier',
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
                                        },
                                        name: 's'
                                    },
                                    kind: 'init'
                                },
                                {
                                    type: 'Property',
                                    start: 29,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
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
                                        },
                                        name: 'c'
                                    },
                                    value: {
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
                                        name: 't'
                                    },
                                    kind: 'init'
                                }
                            ]
                        },
                        {
                            type: 'Identifier',
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
                            },
                            name: 'y'
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        start: 39,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 39
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn3({x: {y: {z: {} = 42}}}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn3({x: {y: {z: {} = 42}}}) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 39,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 39
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 39,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 39
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
                        name: 'fn3'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 35,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 35
                            }
                        },
                        properties: [{
                            type: 'Property',
                            start: 14,
                            end: 34,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 34
                                }
                            },
                            method: false,
                            shorthand: false,
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
                                name: 'x'
                            },
                            value: {
                                type: 'ObjectPattern',
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
                                properties: [{
                                    type: 'Property',
                                    start: 18,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
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
                                        name: 'y'
                                    },
                                    value: {
                                        type: 'ObjectPattern',
                                        start: 21,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
                                            }
                                        },
                                        properties: [{
                                            type: 'Property',
                                            start: 22,
                                            end: 32,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 32
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
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
                                                name: 'z'
                                            },
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 25,
                                                end: 32,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 25
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 32
                                                    }
                                                },
                                                left: {
                                                    type: 'ObjectPattern',
                                                    start: 25,
                                                    end: 27,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 25
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 27
                                                        }
                                                    },
                                                    properties: []
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    start: 30,
                                                    end: 32,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 30
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 32
                                                        }
                                                    },
                                                    value: 42,
                                                    raw: '42'
                                                }
                                            },
                                            kind: 'init'
                                        }]
                                    },
                                    kind: 'init'
                                }]
                            },
                            kind: 'init'
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 37,
                        end: 39,
                        loc: {
                            start: {
                                line: 1,
                                column: 37
                            },
                            end: {
                                line: 1,
                                column: 39
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn4([], [[]], [[[[[[[[[x]]]]]]]]]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn4([], [[]], [[[[[[[[[x]]]]]]]]]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 46,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 46
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 46,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 46
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
                        name: 'fn4'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                            type: 'ArrayPattern',
                            start: 13,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            },
                            elements: []
                        },
                        {
                            type: 'ArrayPattern',
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
                            elements: [{
                                type: 'ArrayPattern',
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
                                elements: []
                            }]
                        },
                        {
                            type: 'ArrayPattern',
                            start: 23,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23
                                },
                                end: {
                                    line: 1,
                                    column: 42
                                }
                            },
                            elements: [{
                                type: 'ArrayPattern',
                                start: 24,
                                end: 41,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 41
                                    }
                                },
                                elements: [{
                                    type: 'ArrayPattern',
                                    start: 25,
                                    end: 40,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 40
                                        }
                                    },
                                    elements: [{
                                        type: 'ArrayPattern',
                                        start: 26,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        },
                                        elements: [{
                                            type: 'ArrayPattern',
                                            start: 27,
                                            end: 38,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 38
                                                }
                                            },
                                            elements: [{
                                                type: 'ArrayPattern',
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
                                                elements: [{
                                                    type: 'ArrayPattern',
                                                    start: 29,
                                                    end: 36,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 29
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 36
                                                        }
                                                    },
                                                    elements: [{
                                                        type: 'ArrayPattern',
                                                        start: 30,
                                                        end: 35,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 30
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 35
                                                            }
                                                        },
                                                        elements: [{
                                                            type: 'ArrayPattern',
                                                            start: 31,
                                                            end: 34,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 31
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 34
                                                                }
                                                            },
                                                            elements: [{
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
                                                                name: 'x'
                                                            }]
                                                        }]
                                                    }]
                                                }]
                                            }]
                                        }]
                                    }]
                                }]
                            }]
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        start: 44,
                        end: 46,
                        loc: {
                            start: {
                                line: 1,
                                column: 44
                            },
                            end: {
                                line: 1,
                                column: 46
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn2([{a: [{}]}]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn2([{a: [{}]}]) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 28,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 28
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 28
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
                        name: 'fn2'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        },
                        elements: [{
                            type: 'ObjectPattern',
                            start: 14,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 15,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
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
                                    name: 'a'
                                },
                                value: {
                                    type: 'ArrayPattern',
                                    start: 18,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    },
                                    elements: [{
                                        type: 'ObjectPattern',
                                        start: 19,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        },
                                        properties: []
                                    }]
                                },
                                kind: 'init'
                            }]
                        }]
                    }],
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
                }],
                sourceType: 'script'
            }
        });

        pass('function fn3({a: [,,,] = 42}) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn3({a: [,,,] = 42}) {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 32,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 32
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
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
                        name: 'fn3'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ObjectPattern',
                        start: 13,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        },
                        properties: [{
                            type: 'Property',
                            start: 14,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            },
                            method: false,
                            shorthand: false,
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
                                name: 'a'
                            },
                            value: {
                                type: 'AssignmentPattern',
                                start: 17,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                },
                                left: {
                                    type: 'ArrayPattern',
                                    start: 17,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    },
                                    elements: [
                                        null,
                                        null,
                                        null
                                    ]
                                },
                                right: {
                                    type: 'Literal',
                                    start: 25,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    },
                                    value: 42,
                                    raw: '42'
                                }
                            },
                            kind: 'init'
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 30,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 30
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('function fn4([[x, y, ...z]]) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function fn4([[x, y, ...z]]) {}',
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
                body: [{
                    type: 'FunctionDeclaration',
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
                        name: 'fn4'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'ArrayPattern',
                        start: 13,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        },
                        elements: [{
                            type: 'ArrayPattern',
                            start: 14,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            },
                            elements: [{
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
                                    name: 'x'
                                },
                                {
                                    type: 'Identifier',
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
                                    name: 'y'
                                },
                                {
                                    type: 'RestElement',
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
                                    argument: {
                                        type: 'Identifier',
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
                                        },
                                        name: 'z'
                                    }
                                }
                            ]
                        }]
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 29,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 29
                            },
                            end: {
                                line: 1,
                                column: 31
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('var {x} = {}, {y} = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var {x} = {}, {y} = {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    },
                    declarations: [{
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
                                properties: [{
                                    type: 'Property',
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
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
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
                                    },
                                    kind: 'init',
                                    value: {
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
                                }]
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
                        },
                        {
                            type: 'VariableDeclarator',
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
                            id: {
                                type: 'ObjectPattern',
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
                                properties: [{
                                    type: 'Property',
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
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
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
                                        name: 'y'
                                    },
                                    kind: 'init',
                                    value: {
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
                                        name: 'y'
                                    }
                                }]
                            },
                            init: {
                                type: 'ObjectExpression',
                                start: 20,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                },
                                properties: []
                            }
                        }
                    ],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

        pass('var { x : y } = {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'var { x : y } = {};',
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
                body: [{
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
                    declarations: [{
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
                            type: 'ObjectPattern',
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
                            properties: [{
                                type: 'Property',
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
                                    name: 'x'
                                },
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
                                },
                                kind: 'init'
                            }]
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
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });
    });
});
