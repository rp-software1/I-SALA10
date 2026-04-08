import { Categoria } from "./restaurante.types";

const categoriadeHoy: Categoria = Categoria.PRINCIPAL
console.log(categoriadeHoy)

const todaslasCategoria = Object.values(Categoria)
console.log(todaslasCategoria)


const CategoriaInvalida: Categoria = Categoria.PRINCIPAL


