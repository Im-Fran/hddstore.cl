export interface Review {
  id: string
  rating: number
  text: string
  authorName: string
  authorPhoto?: string
  authorProfileUri?: string
  relativeTime: string
  googleMapsUri: string
}

export interface PlaceData {
  placeId: string
  rating: number
  userRatingCount: number
  reviews: Review[]
}

// places/{placeId}/reviews/{reviewId} -> placeId
function placeIdFromReviewId(id: string): string {
  return id.split('/')[1] ?? ''
}

export function placeDataFromReviews(rating: number, userRatingCount: number, reviews: Review[]): PlaceData {
  return {
    placeId: reviews[0] ? placeIdFromReviewId(reviews[0].id) : '',
    rating,
    userRatingCount,
    reviews,
  }
}

// Fallback si /api/reviews falla o D1 todavía no tiene reseñas.
// Captura real de la respuesta de Google Places (recortada a las reseñas disponibles).
export const FALLBACK_DATA: PlaceData = placeDataFromReviews(5, 106, [
  {
    id: 'places/ChIJC6Bso6XPYpYRk9egCQTftUE/reviews/Ci9DQUlRQUNvZENodHljRjlvT21OamVWZzNXSFF6WjNsZlUyVnFVemhoWjFSMVRGRRAB',
    rating: 5,
    text: 'Muy buen servicio. Le hicieron una limpieza completa a mi computador tipo torre y quedó como nuevo. Se nota la diferencia en el funcionamiento. Buena atención y excelente trabajo, 100% recomendados.',
    authorName: 'Giovanni Alexis',
    authorPhoto:
      'https://lh3.googleusercontent.com/a/ACg8ocIzPIiIODVx5rkGymfIrVFZhxXYldNh6w8lQCofS6ljVs2IOg=s128-c0x00000000-cc-rp-mo',
    authorProfileUri: 'https://www.google.com/maps/contrib/116488524460551304380/reviews',
    relativeTime: '3 semanas atrás',
    googleMapsUri:
      'https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT21OamVWZzNXSFF6WjNsZlUyVnFVemhoWjFSMVRGRRAB!2m1!1s0x9662cfa5a36ca00b:0x41b5df0409a0d793',
  },
  {
    id: 'places/ChIJC6Bso6XPYpYRk9egCQTftUE/reviews/Ci9DQUlRQUNvZENodHljRjlvT2xOU1pIWlpPREJKWDJsUVFYQlZkeTFCWnpaU1ZWRRAB',
    rating: 5,
    text: 'No suelo mucho dar reviews en Google pero esta vez si corresponde. Lleve mi notebook Asus TUF del año 2021 para un cambio de teclado ya que le faltaba la "s" y no funcionaba la "x" ni la "c".\n\nComo este proceso requería desarmar completamente el notebook, Alejandro me comentaba y enviaba evidencias de todo el proceso incluyendo algunos problemas que encontraba a medida que revisaba los componentes, dándome la opción de mantener los inconvenientes que venían de 2021, o bien arreglarlos durante el mismo día.\n\nAl final, recibí mi Notebook superando mis expectativas, muy buen servicio, muy confiable y sobre todo, se nota que es apasionado por su trabajo.\n\n100/10 🤙🏼',
    authorName: 'Juan Pablo Cortez',
    authorPhoto:
      'https://lh3.googleusercontent.com/a/ACg8ocJWUg-2R1sfipii4xekLlsOd4jTTSgZPunJr4XdWdZjqPiWP_c=s128-c0x00000000-cc-rp-mo',
    authorProfileUri: 'https://www.google.com/maps/contrib/107704734820182801293/reviews',
    relativeTime: '3 meses atrás',
    googleMapsUri:
      'https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2xOU1pIWlpPREJKWDJsUVFYQlZkeTFCWnpaU1ZWRRAB!2m1!1s0x9662cfa5a36ca00b:0x41b5df0409a0d793',
  },
  {
    id: 'places/ChIJC6Bso6XPYpYRk9egCQTftUE/reviews/Ci9DQUlRQUNvZENodHljRjlvT2twQlpsWlpOR1JRVG1OQlpUUktNemxhVTJjdGJVRRAB',
    rating: 5,
    text: 'Increíble trabajo de Alejandro. Él ha sido quién ha trabajado con mi PC desde el montaje y cada vez lo deja como nuevo. Excelente servicio!',
    authorName: 'Javier Fontt',
    authorPhoto:
      'https://lh3.googleusercontent.com/a-/ALV-UjWASRDGpQiwjK0E2uXyKYCvBX282Sr7uP3p_O4Qj4ZUjDCXDUg=s128-c0x00000000-cc-rp-mo',
    authorProfileUri: 'https://www.google.com/maps/contrib/114514406120925326486/reviews',
    relativeTime: '8 meses atrás',
    googleMapsUri:
      'https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2twQlpsWlpOR1JRVG1OQlpUUktNemxhVTJjdGJVRRAB!2m1!1s0x9662cfa5a36ca00b:0x41b5df0409a0d793',
  },
  {
    id: 'places/ChIJC6Bso6XPYpYRk9egCQTftUE/reviews/Ci9DQUlRQUNvZENodHljRjlvT25ocGRFMXFZa0ZLWDNOTVJuQjZTSGsxV0cwMVgzYxAB',
    rating: 5,
    text: 'Excelente servicio. Llevé mi notebook después de que se le cayera agua y pensé que ya no tenía arreglo, pero logró recuperarla y quedó funcionando perfecto. Muy buena atención, responsable, honesto y con mucho conocimiento. Se nota la dedicación y el profesionalismo en su trabajo. Lo recomiendo totalmente.',
    authorName: 'Neskary Diaz',
    authorPhoto:
      'https://lh3.googleusercontent.com/a-/ALV-UjXD3WF7QkY9Sy60mR9i8j4Hokan335IzdV8HI7iMbYiK8osM-QU=s128-c0x00000000-cc-rp-mo-ba3',
    authorProfileUri: 'https://www.google.com/maps/contrib/111553106148222946085/reviews',
    relativeTime: 'un mes atrás',
    googleMapsUri:
      'https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT25ocGRFMXFZa0ZLWDNOTVJuQjZTSGsxV0cwMVgzYxAB!2m1!1s0x9662cfa5a36ca00b:0x41b5df0409a0d793',
  },
  {
    id: 'places/ChIJC6Bso6XPYpYRk9egCQTftUE/reviews/Ci9DQUlRQUNvZENodHljRjlvT21Ob05USlZTWFZPYjJONmFXWkZOaTFmUVd4d1kwRRAB',
    rating: 5,
    text: 'Excelente el servicio\nMuy profesional además del servicio realiza recomendaciones de lo que habría que hacer acerca mantenimiento preventivo. Califico del 1 al 10 con un 10, recomendado ampliamente.',
    authorName: 'Rafael Lopez',
    authorPhoto:
      'https://lh3.googleusercontent.com/a-/ALV-UjUUNk_FwMp9Gs7pOQiS1HouiStH19cFfQuss8yUbUqezXDUpFOgRg=s128-c0x00000000-cc-rp-mo',
    authorProfileUri: 'https://www.google.com/maps/contrib/118290576819810917088/reviews',
    relativeTime: '3 meses atrás',
    googleMapsUri:
      'https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT21Ob05USlZTWFZPYjJONmFXWkZOaTFmUVd4d1kwRRAB!2m1!1s0x9662cfa5a36ca00b:0x41b5df0409a0d793',
  },
])
