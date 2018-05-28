import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Template', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [
            '`$',
            '`left${0}\\xg${1}right`',
            '`${',
            '`${1 + 2}',
            '`\\x0`',
            '`\\xZ`',
            '`\\341`',
            '`\\376`',
            '`\\56`',
            '`\\006`',
            '`\\004`',
            '`\\03`',
            '`\\5`',
            '`\\u{abcdx`',
            'a++``',
            '`${a',
            '`${a}a${b}',
            'switch `test`',
            '`\\x{1}`;',
            '"use strict"; `\\00`;',
            '`\\8`',
            '`\\9`',
            '`\\08`',
            '`\\01`',
            '`\\11`',
            '`${a}a${b}',
            '`\\u`',
            '`\\u000g`;',
            'let icefapper = `bad: \\unicode`;',
            'let bracingOurselves = `\\u{shouldntDoThis}`;',
            '`\\u{10FFFFF}${"inner"}right`',
            '`\\u{abcdx}`',
            '`left${0}\\u0`',
            '`\\u000g`;',
            '`\\u{10FFFFF}${"inner"}right`;',
            '`\\u{0`;',
            '`\\u{10FFFFF}`;',
            '`\\x0G`;',
            '`\\u{10FFFFF}`;',
            '`\\01${0}right`',
            '`left${0}\\01`',
            '`left${0}\\01${1}right`',
            '`\\1`',
            '`\\1${0}right`',
            '`left${0}\\1`',
            '`left${0}\\1${1}right`',
            '`\\xg`',
            '`\\xg${0}right`',
            '`left${0}\\xg`',
            '`left${0}\\xg${1}right`',
            '`\\xAg`',
            '`\\xAg${0}right`',
            '`left${0}\\xAg`',
            '`left${0}\\xAg${1}right`',
            '`\\u0`',
            '`\\u0${0}right`',
            '`left${0}\\u0`',
            '`left${0}\\u0${1}right`',
            '`\\u0g`',
            '`\\u0g${0}right`',
            '`left${0}\\u0g`',
            '`left${0}\\u0g${1}right`',
            '`\\u00g`',
            '`\\u00g${0}right`',
            '`left${0}\\u00g`',
            '`left${0}\\u00g${1}right`',
            '`\\u000g`',
            '`\\u000g${0}right`',
            '`left${0}\\u000g`',
            '`left${0}\\u000g${1}right`',
            '`\\u{}`',
            '`\\u{}${0}right`',
            '`left${0}\\u{}`',
            '`left${0}\\u{}${1}right`',
            '`\\u{-0}`',
            '`\\u{-0}${0}right`',
            '`left${0}\\u{-0}`',
            '`left${0}\\u{-0}${1}right`',
            '`\\u{g}`',
            '`\\u{g}${0}right`',
            '`left${0}\\u{g}`',
            '`left${0}\\u{g}${1}right`',
            '`\\u{0`',
            '`\\u{0${0}right`',
            '`left${0}\\u{0`',
            '`left${0}\\u{0${1}right`',
            '`\\u{\\u{0}`',
            '`\\u{\\u{0}${0}right`',
            '`left${0}\\u{\\u{0}`',
            '`left${0}\\u{\\u{0}${1}right`',
            '`\\u{110000}`',
            '`\\u{110000}${0}right`',
            '`left${0}\\u{110000}`',
            '`left${0}\\u{110000}${1}right`',
            '`\\1``\\2`',
            '`\\u```',
        ];
        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; ${arg}`, () => {
                t.throws(() => {
                    parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

        // Hex
        for (let i = 0; i < 0xFF; ++i) {
            const c = String.fromCharCode(i);
            if (c == '`' || c == '\\' || c == '\r') continue;
            it('`' + c + '`', () => {
                t.doesNotThrow(() => {
                    parseSource('`' + c + '`', undefined, Context.Empty);
                });
            });
        }

        // Unicode brace escapes
        for (let i = 0x10c; i <= 0x10f; i++) {
            const start = i << 8;
            const end = start | 0xff;
            for (let code = start; code <= end; code++) {
                const escape = `\\u{${code.toString(16)}}`;

                it(`'${escape}'`, () => {
                    t.doesNotThrow(() => {
                        parseSource(`'${escape}'`, undefined, Context.Empty);
                    });
                });
            }
        }

        // Escaped 0 - 7 (with possible leading zeroes)

        for (let code = 0; code <= 6; code++) {

            const arg0 = `\\${code}`;

            it(`'${arg0}'`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'${arg0}'`, undefined, Context.Empty);
                });
            });

            const arg1 = `\\0${code}`;

            it(`'${arg1}'`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'${arg1}'`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; '${arg1}'`, () => {
                  t.throws(() => {
                      parseSource(`"use strict"; '${arg1}'`, undefined, Context.Empty);
                  });
              });

            const arg2 = `\\00${code}`;

            it(`'${arg2}'`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'${arg2}'`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; '${arg2}'`, () => {
                 t.throws(() => {
                     parseSource(`"use strict"; '${arg2}'`, undefined, Context.Empty);
                 });
            });
        }

        for (let code = 0x10f000; code <= 0x10ffff; code++) {

            const arg = `\\u{${code.toString(16)}}`;

            it(`'${arg}'`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'${arg}'`, undefined, Context.Empty);
                });
            });

            const arg0 = `\\u{0${code.toString(16)}}`;

            it(`'${arg0}'`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'${arg0}'`, undefined, Context.Empty);
                });
            });

            it(`'${arg0}'`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'${arg0}'`, undefined, Context.Empty);
                });
            });
            const arg000 = `\\u{000${code.toString(16)}}`;

            it(`'${arg000}'`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'${arg000}'`, undefined, Context.Empty);
                });
            });
        }

        for (let code = 0o100; code <= 0o377; code++) {

            const arg = `\\${code.toString(8)}`;

            it(`'${arg}'`, () => {
                t.doesNotThrow(() => {
                    parseSource(`'${arg}'`, undefined, Context.Empty);
                });
            });
        }

        const enum Chars {
            EnglishUpperA = 0x41,
                EnglishUpperZ = 0x5A,
                EnglishLowerA = 0x61,
                EnglishLowerZ = 0x7A,
                RussianUpperА = 0x410,
                RussianUpperЯ = 0x42F,
                RussianUpperЁ = 0x401,
                RussianLowerА = 0x430,
                RussianLowerЯ = 0x44F,
                RussianLowerЁ = 0x451,
                Zero = 0x30,
                Nine = 0x39,

                Backtick = 0x60,
        }

        // Test262 - Russian lower and upper capitals

        for (let code = Chars.RussianLowerА; code <= Chars.RussianLowerЯ; code++) {
            const letter = String.fromCharCode(code);

            it(`\`${letter}\``, () => {
                t.doesNotThrow(() => {
                    parseSource(`\`${letter}\``, undefined, Context.Empty);
                });
            });

            it(`\`\\${letter}\``, () => {
                t.doesNotThrow(() => {
                    parseSource(`\`\\${letter}\``, undefined, Context.Empty);
                });
            });

            it(`\`\\${letter}\``, () => {
                t.doesNotThrow(() => {
                    parseSource(`\`\\${letter}\``, undefined, Context.Strict | Context.Module);
                });
            });
        }

        for (let code = Chars.RussianUpperА; code <= Chars.RussianUpperЯ; code++) {
            const letter = String.fromCharCode(code);
            it(`\`${letter}\``, () => {
                t.doesNotThrow(() => {
                    parseSource(`\`${letter}\``, undefined, Context.Empty);
                });
            });

            it(`\`\\${letter}\``, () => {
                t.doesNotThrow(() => {
                    parseSource(`\`\\${letter}\``, undefined, Context.Empty);
                });
            });

            it(`\`\\${letter}\``, () => {
                t.doesNotThrow(() => {
                    parseSource(`\`\\${letter}\``, undefined, Context.Strict | Context.Module);
                });
            });
         }

        for (let code = Chars.EnglishUpperA; code <= Chars.EnglishUpperZ; code++) {
            const letter = String.fromCharCode(code);
            it(`\`${letter}\``, () => {
                t.doesNotThrow(() => {
                    parseSource(`\`${letter}\``, undefined, Context.Empty);
                });
            });

            it(`\`\\${letter}\``, () => {
                t.doesNotThrow(() => {
                    parseSource(`\`\\${letter}\``, undefined, Context.Empty);
                });
            });

            it(`\`\\${letter}\``, () => {
                t.doesNotThrow(() => {
                    parseSource(`\`\\${letter}\``, undefined, Context.Strict | Context.Module);
                });
            });
         }

         // Digits

        for (let code = Chars.Zero; code < Chars.Nine; code++) {
        const letter = String.fromCharCode(code);
        it(`\`${letter}\``, () => {
            t.doesNotThrow(() => {
                parseSource(`\`${letter}\``, undefined, Context.Strict | Context.Module);
            });
        });
    }

        const validCombos = [
        'function z() {}; `z`;',
        'function z() {}; `${z}`;',
        'function z() {}; `${z}${z}`;',
        'function z() {}; `${z}${z}${z}`;',
        'function z() {}; `${\'z\'}${z}${z}`;',
        'function z() {}; `${\'z\'}${\'z\'}${z}`;',
        'function z() {}; \'\' + z + \'\';',
        'function z() {}; z`${`${z}`}`;',
        'function z() {}; z``;',
        'function z() {}; ``;',
        '(`${function(id) { return id }}`);',
        'function y() {} y`${`${\'z\'}${`${function(id) { return id }})${ /x/g >= \'c\'}`}`}`;',
        'tag`foo\\n`',
        't`foo\\n`;',
        '`a\\u{d}c`',
        '`a\\u{062}c`',
        '`a\\u{000000062}c`',
        'foo`\n${0}`',
        'foo`\\\n${0}`',
        'foo`\\r${0}`',
        'foo`\r\n${0}`',
        'foo`\\\r\\\n${0}`',
        'foo`\\\r\n${0}`',
        'foo`\r\\\n${0}`',
        'foo`\\r\\n${0}`',
        'foo`\u2029${0}`',
        'foo`\\\u2029${0}`',
        'foo`\\n${0}`',
        'foo`\\r${0}`',
        'foo`\\\r\\\n${0}`',
        'foo`\r\\n${0}`',
        'foo`\\\u2029${0}`',
        'let a;',
        'var foo = `simple template`;',
        'let foo = f`template with function`;',
        'const foo = f`template with ${some} ${variables}`;',
        'var foo = f`template with ${some}${variables}${attached}`;',
        'let foo = f()`template with function call before`;',
        'const foo = f().g`template with more complex function call`;',
    ];
        for (const arg of validCombos) {

        it(`${arg}`, () => {
            t.doesNotThrow(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
    }

        const validSyntax = [
            '`\r\n\t\n`',
            'sampleTag`\\01`',
            'sampleTag`left${0}\\u{\\u{0}`',
            'sampleTag`left${0}\\u{`',
            'sampleTag`left${0}\\u{-0}${1}right`',
            'sampleTag`left${0}\\u{g}${1}right`',
            'sampleTag`left${0}\\u000g${1}right`',
            '``````',
            'a``',
            'tag`template-head${a}`',
            'tag `no-subst-template`',
            'tag\t`foo\n\nbar\r\nbaz`',
            'tag`foo${a /* comment */}`',
            'tag ``',
            'tag`foo${a \r\n}`',
            'tag`foo${a \r}`',
            'tag`foo${// comment\na}`',
            'tag`foo${\n a}`',
            '`a${b}`',
            '`outer${{x: {y: 10}}}bar${`nested${function(){return 1;}}endnest`}end`',
            'foo`T\\u200C`',
            'foo`\\u{00000000034}`',
            '`\\ю`',
            '`\\б`',
            'a\r\nb`\n\r\nb\\u{g`;',
            '`a\\r\\nb`',
            '`a\r\nb`',
            '`${ {class: 1} }`',
            '`${ {enum: 1} }`',
            '`${ {function: 1} }`',
            '`foo`',
            '`foo\\u25a0`',
            'foo`\\unicode`',
            'foo`\\u`',
            'foo`\\u\\n\\r`',
            'foo`\\uaa\\n\\r`',
            'raw`hello ${name}`',
            '`$`',
            '`\\n\\r\\b\\v\\t\\f\\\n\\\r\n`',
            '`\n\r\n\r`',
            '`outer${{x: {y: 10}}}bar${`nested${function(){return 1;}}endnest`}end`',
            'tag`\\08`',
            'tag`\\01`',
            'tag`\\01${0}right`',
            'tag`left${0}\\01`',
            'tag`left${0}\\01${1}right`',
            'tag`\\1`',
            'tag`\\1${0}right`',
            'tag`left${0}\\1`',
            'tag`left${0}\\1${1}right`',
            'tag`\\xg`',
            'tag`\\xg${0}right`',
            'tag`left${0}\\xg`',
            'tag`left${0}\\xg${1}right`',
            'tag`\\xAg`',
            'tag`\\xAg${0}right`',
            'tag`left${0}\\xAg`',
            'tag`left${0}\\xAg${1}right`',
            'tag`\\u0`',
            'tag`\\u0${0}right`',
            'tag`left${0}\\u0`',
            'tag`left${0}\\u0${1}right`',
            'tag`\\u0g`',
            'tag`\\u0g${0}right`',
            'tag`left${0}\\u0g`',
            'tag`left${0}\\u0g${1}right`',
            'tag`\\u00g`',
            'tag`\\u00g${0}right`',
            'tag`left${0}\\u00g`',
            'tag`left${0}\\u00g${1}right`',
            'tag`\\u000g`',
            'tag`\\u000g${0}right`',
            'tag`left${0}\\u000g`',
            'tag`left${0}\\u000g${1}right`',
            'tag`\\u{}`',
            'tag`\\u{}${0}right`',
            'tag`left${0}\\u{}`',
            'tag`left${0}\\u{}${1}right`',
            'tag`\\u{-0}`',
            'tag`\\u{-0}${0}right`',
            'tag`left${0}\\u{-0}`',
            'tag`left${0}\\u{-0}${1}right`',
            'tag`\\u{g}`',
            'tag`\\u{g}${0}right`',
            'tag`left${0}\\u{g}`',
            'tag`left${0}\\u{g}${1}right`',
            'tag`\\u{0`',
            'tag`\\u{0${0}right`',
            'tag`left${0}\\u{0`',
            'tag`left${0}\\u{0${1}right`',
            'tag`\\u{\\u{0}`',
            'tag`\\u{\\u{0}${0}right`',
            'tag`left${0}\\u{\\u{0}`',
            'tag`left${0}\\u{\\u{0}${1}right`',
            'tag`\\u{110000}`',
            'tag`\\u{110000}${0}right`',
            'tag`left${0}\\u{110000}`',
            'tag`left${0}\\u{110000}${1}right`',
            'tag` ${tag`\\u`}`',
            //"tag` ``\\u`",
            'tag`\\u`` `',
            //"tag`\\u``\\u`",
            '` ${tag`\\u`}`',
            //"` ``\\u`",
        ];
        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; ${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
                });
            });
        }

        pass('`\n\r\n\r`', Context.OptionsRaw, {
            source: '`\n\r\n\r`',
            expected: {
                  body: [
                    {
                      expression: {
                        expressions: [],
                        quasis: [
                         {
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                              cooked: '\n\r\n\r',
                              raw: '\n\r\n\r',
                            }
                          }
                        ],
                        type: 'TemplateLiteral',
                      },
                      type: 'ExpressionStatement'
                    },
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

    });
});
