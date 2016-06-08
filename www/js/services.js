
angular.module('starter.services', [])

.factory('Chats', function($cordovaSQLite) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [];
  var chatObj = "0";

  
  return {
    all: function() {

      chats = [];

      $cordovaSQLite.execute(db, 'SELECT * FROM agenda ORDER BY nombre ASC')
       .then(
          function(result) {
             if (result.rows.length > 0) {
                      for(var i = 0; i < result.rows.length; i++)
                      { 
                        chats.push({"id":result.rows.item(i).id,
                                    "nombre":result.rows.item(i).nombre,
                                    "apellido":result.rows.item(i).apellido,
                                    "telefono":result.rows.item(i).telefono,
                                    "email":result.rows.item(i).email,
                                    "fecha":result.rows.item(i).fecha});
                      }
                    }
                },
                function(error) {
                    statusMessage = "Error on loading: " + error.message;
                }
        );

      return chats;
    },
    remove: function(chat) {
      $cordovaSQLite.execute(db, 'DELETE FROM agenda where id = ?',[chat.id])
      .then(function(result){
          statusMessage = "Borrado";
          chats.splice(chats.indexOf(chat), 1);
      },
      function(error){
          statusMessage = "Error: " + error.message;
      });
    },
    
    get: function(chatId) {

        chats = [];
        
        $cordovaSQLite.execute(db, 'SELECT * FROM agenda where id = ?',[chatId])
       .then(
          function(result) {
               
             if (result.rows.length > 0) {
                        chats.push({"id":result.rows.item(0).id,
                                    "nombre":result.rows.item(0).nombre,
                                    "apellido":result.rows.item(0).apellido,
                                    "telefono":result.rows.item(0).telefono,
                                    "email":result.rows.item(0).email,
                                    "fecha":result.rows.item(0).fecha});
                
                    }
                    
                },
                function(error) {
                    statusMessage = "Error on loading: " + error.message;
                }
        );

      return chats;

    }

  };


  
});