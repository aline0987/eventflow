import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { EventosProvider } from './EventosContext'; // importe seu provider

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <EventosProvider>
                <Drawer
                    screenOptions={{
                        drawerPosition: 'right', // menu à direita
                        headerShown: true,       // mostra o header
                        headerLeft: () => <Text style={{ marginLeft: 16, fontSize: 18 }}></Text>,
                    }}
                >
                    <Drawer.Screen
                        name="index"
                        options={{
                            headerShown: false,
                            drawerItemStyle: { height: 0 },
                        }}
                    />

                    <Drawer.Screen
                        name="about"
                        options={{ title: "Home" }}
                    />
                    <Drawer.Screen
                        name="abrirCamera"
                        options={{ title: "Camera" }}
                    />
                    <Drawer.Screen
                        name="eventos"
                        options={{ title: "Eventos" }}
                    />
                    <Drawer.Screen
                        name="list"
                        options={{
                            title: "Detalhes",
                            drawerItemStyle: { height: 0 },
                        }}
                    />
                    <Drawer.Screen
                        name="listt"
                        options={{
                            title: "Detalhes",
                            drawerItemStyle: { height: 0 },
                        }}
                    />
                    <Drawer.Screen
                        name="cadastrarLocais"
                        options={{
                            title: "Cadastrar",
                            drawerItemStyle: { height: 0 },
                        }}
                    />
                    <Drawer.Screen
                        name="cadastrar"
                        options={{ title: "Cadastrar" }}
                    />
                    <Drawer.Screen
                        name="locais"
                        options={{ title: "Locais" }}
                    />
                    <Drawer.Screen
                        name="perfil"
                        options={{ 
                            title: "Perfil",
                            headerShown: false,
                        }}
                    />
                </Drawer>
            </EventosProvider>
        </GestureHandlerRootView>
    )
}
