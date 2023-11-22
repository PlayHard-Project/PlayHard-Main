const htmlFile = `
<!DOCTYPE html>
<html lang="es">
  <head>
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
    <script src="invoice.js"></script>
  </body>
</html>
`;

module.exports = { htmlFile };
