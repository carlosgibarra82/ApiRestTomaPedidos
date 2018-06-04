const express = require('express')
const bodyParser = require('body-parser');
const http = require('http')
const app = express()

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 1234

let users = [
	{username: 'admin', password: '123'}
];

let devices = [
	{name: 'tablet1', id: '1'},
	{name: 'tablet2', id: '2'},
	{name: 'tablet3', id: '3'},
	{name: 'tablet4', id: '4'},
	{name: 'tablet5', id: '5'}				  
];

let vf_images = [
	{image: 'https://image.ibb.co/j97vGJ/Bandeja_Paisa.jpg'},
	{image: 'https://image.ibb.co/fgfROy/lasagna.jpg'},
	{image: 'https://image.ibb.co/meTD3y/fritopastuso.jpg'},
	{image: 'https://image.ibb.co/d6m0iy/hamburguesa.jpg'},
	{image: 'https://image.ibb.co/cNYPAd/Lomo_a_caballo.jpg'}
];

let dishes = [
	{name: 'BANDEJA PAISA', picture: 'https://image.ibb.co/j97vGJ/Bandeja_Paisa.jpg', ingredients: ['Arroz blanco','Carne de res en polvo y sudada o asada','Chicharrón','Huevo Frito','Tajadas de Platano maduro','Chorizo Antioqueño con limón','Arepa Antioqueña','Hogao','Fríjoles Cargamanto','Tomate Rojo en Rodajas','Aguacate'], cook_time: '15 Minutos', price: '25000'},
	{name: 'FRITO PASTUSO', picture: 'https://image.ibb.co/meTD3y/fritopastuso.jpg', ingredients: ['Carne de cerdo','Ajo','Cebolla larga','Condimento trisasón','Pimentón', 'Sal al Gusto'], cook_time: '30 Minutos', price: '18000'},
	{name: 'CUY', picture: 'https://image.ibb.co/jaEWqd/cuy.jpg', ingredients: ['Cuy Entero Eviscerado','Papa Negra','Sal al gusto'], cook_time: '30 Minutos', price: '35000'},
	{name: 'LOMO DE CERDO', picture: 'https://image.ibb.co/cRSkso/lomodecerdo.jpg', ingredients: ['3 dientes de ajo picados','cucharada de romero seco', 'sal y pimienta al gusto','1 kg de lomo de cerdo','¼ de taza (65 ml) de aceite de oliva','½ taza (125 ml) de vino blanco'], cook_time: '13 Minutos', price: '16000'},
	{name: 'LASAGNA', picture: 'https://image.ibb.co/fgfROy/lasagna.jpg', ingredients: ['400 g. de carne picada de cerdo','Queso rallado','Aceite de oliva virgen extra','Sofrito de Tomate y Cebolla','Pollo desmechado','Placas de Lasaña','Salsa Bechamel','Vino blanco','Sal al gusto'], cook_time: '15 Minutos', price: '15000'},
	{name: 'PORCION PIZZA HAWAIANA', picture: 'https://image.ibb.co/cr0t3y/pizza.jpg', ingredients: ['Masa de Harina','Queso','Piña en trocitos','Rodajas de Peperoni','Jamón'], cook_time: '15 Minutos', price: '8000'},
	{name: 'HAMBURGUESA', picture: 'https://image.ibb.co/d6m0iy/hamburguesa.jpg', ingredients: ['tomate','cebolla','pimiento rojo','aceitunas verdes (sin hueso)','especias para aliñar (pimienta, eneldo, romero, orégano y tomillo)','pan rallado','huevo','queso','pepinillo agridulce','cebolla caramelizada','salsa BigBurguer Choví'], cook_time: '12 Minutos', price: '13500'},
	{name: 'CAMARONES APANADOS', picture: 'https://image.ibb.co/nMFhwJ/camarones_apanados.jpg', ingredients: ['1 Lb camarones medianos o grandes limpios y desvenados','250 gr ralladura de pan','Sal al gusto'], cook_time: '20 Minutos', price: '12000'},
	{name: 'CORVINA APANADA', picture: 'https://image.ibb.co/egB0iy/corbina_apanada.jpg', ingredients: ['Filete de corvina en trozos','Jugo de limón'], cook_time: '15 Minutos', price: '11000'},
	{name: 'CAZUELA DE MARISCOS', picture: 'https://image.ibb.co/nPLt3y/cazuela_de_mariscos.jpg', ingredients: ['Mariscos','Pimentón Verde','Pimentón Rojo','Ajo','Caldo de pescado'], cook_time: '30 Minutos', price: '20000'},
	{name: 'LANGOSTINOS AL AJILLO', picture: 'https://image.ibb.co/ijKxVd/Langostinos_al_ajillo.jpg', ingredients: ['1kg de langostinos','Limón al gusto','Perejil al gusto','Sal al gusto','Ajo al gusto'], cook_time: '25 minutos', price: '22000'},
	{name: 'LOMO HAWAIANO', picture: 'https://image.ibb.co/g09xVd/lomo_hawaiano.jpg', ingredients: ['Cerdo en trozos','Salsa Inglesa','Salsa de soya','Piña','Queso','Jamón','Cebolla','Miel de abeja','Catsup'], cook_time: '15 Minutos', price: '17500'},
	{name: 'TACOS', picture: 'https://image.ibb.co/eO5t3y/tacos.jpg', ingredients: ['Tortillas de harina','Carne Picada','Aceite de Maíz','Queso Chedar Rallado','Tomate','Cebolla Verde','Lechuga','Salsa Mexicana'], cook_time: '15 minutes', price: '10500'},
	{name: 'SANCOCHO DE GALLINA', picture: 'https://image.ibb.co/cW7HVd/Sancocho_de_Gallina.jpg', ingredients: ['Muslos de Pollo','Papa Pastusa','Yuca','Platano','Cebolla','Cilantro','Mazorca','Ajo','Sal al Gusto'], cook_time: '2 a 3 horas', price: '15000'},
	{name: 'SANCOCHO DE ESPINAZO', picture: 'https://image.ibb.co/hzxjAd/Sancocho_de_Espinazo.png', ingredients: ['Carne de Cerdo','Platano verde','Papa Pelada','Papa Criolla','Mazorca','Cebolla','Cilantro','Zanahoria','Sal al gusto'], cook_time: '1 Hora', price: '15000'},
	{name: 'SOPA DE MONDONGO', picture: 'https://image.ibb.co/gAL4Ad/Sopa_de_Mondongo.jpg', ingredients: ['Callos de Res','Jugo de Limón','Carne de Cerdo','Chorizos Colombianos','Tomate','Cebolla Blanca','Papas peladas','Yuca','Sal al gusto'], cook_time: '1 Hora', price: '8000'},
	{name: 'GALLINA CAMEPESINA', picture: 'https://image.ibb.co/b9FFGJ/Gallina_Campesina.jpg', ingredients: ['Pollo troceado','Tomate','Cebolla','Cilantro','Ajo','Papa','Yuca','Sal','Pimienta'], cook_time: '2 Horas', price: '16000'},
	{name: 'CARNE A LA PLANCHA', picture: 'https://image.ibb.co/fJPLiy/Carne_a_la_plancha.jpg', ingredients: ['Filetes de Carne','Ajo','Cebolla','Pimentones','Sal y Pimienta'], cook_time: '30 Minutos', price: '12500'},
	{name: 'SALCHIPAPAS', picture: 'https://image.ibb.co/e1dfiy/Salchipapas.jpg', ingredients: ['Papas A la Francesa','Salchichas','Salsa de Tomate','Mayonesa','Sal al gusto'], cook_time: '10 Minutos', price: '7500'},
	{name: 'LOMO A CABALLO', picture: 'https://image.ibb.co/cNYPAd/Lomo_a_caballo.jpg', ingredients: ['Carne de Res','Tomate','Perejil','Huevo','Platano','Yuca','Sal al gusto'], cook_time: '20 Minutos', price: '14000'},
	{name: 'CERDILLO', picture: 'https://image.ibb.co/ckfFGJ/Cerdillo.jpg', ingredients: ['Bondiola de Cerdo','Limon','Ajo','Tomillo Seco','Sal y Pimienta'], cook_time: '45 Minutos', price: '20000'}
];
let drinks = [			
	{type: 'jugoenagua', flavor: 'Tomate', picture: 'https://image.ibb.co/nR47q8/tomate_de_arbol.jpg'},
	{type: 'jugoenagua', flavor: 'Piña', picture: 'https://image.ibb.co/f4wLA8/jugodepi_a.jpg'},
	{type: 'jugoenagua', flavor: 'Maracuya', picture: 'https://image.ibb.co/j6DNOT/Jugo_de_maracuy.png'},
	{type: 'jugoenagua', flavor: 'Lulo',picture: 'https://image.ibb.co/g2oYV8/jugodelulo.jpg'},
	{type: 'jugoenagua', flavor: 'Limonada', picture: 'https://image.ibb.co/fac5co/limonada.jpg'},
	{type: 'jugoenagua', flavor: 'Papaya', picture: 'https://image.ibb.co/iuTp3T/jugodepapaya.jpg'},
	{type: 'jugoenagua', flavor: 'Mango', picture: 'https://image.ibb.co/fXi0A8/jugodemango.jpg'},
	{type: 'jugoenagua', flavor: 'Mora', picture: 'https://image.ibb.co/cpiNOT/jugodemora.jpg'},
	{type: 'jugoenagua', flavor: 'Borojó', picture: 'https://image.ibb.co/dd2hOT/jugodeborojo.jpg'},
	{type: 'jugoenagua', flavor: 'Guayaba', picture: 'https://image.ibb.co/jyeU3T/jugodeguayaba.jpg'},
	{type: 'jugoenleche', flavor: 'Tomate', picture: 'https://image.ibb.co/jBmWHo/jugo_tomate_leche.jpg'},
	{type: 'jugoenleche', flavor: 'Fresa', picture: 'https://image.ibb.co/eqYYV8/jugo_fresa_leche.jpg'},
	{type: 'jugoenleche', flavor: 'Maracuyá', picture: 'https://image.ibb.co/fntBHo/jugo_maracuya_leche.jpg'},
	{type: 'jugoenleche', flavor: 'Banano', picture: 'https://image.ibb.co/cu3p3T/jugo_banano_leche.jpg'},
	{type: 'jugoenleche', flavor: 'Mora', picture: 'https://image.ibb.co/bYDp3T/jugo_mora_leche.jpg'},
	{type: 'jugoenleche', flavor: 'Guanabana', picture: 'https://image.ibb.co/gvnGiT/jugo_guanabana_leche.jpg'},
	{type: 'Embotellado', flavor: 'Manzana', picture: 'https://image.ibb.co/bL193T/embotellado_manzana.jpg'},
	{type: 'Embotellado', flavor: 'Uva', picture: 'https://image.ibb.co/nv30A8/embotellado_uva.jpg'},
	{type: 'Embotellado', flavor: 'Pepsi', picture: 'https://image.ibb.co/htM93T/embotellado_pepsi.jpg'},
	{type: 'Embotellado', flavor: 'Coca Cola', picture: 'https://image.ibb.co/chPkco/embotellado_cocacola.jpg'},
	{type: 'Cafeteria', flavor: 'Cafe', picture: 'https://image.ibb.co/hqBLA8/cafe.jpg'},
	{type: 'Cafeteria', flavor: 'Aromática', picture: 'https://image.ibb.co/dx5DV8/aromatica.jpg'},
	{type: 'Cafeteria', flavor: 'Chocolate', picture: 'https://image.ibb.co/ewjkco/chocolate.jpg'},	
	{type: 'Cafeteria', flavor: 'Malteada', picture: 'https://image.ibb.co/c2v2OT/malteadas.jpg'},	
	{type: 'Cocteles', flavor: 'Margarita', picture: 'https://image.ibb.co/gKdp3T/coctel_margarita.jpg'},
	{type: 'Cocteles', flavor: 'Caipiroska', picture: 'https://image.ibb.co/iy5Qco/coctel_Caipiroska.jpg'},
	{type: 'Cocteles', flavor: 'Fresa espumante', picture: 'https://image.ibb.co/d2ZwiT/coctel_Fresa_espumante.jpg'},
	{type: 'Cocteles', flavor: 'Irlandés pelirrojo', picture: 'https://image.ibb.co/gdVQco/coctel_Irland_s_pelirrojo.jpg'},
	{type: 'alcoholicas', flavor: 'Cerveza', picture: 'https://image.ibb.co/ipgbiT/alcolicas_cerveza.jpg'},
	{type: 'alcoholicas', flavor: 'Aguardiente', picture: 'https://image.ibb.co/bX80A8/alcolicas_Aguardiente.jpg'},
	{type: 'alcoholicas', flavor: 'Ron', picture: 'https://image.ibb.co/i0F2OT/alcolicas_Ron.jpg'},
	{type: 'alcoholicas', flavor: 'Whiskey', picture: 'https://image.ibb.co/dM0Qco/alcolicas_Whiskey.jpg'},
	{type: 'alcoholicas', flavor: 'Tequila', picture: 'https://image.ibb.co/dQYYV8/alcolicas_Tequila.jpg'},
	{type: 'alcoholicas', flavor: 'Ginebra', picture: 'https://image.ibb.co/kBe7q8/alcolicas_Ginebra.jpg'},
	{type: 'alcoholicas', flavor: 'Vodka', picture: 'https://image.ibb.co/jzyBHo/alcolicas_vodka.jpg'}
];

let order = [
	{
		user:'Leidy',
		device:'tablet1',
		dishes:['Bandeja Paisa','Cuy'],
		drinks:['Gaseosa','Cerveza']
	}
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ********************************************************************
// ********************************************************************
app.get('/', (req, res) => {
    res.status(200).send("Welcome to API PEDIDOS REST")
})
// ********************************************************************
// URL raiz de la api clientes

// URL para listar todos los Clientes
// http://127.0.0.1:1234/clients

app.post('/signup', (req,res) => {
	let data = req.body;
	let itemUser = {
		username: data.user,
		password: data.pass,
	}
	res.send(itemUser);
})

app.get('/users', (req, res) => {
    res.send(users)
})

// URL para Agregar un Cliente
// http://localhost:1234/clients/?client_name=mesa12
app.post('/users', (req, res) => {
    let data = req.body;
    var valueToPush = { };
    valueToPush.username= data.username;
    valueToPush.password = data.password;
    users.push(valueToPush)
    res.send(users)
})

// URL para actualizar un Cliente
// http://localhost:1234/clients/0?client_name=mesa1-1
app.patch('/clients/:id',(req, res) => {
    let params = req.params;
    let data = req.query;
    clients[params.id] = data.client_name
    res.send("Client updated")
})

// URL para eliminar un usuario
// http://localhost:1234/clients/0
app.delete('/clients/:id',(req, res) => {
    let params = req.params;
    clients.splice(params.id, 1);
    res.send('Client deleted')
})

app.get('/clients', (req, res) => {
    res.send(clients)
})

// URL para Agregar un Cliente
// http://localhost:1234/clients/?client_name=mesa12
app.post('/clients', (req, res) => {
    let data = req.query;
    clients.push(data.client_name)
    res.send("New client added")
})

// URL para actualizar un Cliente
// http://localhost:1234/clients/0?client_name=mesa1-1
app.patch('/clients/:id',(req, res) => {
    let params = req.params;
    let data = req.query;
    clients[params.id] = data.client_name
    res.send("Client updated")
})

// URL para eliminar un usuario
// http://localhost:1234/clients/0
app.delete('/clients/:id',(req, res) => {
    let params = req.params;
    clients.splice(params.id, 1);
    res.send('Client deleted')
})
// ********************************************************************
// URL raiz de la api dishes

// URL para listar todos los Platos
// http://127.0.0.1:1234/dishes

app.get('/dishes', (req, res) => {
    res.send(dishes)
})

app.get('/images', (req, res) => {
    res.send(vf_images)
})

//URL para Agregar un Plato
//localhost:1234/dishes/?name=leidy&picture=http://www.google.com.co&ingredients=leidy&ingredients=cerdillo&cook_time=20 minutes&price=50000

app.post('/dishes', (req, res) => {
    let data = req.query;
    var valueToPush = { };
    valueToPush.name= data.name;
    valueToPush.picture = data.picture;
    valueToPush.ingredients = data.ingredients;
    valueToPush.cook_time = data.cook_time;
    valueToPush.price = data.price;
    dishes.push(valueToPush)
    res.send("New dish added")
})

// URL para actualizar un Plato
// http://localhost:1234/dishes/0?ingredients=ingredientes
app.patch('/dishes/:id',(req, res) => {
    let params = req.params;
    let data = req.query;
    dishes[params.id] = data.name
    res.send("Dish update")
})

// URL para eliminar un Plato
// localhost:1234/dishes/0
app.delete('/dishes/:id',(req, res) => {
    let params = req.params;
    dishes.splice(params.id, 1);
    res.send('Dish deleted')
})

// ********************************************************************
// URL raiz de api bebidas

app.get('/drinks', (req, res) => {
    res.send(drinks)
})

//URL para Agregar una Bebida
//localhost:1234/drinks/?name=leidy&picture=http://www.google.com.co&ingredients=carlos&cook_time=20 minutes&price=50000
app.post('/drinks', (req, res) => {
    let data = req.query;
    drinks.push(data)
    res.send("New drink added")
})

// URL para actualizar una Bebida
// http://localhost:1234/drinks/0?ingredients=ingredientes
app.patch('/drink/:id',(req, res) => {
    let params = req.params;
    let data = req.query;
    dinks[params.id] = data.name
    res.send("Drink update")
})

// URL para eliminar una Bebida
// localhost:1234/dishes/0
app.delete('/drink/:id',(req, res) => {
    let params = req.params;
    drinks.splice(params.id, 1);
    res.send('Drink deleted')
})


// ********************************************************************
// URL raiz de la api pedidos

// URL para listar todos los Pedidos
// http://127.0.0.1:1234/order

app.get('/order', (req, res) => {
    res.send(order)
})

//URL para Agregar un Pedido
//localhost:1234/order/?client=mesa2&dishes=Hamburguesa&dishes=Cuy&drinks=Cerveza&drinks=Gaseosas

app.post('/order', (req, res) => {
    let data = req.query;
    var valueToPush = { };
    valueToPush.client= data.client;
    valueToPush.dishes = data.dishes;
    valueToPush.drinks = data.drinks;
    order.push(valueToPush)
    res.send("New order added")
})

// URL para actualizar un Plato
// http://localhost:1234/dishes/0?ingredients=ingredientes
app.patch('/order/:id',(req, res) => {
    let params = req.params;
    let data = req.query;
    order[params.id] = data.name
    res.send("Order update")
})

// URL para eliminar una orden
// localhost:1234/order/0
app.delete('/order/:id',(req, res) => {
    let params = req.params;
    order.splice(params.id, 1);
    res.send('Order deleted')
})

// ********************************************************************





// ********************************************************************

// Crear y lanzar el servidor
http.createServer(app).listen(PORT, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
})
