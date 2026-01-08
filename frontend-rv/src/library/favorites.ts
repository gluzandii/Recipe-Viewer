// Utility functions for managing favorite recipes in localStorage

const FAVORITES_KEY = 'favoriteRecipes';

export function getFavorites(): Set<number> {
    try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (stored) {
            return new Set(JSON.parse(stored));
        }
    } catch (error) {
        console.error('Error reading favorites from localStorage:', error);
    }
    return new Set();
}

export function saveFavorites(favorites: Set<number>): void {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
    }
}

export function toggleFavorite(recipeId: number): boolean {
    const favorites = getFavorites();
    if (favorites.has(recipeId)) {
        favorites.delete(recipeId);
        saveFavorites(favorites);
        return false;
    } else {
        favorites.add(recipeId);
        saveFavorites(favorites);
        return true;
    }
}

