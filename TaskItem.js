// MinhasTarefasApp/TaskItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Recebe a prop 'text' com o conteúdo da tarefa
// Recebe o objeto 'task' e a função 'onToggleCompletion' como props
const TaskItem = ({ task, onToggleCompletion, onRemoveTask }) => {
  return (
    // Envolve tudo em TouchableOpacity para capturar o toque
    <TouchableOpacity
      activeOpacity={0.7} // Feedback visual ao tocar
      onPress={() => onToggleCompletion(task.id)} // Chama a função passada via prop com o ID da tarefa
    >
      {/* A View agora só agrupa o conteúdo visual */}
      {/* Aplicamos estilos condicionais aqui */}
      <View style={[
          styles.itemContainer,
          task.completed ? styles.itemContainerCompleted : {} // Aplica estilo extra se concluído
        ]}>
        {/* Aplicamos estilos condicionais ao texto também */}
        <Text style={[
            styles.itemText,
            task.completed ? styles.itemTextCompleted : {} // Aplica estilo extra se concluído
          ]}>
          {task.text}
        </Text>
        
        {/* Botão de Remover (outro TouchableOpacity) */}
        <TouchableOpacity
          style={styles.removeButton}
          onPress={(e) => {
              // Impede que o toque no botão de remover também dispare o onToggleCompletion
              // Isso é opcional dependendo do layout, mas uma boa prática em casos aninhados.
              e.stopPropagation();
              onRemoveTask(task.id); // Chama a função de remoção passada via prop
            }
          }
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Aumenta a área de toque
        >
          <Text style={styles.removeButtonText}>X</Text>
          {/* Alternativa: <Ionicons name="trash-outline" size={20} color="#DC3545" /> */}
        </TouchableOpacity> 
      </View>
    </TouchableOpacity>
  );
};

// Estilos específicos para o item da lista
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingLeft: 15, //Ajustado para dar espaco ao botao
    paddingRight: 10, //Ajustado
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row', // Para alinhar texto e talvez um futuro ícone
    alignItems: 'center',
    justifyContent: 'space-between', //empurra o botao para a direita
  },
  // Estilo ADICIONAL quando a tarefa está completa
  itemContainerCompleted: {
    backgroundColor: '#E8F5E9', // Um verde claro
    borderColor: '#A5D6A7', // Borda verde mais escura
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1, // Permite que o texto ocupe o espaço disponível
    marginRight: 10,
  },
  // Estilo ADICIONAL para o texto quando a tarefa está completa
  itemTextCompleted: {
    color: '#757575', // Cor de texto mais apagada
    textDecorationLine: 'line-through', // Texto riscado
  },
  removeButton: {
    backgroundColor: '#FFDDDD', // Um vermelho claro
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#DC3545',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TaskItem;