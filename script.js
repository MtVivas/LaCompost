const productos = [
    {
        id: 1,
        nombre: "Menú del Día",
        imagen: "img/menu-dia.webp",
        precio: 9500,
        descripcion: "Un plato balanceado y delicioso de aproximadamente 450g, que siempre incluye cereal, legumbres, vegetales cocidos y crudos, acompañado de nuestra suave mayonesa de hortalizas y brotes frescos."
    },
    {
        id: 2,
        nombre: "Hamburguesa Vegana",
        imagen: "img/hamburguesa.webp",
        precio: 8000,
        descripcion: "Elaborada con pan de masa madre y leche de coco, preparado artesanalmente en casa. Se completa con nuestra mayonesa de hortalizas, un medallón de legumbres, tomate, hojas verdes frescas y pepinos encurtidos. Un sabor único y saludable en cada bocado."
    },
    {
        id: 3,
        nombre: "Limonada Natural",
        imagen: "img/limonada.webp",
        precio: 2500,
        descripcion: "Refrescante y revitalizante, hecha con jugo natural de limón, azúcar mascabo, un toque de jengibre y menta fresca, todo combinado con agua pura para una bebida 100% natural."
    },
    {
        id: 4,
        nombre: "Empanada Vegana",
        imagen: "img/empanada.jpg",
        precio: 3000,
        descripcion: "Con una masa que contiene un 10% de harina integral y una fermentación natural de 24 horas. Su relleno incluye queso de girasol, tomates asados, albahaca fresca y cebollas caramelizadas."
    }
];

// Función para cargar los productos
function cargarProductos() {
    const productosContainer = document.getElementById("productos-container");

    productos.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");

        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre}</p>
            <p class="precio">$${producto.precio}</p>
            <button class="button" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            <button class="button" id="info-btn-${producto.id}" onclick="toggleInfo(${producto.id})">Más Info</button>
            <p class="descripcion" id="descripcion-${producto.id}" style="display: none;">
                ${producto.descripcion}
            </p>
        `;

        productosContainer.appendChild(productoDiv);
    });
}

// Función para alternar la visibilidad de la descripción
function toggleInfo(id) {
    const descripcion = document.getElementById(`descripcion-${id}`);
    const infoBtn = document.getElementById(`info-btn-${id}`);

    if (descripcion.style.display === "none") {
        descripcion.style.display = "block";
        infoBtn.textContent = "Menos Info";
    } else {
        descripcion.style.display = "none";
        infoBtn.textContent = "Más Info";
    }
}

// Carrito de compras
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
}

// Función para actualizar el carrito en la interfaz
function actualizarCarrito() {
    const carritoLista = document.getElementById("productos-carrito");
    carritoLista.innerHTML = ""; // Limpiar el carrito

    let total = 0;
    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio}
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoLista.appendChild(li);
        total += producto.precio;
    });

    document.getElementById("total-carrito").innerText = `Total: $${total}`;
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Función para verificar la compra
function verificarCompra() {
    if (carrito.length > 0) {
        alert("Compra realizada con éxito!");
        vaciarCarrito();
    } else {
        alert("Tu carrito está vacío.");
    }
}

// Cargar productos al cargar la página
window.onload = cargarProductos;