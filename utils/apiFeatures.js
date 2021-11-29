class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // i mean case insentitive
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    //   console.log(queryCopy)

    // Removing fields from the query string
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Advance filter for price, ratting etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resPerpage) {
    const currentpage = Number(this.queryStr.page) || 1;
    const skip = resPerpage * (currentpage - 1);
    this.query = this.query.limit(resPerpage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
