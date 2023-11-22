const nodemailer = require('nodemailer');

async function sendMail(to, subject, html) {
  try {
    const myEmail = process.env.MY_EMAIL;
    const myPassword = process.env.MY_PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: myEmail,
        pass: myPassword,
      },
    });
      const mailOptions = {
      from: myEmail,
      to: to,
      subject: subject,
      html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <style>
            body {
              font-family: "Roboto Light", sans-serif;
              margin: 20px;
              background-color: #f4f4f4;
            }
      
            .nro-invoice-section {
              display: flex;
              align-items: center;
              font-size: 1.2rem;
            }
      
            .nro-invoice-section .id_invoice {
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
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
      
            .item span {
              color: #555;
              margin-right: 16px;
            }
      
            .total {
              display: flex;
              justify-content: space-between;
              font-weight: bold;
              margin-right: 6px;
              margin-left: 9px;
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
      
            .data-block p {
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
      
            .table_products th {
              padding-top: 10px;
              padding-bottom: 10px;
              background-color: rgba(114, 163, 255, 0.22);
            }
      
            .table_products td {
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
              width: 100%;
              padding-top: 10px;
              padding-left: 10px;
              margin-right: 10px;
            }
      
            .contact-information {
              text-align: center;
            }
          </style>
          <link rel="stylesheet" href="./invoice.css" />
          <title>Factura</title>
        </head>
        <body id="body">
          <div class="invoice">
            <section class="nro-invoice-section">
              <label class="text-bold">Invoice ID:<span style="color: transparent;">&nbsp;</span> </label>
              <p id="id_invoice"></p>
            </section>
            <div class="gratitude">
              <section>
                <img
                        src="https://res.cloudinary.com/playhardimages/image/upload/v1700613991/Logosrar/gllnsa72dxlblrn9pt2u.png"
                        alt="logo.png"
                        width="200px"
                />
              </section>
              <section>
                <p id="name_user">Hi...</p>
                <p>Thank you for making your sports purchases at PlayHard</p>
              </section>
            </div>
            <hr />
            <section class="purchase-information">
              <label class="blue-title">Purchase Information: </label>
              <section class="purchase-data">
                <div class="column">
                  <div class="data-block">
                    <label class="text-bold">Order ID°:</label>
                    <p id="order_id">htw45bv</p>
                  </div>
                  <div class="data-block">
                    <label class="text-bold">Date:</label>
                    <p id="date_id">Nov 22th, 2023</p>
                  </div>
                </div>
                <div class="column">
                  <div class="data-block">
                    <label class="text-bold">Billed to:</label>
                    <p id="billed_id"></p>
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
                    <p id="street_id">Sacaba</p>
                  </div>
                  <div class="data-block">
                    <label class="text-bold">City:</label>
                    <p id="city_id">Cocha</p>
                  </div>
                </div>
                <div class="column">
                  <div class="data-block">
                    <label class="text-bold">Country: </label>
                    <p id="country_id">BO</p>
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
                      <th>Size</th>
                      <th>Color</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody id="table_body"></tbody>
                </table>
                <br/>
                <div class="text-bold large-row-title">
                  <span>Shipping Cost</span>
                </div>
                <div class="item large-row-item">
                  <span>Amazon Delivery</span>
                  <span>$ 10,00 USD</span>
                </div>
      
                <div class="text-bold large-row-title">
                  <span>Taxes</span>
                </div>
                <div class="item large-row-item">
                  <span>IVA</span>
                  <span>$ 15,00 USD</span>
                </div>
              </section>
              <hr />
              <section class="total">
                <span class="text-bold">Total:</span>
                <span id="totalPrice" class="text-bold">$00,00 USD</span>
              </section>
              <hr />
              <section class="contact-information">
                <p>PlayHard E-Commerce</p>
                <p>69 Melchor Perez St. Cochabamba, Bolivia</p>
            </section>
            </section>
            <script>
              const fetchProductDetails = async (route, productId) => {
                try {
                  const response = await fetch(
                    \`http://localhost:9000/api/\${route}/\${productId}\`
                  );
                  const product = await response.json();
                  return product;
                } catch (error) {
                  console.error(
                    \`Error fetching product details for product ID \${productId}:\`,
                    error
                  );
                  throw error;
                }
              };
      
              const fetchLastInsertID = async (route) => {
                try {
                  const response = await fetch(
                    \`http://localhost:9000/api/\${route}/last-id/\`
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
      
              async function updateInvoice() {
                try {
                  const idOrder = await fetchLastInsertID("orders");
                  const order = await fetchProductDetails("orders", idOrder);
      
                  const products = order.products;
                  const tableBody = document.getElementById("table_body");
      
                  for (const productFromOrder of products) {
                    const row = document.createElement("tr");
                    let product = await fetchProductDetails(
                      "products",
                      productFromOrder.id
                    );
                    let subtotalPrice =
                      product.price * productFromOrder.quantity;
                    row.innerHTML = \`
                      <td>\${product.name}</td>
                      <td>\${product.size[productFromOrder.size]}</td>
                      <td>\${product.colorInformation[productFromOrder.color].color}</td>
                      <td>\${productFromOrder.quantity}</td>
                      <td>$ \${product.price}</td>
                      <td>$ \${subtotalPrice}</td>
                    \`;
                    tableBody.appendChild(row);
                  }
      
                  console.log(order.total);
                  document.getElementById("id_invoice").innerHTML =
                    order.paymentIntentId;
                  document.getElementById("name_user").innerHTML =
                    "Hi " + order.userInformation.name + ":";
                  document.getElementById("order_id").innerHTML = "1234";
                  document.getElementById("date_id").innerHTML = order.updatedAt;
                  document.getElementById("street_id").innerHTML =
                    order.shippingAddress.avenue1;
                  document.getElementById("city_id").innerHTML =
                    order.shippingAddress.country;
                  document.getElementById("country_id").innerHTML =
                    order.shippingAddress.country;
                  document.getElementById("billed_id").innerHTML =
                    order.userInformation.email;
                  document.getElementById("totalPrice").innerHTML =
                    "$ " + order.total.toString() + "USD";
                } catch (error) {
                  console.error("Error updating invoice:", error);
                }
              }
              updateInvoice();
            </script>
          </div>
        </body>
      </html>
      `,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return reject(new Error('An error has occurred'));
        }
        console.log('Email sent:', info.response);
        return resolve(new Error('Email sent successfully'));
      });
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = sendMail;
