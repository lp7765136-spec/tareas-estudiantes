let tareas = JSON.parse(localStorage.getItem("tareasElegante")) || [];
const titulo = document.getElementById("titulo"), materia = document.getElementById("materia"),
descripcion = document.getElementById("descripcion"), fecha = document.getElementById("fecha"),
prioridad = document.getElementById("prioridad"), btn = document.getElementById("btnAgregar"),
lista = document.getElementById("listaTareas"), contador = document.getElementById("contador");

function guardar(){ localStorage.setItem("tareasElegante", JSON.stringify(tareas)); }

btn.addEventListener("click", () => {
  if(!titulo.value.trim()) return alert("Escribe el título");
  tareas.unshift({ id: Date.now(), titulo: titulo.value, materia: materia.value || "General", descripcion: descripcion.value, fecha: fecha.value, prioridad: prioridad.value });
  guardar(); render();
  titulo.value = materia.value = descripcion.value = fecha.value = "";
});

function render(){
  contador.textContent = `${tareas.length} tareas`;
  if(tareas.length === 0){ lista.innerHTML = `<div style='text-align:center;padding:40px;color:#aaa'>📭 Aún no hay tareas<br><small>Agrega tu primera tarea</small></div>`; return; }
  lista.innerHTML = tareas.map(t => `
    <div class="tarea ${t.prioridad}">
      <strong>${t.titulo} <span style='color:#6c3bff;font-weight:400'>• ${t.materia}</span></strong>
      <p>${t.descripcion || "Sin descripción"}</p>
      <small>📅 ${t.fecha || "Sin fecha"} • ${t.prioridad}</small><br>
      <button onclick="eliminar(${t.id})">Eliminar</button>
    </div>
  `).join("");
}
window.eliminar = (id) => { tareas = tareas.filter(t=>t.id!==id); guardar(); render(); }
render();