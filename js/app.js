"use strict";

console.log("P09 JavaScript aktif");
const produkUmkm = [
  {
    nama: "Kopi Tubruk Signature",
    kategori: "Seduh Rumahan",
    harga: 45000,
    stok: 12,
    unggulan: true,
    diskonPersen: 0,
    deskripsi: "Karakter cokelat dan kacang dengan body yang kuat.",
  },
  {
    nama: "Cold Brew Aren",
    kategori: "Minuman Dingin",
    harga: 22000,
    stok: 4,
    unggulan: false,
    diskonPersen: 10,
    deskripsi: "Kopi dingin dengan rasa ringan dan manis aren seimbang.",
  },
  {
    nama: "Paket Seduh Rumahan",
    kategori: "Paket Bundling",
    harga: 75000,
    stok: 0,
    unggulan: false,
    diskonPersen: 0,
    deskripsi: "Kopi 250 gram, filter, dan panduan seduh untuk pemula.",
  },
  {
    nama: "Paket Kantor Mingguan",
    kategori: "Paket Bundling",
    harga: 150000,
    stok: 20,
    unggulan: true,
    diskonPersen: 0,
    deskripsi: "Stok kopi untuk kebutuhan seduh satu kantor selama seminggu.",
  },
];

console.table(produkUmkm);

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

console.log(formatRupiah.format(produkUmkm[0].harga));

function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Seduh Rumahan":
      return "Kopi seduh untuk di rumah";
    case "Minuman Dingin":
      return "Minuman segar siap minum";
    case "Paket Bundling":
      return "Paket hemat";
    default:
      return "Produk UMKM";
  }
}

function hitungHargaPromo(harga, diskonPersen) {
  const diskonValid =
    Number.isFinite(diskonPersen) && diskonPersen > 0 && diskonPersen <= 100;

  if (!diskonValid) {
    return harga;
  }

  return Math.round(harga - (harga * diskonPersen) / 100);
}

console.log(hitungHargaPromo(22000, 10), hitungHargaPromo(22000, -5), hitungHargaPromo(22000, "10"));

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";
    // Badge unggulan hanya muncul jika nilainya true (conditional ke-4).
    const badgeUnggulan = produk.unggulan
      ? '<span class="featured-badge">Produk unggulan</span>'
      : "";

    const diskon = produk.diskonPersen ?? 0;
    const hargaPromo = hitungHargaPromo(produk.harga, diskon);
    const adaPromo = hargaPromo < produk.harga;
    const markupHarga = adaPromo
      ? `<div class="price-row">
          <p class="price">
            <s class="price-normal">${formatRupiah.format(produk.harga)}</s>
            ${formatRupiah.format(hargaPromo)}
          </p>
          <span class="price-discount">Hemat ${diskon}%</span>
        </div>`
      : `<p class="price">${formatRupiah.format(produk.harga)}</p>`;

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    markup = markup + `
      <article class="js-product-card">
        ${badgeUnggulan}
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        <p>${produk.deskripsi}</p>
        ${markupHarga}
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);
