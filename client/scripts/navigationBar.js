import * as basic from "../scripts/basics.js";
import * as showAvailableVideos from "../scripts/showAvailableVideos.js";
import * as index from "../scripts/index.js";
import * as currentVideoDownloads from "../scripts/currentVideoDownloads.js";
"use strict";

// load header details into html using headerContainer id
export function loadNavigationBar(path) {
  const header = document.getElementById("headerContainer");
  const navBar = basic.createSection(header, "nav", "NavigationBar", "navBar");
  const nav = basic.createSection(navBar, "ul", undefined, "headerNav");
  const item = basic.createSection(nav, "li");
  let homeButton, savedVideosPage, currentDownloads;
  if (path == "/saved/videos") {
    document.title = "saved videos - Watch Video By Provided Link";
    document.body.classList = "saved-videos-body";
    basic.websiteContentContainer.classList = "saved-videos-websiteContentContainer";
    homeButton = basic.createLink(item, "/", undefined, "button category-link", "WatchVideoByLink");
    savedVideosPage = basic.createLink(item, "/saved/videos", undefined, "button savedVideosPageButton is-selected", "/saved/videos");
    currentDownloads = basic.createLink(item, "javascript:;", undefined, "button current-dowloads-nav fa fa-download");
  } else {
    document.title = "Watch Video By Provided Link";
    document.body.classList = "index-body";
    basic.websiteContentContainer.classList = "index-websiteContentContainer";
    homeButton = basic.createLink(item, "/", undefined, "button is-selected", "WatchVideoByLink");
    savedVideosPage = basic.createLink(item, "/saved/videos", undefined, "button savedVideosPageButton category-link", "/saved/videos");
    currentDownloads = basic.createLink(item, "javascript:;", undefined, "button current-dowloads-nav fa fa-download");
  } 
  homeButton.onclick = (e) => {
    e.preventDefault(); 
    if(document.getElementById("download-status-container"))  {
      const stopInterval = currentVideoDownloads.stopAvailableVideoDownloadDetails(false);  
      if(stopInterval == "cleared Interval"){
        document.getElementById("download-status-container").remove();   
      }
    }
    basic.websiteContentContainer.innerHTML = "";
    homeButton.classList = "button is-selected";
    savedVideosPage.classList = "button savedVideosPageButton category-link";
    history.pushState(null, "", "/");
    document.title = "Watch Video By Provided Link";
    document.body.classList = "index-body";
    basic.websiteContentContainer.classList = "index-websiteContentContainer";
    index.showDetails();
  };
  savedVideosPage.onclick = (e) => {
    e.preventDefault(); 
    if(document.getElementById("download-status-container"))  { 
      const stopInterval = currentVideoDownloads.stopAvailableVideoDownloadDetails(false);  
      if(stopInterval == "cleared Interval"){
        document.getElementById("download-status-container").remove();   
      }
    }
    basic.websiteContentContainer.innerHTML = "";
    homeButton.classList = "button category-link";
    savedVideosPage.classList = "button savedVideosPageButton is-selected";
    history.pushState(null, "", "/saved/videos");
    document.title = "saved videos - Watch Video By Provided Link";
    document.body.classList = "saved-videos-body";
    basic.websiteContentContainer.classList = "saved-videos-websiteContentContainer";
    showAvailableVideos.pageLoaded();
  };

  currentDownloads.onclick = (e) => {
    e.preventDefault(); 
      if (document.getElementById("download-status-container")){ 
          document.getElementById("download-status-container").remove();
          currentVideoDownloads.stopAvailableVideoDownloadDetails(false);  
      } else {
        currentVideoDownloads.loadAvailableVideoDownloadDetails(true);
      } 
  };
}
