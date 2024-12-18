
import math
def matrix_multiply(A, B):
    # Get dimensions
    rows_A, cols_A = len(A), len(A[0])
    rows_B, cols_B = len(B), len(B[0])

    # Check if multiplication is possible
    if cols_A != rows_B:
        raise ValueError("Matrix dimensions do not match for multiplication.")

    # Initialize result matrix with zeros
    result = [[0 for _ in range(cols_B)] for _ in range(rows_A)]

    # Perform matrix multiplication
    for i in range(rows_A):
        for j in range(cols_B):
            for k in range(cols_A):
                result[i][j] += A[i][k] * B[k][j]
    
    return result

# Test the function
if __name__ == "__main__":
    # Example matrices
        # Input angles in degrees
    theta1 = 30  # Example angle
    theta2 = 45
    theta3 = 60

    # Convert degrees to radians
    theta1_rad = math.radians(theta1)
    theta2_rad = math.radians(theta2)
    theta3_rad = math.radians(theta3)

    # Calculate cosine and sine values
    cos_theta1 = math.cos(theta1_rad)
    sin_theta1 = math.sin(theta1_rad)

    cos_theta2 = math.cos(theta2_rad)
    sin_theta2 = math.sin(theta2_rad)

    cos_theta3 = math.cos(theta3_rad)
    sin_theta3 = math.sin(theta3_rad)

    A = [
        [cos_theta1, -1*(sin_theta1), 2*cos_theta1],
        [sin_theta1, cos_theta1, 2*sin_theta1],
        [0, 0, 1],
    ]
    B = [
        [cos_theta2, -1*(sin_theta2), 3*cos_theta2],
        [sin_theta2, cos_theta2, 3*sin_theta2],
        [0, 0, 1]
    ]
    C = [
        [cos_theta3, -1*(sin_theta3), 1*cos_theta3],
        [sin_theta3, cos_theta3, 1*sin_theta3],
        [0, 0, 1]
    ]
    
    try:
        # Multiply A and B
        result=matrix_multiply(A, B)
        result=matrix_multiply(result,C)
        # Print the result
        print("Resultant Matrix:")
        for row in result:
            print(row)
    except ValueError as e:
        print(e)
