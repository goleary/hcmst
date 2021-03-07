FROM rstudio/plumber

RUN R -e "install.packages('pacman')"
RUN R -e "install.packages('tidyverse')"
RUN R -e "install.packages('xgboost')"

WORKDIR /api

COPY r ./

CMD ["/api/plumber.R"]
