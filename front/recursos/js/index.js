document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = '/productos'; 

    const formularioProducto = document.getElementById('formularioProducto');
    const listaProductos = document.getElementById('listaProductos');
    const formularioModificarProducto = document.getElementById('formularioModificarProducto');
    const seleccionarProducto = document.getElementById('seleccionarProducto');

    let productos = [];

    // Obtener productos iniciales
    const cargarProductos = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            productos = data;
            mostrarProductos();
            llenarSeleccionarProducto();
        } catch (error) {
            console.error('Error obteniendo productos:', error);
        }
    };

    // Agregar o actualizar producto
    formularioProducto.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const marca = document.getElementById('marca').value;
        const stock = document.getElementById('stock').value;
        const categoria = document.getElementById('categoria').value;

        const producto = { nombre, marca, stock: parseInt(stock), categoria };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });
            if (response.ok) {
                const nuevoProducto = await response.json();
                productos.push(nuevoProducto);
                mostrarProductos();
                llenarSeleccionarProducto();
                formularioProducto.reset();
            } else {
                console.error('Error agregando producto:', response.statusText);
            }
        } catch (error) {
            console.error('Error agregando producto:', error);
        }
    });

    // Modificar producto
    formularioModificarProducto.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = seleccionarProducto.value;
        const nombre = document.getElementById('modificarNombreProducto').value;
        const marca = document.getElementById('modificarMarcaProducto').value;
        const stock = document.getElementById('modificarStockProducto').value;
        const categoria = document.getElementById('modificarCategoriaProducto').value;

        const producto = { nombre, marca, stock: parseInt(stock), categoria };

        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });
            if (response.ok) {
                productos = productos.map(p => (p.id === parseInt(id) ? { ...producto, id: parseInt(id) } : p));
                mostrarProductos();
                llenarSeleccionarProducto();
                formularioModificarProducto.reset();
            } else {
                console.error('Error actualizando producto');
            }
        } catch (error) {
            console.error('Error actualizando producto:', error);
        }
    });

    // Eliminar producto
    window.eliminarProducto = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                productos = productos.filter(p => p.id !== id);
                mostrarProductos();
                llenarSeleccionarProducto();
            } else {
                console.error('Error eliminando producto');
            }
        } catch (error) {
            console.error('Error eliminando producto:', error);
        }
    };

    // Editar producto
    window.editarProducto = (id) => {
        const producto = productos.find(p => p.id === id);
        seleccionarProducto.value = producto.id;
        document.getElementById('modificarNombreProducto').value = producto.nombre;
        document.getElementById('modificarMarcaProducto').value = producto.marca;
        document.getElementById('modificarStockProducto').value = producto.stock;
        document.getElementById('modificarCategoriaProducto').value = producto.categoria;
    };

    // Mostrar productos
    const mostrarProductos = () => {
        listaProductos.innerHTML = '';
        productos.forEach(producto => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${producto.nombre} - ${producto.marca} - ${producto.stock} - ${producto.categoria}
                <button onclick="editarProducto(${producto.id})">Editar</button>
                <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
            `;
            listaProductos.appendChild(li);
        });
    };

    // Llenar dropdown de seleccionar producto
    const llenarSeleccionarProducto = () => {
        seleccionarProducto.innerHTML = '<option value="" disabled selected>Seleccione un producto</option>';
        productos.forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.id;
            option.textContent = producto.nombre;
            seleccionarProducto.appendChild(option);
        });
    };

    // Cargar productos al iniciar la página
    cargarProductos();
});
