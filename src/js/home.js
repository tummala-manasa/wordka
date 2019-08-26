(function(){
  // chrome.storage.sync.get('lastCached', function(data) {
  //   var todayDate = new Date().getDate();
  //   if (data.lastCached !== todayDate) {
  //       // Do ajax call
  //       var lastJson = ['happy', 'tranquility'];
  //       chrome.storage.sync.set({ lastJson: lastJson });
  //       chrome.storage.sync.set({ lastCached: todayDate });
  //   }
  // });
  // chrome.storage.sync.get('lastJson', function(data) {
  //   var presentArray = data.lastJson,
  //       parentDiv = document.getElementById('testing'),
  //       i=0,
  //   addNewCard = function(cardJson, parentDiv) {
  //      var newElement = document.createElement('div');
  //      newElement.innerHTML = cardJson;
  //      parentDiv.append(newElement);
  //   };
  //   for (i=0; i<presentArray.length; i++) {
  //     addNewCard(presentArray[i], parentDiv);
  //   }
  // });


  window.onload = function(e) {
    var xhttp = new XMLHttpRequest();
        mockJson = [];
   xhttp.open("GET", "https://wordka-e607e.firebaseio.com/words/180623.json", true);
   xhttp.send();
   xhttp.onreadystatechange = function() {
      outputString = (this.responseText);
      mockJson = JSON.parse(outputString);
      mockJson = Object.entries(mockJson );

      for (var i=0; i<mockJson.length; i++) {
        createCard(mockJson[i][1]);
      }

      function createCard(cardJson) {
        var listElementlLength = cardJson.wordDetailsList.length;

        var listHolder = '';
        for (var j=0; j<listElementlLength; j++) {
          listHolder = listHolder + createListElement(cardJson.word, cardJson.wordDetailsList[j]);
        }

        var bubbleHolder = '';
        for (var k=0;k<listElementlLength; k++) {
          bubbleHolder = bubbleHolder + '<li class="bubble"></li>';
        }
        var cardFooter =
         '<div class="card-slide-footer">'+
           '<button class="next-prev-button prev"><<</button>'+
           '<ul class="bubble-container">'+ bubbleHolder + '</ul>'+
           '<button class="next-prev-button next">>></button>'+
        '</div>';
        var cardHolder =
             '<ul class="list-holder">' +
                listHolder +
                cardFooter +
             '</ul>';
        var cardHolderDOM = document.createElement('div');
        cardHolderDOM.classList.add('card-holder');
        cardHolderDOM.innerHTML = cardHolder;
        var bubbleElements = cardHolderDOM.getElementsByClassName('bubble');
        bubbleElements[0].classList.add('active');
        // var parser = new DOMParser();
        // var domElement = parser.parseFromString(cardHolder, 'text/xml');
        document.body.appendChild(cardHolderDOM);
      }

      function createListElement(word, listElementObject) {
        var listElement =
            '<li class="list-element">' +
              '<div class="card-body" style="background-image: url(../images/tranquil.jpg);">' +
                '<div class="overlay"></div>' +
                '<div class="word">'+word+'</div>' +
                 '<div class="word-footer">' +
                  '<span class="phonetics">'+listElementObject.phonetics+'</span>' +
                   '<span class="speaker" id="speaker">' +
                    '<svg style="vertical-align: bottom;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 93.038 93.038" style="enable-background:new 0 0 93.038 93.038;" xml:space="preserve">' +
                     '<g>'+
                    '<path d="M46.547,75.521c0,1.639-0.947,3.128-2.429,3.823c-0.573,0.271-1.187,0.402-1.797,0.402c-0.966,0-1.923-0.332-2.696-0.973   l-23.098-19.14H4.225C1.892,59.635,0,57.742,0,55.409V38.576c0-2.334,1.892-4.226,4.225-4.226h12.303l23.098-19.14   c1.262-1.046,3.012-1.269,4.493-0.569c1.481,0.695,2.429,2.185,2.429,3.823L46.547,75.521L46.547,75.521z M62.784,68.919  '+ 'c-0.103,0.007-0.202,0.011-0.304,0.011c-1.116,0-2.192-0.441-2.987-1.237l-0.565-0.567c-1.482-1.479-1.656-3.822-0.408-5.504   c3.164-4.266,4.834-9.323,4.834-14.628c0-5.706-1.896-11.058-5.484-15.478c-1.366-1.68-1.24-4.12,0.291-5.65l0.564-0.565   c0.844-0.844,1.975-1.304,3.199-1.231c1.192,0.06,2.305,0.621,3.061,1.545c4.977,6.09,7.606,13.484,7.606,21.38   c0,7.354-2.325,14.354-6.725,20.24C65.131,68.216,64.007,68.832,62.784,68.919z M80.252,81.976 '+   'c-0.764,0.903-1.869,1.445-3.052,1.495c-0.058,0.002-0.117,0.004-0.177,0.004c-1.119,0-2.193-0.442-2.988-1.237l-0.555-0.555   c-1.551-1.55-1.656-4.029-0.246-5.707c6.814-8.104,10.568-18.396,10.568-28.982c0-11.011-4.019-21.611-11.314-29.847   c-1.479-1.672-1.404-4.203,0.17-5.783l0.554-0.555c0.822-0.826,1.89-1.281,3.115-1.242c1.163,0.033,2.263,0.547,3.036,1.417   c8.818,9.928,13.675,22.718,13.675,36.01C93.04,59.783,88.499,72.207,80.252,81.976z" fill="#FFFFFF"/>'+
                    '</g>'+
                  '</span>'+
                  '<audio src="'+listElementObject.audioUrl+'" preload="auto" id="audioFile"></audio>'+
                 '</div>' +
                 '<div class="type">' + listElementObject.lexicalCategory + '</div>' +
              '</div>';
        listElement = listElement +
              '<div class="card-footer">' +
               '<div class="card-footer-container">' +
                '<div class="meaning">'+ listElementObject.definitions +'</div>';
        if (listElementObject.examples) {
          listElement = listElement +
                  '<div class="sentence"><q>'+ listElementObject.examples +'</q></div>';
        }
        if (listElementObject.synonyms || listElementObject.antonyms) {
          listElement = listElement +
                  '<div class="slider collapsed">';
          if (listElementObject.synonyms) {
            listElement = listElement +
                      '<div class="syn-ant">' +
                        '<i>Synonyms:	</i><span>' + listElementObject.synonyms +'</span>' +
                      '</div>';
          }
          if (listElementObject.antonyms) {
            listElement = listElement +
                      '<div class="syn-ant">' +
                        '<i>Antonyms:	</i><span>' + listElementObject.antonyms + '</span>' +
                      '</div>';
          }
          listElement = listElement +
                  '</div>';
        }
        listElement = listElement +
                '<div class="button-container">'+
                  '<button>I know</button>' +
                  '<button class="purple-button">Don\'t know</button>';
        listElement = listElement +
                    '<span class="arrow-container"';
        if (!listElementObject.synonyms && !listElementObject.antonyms) {
          listElement = listElement + ' style="display: none"';
        }
        listElement = listElement +
                    '>'+
                      '<svg class="arrow" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g></svg>'+
                    '</span>';
        listElement = listElement +
                  '</div>'+
                 '</div>' +
                '</div>' +
              '</li>';

        return listElement;
      }

      function toggleSyn(listNode) {
        var slide = (listNode.getElementsByClassName('slider'))[0],
            arrowSvg = (listNode.getElementsByClassName('arrow'))[0];
        if (slide.classList.contains('collapsed')) {
          slide.classList.remove('collapsed');
          arrowSvg.classList.add('up');
        } else {
          slide.classList.add('collapsed');
          arrowSvg.classList.remove('up');
        }
      }

      function activateArrow(cardHolder, index) {
        var listNode = cardHolder.getElementsByClassName('list-element')[index];
        var arrow = (listNode.getElementsByClassName('arrow'))[0];
        arrow.addEventListener("click", function() {
           toggleSyn(listNode);
        });
      }

      for (var cardIndex=0; cardIndex<mockJson.length; cardIndex++) {
        var cardHolder = document.getElementsByClassName('card-holder')[cardIndex];
        var cardListElements = cardHolder.getElementsByClassName('list-element');

        var listHolder = cardHolder.getElementsByClassName('list-holder');
        // var totalWidth = 263*(cardListElements.length);
        // listHolder[0].style.width = totalWidth + 'px';
        for (var listEleIndex=0; listEleIndex<cardListElements.length; listEleIndex++) {
          activateArrow(cardHolder, listEleIndex);
        }

        var cardFooter = cardHolder.getElementsByClassName('card-slide-footer');
        if(cardListElements.length <= 1) {
          cardFooter[0].style.display = 'none';
        }

        var nextButton = cardHolder.getElementsByClassName('next');
        activateNextPrevButton(nextButton[0], 'next');

        var prevButton = cardHolder.getElementsByClassName('prev');
        prevButton[0].style.visibility = 'hidden';

        activateNextPrevButton(prevButton[0], 'prev');
      }

      function activateNextPrevButton(nextButton, type) {
        nextButton.addEventListener('click', function() {
          var slideFooter = nextButton.parentElement;
          var bubbleParent = slideFooter.getElementsByClassName('bubble-container')[0];
          var bubbleList = bubbleParent.children;

          for (var c=0;c<bubbleList.length;c++) {
            if (bubbleList[c].classList.contains('active')) {
              closeOldCards(c, type, slideFooter.parentElement.parentElement);
              break;
            }
          }
        });
      }

      function closeOldCards(index, action, currentCard) {
        var listNode = currentCard.getElementsByClassName('list-element')[index];
        var delay = 0;

        if (listNode.getElementsByClassName('slider').length) {
          var slide = (listNode.getElementsByClassName('slider'))[0],
              arrowSvg = (listNode.getElementsByClassName('arrow'))[0];
          if (!slide.classList.contains('collapsed')) {
            delay = 1000;
            slide.classList.add('collapsed');
            arrowSvg.classList.remove('up');
          }
        }

        if (action === 'next') {
          setTimeout(function() {
            showNextCard(index, currentCard);
          }, delay); // showNextCard
        } else {
          setTimeout(function() {
            showPrevCard(index, currentCard);
          }, delay); // showNextCard
        }
      }

      function showNextCard(currenrActiveIndex, currentCard) {
        currenrActiveIndex++;

        var bubbleElements = currentCard.getElementsByClassName('bubble');
        var listElements = currentCard.getElementsByClassName('list-element');

        for (var i=0;i<listElements.length;i++) {
          var temp = 258+(listElements.length);
          var g = listElements[i].style.right;
          g = g.replace('px', '');

          g = (g!= ''? Number(g)+261: 258);
          if (g<(258*listElements.length)) {
            listElements[i].style.right = g+'px';
          }
        }
        if (currenrActiveIndex === listElements.length-1) {
          currentCard.getElementsByClassName('next')[0].style.visibility = 'hidden';
        }
        if (currenrActiveIndex === 1) {
          currentCard.getElementsByClassName('prev')[0].style.visibility = 'visible';
        }

        bubbleElements[currenrActiveIndex-1].classList.remove('active');
        bubbleElements[currenrActiveIndex].classList.add('active');
      }

      function showPrevCard(currenrActiveIndex, currentCard) {
        currenrActiveIndex--;

        var bubbleElements = currentCard.getElementsByClassName('bubble');
        var listElements = currentCard.getElementsByClassName('list-element');

        for (var i=0;i<listElements.length;i++) {
          var h = 258;
          var temp = 258+(listElements.length);
          var g = listElements[i].style.right;
          g = g.replace('px', '');
          g = (g!= ''? Number(g)-261: -3);
          if (g>=-3) {
            listElements[i].style.right = g+'px';
          }
        }
        if (currenrActiveIndex === 0) {
          currentCard.getElementsByClassName('prev')[0].style.visibility = 'hidden';
        }
        if (currenrActiveIndex === listElements.length-2) {
          currentCard.getElementsByClassName('next')[0].style.visibility = 'visible';
        }

        bubbleElements[currenrActiveIndex+1].classList.remove('active');
        bubbleElements[currenrActiveIndex].classList.add('active');
      }
  };
 };
})();
