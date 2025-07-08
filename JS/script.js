//Noticias de HTML
const xhr = new XMLHttpRequest();
xhr.open('GET', 'noticias.json', true);

xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    let html = '';
    data.noticias.forEach(noticia => {
      html += "<div class='noticia'>";
      html += "<strong>" + noticia.titulo + "</strong><br>";
      html += noticia.contenido;
      html += "</div>";
    });
    document.getElementById('noticias').innerHTML = html;
  }
};

xhr.send();

