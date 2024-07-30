# Crear contenedor

Crear contenedor de BD con postgresSQL

## Uso de Dockerfile

Crear la imagen con una Dockerfile

```dockerfile
docker build -t postgres:latest .
```

## Correr un contenedor

El contenedor está basado en la imagen creada arriba

```dockerfile
docker run --name docker-pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=tienda -p 5432:5432 -d postgres:latest
```

## Algunos comandos Docker

| Comando                                                             | Descripcion                                                                                                    |
| :------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------- |
| `docker images`                                                     | lista las imagenes (o agregar `ls`)                                                                            |
| `docker build -t nombre_imagen .`                                   | Cea una imagen desde Dockerfile (`-t` tag) con el tag `nombre_imagen`, y el punto (` . `) hace referencia a la ubicacion del Dockerfile.                                                                    |
| `docker build -t nombre_imagen:numero_version .`                    | Cea una imagen desde Dockerfile con version                                                                    |
| `docker rmi id_imagen`                                              | Borrar una imagen                                                                                              |
| `docker ps`                                                         | Lista los contenedores activos                                                                                 |
| `docker ps -a`                                                      | lista todos los contenedores                                                                                   |
| `docker run nombre_imagen`                                     | Inicializar un contenedor a partir de una imagen imagen                                                       |
| `docker run --rm nombre_imagen`                                     | rm elimina el contenedor una vez finalizada la ejecución                                                       |
| `docker run -d --name nombre_contenedor -p 4000:3000 nombre_imagen` | Corre el contenedor [create/pull/start] (`-p` puerto / `-d` en background o daemon / `--name` le da un nombre). Con respecto a los puertos, el primero es el local y el segundo el del contenedor (local:contenedor) |
| `docker create --name nombre_contenedor nombre_imagen`              | Iniciar un contenedor ya creado                                                                                |
| `docker start id_contenedor`                                        | Iniciar un contenedor ya creado                                                                                |
| `docker stop id_contenedor`                                         | Parar un contenedor                                                                                            |
| `docker rm id_contenedor`                                           | Eliminar un contenedor                                                                                            |
| `docker exec -it nombre_contenedor bash`                            | Entrar al contenedor interactivamente (SO linux)                                                               |
| `docker stats`                                                      | Muestra recursos utilizados                                                                                    |
