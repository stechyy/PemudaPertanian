document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("DOMContentLoaded", (event) => {
    const paragraphs = document.querySelectorAll(".text-section p");
    paragraphs.forEach((p) => {
      if (p.textContent.length > 100) {
        p.setAttribute("data-text", p.textContent);
        p.textContent = p.textContent.substring(0, 100) + "...";
      }
    });
  });

  const clickableSections = document.querySelectorAll(".clickable");
  clickableSections.forEach((section) => {
    section.addEventListener("click", () => {
      document.getElementById("footer").style.visibility = "hidden";
      document.getElementById("loading-line").style.width = "100%";
      setTimeout(() => {
        document.getElementById("loading-line").style.transition = "0.4s";
        document.getElementById("loading-line").style.marginTop = "-4px";
      }, 1000);
      setTimeout(() => {
        document.getElementById("detailContainer").style.transform =
          "scale(0.8)";
        setTimeout(() => {
          document.getElementById("detailContainer").style.transform =
            "scale(1)";
          document.getElementById("footer").style.visibility = "visible";
        }, 200);
      }, 550);
      const sectionNumber = section.getAttribute("data-section");
      directoryChanger(sectionNumber);
      const content = section.innerHTML;
      showDetail(content);
      setTimeout(() => {
        document.querySelector(".container").style.transform =
          "translateX(-150%)";
      }, 3000);

      const paragraphsInDetail = document.querySelectorAll("#detailContent p");
      paragraphsInDetail.forEach((p) => {
        var originalText = p.getAttribute("data-text");
        if (originalText) {
          p.textContent = originalText;
        }
      });
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  });

  const btnBack = document.querySelector(".btn-back");
  btnBack.addEventListener("click", () => {
    closeDetail();

    const paragraphsInMain = document.querySelectorAll(".text-section p");
    paragraphsInMain.forEach((p) => {
      var originalText = p.getAttribute("data-text");
      if (originalText && originalText.length > 100) {
        p.textContent = originalText.substring(0, 100) + "...";
      }
    });
  });

  const sectionIds = ["section1", "section2", "section3", "section4"];

  sectionIds.forEach((id, index) => {
    setTimeout(() => {
      const section = document.getElementById(id);
      section.style.opacity = "1";
      section.style.animation = "fadeInScaleUp 0.5s forwards";
    }, 500 * index);
  });

  function showDetail(content) {
    const detailContent = document.getElementById("detailContent");
    detailContent.innerHTML = content;

    const imagesInDetail = detailContent.querySelectorAll(".image-section");
    imagesInDetail.forEach((section) => {
      section.style.display = "none";
    });

    const paragraphsInDetail = detailContent.querySelectorAll("p");
    paragraphsInDetail.forEach((p) => {
      var originalText = p.getAttribute("data-text");
      if (originalText) {
        p.textContent = originalText;
        p.removeAttribute("data-text");
      }
    });
    setTimeout(() => {
      detailContainer.style.display = "block";
    }, 500);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function closeDetail() {
    window.location.reload();
  }

  clickableSections.forEach((section) => {
    section.addEventListener("click", () => {
      document.getElementById("container").style.display = "none";
      const content = section.innerHTML;
      showDetail(content);
      document.querySelector(".container").style.transform =
        "translateX(-150%)";
    });
  });

  function directoryChanger(page_number) {
    document.getElementById("container").style.display = "none";
    document.getElementById("section" + page_number).click();

    for (let i = 1; i <= 4; i++) {
      document.getElementById("label_" + i).classList.remove("active");
    }

    document.getElementById("label_" + page_number).classList.add("active");
  }

  document
    .getElementById("label_1")
    .addEventListener("click", () => directoryChanger(1));
  document
    .getElementById("label_2")
    .addEventListener("click", () => directoryChanger(2));
  document
    .getElementById("label_3")
    .addEventListener("click", () => directoryChanger(3));
  document
    .getElementById("label_4")
    .addEventListener("click", () => directoryChanger(4));

  function sectionHoverEye(section, action) {
    const opacityValue = action === "en" ? "1" : "0";
    const targetElement = document.getElementById(`onhover_${section}`);
    targetElement.style.opacity = opacityValue;

    if (action === "le") {
      setTimeout(() => {
        targetElement.style.visibility = "hidden";
      }, 300);
    } else {
      targetElement.style.visibility = "visible";
    }
  }

  const sections = [1, 2, 3, 4];

  sections.forEach((section) => {
    document
      .getElementById(`section${section}`)
      .addEventListener("mousemove", () => sectionHoverEye(section, "en"));
    document
      .getElementById(`section${section}`)
      .addEventListener("mouseleave", () => sectionHoverEye(section, "le"));
    document
      .getElementById(`onhover_${section}`)
      .addEventListener("click", function () {
        sectionHoverEye(section, "le");
      });
  });
});
