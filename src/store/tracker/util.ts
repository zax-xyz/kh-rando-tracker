import { Items } from "./state";

/** Find all numbers used in the state and preload the images for them */
export const preloadNums = (items: Items) =>
  Object.values(items)
    .flatMap(item => item.numbers)
    .filter(num => num !== undefined)
    .forEach(num => {
      // Apparently creating an image object like this loads it even if it's not added to the page
      const image = new Image();
      image.src = `/img/progression/numbers/${num}.webp`;
    });
