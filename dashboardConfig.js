export default {
  widgets: [
    {
      name: 'ga/realtime',
      options: {
        profileId: 'ga:196245173',
        signinUrl: '/api/google/oauth/signin',
        signoutUrl: '/api/google/oauth/signout',
        tokensUrl: '/api/google/oauth/tokens'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        data: [
          {
            category: 'Code',
            title: 'Studio',
            value: 'https://github.com/transclusion/studio'
          },
          {
            category: 'Code',
            title: 'Website',
            value: 'https://github.com/transclusion/web'
          },
          {
            category: 'Sites',
            title: 'Site',
            value: 'https://transclusion.org'
          }
        ]
      }
    },
    {name: 'project-users'},
    {
      name: 'document-list',
      options: {
        title: 'Articles',
        order: '_updatedAt desc',
        types: ['article']
      }
    },
    {
      name: 'document-list',
      options: {
        title: 'People',
        order: '_updatedAt desc',
        types: ['person']
      }
    }
  ]
}
