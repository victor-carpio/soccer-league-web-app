$('document').ready(function () {

	var urlJson = './json/data.json';
	getJsonAndStartFunctions(urlJson);

});

function getJsonAndStartFunctions(url) {
	$.getJSON(url, function (data) {
		startFunctions(data);
	});
}

function startFunctions(data) {

	fillData(data);
	addFirebase(data.matches);
	setPage();
}

function setPage() {
	//Initial checks
	initialChecks();
	//Add some styles depends on position
	positionChecks();
	//Add Visual Events
	addEvents();
}

function fillData(data) {
	fillSchedules(data.matches);
	fillDetails(data);
	fillLocations(data.locations);
	fillChats(data.matches);
}

function fillSchedules(matches) {

	var parent = document.getElementById('div-schedules');
	var day = '';

	for (var i = 0; i < matches.length; i++) {
		var match = matches[i];

		//If Header of day doesnt exist first make one
		if (day != match.day) {
			day = match.day;
			var h2 = document.createElement('h2');
			h2.id = match.day;
			h2.className = 'button button-style';
			h2.innerHTML = '<img class="icon-menu-principal" src="icons/schedules.png"> ' + match.day;
			parent.appendChild(h2);

			//Create toggle div
			var div = document.createElement('div');
			div.id = match.day + '-in';
			div.className = 'button-style-in';
			parent.appendChild(div);

			//Create table
			var table = document.createElement('table');
			table.className = 'table-button-in schedule';
			div.appendChild(table);
		}

		var info = [
			match.day,
			match.team1 + '/' + match.team2,
			match.location,
		]
		var tr = document.createElement('tr');
		tr.id = match.id;

		addTd(tr, info);

		//Insert right arrow to schedule
		var td = document.createElement('td');
		var arrow = document.createElement('img');
		arrow.className = 'schedule-arrow';
		arrow.src = './icons/right-arrow.png';

		tr.appendChild(td).appendChild(arrow);

		table.appendChild(tr);
	}
}

function fillDetails(data) {

	//Separate information
	var matches = data.matches;
	var clasification = data.clasification;
	var location = data.locations;
	//Get the parent element
	var parent = document.getElementById('right-hand-sub-pages');

	for (var i = 0; i < matches.length; i++) {

		var match = matches[i];
		var reference = match.day + match.team1 + match.team2;
		var container = document.createElement('div');
		container.id = 'page-' + reference;
		container.className = 'sub-page details details-info';

		var divFlex = document.createElement('div');
		divFlex.className = 'flex-column flex-wrap flex-center';

		container.appendChild(divFlex);

		var h2 = document.createElement('h2');
		h2.id = 'info-' + reference;
		h2.className = 'button-style button';
		h2.innerHTML = '<img class="icon-menu-principal" src="icons/ball.png"> Game Information';

		divFlex.appendChild(h2);

		var gameInfo = document.createElement('div');
		gameInfo.id = 'info-' + reference + '-in';
		gameInfo.className = 'button-style-in';

		divFlex.appendChild(gameInfo);

		var info = [
			['Date:', match.day],
			['Time:', match.time],
			['Teams:', match.team1 + ' vs ' + match.team2],
			['Location:', match.location]
		];

		var classTable = 'table-button-in text-align-left';
		var table = createTable(gameInfo, null, classTable, info);

		gameInfo.appendChild(table);

		var h2 = document.createElement('h2');
		h2.id = 'game-' + reference;
		h2.className = 'button-style button';
		h2.innerHTML = '<img class="icon-menu-principal" src="icons/principal2-logo.png"> Comparation';

		divFlex.appendChild(h2);

		var gameComparation = document.createElement('div');
		gameComparation.id = 'game-' + reference + '-in';
		gameComparation.className = 'button-style-in';

		divFlex.appendChild(gameComparation);

		var info = [
			['Teams:', match.team1, match.team2],
			[
				'Position:',
			 clasification[match.team1]['pos'],
			 clasification[match.team2]['pos']
			],
			[
				'Won games:',
				clasification[match.team1]['won'],
				clasification[match.team2]['won']
			],
			[
				'Draw games:',
				clasification[match.team1]['draw'],
				clasification[match.team2]['draw']
			],
			[
				'Lost games:',
				clasification[match.team1]['lost'],
				clasification[match.team2]['lost']
			],
		];

		var classTable = 'table-button-in text-align-left';
		var table = createTable(gameInfo, null, classTable, info);

		gameComparation.appendChild(table);

		var h2 = document.createElement('h2');
		h2.id = 'location-' + reference;
		h2.className = 'button-style button';
		h2.innerHTML = '<img class="icon-menu-principal" src="icons/pin.png"> Location';

		divFlex.appendChild(h2);

		var gameLocation = document.createElement('div');
		gameLocation.id = 'location-' + reference + '-in';
		gameLocation.className = 'button-style-in separator-6px';

		divFlex.appendChild(gameLocation);

		var iframe = document.createElement('iframe');
		iframe.className = 'location';

		//Get the location
		switch (match.location) {
			case "Mordor":
				iframe.src = location[0].location;
				break;
			case "Narnia":
				iframe.src = location[1].location;
				break;
			case "Springfield":
				iframe.src = location[2].location;
				break;
			case "Gotham":
				iframe.src = location[3].location;
				break;
			case "Atlantis":
				iframe.src = location[4].location;
				break;
			case "Area-51":
				iframe.src = location[5].location;
				break;
			default:
				break;
		}

		gameLocation.append(iframe);

		parent.appendChild(container);
	}
}

function fillChats(data) {

	var parent = document.getElementById('div-chats');
	for (var i = 0; i < data.length; i++) {
		var match = data[i];
		var reference = match.day + match.team1 + match.team2
		var h2 = document.createElement('h2');
		h2.id = 'chat-' + reference;
		h2.className = 'button-style button chat';
		h2.innerHTML = '<img class="chat-calendar" src="./icons/chat.png"> ' + match.day +
			' ' +
			'<img class="chat-calendar" src="./icons/principal-logo.png"> ' + match.team1 + ' vs ' + match.team2;

		parent.appendChild(h2);

		var gameChat = document.createElement('div');
		gameChat.id = 'chat-' + reference + '-in';
		gameChat.className = 'button-style-in';

		parent.appendChild(gameChat);

		var chatBox = document.createElement('div');
		chatBox.id = 'chat-box-' + reference;
		chatBox.className = 'chat-box';

		var exampleComment = document.createElement('div');
		exampleComment.className = 'chat-comment sign-in';
		exampleComment.innerHTML = 'Sign in to enable the chat';

		gameChat.appendChild(chatBox).appendChild(exampleComment);

		var loader = document.createElement('div');
		loader.id = 'loader-' + reference;
		loader.className = 'loader sign-out';

		chatBox.appendChild(loader);

		var chatCommand = document.createElement('div');
		chatCommand.id = 'chat-command';

		gameChat.appendChild(chatCommand);

		var signInChat = document.createElement('div');
		signInChat.id = 'sign-in-chat-command';
		signInChat.className = 'sign-in';
		signInChat.innerHTML = 'If you want to comment: Sign In';

		chatCommand.appendChild(signInChat);

		var signOutChat = document.createElement('div');
		signOutChat.id = 'sign-out-chat-command';
		signOutChat.className = 'sign-out flex-row flex-no-wrap';

		chatCommand.appendChild(signOutChat);

		var comment = document.createElement('input');
		comment.id = 'add-comment-' + reference;
		comment.className = 'add-comment';
		comment.type = 'text';
		comment.placeholder = 'Add your comment';

		signOutChat.appendChild(comment);

		var button = document.createElement('button');
		button.id = reference;
		button.className = 'send-comment';
		button.innerHTML = 'Send';

		signOutChat.appendChild(button);
	}
}

function fillLocations(locations) {
	var parent = document.getElementById('div-locations');

	for (var i = 0; i < locations.length; i++) {

		var location = locations[i];

		var h2 = document.createElement('h2');
		h2.id = location.name;
		h2.className = 'button button-style';
		h2.innerHTML = '<img class="icon-menu-principal" src="icons/pin.png"> ' + location.name;

		parent.appendChild(h2);

		var container = document.createElement('div');
		container.id = location.name + '-in';
		container.className = 'button-style-in';

		parent.appendChild(container);

		var iframe = document.createElement('iframe');
		iframe.className = 'location';
		iframe.src = location.location;

		container.appendChild(iframe);
	}
}

function createTable(container, idName, className, data) {

	var table = document.createElement('table');
	table.className = className;

	for (var i = 0; i < data.length; i++) {
		var tr = document.createElement('tr');
		addTd(tr, data[i]);
		table.append(tr);
	}
	return table;
}

function addTd(parent, data) {
	for (var i = 0; i < data.length; i++) {
		var td = document.createElement('td');
		td.innerHTML = data[i];
		parent.appendChild(td);
	}
}
/***************************VISUAL SCRIPTS*****************************************/

function initialChecks() {
	//If is landscape at the start show the first-child of the sub-page
	if (!isPortrait()) {
		$('#left-hand-sub-pages').children().first().show();
	}
}

function positionChecks() {
	//If its portrait we dont add separation, if its landscape we add separation between
	//principal page and sub-page
	if (isPortrait()) {
		if (isSomethingVisibleById('left-hand-sub-pages .sub-page') &&
			isSomethingVisibleById('right-hand-sub-pages .sub-page')) {
			$('#principal-pages').hide();
			$('#left-hand-sub-pages .sub-page').hide();
		}
		if (isSomethingVisibleByClass('details')) {
			$('.details #details-notebook').hide();
			$('.details #details').show();
		}
	} else {
		if (isSomethingVisibleByClass('details')) {
			//Hide button back when is landscape
			$('.details #details').hide();
			$('.details #details-notebook').show();
		}

	}
	checkMarginSubPage();
}



function addEvents() {

	//Click on principal navbar
	$('.button-menu').on('click', function () {
		hideAllSubPages();
		openPrincipalPage(this.id);
		showLogoIfEmptySpace();
	});

	//Click on the buttons inside the home page
	$('.button').on('click', function () {
		triggerToggle(this.id);
	});

	//Click inside the toggle buttons
	$('.button-in').on('click', function () {
		hideAllSubPages();
		openSubPage(this.id);
		positionChecks();
	});

	//Click button Back inside the sub-pages
	$('.button-back').on('click', function () {
		//check if we have the double sub-page
		if (isSomethingVisibleById('right-hand-sub-pages .sub-page')) {
			//when we click on back always we hide the right han sub-page
			$('#right-hand-sub-pages .details').hide();
			//Then depends on if is portrait or landscape we show schedules or principal
			if (isPortrait()) {
				$('#left-hand-sub-pages .schedules').show();
			} else {
				$('#principal-pages').show();
			}
		} else {
			//if is no double page, only hide the current sub-page

			hideCurrentSubPage(this.id);
		}
		//Once all is done, we check about if the sub-page is empty to fill with logo
		showLogoIfEmptySpace();

		//Check about margins
		checkMarginSubPage();
	});


	//Click on the tbody>tr of the schedule table
	$('.schedule tr').on('click', function () {
		$('.details-info').hide();
		makeDoublePage('schedules', this.id);
		positionChecks();
	})

	//Subscribe to chat
	$('.chat').on('click', function () {
		var id = this.id.slice(5);
		//Get posts
		getPosts(id);
	})

	$(window).on("resize", function () {
		//First check if is some sub-page visible and if we are in portrait mode
		if (isPortrait() && isSomethingVisibleByClass('sub-page')) {
			//Check if the sub-page showing is logo and then hide it or not
			if (isSomethingVisibleById('page-logo')) {
				$('#page-logo').hide();
			} else {
				$('#principal-pages').hide();
			}
		} else {
			//Check if in landscape is showing some sub-page, if not, show logo page

			showLogoIfEmptySpace();

			//if is in landscape depends on the page-details is showing we show o page-schedules or principal page
			if (isSomethingVisibleByClass('details')) {
				$('#page-schedules').show();
			} else {
				$('#principal-pages').show();
			}
		}

		//Make checks about position
		positionChecks();

	});
}

//Hide principal pages
function hidePrincipalPages() {
	$('#principal-pages').hide();
}

//Hide all the sub-pages
function hideAllSubPages() {
	$('.sub-page').hide();
}

//Trigger the button of navbar navigation (HOME,ABOUT,SIGN IN)
function openPrincipalPage(id) {
	$('.page').hide();
	$('#page-' + id).show();
}

//Trigger the flip down of the buttons of the principal menu
function triggerToggle(id) {
	$('#' + id + '-in').animate({
		height: 'toggle'
	}, 300);

}

//Trigger the button of navbar navigation (HOME,ABOUT,SIGN IN)
function openSubPage(id) {
	if (isPortrait()) {
		$('#principal-pages').hide();
	}
	$('#page-' + id).show();
	//Check if the page opened is some details page  **GUARRADA**
	if (isSomethingVisibleByClass('details')) {
		$('#header-details').show();
	}
}

//Make double page
function makeDoublePage(leftPage, rightPage) {
	$('#principal-pages').hide();
	$('.subpage').hide();
	openSubPage(leftPage);
	openSubPage(rightPage);
}

//Trigger the button Back of the sub-pages
function hideCurrentSubPage(id) {
	$('#page-' + id).hide();
	$('#principal-pages').show();
}

//Check if the phone is portrait or landscape
function isPortrait() {
	return (window.innerHeight > window.innerWidth ||
		window.orientation == 0 ||
		!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent)))
}

//Add or Remove margin-left in sub-pages depends on if its landscape or portrait
function checkMarginSubPage() {

	//Check if there is only principal menu and sup-page
	if (!isPortrait() && isSomethingVisibleByClass('sub-page')) {
		$('#left-hand-sub-pages').addClass('sub-pages-margin');
	} else {
		$('#left-hand-sub-pages').removeClass('sub-pages-margin');
	}
	//Check if schedules are showing to put some margin to the details page
	if (!isSomethingVisibleById('principal-pages') &&
		isSomethingVisibleById('page-schedules')) {
		$('#right-hand-sub-pages').addClass('sub-pages-margin');

	} else {
		$('#right-hand-sub-pages').removeClass('sub-pages-margin');
	}

}

//Check if some page is visible by Id(Agenda, Schedules, Results, Teams, Locations...)
function isSomethingVisibleById(name) {
	return $('#' + name).is(':visible');
}

//Check if some page is visible by Class(Agenda, Schedules, Results, Teams, Locations...)
function isSomethingVisibleByClass(name) {
	return $('.' + name).is(':visible');
}

function showLogoIfEmptySpace() {
	if (!isPortrait() && !isSomethingVisibleByClass('sub-page')) {
		$('#left-hand-sub-pages').children().first().show();
	}
}

function fadeOutLeft(element) {
	element.animate({
		opacity: 0, // animate slideUp
		marginLeft: '-200px'
	}, 'fast', 'linear', function () {
		$(this).hide();
	});
}
/***************************VISUAL SCRIPTS*****************************************/

/***************************FIREBASE SCRIPTS*****************************************/


function addFirebase(matches) {
	//Add eventListeners to the buttons
	document.getElementById('login-google').addEventListener('click', loginGoogle);
	document.getElementById('login').addEventListener('click', login);
	document.getElementById('logout').addEventListener('click', logout);
	$('.send-comment').on('click', function () {
		writeNewPost(this.id);
	});
	$('.add-comment').keyup(function (e) {
		if (e.keyCode == 13) {
			//Slice the id to get the firebase id
			var id = this.id.slice(12);
			writeNewPost(id);

		}
	});
	//Event to check if the user has logged in
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			//Hide and show all the divs depends on the user status
			$('.sign-in').hide();
			$('.sign-out').show();

		} else {
			$('.sign-out').hide();
			$('.sign-in').show();
		}
	});

}


//Function login w/ Google
function loginGoogle() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider);
}

//Function login w/ user and password
function login() {
	var email = document.getElementById('input-user').value;
	var password = document.getElementById('input-pass').value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			alert('Code error: ' + errorCode + '<br>Message: ' + errorMessage);
		});
	}

	//Function logout
	function logout() {
		firebase.auth().signOut().then(function () {
			//Everything allright
		}, function (error) {
			//Some error happened
		});
	}

	function writeNewPost(idChat) {

		var text = document.getElementById('add-comment-' + idChat).value;

		var userName = getUserName(firebase.auth().currentUser.displayName)
		//Check if the message is empty
		if (text) {

			//A post entry
			var postData = {
				user: userName,
				body: text
			};

			//Get a key for a new post
			var postName = idChat;
			var newPostKey = firebase.database().ref().child(postName).push().key;

			var updates = {};
			updates['/' + postName + '/' + newPostKey] = postData;

			document.getElementById('add-comment-' + idChat).value = '';

			return firebase.database().ref().update(updates);
		}
	}

	function getUserName(userName) {
		if(userName) {
				return userName;
			} else {
				return 'Guest';
			}
	}

	function getPosts(reference) {

		firebase.database().ref(reference).on('value', function (snapshot) {

			var posts = snapshot.val();

			var userName = getUserName(firebase.auth().currentUser.displayName);

			//Get the chat by Id
			var logs = document.getElementById('chat-box-' + reference);

			if (posts) {
				logs.innerHTML = '';
			} else {
				var chatBox = $('#chat-box-' + reference);
				var exampleComment = document.createElement('div');
				exampleComment.className = 'chat-comment sign-out';
				exampleComment.innerHTML = 'Welcome to the chat';

				chatBox.append(exampleComment);
			}

			for (var key in posts) {

				var element = posts[key];

				var comment = document.createElement('div');

				var user = document.createElement('div');
				user.append(element.user + " says:");

				var text = document.createElement('div');
				text.classList.add('comment-body');
				text.append(element.body);

				comment.append(text);

				var deleteComment = document.createElement('div');
				deleteComment.id = reference + '+' + key;
				deleteComment.classList = 'delete';
				deleteComment.innerHTML = 'X';

				var separator = document.createElement('div');
				separator.classList.add('separator-1px');
				separator.setAttribute = ('key', key);

				//If the user write the comment we change the comment style and the X to delete
				if (userName === element.user) {
					comment.classList.add('chat-comment-user');
					user.classList.add('comment-user-user');
					comment.append(deleteComment);
				} else {
					comment.classList.add('chat-comment');
					user.classList.add('comment-user');
				}


				logs.append(user);
				logs.append(comment);
				logs.append(separator);

			}

			//Add the eventlistener to delete post
			$('.delete').on('click', function () {
				deletePost(this.id);
			});
			//Put scroll to bottom
			var chatBox = $('#chat-box-' + reference);
			chatBox.animate({
				scrollTop: chatBox.prop("scrollHeight")
			}, 100);

			$('#loader-' + reference).hide();
		});

	}

	function deletePost(reference) {
		var arrayKeys = reference.split('+');
		var id = arrayKeys[0];
		var key = arrayKeys[1];
		firebase.database().ref(id).child(key).remove();
		getPosts(id);
	}

	/***************************FIREBASE SCRIPTS*****************************************/
