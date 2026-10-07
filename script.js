$(function () {

  // =========================
// Intro
// =========================

const introVideo = document.querySelector(".intro video");

if (introVideo) {

  introVideo.addEventListener("ended", function () {

    sessionStorage.setItem("introPlayed", "true");

    $(".intro").addClass("intro-hide");

  });

}
 // =========================
// Main video
// =========================

const videos = $(".main-video");

let currentIndex = 0;
let fallbackTimer = null;
let switching = false;
let firstVideoStarted = false;


// 실제 영상 재생
function playVideo(index) {

  if (!videos.length) return;

  switching = false;
  currentIndex = index;

  clearTimeout(fallbackTimer);

  videos.each(function () {
    this.pause();
    this.currentTime = 0;
  });

  videos.removeClass("active");

  const video = videos.eq(currentIndex);
  const element = video[0];

  video.addClass("active");

  element.play().catch(function (error) {
    console.log("영상 재생 오류:", error);
    nextVideo();
  });

  if (!isNaN(element.duration) && element.duration > 0) {

    fallbackTimer = setTimeout(function () {
      nextVideo();
    }, (element.duration + 0.2) * 1000);

  }
}


// 다음 영상
function nextVideo() {

  if (!videos.length) return;
  if (switching) return;

  switching = true;

  clearTimeout(fallbackTimer);

  let nextIndex = currentIndex + 1;

  if (nextIndex >= videos.length) {
    nextIndex = 0;
  }

  playVideo(nextIndex);
}


// 첫 영상 시작
function startFirstVideo() {

  if (firstVideoStarted) return;
  if (!videos.length) return;

  firstVideoStarted = true;

  playVideo(0);
}
videos.eq(0).one("playing", function () {

  $(".main-visual").addClass("ready");

});


// 영상이 끝났을 때 다음 영상
videos.on("ended", function () {
  nextVideo();
});


// 영상 오류 발생 시 다음 영상
videos.on("error", function () {
  nextVideo();
});


// 첫 영상이 실제 재생 가능한 상태가 되면 시작
videos.eq(0).on("canplay", function () {
  startFirstVideo();
});


// 이미 로딩되어 있는 경우
if (videos.length && videos[0].readyState >= 3) {
  startFirstVideo();
}

  
  // =========================
  // 포트폴리오 탭
  // =========================

  $(".portfolio-item").hide();
  $(".art3d").show();

  $(".tab-btn").on("click", function () {

    const category = $(this).data("category");

    $(".tab-btn").removeClass("active");
    $(this).addClass("active");

    $(".portfolio-item:visible").fadeOut(200, function () {
      $("." + category).fadeIn(400);
    });

    $(".portfolio-reel").scrollLeft(0);

  });


  // =========================
  // 오른쪽 화살표
  // =========================

const reel = document.querySelector(".portfolio-reel");

$(".reel-arrow.right").on("click", function () {

  reel.scrollBy({
    left: 484,
    behavior: "smooth"
  });

});


$(".reel-arrow.left").on("click", function () {

  reel.scrollBy({
    left: -484,
    behavior: "smooth"
  });

});

$(".board-tab").on("click", function () {

  const board = $(this).data("board");

  $(".board-tab").removeClass("active");
  $(this).addClass("active");

  $(".board-list").hide();

  if (board === "notice") {
    $(".notice-list").fadeIn(200);
  }

  if (board === "recent") {
    $(".recent-list").fadeIn(200);
  }

});

const reel2 = document.querySelector(".portfolio-reel22");

$(".reel-arrow.right2").on("click", function () {

  reel2.scrollBy({
    left: 484,
    behavior: "smooth"
  });

});


$(".reel-arrow.left2").on("click", function () {

  reel2.scrollBy({
    left: -484,
    behavior: "smooth"
  });

});

$(".board-tab2").on("click", function () {

  const board = $(this).data("board2");

  $(".board-tab2").removeClass("active");
  $(this).addClass("active");

  $(".board-list2").hide();

  if (board === "notice2") {
    $(".notice-list2").fadeIn(200);
  }

  if (board === "recent2") {
    $(".recent-list2").fadeIn(200);
  }

});

$(".video-card").on("click", function () {

  const videoSrc = $(this).data("video");
  const poster = $(this).data("poster");
  const category = $(this).data("category");
  const title = $(this).data("title");
  const description = $(this).data("description");

  const video = document.getElementById("featured-video");

  video.pause();

  video.src = videoSrc;
  video.poster = poster;

  video.load();

  $("#featured-category").text(category);
  $("#featured-title").text(title);
  $("#featured-description").text(description);

  $(".video-card").removeClass("active");
  $(this).addClass("active");

});
});