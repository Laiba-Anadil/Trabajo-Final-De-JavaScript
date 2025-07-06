//Noticias de HTML
fetch('noticias.json')
  .then(response => response.json())
  .then(data => {
    let html = '';
    data.noticias.forEach(noticia => {
      html += "<div class = 'noticia'>";
      html += "<strong>" + noticia.titulo + "</strong><br>";
      html += noticia.contenido;
      html += "</div>";
    });
    document.getElementById('noticias').innerHTML = html;
  });
