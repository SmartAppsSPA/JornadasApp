export function formatPrice(finalPrice) {
    return finalPrice.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP'
    })
}