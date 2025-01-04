import math
import numpy as np

# Function to calculate the DH Transformation Matrix
def dh_transformation_matrix(a, alpha, d, theta):
    theta_rad = math.radians(theta)  # Convert angle to radians
    alpha_rad = math.radians(alpha)  # Convert angle to radians

    T = np.array([
        [math.cos(theta_rad), -math.sin(theta_rad)*math.cos(alpha_rad), math.sin(theta_rad)*math.sin(alpha_rad), a*math.cos(theta_rad)],
        [math.sin(theta_rad), math.cos(theta_rad)*math.cos(alpha_rad), -math.cos(theta_rad)*math.sin(alpha_rad), a*math.sin(theta_rad)],
        [0, math.sin(alpha_rad), math.cos(alpha_rad), d],
        [0, 0, 0, 1]
    ])
    return T

# DH Parameters for each link: [a, alpha, d, theta]
dh_parameters = [
    [2, 0, 0, 30],  # Link 1: a=2, alpha=0, d=0, theta=30°
    [3, 0, 0, 45],  # Link 2: a=3, alpha=0, d=0, theta=45°
    [1, 0, 0, 60]   # Link 3: a=1, alpha=0, d=0, theta=60°
]

# Initialize overall transformation matrix as identity
T_total = np.identity(4)

# Multiply DH matrices for each link
for i, params in enumerate(dh_parameters):
    a, alpha, d, theta = params
    T_i = dh_transformation_matrix(a, alpha, d, theta)
    print(f"Transformation Matrix T_{i}:\n", T_i, "\n")
    T_total = np.dot(T_total, T_i)

# Final transformation matrix
print("Overall Transformation Matrix T_0,3:\n", T_total)

# Position of the end-effector (last column of the transformation matrix)
end_effector_position = T_total[:3, 3]
print("\nPosition of the End-Effector (X, Y, Z):", end_effector_position)
