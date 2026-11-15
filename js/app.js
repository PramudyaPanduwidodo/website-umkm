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

const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("js-product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = produk.kategori;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);
  stock.classList.add("stock-badge");
  if (status.className) {
    stock.classList.add(status.className);
  }
  stock.textContent = status.label;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Sembunyikan";
  removeButton.style.marginTop = "1rem";
  removeButton.addEventListener("click", () => {
    card.remove();
    produkStatus.textContent = "Satu kartu disembunyikan dari tampilan sementara.";
  });

  card.append(title, category, price, stock, removeButton);
  return card;
}

function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori "${kategori}".`;
  return empty;
}

function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const produkTampil = kategoriAktif === "Semua" 
    ? produkUmkm 
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `Kategori ${kategoriAktif} menampilkan ${produkTampil.length} produk.`;
}

// 7. Event Listener pada Tombol Filter
tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    // Pindahkan class is-active
    tombolFilter.forEach((item) => item.classList.remove("is-active"));
    tombolAktif.classList.add("is-active");

    // Render ulang
    renderProduk(kategori);
  });
});

// 8. Render awal saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  renderProduk("Semua");
});