////clase principal
class Cuota {
    constructor(n=0,total=0,exactitud=0){
        this.n = parseInt(n);
        this.total = parseFloat(total);
        this.exactitud = parseInt(exactitud);

        this.cuotas = [];

        this.dividir_cuotas();
    }

    //get y set de numero de cuotas
    get n_cuotas(){
        return this.n;
    }

    set n_cuotas(n){
        this.n = parseInt(n);
    }

    //get y set de total
    get valor_total(){
        return this.total;
    }

    set valor_total(total){
        this.total = parseFloat(total);
    }

    //get y set de exactitud de numeros decimales
    get exactitud_decimal(){
        return this.exactitud;
    }

    set exactitud_decimal(exactitud){
        this.exactitud = parseInt(exactitud);
    }

    //get y set del arreglo de cuotas
    get cuotas_a(){
        return this.cuotas;
    }

    set cuotas_a(cuotas){
        this.cuotas = [];

        for (let i = 0; i < cuotas.length; i++) {
            this.cuotas.push({
                valor: parseFloat(cuotas[i].valor),
                saldo: parseFloat(cuotas[i].saldo),
                fecha: cuotas[i].fecha,
            });
        }
    }

    //funcion para dividir las cuotas desde una instancia sin array
    dividir_cuotas(){
        let cuotas = [];

        let exponencial = Math.pow(10,this.exactitud);

        let numero = parseInt(this.total*exponencial);

        let base = parseInt(numero/this.n);

        let ultimo = parseInt(numero) - parseInt(base*parseInt(this.n - 1))

        for (let i = 0; i < parseInt(this.n - 1); i++) {
            this.cuotas.push({
                valor: parseFloat(base/exponencial).toFixed(this.exactitud),
                saldo: parseFloat(base/exponencial).toFixed(this.exactitud),
                fecha: "",
            });
        }

        this.cuotas.push({
            valor: parseFloat(ultimo/exponencial).toFixed(this.exactitud),
            saldo: parseFloat(ultimo/exponencial).toFixed(this.exactitud),
            fecha: "",
        });
    }

    //Cambiar valor de cuota individual
    cambiar_cuota(index=-1,cuota=null,permitir_negativos=false){
        if (cuota && index < parseInt(this.cuotas.length) - 1 && index>-1) {

            
            

            let exponencial = Math.pow(10,this.exactitud);
            
            let cantidad_n = parseInt(parseFloat(cuota.valor)*exponencial);
            
            let total_1 = 0;

            for (let i = index; i < this.cuotas.length; i++) {
                total_1 += parseInt(this.cuotas[i].valor*exponencial);
            }

            if (permitir_negativos) {

                console.log("negativo");

                if (total_1-cantidad_n <= 0) {
                    this.cuotas[index+1] = {
                        valor: parseFloat((total_1-cantidad_n)/exponencial).toFixed(this.exactitud),
                        saldo: parseFloat((total_1-cantidad_n)/exponencial).toFixed(this.exactitud),
                        fecha: "",
                    }
                    
                    for (let i = index+2; i < this.cuotas.length; i++) {
                        this.cuotas[i] = {
                            valor: 0,
                            saldo: 0,
                            fecha: "",
                        }
                    }
                }else{
                    let cta_x = new Cuota(this.cuotas.length - (index + 1),parseFloat((total_1-cantidad_n)/exponencial).toFixed(this.exactitud),this.exactitud);

                    for (let i = 0; i < cta_x.cuotas_a.length && index+i+1 < this.cuotas.length; i++) {
                        this.cuotas[index+i+1] = {
                            valor: cta_x.cuotas_a[i].valor,
                            saldo: cta_x.cuotas_a[i].saldo,
                            fecha: "",
                        }
                    }
                }

                this.cuotas[index] = {
                    valor: parseFloat(cantidad_n/exponencial).toFixed(this.exactitud),
                    saldo: parseFloat(cantidad_n/exponencial).toFixed(this.exactitud),
                    fecha: "",
                }
            }else{
                console.log("positivo");

                if (cantidad_n >= total_1) {
                    this.cuotas[index] = {
                        valor: parseFloat(total_1/exponencial).toFixed(this.exactitud),
                        saldo: parseFloat(total_1/exponencial).toFixed(this.exactitud),
                        fecha: "",
                    }

                    for (let i = index+1; i < this.cuotas.length; i++) {
                        this.cuotas[i] = {
                            valor: 0,
                            saldo: 0,
                            fecha: "",
                        }
                    }
                }else{
                    if (cantidad_n <= 0) {
                        this.cuotas[index] = {
                            valor: 0,
                            saldo: 0,
                            fecha: "",
                        }

                        let cta_x = new Cuota(this.cuotas.length - (index + 1),parseFloat((total_1)/exponencial).toFixed(this.exactitud),this.exactitud);

                        for (let i = 0; i < cta_x.cuotas_a.length && index+i+1 < this.cuotas.length; i++) {
                            this.cuotas[index+i+1] = {
                                valor: cta_x.cuotas_a[i].valor,
                                saldo: cta_x.cuotas_a[i].saldo,
                                fecha: "",
                            }
                        }
                    } else {
                        console.log("cantidad positiva");

                        this.cuotas[index] = {
                            valor: parseFloat(cantidad_n/exponencial).toFixed(this.exactitud),
                            saldo: parseFloat(cantidad_n/exponencial).toFixed(this.exactitud),
                            fecha: "",
                        }

                        let cta_x = new Cuota(this.cuotas.length - (index + 1),parseFloat((total_1-cantidad_n)/exponencial).toFixed(this.exactitud),this.exactitud);

                        console.log(cta_x);

                        for (let i = 0; i < cta_x.cuotas_a.length && index+i+1 < this.cuotas.length; i++) {
                            this.cuotas[index+i+1] = {
                                valor: cta_x.cuotas_a[i].valor,
                                saldo: cta_x.cuotas_a[i].saldo,
                                fecha: "",
                            }
                        }
                    }
                }
            }
        }
    }
}

module.exports.dividir_cuotas = Cuota;