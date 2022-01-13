const path = require('path')

const here = (...p) => path.join(__dirname, ...p)

module.exports = plop => {
  plop.setGenerator('package', {
    description: 'generate a new @my-react-ui-library/react- scoped package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Package name (@my-react-ui-library/react-[name]):',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description for the package.json and README.md:',
      },
      {
        type: 'input',
        name: 'author',
        message:
          'Author name and email for the package.json: (for example: "Your Name <your@email.com>"):',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: here('packages/{{name}}'),
        templateFiles: here('other/package-template'),
        base: here('other/package-template'),
      },
      function logManualWork(answers) {
        // prettier-ignore
        return [
          '',
          'Done, but some manual work remains',
          `- If the ${answers.name} package wont have tests, remove the __tests__ directory`,
          `- Update ./packages/${answers.name}/README.md with a usage example`,
          `- Make sure the ./packages/${answers.name}/package.json has the correct listed dependencies, devDependencies, and peerDependencies`,
          `- From the root of the repository, run "npx lerna bootstrap" to get the package dependencies installed`,
          `- Update title and id value to the desired path ./packages/${answers.name}/docs/${answers.name}.stories.tsx`
        ].join('\n')
      },
    ],
  })
}
