import S from "@sanity/desk-tool/structure-builder";
import MdSettings from "react-icons/lib/md/settings";
import MdPerson from "react-icons/lib/md/person";

const hiddenDocTypes = listItem =>
  !["category", "author", "article", "settings"].includes(listItem.getId());

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Settings")
        .icon(MdSettings)
        .child(
          S.editor()
            .id("settings")
            .schemaType("settings")
            .documentId("settings")
        ),
      S.listItem()
        .title("Articles")
        .schemaType("article")
        .child(S.documentTypeList("article").title("Articles")),
      // S.listItem()
      //   .title("Authors")
      //   .icon(MdPerson)
      //   .schemaType("author")
      //   .child(S.documentTypeList("author").title("Authors")),
      // S.listItem()
      //   .title("Categories")
      //   .schemaType("category")
      //   .child(S.documentTypeList("category").title("Categories")),
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ]);
