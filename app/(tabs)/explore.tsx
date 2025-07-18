import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');

// Fake data for stories
const fakeStories = [
  {
    id: '1',
    name: 'Marie',
    avatar: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=M',
    hasStory: true
  },
  {
    id: '2',
    name: 'Thomas',
    avatar: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=T',
    hasStory: true
  },
  {
    id: '3',
    name: 'Sophie',
    avatar: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=S',
    hasStory: true
  },
  {
    id: '4',
    name: 'Antoine',
    avatar: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=A',
    hasStory: true
  },
  {
    id: '5',
    name: 'Claire',
    avatar: 'https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=C',
    hasStory: true
  }
];

// Fake data for items (different from home page)
const allItems = [
  {
    id: '5',
    title: 'Acoustic Guitar',
    description: 'Guitar in excellent condition, new strings',
    coins: 15,
    category: 'Music',
    location: 'Uccle',
    condition: 'Perfect condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Guitar'
  },
  {
    id: '6',
    title: 'Desk Lamp',
    description: 'Modern LED lamp, very practical',
    coins: 6,
    category: 'Home',
    location: 'Woluwe',
    condition: 'Good condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Lamp'
  },
  {
    id: '7',
    title: 'Eastpak Backpack',
    description: 'Backpack used for classes, spacious',
    coins: 4,
    category: 'Accessories',
    location: 'Etterbeek',
    condition: 'Average condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Bag'
  },
  {
    id: '8',
    title: 'Board Game',
    description: 'Complete Monopoly, perfect for family',
    coins: 3,
    category: 'Games',
    location: 'Brussels',
    condition: 'Perfect condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Game'
  }
];

const forYouItems = [
  {
    id: '9',
    title: 'Nike Shoes',
    description: 'Sport sneakers size 42',
    coins: 12,
    category: 'Shoes',
    location: 'Ixelles',
    condition: 'Good condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Nike'
  },
  {
    id: '10',
    title: 'Cooking Book',
    description: 'Authentic Italian recipes',
    coins: 5,
    category: 'Books',
    location: 'Schaerbeek',
    condition: 'Perfect condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Cook'
  }
];

const followingItems = [
  {
    id: '11',
    title: 'City Bike',
    description: 'Dutch bike, very comfortable',
    coins: 25,
    category: 'Transport',
    location: 'Anderlecht',
    condition: 'Good condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Bike'
  },
  {
    id: '12',
    title: 'PS4 Console',
    description: 'PlayStation 4 with 2 controllers',
    coins: 20,
    category: 'Gaming',
    location: 'Forest',
    condition: 'Perfect condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=PS4'
  }
];

export default function ExploreScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'All':
        return allItems;
      case 'For You':
        return forYouItems;
      case 'Following':
        return followingItems;
      default:
        return allItems;
    }
  };

  const handleItemPress = (item: any) => {
    router.push({
      pathname: './detailsItem',
      params: { id: item.id }
    });
  };

  const handleStoryPress = (story: any) => {
    console.log('Story pressed:', story.name);
    // Later: navigation to story
  };

  const handleYourStoryPress = () => {
    console.log('Add your story');
    // Later: navigation to add story
  };

  const handleSearchPress = () => {
    router.push('./search');
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.mainTitle}>Explore</ThemedText>
      </ThemedView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stories Section */}
        <ThemedView style={styles.storiesSection}>
          <ThemedText type="subtitle" style={styles.storiesTitle}>Stories</ThemedText>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.storiesScrollView}
            contentContainerStyle={styles.storiesContainer}
          >
            {/* Your Story */}
            <TouchableOpacity style={styles.storyItem} onPress={handleYourStoryPress}>
              <ThemedView style={styles.yourStoryAvatar}>
                <ThemedText style={styles.plusIcon}>+</ThemedText>
              </ThemedView>
              <ThemedText style={styles.storyName}>Your Story</ThemedText>
            </TouchableOpacity>

            {/* Other Stories */}
            {fakeStories.map((story) => (
              <TouchableOpacity 
                key={story.id} 
                style={styles.storyItem}
                onPress={() => handleStoryPress(story)}
              >
                <ThemedView style={styles.storyAvatarContainer}>
                  <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
                </ThemedView>
                <ThemedText style={styles.storyName}>{story.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ThemedView>

        {/* Search Section */}
        <ThemedView style={styles.searchSection}>
          <TouchableOpacity style={styles.searchBar} onPress={handleSearchPress}>
            <ThemedText style={styles.searchIcon}>🔍</ThemedText>
            <ThemedText style={styles.searchText}>Search items...</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Tabs */}
        <ThemedView style={styles.tabsSection}>
          <ThemedView style={styles.tabsContainer}>
            {['All', 'For You', 'Following'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <ThemedText style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Items list */}
        <ThemedView style={styles.itemsSection}>
          {getCurrentItems().map((item) => (
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
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
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
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  storiesSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
  },
  storiesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 20,
    marginBottom: 12,
  },
  storiesScrollView: {
    backgroundColor: '#FFFFFF',
  },
  storiesContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#FFFFFF',
  },
  yourStoryAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginBottom: 6,
  },
  plusIcon: {
    fontSize: 24,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  storyAvatarContainer: {
    backgroundColor: '#FFFFFF',
    padding: 2,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#4A90E2',
    marginBottom: 6,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyName: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
    maxWidth: 70,
  },
  tabsSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#4A90E2',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  itemsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
    backgroundColor: '#FFFFFF',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  itemCondition: {
    fontSize: 12,
    color: '#4A90E2',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  itemLocation: {
    fontSize: 12,
    color: '#666666',
  },
  itemCoins: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF', // Forcer le fond blanc
  },
  itemCoinsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginRight: 4,
  },
  itemCoinIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCoinText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B8860B', // Or foncé pour le contraste
    textAlign: 'center',
    lineHeight: 18, // Pour centrer verticalement
  },
  itemArrow: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  itemArrowText: {
    fontSize: 18,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});
