# Instalacion

npm install dividir_cuotas --save

# Uso

1. Crea una instancia de la clase Cuota que posee la libreria
2. Inicializa los parametros si deseas todos son opcionales:
    - n: numero de cuotas para dividir valor por defecto 0.
    - total: cantidad numerica total a ser dividida en n cuotas. Valor por defecto 0.
    - exactitud: aproximacion decimal de las cantidades divididas. 0 POR DEFECTO.
3. para acceder a las propiedades del objeto use los getters y setters:
    - n_cuotas
    - valor_total
    - exactitud_decimal
    - cuotas_a: Es el arreglo de cuotas divididas en n partes del total con la exactitud decimal declarada al inicio, cada item posee las propiedades:
        * valor: es el valor numerico de dicha cuota
        * saldo: es el saldo pendiente de la cuota. por defecto es el mismo que el valor
        * fecha: es la fecha de pago programada para la cuota, por defecto esta vacia
4. dividir_cuotas: funcion sin parametro que divide el total propuesto en n cuotas propuestas con la exactitud propuesta.
5. cambiar_cuota(index=-1,cuota=null,permitir_negativos=false): funcion con parametros opcionales
    - index: el indice del arreglo de las cuotas de la cuota donde queremos hacer el cambio.
    - cuota: debe pasarse un objeto de la forma: {valor:0} es el valor que se va a asignar a la cuota del indice index.
    - permitir_negativos: permite el cambio de valores de las cuotas por valores negativos