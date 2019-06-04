export default {
  widgets: [
    {
      name: "structure-menu"
    },
    {
      name: "project-info",
      options: {
        data: [
          {
            category: "Code",
            title: "Studio",
            value: "https://github.com/transclusion/studio"
          },
          {
            category: "Code",
            title: "Website",
            value: "https://github.com/transclusion/web"
          },
          {
            category: "Sites",
            title: "Site",
            value: "https://transclusion.org"
          }
        ]
      }
    },
    { name: "project-users" },
    {
      name: "document-list",
      options: {
        title: "Articles",
        order: "_updatedAt desc",
        types: ["article"]
      }
    },
    {
      name: "document-list",
      options: {
        title: "People",
        order: "_updatedAt desc",
        types: ["person"]
      }
    }
  ]
};
