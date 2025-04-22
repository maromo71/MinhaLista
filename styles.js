// MinhasTarefasApp/styles.js
import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A1A', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1, 
    backgroundColor: '#f0f0f0', 
  },
  // Estilos do Header
  header: {
    backgroundColor: '#483D8B', 
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    alignItems: 'center', 
  },
  headerText: {
    color: '#fff', 
    fontSize: 24,
    fontWeight: 'bold',
  },
  // Estilos da área de Input
  inputContainer: {
    flexDirection: 'row', 
    paddingHorizontal: 20, 
    paddingVertical: 15,
    marginTop: 10, 
    marginBottom: 20, 
    alignItems: 'center',
  },
  input: {
    flex: 1, 
    height: 50, 
    backgroundColor: '#fff',
    borderRadius: 8, 
    paddingHorizontal: 15, 
    marginRight: 10, 
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#483D8B',
    width: 50, 
    height: 50, 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  // Estilos da área da Lista
  listContainer: {
    flex: 1,
  },
  listPlaceholder: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  taksList: {
    marginTop: 10,
  },
  taksListContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

// Exporta o objeto de estilos para ser usado em outros arquivos
export default styles;