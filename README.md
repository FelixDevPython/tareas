# Gestor de Tareas

Un gestor de tareas simple y funcional construido con HTML, CSS y JavaScript vanilla. Permite crear, listar, cambiar estado y eliminar tareas fácilmente.

## Características

✅ **Agregar tareas** - Crea nuevas tareas con nombre, descripción, estado y fecha de entrega  
✅ **Listar tareas por estado** - Visualiza las tareas organizadas en tablas por estado  
✅ **Cambiar estado** - Modifica el estado de una tarea (Por hacer → En progreso → Completada)  
✅ **Eliminar tareas** - Elimina tareas por ID  
✅ **Interfaz web moderna** - Diseño limpio y responsivo  

## Archivos del Proyecto

- `index.html` - Estructura HTML con formulario y contenedores
- `style.css` - Estilos CSS para la interfaz
- `tareas.js` - Lógica de la aplicación (JavaScript)
- `README.md` - Este archivo

## Cómo usar

### 1. Abrir en el navegador

Simplemente abre `index.html` en tu navegador:

```bash
# Opción 1: Doble clic en index.html
# Opción 2: Arrastra index.html al navegador
# Opción 3: Usa un servidor local
python -m http.server 8000
# Luego ve a: http://localhost:8000
```

### 2. Agregar una tarea

1. Rellena el formulario "Agregar Nueva Tarea" con:
   - **Nombre**: Título de la tarea
   - **Descripción**: Detalles de la tarea
   - **Estado**: Selecciona entre "Por hacer", "En progreso" o "Completada"
   - **Fecha de entrega**: Selecciona una fecha

2. Haz clic en **"Agregar Tarea"**

### 3. Listar tareas

Haz clic en **"Listar Tareas por Estado"** para ver todas las tareas organizadas en tablas por su estado actual.

### 4. Cambiar el estado de una tarea

1. En la tabla de tareas, haz clic en el botón **"Cambiar"** de la tarea
2. Ingresa el nuevo estado (Por hacer / En progreso / Completada)
3. Confirma el cambio

### 5. Eliminar una tarea

Haz clic en el botón **"Eliminar"** de la tarea que deseas eliminar.

## Estados disponibles

- **Por hacer** - Tareas pendientes de iniciar
- **En progreso** - Tareas en proceso
- **Completada** - Tareas finalizadas

## Identificador de tareas

Cada tarea recibe automáticamente un ID único que la identifica. Este ID se usa para cambiar estado o eliminar tareas.

## Ejemplo de uso

1. Agregar: "Estudiar JavaScript" → Por hacer → 2026-02-28
2. Listar tareas (verás la tarea con ID 1)
3. Cambiar estado de ID 1 a "En progreso"
4. Listar nuevamente (verás la tarea en la sección "En progreso")
5. Eliminar tarea con ID 1

## Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos y responsivos
- **JavaScript (Vanilla)** - Sin dependencias externas
- **DOM API** - Manipulación del documento

## Notas

- Los datos se guardan **en memoria** (se pierden al recargar la página)
- Para persistencia, sería necesario agregar localStorage o una base de datos
- La aplicación es completamente funcional sin necesidad de servidor backend

## Mejoras futuras

- Guardar datos en localStorage
- Editar tareas existentes
- Filtrar por estado específico
- Exportar tareas a PDF
- Integración con backend

## Autor

Proyecto desarrollado como ejercicio de programación desde cero con Inteligencia Artificial.

---

¡Disfruta organizando tus tareas! 📝
