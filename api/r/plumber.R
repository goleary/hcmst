if (!require("pacman")) install.packages("pacman")

pacman::p_load(
  xgboost,
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
  
  test = sapply(test, as.numeric)
  test = data.frame(matrix(test, ncol = 3))
  
  
  colnames(test) <- 
    c("income", "education", "age_bin")
  

  
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
