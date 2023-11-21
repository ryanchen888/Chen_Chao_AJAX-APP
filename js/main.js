(() => {
  // variables
  const container = document.querySelector(".container");
  const model = document.querySelector("#model");
  let spinner = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(241, 242, 243); display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <g transform="rotate(0 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#1d0e0b">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(30 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#1d0e0b">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(60 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#1d0e0b">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(90 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#1d0e0b">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(120 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#1d0e0b">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(150 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#1d0e0b">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(180 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#1d0e0b">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(210 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#1d0e0b">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(240 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#1d0e0b">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(270 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#1d0e0b">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(300 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#1d0e0b">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(330 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#1d0e0b">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
    </rect>
  </g></svg>`;

  const hotspots = document.querySelectorAll(".Hotspot");
  const hotspotTemplate = document.querySelector("#hotspot-template");

  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }


  function loadInfoBoxes() {

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoBoxes => {
        console.log(infoBoxes);

        infoBoxes.forEach((infoBox, index) => {
          const selected = document.querySelector(`#hotspot-${index+1}`);
          console.log(selected);
          const clone = hotspotTemplate.content.cloneNode(true);

          const hotspotHeading = clone.querySelector('.hotspot-heading');
          hotspotHeading.textContent = infoBox.heading;

          const hotspotDescription = clone.querySelector('.hotspot-description');
          hotspotDescription.textContent = infoBox.description;
      
          const hotspotImage = clone.querySelector('.hotspot-image');
          hotspotImage.src = `images/${infoBox.thumbnail}`;

      
      selected.appendChild(clone);  
        });
      })
      
      .catch(error => {
        console.error("Error loading infoBoxes:", error);
        alert("Failed to load hotspots. Please try again later.");

      })
  }

  loadInfoBoxes();

  function loadMaterialInfo() {
    materialList.innerHTML = spinner;

    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materials => {
        materialList.innerHTML = "";
        materials.forEach(material => {
   
        const clone = materialTemplate.content.cloneNode(true);

        const materialHeading = clone.querySelector('.material-heading');
        materialHeading.textContent = material.heading;

        const materialDescription = clone.querySelector('.material-description');
        materialDescription.textContent = material.description;


        materialList.appendChild(clone);
        });
      })
      .catch(error => {
        console.error(error); 
        alert("page loading went wrong. Please try again later.");
      })
  }

  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }


  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

