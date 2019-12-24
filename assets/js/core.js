$(document).ready(function() {
  initBgAnim();
})

var doit;
window.onresize = function(){
  clearTimeout(doit);
  doit = setTimeout(initBgAnim, 100);
};

function initBgAnim () {
  var images = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg"
  ];

  var imgPath = "assets/images/bgAnim/";
  var animContainer = $(".bg-anim__container");
  var column = $(".bg-anim__col");
  column.html("");
  var columnCount = $(column).length;

  var width = $(window).width();
  var containerWidth = $(animContainer).width();
  var colWidth = $(column).width();
  var colHeight = $(column).height();
  var colCount = $(column).length;
  var imagesPerColumn = Math.ceil((colHeight / colWidth));
  var totalImagesCount = imagesPerColumn * columnCount;

  for (var i = 0; i < totalImagesCount; i++) {
    var mod = i % images.length;
    var matrixStep = Math.floor(i / imagesPerColumn);
    var img = "<img src='" + imgPath + images[mod] + "' />";
    var activeCol = $(column).eq(matrixStep);
    activeCol.append(img);
  }

  for (var i = 0; i < columnCount; i++) {
    var columnImages = $(column).eq(i).html();
    var slide = "<div class='bg-anim__col-slide'>" +  columnImages + "</div>";
    $(column).eq(i).html("").append(slide).append(slide).append(slide);
    animateColumn($(column).eq(i), i, 4000 * getRandom(7));
  }

  function animateColumn (column, index, timer) {
    column.find(".bg-anim__col-slide").eq(0).stop(true, true).animate({
      marginTop: -(colHeight)
    }, timer, "linear", function(){
      var col = column.find(".bg-anim__col-slide").eq(0);
      col.remove();
      col.removeAttr("style");
      column.append(col);
      animateColumn(column, index, timer);
    })
  }

  function getRandom (max) {
    return Math.ceil(Math.random() * Math.floor(max));
  }
}