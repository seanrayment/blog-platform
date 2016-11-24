var blogs = [];

function writeValues() {
    for (var i=0;i<4;i++) {
        $(".content").append("<div class='article'>" + blogs[0] + "</div>");
        blogs.shift();
    }
}

function nextValues() {
    if (blogs[0].length > 0) {
         $(".content").empty();
    for (var i=0;i<4;i++) {
        if (blogs[0].length > 0) {
        $(".content").append("<div class='article'>" + blogs[0] + "</div>");
        blogs.shift();
      }
    }
  }
}

function preload() {
    $("body").prepend("<h1>Sean Rayment</h1>");
    $.getJSON('blogs.json', {}, function(data) {
    $.each(data, function(key, value) {
     $.each(value, function(key2, value2) {			 
         blogs.push(value2);
      })
    })
  })
}

$.when($.ajax(preload()).then(function () {
    writeValues();
}))