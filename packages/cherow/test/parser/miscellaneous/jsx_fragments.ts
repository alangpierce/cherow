import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - JSX Fragments', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failure', () => {});

  describe('Pass', () => {

    const validSyntax = [
      `<></>`,
      `<    ></   >`,
      `< /*starting wrap*/ ></ /*ending wrap*/>;`,
      `<>hi</>;`,
      `<><div>JSXElement</div>JSXText{'JSXExpressionContainer'}</>`,
      `<><span>hi</span><div>bye</div></>;`,
      `<><span>1</span><><span>2.1</span><span>2.2</span></><span>3</span></>;`,
      `<><span> hi </span> <div>bye</div> </>`,
      `<
        // SingleLine
        /* MultiLine */
        >
         <div></div>
          <div></div>
        </>`,
        `<>
        <>
          <>
           Ghost!
          </>
        </>
      </>`,
      `<>
      <>
        <>
          super deep
        </>
      </>
    </>`,
    `<>
    <td>Hello</td>
    <td>World</td>
  </>`,
    `<React.Fragment>
    <ChildA />
    <ChildB />
    <ChildC />
  </React.Fragment>`,
  `<dl>
  {props.items.map(item => (
    <React.Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </React.Fragment>
  ))}
</dl>`
    ];
    for (const arg of validSyntax) {
      // Sloppy mode
      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parseSource(`${arg}`, undefined, Context.OptionsJSX);
          });
      });

      // Module Code
      it(`${arg}`, () => {
        t.doesNotThrow(() => {
            parseSource(`${arg}`, undefined, Context.OptionsJSX | Context.Strict | Context.Module);
        });
    });
    }

});
});
