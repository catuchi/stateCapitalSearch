const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// search states.json and filter it
async function searchStates(searchText) {
  const res = await fetch("../data/states.json");
  const states = await res.json();

  // get matches to current input text
  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (!searchText) {
    matches = [];
  }

  console.log(matches);
}

search.addEventListener("input", () => searchStates(search.value));
