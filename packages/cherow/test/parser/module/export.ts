import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Module - Export', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failures', () => {

        const failures = [
            'export {',
            'export async;',
            'var a; export { a',
            'var a; export { a,',
            'var a; export { a, ;',
            'var a; export { a as };',
            'var a, b; export { a as , b};',
            'class C { method() { export default null; } }',
            '{ export default null; }',
            'class C { *method() { export default null; } }',
            `for (const x = 0; false;)
            export default null;`,
            'switch(0) { case 1: export default null; default: }',
            'switch(0) { case 1: export default null; default: }',
            'export }',
            'var foo, bar; export { foo bar };',
            'export { , };',
            'export default;',
            'export default var x = 7;',
            'export default let x = 7;',
            'export default const x = 7;',
            'export *;',
            'export * from;',
            'export { Q } from;',
            'export default from \'module.js\';',
            'export { for }',
            'export { for as foo }',
            'export * as z from "c";',
            'export function() {}',
            'export function*() {}',
            'export class {}',
            'export class extends C {}',
            'export default (function * yield() {})',
            'export default (async function await() {})',
            'export default (async function *await() {})',
            'export default async function await() {}',
            'export async function await() {}',
            'export async function() {}',
            'export async',
            'export async\nfunction async() { await 1; }',
            'export * as namespace from \'./foo\' null;',
            'export {try};',
            'export * +',
            'export default from "foo"',
            'export {default}',
            'export {try as bar};',
            'export var await',
            'export typeof foo;',
            'export new Foo();',
            'export *',
            'export { default }',
            'export { if }',
            'export { default as foo }',
            'export { if as foo }',
            'export * from foo',
            'export { bar } from foo',
            'export const const1;',
            'function foo() { }; export foo;',
            'export function () { }',
            'export function* () { }',
            'export B, * as A, { C, D } from "test";',
            // missing binding identifier
            'export class { }',
            'function foo() { }; export [ foo ];',
            'function foo() { export default function() { } }',
            'function foo() { }; export { , foo };',
            'function foo() { }; () => { export { foo }; }',
            'function foo() { }; try { export { foo }; } catch(e) { }',
            // 'Syntax error if export is followed by non-identifier'
            'export 12;',
            'function foo() { }; export { foo as 100 };',
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
            'export let x = 0;',
            'export var y = 0;',
            'export const z = 0;',
            'export default x;',
            'export function func() { };',
            'export class C { };',
            'export { };',
            'export { x as default };',
            'function f() {}; f(); export { f };',
            'var a, b, c; export { a, b as baz, c };',
            'var d, e; export { d as dreary, e, };',
            'export default function f() {}',
            'export default function() {}',
            'export default function *a() {}',
            'export var foo = function () {};',
            'export default function*() {}',
            'export default class C {}',
            'export default class {}',
            'export * from "module";',
            'export {name} from "module";',
            'export {a as b, c as d} from "module";',
            'export {e as f, g as h};',
            'export {};',
            'export default i = 42;',
            'export var j = 42;',
            'export let k = 42;',
            'export function l() {}',
            'export default function () {}',
            'export default class extends C {}',
            'export default 42',
            'var x; export default x = 7',
            'export { Q } from \'somemodule.js\';',
            'export * from \'somemodule.js\';',
            'var foo; export { foo as for };',
            'export { arguments } from \'m.js\';',
            'export {foo, bar,};',
            'export { for } from \'m.js\';',
            'export { yield } from \'m.js\'',
            'export { static } from \'m.js\'',
            'export { let } from \'m.js\'',
            'export default [];',
            'export default 42;',
            'export default { foo: 1 };',
            'export * from "foo";',
            'export {default} from "foo";',
            'export {foo as bar} from "foo";',
            'export function *foo () {}',
            'export var foo = 1;',
            'var a; export { a as b, a as c };',
            'var a; export { a as await };',
            'var a; export { a as enum };',
            'export {thing}; import thing from \'a.js\';',
            'export {thing}; import {thing} from \'a.js\';',
            'export {thing}; import * as thing from \'a.js\';',
            'export { x as y };',
            'export { a as b } from \'m.js\';',
            'export * from \'p.js\';',
            'export var foo;',
            'export function goo() {};',
            'export let hoo;',
            `export default class { constructor() {	foo() } a() {	bar()	}	}`,
            'export const joo = 42;',
            'export default (function koo() {});',
            'export {aa as bb, x};',
            'export {foob};',
            'export var document',
            'export var document = {}',
            'export var document',
            'export default async function() { await 1; }',
            'export default async function async() { await 1; }',
            'export async function async() { await 1; }',
            'export let document = { }',
            'export const document = { }',
            'export class Class {}',
            'export default 42',
            'export default class A {}',
            'export default (class{});',
            'export { a, b }',
            'export { a as default }',
            'export { a, b as dec }',
            'export { default } from "other"',
            'export default function foo() {} false',
            'export default /foo/',
            'export var namedOther = null;',
            'export var starAsVarDecl;',
            'export let starAsLetDecl;',
            'export const starAsConstDecl = null;',
            'export function starAsFuncDecl() {}',
            'export function* starAsGenDecl() {}',
            'export class starAsClassDecl {}',
            'export { starAsBindingId };',
            'export { starAsBindingId as starIdName };',
            'export default class Foo {}++x',
            'export { x as y } from \'./y.js\';\nexport { x as z } from \'./z.js\';',
            'export { default as y } from \'./y.js\';\nexport default 42;',
            'export default function(x) {};',
            'export {a as super }',
            'export default function () { };',
            'export default function _fn2 () { }',
            'var a; export default a = 10;',
            'export default () => 3',
            'function _default() { }; export default _default',
            // Named generator function statement
            'function* g() { }; export default g',
            'class c { }; export default c',
            'var _ = { method: function() { return \'method_result\'; }, method2: function() { return \'method2_result\'; } }; export default _',
        ];

        for (const arg of programs) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
                });
            });
        }

        pass(`export async function foo() {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Module, {
            source: `export async function foo() {}`,
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
                    type: 'ExportNamedDeclaration',
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
                    declaration: {
                        type: 'FunctionDeclaration',
                        start: 7,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 22,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            },
                            name: 'foo'
                        },
                        generator: false,
                        expression: false,
                        async: true,
                        params: [],
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
                    },
                    specifiers: [],
                    source: null
                }],
                sourceType: 'module'
            }
        });

        pass(`export default async function bar() {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Module, {
            source: `export default async function bar() {}`,
            expected: {
                type: 'Program',
                start: 0,
                end: 38,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 38
                    }
                },
                body: [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    end: 38,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 38
                        }
                    },
                    declaration: {
                        type: 'FunctionDeclaration',
                        start: 15,
                        end: 38,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 38
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 30,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 30
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            },
                            name: 'bar'
                        },
                        generator: false,
                        expression: false,
                        async: true,
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            start: 36,
                            end: 38,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 36
                                },
                                end: {
                                    line: 1,
                                    column: 38
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'module'
            }
        });

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
                body: [{
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
                    specifiers: [{
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
                    }],
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
                }],
                sourceType: 'module'
            }
        });

        pass(`export default async () => await foo()`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Module, {
            source: `export default async () => await foo()`,
            expected: {
                type: 'Program',
                start: 0,
                end: 38,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 38
                    }
                },
                body: [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    end: 38,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 38
                        }
                    },
                    declaration: {
                        type: 'ArrowFunctionExpression',
                        start: 15,
                        end: 38,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 38
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: true,
                        params: [],
                        body: {
                            type: 'AwaitExpression',
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
                            argument: {
                                type: 'CallExpression',
                                start: 33,
                                end: 38,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 33
                                    },
                                    end: {
                                        line: 1,
                                        column: 38
                                    }
                                },
                                callee: {
                                    type: 'Identifier',
                                    start: 33,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 36
                                        }
                                    },
                                    name: 'foo'
                                },
                                arguments: []
                            }
                        }
                    }
                }],
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
                body: [{
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
                }],
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
                body: [{
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
                    specifiers: [{
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
                    }],
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
                }],
                sourceType: 'module'
            }
        });

        pass(`import {} from "foo";`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Module, {
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
                body: [{
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
                }],
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
                body: [{
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
                    specifiers: [{
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
                }],
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
                body: [{
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
                    specifiers: [{
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
                    }],
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
                }],
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
                body: [{
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
                    specifiers: [{
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
                    }],
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
                }],
                sourceType: 'module'
            }
        });
    });
});
