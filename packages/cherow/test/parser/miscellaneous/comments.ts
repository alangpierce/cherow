import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Comments', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    fail(`;-->`, Context.Empty, {
        source: `;-->`,
    });

    fail(`---*/

    -->`, Context.Empty, {
        source: `---*/

        -->`,
    });

    fail(`<!-- test --->`, Context.Module, {
        source: `<!-- test --->`,
    });

    fail(`single and multi line comments used together`, Context.Empty, {
        source: `// var /*
            x*/`,
    });
    // `html comment + jsx
    fail(`</`, Context.OptionsJSX, {
        source: `</`
    });
    // MultiLineComment inside jsx opening tag
    fail(`</*`, Context.OptionsJSX, {
        source: `</*`
    });
    // single line comment inside jsx opening tag
    fail(`<// single`, Context.OptionsJSX, {
        source: `<// single`
    });

    // `html comment + jsx - module code
    fail(`</`, Context.OptionsJSX, {
        source: `</`
    });
    // MultiLineComment inside jsx opening tag  - module code
    fail(`</*`, Context.OptionsJSX | Context.Strict | Context.Module, {
        source: `</*`
    });
    // single line comment inside jsx opening tag  - module code
    fail(`<// single`, Context.OptionsJSX | Context.Strict | Context.Module, {
        source: `<// single`
    });

    fail(`single and multi line comments used together`, Context.OptionsJSX | Context.Strict | Context.Module, {
        source: `<!-- HTML comment`
    });

    fail(`/*
    var
    /* x */
    = 1;
    */`, Context.Empty, {
        source: `/*
        var
        /* x */
        = 1;
        */`,
    });

    fail(`
    /* var*/
    x*/`, Context.Empty, {
        source: `
        /* var*/
        x*/`,
    });

    fail(`/*CHECK#1/`, Context.Empty, {
        source: `/*CHECK#1/`,
    });

    fail(`/*
    */ the comment should not include these characters, regardless of AnnexB extensions -->`, Context.Empty, {
        source: `/*
        */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail(`;-->`, Context.Empty, {
        source: `;-->`,
    });

    fail(`<!-`, Context.Empty, {
        source: `<!-`,
    });

    fail(`html comment + jsx`, Context.Empty, {
        source: `</`,
    });

    fail(`single and multi line comments used together`, Context.Empty, {
        source: `<!-`,
    });

    fail(`single and multi line comments used together`, Context.Empty, {
        source: `<!`,
    });

    fail(`single and multi line comments used together`, Context.Empty, {
        source: `// var /*
            x*/`
    });

    fail(`nested multi line comments`, Context.Empty, {
        source: `/* x */
            = 1;
            */`,
    });

    fail(`  \t <!-- foo bar\r   `, Context.Strict | Context.Module, {
        source: `  \t <!-- foo bar\r   `,
    });

    fail( `  \t <!-- foo bar\r <!-- baz \r <!--`, Context.Strict | Context.Module, {
        source:  `  \t <!-- foo bar\r <!-- baz \r <!--`,
    });

    fail(`  \t \n-->  `, Context.Strict | Context.Module, {
        source: `  \t \n}-->  `,
    });

    fail(`arbitrary character sequence before HTMLCloseComment token`, Context.Empty, {
        source: `/*
            */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail(`/*FOO/`, Context.Empty, {
        source: `/*FOO/`,
    });

    fail(`multiline comment at the end of single line comment`, Context.Empty, {
        source: `// var /*
            x*/`,
    });

    fail(`arbitrary character sequence before HTMLCloseComment token`, Context.Empty, {
        source: `/*
            */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail(`arbitrary character sequence before HTMLCloseComment token`, Context.Empty, {
        source: `/*
            */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail(`arbitrary character sequence before HTMLCloseComment token`, Context.Empty, {
        source: `/*
            */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail(`arbitrary character sequence before HTMLCloseComment token`, Context.Empty, {
        source: `/*
            */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail(`arbitrary character sequence before HTMLCloseComment token`, Context.Empty, {
        source: `/*
            */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail(`arbitrary character sequence before HTMLCloseComment token`, Context.Empty, {
        source: `/*
            */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail('x --> is eol-comment\nvar y = b;\n', Context.Empty, {
        source: 'x --> is eol-comment\nvar y = b;\n',
    });

    fail('x/* precomment */ --> is eol-comment\nvar y = 37;\n', Context.Empty, {
        source: 'x/* precomment */ --> is eol-comment\nvar y = 37;\n',
    });

    fail('var x = a; --> is eol-comment\nvar y = b;\n', Context.Empty, {
        source: 'var x = a; --> is eol-comment\nvar y = b;\n',
    });

    fail(`/*
    */ the comment should not include these characters, regardless of AnnexB extensions -->`, Context.Empty, {
        source: `/*
        */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail(`/*
    */ the comment should not include these characters, regardless of AnnexB extensions -->`, Context.Strict | Context.Module, {
        source: `/*
        */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    describe('Pass', () => {
        const programs = [

           // Babylon issue: https://github.com/babel/babel/issues/7802
            `<!-- test --->`,
            '<!-- console.log("foo") -->',
            '//\\u00A0 single line \\u00A0 comment \\u00A0',
            '// foo',
            '// foo /* bar */',
            '/* foo */ // bar',
            '/* multiline */',
            '/** multiline */',
            `  \t \n-->  `,
            `  \t /*\n*/  --> the comment extends to these characters\n `,
            '  \t -->  ',
            '  \t --> the comment doesn\'t extend to these characters\n ',
            '\t /* optional FirstCommentLine */  --> ' +
            'the comment doesn\'t extend to these characters\n ',
            '  \t /**/ /* optional second SingleLineDelimitedCommentSequence */' +
            '  --> the comment doesn\'t extend to these characters\n ',
            '0 /*The*/ /*Answer*/',
            '0 /* The * answer */',
            '/*a\r\nb*/ 0',
            '/*a\rb*/ 0',
            '/*a\nb*/ 0',
            '/*a\nc*/ 0',
            'let a = () => /* = */ { return "b" }',
            'let a = () => { /* = */ return "b" }',
            'let a = () /* = */ => { return "b" }',
            '(/* className: string */) => {}',
            '0 // line comment',
            '// Hello, Icefapper!\n0',
            '//',
            '/**/0',
            '0/**/',
            '// Hello, world!\n\n//   Another hello\n0',
            'if (x) { doThat() // Some comment\n }',
            '/* header */ (function(){ var version = 1; }).call(this)',
            'function f() { /* infinite */ while (true) { } /* bar */ var each; }',
            'while (i-->0) {}',
            'var x = 1<!--foo',
            '/* not comment*/; i-->0',
            '// Hello, Icefapper!\n',
            '// line comment\n0',
            '// foo',
            '// /* foo */',
            '\t\t\t\t\t\t\t\t',
            '\t // foo bar${lt}  ',
            `\t // foo bar\n // baz \n //`,
            `\t /* foo * /* bar \u2028 */  `,
            `\t // foo bar\r // baz \r //`,
            `\t /* foo * /* bar \u2029 */  `,
            `\t /* foo bar\r *//* baz*/ \r /**/`,
            `\t <!-- foo bar\t <!-- baz \r <!--`,
            `\t <!-- foo bar\u2029  `,
            `\t /*\t*/ /* optional SingleLineDelimitedCommentSequence */
                \n--> the comment extends to these characters\t `,
            `\t \n   --> the comment extends to these characters\r `,
            '() => /* string */ \'\'',
            '// foo',
            '/**/ // ',
            '// a /* bcd */ ',
            `  \t <!-- foo bar\n\r  `,
            `  \t <!-- foo bar\r\n  `,
            `  \t <!-- foo bar\r\n\t  `,
            `  \t <!-- foo bar\t\r  `,
            `  \t <!-- foo bar\r\t  `,
            `(/* comment */{
                /* comment 2 */
                p1: null
            })`,
            'var x = 1<!--foo',
            ' \t /* block comment */  --> comment',
            '\n/*precomment*/-->eol-comment\nvar y = a;\n',
            'var x = a;/*\n*/-->is eol-comment\nvar y = b;\n',
            `//"𠮷"
    /*"𠮷"*/a;
`,
            `/**/ --> comment\n`,
            `foo <!--bar`,
            `/* assignmenr */
  a = b`,
            `// Hello, world!`,
            `function f() { /* infinite */ while (true) { } /* bar */ var each; }`,
            `o_po // foo`,
            `function a() {
    // foo
  }`,
            `function x(){ /*Jupiter*/ return; /*Saturn*/}`,
            `/* block comment */--> comment`,
            `var a; // a`,
            '/**/42',
            '/**/42',
            '//42',
            '42/**/',
            'function x(){ /*foo*/ return; /*bar*/}',
            '0 /*The*/ /*Answer*/',
            'if (x) { // Some comment\ndoThat(); }',
            `var a; // a`,
            'var x = 42;/*\n*/-->is eol-comment\nvar y = 37;\n',
            '/* MLC1 \n */ /* SLDC1 */ /* MLC2 \n */ /* SLDC2 */ --> is eol-comment\n',
            'a(/* inner */); b(e, /* inner */)',
            'while (true) { continue /* Multiline\nComment */there; }',
            'while (true) { break /* Multiline\nComment */there; }',
            'while (true) { continue // Comment\nthere; }',
            'while (true) { continue\nthere; }',
            '{ x\n++y }',
            '{ x\n--y }',
            '{ throw error\nerror; }',
            '{ throw error// Comment\nerror; }',
            '{ throw error/* Multiline\nComment */error; }',
            `// var /*
            // x
            // =
            // 1*/`,
            `/* var
            //x
            */`,
            `// x = 1;`,
            `//var this.y = 1; `

        ];

        for (const arg of programs) {

            it(`"use strict"; ${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.OptionsComments);
                });
            });

            it(`function foo() {
                ${arg}
            }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`function foo() {
                        ${arg}
                    }`, undefined, Context.OptionsComments);
                });
            });
        }

        pass('--> is eol-comment', Context.OptionsLoc | Context.OptionsRanges | Context.OptionsComments, {
            source: '--> is eol-comment',
            expected: {
                body: [],
                comments: [{
                    end: 18,
                    loc: {
                        end: {
                            column: 18,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    start: 0,
                    type: 'HTMLClose',
                    value: ' is eol-comment'
                }],
                end: 18,
                loc: {
                    end: {
                        column: 18,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                sourceType: 'script',
                start: 0,
                type: 'Program'
            }
        });

        pass('0/*\n*/--> a comment', Context.OptionsLoc | Context.OptionsRanges, {
            source: '0/*\n*/--> a comment',
            expected: {
                body: [{
                    end: 1,
                    expression: {
                        end: 1,
                        loc: {
                            end: {
                                column: 1,
                                line: 1
                            },
                            start: {
                                column: 0,
                                line: 1,
                            }
                        },
                        start: 0,
                        type: 'Literal',
                        value: 0,
                    },
                    loc: {
                        end: {
                            column: 1,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    start: 0,
                    type: 'ExpressionStatement'
                }],
                end: 19,
                loc: {
                    end: {
                        column: 15,
                        line: 2,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                sourceType: 'script',
                start: 0,
                type: 'Program'
            }
        });

        pass('--> is eol-comment\nvar y = abc;\n', Context.Empty, {
            source: '--> is eol-comment\nvar y = abc;\n',
            expected: {
                body: [{
                    declarations: [{
                        id: {
                            name: 'y',
                            type: 'Identifier'
                        },
                        init: {
                            name: 'abc',
                            type: 'Identifier'
                        },
                        type: 'VariableDeclarator'
                    }],
                    kind: 'var',
                    type: 'VariableDeclaration'
                }, ],
                sourceType: 'script',
                type: 'Program'
            }
        });
    });
});
