import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - HTML Comments', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('invalidModuleCode', () => {

        const invalidModuleCode = [
            `<!-- test --->`,
            `;-->`,
            `---*/
       -->`,

           ];

        for (const arg of invalidModuleCode) {

               it(`${arg}`, () => {
                   t.throws(() => {
                       parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
                   });
               });
           }

        const invalidSyntax = [
            `/*
            */ the comment should not include these characters, regardless of AnnexB extensions -->`,
            ';-->'

           ];

        for (const arg of invalidSyntax) {

               it(`${arg}`, () => {
                   t.throws(() => {
                       parseSource(`${arg}`, undefined, Context.Empty);
                   });
               });
           }
    });

    describe('Pass', () => {

        const validSyntax = [
         // Babylon issue: https://github.com/babel/babel/issues/7802
         `<!-- test --->`,
         '<!-- HTML comment (not ECMA)',
         '--> HTML comment',
         'x = -1 <!--x;',
         '<!--the comment extends to these characters',
         '<!--',
         '/**/ /* second optional SingleLineDelimitedCommentSequence */-->the comment extends to these characters',
         '/* optional SingleLineDelimitedCommentSequence */-->the comment extends to these characters',
         '-->',
         '-->[0];',
         `Function("-->", "");`,
         `/*
         */-->`,
         '0/*\n*/--> a comment',
         '/* block comment */--> comment',
         ' \t /* block comment */  --> comment',
         ' \t --> comment',
         '<!-- foo',
         '--> comment'

        ];

        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }
   });
});
