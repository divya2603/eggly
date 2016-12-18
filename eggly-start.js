angular.module('eggly',[])
.controller('MainCtrl',function($scope){
	$scope.categories=[
		{"id":"0","name":"Development"},
		{"id":"1","name":"Design"},
		{"id":"2","name":"Exercise"},
		{"id":"3","name":"Humor"}
	];

	$scope.bookmarks=[
		{"id":"0","title":"Angular JS","url":"http://angularjs.org","category":"Development"},
		{"id":"1","title":"Egghead.io","url":"http://angularjs.org","category":"Development"},
		{"id":"2","title":"A List Apart","url":"http://alistapart.com","category":"Design"},
		{"id":"3","title":"One Page Love","url":"http://onepagelove.com","category":"Design"},
		{"id":"4","title":"MobilitywOD","url":"http://mobilitywod.com","category":"Design"},
		{"id":"5","title":"Robb Wolf","url":"http://robbwolf.com","category":"Exercise"},
		{"id":"6","title":"Senor Gif","url":"http://memebase.cheeseburger.com/senorgif","category":"Exercise"},
		{"id":"7","title":"Wimp","url":"http://wimp.com","category":"Humor"},
		{"id":"8","title":"Dump","url":"http://dump.com","category":"Humor"}
	];
	// currentCategory to keep track of current category as well as dynamnically applying classes
	$scope.currentCategory=null;

	function setCurrentCategory(category){
		$scope.currentCategory=category;

		cancelEditing();
		cancelCreating();
	}
	function isCurrentCategory(category){
		return $scope.currentCategory !== null && $scope.currentCategory.name === category.name;
	}
	//by attaching function to scope it can be used in view
	$scope.setCurrentCategory=setCurrentCategory;
	$scope.isCurrentCategory=isCurrentCategory;
	//====================================================//
	// CRUD						 						 //
	//====================================================//
	function resetCreateForm(){
		$scope.newBookmark={
			id:"",
			title:"",
			url:"",
			category:$scope.currentCategory
		}
	}

	function createBookmark(bookmark){
		console.log(bookmark)
		bookmark.id=$scope.bookmarks.length;
		$scope.bookmarks.push(bookmark);

		resetCreateForm();
	}
	$scope.createBookmark=createBookmark;

	$scope.editedBookmark=null;
	function setEditedBookmark(bookmark){
		$scope.editedBookmark=angular.copy(bookmark);
	}

	function updateBookmark(bookmark){
		var index=_.findIndex($scope.bookmarks,function(b){
			console.log(b)
			return b.id === bookmark.id;
		});

		$scope.bookmarks[index]=bookmark;

		$scope.editedBookmark=null;
		$scope.isEditing=false;
	}

	function isSelectedBookmark(bookmarkId){
		return $scope.editedBookmark && $scope.bookmarks.id === bookmarkId;
	}

	$scope.setEditedBookmark=setEditedBookmark;
	$scope.isSelectedBookmark=isSelectedBookmark;
	//====================================================//
	// creating and editing states						  //
	//====================================================//
	$scope.isCreating=false;
	$scope.isEditing=false;

	function startEditing(){
		$scope.isCreating=false;
		$scope.isEditing=true;
	}
	function cancelEditing(){
		$scope.isEditing=false;
	}
	function startCreating(){
		$scope.isCreating=true;
		$scope.isEditing=false;

		resetCreateForm();
	}
	function cancelCreating(){
		$scope.isCreating=false;
		$scope.isEditing=true;
	}
	function shouldShowCreating(){
		return $scope.currentCategory && !$scope.isEditing;
	}
	function shouldShowEditing(){
		return $scope.currentCategory && !$scope.isCreating;
	}
	
	$scope.startCreating=startCreating;
	$scope.cancelCreating=cancelCreating;
	$scope.startEditing=startEditing;
	$scope.shouldShowCreating=shouldShowCreating;
	$scope.shouldShowEditing=shouldShowEditing;
	$scope.cancelEditing=cancelEditing;
});