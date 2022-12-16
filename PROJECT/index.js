const data = [
  {
    name: "Shyam",
    children: [
      {
        name: "Ram",
        children: [],
      },
      {
        name: "Hari",
        children: [
          {
            name: "Shiva",
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: "Geeta",
    children: [],
  },
];

/*
expected output:*/
const expected = {
  Shyam: {
    Ram: {},
    Hari: {
      Shiva: {},
    },
  },
  Geeta: {},
};

const getChildren = (parent) =>
  data.filter((item) => item.parent && item.parent.name === parent.name);
