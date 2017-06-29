angular.module('business').factory('commonService', ['$q','$http', '$localStorage', function($q, $http, $localStorage){

   	
   	return ({
   		userRegistration : userRegistration,
   		userLogin : userLogin,
   		alertMessage : alertMessage,
   		sendingMail : sendingMail,
   		findEmail : findEmail,
   		userRoles : userRoles,
   		anonymousToken : anonymousToken,
   		logOut : logOut,
   		pluginCredential : pluginCredential

   	});

   	function alertMessage (message, type, $alert){
			var alertMessage = 'Sorry something went wrong, Please try again later';
			var hint =  '<br> Hint: '; 
			animation = 'am-fade-and-scale';
			return function(){$alert({title: type, 
				content: (type=='error')? ((message)? (alertMessage + hint + message):alertMessage):message,
				 placement: 'top-right', type: type, animation: animation, keyboard: true, duration:4});}();
		} 




	function pluginCredential(Pidsdata) {	
	    var deferred = $q.defer();      
	    $http.post($localStorage.baseURL+'/api/business-insights/v1/plugin/credentials', Pidsdata,{
		    	headers: {
		    		'Authorization': $localStorage.accessToken
		    	}
	    }).success(function(data, status) {
		    	// var data = {};
		    	// data = datas.credent;
	    		console.log(JSON.stringify(data), status);
	    		data.status = status;
				if (status === 200) {
					deferred.resolve(data);
				} else {
					deferred.resolve(data);
				}
			}).error(function(data) {
					deferred.reject(data);
				});
			return deferred.promise;
	}			






function logOut(logout, accessToken) {
    var deferred = $q.defer();  
    console.log(accessToken);
    $http.delete($localStorage.baseURL+'/api/business-insights/v1/auth/token',{
    	headers:{
    		'Authorization': accessToken
    		}
    }).success(function(data, status) {
    		console.log(JSON.stringify(data), status);
    		data.status = status;
			if (status === 200) {
				deferred.resolve(data);
			} else {
				deferred.resolve(data);
			}
		}).error(function(data) {
			 console.log(data)
				deferred.resolve(data);
			});
			return deferred.promise;
		}


function anonymousToken(anonymous) {
    var deferred = $q.defer();  
    $http.post($localStorage.baseURL+'/api/business-insights/v1/auth/token', anonymous,{
    	headers: {'action': 'search'}}).success(function(data, status) {
    		console.log(JSON.stringify(data), status);
    		data.status = status;
			if (status == 200) {
				deferred.resolve(data);
			} else {
				deferred.resolve(data);
			}
		}).error(function(data) {
			 console.log(data)
				deferred.resolve(data);;
			});
			return deferred.promise;
		}



function findEmail(mailData, accessToken) {	
    var deferred = $q.defer();  
    var mailData1 = JSON.stringify(mailData);
    console.log(mailData1);  
    $http.post($localStorage.baseURL+'/api/business-insights/v1/email/exist', mailData1,{
	    	headers: {
	    		'Authorization': accessToken
	    	}
    }).success(function(data, status) {
    		console.log(JSON.stringify(data), status);
    		data.status = status;
			if (status === 200) {
				deferred.resolve(data);
			} else {
				deferred.resolve(data);
			}
		}).error(function(data) {
				deferred.reject(data);
			});
		return deferred.promise;
	}			
		

function sendingMail(mailData) {	
    var deferred = $q.defer();  
    var mailData1 = JSON.stringify(mailData);
    console.log(mailData1);
    $http.post($localStorage.baseURL+'/api/business-insights/v1/mail', mailData1,{
    	headers: {'action': 'search'}}).success(function(data, status) {
    		console.log(JSON.stringify(data), status);
    		data.status = status;
			if (status === 200) {
				deferred.resolve(data);
			} else {
				deferred.resolve(data);
			}
		}).error(function(data) {
				deferred.reject(data);
			});
		return deferred.promise;
	}	

function userLogin(loginData, accessToken) {	
    var deferred = $q.defer();  
    $http.post($localStorage.baseURL+'/api/business-insights/v1/login', loginData,{
    	headers: {
    		'Authorization': accessToken
    	}
    }).success(function(data, status) {
    		console.log(JSON.stringify(data), status);
    		data.status = status;
			if (status === 200) {
				deferred.resolve(data);
			} else {
				deferred.resolve(data);
			}
		}).error(function(data) {
			 // console.log(data)
				deferred.resolve(data);;
			});
			return deferred.promise;
		}


function userRoles(localStorage) {	
    var deferred = $q.defer(); 
    $http.get($localStorage.baseURL+'/api/business-insights/v1/user/roles',{
    	headers: {'Authorization': localStorage.accessToken}
    }).success(function(data, status) {
    		console.log(JSON.stringify(data), status);
    		data.status = status;
			if (status === 200) {
				deferred.resolve(data);
			} else {
				deferred.resolve(data);
			}
		}).error(function(data) {
			 console.log(data)
				deferred.reject(data);;
			});
			return deferred.promise;
		}



  function userRegistration(userData, accessToken) {	
    var deferred = $q.defer();  
    $http.post($localStorage.baseURL+'/api/business-insights/v1/user/signup', userData,{
    		headers: {
    			'Authorization': accessToken
    		}
    	}).success(function(data, status) {
    		var data = {}
    		console.log(JSON.stringify(data), status);
    		data.status = status;
			if (status === 201) {
				deferred.resolve(data);
			} else {
				deferred.resolve(data);
			}
		}).error(function(data) {
			console.log('error message');
			    data.status = 500;
				deferred.resolve(data);
			});
			return deferred.promise;
		}

}]);

