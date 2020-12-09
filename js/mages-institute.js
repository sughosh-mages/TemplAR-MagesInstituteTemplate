var category = 1;

AFRAME.registerComponent("videohandler", {
  schema: {
    srcVid: { type: "string" },
  },

  init: function () {
    // console.log("videohandler");
    var marker = this.el;
    var avideo = document.querySelector("#avideo");
    avideo.setAttribute("src", this.data.srcVid);

    marker.addEventListener(
      "markerFound",
      function () {
        let tec = getTech();
        let art = getArt();
        let ani = getAni();
        let play = getPlay();
        let info = getInfo();
        tec.setAttribute("style", "visibility:visible");
        art.setAttribute("style", "visibility:visible");
        ani.setAttribute("style", "visibility:visible");
        play.setAttribute("style", "visibility:visible");
        info.setAttribute("style", "visibility:visible");

        var vid = document.querySelector(this.data.srcVid);
        vid.play();
      }.bind(this)
    );

    marker.addEventListener(
      "markerLost",
      function () {
        let tec = getTech();
        let art = getArt();
        let ani = getAni();
        let play = getPlay();
        let info = getInfo();
        tec.setAttribute("style", "visibility:hidden");
        art.setAttribute("style", "visibility:hidden");
        ani.setAttribute("style", "visibility:hidden");
        play.setAttribute("style", "visibility:hidden");
        info.setAttribute("style", "visibility:hidden");
        var vid = document.querySelector(this.data.srcVid);
        vid.pause();
        vid.currentTime = 0;
      }.bind(this)
    );
  },
});

function getTech() {
  return (tec = document.getElementById("tecButton"));
}
function getArt() {
  return (art = document.getElementById("artButton"));
}
function getAni() {
  return (ani = document.getElementById("aniButton"));
}
function getPlay() {
  return (play = document.getElementById("playButton"));
}
function getInfo() {
  return (info = document.getElementById("infoButton"));
}

function switchCategory(newCategory) {
  if (newCategory !== category) {
    // console.log("different category");

    // video
    var videohandlerComponent = document.querySelector("#nft").components
      .videohandler;
    // console.log(videohandlerComponent);
    var prevSrcVid = videohandlerComponent.data.srcVid;

    var prevVid = document.querySelector(prevSrcVid);
    prevVid.pause();
    prevVid.currentTime = 0;

    var srcVid = "#vid_" + newCategory;
    videohandlerComponent.data.srcVid = srcVid;
    // console.log("new src vid: " + srcVid);

    var avideo = document.querySelector("#avideo");
    avideo.setAttribute("src", srcVid);

    var vid = document.querySelector(srcVid);
    vid.play();

    // model
    var prevModel = document.querySelector("#emodel_" + category);
    // prevModel.setAttribute("visible", false);
    prevModel.object3D.visible = false;
    var model = document.querySelector("#emodel_" + newCategory);
    model.object3D.visible = true;
    // model.setAttribute("visible", true);
    // var model = document.querySelector("#model");
    // var srcModel = "#model_" + newCategory;
    // model.setAttribute("gltf-model", srcModel);

    category = newCategory;
  }
  // else{
  //   console.log("same category");
  // }
}

//   AFRAME.registerComponent('open-link', {
//     init: function () {
//       this.el.addEventListener('click', function () {
//         alert("open link");
//         // window.location = "https://mages.edu.sg/";
//     });
//   }
// });

window.onload = function () {
  let clickCount = 0;
  document
    .querySelector(".play-video-button")
    .addEventListener("click", function () {
      var videohandlerComponent = document.querySelector("#nft").components
        .videohandler;
      var vid = document.querySelector(videohandlerComponent.data.srcVid);
      let pbut = getPlay();
      clickCount++;
      if (clickCount % 2 != 0) {
        pbut.style.backgroundImage =
          "url('../template-mages/textures/stop.png')";
        vid.play();
      } else {
        pbut.style.backgroundImage =
          "url('../template-mages/textures/play.png')";
        vid.pause();
        vid.currentTime = 0;
      }
    });

  document
    .querySelector(".category-1-button")
    .addEventListener("click", function () {
      switchCategory(1);
    });

  document
    .querySelector(".category-2-button")
    .addEventListener("click", function () {
      switchCategory(2);
    });

  document
    .querySelector(".category-3-button")
    .addEventListener("click", function () {
      switchCategory(3);
    });

  document.querySelector(".info-button").addEventListener("click", function () {
    alert("Scan Mages logo to start");
  });

  // document.querySelector("#plane-banner").addEventListener("click", function () {
  //   window.location = "https://mages.edu.sg/";
  // });

  // document.querySelector("#plane-banner").addEventListener('click', function () {
  //     alert("open");
  //     window.location = "https://mages.edu.sg/";
  // });
};
