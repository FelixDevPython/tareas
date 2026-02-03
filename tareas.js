let tareas = [];
let siguienteId = 1;

// Función para agregar una nueva tarea (asigna ID automáticamente)
function agregarTarea(tarea) {
    if (!tarea.id) {
        tarea.id = siguienteId++;
    }
    tareas.push(tarea);
}

// Función para listar tareas agrupadas por estado como tabla (ID, Título, Estado)
function listarTareasPorEstado() {
    if (tareas.length === 0) {
        mostrarMensaje('No hay tareas registradas.', 'error');
        return;
    }

    const grupos = {};
    tareas.forEach(t => {
        const estado = t.estado || 'Sin estado';
        if (!grupos[estado]) grupos[estado] = [];
        grupos[estado].push(t);
    });

    let html = '';
    Object.keys(grupos).forEach(estado => {
        html += `<div class="estado-grupo">
                    <h3>Estado: ${estado}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>`;
        
        grupos[estado].forEach(t => {
            html += `<tr>
                        <td>${t.id}</td>
                        <td>${t.nombre}</td>
                        <td>${t.estado}</td>
                        <td class="acciones-tarea">
                            <button class="btn-warning" onclick="abrirFormularioCambioEstado(${t.id})">Cambiar</button>
                            <button class="btn-danger" onclick="eliminarTarea(${t.id})">Eliminar</button>
                        </td>
                    </tr>`;
        });
        
        html += `</tbody>
                    </table>
                </div>`;
    });

    document.getElementById('listadoTareas').innerHTML = html;
}

// Función para eliminar tarea por ID
function eliminarTarea(id) {
    const index = tareas.findIndex(t => t.id === id);
    if (index === -1) {
        mostrarMensaje(`No se encontró tarea con ID ${id}.`, 'error');
        return false;
    }

    const nombreTarea = tareas[index].nombre;
    tareas.splice(index, 1);
    mostrarMensaje(`✓ Tarea eliminada: ${nombreTarea} (ID ${id})`, 'success');
    listarTareasPorEstado();
    return true;
}

// Función para cambiar el estado de una tarea por ID
function cambiarEstado(id, nuevoEstado) {
    const estadosValidos = ['Por hacer', 'En progreso', 'Completada'];
    
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) {
        mostrarMensaje(`No se encontró tarea con ID ${id}.`, 'error');
        return false;
    }

    const encontrado = estadosValidos.find(e => e.toLowerCase() === nuevoEstado.toLowerCase());
    if (!encontrado) {
        mostrarMensaje(`Estado inválido. Usa: ${estadosValidos.join(' / ')}`, 'error');
        return false;
    }

    tarea.estado = encontrado;
    mostrarMensaje(`✓ Estado actualizado: ${tarea.nombre} (ID ${tarea.id}) → ${tarea.estado}`, 'success');
    listarTareasPorEstado();
    return true;
}

// Función para mostrar mensajes
function mostrarMensaje(texto, tipo) {
    const mensajeDiv = document.getElementById('mensajes');
    mensajeDiv.textContent = texto;
    mensajeDiv.className = `mensaje ${tipo}`;
    setTimeout(() => {
        mensajeDiv.className = 'mensaje';
    }, 3000);
}

// Función para abrir el formulario de cambio de estado
function abrirFormularioCambioEstado(id) {
    const nuevoEstado = prompt('Nuevo estado (Por hacer/En progreso/Completada):');
    if (nuevoEstado) {
        cambiarEstado(id, nuevoEstado);
    }
}

// Event listeners para la interfaz web
document.addEventListener('DOMContentLoaded', () => {
    const formTarea = document.getElementById('formTarea');
    const btnListar = document.getElementById('btnListar');

    formTarea.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const estado = document.getElementById('estado').value;
        const fechaEntrega = document.getElementById('fechaEntrega').value;

        agregarTarea({
            nombre,
            descripcion,
            estado,
            fechaEntrega
        });

        mostrarMensaje('✓ Tarea agregada exitosamente', 'success');
        formTarea.reset();
        listarTareasPorEstado();
    });

    btnListar.addEventListener('click', () => {
        listarTareasPorEstado();
    });
});
