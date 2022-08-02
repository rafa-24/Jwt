// iniciar el servidor de express

const express = require('express');

const jwt = require('jsonwebtoken');

const app = express();

// rutas principal task
app.get("/api/v1", (req, res) => {
	res.json({
		message: "Hola Bienvenido"
	});
});

// logear un usuario
app.post("/api/login", (req, res) => {
	const user = {
		id: 1,
		nombre: "Rafael",
		email: "rafa232@gmail.com"
	}
	// generar el token -> asincrona
	jwt.sign(user, 'secretKey', (err, token) => {
		res.json({
			message: token
		});
	});
});

// Ruta protegida verificar al token de usuario
app.post("/api/create/task", verifyToken, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		// manejo de errores
		if (err) {
			res.status(403);
		} else {
			res.json({
				message: 'Post fue creado',
				authData: authData
			});
		}
	});
});

//Authorization: Bearer <Token>
function verifyToken(req, res, next) {
	const bearerHeader = req.headers['authorization']; // -> Bearer <Token>

	if (bearerHeader !== undefined) {
		// solo queremos obtener el token  -> Input: Bearer <Token>, Output: <Token>
		const bearerToken = bearerHeader.split(" ")[1];
		req.token = bearerToken;
		next();
	} else {
		// no tienes acceso a esta ruta porque no estas autenticado
		res.status(403);
	}
}

app.listen(3000, () => {
	console.log("Server on run in port 3000 :)");
});




