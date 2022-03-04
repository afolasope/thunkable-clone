"use strict";
import { texts } from "./utils.js";
import { components } from "./utils.js";

const elem = document.getElementById("draggable");
const box = document.querySelector("box");

// current position of box
let x = 0;
let y = 0;
let w = 0;

const moueDownHandler = function (e) {
  x = e.clientX;
  y = e.clientY;
  // console.log(x, y);

  const styles = window.getComputedStyle(elem);
  w = parseInt(styles.width, 10);
  if (x > w) {
    console.log(true);
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
    document.addEventListener;
    elem.style.cursor = "all-scroll";
  } else {
    elem.style.cursor = "auto";
    return;
  }
};

const mouseMoveHandler = function (e) {
  // how far elem has moved
  const dx = e.clientX - x;

  // Adjust the dimension of element
  elem.style.width = `${w + dx}px`;
  elem.classList.add("border");
  elem.style.cursor = "all-scroll";
};

const mouseUpHandler = function () {
  // Remove the handlers of `mousemove` and `mouseup`
  elem.classList.remove("border");
  elem.style.cursor = "auto";
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);
};
elem.addEventListener("mousedown", moueDownHandler);

const dragItem = document.querySelector(".box");
const container = document.querySelector(".feature-wrapper");

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
    console.log(initialX, initialY);
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target === dragItem) {
    active = true;
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
}

function drag(e) {
  if (active) {
    e.preventDefault();

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, dragItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

// DISPLAY ICON INFO ON HOVER
const header = document.querySelector("header");
const featureWrapper = document.querySelector(".feature-wrapper");

const subNav = document.querySelector(".sub-nav");
const navs = document.querySelectorAll(".nav");

navs.forEach((nav) => {
  nav.addEventListener("mouseover", function (e) {
    const textId = e.target.dataset.id;
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom + 10 + window.pageYOffset;

    const tempNav = texts.find(({ id }) => textId === id);
    if (tempNav) {
      subNav.classList.remove("hide");
      subNav.style.left = `${center}px`;
      subNav.style.top = `${bottom}px`;

      subNav.innerHTML = `<p>${tempNav.text}</p>`;
    }
  });
});

const asideNav = document.querySelectorAll("aside .fas");
const asideSubnav = document.querySelector(".aside-sub-nav");
asideNav.forEach((nav) => {
  nav.addEventListener("mouseover", function (e) {
    const textId = e.target.dataset.id;
    const coords = e.target.getBoundingClientRect();
    const top = coords.top - coords.height / 2 + window.pageYOffset;
    const right = coords.right + 40;

    const tempNav = texts.find(({ id }) => textId === id);
    if (tempNav) {
      asideSubnav.classList.remove("hide");
      asideSubnav.style.left = `${right}px`;
      asideSubnav.style.top = `${top}px`;

      asideSubnav.innerHTML = `<p>${tempNav.text}</p>`;
    }
  });
});

// COMPONENTS
const componentsContainer = document.querySelectorAll(".icon-card");
const tags = document.querySelectorAll(".fa-question-circle");

componentsContainer.forEach(function (card) {
  card.addEventListener("mouseover", function (e) {
    const tag = card.querySelector(".fa-question-circle");
    const color = card.querySelector(".icon-content");
    color.style.color = "#1890ff";
    card.style.color = "#1890ff";
    const check =
      e.target.classList.contains("icon-content") ||
      e.target.classList.contains("far") ||
      e.target.classList.contains("fas") ||
      e.target.tagName.toLowerCase() === "span";
    if (check) {
      tag.classList.remove("hidden");
    }
  });
});

componentsContainer.forEach(function (card) {
  card.addEventListener("mouseout", function (e) {
    const tag = card.querySelector(".fa-question-circle");
    const color = card.querySelector(".icon-content");
    color.style.color = "grey";
    const check =
      e.target.classList.contains("icon-content") ||
      e.target.classList.contains("far") ||
      e.target.classList.contains("fas") ||
      e.target.tagName.toLowerCase() === "span";
    if (check) {
      tag.classList.add("hidden");
    }
  });
});

const tooltipCon = document.querySelector(".tag-content");
tags.forEach(function (tag) {
  tag.addEventListener("mouseover", function (e) {
    const id = e.target.dataset.id;
    const coords = tag.getBoundingClientRect();
    const top = coords.top - coords.height + window.pageYOffset + 22;
    const left = coords.x + 23;
    const tooltip = components.find((text) => text.title === id);
    if (tooltip) {
      tooltipCon.classList.remove("hide");
      tooltipCon.style.left = `${left}px`;
      tooltipCon.style.top = `${top}px`;
      tooltipCon.innerHTML = ` 
      <h4>${tooltip.title}</h4>
        <p>
         ${tooltip.desc}
        </p>
        <a href="#">Learn more</a>`;
    }
  });
});

window.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("fas")) {
    asideSubnav.classList.add("hide");
  }
  if (!e.target.classList.contains("nav")) {
    subNav.classList.add("hide");
  }
  if (!e.target.classList.contains("fa-question-circle")) {
    tooltipCon.classList.add("hide");
  }
});

// HANDLE TOGGLE
const screenBtn = document.querySelector(".screen button");
const statusbar = document.querySelector(".statusbar button");
const form1 = document.querySelector(".form1");
const form2 = document.querySelector(".form2");

const handleToggle = function (e) {
  const open =
    e.currentTarget.parentElement.firstElementChild.firstElementChild
      .firstElementChild;
  const close =
    e.currentTarget.parentElement.firstElementChild.firstElementChild
      .lastElementChild;
  if (e.currentTarget.classList.contains("screen-form")) {
    form1.classList.toggle("hide");
  }
  if (e.currentTarget.classList.contains("statusbar-form")) {
    form2.classList.toggle("hide");
  }
  open.classList.toggle("hide");
  close.classList.toggle("hide");
};

screenBtn.addEventListener("click", handleToggle);
statusbar.addEventListener("click", handleToggle);

const bgProperty = document.querySelector(".bg-ppty-input input");
const bgPropertyItems = document.querySelector(".bg-ppty-absolute");
const cancelBgInput = document.querySelector(".cancel-bg-ppty-input");
const uploadBtn = document.querySelector(".bg-ppty-upload");
const realUploadBtn = document.getElementById("real-ulpoad-btn");
const typeURL = document.querySelector(".typeURL");

bgProperty.addEventListener("click", function () {
  bgPropertyItems.classList.remove("hide");
});
uploadBtn.addEventListener("click", function (e) {
  realUploadBtn.click();
});
realUploadBtn.addEventListener("change", function () {
  if (realUploadBtn.value) {
    console.log();
    bgProperty.value = realUploadBtn.value.match(
      /[\/\\]([\w\d\s\.\-\(\)]+)$/
    )[1];
  } else return;
});

typeURL.addEventListener("click", function (e) {
  e.preventDefault();
  bgProperty.value = "https://";
  bgProperty.focus();
  bgPropertyItems.classList.add("hide");
});

// BG RESIZE PROPERTY
const bgResize = document.querySelector(".bg-resize-ppty input");
const bgResizeItems = document.querySelector(".bg-resize-items");

bgResize.addEventListener("click", function (e) {
  e.stopPropagation();
  bgResizeItems.classList.remove("hide");
});

// SCREEN PROPERTY
const screenPptyInput = document.querySelector(".screen-ppty input");
const screenPPtyItems = document.querySelector(".screen-ppty-items");

screenPptyInput.addEventListener("click", function (e) {
  e.stopPropagation();
  screenPPtyItems.classList.remove("hide");
});

// STATUS BAR

const statusBarInput = document.querySelector(".statusbar-ppty input");
const statusBarInputItems = document.querySelector(".status-bar-items");

statusBarInput.addEventListener("click", function (e) {
  e.stopPropagation();
  statusBarInputItems.classList.remove("hide");
});

window.addEventListener("click", function (e) {
  if (
    !bgPropertyItems.classList.contains("hide") &&
    !e.target.classList.contains("real-btn")
  ) {
    bgPropertyItems.classList.add("hide");
  }
  if (
    !bgResizeItems.classList.contains("hide") &&
    !e.target.classList.contains("resize-item")
  ) {
    bgResizeItems.classList.add("hide");
  }
  if (
    !screenPPtyItems.classList.contains("hide") &&
    !e.target.classList.contains("screen-item")
  ) {
    screenPPtyItems.classList.add("hide");
  }
  if (
    !statusBarInputItems.classList.contains("hide") &&
    !e.target.classList.contains("status-item")
  ) {
    statusBarInputItems.classList.add("hide");
  }
});

// SWITCH BUTTON
const switches = document.querySelectorAll(".switch input");
switches.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const trueTag = e.target.parentElement.children[1].firstElementChild;
    const falseTag = e.target.parentElement.children[1].lastElementChild; // const falseTag = e.target.parentElement.firstElementChild.lastElementChild
    const before = (e.target.parentElement.children[1], ":before");
    if (btn.checked) {
      falseTag.classList.add("hidden");
      trueTag.classList.remove("hidden");
    }
    if (!btn.checked) {
      trueTag.classList.add("hidden");
      falseTag.classList.remove("hidden");
    }
  });
});

// COLOR PICKER
const customColorInput = document.querySelector(".custom-input");
const realColorInput = document.querySelector(".real-color-picker");
const protoColor = document.querySelector(".color-box");

customColorInput.addEventListener("click", function () {
  realColorInput.click();
});
realColorInput.addEventListener("change", function () {
  const value = realColorInput.value;
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
  if (result) {
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    const color = r + "," + g + "," + b; //return 23,14,45 -> reformat if needed
    protoColor.style.backgroundColor = value;
    customColorInput.value = `rgb(${color})`;
  }
});
