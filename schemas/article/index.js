export * from './author'
export * from './body'
export * from './excerpt'
export * from './metadata'

export const article = {
  type: 'document',
  name: 'article',
  title: 'Article',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      type: 'array',
      name: 'authors',
      title: 'Authors',
      of: [{type: 'article.author'}]
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'This can be used to schedule post for publishing'
    },
    {
      name: 'excerpt',
      type: 'article.excerpt',
      title: 'Excerpt',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.'
    },
    {
      name: 'body',
      type: 'article.body',
      title: 'Body'
    },
    {
      name: 'metadata',
      type: 'article.metadata',
      title: 'Metadata'
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO'
    }
  ]
}
