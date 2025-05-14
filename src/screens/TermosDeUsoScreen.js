import React from "react";
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function TermosDeUsoScreen({ navigation }) {
  const handleVoltar = () => {
    navigation.goBack(); 
  };

  return (
    <View style={globalStyles.screenContainer}>
      <ScrollView>
        <Text style={globalStyles.titulo}>Termos de Uso e Responsabilidade do Usuário</Text>

        <Text style={globalStyles.subtitulo}>1. Aceitação dos Termos</Text>
        <Text style={globalStyles.textClaro}>
          Ao utilizar o aplicativo Fluxo, o usuário concorda com os termos e condições descritos neste documento...
        </Text>

        <Text style={globalStyles.subtitulo}>2. Uso de Dados Públicos</Text>
        <Text style={globalStyles.textClaro}>
          O aplicativo pode fornecer acesso a dados públicos de mobilidade e informações relacionadas a rotas...
        </Text>

        <Text style={globalStyles.subtitulo}>3. Raspagem de Dados</Text>
        <Text style={globalStyles.textClaro}>
          A raspagem de dados, ou coleta automatizada de informações, é proibida...
        </Text>

        <Text style={globalStyles.subtitulo}>4. Responsabilidade pela Coleta e Uso de Dados</Text>
        <Text style={globalStyles.textClaro}>O usuário é responsável por garantir que quaisquer dados coletados sejam tratados de acordo com a LGPD, incluindo:</Text>
        <Text style={globalStyles.lista}>• Obter consentimento explícito;</Text>
        <Text style={globalStyles.lista}>• Usar dados apenas para fins autorizados;</Text>
        <Text style={globalStyles.lista}>• Não divulgar dados sem permissão.</Text>

        <Text style={globalStyles.subtitulo}>5. Proibição de Uso Indevido</Text>
        <Text style={globalStyles.lista}>• Obtenção não autorizada de dados;</Text>
        <Text style={globalStyles.lista}>• Acesso não autorizado a partes do app;</Text>
        <Text style={globalStyles.lista}>• Causar danos ao sistema ou usuários.</Text>

        <Text style={globalStyles.subtitulo}>6. Consequências do Uso Indevido</Text>
        <Text style={globalStyles.textClaro}>
          O uso indevido pode resultar em ações legais e suspensão da conta.
        </Text>

        <Text style={globalStyles.subtitulo}>7. Direitos do Usuário sobre Dados Pessoais</Text>
        <Text style={globalStyles.textClaro}>
          O usuário pode acessar, corrigir ou excluir seus dados. Contato: fluxo.suporte.app@gmail.com
        </Text>

        <Text style={globalStyles.titulo}>Política de Privacidade</Text>

        <Text style={globalStyles.subtitulo}>1. Coleta de Dados</Text>
        <Text style={globalStyles.textClaro}>
          O app coleta dados como localização, preferências e uso para melhorar a experiência.
        </Text>

        <Text style={globalStyles.subtitulo}>2. Uso de Dados</Text>
        <Text style={globalStyles.lista}>• Personalizar serviços;</Text>
        <Text style={globalStyles.lista}>• Melhorar segurança;</Text>
        <Text style={globalStyles.lista}>• Analisar comportamento de uso.</Text>

        <Text style={globalStyles.subtitulo}>3. Compartilhamento de Dados</Text>
        <Text style={globalStyles.textClaro}>
          Dados não são compartilhados sem consentimento, exceto por obrigação legal.
        </Text>

        <Text style={globalStyles.subtitulo}>4. Segurança dos Dados</Text>
        <Text style={globalStyles.textClaro}>
          O Fluxo adota medidas de segurança. O usuário deve proteger suas credenciais.
        </Text>

        <Text style={globalStyles.subtitulo}>5. Alterações na Política de Privacidade</Text>
        <Text style={globalStyles.textClaro}>
          Alterações serão notificadas por e-mail ou dentro do app.
        </Text>

        {/* Botão */}
        <View style={globalStyles.botaoContainer}>
          <TouchableOpacity style={globalStyles.botao} onPress={handleVoltar}>
            <Text style={globalStyles.textoBotaoClaro}>Termos de uso lido</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


