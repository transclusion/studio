export const seo = {
  type: 'object',
  name: 'seo',
  title: 'SEO',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title'
    },
    {
      type: 'text',
      name: 'description',
      title: 'Description'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image'
    }
  ]
}
