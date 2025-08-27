<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Resultado de Reserva</title>
    <link rel="stylesheet" href="css/styles_resultado.css">
</head>
<body>
    <div class="container">
        <h1>Detalles de la Reserva</h1>
        <p><strong>Origen:</strong> ${reserva.origen}</p>
        <p><strong>Destino:</strong> ${reserva.destino}</p>
        <p><strong>Fecha de Salida:</strong> ${reserva.fechaSalida}</p>
        <p><strong>Fecha de Regreso:</strong> ${reserva.fechaRegreso}</p>

        <!-- Muestra la información de horarios y distancia obtenida de Prolog -->
        <div>
            <h3>Horarios y Distancia:</h3>
            <p>${reserva.validacionProlog}</p>
            <p>${reserva.horarios}</p>
        </div>
        <div>
            <h3>Información Adicional:</h3>
            <p><strong>Nombre:</strong> ${nombre}</p> <!-- Muestra el nombre -->
            <p><strong>Comentario:</strong> ${comentario}</p> <!-- Muestra el comentario -->
        </div>
    </div>
</body>
</html>
