var prevBlogs = [];
var currentBlogs = [];
var blogs = [];

function writeValues() {
    for (var i=0;i<4;i++) {
        $(".content").append("<div class='article'>" + currentBlogs[0] + "</div>");
        currentBlogs.shift();
    }
}

function nextValues() {
    if (blogs.length > 0) {
         $(".content").empty();
    for (var i=0;i<4;i++) {
        if (blogs.length > 0) {
        $(".content").append("<div class='article'>" + blogs[0] + "</div>");
        prevBlogs.push(blogs[0]);
        blogs.shift();
      }
    }
  }
}

function prevValues() {
    if (prevBlogs.length > 0) {
        $(".content").empty();
        for (var i=0;i<4;i++) {
            if (blogs.length > 0) {
                  $(".content").append("<div class='article'>" + prevBlogs[0] + "</diV>");
                blogs.push(prevBlogs[0]);
                prevBlogs.shift();
            }
          
        }
    }
}

function preload() {
    $("body").prepend("<h1>Sean Rayment</h1>");
    $.getJSON('blogs.json', {}, function(data) {
    $.each(data, function(key, value) {
     $.each(value, function(key2, value2) {			 
         currentBlogs.push(value2);
      })
    })
  })
}

$.when($.ajax(preload()).then(function () {
    writeValues();
}))