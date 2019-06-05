const GA_BASE_URL =
  location.origin === "http://localhost:3333"
    ? "http://localhost:3000"
    : "https://studio.transclusion.org";

export default {
  widgets: [
    {
      name: "ga/realtime",
      options: {
        profileId: "ga:196245173",
        signinUrl: `${GA_BASE_URL}/api/google/oauth/signin`,
        tokensUrl: `${GA_BASE_URL}/api/google/oauth/tokens`
      }
    },
    { name: "structure-menu" },
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
