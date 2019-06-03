import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import { seo } from "./_global/seo";
import {
  article,
  articleAuthor,
  articleBody,
  articleExcerpt,
  articleMetadata
} from "./article";
import { person } from "./person";
import { settings } from "./settings";

export default createSchema({
  name: "simplestore",
  types: schemaTypes.concat([
    article,
    articleAuthor,
    articleBody,
    articleExcerpt,
    articleMetadata,
    person,
    seo,
    settings
  ])
});
