router.get("/video", async (req, res) => {
  try {
    let query = req.headers.title;

    const results = await ytSearch.GetListByKeyword(query, false, 20); // ⁠ query ⁠ is the search term, and ⁠ 10 ⁠ is the number of results
    // https://www.youtube.com/watch?v={1Z3RrRYIoVs}
    res.json({ data: results.items });
  } catch (error) {
    res.status(200).json({
      Error: "Error Occur",
    });
  }
});
