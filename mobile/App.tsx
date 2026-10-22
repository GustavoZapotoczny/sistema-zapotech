import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TelaInicial from './src/telas/TelaInicial'

export default function App() {
  return (
    <SafeAreaProvider>
      <TelaInicial />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
