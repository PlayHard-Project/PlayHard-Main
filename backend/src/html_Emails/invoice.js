// Set the content of "id_invoice"
document.getElementById("id_invoice").textContent = "New content";

// Array de objetos ProductEntity
const products = [
    { name: "Product 1", size: "M", color: "Rojo", quantity: 5, price: 10.99, currency: "USD" },
    { name: "Product 2", size: "L", color: "Azul", quantity: 3, price: 15.99, currency: "USD" },
    { name: "Product 3", size: "S", color: "Verde", quantity: 2, price: 8.99, currency: "USD" },
  ];
  
  // Obtén la referencia al cuerpo de la tabla
  const tableBody = document.getElementById("table_body");
  
  // Agrega filas de datos
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.size}</td>
        <td>${product.color}</td>
        <td>${product.quantity}</td>
        <td>${product.price}</td>
        <td>${product.currency}</td>
      `;
    tableBody.appendChild(row);
  });
  
  // Ahora, la tabla está completa con datos dinámicos.
  