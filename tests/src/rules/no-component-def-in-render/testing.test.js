const valid = [
  {
    description: "test using test",
    code: `
      test('test', () => {
        const Component = () => <div>Hi!</div>;

        render(<Component />);
      });
    `,
  },
  {
    description: "test using it",
    code: `
      it('test', () => {
        const Component = () => <div>Hi!</div>;

        render(<Component />);
      });
    `,
  },
  {
    description: "test using describe",
    code: `
      describe('description', () => {
        it('test', () => {
          const Component = () => <div>Hi!</div>;

          render(<Component />);
        });
      })
    `,
  },
];

const invalid = [];

export { valid, invalid };
