// JavaScript

// Create a MutationObserver instance
var observer = new MutationObserver(function (mutationsList) {
  // Collect the mutations in an array
  var mutations = Array.from(mutationsList);

  // Perform batch operations
  // For this example, let's add text after nodes with a certain class
  var nodesToAddButton = mutations.reduce(function (acc, mutation) {
    // Check if the mutation added nodes
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // Loop through the added nodes
      for (var i = 0; i < mutation.addedNodes.length; i++) {
        var node = mutation.addedNodes[ i ];
        if (!node) continue;

        if (node.baseURI.includes('tiktok')) {
          console.log(node.nodeName, node.nodeType);

          if (node.nodeName != 'VIDEO') continue;
          // Check if the added node has child elements with the desired class
          var nestedNodes = node;
          console.log(nestedNodes);
          if (!nestedNodes) continue;

          acc.push({ node: nestedNodes, button: nestedNodes });

        } else {
          // Check if the added node has the desired class
          // if (node.classList.contains('_8o0a')) {
          //   var closestNode = node.querySelectorAll('video')[0];
          //   if (closestNode) {
          //     // Add the closest node and the corresponding button to the array
          //     acc.push({ node: closestNode, button: node });
          //   }
          // }
          // Check if the added node has child elements with the desired class
          var nestedNodes = node.querySelectorAll('._8o0a, .x1hl2dhg');
          // console.log(nestedNodes);
          if (nestedNodes.length > 0) {
            // Loop through the nested nodes and add them to the array
            for (var j = 0; j < nestedNodes.length; j++) {
              var childNode = nestedNodes[ j ]
              var closestChildNode = childNode.querySelectorAll('video, img')[ 0 ];
              if (closestChildNode) {
                // Add the closest node and the corresponding button to the array
                acc.push({ node: closestChildNode, button: childNode });
              }
            }
          }
        }
      }
    }
    return acc;
  }, []);

  nodesToAddButton.forEach(function (nodeData) {
    var type = 'img';
    var divElement = document.createElement('div');
    divElement.classList.add('ample-button');
    var link = document.createElement('a');
    link.classList.add('ample-button-link');
    link.href = nodeData.node.getAttribute('src');
    if (nodeData.node.nodeName === 'VIDEO') {
      link.href = nodeData.node.getAttribute('src');
      type = 'video';

      //tiktok details page
      if (window.document.baseURI.includes('tiktok.com') && nodeData.node.baseURI.includes('@') && nodeData.node.baseURI.includes('/video/')) {
        link.href = nodeData.node.baseURI;
      } else if (nodeData.node.baseURI.includes('explore')) {
        var parent = nodeData.node.parentNode;
        var id = parent.id.replace('xgwrapper-0-', '');
        if (id) {
          var wrapperNode = nodeData.node.closest('[data-e2e="explore-item"]');
          var lnk = wrapperNode.querySelector('a').getAttribute('href');
          link.href = lnk;
        }
      }
      else if (window.document.baseURI.includes('tiktok.com') && !nodeData.node.baseURI.includes('@')) {
        var parent = nodeData.node.parentNode;
        var id = parent.id.replace('xgwrapper-0-', '');
        if (id) {
          var wrapperNode = nodeData.node.closest('[data-e2e="recommend-list-item-container"]');
          var username = wrapperNode.querySelector('[data-e2e="video-author-uniqueid"]').innerText;

          var videoURl = 'https://www.tiktok.com/@' + username + "/video/" + id;
          link.href = videoURl;
        }

      }
    } else {
      // fetch(nodeData.node.getAttribute('src'))
      //   .then(response => response.blob())
      //   .then(blob => {
      //     const blobURL = URL.createObjectURL(blob);
      //     link.href = blobURL;
      //     link.download = "ad_image.jpg";
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //   });
    }
    link.textContent = 'Download';
    divElement.appendChild(link);

    if (window.document.baseURI.includes('facebook.com')) {
      //facebook
      nodeData.button.parentNode.insertBefore(divElement, nodeData.button.nextSibling);

    } else {
      //ticktok details
      if (window.document.baseURI.includes('tiktok.com') && nodeData.node.baseURI.includes('@')) {
        divElement.classList.add('tiktok-detail');
        nodeData.node.parentNode.append(divElement);
      } else {
        //ticktok explore page
        // data-e2e="explore-item-list"
        if (nodeData.node.baseURI.includes('explore')) {
          divElement.classList.add('tictok-dwn-button');
          divElement.classList.add('tictok-explore');
          var wrapperNode = nodeData.node.closest('[data-e2e="explore-item"]');
          if (wrapperNode) {

            //update link 
            var l = wrapperNode.querySelector('a');
            if (l) {
              link.href = l.getAttribute('href');
            }
            //create button
            var img = document.createElement('img');
            img.classList.add('ample-button-img');

            img.src = chrome.runtime.getURL("img/download-icon.png");
            link.appendChild(img);

            wrapperNode.append(divElement);
          }
        } else {
          //ticktok for you
          divElement.classList.add('tictok-dwn-button');
          var wrapperNode = nodeData.node.closest('[data-e2e="recommend-list-item-container"]');
          if (!wrapperNode.querySelector('[data-e2e="feed-video"]').nextElementSibling.querySelector('.tictok-dwn-button')) {
            var img = document.createElement('img');
            img.classList.add('ample-button-img');

            img.src = chrome.runtime.getURL("img/download-icon.png");
            link.appendChild(img);

            wrapperNode.querySelector('[data-e2e="feed-video"]').nextElementSibling.append(divElement);
          }
        }
      }
    }



    // click event prevent
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var el = e.target;
      if (e.target.nodeName == 'IMG') {
        el = e.target.parentElement;
      }

      //set hidden value for the download form
      var url_input = document.getElementById('ample_download_url');
      var type_input = document.getElementById('ample_download_type');
      url_input.value = el;
      type_input.value = type;

      //enable popup
      var popup = document.getElementById('popupForm');
      popup.classList.add('active');

      //remove hidden class
      var oldInput = document.querySelector('.old_category_wrap');
      oldInput.classList.remove('hidden');

      return 1;
    })
  });
});

// Define the configuration for the observer
var config = { attributes: true, childList: true, subtree: true };

// Select the target element
if (window.document.baseURI.includes('facebook.com')) {
  var target = document.querySelector('[role="main"]');
} else {
  //for ticktok
  var target = document.querySelector('.tiktok-14dcx2q-DivBodyContainer');
}


//add popup form 
var html = '\
  <div class="downloadPopup" >\
    <div class="formPopup" id="popupForm">\
      <div class="close-downloadPopup">X</div>\
      <form class="formContainer" id="formContainer">\
        <input type="hidden" name="url" id="ample_download_url">\
        <input type="hidden" name="type" id="ample_download_type">\
        <h2>Downloads</h2>\
        <div class="old_category_wrap">\
        <label for="category">\
          <strong>Category</strong>\
        </label>\
        <select id="ample_fb_category" placeholder="Category" name="category">\
        </select>\
        </div>\
        <a href="#" id="add_new_category">Add New Category</a>\
        <div class="new_category_wrap">\
          <input type="text" id="new_category" placeholder="New Category Name" name="new_category">\
        </div>\
        <button type="submit" class="btn cancel" id="download_btn">Download Now</button>\
      </form>\
    </div>\
  </div >';
var body = document.querySelector('body');

var divSpeed = document.createElement("div");
divSpeed.innerHTML = html;
body.prepend(divSpeed);

//close poup
var closePopup = document.querySelector('.close-downloadPopup');
closePopup.addEventListener('click', function (e) {
  var popup = document.getElementById('popupForm');
  popup.classList.remove('active');

});


// add new category input
var AddNew = document.getElementById('add_new_category');
AddNew.addEventListener('click', function (e) {
  e.preventDefault();

  var newInput = document.querySelector('.new_category_wrap');
  newInput.classList.add('active');

  //old category select hide
  var oldInput = document.querySelector('.old_category_wrap');
  oldInput.classList.add('hidden');

})


async function getCategory (url) {

  // Storing response
  const response = await fetch(url, {
    method: "GET", // or 'PUT'
    // mode: 'no-cors',
  });

  // Storing data in form of JSON
  var categorys = await response.json();
  if (response.ok) {
    var select = document.getElementById("ample_fb_category");

    categorys.forEach(function (category) {
      var option = document.createElement("option");
      option.text = category;
      option.value = category;

      select.appendChild(option);
    });


  }

}
// Calling that async function
getCategory('https://nrtv.tube/category.php');

async function submitDownloadForm (url, data) {

  // Storing response
  const response = await fetch(url, {
    method: "POST", // or 'PUT'
    // mode: 'no-cors',
    body: JSON.stringify(data),
  });

  // Storing data in form of JSON
  var Response = await response.json();
  if (Response.ok) {
    alert('Added In Queue');
  }

}

//append download event from poup
document.querySelector('form.formContainer').addEventListener('submit', (e) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target).entries());
  // console.log(data)

  var popup = document.getElementById('popupForm');
  popup.classList.remove('active');

  submitDownloadForm('https://nrtv.tube/queue.php', data);

  return true;

});

// Start observing mutations
observer.observe(target, config);