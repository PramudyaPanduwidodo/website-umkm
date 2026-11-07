"use strict";

const produkUmkm = [
  { nama: "Kopi Tubruk Signature", kategori: "Seduh Rumahan", harga: 45000, stok: 12, unggulan: true },
  { nama: "Cold Brew Aren", kategori: "Minuman Dingin", harga: 22000, stok: 4, unggulan: false },
  { nama: "Paket Seduh Rumahan", kategori: "Paket Bundling", harga: 75000, stok: 0, unggulan: false },
  { nama: "Paket Kantor Mingguan", kategori: "Paket Bundling", harga: 150000, stok: 20, unggulan: true },
];

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

function statusStok(stok) {
  if (stok <= 0) return { label: "Habis", className: "empty" }; 
  if (stok <= 5) return { label: "Stok terbatas", className: "warning" };
  return { label: "Tersedia", className: "" };
}

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);
  return `
    <article class="js-product-card">
      <h3>${produk.nama}</h3>
      <p class="category-note">${produk.kategori}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
    </article>
  `;
}

produkUmkm.forEach((produk) => {
  console.log("Debug produk:", produk.nama, "stok:", produk.stok);
});

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulanItem = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");

  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  unggulan.textContent = produkUnggulanItem
    ? `Produk unggulan: ${produkUnggulanItem.nama}`
    : "Belum ada produk unggulan.";

  console.table(produkUmkm);
}

document.addEventListener("DOMContentLoaded", renderProduk);