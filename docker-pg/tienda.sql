-- Conectar a la base de datos 'tienda'
\c tienda;


CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    stock INT NOT NULL
);

-- Insertar los datos en la tabla 'productos'
INSERT INTO productos (id, nombre, marca, categoria, stock) VALUES
(3, 'Tablet Z7', 'MarcaC', 'Tabletas', 200),
(5, 'Auriculares Inalámbricos', 'MarcaE', 'Accesorios', 300),
(6, 'Cámara Digital SLR', 'MarcaF', 'Cámaras', 40),
(7, 'Smartwatch Serie 5', 'MarcaG', 'Wearables', 120),
(8, 'Consola de Videojuegos', 'MarcaH', 'Videojuegos', 80),
(9, 'Router WiFi 6', 'MarcaI', 'Redes', 60),
(10, 'Altavoz Inteligente', 'MarcaJ', 'Hogar Inteligente', 250),
(11, 'laptop', 'MarcaV', 'computacion', 1000);

