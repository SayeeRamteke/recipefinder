import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const RECIPES = [
  {
    id: '1',
    name: 'Creamy Tomato Pasta',
    category: 'Italian',
    time: 25,
    rating: 4.8,
    servings: 2,
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800',
    description: 'A comforting pasta tossed in a creamy tomato sauce.',
    ingredients: [
      '200 g pasta',
      '2 tomatoes',
      '2 garlic cloves',
      '2 tbsp cream',
      '1 tbsp olive oil',
      'Salt and pepper',
    ],
    steps: [
      'Boil the pasta until tender.',
      'Heat oil and saute chopped garlic.',
      'Add chopped tomatoes and cook until soft.',
      'Mix in cream, salt and pepper.',
      'Add pasta, toss well and serve.',
    ],
  },
  {
    id: '2',
    name: 'Indian Vegetable Biryani',
    category: 'Indian',
    time: 40,
    rating: 4.9,
    servings: 3,
    image:
      'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800',
    description: 'Fragrant rice cooked with vegetables and aromatic spices.',
    ingredients: [
      '1 cup basmati rice',
      '1 cup mixed vegetables',
      '1 onion',
      'Biryani masala',
      'Ginger-garlic paste',
      'Salt and oil',
    ],
    steps: [
      'Wash and soak the rice.',
      'Saute sliced onion in oil.',
      'Add ginger-garlic paste and vegetables.',
      'Add spices, rice and the required water.',
      'Cover and cook until the rice is tender.',
    ],
  },
  {
    id: '3',
    name: 'Fresh Garden Salad',
    category: 'Healthy',
    time: 10,
    rating: 4.5,
    servings: 1,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    description: 'A refreshing bowl of crunchy vegetables and greens.',
    ingredients: [
      '1 cucumber',
      '2 tomatoes',
      'Lettuce',
      '1 lemon',
      'Olive oil',
      'Salt and pepper',
    ],
    steps: [
      'Wash all the vegetables.',
      'Chop the cucumber and tomatoes.',
      'Tear the lettuce into small pieces.',
      'Mix everything in a bowl.',
      'Add lemon juice, oil and seasoning.',
    ],
  },
  {
    id: '4',
    name: 'Classic Pancakes',
    category: 'Desserts',
    time: 20,
    rating: 4.7,
    servings: 2,
    image:
      'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800',
    description: 'Fluffy pancakes perfect for a relaxed breakfast.',
    ingredients: [
      '1 cup flour',
      '1 egg',
      '3/4 cup milk',
      '1 tbsp sugar',
      '1 tsp baking powder',
      'Butter',
    ],
    steps: [
      'Mix the flour, sugar and baking powder.',
      'Whisk the egg and milk separately.',
      'Combine the wet and dry ingredients.',
      'Pour batter into a lightly buttered pan.',
      'Flip when bubbles appear and cook the other side.',
    ],
  },
  {
    id: '5',
    name: 'Paneer Tikka Bowl',
    category: 'Indian',
    time: 30,
    rating: 4.7,
    servings: 2,
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',
    description: 'Spiced paneer with vegetables and a delicious marinade.',
    ingredients: [
      '200 g paneer',
      '1 capsicum',
      '1 onion',
      'Yogurt',
      'Tikka masala',
      'Lemon juice',
    ],
    steps: [
      'Mix yogurt, tikka masala and lemon juice.',
      'Coat paneer and vegetables in the marinade.',
      'Let the mixture rest for 10 minutes.',
      'Cook in a pan until lightly charred.',
      'Serve warm with your favourite accompaniment.',
    ],
  },
  {
    id: '6',
    name: 'Berry Breakfast Bowl',
    category: 'Healthy',
    time: 5,
    rating: 4.6,
    servings: 1,
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
    description: 'A colourful breakfast with fruit, yogurt and oats.',
    ingredients: [
      '1/2 cup oats',
      '1/2 cup yogurt',
      'Mixed berries',
      '1 banana',
      'Nuts or seeds',
    ],
    steps: [
      'Add yogurt to a bowl.',
      'Mix in the oats.',
      'Slice the banana and add the berries.',
      'Top with nuts or seeds.',
      'Serve immediately or chill briefly.',
    ],
  },
];

const CATEGORIES = [
  'All',
  'Indian',
  'Italian',
  'Healthy',
  'Desserts',
];

export default function App() {
  const [screen, setScreen] = useState('Home');
  const [previousScreen, setPreviousScreen] = useState('Home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(id) {
    setFavorites(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  }

  function openRecipe(recipe) {
    setSelectedRecipe(recipe);
    setPreviousScreen(screen);
    setScreen('Details');
  }

  function goBack() {
    setScreen(previousScreen);
  }

  const filteredRecipes = RECIPES.filter(recipe => {
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesCategory =
      category === 'All' || recipe.category === category;

    const matchesFavorite =
      screen !== 'Favorites' || favorites.includes(recipe.id);

    return matchesSearch && matchesCategory && matchesFavorite;
  });

  function renderRecipe({ item }) {
    const isFavorite = favorites.includes(item.id);

    return (
      <View style={styles.recipeCard}>
        <Pressable onPress={() => openRecipe(item)}>
          <Image source={{ uri: item.image }} style={styles.recipeImage} />
        </Pressable>

        <View style={styles.cardContent}>
          <View style={styles.cardHeading}>
            <Text style={styles.recipeName}>{item.name}</Text>

            <Pressable
              onPress={() => toggleFavorite(item.id)}
              accessibilityLabel={
                isFavorite ? 'Remove favourite' : 'Add favourite'
              }
            >
              <Text style={styles.heart}>
                {isFavorite ? '❤️' : '♡'}
              </Text>
            </Pressable>
          </View>

          <Text style={styles.meta}>
            {item.category}  ·  {item.time} min  ·  ⭐ {item.rating}
          </Text>

          <Pressable
            style={styles.viewButton}
            onPress={() => openRecipe(item)}
          >
            <Text style={styles.viewButtonText}>View Recipe →</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  function renderHome() {
    return (
      <>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>YOUR DAILY FOOD INSPIRATION</Text>
          <Text style={styles.heroTitle}>Find your next favourite meal.</Text>
          <Text style={styles.heroSubtitle}>
            Simple recipes. Delicious possibilities.
          </Text>
        </View>

        <TextInput
          style={styles.search}
          placeholder="🔍  Search recipes..."
          placeholderTextColor="#8A8A8A"
          value={search}
          onChangeText={setSearch}
        />

        <Text style={styles.sectionTitle}>Explore categories</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {CATEGORIES.map(item => (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              style={[
                styles.categoryChip,
                category === item && styles.selectedChip,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item && styles.selectedChipText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Discover recipes</Text>
          <Text style={styles.count}>{filteredRecipes.length} recipes</Text>
        </View>

        {filteredRecipes.length > 0 ? (
          <FlatList
            data={filteredRecipes}
            renderItem={renderRecipe}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.list}
          />
        ) : (
          <Text style={styles.empty}>
            No recipes found. Try another search!
          </Text>
        )}
      </>
    );
  }

  function renderFavorites() {
    return (
      <View style={styles.page}>
        <Text style={styles.pageTitle}>Your favourites ❤️</Text>
        <Text style={styles.pageSubtitle}>
          Recipes you've saved for later.
        </Text>

        {filteredRecipes.length > 0 ? (
          <FlatList
            data={filteredRecipes}
            renderItem={renderRecipe}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
        ) : (
          <Text style={styles.empty}>
            No favourites yet. Tap the heart on a recipe to save it!
          </Text>
        )}
      </View>
    );
  }

  function renderDetails() {
    if (!selectedRecipe) return null;

    const recipe = selectedRecipe;
    const isFavorite = favorites.includes(recipe.id);

    return (
      <View style={styles.page}>
        <Pressable onPress={goBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={{ uri: recipe.image }}
            style={styles.detailImage}
          />

          <Text style={styles.pageTitle}>{recipe.name}</Text>
          <Text style={styles.pageSubtitle}>{recipe.description}</Text>

          <Text style={styles.meta}>
            ⏱ {recipe.time} minutes   ·   ⭐ {recipe.rating}   ·   Serves{' '}
            {recipe.servings}
          </Text>

          <Pressable
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(recipe.id)}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? '❤️ Remove from Favourites' : '♡ Add to Favourites'}
            </Text>
          </Pressable>

          <Text style={styles.detailHeading}>Ingredients</Text>

          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>
              •  {ingredient}
            </Text>
          ))}

          <Text style={styles.detailHeading}>Cooking instructions</Text>

          {recipe.steps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}

          <View style={{ height: 24 }} />
        </ScrollView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFDF8" />

      <View style={styles.header}>
        <Text style={styles.logo}>🍋 Recipe Finder</Text>
        <Text style={styles.headerTagline}>COOK SOMETHING LOVELY</Text>
      </View>

      <View style={styles.content}>
        {screen === 'Home' && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderHome()}
          </ScrollView>
        )}

        {screen === 'Favorites' && renderFavorites()}

        {screen === 'Details' && renderDetails()}
      </View>

      {screen !== 'Details' && (
        <View style={styles.bottomNav}>
          <Pressable
            style={styles.navItem}
            onPress={() => setScreen('Home')}
          >
            <Text style={styles.navIcon}>⌂</Text>
            <Text
              style={[
                styles.navText,
                screen === 'Home' && styles.activeNavText,
              ]}
            >
              Explore
            </Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => {
              setCategory('All');
              setSearch('');
              setScreen('Favorites');
            }}
          >
            <Text style={styles.navIcon}>♡</Text>
            <Text
              style={[
                styles.navText,
                screen === 'Favorites' && styles.activeNavText,
              ]}
            >
              Favourites ({favorites.length})
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF8',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EDE5',
  },
  logo: {
    fontSize: 23,
    fontWeight: '800',
    color: '#264D3C',
  },
  headerTagline: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#88877D',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  hero: {
    backgroundColor: '#E5F0DF',
    margin: 16,
    padding: 22,
    borderRadius: 20,
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 1.4,
    color: '#53724F',
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: 29,
    fontWeight: '800',
    color: '#264D3C',
    marginTop: 12,
    lineHeight: 35,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#526B55',
    marginTop: 10,
  },
  search: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E8E4DA',
    fontSize: 14,
    color: '#24382E',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#24382E',
  },
  categoryScroll: {
    marginTop: 12,
    marginBottom: 24,
    paddingLeft: 16,
    flexGrow: 0,
  },
  categoryChip: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    marginRight: 9,
    borderRadius: 22,
    backgroundColor: '#F0EEE7',
  },
  selectedChip: {
    backgroundColor: '#315D46',
  },
  categoryText: {
    fontSize: 13,
    color: '#4B514A',
    fontWeight: '600',
  },
  selectedChipText: {
    color: '#FFFFFF',
  },
  sectionRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  count: {
    fontSize: 12,
    color: '#88877D',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#F0EDE5',
  },
  recipeImage: {
    width: '100%',
    height: 190,
    backgroundColor: '#EAE7DE',
  },
  cardContent: {
    padding: 14,
  },
  cardHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recipeName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    color: '#24382E',
  },
  heart: {
    fontSize: 27,
    color: '#D45D50',
    paddingLeft: 8,
  },
  meta: {
    fontSize: 12,
    color: '#77786F',
    marginTop: 8,
    lineHeight: 19,
  },
  viewButton: {
    backgroundColor: '#E5F0DF',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  viewButtonText: {
    color: '#264D3C',
    fontSize: 13,
    fontWeight: '700',
  },
  page: {
    flex: 1,
    padding: 16,
  },
  pageTitle: {
    fontSize: 25,
    lineHeight: 32,
    fontWeight: '800',
    color: '#24382E',
    marginTop: 12,
  },
  pageSubtitle: {
    color: '#77786F',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 10,
  },
  empty: {
    paddingHorizontal: 22,
    paddingVertical: 35,
    color: '#77786F',
    textAlign: 'center',
    lineHeight: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingRight: 15,
    marginBottom: 8,
  },
  backText: {
    color: '#315D46',
    fontWeight: '700',
    fontSize: 15,
  },
  detailImage: {
    width: '100%',
    height: 235,
    borderRadius: 18,
    backgroundColor: '#EAE7DE',
  },
  favoriteButton: {
    marginTop: 14,
    marginBottom: 10,
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#E5F0DF',
    borderRadius: 12,
  },
  favoriteButtonText: {
    color: '#264D3C',
    fontWeight: '700',
    fontSize: 14,
  },
  detailHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#24382E',
    marginTop: 22,
    marginBottom: 12,
  },
  ingredient: {
    fontSize: 15,
    lineHeight: 26,
    color: '#4E544D',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E5F0DF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#264D3C',
    fontWeight: '800',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: '#4E544D',
    paddingTop: 3,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0EDE5',
    paddingTop: 10,
    paddingBottom: 12,
  },
  navItem: {
    alignItems: 'center',
    minWidth: 100,
  },
  navIcon: {
    fontSize: 24,
    color: '#315D46',
  },
  navText: {
    fontSize: 12,
    color: '#88877D',
    marginTop: 3,
  },
  activeNavText: {
    color: '#264D3C',
    fontWeight: '800',
  },
});