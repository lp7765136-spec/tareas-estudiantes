let tareas = JSON.parse(localStorage.getItem("tareasElegante")) || [];
const titulo = document.getElementById("titulo"), materia = document.getElementById("materia"),
descripcion = document.getElementById("descripcion"), fecha = document.getElementById("fecha"),
prioridad = document.getElementById("prioridad"), btn = document.getElementById("btnAgregar"),
lista = document.getElementById("listaTareas"), contador = document.getElementById("contador"),
profesor = document.getElementById("profesor"), tipo = document.getElementById("tipo"),
estado = document.getElementById("estado");

function guardar(){ localStorage.setItem("tareasElegante", JSON.stringify(tareas)); }

btn.addEventListener("click", () => {
    if (!titulo.value.trim()) { alert("⚠️ El campo TÍTULO falta sin llenar"); titulo.focus(); return; }
    if (!materia.value.trim()) { alert("⚠️ El campo MATERIA falta sin llenar"); materia.focus(); return; }
    if (!descripcion.value.trim()) { alert("⚠️ El campo DESCRIPCIÓN falta sin llenar"); descripcion.focus(); return; }
    if (!fecha.value) { alert("⚠️ El campo FECHA falta sin llenar"); fecha.focus(); return; }
    if (!profesor.value.trim()) { alert("⚠️ El campo PROFESOR falta sin llenar"); profesor.focus(); return; }

    tareas.unshift({ 
        id: Date.now(), titulo: titulo.value.trim(), materia: materia.value.trim(), 
        descripcion: descripcion.value.trim(), fecha: fecha.value, prioridad: prioridad.value,
        profesor: profesor.value.trim(), tipo: tipo.value, estado: estado.value
    });
    guardar(); render();
    titulo.value = materia.value = descripcion.value = fecha.value = profesor.value = "";
});

function render(){
    contador.textContent = `${tareas.length} tareas`;
    if(tareas.length == 0){ lista.innerHTML = `<div style='text-align:center;padding:40px;color:#aaa'>Aún no hay tareas</div>`; return; }
    lista.innerHTML = tareas.map(t => `
        <div class="tarea ${t.prioridad}">
            <strong>${t.titulo} <span style='color:#6c5bff'>${t.materia} - ${t.tipo}</span></strong>
            <p>${t.descripcion}</p>
            <small>👨‍🏫 ${t.profesor} | 📅 ${t.fecha} | ${t.prioridad} | 📊 ${t.estado}</small><br>
            <button onclick="eliminar(${t.id})">Eliminar</button>
        </div>
    `).join("");
}
window.eliminar = (id) => { tareas = tareas.filter(t=>t.id!==id); guardar(); render(); }
render();
