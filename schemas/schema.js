import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import * as _global from './_global'
import * as article from './article'
import * as person from './person'
import * as settings from './settings'

export default createSchema({
  name: 'transclusion',
  types: schemaTypes.concat([
    ...Object.values(_global),
    ...Object.values(article),
    ...Object.values(person),
    ...Object.values(settings)
  ])
})
