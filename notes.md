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



## Results of Salary Prediction

## Std Error

yi​ are the actual values of the dependent variable.
y^i​ are the predicted values from the regression model.
n is the number of observations.
k is the number of predictors (excluding the intercept).

This is the same as we computed MSE, but this is also square rooted

In your case, the SER of 1192 suggests that predictions from the model typically deviate from the actual income values by about this amount, on average. This insight is valuable for understanding the limitations of your model's predictive capabilities and for setting realistic expectations when using the model to make decisions or predictions based on new data.

## Std Errors

Coefficient for Age (42.78): This standard error indicates that the coefficient estimate for age can vary by about ±42.78 units. A smaller standard error would suggest more precise estimates of the coefficient.

Coefficient for Experience (96.45): Similarly, the standard error of approximately ±96.45 for experience implies more variation in the estimates of the coefficient for experience, indicating less certainty in this estimate compared to the age coefficient under the same experimental conditions.

Intercept (1409.0338424093513): The intercept's large standard error of about ±1409.0338424093513 reflects substantial uncertainty about where the true regression plane intersects the z-axis (income) when all predictor variables are zero.

For instance, if you conducted a study with 100 employees from a company and estimated the relationship between their age, experience, and salary, and then repeated this study many times—each time randomly selecting 100 employees (assuming the company is large enough to provide fresh samples every time)—the age coefficient you calculate each time would vary. The standard error (42.78 in your case) quantifies how much fluctuation you might expect in the age coefficient due to this process of random sampling.


## T Values

t = coeficient / error

In statistical hypothesis testing, especially in regression analysis, the critical t-value serves as a threshold to decide whether to reject the null hypothesis. The null hypothesis in the context of regression is typically that the coefficient (beta) of a predictor is zero, which implies that the predictor has no effect on the dependent variable.

Common Critical Values: For a 95% confidence level and a large sample size, the critical t-values often approach approximately ±2.00. This means that if the t-statistic exceeds these values (either in the positive or negative direction), the null hypothesis (that the coefficient equals zero) can be rejected with less than 5% risk of being wrong (Type I error).


For Age (-2.5586769483003673):
    Value: -2.5586769483003673
    Interpretation: The t-statistic is below -2, which often suggests that the coefficient is statistically significant if we consider a common threshold for significance. The negative sign indicates a negative relationship between age and the outcome variable (income). Given the common critical t-value around 2.00 (or -2.00) for degrees of freedom typical in regression scenarios, this suggests that age may significantly negatively influence income, though the context and exact p-value would provide firmer conclusions.

For Experience (22.00434506904264):
    Value: 22.00434506904264
    Interpretation: This is a very high t-statistic, indicating a strong and statistically significant positive relationship between experience and income. This suggests that the effect of experience on income is robust and reliably different from zero.

For Intercept (22.91787216735159):
    Value: 22.91787216735159
    Interpretation: Similarly to the coefficient for experience, the intercept's t-statistic is very high, indicating that the intercept is statistically significant. The intercept represents the expected value of the outcome variable (income) when all predictors (age and experience) are zero.

