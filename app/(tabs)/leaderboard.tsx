import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Fake data for leaderboard
const generateFakeUsers = (count: number) => {
  const firstNames = ['Emma', 'Liam', 'Sophia', 'Noah', 'Olivia', 'William', 'Ava', 'James', 'Isabella', 'Oliver', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Mia', 'Henry', 'Harper', 'Alexander', 'Evelyn', 'Mason'];
  const lastNames = ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia', 'David', 'Bertrand', 'Roux', 'Vincent', 'Fournier', 'Morel'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: String(index + 1),
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    donations: Math.floor(Math.random() * 500) + 50,
    avatar: `https://via.placeholder.com/50x50/4A90E2/FFFFFF?text=${firstNames[Math.floor(Math.random() * firstNames.length)][0]}`,
    rank: index + 1
  })).sort((a, b) => b.donations - a.donations).map((user, index) => ({ ...user, rank: index + 1 }));
};

const worldwideUsers = generateFakeUsers(100);
const belgiumUsers = generateFakeUsers(50);
const cityUsers = generateFakeUsers(30);

export default function LeaderboardScreen() {
  const [activeRegion, setActiveRegion] = useState('Worldwide');
  const [activePeriod, setActivePeriod] = useState('All');

  const getCurrentUsers = () => {
    let users;
    switch (activeRegion) {
      case 'Worldwide':
        users = worldwideUsers;
        break;
      case 'Belgium':
        users = belgiumUsers;
        break;
      case 'Brussels':
        users = cityUsers;
        break;
      default:
        users = worldwideUsers;
    }

    // To simulate temporal filters, we can adjust donations
    if (activePeriod === 'This Month') {
      return users.map(user => ({ ...user, donations: Math.floor(user.donations * 0.3) }))
                  .sort((a, b) => b.donations - a.donations)
                  .map((user, index) => ({ ...user, rank: index + 1 }));
    } else if (activePeriod === 'This Week') {
      return users.map(user => ({ ...user, donations: Math.floor(user.donations * 0.1) }))
                  .sort((a, b) => b.donations - a.donations)
                  .map((user, index) => ({ ...user, rank: index + 1 }));
    }
    
    return users;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return styles.goldRank;
    if (rank === 2) return styles.silverRank;
    if (rank === 3) return styles.bronzeRank;
    return styles.defaultRank;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}`;
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.mainTitle}>Best Givers</ThemedText>
      </ThemedView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Region tabs */}
        <ThemedView style={styles.regionTabsSection}>
          <ThemedView style={styles.tabsContainer}>
            {['Worldwide', 'Belgium', 'Brussels'].map((region) => (
              <TouchableOpacity
                key={region}
                style={[styles.tab, activeRegion === region && styles.activeTab]}
                onPress={() => setActiveRegion(region)}
              >
                <ThemedText style={[styles.tabText, activeRegion === region && styles.activeTabText]}>
                  {region}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Period tabs */}
        <ThemedView style={styles.periodTabsSection}>
          <ThemedView style={styles.tabsContainer}>
            {['All', 'This Month', 'This Week'].map((period) => (
              <TouchableOpacity
                key={period}
                style={[styles.periodTab, activePeriod === period && styles.activePeriodTab]}
                onPress={() => setActivePeriod(period)}
              >
                <ThemedText style={[styles.periodTabText, activePeriod === period && styles.activePeriodTabText]}>
                  {period}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Leaderboard */}
        <ThemedView style={styles.leaderboardSection}>
          {getCurrentUsers().slice(0, 100).map((user, index) => (
            <ThemedView key={user.id} style={styles.userCard}>
              <ThemedView style={[styles.rankContainer, getRankStyle(user.rank)]}>
                <ThemedText style={styles.rankText}>
                  {getRankIcon(user.rank)}
                </ThemedText>
              </ThemedView>

              <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
              
              <ThemedView style={styles.userInfo}>
                <ThemedText style={styles.userName}>
                  {user.firstName} {user.lastName}
                </ThemedText>
                <ThemedView style={styles.donationsContainer}>
                  <ThemedText style={styles.donationsText}>
                    {user.donations} donations
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  regionTabsSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  periodTabsSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
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
  periodTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 15,
  },
  activePeriodTab: {
    backgroundColor: '#FFD700',
  },
  periodTabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666666',
  },
  activePeriodTabText: {
    color: '#000000',
  },
  leaderboardSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  rankContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  goldRank: {
    backgroundColor: '#FFD700',
  },
  silverRank: {
    backgroundColor: '#C0C0C0',
  },
  bronzeRank: {
    backgroundColor: '#CD7F32',
  },
  defaultRank: {
    backgroundColor: '#F0F0F0',
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  donationsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  donationsText: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
});
