import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import jwt from 'jsonwebtoken'
import pg from 'pg'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'

// Cargamos en memoria las variables de entorno
dotenv.config();

const app = express();

const PUERTO = process.env.PORT || 3000;
const SECRETO = process.env.SECRETO
const DB_NOMBRE = process.env.DB_NOMBRE;
const DB_PASS = process.env.DB_PASS;
const DB_PUERTO = process.env.DB_PUERTO;
const DB_USUARIO = process.env.DB_USUARIO;

// Conexión a BD
const { Pool } = pg;
const pool = new Pool({
    password: DB_PASS,
    database: DB_NOMBRE,
    user: DB_USUARIO,
    port: DB_PUERTO,
    host: 'localhost'
});

// Archivos estáticos
app.use(express.static('front'));
app.use(express.json());

// Middleware
// Habilitar recepción de datos via json y urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/productos', async (req, res) => {
    try {
        const { nombre, marca, stock, categoria } = req.body;
        const result = await pool.query('INSERT INTO productos (nombre, marca, stock, categoria) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, marca, stock, categoria]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, marca, stock, categoria } = req.body;
        const result = await pool.query('UPDATE productos SET nombre = $1, marca = $2, stock = $3, categoria = $4 WHERE id = $5 RETURNING *', [nombre, marca, stock, categoria, id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM productos WHERE id = $1', [id]);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
