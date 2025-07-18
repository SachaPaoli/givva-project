import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

// Fake data for users
const fakeUsers = {
  '1': {
    name: 'Marie Dupont',
    avatar: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=MD',
    rating: 8.5,
    reviewCount: 23
  },
  '2': {
    name: 'Thomas Martin',
    avatar: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=TM',
    rating: 9.2,
    reviewCount: 45
  },
  '3': {
    name: 'Sophie Laurent',
    avatar: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=SL',
    rating: 7.8,
    reviewCount: 12
  },
  '4': {
    name: 'Antoine Dubois',
    avatar: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=AD',
    rating: 9.0,
    reviewCount: 38
  }
};

// Fake data for items (from all pages)
const fakeItems = [
  // Items from home page
  {
    id: '1',
    title: 'Sony Bluetooth Headphones',
    description: 'In very good condition, battery holds well. These headphones have been used for about 6 months only. They work perfectly and the sound quality is excellent. Comes with charging cable and original box.',
    coins: 8,
    category: 'Electronics',
    location: 'Brussels',
    condition: 'Perfect condition',
    distance: '2.3 km',
    userId: '1',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=Sony+Headphones'
  },
  {
    id: '2',
    title: 'Nike Sweater Size M',
    description: 'Sports sweater, perfect for winter. Very little worn, like new. Soft and warm material, ideal for sports or casual outings.',
    coins: 5,
    category: 'Clothing',
    location: 'Ixelles',
    condition: 'Good condition',
    distance: '1.8 km',
    userId: '2',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=Nike+Sweater'
  },
  {
    id: '3',
    title: '"Clean Code" Book',
    description: 'Programming book, very useful for developers. A must-have for any self-respecting developer. Excellent condition, all pages are intact.',
    coins: 3,
    category: 'Books',
    location: 'Schaerbeek',
    condition: 'Perfect condition',
    distance: '3.1 km',
    userId: '3',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=Clean+Code'
  },
  {
    id: '4',
    title: 'Green Plant',
    description: 'Beautiful indoor plant, easy to maintain. Perfect for decorating your living room or office. Comes with its decorative pot.',
    coins: 2,
    category: 'Home',
    location: 'Brussels',
    condition: 'Average condition',
    distance: '0.9 km',
    userId: '4',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=Plant'
  },
  // Items from explore page
  {
    id: '5',
    title: 'Acoustic Guitar',
    description: 'Guitar in excellent condition, new strings. Perfect for learning or performing. Comes with pick and carrying case.',
    coins: 15,
    category: 'Music',
    location: 'Uccle',
    condition: 'Perfect condition',
    distance: '4.2 km',
    userId: '1',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=Guitar'
  },
  {
    id: '6',
    title: 'Desk Lamp',
    description: 'Modern LED lamp, very practical. Perfect lighting for work or reading. Adjustable arm and brightness.',
    coins: 6,
    category: 'Home',
    location: 'Woluwe',
    condition: 'Good condition',
    distance: '5.7 km',
    userId: '2',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=Lamp'
  },
  {
    id: '7',
    title: 'Eastpak Backpack',
    description: 'Backpack used for classes, spacious. Great for students or daily use. Multiple compartments and durable material.',
    coins: 4,
    category: 'Accessories',
    location: 'Etterbeek',
    condition: 'Average condition',
    distance: '2.9 km',
    userId: '3',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=Bag'
  },
  {
    id: '8',
    title: 'Board Game',
    description: 'Complete Monopoly, perfect for family. All pieces included, box in good condition. Great for family game nights.',
    coins: 3,
    category: 'Games',
    location: 'Brussels',
    condition: 'Perfect condition',
    distance: '1.5 km',
    userId: '4',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=Game'
  },
  {
    id: '9',
    title: 'Nike Shoes',
    description: 'Sport sneakers size 42. Barely worn, excellent condition. Perfect for running or casual wear.',
    coins: 12,
    category: 'Shoes',
    location: 'Ixelles',
    condition: 'Good condition',
    distance: '1.8 km',
    userId: '1',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=Nike'
  },
  {
    id: '10',
    title: 'Cooking Book',
    description: 'Authentic Italian recipes. Learn to cook traditional Italian dishes. Beautiful illustrations and easy-to-follow recipes.',
    coins: 5,
    category: 'Books',
    location: 'Schaerbeek',
    condition: 'Perfect condition',
    distance: '3.1 km',
    userId: '2',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=Cook'
  },
  {
    id: '11',
    title: 'City Bike',
    description: 'Dutch bike, very comfortable. Perfect for city commuting. Recently serviced, rides smoothly.',
    coins: 25,
    category: 'Transport',
    location: 'Anderlecht',
    condition: 'Good condition',
    distance: '6.8 km',
    userId: '3',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=Bike'
  },
  {
    id: '12',
    title: 'PS4 Console',
    description: 'PlayStation 4 with 2 controllers. Works perfectly, comes with several games. Great for gaming enthusiasts.',
    coins: 20,
    category: 'Gaming',
    location: 'Forest',
    condition: 'Perfect condition',
    distance: '4.5 km',
    userId: '4',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=PS4'
  },
  // Items from search page
  {
    id: '13',
    title: 'MacBook Pro 2020',
    description: 'Laptop in excellent condition, barely used. Perfect for work or studies. Fast processor and excellent battery life.',
    coins: 45,
    category: 'Electronics',
    location: 'Brussels',
    condition: 'Perfect condition',
    distance: '2.1 km',
    userId: '1',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=MacBook'
  },
  {
    id: '14',
    title: 'Designer Jacket',
    description: 'High-quality winter jacket, size L. Warm and stylish, perfect for cold weather. Brand name item in excellent condition.',
    coins: 25,
    category: 'Clothing',
    location: 'Antwerp',
    condition: 'Good condition',
    distance: '45.2 km',
    userId: '2',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=Jacket'
  },
  {
    id: '15',
    title: 'JavaScript Guide',
    description: 'Complete programming guide with examples. Perfect for learning JavaScript. Includes practical exercises and real-world examples.',
    coins: 8,
    category: 'Books',
    location: 'Ghent',
    condition: 'Perfect condition',
    distance: '55.3 km',
    userId: '3',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=JS+Book'
  },
  {
    id: '16',
    title: 'Coffee Machine',
    description: 'Automatic espresso maker, works perfectly. Makes delicious coffee every time. Recently cleaned and maintained.',
    coins: 30,
    category: 'Kitchen',
    location: 'Leuven',
    condition: 'Good condition',
    distance: '25.7 km',
    userId: '4',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=Coffee'
  },
  {
    id: '17',
    title: 'Tennis Racket',
    description: 'Professional racket, great for beginners. Good balance and comfortable grip. Perfect for starting tennis or improving your game.',
    coins: 15,
    category: 'Sports',
    location: 'Brussels',
    condition: 'Good condition',
    distance: '3.2 km',
    userId: '1',
    image: 'https://via.placeholder.com/400x300/6FCF97/FFFFFF?text=Tennis'
  }
];

export default function ItemDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // Find the corresponding item
  const item = fakeItems.find(item => item.id === id);
  const user = item ? fakeUsers[item.userId as keyof typeof fakeUsers] : null;

  if (!item || !user) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Item not found</ThemedText>
      </ThemedView>
    );
  }

  const handleBackPress = () => {
    router.back();
  };

  const handleMessagePress = () => {
    console.log('Message button pressed for item:', item.title);
    // Later: navigation to message page
  };

  return (
    <ThemedView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <ThemedText style={styles.backButtonText}>{'<'}</ThemedText>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main image */}
        <Image source={{ uri: item.image }} style={styles.mainImage} />

        {/* User information */}
        <ThemedView style={styles.userSection}>
          <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
          <ThemedView style={styles.userInfo}>
            <ThemedText style={styles.userName}>{user.name}</ThemedText>
            <ThemedView style={styles.ratingContainer}>
              <ThemedText style={styles.rating}>{user.rating}/10</ThemedText>
              <ThemedText style={styles.reviewCount}>({user.reviewCount} reviews)</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Item information */}
        <ThemedView style={styles.itemSection}>
          {/* Title and coins */}
          <ThemedView style={styles.titleRow}>
            <ThemedText style={styles.itemTitle}>{item.title}</ThemedText>
            <ThemedView style={styles.coinsContainer}>
              <ThemedText style={styles.coinsText}>{item.coins}</ThemedText>
              <ThemedView style={styles.coinIcon}>
                <ThemedText style={styles.coinText}>G</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          {/* Condition and distance */}
          <ThemedView style={styles.metaRow}>
            <ThemedText style={styles.condition}>Condition: {item.condition}</ThemedText>
            <ThemedText style={styles.distance}>📍 {item.distance}</ThemedText>
          </ThemedView>

          {/* Description */}
          <ThemedView style={styles.descriptionSection}>
            <ThemedText style={styles.descriptionTitle}>Description</ThemedText>
            <ThemedText style={styles.description}>{item.description}</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Space for floating button */}
        <ThemedView style={styles.bottomSpacer} />
      </ScrollView>

      {/* Floating message button */}
      <TouchableOpacity style={styles.messageButton} onPress={handleMessagePress}>
        <ThemedText style={styles.messageButtonText}>💬 Send message</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  backButtonText: {
    color: '#4A90E2',
    fontSize: 20,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  mainImage: {
    width: width,
    height: 300,
    backgroundColor: '#E5E7EB',
  },
  userSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Forcer le fond blanc
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF', // Forcer le fond blanc
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
  reviewCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  itemSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
    backgroundColor: '#FFFFFF', // Forcer le fond blanc
  },
  itemTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    color: '#1F1F1F',
    marginRight: 15,
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
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinText: {
    color: '#B8860B',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  coinsText: {
    color: '#1F1F1F',
    fontWeight: '600',
    fontSize: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF', // Forcer le fond blanc
  },
  condition: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  distance: {
    fontSize: 14,
    color: '#6B7280',
  },
  descriptionSection: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 20,
    backgroundColor: '#FFFFFF', // Forcer le fond blanc
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
  },
  bottomSpacer: {
    height: 100, // Espace pour le bouton flottant
    backgroundColor: '#F9FAFB', // Fond gris léger comme le reste
  },
  messageButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#4A90E2', // Fond bleu
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  messageButtonText: {
    color: '#FFFFFF', // Texte blanc
    fontSize: 16,
    fontWeight: '600',
  },
});
