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
}