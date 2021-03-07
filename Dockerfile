FROM rstudio/plumber

WORKDIR /api

COPY r ./

CMD ["/api/plumber.R"]
