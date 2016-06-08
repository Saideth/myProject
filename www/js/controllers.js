angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicPopup, $timeout,$cordovaSQLite) {
    
    $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Agenda',
       template: 'Datos guardados'
     });
    }
    
    $scope.guardar = function(persona){
        
        $cordovaSQLite.execute(db, 'INSERT INTO agenda (nombre,apellido,telefono,email,fecha) VALUES (?,?,?,?,?)', [persona.nombre,persona.apellido,persona.telefono,persona.email,persona.fecha])
        .then(function(result) {
            $scope.statusMessage = "Registro guardado!";
        }, function(error) {
            $scope.statusMessage = "Error al guardar: " + error.message;
        })
        
        /*
        console.log("Nombre: "+persona.nombre);
        console.log("Apellido: "+persona.apellido);
        console.log("Telefono: "+persona.telefono);
        console.log("Email: "+persona.email);
         console.log("Fecha: "+persona.fecha);
        */
    }
    
})

.controller('ChatsCtrl', function($scope, Chats,$cordovaSQLite) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  //$scope.chats = [];
  
  /*
  $cordovaSQLite.execute(db, 'SELECT * FROM agenda ORDER BY id DESC')
       .then(
          function(result) {
             if (result.rows.length > 0) {
                      for(var i = 0; i < result.rows.length; i++)
                      { 
                        $scope.chats.push({"nombre":result.rows.item(i).nombre,
                                    "apellido":result.rows.item(i).apellido,
                                    "telefono":result.rows.item(i).telefono,
                                    "email":result.rows.item(i).email});
                                    "fecha":result.rows.item(i).fecha});
                          
                      }
                    }
                },
                function(error) {
                    $scope.statusMessage = "Error on loading: " + error.message;
                }
        );
  */

  $scope.getAll = function()
  {
      $scope.chats = Chats.all();
  };
  
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,$cordovaSQLite) {
  
  //$scope.chat = Chats.get($stateParams.chatId);
  $scope.persona = Chats.get($stateParams.chatId);
  
  $scope.guardar = function(persona){
        
        $cordovaSQLite.execute(db, 'UPDATE agenda set nombre=?,apellido=?,telefono=?,email=?,fecha=? where id = ?', [persona.nombre,persona.apellido,persona.telefono,persona.email,persona.fecha,persona.id])
        .then(function(result) {
            $scope.statusMessage = "Registro guardado!";
        }, function(error) {
            $scope.statusMessage = "Error al guardar: " + error.message;
        })
        
        console.log("NOMBRE: "+persona.nombre);
        console.log("ID: "+persona.id);
    }
  
    
  
})




//.controller('MineCtrl', function($scope) {
 // $scope.settings = {
   // enableFriends: true
  //};
//})



.controller('AccountCtrl', function($scope) {
    
    $scope.takePicture = function(){   
        var cameraOptions = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL                
         };
        var success = function(data){
        $scope.$apply(function () {
             /*
               remember to set the image ng-src in $apply,
               i tried to set it from outside and it doesn't work.
             */
               $scope.cameraPic = "data:image/jpeg;base64," + data;
             });
         };
        var failure = function(message){
             alert('Failed because: ' + message);
        };
        //call the cordova camera plugin to open the device's camera
        navigator.camera.getPicture( success , failure , cameraOptions );            
    };
  $scope.settings = {
    enableFriends: true
  };
});