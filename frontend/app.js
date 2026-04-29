async function analyze() {
  const transcript = document.getElementById("transcript").value;
  const output = document.getElementById("output");
  const loading = document.getElementById("loading");

  output.innerHTML = "";
  loading.classList.remove("hidden");

  try {
    const res = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript })
    });

    const data = await res.json();

    loading.classList.add("hidden");

    if (data.error) {
      output.innerHTML = `<p style="color:red">${data.error}</p>`;
      return;
    }

    render(data);

  } catch (err) {
    loading.classList.add("hidden");
    output.innerHTML = "Server error";
  }
}

function render(data) {
  const output = document.getElementById("output");

  output.innerHTML = `
    <h2>Score</h2>
    <p><b>${data.score.value}/10</b> (${data.score.label})</p>
    <p>${data.score.justification}</p>

    <h2>Evidence</h2>
    <ul>
      ${data.evidence.map(e =>
        `<li>${e.signal}: "${e.quote}" → ${e.interpretation}</li>`
      ).join("")}
    </ul>

    <h2>KPI Mapping</h2>
    <ul>
      ${data.kpiMapping.map(k =>
        `<li>${k.kpi}: ${k.evidence}</li>`
      ).join("")}
    </ul>

    <h2>Gaps</h2>
    <ul>
      ${data.gaps.map(g =>
        `<li>${g.dimension}: ${g.reason}</li>`
      ).join("")}
    </ul>

    <h2>Follow-up Questions</h2>
    <ul>
      ${data.followUpQuestions.map(q =>
        `<li>${q.question}</li>`
      ).join("")}
    </ul>
  `;
}
