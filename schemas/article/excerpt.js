export const articleExcerpt = {
  name: "article.excerpt",
  type: "array",
  title: "Article Excerpt",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" }
        ],
        annotations: []
      }
    }
  ]
};
