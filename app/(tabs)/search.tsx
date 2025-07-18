import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Categories for donations
const categories = [
  'All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Music', 
  'Games', 'Shoes', 'Accessories', 'Transport', 'Tools', 'Baby', 'Beauty',
  'Furniture', 'Kitchen', 'Garden', 'Art', 'Collectibles', 'Other'
];

// Condition filters
const conditions = ['All', 'Perfect condition', 'Good condition', 'Average condition', 'Poor condition'];

// Distance filters
const distances = ['All', 'Under 1 km', 'Under 5 km', 'Under 10 km', 'Under 20 km', 'Any distance'];

// Coin range filters
const coinRanges = ['All', '1-5 coins', '6-10 coins', '11-20 coins', '21-50 coins', '50+ coins'];

// Fake search results
const searchResults = [
  {
    id: '13',
    title: 'MacBook Pro 2020',
    description: 'Laptop in excellent condition, barely used',
    coins: 45,
    category: 'Electronics',
    location: 'Brussels',
    condition: 'Perfect condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=MacBook'
  },
  {
    id: '14',
    title: 'Designer Jacket',
    description: 'High-quality winter jacket, size L',
    coins: 25,
    category: 'Clothing',
    location: 'Antwerp',
    condition: 'Good condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Jacket'
  },
  {
    id: '15',
    title: 'JavaScript Guide',
    description: 'Complete programming guide with examples',
    coins: 8,
    category: 'Books',
    location: 'Ghent',
    condition: 'Perfect condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=JS+Book'
  },
  {
    id: '16',
    title: 'Coffee Machine',
    description: 'Automatic espresso maker, works perfectly',
    coins: 30,
    category: 'Kitchen',
    location: 'Leuven',
    condition: 'Good condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Coffee'
  },
  {
    id: '17',
    title: 'Tennis Racket',
    description: 'Professional racket, great for beginners',
    coins: 15,
    category: 'Sports',
    location: 'Brussels',
    condition: 'Good condition',
    image: 'https://via.placeholder.com/150x150/6FCF97/FFFFFF?text=Tennis'
  }
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedDistance, setSelectedDistance] = useState('All');
  const [selectedCoinRange, setSelectedCoinRange] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const handleBackPress = () => {
    router.back();
  };

  const handleItemPress = (item: any) => {
    router.push({
      pathname: './detailsItem',
      params: { id: item.id }
    });
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedCondition('All');
    setSelectedDistance('All');
    setSelectedCoinRange('All');
    setSearchQuery('');
  };

  const getFilteredResults = () => {
    return searchResults.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesCondition = selectedCondition === 'All' || item.condition === selectedCondition;
      
      return matchesSearch && matchesCategory && matchesCondition;
    });
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ThemedText style={styles.backButtonText}>{'<'}</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>Search</ThemedText>
        <ThemedView style={styles.placeholder} />
      </ThemedView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <ThemedView style={styles.searchSection}>
          <ThemedView style={styles.searchBar}>
            <ThemedText style={styles.searchIcon}>🔍</ThemedText>
            <TextInput
              style={styles.searchInput}
              placeholder="Search items..."
              placeholderTextColor="#999999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </ThemedView>
        </ThemedView>

        {/* Filters Toggle */}
        <ThemedView style={styles.filtersToggleSection}>
          <TouchableOpacity
            style={styles.filtersToggle}
            onPress={() => setShowFilters(!showFilters)}
          >
            <ThemedText style={styles.filtersToggleText}>
              {showFilters ? 'Hide Filters' : 'Show Filters'} 🔽
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <ThemedText style={styles.clearButtonText}>Clear All</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Filters */}
        {showFilters && (
          <ThemedView style={styles.filtersSection}>
            {/* Categories */}
            <ThemedView style={styles.filterGroup}>
              <ThemedText style={styles.filterTitle}>Categories</ThemedText>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.filterScrollView}
                contentContainerStyle={styles.filterContainer}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.filterChip,
                      selectedCategory === category && styles.selectedFilterChip
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <ThemedText
                      style={[
                        styles.filterChipText,
                        selectedCategory === category && styles.selectedFilterChipText
                      ]}
                    >
                      {category}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </ThemedView>

            {/* Condition */}
            <ThemedView style={styles.filterGroup}>
              <ThemedText style={styles.filterTitle}>Condition</ThemedText>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.filterScrollView}
                contentContainerStyle={styles.filterContainer}
              >
                {conditions.map((condition) => (
                  <TouchableOpacity
                    key={condition}
                    style={[
                      styles.filterChip,
                      selectedCondition === condition && styles.selectedFilterChip
                    ]}
                    onPress={() => setSelectedCondition(condition)}
                  >
                    <ThemedText
                      style={[
                        styles.filterChipText,
                        selectedCondition === condition && styles.selectedFilterChipText
                      ]}
                    >
                      {condition}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </ThemedView>

            {/* Distance */}
            <ThemedView style={styles.filterGroup}>
              <ThemedText style={styles.filterTitle}>Distance</ThemedText>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.filterScrollView}
                contentContainerStyle={styles.filterContainer}
              >
                {distances.map((distance) => (
                  <TouchableOpacity
                    key={distance}
                    style={[
                      styles.filterChip,
                      selectedDistance === distance && styles.selectedFilterChip
                    ]}
                    onPress={() => setSelectedDistance(distance)}
                  >
                    <ThemedText
                      style={[
                        styles.filterChipText,
                        selectedDistance === distance && styles.selectedFilterChipText
                      ]}
                    >
                      {distance}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </ThemedView>

            {/* Coin Range */}
            <ThemedView style={styles.filterGroup}>
              <ThemedText style={styles.filterTitle}>Coin Range</ThemedText>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.filterScrollView}
                contentContainerStyle={styles.filterContainer}
              >
                {coinRanges.map((range) => (
                  <TouchableOpacity
                    key={range}
                    style={[
                      styles.filterChip,
                      selectedCoinRange === range && styles.selectedFilterChip
                    ]}
                    onPress={() => setSelectedCoinRange(range)}
                  >
                    <ThemedText
                      style={[
                        styles.filterChipText,
                        selectedCoinRange === range && styles.selectedFilterChipText
                      ]}
                    >
                      {range}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </ThemedView>
          </ThemedView>
        )}

        {/* Results */}
        <ThemedView style={styles.resultsSection}>
          <ThemedText style={styles.resultsTitle}>
            {getFilteredResults().length} results found
          </ThemedText>
          
          {getFilteredResults().map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.resultCard}
              onPress={() => handleItemPress(item)}
            >
              <Image source={{ uri: item.image }} style={styles.resultImage} />
              
              <ThemedView style={styles.resultInfo}>
                <ThemedText style={styles.resultTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.resultDescription} numberOfLines={2}>
                  {item.description}
                </ThemedText>
                <ThemedText style={styles.resultCondition}>{item.condition}</ThemedText>
                <ThemedView style={styles.resultFooter}>
                  <ThemedText style={styles.resultLocation}>📍 {item.location}</ThemedText>
                  <ThemedView style={styles.resultCoins}>
                    <ThemedText style={styles.resultCoinsText}>{item.coins}</ThemedText>
                    <ThemedView style={styles.resultCoinIcon}>
                      <ThemedText style={styles.resultCoinText}>G</ThemedText>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
              
              <ThemedView style={styles.resultArrow}>
                <ThemedText style={styles.resultArrowText}>{'>'}</ThemedText>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  filtersToggleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  filtersToggle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
  },
  filtersToggleText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFE5E5',
    borderRadius: 20,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#E53E3E',
    fontWeight: '500',
  },
  filtersSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterGroup: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  filterScrollView: {
    backgroundColor: '#FFFFFF',
  },
  filterContainer: {
    paddingRight: 20,
    backgroundColor: '#FFFFFF',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    marginRight: 8,
  },
  selectedFilterChip: {
    backgroundColor: '#4A90E2',
  },
  filterChipText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  selectedFilterChipText: {
    color: '#FFFFFF',
  },
  resultsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 20,
  },
  resultImageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resultInfo: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  resultCondition: {
    fontSize: 12,
    color: '#4A90E2',
    marginBottom: 8,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  resultLocation: {
    fontSize: 12,
    color: '#666666',
  },
  resultCoins: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
  },
  resultCoinsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  resultCoinIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultCoinText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B8860B',
    textAlign: 'center',
    lineHeight: 18,
  },
  resultArrow: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingLeft: 8,
  },
  resultArrowText: {
    fontSize: 18,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});
