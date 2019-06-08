export const articleMetadata = {
  name: 'article.metadata',
  type: 'object',
  title: 'Article Metadata',
  fields: [
    {
      type: 'string',
      name: 'headerRatio',
      title: 'Header ratio',
      options: {
        list: ['1:1', '2:3', '3:4', '4:3', '3:2'],
        layout: 'radio'
      }
    },
    {
      type: 'color',
      name: 'fg',
      title: 'Foreground'
    },
    {
      type: 'color',
      name: 'bg',
      title: 'Background'
    }
  ]
}
