const cardSetsPath = "./assets/card/sets.svg";

// Fetch the SVG text
const svgText = await fetch(cardSetsPath)
    .then(res => res.text());

// Parse it
const parser = new DOMParser();

const setsTemplate = parser
    .parseFromString(svgText, "image/svg+xml")
    .documentElement;

// Clone it
const sets = setsTemplate.cloneNode(true);

// Change the colour
sets.querySelectorAll(".mini-header").forEach(head => {
    head.setAttribute("fill", "#00AEEF");

});




// Add to page
document.body.appendChild(sets);