import { pass } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - JSX', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    const invalidSyntax = [
        `<1/>`,
        `<div>one</div><div>two</div>`,
        '<a foo="bar',
        `<{...b} {...a }>{...b}</{...b}>`,
        '<a:b.c />',
        `</>`, // fragment
        `<div foo="foo" bar={} baz="baz"/>`,
        `<foo.bar></foo.baz>`,
        '<path></svg:path>',
        'node = <strong></em>',
        '<a>',
        `<a/!`,
        '<img src={}>',
        '<div></div><div></div>' ,
        `<a b=: />`,
        `<svg:path></svg:circle>`,
        'var x = <div>one</div><div>two</div>',
        `<xyz. />`,
        `<.abc />`,
        `<:path />`,
        '<foo bar="',
        '<foo bar={} />',
        '<Foo></Bar>',
        '<Foo bar=bar() />',
        '<a foo="bar',
        '<a b=: />',
        '<dd><e></e></dddd>;',
        '<f><g/></ff>;',
        '<b.b></b>;',
        '<a[foo]></a[foo]>',
        '<div {...props}>stuff</div {...props}>',
        '<div></span>',
        `<{...b} {...a }>{...b}</{...b}>`,
        '<a:b.c />',
        '<div className"app">',
        '</>',
        '<a: />',
        '<:a />',
        '<a b=d />',
        '<a></b>',
        '<a foo="bar',
        '<a:b></b>',
        '<a:b.c></a:b.c>',
        '<a.b:c></a.b:c>',
        '<a.b.c></a>',
        '<.a></.a>',
        '<a.></a.>',
        '<a[foo]></a[foo]>',
        '<a[\'foo\']></a[\'foo\']>',
        '<a><a />',
        '<a b={}>',
        'var x = <div>one</div><div>two</div>;',
        'var x = <div>one</div> /* intervening comment */ <div>two</div>;',
        '<span className="a", id="b" />',
        '<div className"app">',
        '<div {props} />',
        '<div>stuff</div {...props}>',
        '<div {...props}>stuff</div {...props}>',
        '<a b=}>',
        '<a b=<}>',
        '<a .../*hai*/asdf/>',
        '<a[b.c] d={e.f} />;',
        `</div><li>Item 1</li><li>Item 1</li></div>`,
    ];

    for (const arg of invalidSyntax) {

       // Sloppy mode
      it(`${arg}`, () => {
        t.throws(() => {
            parseSource(`${arg}`, undefined, Context.OptionsJSX);
        });
    });

    // Module Code
      it(`${arg}`, () => {
      t.throws(() => {
          parseSource(`${arg}`, undefined, Context.OptionsJSX | Context.Strict | Context.Module);
      });
  });
    }
  });

describe('Pass', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

      const validSyntax = [
        '<a>></a>',
        '<a> ></a>',
        '<a>}</a>',
          '<div />',
          // Acorn JSX issue: https://github.com/RReverser/acorn-jsx/issues/82
          'function* test() { yield <Hey />;    }',
          'function* test() { yield (<Hey />); }',
          // Acorn JSX issue: https://github.com/RReverser/acorn-jsx/issues/75
          '<div>{...children}</div>',
          `<div {...c}> {...children}{a}{...b}</div>`,
          `<svg:path/>`,
          `<svg:path></svg:path>`,
          `<MyButton color="blue" shadowSize={2}> Click Me </MyButton>`,
          `<div className="sidebar" />`,
          `function a() { return <b.c d="e" />; }`,
          `<a>{}</a>`,
          '<div>{0}</div>;',
          `<div><li>Item 1</li><li>Item 1</li></div>`,
          `<div style={{color: 'red', fontWeight: 'bold'}} />`,
          ` <h1>Hello {data.target}</h1>`,
          `<div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
          <h1>Move the mouse around!</h1>
          <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
        </div>`,
        `<Mouse>
        {mouse => (
          <p>The mouse position is {mouse.x}, {mouse.y}</p>
        )}
      </Mouse>`,
      `var div = (
				<div>
					{ images.map( src => <img src={src}/> ) }
				</div>
      );`,
      `var element = <Hello name={name}/>;`,
      `var element = <Foo.Bar name={name}/>;`,
      `var img = <img src='foo.gif'/>;`,
      `var element = <div data-name={name}/>;`,
      `var div = <div contentEditable />;`,
      `var element = <div a={1} {...props} {...stuff} />;`,
      `var element = <div a={1} {...props} b={2} c={3} {...stuff} more={things} />;`,
      `<div {...this.props}/>`,
      `<Foo> <h1>Hello {name}!</h1>   </Foo>`,
      `
			<div>
				<a>1&lt;</a>&nbsp;
			</div>
		`,
      `
			<Thing two={"This no longer fails"} {...props}></Thing>
    `,
    `
			/* @jsx customPragma */
			var div = <div>Hello</div>
    `,
    `
			/* @jsx customPragma */
			/* @jsx customPragmaWannabe */
			var div = <div>Hello</div>
		`,
      `<h1>
				Hello {name}
				!
			</h1>`,
      `var div = (
				<div className='foo'>
					<img src='foo.gif'/>
					<img src='bar.gif'/>
				</div>
			);`,
      '<Foo> {true} </Foo>',
      'const El = (props) => ( <div>props.x</div>);',
      '<Component {...props} y={1} />',
      '<Component {...{...props, y: 1 }} />',
      '<Test {...{a: \'foo\'}} {...{b: 123}} />;',
      '<View {...this.props} {...this.state} />',
      `class Greeting extends React.Component {
        render() {
          return <h1>Hello, {this.props.name}</h1>;
        }
      }`,
        `<img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />`,
          '<MyComponent>Hello world!</MyComponent>',
          `<Test.X></Test.X>`,
          '<a>{ }</a>',
          '<a>{b}</a>',
          `<span {... style}></span>`,
          `<input disabled />`,
          '<img width={320}/>',
          `<img src='logo.png' />`,
          'let child = <img src={url} key="img" />;',
          `<b>{1}</b>`,
          '<a />',
          '<n:a n:v />',
          '<a n:foo="bar"> {value} <b><c /></b></a>',
          '<a b={" "} c=" " d="&amp;" e="id=1&group=2" f="&#123456789" g="&#123*;" h="&#x;" />',
          '<a b="&notanentity;" />',
          '<a\n/>',
          '<日本語></日本語>',
          '<AbC-def\n  test="&#x0026;&#38;">\nbar\nbaz\r\n</AbC-def>',
          '<a b={x ? <c /> : <d />} />',
          '<a>{}</a>',
          'const foo = () => <x />; ',
          '<a>{\r\n}</a>',
          '<a>{/* this is a comment */}</a>',
          '<a>{/* this\nis\na\nmulti-line\ncomment */}</a>',
          '<div>@test content</div>',
          '<div><br />7x invalid-js-identifier</div>',
          '<LeftRight left=<a /> right=<b>monkeys</b> />',
          '<a.b></a.b>',
          '<a.b.c></a.b.c>',
          '(<div />) < x;',
          '<div {...props} />',
          '<div {...props} post="attribute" />',
          '<div pre="leading" pre2="attribute" {...props}></div>',
          '<a>    </a>',
          '<a>= == =</a>',
          `<title>{ {caption} }</title>`,
          `"use strict"; <async />`,
          `<this />`,
          `var src = "<div title='café'></div>";`,
          `<Switch checkedChildren="开" unCheckedChildren={'关'} />`,
          `<Foo:Bar />;
          <Foo:Bar></Foo:Bar>`,
          '<n:a n:v />',
          '<a n:foo="bar"> {value} <b><c /></b></a>',
          '<a b={" "} c=" " d="&amp;" e="&ampr;" />',
          '<a\n/>',
          '<日本語></日本語>',
          '<p>foo <a href="test"> bar</a> baz</p> ;',
          '<div pre="leading" pre2="attribute" {...props}></div>',
          '<div {...props} post="attribute" />',
          '(<div />) < x;',
          '<a.b.c></a.b.c>',
          '<a.b></a.b>',
          `<AbC-def
  test="&#x0026;&#38;">
bar
baz
</AbC-def>`,
          '<LeftRight left=<a /> right=<b>monkeys /> gorillas</b> />',
          '<div><br />7x invalid-js-identifier</div>',
          '<div>@test content</div>',
          '<a>{/* this is a comment */}</a>',
          '<a b={x ? <c /> : <d />} />',
          '<AbC-def\n  test="&#x0026;&#38;">\nbar\nbaz\n</AbC-def>',
          '<A aa={aa.bb.cc} bb={bb.cc.dd}><div>{aa.b}</div></A>',
          `<div> prefix {...children} suffix </div>`,
          `<div {...children}></div>`,
          `<div {...a }>{...b}</div>`,
          `var component = <Component {...props} />;`,
          `<a:b><a:b></a:b></a:b>;`,
          `<a:b></a:b>;`,
          '<foo bar=<baz.zoo></baz.zoo> />',
          '<a href="/" />',
          '<a href={link}></a>',
          '<span {... style}></span>',
          '<adele>{/* Hello from this side */}</adele>',
          '<body>{}</body>',
          'var el = ( <span /> )',
          '<A.B.C.D.E.foo-bar />',
          '<a>  <b><c/></b> </a>',
          `<em>
One
Two
Three
</em>`,
          '<title>{$caption}</title>',
          '<earth.america />',
          '<strong></strong>',
          '<b>Hello</b>',
          `<a
/>`,
          '<a>{`${1}`}</a>',
          'function *g() { yield <h1>Hello</h1> }',
          `function*it(){ yield <a></a>; }`,
          `class SayHello extends React.Component {
            constructor(props) {
              super(props);
              this.state = {message: 'Hello!'};
              // This line is important!
              this.handleClick = this.handleClick.bind(this);
            }

            handleClick() {
              alert(this.state.message);
            }

            render() {
              // Because "this.handleClick" is bound, we can use it as an event handler.
              return (
                <button onClick={this.handleClick}>
                  Say hello
                </button>
              );
            }
          }`
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

      pass('<b>{1}</b>', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
        source: '<b>{1}</b>',
        expected: {
          type: 'Program',
          start: 0,
          end: 10,
          body: [
            {
              type: 'ExpressionStatement',
              start: 0,
              end: 10,
              expression: {
                type: 'JSXElement',
                start: 0,
                end: 10,
                openingElement: {
                  type: 'JSXOpeningElement',
                  start: 0,
                  end: 3,
                  attributes: [],
                  name: {
                    type: 'JSXIdentifier',
                    start: 1,
                    end: 2,
                    name: 'b'
                  },
                  selfClosing: false
                },
                closingElement: {
                  type: 'JSXClosingElement',
                  start: 6,
                  end: 10,
                  name: {
                    type: 'JSXIdentifier',
                    start: 8,
                    end: 9,
                    name: 'b'
                  }
                },
                children: [
                  {
                    type: 'JSXExpressionContainer',
                    start: 3,
                    end: 6,
                    expression: {
                      type: 'Literal',
                      start: 4,
                      end: 5,
                      value: 1,
                      raw: '1'
                    }
                  }
                ]
              }
            }
          ],
          sourceType: 'script'
        }
      });

      pass('<a b={x ? <c /> : <d />} />', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
        source: '<a b={x ? <c /> : <d />} />',
        expected: {
            type: 'Program',
            start: 0,
            end: 27,
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 27,
                expression: {
                  type: 'JSXElement',
                  start: 0,
                  end: 27,
                  openingElement: {
                    type: 'JSXOpeningElement',
                    start: 0,
                    end: 27,
                    attributes: [
                      {
                        type: 'JSXAttribute',
                        start: 3,
                        end: 24,
                        name: {
                          type: 'JSXIdentifier',
                          start: 3,
                          end: 4,
                          name: 'b'
                        },
                        value: {
                          type: 'JSXExpressionContainer',
                          start: 5,
                          end: 24,
                          expression: {
                            type: 'ConditionalExpression',
                            start: 6,
                            end: 23,
                            test: {
                              type: 'Identifier',
                              start: 6,
                              end: 7,
                              name: 'x'
                            },
                            consequent: {
                              type: 'JSXElement',
                              start: 10,
                              end: 15,
                              openingElement: {
                                type: 'JSXOpeningElement',
                                start: 10,
                                end: 15,
                                attributes: [],
                                name: {
                                  type: 'JSXIdentifier',
                                  start: 11,
                                  end: 12,
                                  name: 'c'
                                },
                                selfClosing: true
                              },
                              closingElement: null,
                              children: []
                            },
                            alternate: {
                              type: 'JSXElement',
                              start: 18,
                              end: 23,
                              openingElement: {
                                type: 'JSXOpeningElement',
                                start: 18,
                                end: 23,
                                attributes: [],
                                name: {
                                  type: 'JSXIdentifier',
                                  start: 19,
                                  end: 20,
                                  name: 'd'
                                },
                                selfClosing: true
                              },
                              closingElement: null,
                              children: []
                            }
                          }
                        }
                      }
                    ],
                    name: {
                      type: 'JSXIdentifier',
                      start: 1,
                      end: 2,
                      name: 'a'
                    },
                    selfClosing: true
                  },
                  closingElement: null,
                  children: []
                }
              }
            ],
            sourceType: 'script'
          }
      });

      pass('<img width={320}/>', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
        source: '<img width={320}/>',
        expected: {
            type: 'Program',
            start: 0,
            end: 18,
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 18,
                expression: {
                  type: 'JSXElement',
                  start: 0,
                  end: 18,
                  openingElement: {
                    type: 'JSXOpeningElement',
                    start: 0,
                    end: 18,
                    attributes: [
                      {
                        type: 'JSXAttribute',
                        start: 5,
                        end: 16,
                        name: {
                          type: 'JSXIdentifier',
                          start: 5,
                          end: 10,
                          name: 'width'
                        },
                        value: {
                          type: 'JSXExpressionContainer',
                          start: 11,
                          end: 16,
                          expression: {
                            type: 'Literal',
                            start: 12,
                            end: 15,
                            value: 320,
                            raw: '320'
                          }
                        }
                      }
                    ],
                    name: {
                      type: 'JSXIdentifier',
                      start: 1,
                      end: 4,
                      name: 'img'
                    },
                    selfClosing: true
                  },
                  closingElement: null,
                  children: []
                }
              }
            ],
            sourceType: 'script'
          }
      });

      pass('<日本語></日本語>', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
        source: '<日本語></日本語>',
        expected: {
            type: 'Program',
            start: 0,
            end: 11,
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 11,
                expression: {
                  type: 'JSXElement',
                  start: 0,
                  end: 11,
                  openingElement: {
                    type: 'JSXOpeningElement',
                    start: 0,
                    end: 5,
                    attributes: [],
                    name: {
                      type: 'JSXIdentifier',
                      start: 1,
                      end: 4,
                      name: '日本語'
                    },
                    selfClosing: false
                  },
                  closingElement: {
                    type: 'JSXClosingElement',
                    start: 5,
                    end: 11,
                    name: {
                      type: 'JSXIdentifier',
                      start: 7,
                      end: 10,
                      name: '日本語'
                    }
                  },
                  children: []
                }
              }
            ],
            sourceType: 'script'
          }
      });

      pass('<Test.X></Test.X>', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
        source: '<Test.X></Test.X>',
        expected: {
            type: 'Program',
            start: 0,
            end: 17,
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 17,
                expression: {
                  type: 'JSXElement',
                  start: 0,
                  end: 17,
                  openingElement: {
                    type: 'JSXOpeningElement',
                    start: 0,
                    end: 8,
                    attributes: [],
                    name: {
                      type: 'JSXMemberExpression',
                      start: 1,
                      end: 7,
                      object: {
                        type: 'JSXIdentifier',
                        start: 1,
                        end: 5,
                        name: 'Test'
                      },
                      property: {
                        type: 'JSXIdentifier',
                        start: 6,
                        end: 7,
                        name: 'X'
                      }
                    },
                    selfClosing: false
                  },
                  closingElement: {
                    type: 'JSXClosingElement',
                    start: 8,
                    end: 17,
                    name: {
                      type: 'JSXMemberExpression',
                      start: 10,
                      end: 16,
                      object: {
                        type: 'JSXIdentifier',
                        start: 10,
                        end: 14,
                        name: 'Test'
                      },
                      property: {
                        type: 'JSXIdentifier',
                        start: 15,
                        end: 16,
                        name: 'X'
                      }
                    }
                  },
                  children: []
                }
              }
            ],
            sourceType: 'script'
          }
      });

      // Parses with raw identifiers options
      pass('<div><br />7x invalid-js-identifier</div>', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
            source: '<div><br />7x invalid-js-identifier</div>',
            expected: {
                type: 'Program',
                start: 0,
                end: 41,
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 41,
                    expression: {
                      type: 'JSXElement',
                      start: 0,
                      end: 41,
                      openingElement: {
                        type: 'JSXOpeningElement',
                        start: 0,
                        end: 5,
                        attributes: [],
                        name: {
                          type: 'JSXIdentifier',
                          start: 1,
                          end: 4,
                          name: 'div'
                        },
                        selfClosing: false
                      },
                      closingElement: {
                        type: 'JSXClosingElement',
                        start: 35,
                        end: 41,
                        name: {
                          type: 'JSXIdentifier',
                          start: 37,
                          end: 40,
                          name: 'div'
                        }
                      },
                      children: [
                        {
                          type: 'JSXElement',
                          start: 5,
                          end: 11,
                          openingElement: {
                            type: 'JSXOpeningElement',
                            start: 5,
                            end: 11,
                            attributes: [],
                            name: {
                              type: 'JSXIdentifier',
                              start: 6,
                              end: 8,
                              name: 'br'
                            },
                            selfClosing: true
                          },
                          closingElement: null,
                          children: []
                        },
                        {
                          type: 'JSXText',
                          start: 11,
                          end: 35,
                          value: '7x invalid-js-identifier',
                          raw: '7x invalid-js-identifier'
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
      });

      pass('<a.b></a.b>', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
        source: '<a.b></a.b>',
        expected: {
            type: 'Program',
            start: 0,
            end: 11,
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 11,
                expression: {
                  type: 'JSXElement',
                  start: 0,
                  end: 11,
                  openingElement: {
                    type: 'JSXOpeningElement',
                    start: 0,
                    end: 5,
                    attributes: [],
                    name: {
                      type: 'JSXMemberExpression',
                      start: 1,
                      end: 4,
                      object: {
                        type: 'JSXIdentifier',
                        start: 1,
                        end: 2,
                        name: 'a'
                      },
                      property: {
                        type: 'JSXIdentifier',
                        start: 3,
                        end: 4,
                        name: 'b'
                      }
                    },
                    selfClosing: false
                  },
                  closingElement: {
                    type: 'JSXClosingElement',
                    start: 5,
                    end: 11,
                    name: {
                      type: 'JSXMemberExpression',
                      start: 7,
                      end: 10,
                      object: {
                        type: 'JSXIdentifier',
                        start: 7,
                        end: 8,
                        name: 'a'
                      },
                      property: {
                        type: 'JSXIdentifier',
                        start: 9,
                        end: 10,
                        name: 'b'
                      }
                    }
                  },
                  children: []
                }
              }
            ],
            sourceType: 'script'
          }
      });

      pass('<LeftRight left=<a /> right=<b>monkeys</b> />', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
        source: '<LeftRight left=<a /> right=<b>monkeys</b> />',
        expected: {
            type: 'Program',
            start: 0,
            end: 45,
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 45,
                expression: {
                  type: 'JSXElement',
                  start: 0,
                  end: 45,
                  openingElement: {
                    type: 'JSXOpeningElement',
                    start: 0,
                    end: 45,
                    attributes: [
                      {
                        type: 'JSXAttribute',
                        start: 11,
                        end: 21,
                        name: {
                          type: 'JSXIdentifier',
                          start: 11,
                          end: 15,
                          name: 'left'
                        },
                        value: {
                          type: 'JSXElement',
                          start: 16,
                          end: 21,
                          openingElement: {
                            type: 'JSXOpeningElement',
                            start: 16,
                            end: 21,
                            attributes: [],
                            name: {
                              type: 'JSXIdentifier',
                              start: 17,
                              end: 18,
                              name: 'a'
                            },
                            selfClosing: true
                          },
                          closingElement: null,
                          children: []
                        }
                      },
                      {
                        type: 'JSXAttribute',
                        start: 22,
                        end: 42,
                        name: {
                          type: 'JSXIdentifier',
                          start: 22,
                          end: 27,
                          name: 'right'
                        },
                        value: {
                          type: 'JSXElement',
                          start: 28,
                          end: 42,
                          openingElement: {
                            type: 'JSXOpeningElement',
                            start: 28,
                            end: 31,
                            attributes: [],
                            name: {
                              type: 'JSXIdentifier',
                              start: 29,
                              end: 30,
                              name: 'b'
                            },
                            selfClosing: false
                          },
                          closingElement: {
                            type: 'JSXClosingElement',
                            start: 38,
                            end: 42,
                            name: {
                              type: 'JSXIdentifier',
                              start: 40,
                              end: 41,
                              name: 'b'
                            }
                          },
                          children: [
                            {
                              type: 'JSXText',
                              start: 31,
                              end: 38,
                              value: 'monkeys',
                              raw: 'monkeys'
                            }
                          ]
                        }
                      }
                    ],
                    name: {
                      type: 'JSXIdentifier',
                      start: 1,
                      end: 10,
                      name: 'LeftRight'
                    },
                    selfClosing: true
                  },
                  closingElement: null,
                  children: []
                }
              }
            ],
            sourceType: 'script'
          }
      });

      // Parses with raw identifiers options
      pass('(<div />)', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw | Context.OptionsRawidentifiers, {
        source: '(<div />)',
        expected: {
            type: 'Program',
            start: 0,
            end: 9,
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 9,
                expression: {
                  type: 'JSXElement',
                  start: 1,
                  end: 8,
                  openingElement: {
                    type: 'JSXOpeningElement',
                    start: 1,
                    end: 8,
                    attributes: [],
                    name: {
                      type: 'JSXIdentifier',
                      start: 2,
                      end: 5,
                      name: 'div',
                      raw: 'div'
                    },
                    selfClosing: true
                  },
                  closingElement: null,
                  children: []
                }
              }
            ],
            sourceType: 'script'
          }
      });

      pass('(<div />) < x;', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
        source: '(<div />) < x;',
        expected: {
            type: 'Program',
            start: 0,
            end: 14,
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 14,
                expression: {
                  type: 'BinaryExpression',
                  start: 0,
                  end: 13,
                  left: {
                    type: 'JSXElement',
                    start: 1,
                    end: 8,
                    openingElement: {
                      type: 'JSXOpeningElement',
                      start: 1,
                      end: 8,
                      attributes: [],
                      name: {
                        type: 'JSXIdentifier',
                        start: 2,
                        end: 5,
                        name: 'div'
                      },
                      selfClosing: true
                    },
                    closingElement: null,
                    children: []
                  },
                  operator: '<',
                  right: {
                    type: 'Identifier',
                    start: 12,
                    end: 13,
                    name: 'x'
                  }
                }
              }
            ],
            sourceType: 'script'
          }
      });

      pass('<b>Hello</b>', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
            source: '<b>Hello</b>',
            expected: {
                type: 'Program',
                start: 0,
                end: 12,
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 12,
                    expression: {
                      type: 'JSXElement',
                      start: 0,
                      end: 12,
                      openingElement: {
                        type: 'JSXOpeningElement',
                        start: 0,
                        end: 3,
                        attributes: [],
                        name: {
                          type: 'JSXIdentifier',
                          start: 1,
                          end: 2,
                          name: 'b'
                        },
                        selfClosing: false
                      },
                      closingElement: {
                        type: 'JSXClosingElement',
                        start: 8,
                        end: 12,
                        name: {
                          type: 'JSXIdentifier',
                          start: 10,
                          end: 11,
                          name: 'b'
                        }
                      },
                      children: [
                        {
                          type: 'JSXText',
                          start: 3,
                          end: 8,
                          value: 'Hello',
                          raw: 'Hello'
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
      });

      pass(`<em>
    One
    Two
    Three
    </em>`, Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
          source: `<em>
            One
            Two
            Three
            </em>`,
          expected: {
              body: [
                {
                  end: 72,
                  expression: {
                    children: [
                      {
                        end: 67,
                        raw: '\n            One\n            Two\n            Three\n            ',
                        start: 4,
                       type: 'JSXText',
                        value: '\n            One\n            Two\n            Three\n            ',
                      }
                    ],
                    closingElement: {
                      end: 72,
                      name: {
                        end: 71,
                        name: 'em',
                        start: 69,
                        type: 'JSXIdentifier',
                      },
                      start: 67,
                      type: 'JSXClosingElement',
                    },
                   end: 72,
                    openingElement: {
                      attributes: [],
                     end: 4,
                      name: {
                        end: 3,
                        name: 'em',
                        start: 1,
                        type: 'JSXIdentifier',
                      },
                      selfClosing: false,
                      start: 0,
                      type: 'JSXOpeningElement'
                   },
                    start: 0,
                    type: 'JSXElement'
                  },
                  start: 0,
                  type: 'ExpressionStatement'
                }
              ],
              end: 72,
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
      });

      pass(`<div> prefix {...children} suffix </div>`, Context.OptionsJSX | Context.OptionsRanges, {
          source: `<div> prefix {...children} suffix </div>`,
          expected: {
              body: [{
                  end: 40,
                  expression: {
                      children: [{
                              end: 13,
                              start: 5,
                              type: 'JSXText',
                              value: ' prefix ',
                          },
                          {
                              end: 26,
                              expression: {
                                  end: 25,
                                  name: 'children',
                                  start: 17,
                                  type: 'Identifier',
                              },
                              start: 14,
                              type: 'JSXSpreadChild',
                          },
                          {
                              end: 33,
                              start: 27,
                              type: 'JSXText',
                              value: 'suffix',
                          },
                          {
                              end: 34,
                              start: 33,
                              type: 'JSXText',
                              value: ' ',
                          }
                      ],
                      closingElement: {
                          end: 40,
                          name: {
                              end: 39,
                              name: 'div',
                              start: 36,
                              type: 'JSXIdentifier',
                          },
                          start: 34,
                          type: 'JSXClosingElement',
                      },
                      end: 40,
                      openingElement: {
                          attributes: [],
                          end: 5,
                          name: {
                              end: 4,
                              name: 'div',
                              start: 1,
                              type: 'JSXIdentifier',
                          },
                          selfClosing: false,
                          start: 0,
                          type: 'JSXOpeningElement',
                      },
                      start: 0,
                      type: 'JSXElement',
                  },
                  start: 0,
                  type: 'ExpressionStatement',
              }, ],
              end: 40,
              sourceType: 'script',
              start: 0,
              type: 'Program',
          }
      });

      pass('<america state=<usa.california></usa.california> />', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
          source: '<america state=<usa.california></usa.california> />',
          expected: {
              type: 'Program',
              start: 0,
              end: 51,
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 51,
                  expression: {
                      type: 'JSXElement',
                      start: 0,
                      end: 51,
                      openingElement: {
                          type: 'JSXOpeningElement',
                          start: 0,
                          end: 51,
                          attributes: [{
                              type: 'JSXAttribute',
                              start: 9,
                              end: 48,
                              name: {
                                  type: 'JSXIdentifier',
                                  start: 9,
                                  end: 14,
                                  name: 'state'
                              },
                              value: {
                                  type: 'JSXElement',
                                  start: 15,
                                  end: 48,
                                  openingElement: {
                                      type: 'JSXOpeningElement',
                                      start: 15,
                                      end: 31,
                                      attributes: [],
                                      name: {
                                          type: 'JSXMemberExpression',
                                          start: 16,
                                          end: 30,
                                          object: {
                                              type: 'JSXIdentifier',
                                              start: 16,
                                              end: 19,
                                              name: 'usa'
                                          },
                                          property: {
                                              type: 'JSXIdentifier',
                                              start: 20,
                                              end: 30,
                                              name: 'california'
                                          }
                                      },
                                      selfClosing: false
                                  },
                                  closingElement: {
                                      type: 'JSXClosingElement',
                                      start: 31,
                                      end: 48,
                                      name: {
                                          type: 'JSXMemberExpression',
                                          start: 33,
                                          end: 47,
                                          object: {
                                              type: 'JSXIdentifier',
                                              start: 33,
                                              end: 36,
                                              name: 'usa'
                                          },
                                          property: {
                                              type: 'JSXIdentifier',
                                              start: 37,
                                              end: 47,
                                              name: 'california'
                                          }
                                      }
                                  },
                                  children: []
                              }
                          }],
                          name: {
                              type: 'JSXIdentifier',
                              start: 1,
                              end: 8,
                              name: 'america'
                          },
                          selfClosing: true
                      },
                      closingElement: null,
                      children: []
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`<img src='logo.png' />`, Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
          source: `<img src='logo.png' />`,
          expected: {
              type: 'Program',
              start: 0,
              end: 22,
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 22,
                  expression: {
                      type: 'JSXElement',
                      start: 0,
                      end: 22,
                      openingElement: {
                          type: 'JSXOpeningElement',
                          start: 0,
                          end: 22,
                          attributes: [{
                              type: 'JSXAttribute',
                              start: 5,
                              end: 19,
                              name: {
                                  type: 'JSXIdentifier',
                                  start: 5,
                                  end: 8,
                                  name: 'src'
                              },
                              value: {
                                  type: 'Literal',
                                  start: 8,
                                  end: 19,
                                  value: 'logo.png',
                                  raw: '\'logo.png\''
                              }
                          }],
                          name: {
                              type: 'JSXIdentifier',
                              start: 1,
                              end: 4,
                              name: 'img'
                          },
                          selfClosing: true
                      },
                      closingElement: null,
                      children: []
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`<input disabled />`, Context.OptionsJSX | Context.OptionsRanges, {
          source: `<input disabled />`,
          expected: {
              type: 'Program',
              start: 0,
              end: 18,
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 18,
                  expression: {
                      type: 'JSXElement',
                      start: 0,
                      end: 18,
                      openingElement: {
                          type: 'JSXOpeningElement',
                          start: 0,
                          end: 18,
                          attributes: [{
                              type: 'JSXAttribute',
                              start: 7,
                              end: 15,
                              name: {
                                  type: 'JSXIdentifier',
                                  start: 7,
                                  end: 15,
                                  name: 'disabled'
                              },
                              value: null
                          }],
                          name: {
                              type: 'JSXIdentifier',
                              start: 1,
                              end: 6,
                              name: 'input'
                          },
                          selfClosing: true
                      },
                      closingElement: null,
                      children: []
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`<span {... style}></span>`, Context.OptionsJSX | Context.OptionsRanges, {
          source: `<span {... style}></span>`,
          expected: {
              type: 'Program',
              start: 0,
              end: 25,
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 25,
                  expression: {
                      type: 'JSXElement',
                      start: 0,
                      end: 25,
                      openingElement: {
                          type: 'JSXOpeningElement',
                          start: 0,
                          end: 18,
                          attributes: [{
                              type: 'JSXSpreadAttribute',
                              start: 6,
                              end: 17,
                              argument: {
                                  type: 'Identifier',
                                  start: 11,
                                  end: 16,
                                  name: 'style'
                              }
                          }],
                          name: {
                              type: 'JSXIdentifier',
                              start: 1,
                              end: 5,
                              name: 'span'
                          },
                          selfClosing: false
                      },
                      closingElement: {
                          type: 'JSXClosingElement',
                          start: 18,
                          end: 25,
                          name: {
                              type: 'JSXIdentifier',
                              start: 20,
                              end: 24,
                              name: 'span'
                          }
                      },
                      children: []
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('<a>{}</a>', Context.OptionsJSX | Context.OptionsRanges, {
          source: '<a>{}</a>',
          expected: {
              type: 'Program',
              start: 0,
              end: 9,
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 9,
                  expression: {
                      type: 'JSXElement',
                      start: 0,
                      end: 9,
                      openingElement: {
                          type: 'JSXOpeningElement',
                          start: 0,
                          end: 3,
                          attributes: [],
                          name: {
                              type: 'JSXIdentifier',
                              start: 1,
                              end: 2,
                              name: 'a'
                          },
                          selfClosing: false
                      },
                      closingElement: {
                          type: 'JSXClosingElement',
                          start: 5,
                          end: 9,
                          name: {
                              type: 'JSXIdentifier',
                              start: 7,
                              end: 8,
                              name: 'a'
                          }
                      },
                      children: [{
                          type: 'JSXExpressionContainer',
                          start: 3,
                          end: 5,
                          expression: {
                              type: 'JSXEmptyExpression',
                              start: 4,
                              end: 4
                          }
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('<SolarSystem.Earth.America.USA.California.mountain-view />', Context.OptionsJSX | Context.OptionsRanges, {
        source: '<SolarSystem.Earth.America.USA.California.mountain-view />',
        expected: {
          type: 'Program',
          start: 0,
          end: 58,
          body: [
            {
              type: 'ExpressionStatement',
              start: 0,
              end: 58,
              expression: {
                type: 'JSXElement',
                start: 0,
                end: 58,
                openingElement: {
                  type: 'JSXOpeningElement',
                  start: 0,
                  end: 58,
                  attributes: [],
                  name: {
                    type: 'JSXMemberExpression',
                    start: 1,
                    end: 55,
                    object: {
                      type: 'JSXMemberExpression',
                      start: 1,
                      end: 41,
                      object: {
                        type: 'JSXMemberExpression',
                        start: 1,
                        end: 30,
                        object: {
                          type: 'JSXMemberExpression',
                          start: 1,
                          end: 26,
                          object: {
                            type: 'JSXMemberExpression',
                            start: 1,
                            end: 18,
                            object: {
                              type: 'JSXIdentifier',
                              start: 1,
                              end: 12,
                              name: 'SolarSystem'
                            },
                            property: {
                              type: 'JSXIdentifier',
                              start: 13,
                              end: 18,
                              name: 'Earth'
                            }
                          },
                          property: {
                            type: 'JSXIdentifier',
                            start: 19,
                            end: 26,
                            name: 'America'
                          }
                        },
                        property: {
                          type: 'JSXIdentifier',
                          start: 27,
                          end: 30,
                          name: 'USA'
                        }
                      },
                      property: {
                        type: 'JSXIdentifier',
                        start: 31,
                        end: 41,
                        name: 'California'
                      }
                    },
                    property: {
                      type: 'JSXIdentifier',
                      start: 42,
                      end: 55,
                      name: 'mountain-view'
                    }
                  },
                  selfClosing: true
                },
                closingElement: null,
                children: []
              }
            }
          ],
          sourceType: 'script'
        }
    });

});
