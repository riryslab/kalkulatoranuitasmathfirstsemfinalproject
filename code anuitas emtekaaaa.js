function hitungAnuitas() {
    const pinjaman = parseFloat(document.getElementById('pinjaman').value);
    const bungaPersen = parseFloat(document.getElementById('bunga').value);
    const tenor = parseInt(document.getElementById('tenor').value);

    if (isNaN(pinjaman) || isNaN(bungaPersen) || isNaN(tenor) || pinjaman <= 0 || bungaPersen <= 0 || tenor <= 0) {
        alert("Harap masukkan angka yang valid dan lebih dari 0");
        return;
    }

    const i = bungaPersen / 100;
    const anuitas = (pinjaman * i) / (1 - Math.pow(1 + i, -tenor));

    document.getElementById('hasil-anuitas').innerText = formatRupiah(anuitas);
    document.getElementById('result-section').classList.remove('hidden');

    const tbody = document.querySelector('#tabel-angsuran tbody');
    tbody.innerHTML = '';

    let sisaPinjaman = pinjaman;

    for (let bulan = 1; bulan <= tenor; bulan++) {
        const bungaBulanIni = sisaPinjaman * i;
        const pokokBulanIni = anuitas - bungaBulanIni;
        let sisaAkhir = sisaPinjaman - pokokBulanIni;

        if (Math.abs(sisaAkhir) < 1) {
            sisaAkhir = 0;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${bulan}</td>
            <td>${formatRupiah(sisaPinjaman)}</td>
            <td>${formatRupiah(bungaBulanIni)}</td>
            <td>${formatRupiah(pokokBulanIni)}</td>
            <td>${formatRupiah(sisaAkhir)}</td>
        `;
        tbody.appendChild(tr);

        sisaPinjaman = sisaAkhir;
    }
}

function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR' 
    }).format(angka);
}