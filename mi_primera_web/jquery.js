$("h2").css("color", "#90908d");
$(".card").css("background-color", "#f0f0f0");
$("#main-title").css("color", "#ea4b23");

$(".card:first").css("background-color", "#e0e0e0");

// Escuchamos el evento submit del formulario
$("#form-sugerencias").on("submit", function (e) {
  e.preventDefault(); // Evita que la página se recargue

  const nombre = $("#nombre").val();
  const texto = $("#sugerencia").val();

  const nuevaSugerencia = `
      <div class="card fade-in-top">
        <div class="text">
          <span>Enviado por: ${nombre}</span>
          <p>${texto}</p>
          <button class="btn btn--outline btn-eliminar">Eliminar</button>
        </div>
      </div>
    `;

  // 3. Lo agregamos al contenedor
  $("#lista-sugerencias").prepend(nuevaSugerencia);

  this.reset();
});

// Delegación de eventos para eliminar (por si quieres borrar una)
$("#lista-sugerencias").on("click", ".btn-eliminar", function () {
  $(this)
    .closest(".card")
    .fadeOut(300, function () {
      $(this).remove();
    });
});
