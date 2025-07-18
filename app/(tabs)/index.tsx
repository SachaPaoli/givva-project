import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Fake data to start with
const fakeItems = [
  {
    id: '1',
    title: 'Sony Bluetooth Headphones',
    description: 'In very good condition, battery holds well',
    coins: 8,
    category: 'Electronics',
    location: 'Brussels',
    condition: 'Perfect condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Headphones'
  },
  {
    id: '2',
    title: 'Nike Sweater Size M',
    description: 'Sports sweater, perfect for winter',
    coins: 5,
    category: 'Clothing',
    location: 'Ixelles',
    condition: 'Good condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Sweater'
  },
  {
    id: '3',
    title: '"Clean Code" Book',
    description: 'Programming book, very useful for developers',
    coins: 3,
    category: 'Books',
    location: 'Schaerbeek',
    condition: 'Perfect condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Book'
  },
  {
    id: '4',
    title: 'Green Plant',
    description: 'Beautiful indoor plant, easy to maintain',
    coins: 2,
    category: 'Home',
    location: 'Brussels',
    condition: 'Average condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Plant'
  }
];

export default function HomeScreen() {
  const router = useRouter();

  const handleItemPress = (item: any) => {
    // Navigate to detail page
    router.push({
      pathname: './detailsItem',
      params: { id: item.id }
    });
  };

  const handleSearchPress = () => {
    router.push('./search');
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header with title and coins */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.appTitle}>Givva</ThemedText>
        <ThemedView style={styles.coinsContainer}>
          <ThemedText style={styles.coinsText}>12</ThemedText>
          <ThemedView style={styles.coinIcon}>
            <ThemedText style={styles.coinText}>G</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Items list */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Items near you
          </ThemedText>
        </ThemedView>

        {/* Search Section */}
        <ThemedView style={styles.searchSection}>
          <TouchableOpacity style={styles.searchBar} onPress={handleSearchPress}>
            <ThemedText style={styles.searchIcon}>🔍</ThemedText>
            <ThemedText style={styles.searchText}>Search items...</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
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
                {item.condition}
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
    backgroundColor: '#FFFFFF', // White background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60, // For status bar space
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  appTitle: {
    color: '#4A90E2', // Soft blue
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF', // Force white background
  },
  coinIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700', // Gold
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinText: {
    color: '#B8860B', // Dark gold for contrast
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  coinsText: {
    color: '#1F1F1F', // Black for readability
    fontWeight: '600',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    color: '#1F1F1F',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  searchIcon: {
    fontSize: 16,
    color: '#6C757D',
    marginRight: 10,
  },
  searchText: {
    fontSize: 16,
    color: '#6C757D',
    flex: 1,
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
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 20,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF', // Force white background
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F', // Black for readability
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  itemCondition: {
    fontSize: 12,
    color: '#4A90E2', // Soft blue for condition
    fontWeight: '600',
    marginTop: 4,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#FFFFFF', // Force white background
  },
  itemLocation: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  itemCoins: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF', // Force white background
  },
  itemCoinIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFD700', // Gold
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCoinText: {
    color: '#B8860B', // Dark gold for contrast
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 18, // To center vertically
  },
  itemCoinsText: {
    color: '#1F1F1F', // Black for readability
    fontSize: 14,
    fontWeight: '600',
  },
  itemArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Force white background
    paddingLeft: 8,
  },
  itemArrowText: {
    color: '#4A90E2', // Soft blue
    fontSize: 20,
    fontWeight: '600',
  },
});
