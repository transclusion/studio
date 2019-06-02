export const settings = {
  name: "settings",
  type: "document",
  title: "Settings",
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
  fields: [
    {
      name: "baseUrl",
      type: "string",
      title: "Base URL"
    },
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "Describe your blog for search engines and social media."
    },
    {
      name: "seo",
      type: "seo",
      title: "SEO"
    }
    // {
    //   name: "author",
    //   type: "reference",
    //   description: "Publish an author and set a reference to them here.",
    //   title: "Author",
    //   to: [{ type: "author" }]
    // }
  ]
};
