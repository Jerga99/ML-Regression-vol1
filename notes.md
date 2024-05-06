# Linear Regression 101

Linear regression is one of the simplest and most widely used machine learning algorithms
for regression tasks. It's a supervised learning algorithm used for predicting the value
of a continuous target variable based on one or more input features.

## Important Questions ##

1.  What is machine learning?
2.  Supervised learning algorithm?
3.  What is exactly Linear Regression?

## Answers ##

1. Machine learning is a way for computers to learn from data and improve over time without being explicitly programmed.
Instead of following specific instructions, machines use algorithms to analyze large sets of data, find patterns, and make predictions or decisions based on those patterns. It's like teaching a computer to recognize patterns and make decisions on its own.


2. Type of machine learning where the algorithm learns from labeled data. In supervised learning, the algorithm is trained on a dataset that includes both input data and the corresponding correct output. The goal is for the algorithm to learn a mapping from the input to the output, so that when it's given new input data, it can predict the corresponding output.

3. In simple linear regression, where there's just one input variable, our goal is to find a line that best describes the relationship between the input variable (x) and the output variable (y).

   This line is often called the 'line of best fit.' We try to draw this line through our data points in such a way that it summarizes the relationship between the input and output as accurately as possible.

   The line is drawn to minimize the distance between itself and all the data points. This way, we can use this line to predict the output for any given input, which can be incredibly helpful in making forecasts or decisions based on the data.

# Example time - What is line/linear/graph?

Draw:

y = 2 + 0.5 * x

y = 2 + 0.5x

y = b + mx

Equation for line and also for simple linear regression with one parameter/independent variables/feature

- y is the predicted value, dependent variable
- x is the input feature, independent variable
- m is the slope (weight) of the line,
- b is the y-intercept, when independent variable is 0.


Solve each for x = 0; x = 1; x = 2;

y = 1x + 1
y = 2x + 1
y = 3x + 1


y = β0 ​+ β1​x

- y is the predicted value, dependent variable
- x is the input feature, independent variable
- β1 is the slope (weight) of the line,
- β0 is the y-intercept, when independent variable is 0.



The term "regression" itself, particularly in the context of statistics, has an interesting origin that actually hints at its meaning. The term was first used by Sir Francis Galton in the 19th century when he was studying the relationship between the heights of parents and their children. Galton noticed that children of both very tall and very short parents tended to "regress" toward the average height in subsequent generations, rather than deviating further from the average. -->

Moving towards the average: This original idea reflects the notion that extreme values in one generation of a dataset would likely be less extreme (closer to the average) in the next. -->

For example: students styding for test, student group A studying 4 hours have 90 score,
student group B has only 80.
If the test performed on multiple groups, it tends to regress to the avarage 85

## Exercise 1 - Score prediction depending on study hours

|  Study Hours(x) | Exam Score(y)  |
|---|---|
|  1 | 55  |
|  2 | 70  |
|  3 | 80  |
|  4 | 85  |
|  5 | 90  |


## Linear Regression Steps

1. Compute Means
2. Compute Slope
3. Compute y-Intercept
4. Predict Values

### Evaluation
1. R^2 (r squared)
2. MAE (Mean Absolute Error)



## R^2
The R-squared metric provides an indication of how well the independent variable(s) predict the dependent variable.
R² value ranges from 0 to 1, where 1 indicates perfect prediction.
Can be misleadingly high in models with many variables.

The R-squared (R²) value for your regression model is approximately 0.9383. This indicates that about 93.83% of the variability in the exam scores is explained by the number of study hours, based on your model. This suggests a strong linear relationship between the study hours and the exam scores in your dataset.

## MAE (Mean Absolute Error)

The Mean Absolute Error is a measure of differences between paired observations.

is particularly useful when you need a robust measure that can stand out outliers, i.e., few large errors will not skew the result too much, making it more reliable when the data contains many outliers.

## MSE
MSE measures the average of the squares of the errors—that is, the average squared difference between the estimated values and the actual value.

## When to Use Which?

MAE is particularly useful when you need a robust measure that can stand out outliers, i.e., few large errors will not skew the result too much, making it more reliable when the data contains many outliers.

R² is useful when you need to explain to a non-technical audience how well the variability in the response variable is being captured by the model. It is also more common for comparing the predictive quality of models on the same problem.

A lower MSE indicates a better fit of the model to the data. Unlike MAE, MSE gives a relatively high weight to large errors (due to the squaring of each term), making it useful when large errors are particularly undesirable.


