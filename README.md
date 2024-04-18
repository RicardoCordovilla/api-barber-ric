para iniciar el proyecto
1. npm init --y
2. dependecias de produccion
    npm install express dotenv sequelize pg pg-hstore
        express: para express
        dotenv: para usar .env variable de entorno 
        sequelize: ORM de sequelize
        pg: para integrar postgress
3. dependecias de desarrollo
    npm install -D nodemon
4. en el package.json agregamos comandos para ejecutar la api
    "start":"node ./src/app.js"
5. creamos la carpeta src
6. creamos el .env para manejar las variables de entorno
7. creamos un gitignore para ocultar en el repo .enb y node_modules
8. creamos carpetas models donde se van a alojar las carpetas 
    que contienen los controladores services y router, y model.js
    así como también initModels
9. creamos una carpeta utils/db.js
10. creamos src/app.js y src/config.js
11. en app.js agregamos las dependencias
12. config.js
13. en app.js accedemos al port importado desde config.js
14. utils/database.js
15. .env las variables de entorno
16. hacer los modelos de los diagramas de la base de datos
17. crear los controllers, services, router
18. instalar bcrypt para hashear la contraseña
19. crear utils/crypto.js aquí van las funcionalidades para encriptar y comparar
20. passport y jwt es para autenticar, crea un token con cierta información del usuario y la extrae con una palabra clave
21. en app.js creamos la ruta base para cada router
22. creamos una carpeta src/auth luego auth.services y auth.router
23. instalamos npm install passport-jwt passport jsonwebtoken
24. en users.controllers creamos un getuserbyemail para luego autenticar conun midlewhere
25. en app.js importamos db de utils/database
26. el init models nos genera las relaciones
27. en aunth controllers creamos loginuser usando getuserbyid usamos comparepassword
28. para proteger rutas con roles: creamos una carpeta src/middlewares
29. auth.middleware.js - ruta para proteger rutas
    29.1 revisar si existe el token
    29.2 verificar si pertenece a un usuario válido
    29.3 modificar el req y agregar req.user con la info desencriptada del token
30. Importar Strategy y ExtractJwt
31. exportamos como función anónima
32. en .env creamos una variable de entorno para jwt secretkey
33. en config agregamos esta variable de entorno
34. para proteger rutas importamos middleware auth.middleware 
    eso en cada router que se desee proteger
35. vamos a proteger con token y con rol
36. creamos el middleware role.middleware
37. metemos en las rutas protegidas




