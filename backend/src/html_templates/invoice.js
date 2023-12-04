const fetchProductDetails = async (route, productId) => {
  try {
    const response = await fetch(
      `https://backend-fullapirest.onrender.com/api/${route}/${productId}`
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
    const response = await fetch(
      `https://backend-fullapirest.onrender.com/api/${route}/last-id/`
    );
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

class Invoice {
  async calculateTotal(order) {
    return order.total;
  }

  async generateHTML() {
    try {
      const idOrder = await fetchLastInsertID("orders");
      const order = await fetchProductDetails("orders", idOrder);
      const total = await this.calculateTotal(order);

      const inputDate = order.date;
      const dateObject = new Date(inputDate);

      const options = { year: "numeric", month: "short", day: "numeric" };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        dateObject
      );

      const avenue2 =
        order.shippingAddress.avenue2 === null
          ? " "
          : ", " + order.shippingAddress.avenue2;
      const productsDetailsPromises = order.products.map((product) =>
        fetchProductDetails("products", product.id)
      );

      const productsDetails = await Promise.all(productsDetailsPromises);

      const productsHTML = productsDetails
        .map(
          (productDetails, index) => `
<tr>
  <td>${productDetails.name}</td>
  <td>${order.products[index].quantity}</td>
  <td>${productDetails.size[order.products[index].size]}</td>
  <td>${productDetails.colorInformation[order.products[index].color].color}</td>
  <td>${
    "$ " + productDetails.price.toFixed(2)
  }</td> <!-- Formatear a 2 decimales -->
  <td>${
    "$ " + (order.products[index].quantity * productDetails.price).toFixed(2)
  }</td>
</tr>
`
        )
        .join("");

      const invoiceHTML = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <style>
          body {
            font-family: "Roboto Light", sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
            display: center;
        }
        
        .nro-invoice-section {
            align-items: center;
            font-size: 1.2rem;
        }
        
        .nro-invoice-section .id_invoice{
            font-weight: bold;
        }
        .invoice {
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 30px;
            border-radius: 10px;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .invoice-header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #ddd;
        }
        
        .invoice-body {
            padding: 20px 0;
        }
        
        .item {
            display: inline-block;
            text-align: right;
            margin-bottom: 10px;
        }
        
        .item span {
            padding-right: 20px;
        }
        
        .item span {
            color: #000000;
        }
        
        .total {
            display: inline-block;
            text-align: right;
            margin-left: -19px
        }
        
        .total-label {
            padding-left: 20px;
        }
        
        .gratitude {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .gratitude p {
            text-align: center;
        }
        
        .blue-title {
            font-weight: bold;
            font-size: 1.3rem;
            color: #3970D7;
        }
        
        .purchase-data {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-top: 10px;
        }
        
        .data-block {
            flex-direction: row;
            margin-bottom: 15px;
            min-width: 120px;
        }
        
        .data-block p{
            margin-top: 0;
        }
        
        .text-bold {
            font-weight: bold;
        }
        
        .column {
            min-width: 50%;
        }
        
        .table_products {
            width: 100%;
            border-collapse: collapse;
        }
        
        .table_products th{
            padding-top: 10px;
            padding-bottom: 10px;
            background-color: rgba(114, 163, 255, 0.22);
            color: #000
        }

        .table_products tr {
            color: #000
        }
        
        .table_products td{
            padding-top: 8px;
        }
        
        td:first-child {
            text-align: left;
            padding-left: 10px;
        }
        
        td:not(:first-child):not(:last-child) {
            text-align: center;
        }
        
        td:last-child {
            text-align: right;
            padding-right: 10px;
        }
        
        th:first-child {
            text-align: left;
            padding-left: 10px;
        }
        
        th:not(:first-child):not(:last-child) {
            text-align: center;
        }
        
        th:last-child {
            text-align: right;
            padding-right: 10px;
        }
        
        .large-row-title {
            width: 98.5%;
            padding-top: 10px;
            padding-bottom: 10px;
            background-color: rgba(114, 163, 255, 0.22);
            padding-left: 10px;
        }
        
        .large-row-item {
            display: inline-block;
            width: 100%;
            padding-top: 10px;
            padding-left: 10px;
            margin-right: 10px;
        }
        
        .contact-information {
            text-align: center;
        }
        
        .middle-separator {
            min-width: 0.5rem;
        }
        </style>
        </head>
          <body id="body">
            <div class="invoice">
            <section class="nro-invoice-section">
            <label class="text-bold">Invoice ID:<span style="color: transparent;">&nbsp;</span> </label>
            <span id="id_invoice">${order.paymentIntentId}</span>
          </section>
          <section style="margin-right: 200px; margin-left: 200px">
            <img
                        src="https://res.cloudinary.com/playhardimages/image/upload/v1700613991/Logosrar/gllnsa72dxlblrn9pt2u.png"
                        alt="logo.png"
                        width="200px"
                />
            <div class="gratitude">
                <section>
                <p style="color: #000" id="name_user">Hi ${
                  " " + order.userInformation.name + ":"
                }</p>
                <p style="color: #000">Thank you for making your sports purchases at PlayHard</p>
                </section>
            </div>
          </section>
          <hr />
          <label class="blue-title">Purchase Information: </label>
          <section class="purchase-data">
            <div class="column">
              <div class="data-block">
                <label class="text-bold">Order ID°:</label>
                <p id="order_id">${" " + idOrder}</p>
              </div>
              <div class="data-block">
                <label class="text-bold">Date:</label>
                <p id="date_id">${" " + formattedDate}</p>
              </div>
            </div>
            <div class="column">
              <div class="data-block">
                <label class="text-bold">Billed to:</label>
                <p id="billed_id">${" " + order.userInformation.email}</p>
              </div>
              <div class="data-block">
                <label class="text-bold">From: </label>
                <p>PlayHard E-Commerce</p>
              </div>
            </div>
          </section>
          <HR></HR>
          <label class="blue-title">Shipping Information: </label>
          <section class="purchase-data">
            <div class="column">
              <div class="data-block">
                <label class="text-bold">Street || Avenue :</label>
                <p id="street_id">${
                  " " + order.shippingAddress.avenue1 + avenue2
                }</p>
              </div>
              <div class="data-block">
                <label class="text-bold">City:</label>
                <p id="city_id">${" " + order.shippingAddress.city}</p>
              </div>
            </div>
            <div class="column">
              <div class="data-block">
                <label class="text-bold">Country: </label>
                <p id="country_id">${" " + order.shippingAddress.country}</p>
              </div>
            </div>
          </section>
          <hr/>
          <section>
          <section>
                  <label class="blue-title">Order:</label>
                  <br>
                  <br>
                  <table class="table_products">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody id="table_body">
                      ${productsHTML}
                    </tbody>
                  </table>
                  <br/>
                  <div class="text-bold large-row-title">
                    <span style="color: #000">Shipping Cost</span>
                  </div>
                  <div class="item large-row-item">
                    <span style="color: #000">Amazon Delivery</span>
                    <span style="color: #000">$ 10,00 USD</span>
                  </div>
  
                  <div class="text-bold large-row-title">
                    <span style="color: #000">Taxes</span>
                  </div>
                  <div class="item large-row-item">
                    <span style="color: #000">IVA</span>
                    <span style="color: #000">$ 15,00 USD</span>
                  </div>
                </section>
                <hr />
                <section class="total large-row-item">
                  <span style="color: #000" class="text-bold">Total:</span>
                  <span style="color: #000" id="totalPrice" class="text-bold">${total.toFixed(
                    2
                  )} USD</span>
                </section>
                <hr />
                <section class="contact-information">
                  <p>PlayHard E-Commerce</p>
                  <p>69 Melchor Perez St. Cochabamba, Bolivia</p>
                </section>
              </section>
            </div>
          </body>
        </html>
      `;

      return invoiceHTML;
    } catch (error) {
      console.error("Error generating HTML for invoice:", error);
    }
  }
}

module.exports = { Invoice };
