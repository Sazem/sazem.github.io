  // translate the CV page into english or spanish.
  async function LoadLanguage(lang) {
    const res = await fetch('langcv.json');
    const data = await res.json();
    const content = data[lang];
    
    document.getElementById("phone").textContent = content.phone;
    document.getElementById("summary").textContent = content.summary;
    document.getElementById("about").textContent = content.about;

    document.getElementById("exp").textContent = content.exp;
    document.getElementById("edu").textContent = content.edu;
    document.getElementById("skills").textContent = content.skills;
    document.getElementById("lang").textContent = content.lang;

    // experience lists
    updateList("pme");
    updateList("plne");
    updateList("syne");
    updateList("cite");
    updateList("mle");

    // lang list
    const list = document.getElementById("lang-list"); // list of languages at the languages section.
    list.innerHTML = "";
    content["Languages"].forEach(element => {
        const li = document.createElement("li");
        li.textContent = `${element.name} (${element.level})`;
    list.appendChild(li);
    });

    // countries at experience
    const spanfi = document.querySelectorAll('.country-fi');
    spanfi.forEach(span => {
    span.textContent = "(" + content["country-fi"] + ")";
    });

    const spanes = document.querySelectorAll('.country-es');
    spanes.forEach(span => {
    span.textContent = "(" + content["country-es"] + ")";
    });


    // Certificates
    document.getElementById("cert").textContent = content.cert;

    // update the experience list with correct experience
    function updateList(sectionKey) {
    const listElement = document.getElementById(sectionKey);
    if (!listElement || !content[sectionKey]) return;

    listElement.innerHTML = "";

    content[sectionKey].forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.detail;
      listElement.appendChild(li);
    });
  }
}



  LoadLanguage("es");