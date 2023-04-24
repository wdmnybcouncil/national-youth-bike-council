// Format data from a string
const formatDate = (dateString) => {
  const dateParts = dateString.split('-');
  const newDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return newDate.toLocaleDateString('en-us', dateFormatOptions);
}

// Get random item from the array
const getRandomArrayItem = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Get Twitter post link with custom title and content
const getTwitterHref = (postTitle, postContentUrl) => {
  const tweetContent = `${postTitle} ${postContentUrl} @National_ybc #nybc #national_youth_bike_council`;
  const urlEncodedMsg = encodeURIComponent(tweetContent);
  return `https://twitter.com/intent/tweet?text=${urlEncodedMsg}`;
}

// Get Facebook post link with custom title and content
const getFacebookHref = (postContentUrl) => {
  const facebookPostContent = `${postContentUrl}`;
  const urlEncodedMsg = encodeURIComponent(facebookPostContent);
  return `https://www.facebook.com/sharer/sharer.php?u=${urlEncodedMsg}`;
}

export {
  formatDate,
  getRandomArrayItem,
  getTwitterHref,
  getFacebookHref,
}