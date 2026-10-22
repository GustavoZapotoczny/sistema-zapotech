import { useCallback, useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { buscarSaude, type InfoSaude } from '../api/saude'

type Estado = { tipo: 'verificando' } | { tipo: 'no-ar'; info: InfoSaude } | { tipo: 'fora' }

export default function TelaInicial() {
  const [estado, setEstado] = useState<Estado>({ tipo: 'verificando' })

  const verificar = useCallback(async () => {
    setEstado({ tipo: 'verificando' })
    try {
      setEstado({ tipo: 'no-ar', info: await buscarSaude() })
    } catch {
      setEstado({ tipo: 'fora' })
    }
  }, [])

  useEffect(() => {
    void verificar()
  }, [verificar])

  const cor = estado.tipo === 'no-ar' ? '#16a34a' : estado.tipo === 'fora' ? '#dc2626' : '#a3a3a3'

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Zapotech</Text>
      <Text style={estilos.subtitulo}>Gestão para oficinas e pequenos negócios</Text>

      <View style={estilos.cartao} accessibilityRole="summary">
        <Text style={estilos.cartaoTitulo}>Status do sistema</Text>
        <View style={estilos.linha}>
          <View style={[estilos.bolinha, { backgroundColor: cor }]} />
          <Text accessibilityLiveRegion="polite">
            {estado.tipo === 'verificando' && 'Verificando a API…'}
            {estado.tipo === 'no-ar' && `API no ar · versão ${estado.info.versao} · ${estado.info.ambiente}`}
            {estado.tipo === 'fora' && 'API fora do ar'}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => void verificar()}
          disabled={estado.tipo === 'verificando'}
          style={({ pressed }) => [estilos.botao, pressed && { opacity: 0.6 }]}
        >
          <Text style={estilos.botaoTexto}>Verificar de novo</Text>
        </Pressable>
      </View>
    </View>
  )
}

const estilos = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 8, backgroundColor: '#fff' },
  titulo: { fontSize: 36, fontWeight: '700', color: '#171717' },
  subtitulo: { fontSize: 15, color: '#737373', marginBottom: 24, textAlign: 'center' },
  cartao: { width: '100%', maxWidth: 420, borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 14, padding: 20, gap: 16 },
  cartaoTitulo: { fontSize: 16, fontWeight: '600' },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bolinha: { width: 10, height: 10, borderRadius: 5 },
  botao: { borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  botaoTexto: { fontWeight: '500' },
})
