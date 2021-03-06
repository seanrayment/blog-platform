//An array that stores a list of strings, the first four of which
//will be called when the prev button is clicked
var prevBlogs = [];
//An array that that simply holds at most four strings, which are the 
//text of the current four articles showing on the page
var currentBlogs = [];
//An array that holds the list of strings, the first four of which are
//shown when the next button is clicked
var nextBlogs = [];

var prevTitles = [];
var currentTitles = [];
var nextTitles = [];

//Adds all four articles represented in the currentBlog array to the page
function writeValues() {
    $(".content").empty();
    for (var i=0;i<currentBlogs.length;i++) {
        $(".content").append("<div class='article'>" + "<span class='title'>" + currentTitles[i] + "</span>" + currentBlogs[i] + "</div>");
    }
}

//Takes the current blogs and puts them onto the previous blogs and then adds
//the first 4 next blogs into the current blogs and calls writeValues
function nextValues() {
    if (nextBlogs.length > 0) {
        var countNum = currentBlogs.length;
        for (var i=0;i<countNum;i++) {
            prevBlogs.unshift(currentBlogs[currentBlogs.length - 1]);
            currentBlogs.pop();
            //if there is a blog we assume there is a title
            prevTitles.unshift(currentTitles[currentTitles.length - 1]);
            currentTitles.pop();
        }
        for (var i=0;i<4;i++) {
            if (nextBlogs.length > 0) {
                currentBlogs.push(nextBlogs[0]);
                nextBlogs.shift();
                
                currentTitles.push(nextTitles[0]);
                nextTitles.shift();
            } 
        }
        writeValues();  
    }

}

//Takes the current blogs and puts them onto the next blogs and then adds 
//the first 4 previous blogs and puts them into the current blogs
function prevValues() {
    if (prevBlogs.length > 0) {
        var countNum = currentBlogs.length;
        for (var i=0;i<countNum;i++) {
            nextBlogs.unshift(currentBlogs[currentBlogs.length - 1]);
            currentBlogs.pop();
            
            nextTitles.unshift(currentTitles[currentTitles.length - 1]);
            currentTitles.pop();
        }
        for (var i=0;i<4;i++) {
            if (prevBlogs.length > 0) {
                currentBlogs.push(prevBlogs[0]);
                prevBlogs.shift();
                
                currentTitles.push(prevTitles[0]);
                prevTitles.shift();
            }
        }
        writeValues();
    }
}

function preload() {
    $("body").prepend("<h1>Sean Rayment</h1>");
    $.getJSON('blogs.json', {}, function(data) {
    $.each(data, function(key, value) {
     $.each(value, function(key2, value2) {
         if (currentBlogs.length < 4) {
             
            if (key2 == "title") {
                currentTitles.push(value2);
            
            } else if (key2 == "text") {
                currentBlogs.push(value2);      
            }
             
         } else {
             
             if (key2 == "title") {
                 nextTitles.push(value2);
             
             } else if (key2 == "text") {
                nextBlogs.push(value2);
           } 
         }
      })
    })
  })
}

$.when($.ajax(preload()).then(function () {
    writeValues();
}))