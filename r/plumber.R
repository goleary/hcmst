if (!require("pacman")) install.packages("pacman")

pacman::p_load(
  tidyverse, 
  broom,
  xgboost,
  caret,
  plumber
)

#* @apiTitle API marital status
#* @param income  
#* @param education
#* @param age_bin 
#* @get /predict

marital_status_predict <- function(income, education, age_bin){
  
  load('./model.RData')
  
  test <- 
    c(income, education, age_bin)
  
  test <-
    test %>% 
    t() %>% 
    as.data.frame() 
  
  colnames(test) <- 
    c("income", "education", "age_bin")
  
  test <-
    test %>% 
    mutate_at(vars(income:age_bin), as.numeric)
  
  test <-
    as.matrix(test)
  
  predict(xgb.fit, test)
  
}

# marital_status_predict("122250", "12", "3")
# 
# root <- pr("plumber.R")
# root
# root %>% pr_run()
# 
