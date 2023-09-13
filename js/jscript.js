$(document).ready(function() {
   listar();

});

//  listar datos en la tabla
function listar() {
    $.ajax({
        type: "GET",
        url: "http://localhost/Api-main/persona.php",
        data: {},
        dataType: "json",
        success: function (res) {
            var lis="";
            $.each(res, function (i, datos) { 
                 lis += "<tr>";
                 lis += "<th scope='row'>"+datos.id+"</th>";
                 lis += "<td>"+datos.nombre+"</td>";
                 lis += "<td>"+datos.apellido+"</td>";
                 lis += "<td><button type='button' class='btn btn-outline-warning boton' data-id='"+datos.id+"'  data-nombre='"+datos.nombre+"'  data-apellido='"+datos.apellido+"'  data-bs-toggle='modal' data-bs-target='#myModal'>Actualizar</button></td>";
                 lis += "<td><button class='btn btn-outline-danger eliminar' data-id='"+datos.id+"' >Eliminar</button></td>";
                 lis += "</tr>";
            });

           $("#tabla_datos").append(lis);

        }
    });
}

// Mostrar datos en el modal
$(document).on("click", ".boton", function() {
    
    $('#myModal').on('hidden.bs.modal', function () {
        $("#nombre").val("");
        $("#apellido").val("");
        $("#id").val("");
    });
    
    var id = $(this).data("id");
    var nombre = $(this).data("nombre");
    var apellido = $(this).data("apellido");
    
    $('#myModal').modal('show');
    $("#id").val(id);
    $("#nombre").val(nombre);
    $("#apellido").val(apellido);
    

});


// Eliminar datos 
$(document).on("click", ".eliminar", function () {
    var eliminar = $(this).data("id");

    $.ajax({
        url: "http://localhost/Api-main/persona.php?id=" + eliminar,
        type: "DELETE",
        success: function () {
            location.reload();
        }
    });
});

// Actualizar formulario 
$(".Actualizar").click(function() {
  
    var data = {
        nombre: $("#nombre").val(),
        apellido: $("#apellido").val(),
        id: $("#id").val()
    };

    $.ajax({
        url: "http://localhost/Api-main/persona.php",
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            location.reload();
        }
    });
});

   
// Crear usuario
$('#save').click(function() {
    var type = 'POST';
    if ($('#id').val() == '') {
        type = 'POST';
    } else {
        type = 'PUT';
    }

    var formData = $("#formulario").serialize();
    var dataArray = $("#formulario").serializeArray();
    
    $.ajax({
        url: "http://localhost/Api-main/persona.php",
        type: type,
        data: formData,
        success: function(response) {
            console.log(response.message); // Acceder al mensaje de la respuesta
            location.reload();
        }
    });
});



  


const exampleModal = document.getElementById('myModal')
if (exampleModal) {
  exampleModal.addEventListener('show.bs.modal', event => {
  })
}
