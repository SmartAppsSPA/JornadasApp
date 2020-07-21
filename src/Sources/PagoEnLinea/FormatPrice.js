import 'intl'
import 'intl/locale-data/jsonp/es-CL'

export const numberFormat = (value) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(value);