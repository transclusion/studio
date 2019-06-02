import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import { seo } from "./_global/seo";
import {
  article,
  articleBody,
  articleExcerpt,
  articleMetadata
} from "./article";
import { settings } from "./settings";

export default createSchema({
  name: "simplestore",
  types: schemaTypes.concat([
    article,
    articleBody,
    articleExcerpt,
    articleMetadata,
    seo,
    settings
  ])
});
