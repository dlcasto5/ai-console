document.addEventListener("DOMContentLoaded", () => {
  // Display the DOM tree
  const domTree = document.getElementById("dom-tree");
  domTree.innerText = getDOMTree(document.body);

  // Load code viewer content
  const codeViewer = document.getElementById("code-viewer");
  codeViewer.innerText = `<html>\n${document.documentElement.outerHTML}\n</html>`;
});

// Function to get DOM tree recursively
function getDOMTree(element, depth = 0) {
  let tree = `${' '.repeat(depth * 2)}<${element.tagName.toLowerCase()}>\n`;
  for (const child of element.children) {
    tree += getDOMTree(child, depth + 1);
  }
  return tree;
}

// Function to show a specific tab
function showTab(tabName) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => (tab.style.display = "none"));
  document.getElementById(tabName).style.display = "block";
}

// SQL Console using mock data
const mockDatabase = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

function executeSQL() {
  const query = document.getElementById("sql-input").value.toLowerCase();
  const results = document.getElementById("sql-results");
  results.innerHTML = "";

  if (query.includes("select * from users")) {
    const headers = Object.keys(mockDatabase[0]);
    const headerRow = `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>`;
    const rows = mockDatabase
      .map(row => `<tr>${headers.map(h => `<td>${row[h]}</td>`).join("")}</tr>`)
      .join("");
    results.innerHTML = headerRow + rows;
  } else {
    results.innerHTML = "<tr><td>Invalid SQL Query</td></tr>";
  }
}

// Apply changes from the editor
function applyChanges() {
  const editor = document.getElementById("code-editor").value;
  const preview = document.getElementById("preview");
  preview.srcdoc = editor;
}