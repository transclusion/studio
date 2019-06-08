import S from '@sanity/desk-tool/structure-builder'
import MdSettings from 'react-icons/lib/md/settings'
import MdGroup from 'react-icons/lib/md/group'

const hiddenDocTypes = listItem =>
  !['category', 'person', 'article', 'settings'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('settings')
            .schemaType('settings')
            .documentId('settings')
        ),
      S.listItem()
        .title('Articles')
        .schemaType('article')
        .child(S.documentTypeList('article').title('Articles')),
      S.listItem()
        .title('People')
        .icon(MdGroup)
        .schemaType('person')
        .child(S.documentTypeList('person').title('People')),
      // S.listItem()
      //   .title("Categories")
      //   .schemaType("category")
      //   .child(S.documentTypeList("category").title("Categories")),
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
