export default (request, response, next) => {
  const {
    query: { query }
  } = request;
  if (query && typeof query === "string") {
    request.query.query = JSON.parse(query);
  }
  next();
};
