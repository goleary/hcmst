if (!require("pacman")) install.packages("pacman")

pacman::p_load(
  tidyverse, 
  psych, 
  broom,
  xgboost,
  caret,
  plumber
)

#* @apiTitle API de clasificacion de flores
#* @param petal_length Longitud del Petalo 
#* @param petal_width Ancho del Petalo 
#* @param sepal_length Longitud del Sepalo 
#* @param sepal_width Ancho del Sepalo 
#* @post /clasificador

function(income, education, age_bin){
  
  load(&quot;model.RData&quot;)
  
  test = c(income, education, age_bin)
  test = sapply(test, as.numeric)
  test = data.frame(matrix(test, ncol = 4))
  
  colnames(test) = colnames(iris[,1:4])
  predict(model, test)
  
}