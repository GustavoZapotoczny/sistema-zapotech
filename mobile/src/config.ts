// Variáveis EXPO_PUBLIC_* entram no app no build: nunca coloque segredos.
// No celular físico, "localhost" é o próprio celular: use o IP do PC na rede (ex.: http://192.168.0.10:5080).
export const config = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:5080',
}
