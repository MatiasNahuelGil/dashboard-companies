import { Currency } from "lucide-react"

export const formatPrice = (price : number) => {
    return new Intl.NumberFormat("es-Es", {
        style : "currency",
        currency : "EUR",

    }).format(price)
}