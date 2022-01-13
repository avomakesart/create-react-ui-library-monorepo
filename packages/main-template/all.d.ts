declare module '*.mdx' {
  const resource: { [key: string]: string }
  export = resource
}

declare module 'storybook-addon-react-live-edit'
declare module 'storybook-addon-react-live-edit/dist/withLiveEditScope'