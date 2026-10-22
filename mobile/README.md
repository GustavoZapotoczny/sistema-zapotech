# App (React Native + Expo)

```bash
npm install
npx expo start       # abre o QR Code; leia com o app Expo Go no celular
npm test             # Jest (jest-expo)
npm run typecheck
```

No celular físico, a API precisa ser acessada pelo IP do PC na rede.
Crie `mobile/.env.local` com `EXPO_PUBLIC_API_URL=http://SEU_IP:5080`
e rode a API com `dotnet run --project src/Zapotech.Api --urls http://0.0.0.0:5080`.

Sempre instale pacotes com `npx expo install <pacote>` (escolhe a versão compatível com o SDK).
