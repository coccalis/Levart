export function getDailySeed() {
  const date = new Date();
  return (
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  );
}

export function seededShuffle(array, seed) {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(random(seed) * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
    seed++;
  }
  return shuffledArray;
}

function random(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function getDailySuggestedSearches(
  cityNames,
  hotelNames,
  activityTitles,
  venueTitles
) {
  const data = [
    ...cityNames.map((name) => ({ name, category: "city" })),
    ...hotelNames.map((name) => ({ name, category: "hotel" })),
    ...activityTitles.map((name) => ({ name, category: "activity" })),
    ...venueTitles.map((name) => ({ name, category: "venue" })),
  ];
  const seed = getDailySeed();
  const shuffledData = seededShuffle(data, seed);

  return shuffledData.slice(0, 10);
}
