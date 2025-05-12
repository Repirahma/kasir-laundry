const form = document.getElementById("formLaundry");
const tabelBody = document.querySelector("#tabelTransaksi tbody");

let transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];

function render() {
  tabelBody.innerHTML = "";
  transaksi.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nama}</td>
      <td>${item.layanan}</td>
      <td>${item.berat} kg</td>
      <td>Rp${item.total.toLocaleString('id-ID')}</td>
      <td><button onclick="hapus(${index})">Hapus</button></td>
    `;
    tabelBody.appendChild(tr);
  });
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value;
  const layanan = document.getElementById("layanan").value;
  const berat = parseFloat(document.getElementById("berat").value);
  let hargaPerKg = layanan === "Cuci Kering" ? 5000 : 10000;
  const total = berat * hargaPerKg;

  transaksi.push({ nama, layanan, berat, total });
  localStorage.setItem("transaksi", JSON.stringify(transaksi));
  render();
  form.reset();
});

function hapus(index) {
  transaksi.splice(index, 1);
  localStorage.setItem("transaksi", JSON.stringify(transaksi));
  render();
}

render();
