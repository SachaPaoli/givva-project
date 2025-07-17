import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Données fictives pour commencer
const fakeItems = [
  {
    id: '1',
    title: 'Casque Bluetooth Sony',
    description: 'En très bon état, batterie qui tient bien',
    coins: 8,
    category: 'Électronique',
    location: 'Bruxelles',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Casque'
  },
  {
    id: '2',
    title: 'Pull Nike Taille M',
    description: 'Pull de sport, parfait pour l\'hiver',
    coins: 5,
    category: 'Vêtements',
    location: 'Ixelles',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Pull'
  },
  {
    id: '3',
    title: 'Livre "Clean Code"',
    description: 'Livre de programmation, très utile pour dev',
    coins: 3,
    category: 'Livres',
    location: 'Schaerbeek',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Livre'
  },
  {
    id: '4',
    title: 'Plante verte',
    description: 'Belle plante d\'intérieur, facile d\'entretien',
    coins: 2,
    category: 'Maison',
    location: 'Bruxelles',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Plante'
  }
];

export default function HomeScreen() {
  const handleItemPress = (item: any) => {
    // Plus tard : navigation vers la page détail
    console.log('Item pressé:', item.title);
  };

  return (
    <ThemedView style={styles.container}>
      {/* En-tête avec titre et coins */}
      <ThemedView style={styles.header}>
        <ThemedText type="title">Givva</ThemedText>
        <ThemedView style={styles.coinsContainer}>
          <ThemedText style={styles.coinsText}>💰 12 coins</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Liste des objets */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Objets près de chez toi
        </ThemedText>
        
        {fakeItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemCard}
            onPress={() => handleItemPress(item)}
          >
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            
            <ThemedView style={styles.itemInfo}>
              <ThemedText type="defaultSemiBold" style={styles.itemTitle}>
                {item.title}
              </ThemedText>
              <ThemedText style={styles.itemDescription} numberOfLines={2}>
                {item.description}
              </ThemedText>
              <ThemedView style={styles.itemFooter}>
                <ThemedText style={styles.itemLocation}>📍 {item.location}</ThemedText>
                <ThemedView style={styles.itemCoins}>
                  <ThemedText style={styles.itemCoinsText}>
                    {item.coins} coins
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60, // Pour l'espace du status bar
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  coinsContainer: {
    backgroundColor: '#6FCF97',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  coinsText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    padding: 20,
    paddingBottom: 10,
    color: '#1F1F1F',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  itemLocation: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  itemCoins: {
    backgroundColor: '#6FCF97',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  itemCoinsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
