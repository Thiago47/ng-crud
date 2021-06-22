/*interfaces são usadas para ocupar o papel de "dar forma" aos dados e são uma maneira
poderosa de definir contratos dentro do seu código, bem como contratos com código fora do seu projeto.
Essa interface representa a interface do db.json*/
export interface Product{
    //Atributos da interface
    id?: number //? deixa o id como opcional, ou seja, não obrigátorio colocar ele na interface
    name: string
    price: number
}
