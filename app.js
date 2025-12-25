const SCRIPT_URL = https://script.google.com/macros/s/AKfycbyP9TtyqM1vfOnUMaUkIStdHPhXx77fbzgMpnB8sp1SVqxm1oqyRW5wiCPge8kN13U-/exec;

document.addEventListener("DOMContentLoaded", () => {

  if (typeof CATEGORIES === "undefined") {
    alert("ERROR: categories.js not loaded");
    return;
  }

  const categorySelect = document.getElementById("category");
  const subcategorySelect = document.getElementById("subcategory");

  /* Load Categories */
  categorySelect.innerHTML = `<option value="">Select Category</option>`;
  subcategorySelect.innerHTML = `<option value="">Select Subcategory</option>`;

  Object.keys(CATEGORIES).forEach(code => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = `${code} – ${CATEGORIES[code].label}`;
    categorySelect.appendChild(opt);
  });

  /* Load Subcategories */
  categorySelect.addEventListener("change", () => {
    subcategorySelect.innerHTML = `<option value="">Select Subcategory</option>`;

    const selected = CATEGORIES[categorySelect.value];
    if (!selected) return;

    Object.keys(selected.subs).forEach(sub => {
      const opt = document.createElement("option");
      opt.value = sub;
      opt.textContent = `${sub} – ${selected.subs[sub]}`;
      subcategorySelect.appendChild(opt);
    });
  });

  /* Phone auto-suggest */
  fetch(`${SCRIPT_URL}?action=getPhones`)
    .then(r => r.json())
    .then(data => {
      const list = document.getElementById("phoneList");
      data.forEach(p => {
        const o = document.createElement("option");
        o.value = p;
        list.appendChild(o);
      });
    });

  /* Submit */
  document.getElementById("woForm").addEventListener("submit", async e => {
    e.preventDefault();

    const params = new URLSearchParams({
      action: "createWO",
      category: categorySelect.value,
      subcategory: subcategorySelect.value,
      client: client.value,
      phone: phone.value,
      description: description.value,
      version: version.value
    });

    const res = await fetch(`${SCRIPT_URL}?${params}`);
    const data = await res.json();

    filename.value = data.filename;
    labelLink.href = data.labelUrl;
    result.hidden = false;
  });

});

function copyFilename() {
  filename.select();
  document.execCommand("copy");
}
