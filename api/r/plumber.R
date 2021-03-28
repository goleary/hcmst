library(xgboost)
library(plumber)

#* @apiTitle API marital status
#* @param income  
#* @param education
#* @param age_bin 
#* @get /predict
#* @serializer unboxedJSON


marital_status_predict <- function(income, education, age_bin){
  
  load('./model.RData')
  
  #test = c("52000", "8", "2")
  
  test = c(income, education, age_bin)
  test = sapply(test, as.numeric)
  test = data.frame(matrix(test, ncol = 3))
  
  
  colnames(test) <- c("income", "education", "age_bin")
  
  test <- as.matrix(test)
  
  probs <- predict(xgb.fit, test)
  
  levels <- c("married", "widowed", "divorced", "separated", "never married", "living with your partner")
  
  results <- data.frame(levels, probs)
  
  results <- 
    list(
      "married" = results$probs[1],
      "widowed" = results$probs[2],
      "divorced" = results$probs[3],
      "separated" = results$probs[4],
      "never_married" = results$probs[5],
      "living_with_partner" = results$probs[6]
    )
  
  return(results)
  
}

# marital_status_predict("122250", "12", "3")
# 
# root <- pr("plumber.R")
# root
# root %>% pr_run()
# 
