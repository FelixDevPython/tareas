let tareas = [];
let siguienteId = 1;
let filtroActual = '';

// Función para agregar una nueva tarea (asigna ID automáticamente)
function agregarTarea(tarea) {
    if (!tarea.id) {
        tarea.id = siguienteId++;
    }
    tareas.push(tarea);
}

// Función para mostrar estadísticas
function mostrarEstadisticas() {
    const porHacer = tareas.filter(t => t.estado === 'Por hacer').length;
    const enProgreso = tareas.filter(t => t.estado === 'En progreso').length;
    const completada = tareas.filter(t => t.estado === 'Completada').length;
    const total = tareas.length;

    const html = `
        <div class="estadistica-card">
            <h4>Total</h4>
            <div class="numero">${total}</div>
        </div>
        <div class="estadistica-card por-hacer">
            <h4>Por hacer</h4>
            <div class="numero">${porHacer}</div>
        </div>
        <div class="estadistica-card en-progreso">
            <h4>En progreso</h4>
            <div class="numero">${enProgreso}</div>
        </div>
        <div class="estadistica-card completada">
            <h4>Completada</h4>
            <div class="numero">${completada}</div>
        </div>
    `;
    
    document.getElementById('estadisticas').innerHTML = html;
}

// Función para listar tareas agrupadas por estado como tabla (ID, Título, Estado)
function listarTareasPorEstado(filtro = '') {
    if (tareas.length === 0) {
        document.getElementById('listadoTareas').innerHTML = '<p style="text-align: center; color: #999;">No hay tareas registradas.</p>';
        mostrarEstadisticas();
        return;
    }

    const grupos = {};
    const tareasFiltradas = filtro ? tareas.filter(t => t.estado === filtro) : tareas;

    tareasFiltradas.forEach(t => {
        const estado = t.estado || 'Sin estado';
        if (!grupos[estado]) grupos[estado] = [];
        grupos[estado].push(t);
    });

    let html = '';
    const estadosOrden = ['Por hacer', 'En progreso', 'Completada'];
    
    estadosOrden.forEach(estado => {
        if (grupos[estado] && grupos[estado].length > 0) {
            html += `<div class="estado-grupo">
                        <h3>📋 Estado: ${estado} (${grupos[estado].length})</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Descripción</th>
                                    <th>Fecha de entrega</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>`;
            
            grupos[estado].forEach(t => {
                html += `<tr>
                            <td><strong>#${t.id}</strong></td>
                            <td>${t.nombre}</td>
                            <td>${t.descripcion}</td>
                            <td>${t.fechaEntrega}</td>
                            <td class="acciones-tarea">
                                <button class="btn-warning" onclick="abrirFormularioCambioEstado(${t.id})">✏️ Cambiar</button>
                                <button class="btn-danger" onclick="eliminarTarea(${t.id})">🗑️ Eliminar</button>
                            </td>
                        </tr>`;
            });
            
            html += `</tbody>
                        </table>
                    </div>`;
        }
    });

    document.getElementById('listadoTareas').innerHTML = html;
    mostrarEstadisticas();
}

// Función para eliminar tarea por ID
function eliminarTarea(id) {
    if (!confirm(`¿Estás seguro de que deseas eliminar la tarea con ID ${id}?`)) {
        return false;
    }

    const index = tareas.findIndex(t => t.id === id);
    if (index === -1) {
        mostrarMensaje(`No se encontró tarea con ID ${id}.`, 'error');
        return false;
    }

    const nombreTarea = tareas[index].nombre;
    tareas.splice(index, 1);
    mostrarMensaje(`✓ Tarea eliminada: ${nombreTarea} (ID ${id})`, 'success');
    listarTareasPorEstado(filtroActual);
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
    mostrarMensaje(`✓ Estado actualizado: ${tarea.nombre} → ${tarea.estado}`, 'success');
    listarTareasPorEstado(filtroActual);
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
    const filtroEstado = document.getElementById('filtroEstado');

    // Mostrar tareas al cargar la página
    listarTareasPorEstado();

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
        document.getElementById('filtroEstado').value = '';
        listarTareasPorEstado();
    });

    // Listener para filtrar por estado
    filtroEstado.addEventListener('change', (e) => {
        filtroActual = e.target.value;
        listarTareasPorEstado(filtroActual);
    });
});
