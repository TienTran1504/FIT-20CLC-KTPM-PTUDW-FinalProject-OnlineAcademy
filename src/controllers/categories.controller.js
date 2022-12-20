const renderCategories = async (req, res) => {
  res.render("vwCategories/index", {
    style: "categories.css",
  });
};

export { renderCategories };
