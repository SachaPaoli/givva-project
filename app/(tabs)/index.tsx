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
    condition: 'Parfait état',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Casque'
  },
  {
    id: '2',
    title: 'Pull Nike Taille M',
    description: 'Pull de sport, parfait pour l\'hiver',
    coins: 5,
    category: 'Vêtements',
    location: 'Ixelles',
    condition: 'Bon état',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Pull'
  },
  {
    id: '3',
    title: 'Livre "Clean Code"',
    description: 'Livre de programmation, très utile pour dev',
    coins: 3,
    category: 'Livres',
    location: 'Schaerbeek',
    condition: 'Parfait état',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Livre'
  },
  {
    id: '4',
    title: 'Plante verte',
    description: 'Belle plante d\'intérieur, facile d\'entretien',
    coins: 2,
    category: 'Maison',
    location: 'Bruxelles',
    condition: 'Moyen état',
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
        <ThemedText type="title" style={styles.appTitle}>Givva</ThemedText>
        <ThemedView style={styles.coinsContainer}>
          <ThemedText style={styles.coinsText}>12</ThemedText>
          <ThemedView style={styles.coinIcon}>
            <ThemedText style={styles.coinText}>G</ThemedText>
          </ThemedView>
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
              <ThemedText style={styles.itemCondition}>
                État: {item.condition}
              </ThemedText>
              <ThemedView style={styles.itemFooter}>
                <ThemedText style={styles.itemLocation}>📍 {item.location}</ThemedText>
                <ThemedView style={styles.itemCoins}>
                  <ThemedText style={styles.itemCoinsText}>
                    {item.coins}
                  </ThemedText>
                  <ThemedView style={styles.itemCoinIcon}>
                    <ThemedText style={styles.itemCoinText}>G</ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            </ThemedView>
            
            <ThemedView style={styles.itemArrow}>
              <ThemedText style={styles.itemArrowText}>{'>'}</ThemedText>
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
    backgroundColor: '#F9FAFB', // Fond gris léger
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
  appTitle: {
    color: '#4A90E2', // Bleu doux
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF', // Forcer le fond blanc
  },
  coinIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700', // Or
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinText: {
    color: '#B8860B', // Or foncé pour le contraste
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  coinsText: {
    color: '#1F1F1F', // Noir pour la lisibilité
    fontWeight: '600',
    fontSize: 16,
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
    borderWidth: 1,
    borderColor: '#4A90E2', // Bordure bleue
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
    backgroundColor: '#FFFFFF', // Forcer le fond blanc
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F', // Noir pour la lisibilité
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  itemCondition: {
    fontSize: 12,
    color: '#4A90E2', // Bleu doux pour l'état
    fontWeight: '600',
    marginTop: 4,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#FFFFFF', // Forcer le fond blanc
  },
  itemLocation: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  itemCoins: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF', // Forcer le fond blanc
  },
  itemCoinIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFD700', // Or
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCoinText: {
    color: '#B8860B', // Or foncé pour le contraste
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 18, // Pour centrer verticalement
  },
  itemCoinsText: {
    color: '#1F1F1F', // Noir pour la lisibilité
    fontSize: 14,
    fontWeight: '600',
  },
  itemArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Forcer le fond blanc
    paddingLeft: 8,
  },
  itemArrowText: {
    color: '#4A90E2', // Bleu doux
    fontSize: 20,
    fontWeight: '600',
  },
});
