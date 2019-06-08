export const articleAuthor = {
  name: 'article.author',
  type: 'object',
  title: 'Article Author',
  fields: [
    {
      type: 'reference',
      name: 'person',
      title: 'Person',
      to: [{type: 'person'}]
    },
    {
      type: 'string',
      name: 'role',
      title: 'Role'
    }
  ],
  preview: {
    select: {
      firstName: 'person.firstName',
      lastName: 'person.lastName',
      role: 'role',
      media: 'person.image'
    },
    prepare ({firstName, lastName, media, role}) {
      return {
        title: [firstName, lastName].filter(Boolean).join(' '),
        subtitle: role,
        media
      }
    }
  }
}
