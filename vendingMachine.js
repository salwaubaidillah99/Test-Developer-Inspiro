const readline = require('readline');
class VendingMachine {
    constructor(){
        this.daftarHargaMakanan = {
            "Biskuit" : 6000,
            "Chips": 8000,
            "Oreo": 10000,
            "Tango": 12000,
            "Cokelat": 15000
        };
        
        //Misalkan Stock Tersedia.
        this.stock = {
            "Biskuit": 5,
            "Chips": 5,
            "Oreo": 5,
            "Tango": 5,
            "Cokelat": 5
        };

        this.saldo = 0;
        this.item = "";
    }
    
    masukkanUang(uang) {
        const uangValid = [2000, 5000, 10000, 20000, 50000];

        if (uangValid.includes(uang)) {
            this.saldo += uang;
            console.log(`Uang dimasukkan: ${uang}`);
        } else {
            console.log("Nilai uang tidak valid.");
        }
    }

    beliItem(item) {
        this.item = item; 

        if (!(item in this.daftarHargaMakanan)) {
            console.log("Item tidak tersedia. Silakan pilih item yang tersedia.");
            this.tampilkanItem();
            rl.question("Masukkan item yang ingin dibeli: ", (itemTerpilih) => {
            this.beliItem(itemTerpilih.trim());
        });
        return;
    }

    if (this.stock[item] === 0) {
        console.log(`${item} stock habis.`);
        return;
    }

        const harga = this.daftarHargaMakanan[item];

        if (this.saldo >= harga) {
            this.saldo -= harga;
            this.stock[item] -= 1;
            console.log(`Anda membeli: ${item} seharga ${harga}`);
            console.log(`Saldo tersisa: ${this.saldo}`);
            console.log(`${item} stok tersisa: ${this.stock[item]}`);
            this.tanyaBeliLagi(); 
        } else {
            console.log(`Saldo tidak cukup untuk membeli ${item}.`);
            this.mintaUangTambahan(harga);
        }
    }

    mintaUangTambahan(harga) {
        const kekurangan = harga - this.saldo;
        console.log(`Anda kekurangan ${kekurangan}.`);

        const uangValid = [2000, 5000, 10000, 20000, 50000];

        rl.question(`Masukkan uang tambahan sebesar ${kekurangan}: `, (uangTambahan) => {
            uangTambahan = parseInt(uangTambahan);
            if (uangValid.includes(uangTambahan)) {
                this.saldo += uangTambahan;
                console.log(`Uang tambahan dimasukkan: ${uangTambahan}`);
                this.beliItem(this.item);
            } else {
                console.log("Uang tambahan tidak valid.");
                rl.question("Apakah Anda ingin mengambil uang kembaliannya? (ya/tidak): ", (responKembalian) => {
                    if (responKembalian.toLowerCase() === "ya") {
                        this.kembalikanUang();
                    } else {
                        console.log("Transaksi dibatalkan.");
                        this.mintaUangTambahanLagi(harga); 
                    }
                });
            }
        });
    }

    mintaUangTambahanLagi(harga) {
        const uangValid = [2000, 5000, 10000, 20000, 50000];
        rl.question(`Masukkan uang tambahan yang valid untuk menyelesaikan transaksi: `, (uangTambahan) => {
            uangTambahan = parseInt(uangTambahan);
            if (uangValid.includes(uangTambahan)) {
                this.saldo += uangTambahan;
                console.log(`Uang tambahan dimasukkan: ${uangTambahan}`);
                this.beliItem(this.item);
            } else {
                console.log("Uang tambahan masih tidak valid.");
                this.mintaUangTambahanLagi(harga);
            }
        });
    }

    kembalikanUang() {
        if (this.saldo > 0) {
            console.log(`Mengembalikan uang kembalian: ${this.saldo}`);
            this.saldo = 0;
        } else {
            console.log("Tidak ada uang kembalian.");
        }
    }

    tampilkanItem() {
        console.log("Daftar item yang tersedia:");
        for (const item in this.daftarHargaMakanan) {
            const jumlahStok = this.stock[item];
            const status = jumlahStok > 0 ? "Tersedia" : "Stok habis";
            const stokHabis = jumlahStok > 0 ? "" : " - Stok habis";
            console.log(`${item} - Harga: ${this.daftarHargaMakanan[item]}, ${status}${stokHabis}`);
        }
    }

    tanyaBeliLagi() {
        rl.question("Apakah Anda ingin membeli lagi? (ya/tidak): ", (responBeliLagi) => {
            if (responBeliLagi.toLowerCase() === "ya") {
                this.tampilkanItem(); 
                rl.question("Masukkan item yang ingin dibeli: ", (itemTerpilih) => {
                    this.beliItem(itemTerpilih);
                });
            } else {
                if(this.saldo > 0){
                    console.log(`uang kembalian anda : ${this.saldo}`);
                    this.kembalikanUang;
                }
                console.log("Terima kasih sudah belanja.");
                rl.close(); 
            }
        });
    }
}

const mesin = new VendingMachine();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function jalankanMesinPenjual() {
    mesin.tampilkanItem();

    rl.question("Masukkan uang (2000, 5000, 10000, 20000, 50000): ", (inputUang) => {
        inputUang = parseInt(inputUang);
        if (!isNaN(inputUang)) {
            mesin.masukkanUang(inputUang);
        } else {
            console.log("Input uang tidak valid.");
            rl.close();
            return;
        }

        rl.question("Masukkan item yang ingin Anda beli (Biskuit, Chips, Oreo, Tango, Cokelat): ", (itemTerpilih) => {
            itemTerpilih = itemTerpilih.trim();

            if (itemTerpilih) {
                mesin.beliItem(itemTerpilih);
            } else {
                console.log("Pemilihan item tidak valid.");
            }
        });
    });
}

jalankanMesinPenjual();
