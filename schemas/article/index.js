export const articleAuthor = {
  name: "article.author",
  type: "object",
  title: "Article Author",
  fields: [
    {
      type: "reference",
      name: "person",
      title: "Person",
      to: [{ type: "person" }]
    },
    {
      type: "string",
      name: "role",
      title: "Role"
    }
  ],
  preview: {
    select: {
      firstName: "person.firstName",
      lastName: "person.lastName",
      role: "role",
      media: "person.image"
    },
    prepare({ firstName, lastName, media, role }) {
      return {
        title: [firstName, lastName].filter(Boolean).join(" "),
        subtitle: role,
        media
      };
    }
  }
};

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

export const articleMetadata = {
  name: "article.metadata",
  type: "object",
  title: "Article Metadata",
  fields: [
    {
      type: "string",
      name: "headerRatio",
      title: "Header ratio",
      options: {
        list: ["1:1", "2:3", "3:4", "4:3", "3:2"],
        layout: "radio"
      }
    },
    {
      type: "color",
      name: "fg",
      title: "Foreground"
    },
    {
      type: "color",
      name: "bg",
      title: "Background"
    }
  ]
};

export const articleBody = {
  name: "article.body",
  type: "array",
  title: "Article Body",
  of: [
    {
      type: "block",
      title: "Block",
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" }
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" }
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" }
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: "link",
            type: "object",
            title: "URL",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url"
              }
            ]
          }
        ]
      }
      // of: [{ type: "authorReference" }]
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    // {
    //   type: "mainImage",
    //   options: { hotspot: true }
    // },
    {
      title: "Code block",
      type: "code"
    }
  ]
};

export const article = {
  type: "document",
  name: "article",
  title: "Article",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "Titles should be catchy, descriptive, and not too long"
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "Some frontends will require a slug to be set to be able to show the post",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      type: "array",
      name: "authors",
      title: "Authors",
      of: [{ type: "article.author" }]
    },
    {
      name: "publishedAt",
      type: "datetime",
      title: "Published at",
      description: "This can be used to schedule post for publishing"
    },
    {
      name: "excerpt",
      type: "article.excerpt",
      title: "Excerpt",
      description:
        "This ends up on summary pages, on Google, when people share your post in social media."
    },
    {
      name: "body",
      type: "article.body",
      title: "Body"
    },
    {
      name: "metadata",
      type: "article.metadata",
      title: "Metadata"
    },
    {
      name: "seo",
      type: "seo",
      title: "SEO"
    }
  ]
};
