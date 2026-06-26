function getCategory(text) {
  const lower = text.toLowerCase();

  if (
    lower.includes("pizza") ||
    lower.includes("burger") ||
    lower.includes("swiggy") ||
    lower.includes("zomato") ||
    lower.includes("dominos") ||
    lower.includes("restaurant") ||
    lower.includes("burger king") ||
    lower.includes("cheesecake") ||
    lower.includes("fast food") ||
    lower.includes("coffee")
  ) return "Food & Dining";

  if (
    lower.includes("netflix") ||
    lower.includes("movie") ||
    lower.includes("jio hotstar") ||
    lower.includes("spotify premium")
  ) return "Entertainment";

  if (
    lower.includes("uber") ||
    lower.includes("ola") ||
    lower.includes("metro") ||
    lower.includes("cab") ||
    lower.includes("train") ||
    lower.includes("flight") ||
    lower.includes("bus") ||
    lower.includes("taxi") ||
    lower.includes("petrol") ||
    lower.includes("diesel")
  ) return "Transportation";

  if (
    lower.includes("lip balm") ||
    lower.includes("lip stick") ||
    lower.includes("face wash") ||
    lower.includes("perfume") ||
    lower.includes("kajal") ||
    lower.includes("mascara") ||
    lower.includes("moistrisor") ||
    lower.includes("foundation") ||
    lower.includes("makeup")
  ) return "Personal Care";

  if (
    lower.includes("shirt") ||
    lower.includes("jeans") ||
    lower.includes("shoes") ||
    lower.includes("jacket") ||
    lower.includes("kurta") ||
    lower.includes("dress") ||
    lower.includes("myntra") ||
    lower.includes("zara") ||
    lower.includes("h&m")
  ) return "Shopping";

  if (
    lower.includes("milk") ||
    lower.includes("bread") ||
    lower.includes("rice") ||
    lower.includes("vegetables") ||
    lower.includes("fruits") ||
    lower.includes("grocery") ||
    lower.includes("bigbasket") ||
    lower.includes("blinkit") ||
    lower.includes("zepto")
  ) return "Bills & Utilities";

  if (
    lower.includes("salon") ||
    lower.includes("spa") ||
    lower.includes("haircut") ||
    lower.includes("makeup") ||
    lower.includes("shampoo") ||
    lower.includes("soap") ||
    lower.includes("skincare") ||
    lower.includes("gym")
  ) return "Health & Fitness";

  if (
  lower.includes("flight") ||
  lower.includes("train") ||
  lower.includes("bus ticket") ||
  lower.includes("hotel") ||
  lower.includes("airbnb") ||
  lower.includes("trip") ||
  lower.includes("vacation") ||
  lower.includes("tour") ||
  lower.includes("holiday") ||
  lower.includes("booking.com") ||
  lower.includes("makemytrip") ||
  lower.includes("goibibo") ||
  lower.includes("sightseeing") ||
  lower.includes("tour package")
) return "travel";

if (
  lower.includes("school") ||
  lower.includes("college") ||
  lower.includes("university") ||
  lower.includes("tuition") ||
  lower.includes("fees") ||
  lower.includes("course") ||
  lower.includes("class") ||
  lower.includes("coaching") ||
  lower.includes("udemy") ||
  lower.includes("coursera") ||
  lower.includes("byjus") ||
  lower.includes("unacademy") ||
  lower.includes("book") ||
  lower.includes("books") ||
  lower.includes("notebook") ||
  lower.includes("stationery") ||
  lower.includes("exam") ||
  lower.includes("admission")
) return "education";
}

module.exports = getCategory;