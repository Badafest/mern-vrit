const fetchTodos = async (url, then) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    then(data);
  } catch (err) {
    console.log("ERROR IN FETCHING TODOS ==>", err.message);
    then(
      Array(200)
        .fill(1)
        .map((_, index) => ({
          id: index + 1,
          userId: Math.ceil((index + 1) / 10),
          title: "this is a very important task!",
          completed: Math.random() < 0.5,
        }))
    );
  }
};

export default fetchTodos;
