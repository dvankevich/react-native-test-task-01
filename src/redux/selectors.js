export const selectCampers = (state) => state.campers.items;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectFilters = (state) => state.filters;
export const selectFavorites = (state) => state.favorites.items;

export const selectIsFavorite = (camperId) => (state) =>
  state.favorites.items.some((fav) => fav.id === camperId);