import * as basic from "../scripts/basics.js";
import * as showAvailableVideos from "../scripts/showAvailableVideos.js";
import * as index from "../scripts/index.js";
"use strict";

const websiteContentContainer = document.getElementById("websiteContentContainer");

// load header details into html using header2 id
export function loadNavigationBar(path) {
  const header = document.getElementById("headerContainer");
  const navBar = basic.createSection(header, "nav", "NavigationBar", "navBar");
  const nav = basic.createSection(navBar, "ul", undefined, "headerNav");
  const item = basic.createSection(nav, "li");
  let homeButton, savedVideosPage;
  if (path == "/saved/videos") {
    document.title = "saved videos - Watch Video By Provided Link";
    document.body.classList = "saved-videos-body";
    websiteContentContainer.classList = "saved-videos-websiteContentContainer";
    homeButton = basic.createLink(item, "/", undefined, "button category-link", "WatchVideoByLink");
    savedVideosPage = basic.createLink(item, "/saved/videos", undefined, "button is-selected", "/saved/videos");
  } else {
    document.title = "Watch Video By Provided Link";
    document.body.classList = "index-body";
    websiteContentContainer.classList = "index-websiteContentContainer";
    homeButton = basic.createLink(item, "/", undefined, "button is-selected", "WatchVideoByLink");
    savedVideosPage = basic.createLink(item, "/saved/videos", undefined, "button category-link", "/saved/videos");
  }

  homeButton.onclick = (e) => {
    e.preventDefault();
    websiteContentContainer.innerHTML = "";
    homeButton.classList = "button is-selected";
    savedVideosPage.classList = "button category-link";
    history.pushState(null, "", "/");
    document.title = "Watch Video By Provided Link";
    document.body.classList = "index-body";
    websiteContentContainer.classList = "index-websiteContentContainer";
    index.showDetails();
  };
  savedVideosPage.onclick = (e) => {
    e.preventDefault(); 
    websiteContentContainer.innerHTML = "";
    homeButton.classList = "button category-link";
    savedVideosPage.classList = "button is-selected";
    history.pushState(null, "", "/saved/videos");
    document.title = "saved videos - Watch Video By Provided Link";
    document.body.classList = "saved-videos-body";
    websiteContentContainer.classList = "saved-videos-websiteContentContainer";
    showAvailableVideos.pageLoaded();
  };
  savedVideosPage.style.margin = "0 0 0 1.25rem";
}
