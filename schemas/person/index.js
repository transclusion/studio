import MdPerson from "react-icons/lib/md/person";

export const person = {
  type: "document",
  name: "person",
  title: "Person",
  fields: [
    { type: "string", name: "firstName", title: "First Name" },
    { type: "string", name: "lastName", title: "Last Name" },
    {
      type: "image",
      name: "image",
      title: "Image",
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      media: "image"
    },
    prepare({ firstName, lastName, media }) {
      return {
        title: [firstName, lastName].filter(Boolean).join(" "),
        media
      };
    }
  },
  icon: MdPerson
};
