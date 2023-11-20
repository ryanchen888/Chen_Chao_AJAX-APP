(() => {
  // variables
  const container = document.querySelector(".grid-con");
  const model = document.querySelector("#model");
  const loadingIndicator = document.getElementById("loading-indicator");
  const hotspots = document.querySelectorAll(".Hotspot");
  const hotspotTemplate = document.getElementById("hotspot-template");
  const materialTemplate = document.getElementById("material-template");
  const materialList = document.getElementById("material-list");

  function showLoading() {
    loadingIndicator.style.display = "flex";
  }

  function hideLoading() {
    loadingIndicator.style.display = "none";
  }

  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
    hideLoading();
  }

  function loadInfoBoxes() {
    showLoading();

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoBoxes => {
        console.log(infoBoxes);
        hotspots.forEach((hotspot, index) => {
          const clone = hotspotTemplate.content.cloneNode(true);
          const hotspotAnnotation = clone.querySelector(".HotspotAnnotation");

          hotspotAnnotation.textContent = `${infoBoxes[index].title}: ${infoBoxes[index].text}`;
          hotspot.appendChild(clone);
        });
      })
      .catch(error => {
        console.error("Error loading infoBoxes:", error);
        alert("Failed to load hotspots. Please try again later.");

      })
      .finally(hideLoading);
  }

  function loadMaterialInfo() {
    showLoading();

    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materials => {
        updateMaterialList(materials);
      })
      .catch(error => {
        console.error("Error loading materials:", error);
        alert("Oops, material loading went wrong. Please try again later.");
      })
      .finally(hideLoading);
  }

  function updateMaterialList(materials) {
    materialList.textContent = ""; // clear existing content

    materials.forEach(material => {
      const clone = materialTemplate.content.cloneNode(true);
      const materialHeading = clone.querySelector(".material-heading");
      const materialDescription = clone.querySelector(".material-description");

      materialHeading.textContent = material.heading;
      materialDescription.textContent = material.description;

      materialList.appendChild(clone);
    });
  }

  function showInfo() {
    const hotspotAnnotation = this.querySelector(".HotspotAnnotation");
    gsap.to(hotspotAnnotation, { opacity: 1, duration: 0.5 });
  }

  function hideInfo() {
    const hotspotAnnotation = this.querySelector(".HotspotAnnotation");
    gsap.to(hotspotAnnotation, { opacity: 0, duration: 0.5 });
  }

  // Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  // Initial data loading
  loadInfoBoxes();
  loadMaterialInfo();
})();
