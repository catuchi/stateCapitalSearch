const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// search states.json and filter it
async function searchStates(searchText) {
  const res = await fetch("../data/states.json");
  const states = await res.json();

  // get matches to current input text
  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, `gi`);
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (!searchText) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
}

// show results in HTML
function outputHtml(matches) {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
      <div class="card card-body mb-1">
        <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
        <small>Lat: ${match.lat} / Long: ${match.long}</small>
      </div>
    `
      )
      .join("");

    matchList.innerHTML = html;
  }
}

search.addEventListener("input", () => searchStates(search.value));
