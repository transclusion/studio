export default {
  widgets: [
    {name: 'structure-menu'},
    {
      name: 'zeit/deployments',
      options: {
        projectId: 'QmYr8hgzidSZeu2ggUoHAJb2u6wL1tymAwmKiix9Rm74ao',
        teamId: 'team_ZFbTi9jEAfKNwkjn0KYNtJuo',
        signinUrl: '/api/zeit/oauth/signin',
        signoutUrl: '/api/zeit/oauth/signout',
        tokensUrl: '/api/zeit/oauth/tokens'
      }
    },
    {
      name: 'zeit/deployments',
      options: {
        projectId: 'QmbSuayTqpZsNzst7EywLskxEqcCbTwT2arUUsPGHfcxZ7',
        teamId: 'team_ZFbTi9jEAfKNwkjn0KYNtJuo',
        signinUrl: '/api/zeit/oauth/signin',
        signoutUrl: '/api/zeit/oauth/signout',
        tokensUrl: '/api/zeit/oauth/tokens'
      }
    },
    {
      name: 'ga/graph',
      options: {
        profileId: 'ga:196245173',
        signinUrl: '/api/google/oauth/signin',
        signoutUrl: '/api/google/oauth/signout',
        tokensUrl: '/api/google/oauth/tokens'
      }
    },
    {
      name: 'ga/realtime',
      options: {
        profileId: 'ga:196245173',
        signinUrl: '/api/google/oauth/signin',
        signoutUrl: '/api/google/oauth/signout',
        tokensUrl: '/api/google/oauth/tokens'
      }
    },
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
