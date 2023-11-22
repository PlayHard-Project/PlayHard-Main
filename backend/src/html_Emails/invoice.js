const fetchProductDetails = async (route, productId) => {
  try {
    const response = await fetch(
      `http://localhost:9000/api/${route}/${productId}`
    );
    const product = await response.json();
    return product;

  } catch (error) {
    console.error(
      `Error fetching product details for product ID ${productId}:`,
      error
    );
    throw error;
  }
};

const fetchLastInsertID = async (route) => {
  try {
    const response = await fetch(`http://localhost:9000/api/${route}/last-id/`);
    const data = await response.json();

    if (response.ok) {
      return data.lastId;
    } else {
      console.error("Error fetching last inserted ID:", data.message);
      throw new Error("Error fetching last inserted ID");
    }
  } catch (error) {
    console.error("Error fetching last inserted ID:", error);
    throw error;
  }
};

async function updateInvoice() {
  try {
    const idOrder = await fetchLastInsertID("orders");
    const order = await fetchProductDetails("orders", idOrder);

    const products = order.products; 
    const tableBody = document.getElementById("table_body");

    for (const productFromOrder of products) {
      const row = document.createElement("tr");
      let product = await fetchProductDetails("products", productFromOrder.id);
      row.innerHTML = `
          <td>${product.name}</td>
          <td>${productFromOrder.size}</td>
          <td>${productFromOrder.color}</td>
          <td>${productFromOrder.quantity}</td>
          <td>$ ${product.price}</td>
          <td>USD</td>
        `;
      tableBody.appendChild(row);
    }

    console.log(order.total);
    document.getElementById("id_invoice").innerHTML = order.paymentIntentId;
    document.getElementById("name_user").innerHTML =
      "Hi " + order.userInformation.name + ":";
    document.getElementById("order_id").innerHTML = "1234";
    document.getElementById("date_id").innerHTML = order.updatedAt;
    document.getElementById("street_id").innerHTML = order.shippingAddress.avenue1;
    document.getElementById("city_id").innerHTML = order.shippingAddress.country;
    document.getElementById("country_id").innerHTML = order.shippingAddress.country;
    document.getElementById("billed_id").innerHTML = order.userInformation.email;
    document.getElementById("totalPrice").innerHTML = "$ " + order.total.toString() + "USD";
  } catch (error) {
    console.error("Error updating invoice:", error);
  }
}

updateInvoice();
