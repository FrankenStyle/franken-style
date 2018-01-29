


// var previousEl = null;

// document.addEventListener("mousemove", function (event) {
//   var selectedEl = event.target;
//   console.log("&%&%&%&%",selectedEl)

//   if (selectedEl.nodeName) {
//     if (previousEl != null) {
//       previousEl.classList.remove("mouseHoverElement");
//     }
//     selectedEl.classList.add("mouseHoverElement");
//     previousEl = selectedEl;
//   }
//   chrome.runtime.sendMessage({element:selectedEl}, ()=>{
//   })

// }, false);



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("something happening from the extension");
  var data = request.data || {};

  var linksList = document.querySelectorAll('a');
  [].forEach.call(linksList, function (header) {
    header.style.backgroundColor = '#' + request.data;
  });
  // sendResponse({ data: data, success: true });

});

var previousEl = null;

document.addEventListener("mousedown", function (event) {
  var selectedEl = event.target;
  var selectedClassName = selectedEl.className;
  var selectedNode = selectedEl.nodeName;
  var selectedClassList = selectedEl.classList;


  if (selectedEl.nodeName) {
    if (previousEl != null) {
      previousEl.classList.remove("mouseHoverElement");
    }
    selectedEl.classList.add("mouseHoverElement");
    previousEl = selectedEl;

  chrome.runtime.sendMessage({ selectedClassName, selectedNode, selectedClassList }, ()=>{
  })
  }

  }, false);
