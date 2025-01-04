import numpy as np

# Define a 5x5 matrix
matrix = np.array([
    [2.144e-06, 3.89e-03, 4.86e-10, 4.86e-10, 3.838e-16],
    [8.08e-17 , 4.5e-10 , 4.86e-10, 4.04e-16, 3.838e-16],
    [8.64e-4  , 3.89e-3 , 4.32e-3 , 0.03192 , 0.030324 ],
    [8.64e-4  , 3.89e-3 , 4.32e-3 , 4.32e-3 , 4.104e-3 ],
    [6.384e-3 , 3.89e-3 , 0.03192 , 4.86e-10, 1.02e-5  ]
])

print("Original Matrix:")
print(matrix)

# Calculate the sum of all elements in the matrix
total_sum = np.sum(matrix)
print(total_sum)
# Create a new matrix by dividing each element by the total sum
normalized_matrix = matrix / total_sum

print("\nNormalized Matrix:")
print(normalized_matrix)



# [[1.58749980e-05 2.88199408e-02 3.60361897e-09 3.60361897e-09 2.84668703e-15]
#  [5.99302533e-16 3.24325707e-09 3.60361897e-09 2.99651267e-15 2.84668703e-15]
#  [6.40443129e-03 2.88199408e-02 3.20221564e-02 2.36613510e-01 2.24782835e-01]
#  [6.40443129e-03 2.88199408e-02 3.20221564e-02 3.20221564e-02 3.04210486e-02]
#  [4.73227021e-02 2.88199408e-02 2.36613510e-01 3.60361897e-09 7.54062405e-05]]