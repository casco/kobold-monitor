var appRouter = function(app) {
  app.post("/reports/", function(req, res) {
    res.status(200).send("ok");
    console.log(JSON.stringify(req.body));
  });
};

module.exports = appRouter;
